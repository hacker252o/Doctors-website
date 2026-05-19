import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

import AppointmentForm from "./AppointmentForm";

/* ---------- Component ---------- */

export default function AppointmentDialog({
  open,
  onOpenChange,
}) {

  const handleSuccess = () => {

    setTimeout(() => {

      if (onOpenChange) {
        onOpenChange(false);
      }

    }, 2500);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent
        className="
          sm:max-w-2xl
          rounded-3xl
          p-0
          overflow-hidden
          border
          border-ink-100
        "
      >

        {/* ---------- Header ---------- */}

        <div
          className="
            bg-gradient-to-br
            from-brand-50
            to-white
            px-6
            sm:px-8
            pt-7
            pb-5
            border-b
            border-ink-100
          "
        >

          <DialogHeader>

            <DialogTitle
              className="
                font-serif
                text-3xl
                text-ink-900
                leading-tight
              "
            >
              Book Your Appointment
            </DialogTitle>

            <DialogDescription
              className="
                text-ink-500
                mt-2
              "
            >
              Fill in your details and
              our team will confirm
              your appointment shortly.
            </DialogDescription>

          </DialogHeader>
        </div>

        {/* ---------- Form ---------- */}

        <div
          className="
            px-6
            sm:px-8
            py-6
            max-h-[70vh]
            overflow-y-auto
          "
        >

          <AppointmentForm
            compact
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}