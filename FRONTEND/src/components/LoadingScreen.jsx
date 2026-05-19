import React, {
  useEffect,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import siteConfig from "../config/site";

/* ---------- Component ---------- */

export default function LoadingScreen() {

  const [visible, setVisible] =
    useState(true);

  /* ---------- Hide Loader ---------- */

  useEffect(() => {

    const timer =
      setTimeout(() => {
        setVisible(false);
      }, 1200);

    return () =>
      clearTimeout(timer);

  }, []);

  return (
    <AnimatePresence>

      {visible && (

        <motion.div
          initial={{
            opacity: 1,
          }}

          exit={{
            opacity: 0,
          }}

          transition={{
            duration: 0.45,
          }}

          className="
            fixed
            inset-0
            z-[200]
            bg-white
            flex
            items-center
            justify-center
          "
        >

          <div
            className="
              flex
              flex-col
              items-center
            "
          >

            {/* ---------- Logo ---------- */}

            <motion.div
              initial={{
                scale: 0.7,
                opacity: 0,
              }}

              animate={{
                scale: 1,
                opacity: 1,
              }}

              transition={{
                duration: 0.5,
              }}

              className="
                relative
                h-16
                w-16
                rounded-full
                bg-brand-900
                text-white
                flex
                items-center
                justify-center
                font-serif
                text-2xl
                shadow-glow
              "
            >

              {siteConfig.brand.logoMark}

              {/* ---------- Ping ---------- */}

              <span
                className="
                  absolute
                  inset-0
                  rounded-full
                  border-2
                  border-brand-200
                  animate-ping
                "
              />
            </motion.div>

            {/* ---------- Brand Name ---------- */}

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay: 0.2,
                duration: 0.5,
              }}

              className="
                mt-5
                font-serif
                text-2xl
                text-ink-900
                tracking-tight
              "
            >

              {siteConfig.brand.name}
            </motion.div>

            {/* ---------- Subtitle ---------- */}

            <div
              className="
                mt-3
                text-xs
                uppercase
                tracking-[0.3em]
                text-ink-500
              "
            >
              Premium Healthcare
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}