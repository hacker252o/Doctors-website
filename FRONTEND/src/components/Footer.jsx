import React from "react";

import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

import siteConfig from "../config/site";

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {

  return (
    <footer
      data-testid="site-footer"
      className="bg-ink-900 text-white/80"
    >

      <div className="container-x py-16 grid md:grid-cols-12 gap-10">

        {/* ---------- Brand ---------- */}

        <div className="md:col-span-5">

          <div className="flex items-center gap-2.5">

            <span className="h-10 w-10 rounded-full bg-brand-500/15 text-brand-200 font-serif text-lg flex items-center justify-center">
              {siteConfig.brand.logoMark}
            </span>

            <span className="font-serif text-2xl text-white">
              {siteConfig.brand.name}
            </span>
          </div>

          <p className="mt-4 text-white/60 max-w-sm leading-relaxed text-sm">
            Premium healthcare delivered with warmth,
            precision and modern technology.
          </p>

          {/* ---------- Social ---------- */}

          <div className="mt-6 flex items-center gap-3">

            {[
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
            ].map(
              ({
                Icon,
                href,
                label,
              }) => (

                <a
                  key={label}
                  href={href || "/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`social-${label}`}
                  className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition"
                >
                  <Icon size={16} />
                </a>
              )
            )}
          </div>
        </div>

        {/* ---------- Quick Links ---------- */}

        <div className="md:col-span-3">

          <div className="text-xs uppercase tracking-[0.2em] text-brand-200 font-semibold">
            Quick Links
          </div>

          <ul className="mt-5 space-y-2.5 text-sm">

            {quickLinks.map((l) => (

              <li key={l.href}>

                <a
                  href={l.href}
                  className="hover:text-white transition"
                  data-testid={`footer-link-${l.label.toLowerCase()}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Timings ---------- */}

        <div className="md:col-span-4">

          <div className="text-xs uppercase tracking-[0.2em] text-brand-200 font-semibold">
            Clinic Timings
          </div>

          <ul className="mt-5 space-y-2.5 text-sm">

            {siteConfig.timings.map((t) => (

              <li
                key={t.label}
                className="flex justify-between border-b border-white/5 pb-2"
              >
                <span className="text-white/60">
                  {t.label}
                </span>

                <span className="text-white">
                  {t.value}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-xs text-white/50">
            Emergency:
            <span className="text-white ml-1">
              {siteConfig.emergency.number}
            </span>
          </div>
        </div>
      </div>

      {/* ---------- Bottom ---------- */}

      <div className="border-t border-white/10">

        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">

          <div>
            © {new Date().getFullYear()}
            {" "}
            {siteConfig.brand.name}.
            All rights reserved.
          </div>

          <div className="flex items-center gap-5">

            <a
              href="/"
              className="hover:text-white transition"
            >
              Privacy Policy
            </a>

            <a
              href="/"
              className="hover:text-white transition"
            >
              Terms of Service
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}