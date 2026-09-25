import Image from "next/image";
import type { ReactNode } from "react";

/** CTAs scroll to the Acuity embed unless given another href. */
export const BOOK_HREF = "#book";

export function CtaButton({
  children = "BOOK A FREE CALL",
  size = "lg",
  variant = "brand",
  href = BOOK_HREF,
  className = "",
}: {
  children?: ReactNode;
  href?: string;
  size?: "sm" | "lg";
  variant?: "brand" | "bright";
  className?: string;
}) {
  const sizing = size === "sm" ? "h-11 px-4 text-xl sm:h-12 sm:px-6 sm:text-[22px]" : "h-16 px-8 text-[28px]";
  const colors =
    variant === "bright"
      ? "bg-brand-bright text-ink-muted hover:bg-brand-bright-dark"
      : "bg-brand text-white hover:bg-brand-dark";
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center whitespace-nowrap font-display leading-[0.78] font-extrabold transition-colors ${colors} ${sizing} ${className}`}
    >
      {children}
    </a>
  );
}

/** Condensed, all-caps display heading used for the centered section titles. */
export function SectionHeading({
  children,
  underline = false,
}: {
  children: ReactNode;
  underline?: boolean;
}) {
  return (
    <div className="mx-auto flex max-w-[827px] flex-col items-center px-4 text-center">
      <h2 className="font-display text-5xl leading-[0.78] font-extrabold sm:text-[72px]">
        {children}
      </h2>
      {underline && (
        <Image
          src="/images/underline-testimonials.svg"
          alt=""
          width={789}
          height={22}
          unoptimized
          className="mt-1 h-auto max-w-full rotate-[0.24deg]"
        />
      )}
    </div>
  );
}
