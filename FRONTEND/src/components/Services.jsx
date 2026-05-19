import React from "react";

import { motion } from "framer-motion";

import {
  Stethoscope,
  Baby,
  HeartPulse,
  Smile,
  Sparkles,
  Microscope,
  Ambulance,
  ArrowUpRight,
} from "lucide-react";

import siteConfig from "../config/site";

/* ---------- Icon Mapping ---------- */

const iconMap = {
  Stethoscope,
  Baby,
  HeartPulse,
  Smile,
  Sparkles,
  Microscope,
  Ambulance,
};

/* ---------- Component ---------- */

export default function Services({
  onBook,
}) {

  return (
    <section
      id="services"
      className="
        section
        bg-ink-50
      "
    >

      <div className="container-x">

        {/* ---------- Heading ---------- */}

        <div className="max-w-2xl">

          <div className="eyebrow">
            Our Services
          </div>

          <h2
            className="
              h-section
              mt-3
            "
          >
            Comprehensive Care,

            <span
              className="
                italic
                text-brand-900
              "
            >
              {" "}
              Elegantly Delivered
            </span>
          </h2>

          <p
            className="
              mt-4
              text-ink-500
              leading-relaxed
            "
          >
            From routine checkups to advanced
            specialist treatment, every service
            is delivered with precision,
            compassion, and modern technology.
          </p>
        </div>

        {/* ---------- Services Grid ---------- */}

        <div
          className="
            mt-12
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-5
          "
        >

          {siteConfig.services.map(
            (service, index) => {

              const Icon =
                iconMap[service.icon] ||
                Stethoscope;

              return (
                <motion.button
                  key={service.key}

                  onClick={onBook}

                  initial={{
                    opacity: 0,
                    y: 24,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  viewport={{
                    once: true,
                    margin: "-60px",
                  }}

                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                  }}

                  className="
                    group
                    text-left
                    bg-white
                    border
                    border-ink-100
                    rounded-3xl
                    p-7
                    hover:-translate-y-1.5
                    hover:shadow-glow
                    transition-all
                    duration-500
                  "
                >

                  {/* ---------- Icon ---------- */}

                  <div
                    className="
                      h-12
                      w-12
                      rounded-2xl
                      bg-brand-50
                      text-brand-900
                      flex
                      items-center
                      justify-center
                      mb-5
                      group-hover:bg-brand-900
                      group-hover:text-white
                      transition-colors
                      duration-500
                    "
                  >
                    <Icon size={22} />
                  </div>

                  {/* ---------- Title ---------- */}

                  <h3
                    className="
                      font-serif
                      text-2xl
                      text-ink-900
                      leading-tight
                    "
                  >
                    {service.title}
                  </h3>

                  {/* ---------- Description ---------- */}

                  <p
                    className="
                      mt-2
                      text-sm
                      text-ink-500
                      leading-relaxed
                    "
                  >
                    {service.blurb}
                  </p>

                  {/* ---------- CTA ---------- */}

                  <div
                    className="
                      mt-5
                      inline-flex
                      items-center
                      gap-1.5
                      text-xs
                      font-semibold
                      tracking-wider
                      uppercase
                      text-brand-900
                    "
                  >
                    Book Now

                    <ArrowUpRight
                      size={14}
                      className="
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                        transition-transform
                      "
                    />
                  </div>
                </motion.button>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}