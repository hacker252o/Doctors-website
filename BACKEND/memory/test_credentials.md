# Test Credentials

## Admin Account

- Email: admin@clinic.com
- Password: admin123
- Role: admin

---

## API Endpoints

### Public Routes

#### Create Appointment
POST /api/appointments

#### Create Contact Message
POST /api/contact

---

### Admin Routes

Authorization Header:
Authorization: Bearer <token>

#### Admin Login
POST /api/admin/login

#### Get Current Admin
GET /api/admin/me

#### Get All Appointments
GET /api/admin/appointments

#### Update Appointment Status
PATCH /api/admin/appointments/{id}?status=confirmed

Allowed status values:
- pending
- confirmed
- cancelled
- completed

#### Get All Contact Messages
GET /api/admin/contacts

#### Get Dashboard Stats
GET /api/admin/stats

---

## Admin Web Routes

### Login Page
/admin/login

### Dashboard
/admin