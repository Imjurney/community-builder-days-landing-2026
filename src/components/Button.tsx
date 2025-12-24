import React from "react";
import { cn } from "@/lib/utils";

type Props = React.ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  className,
  variant = "primary",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";
  const variants: Record<NonNullable<Props["variant"]>, string> = {
    primary: "bg-primary text-primary-fg hover:brightness-110 shadow-glow",
    secondary: "bg-white/5 text-fg hover:bg-white/10 border border-white/10",
  };

  return <a className={cn(base, variants[variant], className)} {...props} />;
}
