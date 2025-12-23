import React from "react";
import Container from "@/components/Container";
import { EVENT } from "@/constants/event";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <Container className="py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold">{EVENT.name}</div>
            <div className="mt-1 text-sm text-muted-fg">{EVENT.cityLabel}</div>
          </div>
          <a className="text-sm text-muted-fg hover:text-fg" href={`mailto:${EVENT.contactEmail}`}>
            문의: {EVENT.contactEmail}
          </a>
        </div>
        <div className="mt-6 text-xs text-muted-fg">
          © {new Date().getFullYear()} {EVENT.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

