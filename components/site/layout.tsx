import Image from "next/image";
import type { ReactNode } from "react";
import AcuityEmbed from "@/components/AcuityEmbed";
import { SectionHeading } from "./primitives";

/** Logo on the left; `children` fills the right side (menu or CTA). */
export function Header({ logoHref = "/", children }: { logoHref?: string; children?: ReactNode }) {
  return (
    <header className="relative z-30 flex items-center justify-between px-4 py-5 sm:px-8">
      <a href={logoHref} className="flex items-center gap-3">
        <Image src="/images/logo-mark.svg" alt="" width={56} height={56} unoptimized />
        <span className="flex flex-col font-logo leading-none">
          <span className="text-[32px]">RHODE ISLAND</span>
          <span className="text-[15.389px] opacity-60">STRENGTH AND CONDITIONING</span>
        </span>
      </a>
      {children}
    </header>
  );
}

export type StepCard = {
  step: string;
  title: string;
  src: string;
  /** CSS object-position, matching the crop in the design. */
  position: string;
};

/** Centered heading over three tall photo cards with a dark overlay and step labels. */
export function StepCards({
  id,
  heading,
  cards,
  className,
}: {
  id: string;
  heading: ReactNode;
  cards: StepCard[];
  className: string;
}) {
  return (
    <section id={id} className={`scroll-mt-4 ${className}`}>
      <SectionHeading>{heading}</SectionHeading>
      <div className="mx-auto mt-8 grid max-w-[1440px] gap-4 px-4 sm:px-8 lg:grid-cols-3 lg:px-16">
        {cards.map((card) => (
          <article key={card.step} className="relative h-[480px] overflow-hidden lg:h-[737px]">
            <Image
              src={card.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
              style={{ objectPosition: card.position }}
            />
            <div className="absolute inset-0 bg-ink/60" />
            <div className="absolute inset-x-6 bottom-10 font-display font-extrabold leading-[0.78] lg:bottom-[18.6%]">
              <p className="text-[32px] opacity-60">{card.step}</p>
              <h3 className="mt-2 min-h-[3lh] text-[40px] xl:text-[48px]">{card.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Booking({ title }: { title: string }) {
  return (
    <section id="book" className="scroll-mt-4 bg-ink-light px-4 pt-24 pb-24 sm:px-8 lg:pt-[112px] lg:pb-[120px]">
      <SectionHeading>{title}</SectionHeading>
      <p className="mx-auto mt-6 max-w-[649px] text-center text-2xl leading-[1.2]">
        Pick a time that works for you. It takes about two minutes.
      </p>
      <div className="mx-auto mt-12 max-w-4xl">
        <AcuityEmbed />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-4 py-10 text-center font-logo text-lg tracking-wide opacity-60 sm:px-8">
      © {new Date().getFullYear()} RHODE ISLAND STRENGTH AND CONDITIONING
    </footer>
  );
}
