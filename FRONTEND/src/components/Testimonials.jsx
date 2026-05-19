import React from "react";

import { motion } from "framer-motion";

import {
  Star,
  Quote,
} from "lucide-react";

import siteConfig from "../config/site";

/* ---------- Component ---------- */

export default function Testimonials() {

  return (
    <section
      id="testimonials"
      className="section"
    >

      <div className="container-x">

        {/* ---------- Heading ---------- */}

        <div className="max-w-2xl">

          <div className="eyebrow">
            Patient Stories
          </div>

          <h2
            className="
              h-section
              mt-3
            "
          >
            Words From

            <span
              className="
                italic
                text-brand-900
              "
            >
              {" "}
              Our Patients
            </span>
          </h2>
        </div>

        {/* ---------- Testimonials Grid ---------- */}

        <div
          className="
            mt-12
            grid
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
          "
        >

          {siteConfig.testimonials.map(
            (testimonial, index) => (
              <motion.figure
                key={testimonial.name}

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
                  delay: index * 0.07,
                }}

                className="
                  relative
                  glass
                  rounded-3xl
                  p-7
                  hover:-translate-y-1.5
                  transition-all
                  duration-500
                "
              >

                {/* ---------- Quote Icon ---------- */}

                <Quote
                  size={28}
                  className="
                    absolute
                    top-5
                    right-5
                    text-brand-200
                  "
                />

                {/* ---------- Stars ---------- */}

                <div
                  className="
                    flex
                    items-center
                    gap-1
                    text-amber-500
                  "
                >

                  {Array.from({
                    length:
                      testimonial.rating,
                  }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      fill="currentColor"
                      stroke="none"
                    />
                  ))}
                </div>

                {/* ---------- Quote ---------- */}

                <blockquote
                  className="
                    mt-4
                    text-ink-700
                    leading-relaxed
                    text-[15px]
                  "
                >
                  "{testimonial.quote}"
                </blockquote>

                {/* ---------- Footer ---------- */}

                <figcaption
                  className="
                    mt-5
                    pt-4
                    border-t
                    border-white/60
                  "
                >

                  <div
                    className="
                      font-semibold
                      text-ink-900
                    "
                  >
                    {testimonial.name}
                  </div>

                  <div
                    className="
                      text-xs
                      uppercase
                      tracking-wider
                      text-ink-500
                      mt-1
                    "
                  >
                    {testimonial.role}
                  </div>
                </figcaption>
              </motion.figure>
            )
          )}
        </div>
      </div>
    </section>
  );
}