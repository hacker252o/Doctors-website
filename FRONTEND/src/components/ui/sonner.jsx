import React from "react";

import {
  Toaster as Sonner,
  toast,
} from "sonner";

/* ---------- Toaster ---------- */

const Toaster = ({
  ...props
}) => {

  return (
    <Sonner
      theme="light"

      className="toaster"

      toastOptions={{
        classNames: {

          toast: `
            rounded-2xl
            border
            border-ink-100
            bg-white
            text-ink-900
            shadow-soft
            font-sans
          `,

          description:
            "text-ink-500",

          actionButton: `
            bg-brand-900
            text-white
          `,

          cancelButton: `
            bg-ink-100
            text-ink-700
          `,
        },
      }}

      {...props}
    />
  );
};

/* ---------- Export ---------- */

export {
  Toaster,
  toast,
};