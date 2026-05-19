import * as React from "react";

import * as SelectPrimitive from "@radix-ui/react-select";

import {
  Check,
  ChevronDown,
} from "lucide-react";

import { cn } from "../../lib/utils";

export const Select =
  SelectPrimitive.Root;

export const SelectValue =
  SelectPrimitive.Value;

export const SelectTrigger =
  React.forwardRef(
    ({ className, children, ...props }, ref) => (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm",
          className
        )}
        {...props}
      >
        {children}

        <SelectPrimitive.Icon>
          <ChevronDown size={16} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    )
  );

export const SelectContent =
  React.forwardRef(
    ({ className, children, ...props }, ref) => (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-xl border border-ink-100 bg-white shadow-lg",
            className
          )}
          {...props}
        >
          <SelectPrimitive.Viewport className="p-1">
            {children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    )
  );

export const SelectItem =
  React.forwardRef(
    ({ className, children, ...props }, ref) => (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 pl-8 pr-2 text-sm outline-none hover:bg-ink-100",
          className
        )}
        {...props}
      >
        <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
          <SelectPrimitive.ItemIndicator>
            <Check size={14} />
          </SelectPrimitive.ItemIndicator>
        </span>

        <SelectPrimitive.ItemText>
          {children}
        </SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    )
  );