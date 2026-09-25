import Image from "next/image";
import { StepCards } from "@/components/site/layout";
import { CtaButton, SectionHeading } from "@/components/site/primitives";

export function Hero() {
  return (
    <section className="relative z-10 mx-auto grid w-full max-w-[1440px] lg:grid-cols-[655fr_785fr]">
      {/* Photo bleeds off the left edge and overlaps the next section, per the design. */}
      <div className="relative h-[320px] sm:h-[480px] lg:-mb-14 lg:h-[712px]">
        <Image
          src="/images/hero.png"
          alt="Founder Anthony going over a training plan with a client"
          fill
          priority
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover object-[79%_50%]"
        />
      </div>
      <div className="px-4 pt-10 pb-16 sm:px-8 lg:pt-[50px] lg:pr-[59px] lg:pb-0 lg:pl-[59px]">
        <h1 className="max-w-[667px] font-display text-[56px] leading-[0.78] font-extrabold sm:text-[72px] xl:text-[96px]">
          NOT SURE HOW TO ACHIEVE YOUR FITNESS GOALS?
        </h1>
        <Image
          src="/images/underline-hero.svg"
          alt=""
          width={565}
          height={41}
          unoptimized
          className="mt-1 h-auto w-full max-w-[565px] rotate-[2.03deg]"
        />
        <p className="mt-6 max-w-[649px] text-2xl leading-[1.2] xl:text-[32px]">
          With our free Clarity Call, our founder Anthony will help you better see your goals and a
          path to get there.
        </p>
        <CtaButton className="mt-10 w-full sm:w-[251px] xl:mt-[46px]" />
      </div>
    </section>
  );
}

export function WhatYouLearn() {
  return (
    <StepCards
      id="learn"
      heading="WHAT YOU’LL LEARN IN YOUR FREE 20 MINUTE CONSULT"
      className="bg-ink-light pt-24 pb-20 lg:pt-[126px] lg:pb-[106px]"
      cards={[
        {
          step: "FIRST",
          title: "IDENTIFY A SPECIFIC GOAL YOU CAN ACHIEVE QUICKLY",
          src: "/images/learn-1.png",
          position: "50% 50%",
        },
        {
          step: "SECOND",
          title: "WHY WHAT YOU HAVE TRIED SO FAR ISN’T WORKING",
          src: "/images/learn-2.png",
          position: "68% 50%",
        },
        {
          step: "THIRD",
          title: "WHAT TYPE OF APPROACH WOULD WORK BEST FOR YOU",
          src: "/images/learn-3.png",
          position: "50% 50%",
        },
      ]}
    />
  );
}

const CLIENT_TEXTS = [
  { src: "/images/text-1.png", width: 720, height: 1254, className: "w-[258px] lg:w-[369px]" },
  { src: "/images/text-2.png", width: 720, height: 1200, className: "w-[270px] lg:w-[385px]" },
  { src: "/images/text-3.png", width: 720, height: 710, className: "w-[270px] lg:w-[385px]" },
  { src: "/images/text-4.png", width: 701, height: 695, className: "w-[270px] lg:w-[385px]" },
];

export function ClientTexts() {
  return (
    <section id="results" className="scroll-mt-4 pt-24 pb-24 lg:pt-[112px] lg:pb-[120px]">
      <SectionHeading underline>WHAT OUR CLIENTS HAVE SAID IN TEXTS WITH OUR TRAINERS</SectionHeading>
      <div className="no-scrollbar mt-14 flex snap-x snap-mandatory scroll-px-4 items-start gap-6 overflow-x-auto px-4 sm:scroll-px-8 sm:px-8 lg:scroll-px-[106px] lg:gap-[36px] lg:px-[106px]">
        {CLIENT_TEXTS.map((text, i) => (
          <Image
            key={text.src}
            src={text.src}
            alt={`Text message from a Rhode Island Strength client (${i + 1} of ${CLIENT_TEXTS.length})`}
            width={text.width}
            height={text.height}
            sizes="385px"
            className={`h-auto shrink-0 snap-start ${text.className}`}
          />
        ))}
      </div>
    </section>
  );
}
