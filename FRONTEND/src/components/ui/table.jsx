import React from "react";

import { cn } from "../../lib/utils";

export function Table({
  className,
  ...props
}) {
  return (
    <table
      className={cn(
        "w-full text-sm",
        className
      )}
      {...props}
    />
  );
}

export function TableHeader(props) {
  return <thead {...props} />;
}

export function TableBody(props) {
  return <tbody {...props} />;
}

export function TableRow({
  className,
  ...props
}) {
  return (
    <tr
      className={cn(
        "border-b border-ink-100",
        className
      )}
      {...props}
    />
  );
}

export function TableHead({
  className,
  ...props
}) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-left font-semibold",
        className
      )}
      {...props}
    />
  );
}

export function TableCell({
  className,
  ...props
}) {
  return (
    <td
      className={cn(
        "px-4 py-4 align-top",
        className
      )}
      {...props}
    />
  );
}