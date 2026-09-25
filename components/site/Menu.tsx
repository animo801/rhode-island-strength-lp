"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Menu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        className="flex items-center gap-[13px] font-logo text-[32px] leading-none"
      >
        MENU
        <Image src="/images/menu.svg" alt="" width={32} height={32} unoptimized />
      </button>
      {open && (
        <nav
          id="site-menu"
          className="absolute right-0 top-full z-50 mt-4 flex w-64 flex-col bg-ink-light p-2 shadow-2xl"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 font-display text-2xl leading-none font-extrabold uppercase hover:bg-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
