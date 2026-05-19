import React from "react";

import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

import siteConfig from "../config/site";

/* ---------- Quick Links ---------- */

const quickLinks = [
  {
    href: "#about",
    label: "About",
  },

  {
    href: "#services",
    label: "Services",
  },

  {
    href: "#gallery",
    label: "Gallery",
  },

  {
    href: "#testimonials",
    label: "Testimonials",
  },

  {
    href: "#faq",
    label: "FAQ",
  },

  {
    href: "#contact",
    label: "Contact",
  },
];

/* ---------- Social Links ---------- */

const socialLinks = [
  {
    Icon: Instagram,
    href: siteConfig.social.instagram,
    label: "instagram",
  },

  {
    Icon: Facebook,
    href: siteConfig.social.facebook,
    label: "facebook",
  },

  {
    Icon: Twitter,
    href: siteConfig.social.twitter,
    label: "twitter",
  },

  {
    Icon: Linkedin,
    href: siteConfig.social.linkedin,
    label: "linkedin",
  },

  {
    Icon: Youtube,
    href: siteConfig.social.youtube,
    label: "youtube",
  },
];

/* ---------- Component ---------- */

export default function Footer() {

  return (
    <footer
      className="
        bg-ink-900
        text-white/80
      "
    >

      {/* ---------- Top Footer ---------- */}

      <div
        className="
          container-x
          py-16
          grid
          md:grid-cols-12
          gap-10
        "
      >

        {/* ---------- Brand ---------- */}

        <div
          className="
            md:col-span-5
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <span
              className="
                h-10
                w-10
                rounded-full
                bg-brand-500/15
                text-brand-200
                font-serif
                text-lg
                flex
                items-center
                justify-center
              "
            >
              {
                siteConfig.brand
                  .logoMark
              }
            </span>

            <span
              className="
                font-serif
                text-2xl
                text-white
              "
            >
              {
                siteConfig.brand
                  .name
              }
            </span>
          </div>

          <p
            className="
              mt-4
              text-white/60
              max-w-sm
              leading-relaxed
              text-sm
            "
          >
            Premium healthcare
            delivered with compassion,
            precision, and modern
            technology for every
            patient.
          </p>

          {/* ---------- Social ---------- */}

          <div
            className="
              mt-6
              flex
              items-center
              gap-3
            "
          >

            {socialLinks.map(
              ({
                Icon,
                href,
                label,
              }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    h-10
                    w-10
                    rounded-full
                    bg-white/5
                    hover:bg-white/10
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    text-white/70
                    hover:text-white
                    transition
                  "
                >
                  <Icon size={16} />
                </a>
              )
            )}
          </div>
        </div>

        {/* ---------- Quick Links ---------- */}

        <div
          className="
            md:col-span-3
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
            Quick Links
          </div>

          <ul
            className="
              mt-5
              space-y-3
              text-sm
            "
          >

            {quickLinks.map(
              (link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="
                      hover:text-white
                      transition
                    "
                  >
                    {link.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* ---------- Timings ---------- */}

        <div
          className="
            md:col-span-4
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
            Clinic Timings
          </div>

          <ul
            className="
              mt-5
              space-y-3
              text-sm
            "
          >

            {siteConfig.timings.map(
              (timing) => (
                <li
                  key={timing.label}
                  className="
                    flex
                    justify-between
                    border-b
                    border-white/5
                    pb-2
                  "
                >

                  <span
                    className="
                      text-white/60
                    "
                  >
                    {timing.label}
                  </span>

                  <span
                    className="
                      text-white
                    "
                  >
                    {timing.value}
                  </span>
                </li>
              )
            )}
          </ul>

          {/* ---------- Emergency ---------- */}

          <div
            className="
              mt-6
              text-xs
              text-white/50
            "
          >
            Emergency:

            <span
              className="
                text-white
                ml-2
              "
            >
              {
                siteConfig.emergency
                  .number
              }
            </span>
          </div>
        </div>
      </div>

      {/* ---------- Bottom Footer ---------- */}

      <div
        className="
          border-t
          border-white/10
        "
      >

        <div
          className="
            container-x
            py-5
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-3
            text-xs
            text-white/50
          "
        >

          <div>
            ©{" "}
            {new Date().getFullYear()}{" "}
            {
              siteConfig.brand
                .name
            }
            . All rights reserved.
          </div>

          <div
            className="
              flex
              items-center
              gap-5
            "
          >

            <a
              href="#"
              className="
                hover:text-white
                transition
              "
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="
                hover:text-white
                transition
              "
            >
              Terms Of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}