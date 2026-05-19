import React from "react";
import { cn } from "../../lib/utils";

export function buttonVariants({
  variant = "default",
  className = "",
}) {
  const variants = {
    default:
      "bg-brand-900 text-white hover:bg-brand-800",

    outline:
      "border border-ink-200 bg-white hover:bg-ink-50",

    ghost:
      "hover:bg-ink-100",
  };

  return cn(
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",
    variants[variant],
    className
  );
}

export function Button({
  className,
  variant,
  ...props
}) {
  return (
    <button
      className={buttonVariants({
        variant,
        className,
      })}
      {...props}
    />
  );
}