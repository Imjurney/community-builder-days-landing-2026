import React from "react";
import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{
  className?: string;
}>;

export default function Container({ className, children }: Props) {
  return <div className={cn("mx-auto w-full", className)}>{children}</div>;
}
