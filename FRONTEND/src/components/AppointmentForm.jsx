import React, {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Calendar as CalendarIcon,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import {
  format,
} from "date-fns";

import api, {
  formatApiErrorDetail,
} from "../lib/api";

import siteConfig from "../config/site";

/* ---------- Time Slots ---------- */

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
];

/* ---------- Initial State ---------- */

const initialForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

/* ---------- Component ---------- */

export default function AppointmentForm({
  compact = false,
  onSuccess,
}) {

  const [form, setForm] =
    useState(initialForm);

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [done, setDone] =
    useState(false);

  /* ---------- Update ---------- */

  const update = (
    key,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /* ---------- Submit ---------- */

  const submit = async (
    e
  ) => {

    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.email ||
      !date ||
      !time
    ) {
      alert(
        "Please fill all required fields."
      );

      return;
    }

    setLoading(true);

    try {

      await api.post(
        "/appointments",
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          service:
            form.service || null,
          message:
            form.message || "",
          date,
          time,
        }
      );

      setDone(true);

      setForm(initialForm);

      setDate("");

      setTime("");

      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {

      alert(
        formatApiErrorDetail(
          error?.response?.data
            ?.detail
        )
      );

    } finally {

      setLoading(false);
    }
  };

  /* ---------- Success ---------- */

  if (done) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}

        animate={{
          opacity: 1,
          scale: 1,
        }}

        className="
          text-center
          py-8
        "
      >

        <div
          className="
            mx-auto
            h-14
            w-14
            rounded-full
            bg-emerald-100
            flex
            items-center
            justify-center
          "
        >

          <CheckCircle2
            size={28}
            className="
              text-emerald-600
            "
          />
        </div>

        <h3
          className="
            font-serif
            text-3xl
            text-ink-900
            mt-4
          "
        >
          Appointment Received
        </h3>

        <p
          className="
            text-ink-500
            mt-2
            max-w-md
            mx-auto
          "
        >
          Thank you. Our team will
          contact you shortly.
        </p>

        <button
          onClick={() =>
            setDone(false)
          }
          className="
            mt-6
            btn-ghost
          "
        >
          Book Another
        </button>
      </motion.div>
    );
  }

  /* ---------- Form ---------- */

  return (
    <form
      onSubmit={submit}
      className={
        compact
          ? ""
          : "space-y-5"
      }
    >

      {/* ---------- Name & Phone ---------- */}

      <div
        className="
          grid
          sm:grid-cols-2
          gap-4
        "
      >

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            update(
              "name",
              e.target.value
            )
          }
          className="field"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) =>
            update(
              "phone",
              e.target.value
            )
          }
          className="field"
        />
      </div>

      {/* ---------- Email & Service ---------- */}

      <div
        className="
          grid
          sm:grid-cols-2
          gap-4
        "
      >

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) =>
            update(
              "email",
              e.target.value
            )
          }
          className="field"
        />

        <select
          value={form.service}
          onChange={(e) =>
            update(
              "service",
              e.target.value
            )
          }
          className="field"
        >

          <option value="">
            Select Service
          </option>

          {siteConfig.services.map(
            (service) => (
              <option
                key={service.key}
                value={service.title}
              >
                {service.title}
              </option>
            )
          )}
        </select>
      </div>

      {/* ---------- Date & Time ---------- */}

      <div
        className="
          grid
          sm:grid-cols-2
          gap-4
        "
      >

        <div className="relative">

          <CalendarIcon
            size={16}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-ink-500
            "
          />

          <input
            type="date"
            value={date}
            min={format(
              new Date(),
              "yyyy-MM-dd"
            )}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
            className="field"
          />
        </div>

        <select
          value={time}
          onChange={(e) =>
            setTime(
              e.target.value
            )
          }
          className="field"
        >

          <option value="">
            Select Time
          </option>

          {TIME_SLOTS.map(
            (slot) => (
              <option
                key={slot}
                value={slot}
              >
                {slot}
              </option>
            )
          )}
        </select>
      </div>

      {/* ---------- Message ---------- */}

      <textarea
        rows={
          compact ? 3 : 4
        }
        placeholder="Write your concern..."
        value={form.message}
        onChange={(e) =>
          update(
            "message",
            e.target.value
          )
        }
        className="
          field
          resize-none
        "
      />

      {/* ---------- Button ---------- */}

      <button
        type="submit"
        disabled={loading}
        className="
          btn-primary
          w-full
          disabled:opacity-60
        "
      >

        {loading ? (
          <>
            <Loader2
              size={16}
              className="
                animate-spin
              "
            />

            Submitting...
          </>
        ) : (
          "Confirm Appointment"
        )}
      </button>

      {/* ---------- Footer ---------- */}

      <p
        className="
          text-xs
          text-ink-500
          text-center
        "
      >
        By submitting this form,
        you agree to be contacted
        regarding your appointment.
      </p>
    </form>
  );
}