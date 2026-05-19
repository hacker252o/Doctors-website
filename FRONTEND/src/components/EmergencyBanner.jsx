import React from "react";

import {
  Phone,
  Siren,
} from "lucide-react";

import siteConfig from "../config/site";

/* ---------- Component ---------- */

export default function EmergencyBanner() {

  /* ---------- Clean Phone Number ---------- */

  const cleanPhoneNumber =
    siteConfig.emergency.number.replace(
      /[\s()-]/g,
      ""
    );

  return (
    <div
      className="
        bg-brand-900
        text-white
        text-xs
        sm:text-sm
      "
    >
      <div
        className="
          container-x
          flex
          flex-col
          sm:flex-row
          items-center
          justify-between
          gap-2
          py-2
        "
      >

        {/* ---------- Left Side ---------- */}

        <div
          className="
            flex
            items-center
            gap-2.5
          "
        >

          {/* ---------- Pulse Dot ---------- */}

          <span
            className="
              relative
              flex
              h-2.5
              w-2.5
            "
          >
            <span
              className="
                absolute
                inline-flex
                h-full
                w-full
                rounded-full
                bg-rose-400
                opacity-70
                animate-ping
              "
            />

            <span
              className="
                relative
                inline-flex
                h-2.5
                w-2.5
                rounded-full
                bg-rose-500
              "
            />
          </span>

          {/* ---------- Icon ---------- */}

          <Siren
            size={14}
            className="text-white/80"
          />

          {/* ---------- Label ---------- */}

          <span className="tracking-wide">
            {siteConfig.emergency.label}
          </span>
        </div>

        {/* ---------- Phone Link ---------- */}

        <a
          href={`tel:${cleanPhoneNumber}`}
          className="
            flex
            items-center
            gap-2
            font-semibold
            hover:text-brand-200
            transition
          "
        >
          <Phone size={14} />

          {siteConfig.emergency.number}
        </a>
      </div>
    </div>
  );
}