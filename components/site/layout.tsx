import Image from "next/image";
import type { ReactNode } from "react";
import AcuityEmbed from "@/components/AcuityEmbed";
import { SectionHeading } from "./primitives";

/** Logo on the left; `children` fills the right side (menu or CTA). */
export function Header({ logoHref = "/", children }: { logoHref?: string; children?: ReactNode }) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-ink px-4 py-5 sm:px-8">
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
    <section id={id} className={`scroll-mt-24 ${className}`}>
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

export type MemberResult = {
  name: string;
  details: string;
  story: string;
  image: string;
};

// Placeholder copy from the design — fill in the blanks and add real members.
const MEMBER_RESULTS: MemberResult[] = [
  {
    name: "ADRIAN",
    details: "47 YEARS OLD | MEMBER SINCE 2021",
    story:
      "Adrian came to us with a very clear goal. losing weight for his grandson. It took tons of work but it turns out we were able to help him do _______ in ________. His favorite part was ________.",
    image: "/images/result-adrian.png",
  },
  {
    name: "ADRIAN",
    details: "47 YEARS OLD | MEMBER SINCE 2021",
    story:
      "Adrian came to us with a very clear goal. losing weight for his grandson. It took tons of work but it turns out we were able to help him do _______ in ________. His favorite part was ________.",
    image: "/images/result-adrian.png",
  },
];

/** Horizontally scrolling member result cards (story + before/after photo). */
export function Results() {
  return (
    <section id="member-results" className="scroll-mt-24 bg-ink-light pt-24 pb-24 lg:pt-[112px] lg:pb-[172px]">
      <div className="mx-auto max-w-[633px] px-4 text-center">
        <h2 className="font-display text-5xl leading-[0.78] font-extrabold sm:text-[72px]">
          AND SEE THEIR ACTUAL RESULTS
        </h2>
      </div>
      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto px-4 sm:scroll-px-8 sm:px-8 lg:scroll-px-[76px] lg:gap-12 lg:px-[76px]">
        {MEMBER_RESULTS.map((member, i) => (
          <article
            key={i}
            className="flex w-[85vw] shrink-0 snap-start flex-col gap-8 bg-white/10 p-6 sm:p-10 lg:flex-row lg:items-center lg:gap-10 lg:p-14"
          >
            <div className="lg:flex-1">
              <h3 className="font-display text-[40px] leading-[0.78] font-extrabold lg:text-[56px]">
                {member.name}
              </h3>
              <p className="mt-3 font-display text-xl leading-[0.78] font-bold opacity-50 lg:mt-[14px] lg:text-[28px]">
                {member.details}
              </p>
              <p className="mt-5 text-xl leading-[1.5] lg:mt-6 lg:text-[28px]">{member.story}</p>
            </div>
            <Image
              src={member.image}
              alt={`${member.name.charAt(0)}${member.name.slice(1).toLowerCase()} before and after`}
              width={478}
              height={478}
              sizes="(min-width: 1024px) 440px, 85vw"
              className="aspect-square w-full shrink-0 object-cover lg:w-[440px]"
            />
          </article>
        ))}
      </div>
    </section>
  );
}

export function Booking({ title }: { title: string }) {
  return (
    <section id="book" className="scroll-mt-24 px-4 pt-24 pb-24 sm:px-8 lg:pt-[112px] lg:pb-[120px]">
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
