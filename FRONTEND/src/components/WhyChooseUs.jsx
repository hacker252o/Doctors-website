import React from "react";

import { motion } from "framer-motion";

import {
  GraduationCap,
  Activity,
  Siren,
  ShieldCheck,
  Award,
} from "lucide-react";

import siteConfig from "../config/site";

/* ---------- Icon Mapping ---------- */

const iconMap = {
  GraduationCap,
  Activity,
  Siren,
  ShieldCheck,
  Award,
};

/* ---------- Component ---------- */

export default function WhyChooseUs() {

  return (
    <section
      className="section"
    >

      <div className="container-x">

        {/* ---------- Top Section ---------- */}

        <div
          className="
            grid
            lg:grid-cols-12
            gap-10
            items-end
          "
        >

          {/* ---------- Heading ---------- */}

          <div
            className="
              lg:col-span-6
            "
          >

            <div className="eyebrow">
              Why Choose Us
            </div>

            <h2
              className="
                h-section
                mt-3
              "
            >
              The Difference Is In

              <span
                className="
                  italic
                  text-brand-900
                "
              >
                {" "}
                Every Detail
              </span>
            </h2>
          </div>

          {/* ---------- Description ---------- */}

          <p
            className="
              lg:col-span-6
              text-ink-500
              leading-relaxed
            "
          >
            We have designed a healthcare experience
            centered around comfort, trust, advanced
            treatment, and compassionate patient care.
          </p>
        </div>

        {/* ---------- Cards ---------- */}

        <div
          className="
            mt-12
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-5
            gap-5
          "
        >

          {siteConfig.whyChooseUs.map(
            (item, index) => {

              const Icon =
                iconMap[item.icon] ||
                ShieldCheck;

              return (
                <motion.div
                  key={item.title}

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
                    rounded-3xl
                    p-6
                    bg-gradient-to-b
                    from-white
                    to-ink-50
                    border
                    border-ink-100
                    hover:shadow-soft
                    transition
                  "
                >

                  {/* ---------- Icon ---------- */}

                  <div
                    className="
                      h-11
                      w-11
                      rounded-2xl
                      bg-brand-900
                      text-white
                      flex
                      items-center
                      justify-center
                      mb-4
                    "
                  >
                    <Icon size={20} />
                  </div>

                  {/* ---------- Title ---------- */}

                  <div
                    className="
                      font-serif
                      text-xl
                      text-ink-900
                      leading-tight
                    "
                  >
                    {item.title}
                  </div>

                  {/* ---------- Description ---------- */}

                  <p
                    className="
                      mt-2
                      text-sm
                      text-ink-500
                      leading-relaxed
                    "
                  >
                    {item.blurb}
                  </p>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}