import React, {
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  CalendarDays,
  MessageSquare,
  Users,
  LogOut,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";

import api from "../lib/api";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export default function AdminDashboardPage() {

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [appointments, setAppointments] =
    useState([]);

  const [contacts, setContacts] =
    useState([]);

  const [stats, setStats] =
    useState({
      appointments: 0,
      contacts: 0,
    });

  /* ---------- Logout ---------- */

 const logout = useCallback(() => {

  localStorage.removeItem(
    "admin_token"
  );

  localStorage.removeItem(
    "admin_user"
  );

  navigate("/admin/login");

}, [navigate , logout]);
  /* ---------- Fetch Data ---------- */

  const fetchAll =
    useCallback(async () => {

      try {

        setLoading(true);

        const [
          appointmentsRes,
          contactsRes,
        ] = await Promise.all([
          api.get(
            "/admin/appointments"
          ),

          api.get(
            "/admin/contacts"
          ),
        ]);

        const appointmentsData =
          appointmentsRes.data || [];

        const contactsData =
          contactsRes.data || [];

        setAppointments(
          appointmentsData
        );

        setContacts(
          contactsData
        );

        setStats({
          appointments:
            appointmentsData.length,

          contacts:
            contactsData.length,
        });

      } catch (err) {

        console.error(err);

        toast.error(
          "Failed to load dashboard."
        );

        if (
          err?.response?.status === 401
        ) {
          logout();
        }

      } finally {

        setLoading(false);
      }
    }, [navigate]);

  /* ---------- Initial Load ---------- */

  useEffect(() => {

    fetchAll();

  }, [fetchAll]);

  /* ---------- Loading ---------- */

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-50">

        <div className="flex items-center gap-3 text-ink-700">

          <Loader2
            className="animate-spin"
            size={22}
          />

          Loading Dashboard...
        </div>
      </div>
    );
  }

  /* ---------- UI ---------- */

  return (
    <div className="min-h-screen bg-ink-50">

      {/* ---------- Header ---------- */}

      <header className="bg-white border-b border-ink-100">

        <div className="container-x py-5 flex items-center justify-between">

          <div>

            <h1 className="font-serif text-4xl text-ink-900">
              Admin Dashboard
            </h1>

            <p className="text-sm text-ink-500 mt-1">
              Manage appointments and patient inquiries
            </p>
          </div>

          <button
            onClick={logout}
            className="btn-primary"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      {/* ---------- Content ---------- */}

      <main className="container-x py-10 space-y-10">

        {/* ---------- Stats ---------- */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-3xl p-7 shadow-soft border border-ink-100">

            <div className="flex items-center justify-between">

              <div>

                <div className="text-sm text-ink-500">
                  Appointments
                </div>

                <div className="text-4xl font-serif text-ink-900 mt-2">
                  {stats.appointments}
                </div>
              </div>

              <div className="h-14 w-14 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center">

                <CalendarDays size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 shadow-soft border border-ink-100">

            <div className="flex items-center justify-between">

              <div>

                <div className="text-sm text-ink-500">
                  Messages
                </div>

                <div className="text-4xl font-serif text-ink-900 mt-2">
                  {stats.contacts}
                </div>
              </div>

              <div className="h-14 w-14 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center">

                <MessageSquare size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Appointments ---------- */}

        <section className="bg-white rounded-3xl p-7 shadow-soft border border-ink-100 overflow-x-auto">

          <div className="flex items-center gap-2 mb-6">

            <Users size={20} />

            <h2 className="font-serif text-3xl text-ink-900">
              Appointments
            </h2>
          </div>

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>
                  Name
                </TableHead>

                <TableHead>
                  Email
                </TableHead>

                <TableHead>
                  Phone
                </TableHead>

                <TableHead>
                  Date
                </TableHead>

                <TableHead>
                  Message
                </TableHead>

              </TableRow>
            </TableHeader>

            <TableBody>

              {appointments.length > 0 ? (

                appointments.map(
                  (item, index) => (

                    <TableRow
                      key={index}
                    >

                      <TableCell>
                        {item.name}
                      </TableCell>

                      <TableCell>
                        {item.email}
                      </TableCell>

                      <TableCell>
                        {item.phone}
                      </TableCell>

                      <TableCell>
                        {item.date}
                      </TableCell>

                      <TableCell>
                        {item.message}
                      </TableCell>

                    </TableRow>
                  )
                )

              ) : (

                <TableRow>

                  <TableCell
                    colSpan={5}
                    className="text-center text-ink-500 py-8"
                  >
                    No appointments found.
                  </TableCell>

                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>

        {/* ---------- Contacts ---------- */}

        <section className="bg-white rounded-3xl p-7 shadow-soft border border-ink-100 overflow-x-auto">

          <div className="flex items-center gap-2 mb-6">

            <MessageSquare size={20} />

            <h2 className="font-serif text-3xl text-ink-900">
              Contact Messages
            </h2>
          </div>

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>
                  Name
                </TableHead>

                <TableHead>
                  Email
                </TableHead>

                <TableHead>
                  Message
                </TableHead>

              </TableRow>
            </TableHeader>

            <TableBody>

              {contacts.length > 0 ? (

                contacts.map(
                  (item, index) => (

                    <TableRow
                      key={index}
                    >

                      <TableCell>
                        {item.name}
                      </TableCell>

                      <TableCell>
                        {item.email}
                      </TableCell>

                      <TableCell>
                        {item.message}
                      </TableCell>

                    </TableRow>
                  )
                )

              ) : (

                <TableRow>

                  <TableCell
                    colSpan={3}
                    className="text-center text-ink-500 py-8"
                  >
                    No messages found.
                  </TableCell>

                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>
      </main>
    </div>
  );
}