import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  useInView,
} from "framer-motion";

import siteConfig from "../config/site";

/* ---------- Counter Component ---------- */

function Counter({
  value,
}) {

  const ref = useRef(null);

  const isInView = useInView(
    ref,
    {
      once: true,
      margin: "-50px",
    }
  );

  const [count, setCount] =
    useState(0);

  useEffect(() => {

    if (!isInView) return;

    const numericValue =
      parseInt(
        String(value).replace(/\D/g, "")
      ) || 0;

    let start = 0;

    const duration = 1400;

    const increment =
      numericValue /
      (duration / 16);

    const timer =
      setInterval(() => {

        start += increment;

        if (start >= numericValue) {
          setCount(numericValue);

          clearInterval(timer);
        } else {
          setCount(
            Math.floor(start)
          );
        }
      }, 16);

    return () =>
      clearInterval(timer);

  }, [isInView, value]);

  /* ---------- Extract Suffix ---------- */

  const suffix =
    String(value).replace(/[0-9]/g, "");

  return (
    <span
      ref={ref}
      className="
        font-serif
        text-5xl
        sm:text-6xl
        text-brand-900
        tracking-tight
      "
    >
      {count}

      <span className="text-brand-500">
        {suffix}
      </span>
    </span>
  );
}

/* ---------- Main Component ---------- */

export default function Counters() {

  return (
    <section
      className="
        relative
        -mt-10
        z-10
      "
    >

      <div className="container-x">

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
            duration: 0.7,
          }}

          className="
            glass
            rounded-3xl
            px-6
            sm:px-10
            py-8
            sm:py-10
            grid
            grid-cols-2
            md:grid-cols-4
            gap-6
          "
        >

          {siteConfig.stats.map(
            (stat) => (
              <div
                key={stat.label}
                className="
                  text-center
                  md:text-left
                "
              >

                {/* ---------- Counter ---------- */}

                <div className="leading-none">
                  <Counter
                    value={stat.value}
                  />
                </div>

                {/* ---------- Label ---------- */}

                <div
                  className="
                    text-xs
                    uppercase
                    tracking-[0.18em]
                    text-ink-500
                    mt-2
                    font-semibold
                  "
                >
                  {stat.label}
                </div>
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}