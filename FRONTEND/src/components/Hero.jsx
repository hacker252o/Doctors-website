import React from "react";

import { motion } from "framer-motion";

import {
  CalendarPlus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import siteConfig from "../config/site";

/* ---------- WhatsApp Icon ---------- */

const WhatsAppIcon = ({
  size = 18,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.54 0 .25 5.29.25 11.8c0 2.08.55 4.11 1.6 5.9L0 24l6.46-1.69a11.83 11.83 0 0 0 5.59 1.42h.01c6.51 0 11.8-5.29 11.8-11.8 0-3.15-1.23-6.11-3.34-8.45Z" />
    </svg>
  );
};

/* ---------- Component ---------- */

export default function Hero({
  onBook,
}) {

  const whatsappLink =
    `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
      "Hi, I'd like to book an appointment."
    )}`;

  return (
    <section
      className="
        hero-grad
        pt-32
        md:pt-40
        pb-20
        md:pb-28
        relative
        overflow-hidden
      "
    >

      <div
        className="
          container-x
          grid
          lg:grid-cols-12
          gap-10
          lg:gap-16
          items-center
        "
      >

        {/* ---------- Left Content ---------- */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.7,
          }}

          className="
            lg:col-span-7
          "
        >

          {/* ---------- Badge ---------- */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-brand-50
              text-brand-900
              px-4
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-wider
            "
          >
            <Sparkles size={14} />

            Premium Healthcare
          </div>

          {/* ---------- Heading ---------- */}

          <h1
            className="
              h-display
              mt-6
            "
          >
            Expert Healthcare
            <br />

            <span
              className="
                italic
                text-brand-900
              "
            >
              You Can Trust.
            </span>
          </h1>

          {/* ---------- Description ---------- */}

          <p
            className="
              mt-6
              text-lg
              text-ink-500
              max-w-xl
              leading-relaxed
            "
          >
            {siteConfig.brand.subtagline}
          </p>

          {/* ---------- Buttons ---------- */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              gap-3
            "
          >

            {/* ---------- Appointment ---------- */}

            <button
              onClick={onBook}
              className="btn-primary"
            >
              <CalendarPlus size={18} />

              Book Appointment
            </button>

            {/* ---------- WhatsApp ---------- */}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon />

              Contact on WhatsApp
            </a>
          </div>

          {/* ---------- Features ---------- */}

          <div
            className="
              mt-10
              flex
              flex-wrap
              items-center
              gap-5
              text-sm
              text-ink-500
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <ShieldCheck
                size={16}
                className="text-brand-700"
              />

              Board-certified specialists
            </div>

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-ink-300
                "
              />

              24/7 Emergency
            </div>

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-ink-300
                "
              />

              Insurance Accepted
            </div>
          </div>
        </motion.div>

        {/* ---------- Right Image ---------- */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          transition={{
            duration: 0.9,
            delay: 0.15,
          }}

          className="
            lg:col-span-5
            relative
          "
        >

          {/* ---------- Image ---------- */}

          <div
            className="
              relative
              aspect-[4/5]
              rounded-[2.5rem]
              overflow-hidden
              shadow-glow
            "
          >

            <img
              src={siteConfig.images.hero}
              alt="Clinic Doctor"
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
              "
              loading="eager"
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/40
                via-transparent
                to-transparent
              "
            />
          </div>

          {/* ---------- Floating Card ---------- */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.6,
            }}

            className="
              absolute
              -left-3
              sm:left-6
              -bottom-6
              glass
              rounded-2xl
              p-4
              pr-5
              flex
              items-center
              gap-3
              max-w-[260px]
            "
          >

            <div
              className="
                h-10
                w-10
                rounded-full
                bg-brand-900
                text-white
                flex
                items-center
                justify-center
              "
            >
              <ShieldCheck size={18} />
            </div>

            <div>
              <div
                className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-brand-900
                  font-semibold
                "
              >
                Trusted By
              </div>

              <div
                className="
                  text-sm
                  text-ink-700
                  font-semibold
                "
              >
                10,000+ Patients
              </div>
            </div>
          </motion.div>

          {/* ---------- Appointment Card ---------- */}

          <div
            className="
              absolute
              -right-3
              top-10
              hidden
              md:block
              glass
              rounded-2xl
              px-4
              py-3
              text-sm
            "
          >
            <div
              className="
                text-xs
                uppercase
                tracking-wider
                text-brand-900
                font-semibold
              "
            >
              Today
            </div>

            <div
              className="
                font-semibold
                text-ink-700
              "
            >
              Next Slot: 11:30 AM
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}