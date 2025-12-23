import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export default function SectionHeading({ eyebrow, title, description, className }: Props) {
  return (
    <div className={cn("mb-10 space-y-4", className)}>
      {eyebrow ? (
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-fg">
            {eyebrow}
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
        </div>
      ) : (
        <div className="h-px w-16 bg-gradient-to-r from-primary/70 to-transparent" />
      )}

      <div>
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          <span className="bg-gradient-to-r from-fg via-fg/90 to-fg/70 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-fg sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
