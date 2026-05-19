import React, {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  Lock,
  Mail,
  Loader2,
  ArrowLeft,
} from "lucide-react";

import {
  toast,
} from "sonner";

import api, {
  formatApiErrorDetail,
} from "../lib/api";

import siteConfig from "../config/site";

/* ---------- Component ---------- */

export default function AdminLoginPage() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* ---------- Submit ---------- */

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response =
        await api.post(
          "/admin/login",
          {
            email,
            password,
          }
        );

      const data =
        response.data;

      /* ---------- Save Auth ---------- */

      localStorage.setItem(
        "admin_token",
        data.access_token
      );

      localStorage.setItem(
        "admin_user",
        JSON.stringify(
          data.user
        )
      );

      toast.success(
        "Welcome back, Admin."
      );

      navigate("/admin");

    } catch (error) {

      toast.error(
        formatApiErrorDetail(
          error?.response?.data
            ?.detail
        ) || "Login failed."
      );

    } finally {

      setLoading(false);
    }
  };

  /* ---------- Render ---------- */

  return (
    <div
      className="
        min-h-screen
        bg-ink-50
        flex
        flex-col
      "
    >

      {/* ---------- Top ---------- */}

      <div
        className="
          container-x
          py-6
        "
      >

        <Link
          to="/"
          className="
            inline-flex
            items-center
            gap-1.5
            text-sm
            text-ink-500
            hover:text-ink-900
            transition
          "
        >

          <ArrowLeft size={14} />

          Back To Site
        </Link>
      </div>

      {/* ---------- Center ---------- */}

      <div
        className="
          flex-1
          flex
          items-center
          justify-center
          px-6
          pb-12
        "
      >

        <div
          className="
            w-full
            max-w-md
          "
        >

          {/* ---------- Heading ---------- */}

          <div
            className="
              text-center
              mb-7
            "
          >

            <div
              className="
                mx-auto
                h-12
                w-12
                rounded-full
                bg-brand-900
                text-white
                font-serif
                text-xl
                flex
                items-center
                justify-center
                mb-4
              "
            >
              {
                siteConfig.brand
                  .logoMark
              }
            </div>

            <h1
              className="
                font-serif
                text-4xl
                text-ink-900
              "
            >
              Admin Console
            </h1>

            <p
              className="
                text-sm
                text-ink-500
                mt-2
              "
            >
              Sign in to manage
              appointments and
              messages
            </p>
          </div>

          {/* ---------- Form ---------- */}

          <form
            onSubmit={
              handleSubmit
            }
            className="
              bg-white
              rounded-3xl
              shadow-soft
              border
              border-ink-100
              p-8
              space-y-5
            "
          >

            {/* ---------- Email ---------- */}

            <div>

              <label
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-ink-700
                "
              >
                Email
              </label>

              <div
                className="
                  relative
                  mt-1.5
                "
              >

                <Mail
                  size={16}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-ink-500
                  "
                />

                <input
                  type="email"

                  required

                  placeholder="admin@clinic.com"

                  value={email}

                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }

                  className="
                    field
                    pl-11
                  "
                />
              </div>
            </div>

            {/* ---------- Password ---------- */}

            <div>

              <label
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-ink-700
                "
              >
                Password
              </label>

              <div
                className="
                  relative
                  mt-1.5
                "
              >

                <Lock
                  size={16}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-ink-500
                  "
                />

                <input
                  type="password"

                  required

                  placeholder="••••••••"

                  value={password}

                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }

                  className="
                    field
                    pl-11
                  "
                />
              </div>
            </div>

            {/* ---------- Submit ---------- */}

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

                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}