import React from "react";

import siteConfig from "../config/site";

/* ---------- WhatsApp Icon ---------- */

const WhatsAppIcon = ({
  size = 28,
}) => {

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >

      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.54 0 .25 5.29.25 11.8c0 2.08.55 4.11 1.6 5.9L0 24l6.46-1.69a11.83 11.83 0 0 0 5.59 1.42h.01c6.51 0 11.8-5.29 11.8-11.8 0-3.15-1.23-6.11-3.34-8.45ZM12.06 21.3h-.01a9.46 9.46 0 0 1-4.83-1.32l-.35-.21-3.83 1 1.02-3.74-.23-.38a9.46 9.46 0 0 1-1.45-5.05c0-5.23 4.26-9.49 9.49-9.49 2.54 0 4.92.99 6.72 2.78a9.41 9.41 0 0 1 2.78 6.72c0 5.23-4.26 9.49-9.49 9.49Zm5.21-7.1c-.28-.14-1.69-.83-1.95-.93-.26-.1-.45-.14-.64.14-.19.28-.74.93-.91 1.12-.17.19-.34.21-.62.07-.28-.14-1.18-.43-2.25-1.39a8.43 8.43 0 0 1-1.56-1.94c-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.5.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.35-.26.28-1 .98-1 2.38s1.03 2.76 1.17 2.95c.14.19 2.02 3.08 4.91 4.32.69.3 1.22.48 1.64.61.69.22 1.32.19 1.82.12.56-.08 1.69-.69 1.93-1.36.24-.66.24-1.23.17-1.36-.07-.13-.26-.21-.54-.35Z" />
    </svg>
  );
};

/* ---------- Component ---------- */

export default function FloatingWhatsApp() {

  const whatsappLink =
    `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
      "Hi, I'd like to book an appointment."
    )}`;

  return (
    <a
      href={whatsappLink}

      target="_blank"

      rel="noopener noreferrer"

      aria-label="Chat On WhatsApp"

      className="
        fixed
        bottom-6
        right-6
        z-[100]
        h-14
        w-14
        rounded-full
        bg-emerald-500
        text-white
        shadow-glow
        flex
        items-center
        justify-center
        hover:bg-emerald-600
        transition
        animate-pulseRing
      "
    >

      <WhatsAppIcon />

      <span className="sr-only">
        Chat On WhatsApp
      </span>
    </a>
  );
}