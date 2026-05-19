import * as React from "react";

import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "../../lib/utils";

export const Tabs =
  TabsPrimitive.Root;

export const TabsList =
  React.forwardRef(
    ({ className, ...props }, ref) => (
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          "inline-flex items-center",
          className
        )}
        {...props}
      />
    )
  );

export const TabsTrigger =
  React.forwardRef(
    ({ className, ...props }, ref) => (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          "transition",
          className
        )}
        {...props}
      />
    )
  );

export const TabsContent =
  React.forwardRef(
    ({ className, ...props }, ref) => (
      <TabsPrimitive.Content
        ref={ref}
        className={cn(
          "mt-4",
          className
        )}
        {...props}
      />
    )
  );