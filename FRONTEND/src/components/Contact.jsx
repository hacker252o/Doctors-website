import React, {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Loader2,
} from "lucide-react";

import api, {
  formatApiErrorDetail,
} from "../lib/api";

import siteConfig from "../config/site";

import AppointmentForm from "./AppointmentForm";

/* ---------- Component ---------- */

export default function Contact() {

  const [messageData, setMessageData] =
    useState({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

  const [loading, setLoading] =
    useState(false);

  /* ---------- Send Message ---------- */

  const sendMessage = async (
    e
  ) => {

    e.preventDefault();

    if (
      !messageData.name ||
      !messageData.email ||
      !messageData.message
    ) {

      alert(
        "Please fill all required fields."
      );

      return;
    }

    setLoading(true);

    try {

      await api.post(
        "/contact",
        messageData
      );

      alert(
        "Message sent successfully."
      );

      setMessageData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

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

  /* ---------- Render ---------- */

  return (
    <section
      id="contact"
      className="section"
    >

      <div className="container-x">

        <div
          className="
            grid
            lg:grid-cols-12
            gap-10
            items-start
          "
        >

          {/* ---------- Appointment Column ---------- */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            viewport={{
              once: true,
              margin: "-80px",
            }}

            transition={{
              duration: 0.6,
            }}

            className="
              lg:col-span-7
              bg-white
              rounded-[2rem]
              border
              border-ink-100
              shadow-soft
              p-6
              sm:p-10
            "
          >

            <div className="eyebrow">
              Book Appointment
            </div>

            <h2
              className="
                h-section
                mt-2
              "
            >
              Schedule Your

              <span
                className="
                  italic
                  text-brand-900
                "
              >
                {" "}
                Consultation
              </span>
            </h2>

            <p
              className="
                mt-3
                text-ink-500
              "
            >
              Choose a convenient
              time and our team will
              contact you shortly.
            </p>

            <div className="mt-7">
              <AppointmentForm />
            </div>
          </motion.div>

          {/* ---------- Contact Column ---------- */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            viewport={{
              once: true,
              margin: "-80px",
            }}

            transition={{
              duration: 0.6,
              delay: 0.1,
            }}

            className="
              lg:col-span-5
              space-y-5
            "
          >

            {/* ---------- Map ---------- */}

            <div
              className="
                rounded-[2rem]
                overflow-hidden
                border
                border-ink-100
                aspect-[5/3]
                bg-ink-100
              "
            >

              <iframe
                title="Clinic Location"
                src={
                  siteConfig.contact
                    .mapEmbed
                }
                width="100%"
                height="100%"
                style={{
                  border: 0,
                }}
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* ---------- Contact Info ---------- */}

            <div
              className="
                bg-brand-900
                text-white
                rounded-[2rem]
                p-7
              "
            >

              <div
                className="
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-brand-200
                  font-semibold
                "
              >
                Get In Touch
              </div>

              <ul
                className="
                  mt-5
                  space-y-4
                  text-sm
                "
              >

                {/* ---------- Address ---------- */}

                <li
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >

                  <span
                    className="
                      h-9
                      w-9
                      rounded-full
                      bg-white/10
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <MapPin size={16} />
                  </span>

                  <span
                    className="
                      text-white/90
                    "
                  >
                    {
                      siteConfig.contact
                        .address
                    }
                  </span>
                </li>

                {/* ---------- Phone ---------- */}

                <li
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <span
                    className="
                      h-9
                      w-9
                      rounded-full
                      bg-white/10
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <Phone size={16} />
                  </span>

                  <a
                    href={`tel:${siteConfig.contact.phone.replace(
                      /[\s()-]/g,
                      ""
                    )}`}
                    className="
                      text-white/90
                      hover:text-white
                    "
                  >
                    {
                      siteConfig.contact
                        .phone
                    }
                  </a>
                </li>

                {/* ---------- Email ---------- */}

                <li
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <span
                    className="
                      h-9
                      w-9
                      rounded-full
                      bg-white/10
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <Mail size={16} />
                  </span>

                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="
                      text-white/90
                      hover:text-white
                    "
                  >
                    {
                      siteConfig.contact
                        .email
                    }
                  </a>
                </li>

                {/* ---------- Hours ---------- */}

                <li
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >

                  <span
                    className="
                      h-9
                      w-9
                      rounded-full
                      bg-white/10
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <Clock size={16} />
                  </span>

                  <div
                    className="
                      text-white/90
                      space-y-1
                    "
                  >

                    {siteConfig.contact.hours.map(
                      (hour) => (
                        <div
                          key={
                            hour.label
                          }
                        >
                          <span
                            className="
                              text-brand-200
                              mr-2
                            "
                          >
                            {
                              hour.label
                            }
                          </span>

                          {
                            hour.value
                          }
                        </div>
                      )
                    )}
                  </div>
                </li>
              </ul>
            </div>

            {/* ---------- Message Form ---------- */}

            <form
              onSubmit={sendMessage}
              className="
                bg-white
                rounded-[2rem]
                border
                border-ink-100
                p-6
                sm:p-7
                space-y-3
              "
            >

              <div className="eyebrow">
                Send Message
              </div>

              <input
                type="text"
                placeholder="Your Name"
                value={messageData.name}
                onChange={(e) =>
                  setMessageData({
                    ...messageData,
                    name:
                      e.target.value,
                  })
                }
                className="field"
              />

              <div
                className="
                  grid
                  sm:grid-cols-2
                  gap-3
                "
              >

                <input
                  type="email"
                  placeholder="Email"
                  value={
                    messageData.email
                  }
                  onChange={(e) =>
                    setMessageData({
                      ...messageData,
                      email:
                        e.target.value,
                    })
                  }
                  className="field"
                />

                <input
                  type="text"
                  placeholder="Phone"
                  value={
                    messageData.phone
                  }
                  onChange={(e) =>
                    setMessageData({
                      ...messageData,
                      phone:
                        e.target.value,
                    })
                  }
                  className="field"
                />
              </div>

              <textarea
                rows={3}
                placeholder="Your Message"
                value={
                  messageData.message
                }
                onChange={(e) =>
                  setMessageData({
                    ...messageData,
                    message:
                      e.target.value,
                  })
                }
                className="
                  field
                  resize-none
                "
              />

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

                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}