import React, {
  useState,
} from "react";

import api, {
  formatApiErrorDetail,
} from "../lib/api";

/* ---------- Component ---------- */

export default function AppointmentForm({
  onSuccess,
}) {

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      service: "",
      message: "",
    });

  /* ---------- Handle Change ---------- */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------- Submit ---------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    setSuccess("");

    try {

      await api.post(
        "/appointments",
        formData
      );

      setSuccess(
        "Appointment booked successfully."
      );

      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        service: "",
        message: "",
      });

      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {

      setError(
        formatApiErrorDetail(
          err?.response?.data?.detail
        )
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-4
      "
    >

      {/* ---------- Name ---------- */}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="field"
        required
      />

      {/* ---------- Phone ---------- */}

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="field"
        required
      />

      {/* ---------- Email ---------- */}

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className="field"
        required
      />

      {/* ---------- Date ---------- */}

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="field"
        required
      />

      {/* ---------- Time ---------- */}

      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="field"
        required
      />

      {/* ---------- Service ---------- */}

      <input
        type="text"
        name="service"
        placeholder="Service Needed"
        value={formData.service}
        onChange={handleChange}
        className="field"
      />

      {/* ---------- Message ---------- */}

      <textarea
        name="message"
        placeholder="Message"
        rows="4"
        value={formData.message}
        onChange={handleChange}
        className="field resize-none"
      />

      {/* ---------- Error ---------- */}

      {error && (
        <div
          className="
            text-sm
            text-red-500
          "
        >
          {error}
        </div>
      )}

      {/* ---------- Success ---------- */}

      {success && (
        <div
          className="
            text-sm
            text-green-600
          "
        >
          {success}
        </div>
      )}

      {/* ---------- Button ---------- */}

      <button
        type="submit"
        disabled={loading}
        className="
          btn-primary
          w-full
        "
      >
        {loading
          ? "Booking..."
          : "Book Appointment"}
      </button>
    </form>
  );
}