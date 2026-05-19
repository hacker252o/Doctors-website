import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  LogOut,
  RefreshCw,
  Calendar,
  MessageSquare,
  ExternalLink,
  Loader2,
} from "lucide-react";

import {
  toast,
} from "sonner";

import api, {
  formatApiErrorDetail,
} from "../lib/api";

import siteConfig from "../config/site";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

/* ---------- Status Colors ---------- */

const STATUS_COLORS = {
  pending:
    "bg-amber-50 text-amber-700 border-amber-200",

  confirmed:
    "bg-emerald-50 text-emerald-700 border-emerald-200",

  cancelled:
    "bg-rose-50 text-rose-700 border-rose-200",

  completed:
    "bg-brand-50 text-brand-900 border-brand-200",
};

/* ---------- Component ---------- */

export default function AdminDashboardPage() {

  const navigate =
    useNavigate();

  const [stats, setStats] =
    useState({
      appointments: 0,
      pending: 0,
      contacts: 0,
    });

  const [appointments, setAppointments] =
    useState([]);

  const [contacts, setContacts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* ---------- Fetch ---------- */

  const fetchAll =
    async () => {

      setLoading(true);

      try {

        const [
          statsRes,
          appointmentsRes,
          contactsRes,
        ] = await Promise.all([
          api.get("/admin/stats"),
          api.get("/admin/appointments"),
          api.get("/admin/contacts"),
        ]);

        setStats(
          statsRes.data
        );

        setAppointments(
          appointmentsRes.data
        );

        setContacts(
          contactsRes.data
        );

      } catch (error) {

        if (
          error?.response
            ?.status === 401
        ) {

          localStorage.removeItem(
            "admin_token"
          );

          navigate(
            "/admin/login"
          );

          return;
        }

        toast.error(
          formatApiErrorDetail(
            error?.response?.data
              ?.detail
          ) ||
            "Failed to load dashboard."
        );

      } finally {

        setLoading(false);
      }
    };

  /* ---------- Init ---------- */

  useEffect(() => {

    const token =
      localStorage.getItem(
        "admin_token"
      );

    if (!token) {

      navigate(
        "/admin/login"
      );

      return;
    }

    fetchAll();

  }, []);

  /* ---------- Logout ---------- */

  const logout = () => {

    localStorage.removeItem(
      "admin_token"
    );

    localStorage.removeItem(
      "admin_user"
    );

    navigate(
      "/admin/login"
    );
  };

  /* ---------- Update Status ---------- */

  const updateStatus =
    async (
      id,
      status
    ) => {

      try {

        await api.patch(
          `/admin/appointments/${id}?status=${status}`
        );

        setAppointments(
          (prev) =>
            prev.map((item) =>
              item.id === id
                ? {
                    ...item,
                    status,
                  }
                : item
            )
        );

        toast.success(
          `Marked as ${status}`
        );

        const statsRes =
          await api.get(
            "/admin/stats"
          );

        setStats(
          statsRes.data
        );

      } catch (error) {

        toast.error(
          "Could not update status."
        );
      }
    };

  /* ---------- Render ---------- */

  return (
    <div
      className="
        min-h-screen
        bg-ink-50
      "
    >

      {/* ---------- Header ---------- */}

      <header
        className="
          bg-white
          border-b
          border-ink-100
          sticky
          top-0
          z-30
        "
      >

        <div
          className="
            container-x
            py-4
            flex
            items-center
            justify-between
          "
        >

          {/* ---------- Logo ---------- */}

          <Link
            to="/"
            className="
              flex
              items-center
              gap-2.5
            "
          >

            <span
              className="
                h-9
                w-9
                rounded-full
                bg-brand-900
                text-white
                font-serif
                text-lg
                flex
                items-center
                justify-center
              "
            >
              {
                siteConfig.brand
                  .logoMark
              }
            </span>

            <div>

              <div
                className="
                  font-serif
                  text-lg
                  text-ink-900
                  leading-none
                "
              >
                {
                  siteConfig.brand
                    .name
                }
              </div>

              <div
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-ink-500
                "
              >
                Admin Console
              </div>
            </div>
          </Link>

          {/* ---------- Actions ---------- */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <button
              onClick={fetchAll}
              className="
                hidden
                sm:inline-flex
                items-center
                gap-1.5
                text-sm
                text-ink-700
                hover:text-ink-900
                px-3
                py-2
                rounded-full
                hover:bg-ink-100
                transition
              "
            >

              <RefreshCw
                size={14}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>

            <button
              onClick={logout}
              className="
                inline-flex
                items-center
                gap-1.5
                text-sm
                text-rose-600
                hover:bg-rose-50
                px-3
                py-2
                rounded-full
                transition
              "
            >

              <LogOut size={14} />

              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ---------- Main ---------- */}

      <main
        className="
          container-x
          py-10
        "
      >

        {/* ---------- Stats ---------- */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-4
            mb-8
          "
        >

          <StatCard
            label="Total Appointments"
            value={stats.appointments}
            icon={
              <Calendar size={18} />
            }
          />

          <StatCard
            label="Pending"
            value={stats.pending}
            icon={
              <Calendar size={18} />
            }
            accent
          />

          <StatCard
            label="Contact Messages"
            value={stats.contacts}
            icon={
              <MessageSquare
                size={18}
              />
            }
          />
        </div>

        {/* ---------- Tabs ---------- */}

        <Tabs defaultValue="appointments">

          <TabsList
            className="
              bg-white
              border
              border-ink-100
              rounded-full
              p-1
              h-auto
            "
          >

            <TabsTrigger
              value="appointments"
              className="
                rounded-full
                px-5
                py-2
                text-sm
                data-[state=active]:bg-brand-900
                data-[state=active]:text-white
              "
            >
              Appointments (
              {
                appointments.length
              }
              )
            </TabsTrigger>

            <TabsTrigger
              value="messages"
              className="
                rounded-full
                px-5
                py-2
                text-sm
                data-[state=active]:bg-brand-900
                data-[state=active]:text-white
              "
            >
              Messages (
              {
                contacts.length
              }
              )
            </TabsTrigger>
          </TabsList>

          {/* ---------- Appointments ---------- */}

          <TabsContent
            value="appointments"
            className="mt-6"
          >

            <div
              className="
                bg-white
                border
                border-ink-100
                rounded-3xl
                overflow-hidden
              "
            >

              {loading ? (

                <Loader />

              ) : appointments.length ===
                0 ? (

                <Empty
                  title="No appointments yet"
                  subtitle="Appointments submitted from the website appear here."
                />

              ) : (

                <div className="overflow-x-auto">

                  <Table>

                    <TableHeader>

                      <TableRow
                        className="
                          bg-ink-50/50
                        "
                      >

                        <TableHead>
                          Name
                        </TableHead>

                        <TableHead>
                          Contact
                        </TableHead>

                        <TableHead>
                          Service
                        </TableHead>

                        <TableHead>
                          Date / Time
                        </TableHead>

                        <TableHead>
                          Status
                        </TableHead>

                        <TableHead>
                          Received
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>

                      {appointments.map(
                        (
                          appointment
                        ) => (
                          <TableRow
                            key={
                              appointment.id
                            }
                          >

                            {/* ---------- Name ---------- */}

                            <TableCell>

                              <div
                                className="
                                  font-semibold
                                  text-ink-900
                                "
                              >
                                {
                                  appointment.name
                                }
                              </div>

                              {appointment.message && (
                                <div
                                  className="
                                    text-xs
                                    text-ink-500
                                    mt-1
                                    max-w-xs
                                    line-clamp-2
                                  "
                                >
                                  {
                                    appointment.message
                                  }
                                </div>
                              )}
                            </TableCell>

                            {/* ---------- Contact ---------- */}

                            <TableCell>

                              <div
                                className="
                                  text-sm
                                "
                              >
                                {
                                  appointment.phone
                                }
                              </div>

                              <a
                                href={`mailto:${appointment.email}`}
                                className="
                                  text-xs
                                  text-brand-700
                                  hover:underline
                                  inline-flex
                                  items-center
                                  gap-1
                                "
                              >
                                {
                                  appointment.email
                                }

                                <ExternalLink
                                  size={11}
                                />
                              </a>
                            </TableCell>

                            {/* ---------- Service ---------- */}

                            <TableCell>
                              {
                                appointment.service ||
                                "—"
                              }
                            </TableCell>

                            {/* ---------- Time ---------- */}

                            <TableCell>

                              <div
                                className="
                                  text-sm
                                  font-medium
                                "
                              >
                                {
                                  appointment.date
                                }
                              </div>

                              <div
                                className="
                                  text-xs
                                  text-ink-500
                                "
                              >
                                {
                                  appointment.time
                                }
                              </div>
                            </TableCell>

                            {/* ---------- Status ---------- */}

                            <TableCell>

                              <Select
                                value={
                                  appointment.status
                                }
                                onValueChange={(
                                  value
                                ) =>
                                  updateStatus(
                                    appointment.id,
                                    value
                                  )
                                }
                              >

                                <SelectTrigger
                                  className={`
                                    h-8
                                    text-xs
                                    px-3
                                    rounded-full
                                    border
                                    ${
                                      STATUS_COLORS[
                                        appointment
                                          .status
                                      ] ||
                                      "border-ink-200"
                                    }
                                  `}
                                >

                                  <SelectValue />
                                </SelectTrigger>

                                <SelectContent>

                                  <SelectItem value="pending">
                                    Pending
                                  </SelectItem>

                                  <SelectItem value="confirmed">
                                    Confirmed
                                  </SelectItem>

                                  <SelectItem value="completed">
                                    Completed
                                  </SelectItem>

                                  <SelectItem value="cancelled">
                                    Cancelled
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>

                            {/* ---------- Date ---------- */}

                            <TableCell>

                              <span
                                className="
                                  text-xs
                                  text-ink-500
                                "
                              >
                                {formatDate(
                                  appointment.created_at
                                )}
                              </span>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ---------- Messages ---------- */}

          <TabsContent
            value="messages"
            className="mt-6"
          >

            <div
              className="
                bg-white
                border
                border-ink-100
                rounded-3xl
                overflow-hidden
              "
            >

              {loading ? (

                <Loader />

              ) : contacts.length ===
                0 ? (

                <Empty
                  title="No messages yet"
                  subtitle="Contact form submissions appear here."
                />

              ) : (

                <div
                  className="
                    divide-y
                    divide-ink-100
                  "
                >

                  {contacts.map(
                    (
                      message
                    ) => (
                      <div
                        key={
                          message.id
                        }
                        className="
                          p-6
                        "
                      >

                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-4
                          "
                        >

                          <div>

                            <div
                              className="
                                font-semibold
                                text-ink-900
                              "
                            >
                              {
                                message.name
                              }
                            </div>

                            <div
                              className="
                                text-xs
                                text-ink-500
                                mt-0.5
                              "
                            >
                              {
                                message.email
                              }

                              {message.phone
                                ? ` · ${message.phone}`
                                : ""}
                            </div>
                          </div>

                          <div
                            className="
                              text-xs
                              text-ink-500
                              shrink-0
                            "
                          >
                            {formatDate(
                              message.created_at
                            )}
                          </div>
                        </div>

                        <p
                          className="
                            mt-3
                            text-sm
                            text-ink-700
                            leading-relaxed
                          "
                        >
                          {
                            message.message
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

/* ---------- Stat Card ---------- */

function StatCard({
  label,
  value,
  icon,
  accent,
}) {

  return (
    <div
      className={`
        rounded-3xl
        p-6
        border
        ${
          accent
            ? "bg-brand-900 text-white border-brand-900"
            : "bg-white border-ink-100"
        }
      `}
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div
          className={`
            text-xs
            uppercase
            tracking-[0.18em]
            font-semibold
            ${
              accent
                ? "text-brand-200"
                : "text-ink-500"
            }
          `}
        >
          {label}
        </div>

        <div
          className={`
            h-9
            w-9
            rounded-full
            flex
            items-center
            justify-center
            ${
              accent
                ? "bg-white/10 text-white"
                : "bg-brand-50 text-brand-900"
            }
          `}
        >
          {icon}
        </div>
      </div>

      <div
        className={`
          mt-4
          font-serif
          text-4xl
          ${
            accent
              ? "text-white"
              : "text-ink-900"
          }
        `}
      >
        {value}
      </div>
    </div>
  );
}

/* ---------- Empty ---------- */

function Empty({
  title,
  subtitle,
}) {

  return (
    <div
      className="
        text-center
        py-20
        px-6
      "
    >

      <div
        className="
          font-serif
          text-2xl
          text-ink-900
        "
      >
        {title}
      </div>

      <div
        className="
          text-sm
          text-ink-500
          mt-1
        "
      >
        {subtitle}
      </div>
    </div>
  );
}

/* ---------- Loader ---------- */

function Loader() {

  return (
    <div
      className="
        flex
        items-center
        justify-center
        py-16
        text-ink-500
      "
    >

      <Loader2
        className="
          animate-spin
        "
      />
    </div>
  );
}

/* ---------- Format Date ---------- */

function formatDate(
  iso
) {

  try {

    const date =
      new Date(iso);

    return date.toLocaleString(
      undefined,
      {
        dateStyle:
          "medium",
        timeStyle:
          "short",
      }
    );

  } catch {

    return iso;
  }
}