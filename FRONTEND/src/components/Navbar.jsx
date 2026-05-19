import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  Menu,
  X,
  CalendarPlus,
} from "lucide-react";

import siteConfig from "../config/site";

/* ---------- Navigation Links ---------- */

const links = [
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

/* ---------- Component ---------- */

export default function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  /* ---------- Scroll Effect ---------- */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* ---------- Render ---------- */

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50
        transition-all
        duration-300
        ${
          scrolled
            ? "py-2"
            : "py-4"
        }
      `}
    >
      <div className="container-x">

        <nav
          className={`
            flex
            items-center
            justify-between
            rounded-full
            px-4
            md:px-6
            py-3
            transition-all
            duration-300
            ${
              scrolled
                ? "glass shadow-soft"
                : "bg-white/40 backdrop-blur-md border border-white/40"
            }
          `}
        >

          {/* ---------- Logo ---------- */}

          <Link
            to="/"
            className="
              flex
              items-center
              gap-3
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
                font-bold
                text-lg
                shadow-soft
              "
            >
              {siteConfig.brand.logoMark}
            </div>

            <div
              className="
                font-serif
                text-2xl
                text-ink-900
              "
            >
              {siteConfig.brand.name}
            </div>
          </Link>

          {/* ---------- Desktop Menu ---------- */}

          <ul
            className="
              hidden
              lg:flex
              items-center
              gap-1
            "
          >
            {links.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    text-ink-700
                    hover:text-brand-900
                    hover:bg-white/70
                    transition
                  "
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ---------- Right Side ---------- */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            {/* ---------- Book Button ---------- */}

            <button
              onClick={onBook}
              className="
                hidden
                md:inline-flex
                btn-primary
              "
            >
              <CalendarPlus size={16} />

              Book Appointment
            </button>

            {/* ---------- Mobile Menu Toggle ---------- */}

            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="
                lg:hidden
                h-10
                w-10
                rounded-full
                bg-white/80
                border
                border-gray-200
                flex
                items-center
                justify-center
              "
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <X size={18} />
              ) : (
                <Menu size={18} />
              )}
            </button>
          </div>
        </nav>

        {/* ---------- Mobile Menu ---------- */}

        {menuOpen && (
          <div
            className="
              lg:hidden
              mt-3
              glass
              rounded-3xl
              p-4
            "
          >
            <ul
              className="
                flex
                flex-col
                gap-2
              "
            >
              {links.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="
                      block
                      px-4
                      py-3
                      rounded-2xl
                      text-sm
                      text-ink-700
                      hover:bg-white/70
                      transition
                    "
                  >
                    {item.label}
                  </a>
                </li>
              ))}

              {/* ---------- Mobile Button ---------- */}

              <li className="pt-2">
                <button
                  onClick={() => {
                    setMenuOpen(false);

                    if (onBook) {
                      onBook();
                    }
                  }}
                  className="
                    w-full
                    btn-primary
                  "
                >
                  <CalendarPlus size={16} />

                  Book Appointment
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}