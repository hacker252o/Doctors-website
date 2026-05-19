from dotenv import load_dotenv
from pathlib import Path

import os
import uuid
import logging
from datetime import datetime, timezone, timedelta
from typing import List, Optional

import bcrypt
import jwt
from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict

# ---------- Load Environment ----------
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# ---------- Config ----------
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_MINUTES = 60 * 12

mongo_url = os.getenv("MONGO_URL")
db_name = os.getenv("DB_NAME")
jwt_secret = os.getenv("JWT_SECRET")

if not mongo_url:
    raise ValueError("MONGO_URL is missing in .env")

if not db_name:
    raise ValueError("DB_NAME is missing in .env")

if not jwt_secret:
    raise ValueError("JWT_SECRET is missing in .env")

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# ---------- App ----------
app = FastAPI(title="Clinic API")

api_router = APIRouter(prefix="/api")
security = HTTPBearer(auto_error=False)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)

# ---------- Models ----------
class AppointmentCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone: str = Field(min_length=4, max_length=40)
    email: EmailStr
    date: str
    time: str
    service: Optional[str] = None
    message: Optional[str] = ""


class Appointment(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: EmailStr
    date: str
    time: str
    service: Optional[str] = None
    message: Optional[str] = ""
    status: str = "pending"
    created_at: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = ""
    message: str = Field(min_length=1, max_length=2000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    message: str
    created_at: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

# ---------- Auth Helpers ----------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(
        plain.encode("utf-8"),
        hashed.encode("utf-8")
    )


def create_access_token(user_id: str, email: str, role: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "role": role,
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_MINUTES),
    }

    return jwt.encode(payload, jwt_secret, algorithm=JWT_ALGORITHM)


async def get_current_admin(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
):
    if credentials is None or not credentials.credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            jwt_secret,
            algorithms=[JWT_ALGORITHM]
        )

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")

    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    user = await db.users.find_one(
        {"id": payload["sub"]},
        {"_id": 0, "password_hash": 0}
    )

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user

# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {
        "message": "Clinic API running successfully",
        "status": "ok"
    }


@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(payload: AppointmentCreate):
    appointment = Appointment(**payload.model_dump())

    await db.appointments.insert_one(
        appointment.model_dump()
    )

    return appointment


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    contact = ContactMessage(**payload.model_dump())

    await db.contact_messages.insert_one(
        contact.model_dump()
    )

    return contact

# ---------- Admin ----------
@api_router.post("/admin/login", response_model=TokenResponse)
async def admin_login(payload: LoginRequest):
    email = payload.email.lower().strip()

    user = await db.users.find_one({"email": email})

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if user.get("role") != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    token = create_access_token(
        user["id"],
        user["email"],
        user["role"]
    )

    return TokenResponse(
        access_token=token,
        user={
            "id": user["id"],
            "email": user["email"],
            "name": user.get("name", "Admin"),
            "role": user["role"],
        }
    )


@api_router.get("/admin/me")
async def admin_me(admin: dict = Depends(get_current_admin)):
    return admin


@api_router.get("/admin/appointments", response_model=List[Appointment])
async def list_appointments(admin: dict = Depends(get_current_admin)):
    appointments = await db.appointments.find(
        {},
        {"_id": 0}
    ).sort("created_at", -1).to_list(1000)

    return appointments


@api_router.patch("/admin/appointments/{appointment_id}")
async def update_appointment_status(
    appointment_id: str,
    status: str,
    admin: dict = Depends(get_current_admin)
):
    allowed_statuses = {
        "pending",
        "confirmed",
        "cancelled",
        "completed"
    }

    if status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid status"
        )

    result = await db.appointments.update_one(
        {"id": appointment_id},
        {"$set": {"status": status}}
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found"
        )

    return {
        "success": True,
        "appointment_id": appointment_id,
        "status": status
    }


@api_router.get("/admin/contacts", response_model=List[ContactMessage])
async def list_contacts(admin: dict = Depends(get_current_admin)):
    contacts = await db.contact_messages.find(
        {},
        {"_id": 0}
    ).sort("created_at", -1).to_list(1000)

    return contacts


@api_router.get("/admin/stats")
async def admin_stats(admin: dict = Depends(get_current_admin)):
    appointments = await db.appointments.count_documents({})
    pending = await db.appointments.count_documents(
        {"status": "pending"}
    )
    contacts = await db.contact_messages.count_documents({})

    return {
        "appointments": appointments,
        "pending": pending,
        "contacts": contacts
    }

# ---------- Startup ----------
async def seed_admin():
    email = os.getenv("ADMIN_EMAIL", "admin@clinic.com").lower().strip()
    password = os.getenv("ADMIN_PASSWORD", "admin123")

    existing_user = await db.users.find_one({"email": email})

    if existing_user is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": email,
            "password_hash": hash_password(password),
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })

        logger.info(f"Admin created: {email}")

    else:
        if not verify_password(password, existing_user["password_hash"]):
            await db.users.update_one(
                {"email": email},
                {
                    "$set": {
                        "password_hash": hash_password(password)
                    }
                }
            )

            logger.info(f"Admin password updated: {email}")


@app.on_event("startup")
async def startup_event():
    await db.users.create_index("email", unique=True)
    await db.appointments.create_index("created_at")

    await seed_admin()


@app.on_event("shutdown")
async def shutdown_event():
    client.close()

# ---------- Register Router ----------
app.include_router(api_router)

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)