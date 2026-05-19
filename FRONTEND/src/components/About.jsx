import React from "react";

import { motion } from "framer-motion";

import {
  CheckCircle2,
} from "lucide-react";

import siteConfig from "../config/site";

/* ---------- About Points ---------- */

const points = [
  "Decades of clinical excellence across specialties",

  "Patient-first consultations with compassionate care",

  "Advanced diagnostics and treatment technology",

  "Trusted by thousands of families and patients",
];

/* ---------- Component ---------- */

export default function About() {

  return (
    <section
      id="about"
      className="section"
    >

      <div
        className="
          container-x
          grid
          lg:grid-cols-12
          gap-12
          items-center
        "
      >

        {/* ---------- Left Image ---------- */}

        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}

          whileInView={{
            opacity: 1,
            x: 0,
          }}

          viewport={{
            once: true,
            margin: "-80px",
          }}

          transition={{
            duration: 0.7,
          }}

          className="
            lg:col-span-6
            relative
          "
        >

          {/* ---------- Image ---------- */}

          <div
            className="
              aspect-[5/6]
              rounded-[2.5rem]
              overflow-hidden
              shadow-soft
            "
          >

            <img
              src={siteConfig.images.about}
              alt="Professional Doctor"
              className="
                w-full
                h-full
                object-cover
              "
            />
          </div>

          {/* ---------- Floating Card ---------- */}

          <div
            className="
              absolute
              -bottom-6
              right-4
              sm:right-8
              glass
              rounded-2xl
              px-5
              py-4
            "
          >

            <div
              className="
                text-3xl
                font-serif
                text-brand-900
              "
            >
              98
              <span className="text-brand-500">
                %
              </span>
            </div>

            <div
              className="
                text-xs
                uppercase
                tracking-wider
                text-ink-500
                font-semibold
              "
            >
              Patient Satisfaction
            </div>
          </div>
        </motion.div>

        {/* ---------- Right Content ---------- */}

        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}

          whileInView={{
            opacity: 1,
            x: 0,
          }}

          viewport={{
            once: true,
            margin: "-80px",
          }}

          transition={{
            duration: 0.7,
            delay: 0.1,
          }}

          className="
            lg:col-span-6
          "
        >

          {/* ---------- Label ---------- */}

          <div className="eyebrow">
            About The Clinic
          </div>

          {/* ---------- Heading ---------- */}

          <h2
            className="
              h-section
              mt-3
            "
          >
            A Modern Sanctuary For

            <span
              className="
                italic
                text-brand-900
              "
            >
              {" "}
              World-Class Care
            </span>
          </h2>

          {/* ---------- Description ---------- */}

          <p
            className="
              mt-5
              text-ink-500
              leading-relaxed
            "
          >
            We have reimagined what a modern clinic
            should feel like — calm spaces,
            experienced doctors, advanced diagnostics,
            and compassionate healthcare designed
            around every patient.
          </p>

          {/* ---------- Points ---------- */}

          <ul
            className="
              mt-7
              space-y-4
            "
          >

            {points.map((point) => (
              <li
                key={point}
                className="
                  flex
                  items-start
                  gap-3
                "
              >

                <CheckCircle2
                  size={20}
                  className="
                    text-brand-700
                    shrink-0
                    mt-0.5
                  "
                />

                <span className="text-ink-700">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}