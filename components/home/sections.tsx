import Image from "next/image";
import { StepCards } from "@/components/site/layout";
import { CtaButton } from "@/components/site/primitives";

export function Hero() {
  return (
    <section className="relative z-10 mx-auto grid w-full max-w-[1440px] lg:grid-cols-[642fr_798fr]">
      {/* Photo bleeds off the left edge and overlaps the next section, per the design. */}
      <div className="relative h-[320px] sm:h-[480px] lg:-mb-[54px] lg:h-[721px]">
        <Image
          src="/images/home-hero.png"
          alt="Rhode Island Strength member deadlifting in the gym"
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover object-center lg:object-right"
        />
      </div>
      <div className="px-4 pt-10 pb-16 sm:px-8 lg:pt-9 lg:pr-[59px] lg:pb-0 lg:pl-[72px]">
        <h1 className="max-w-[667px] font-display text-[56px] leading-[0.78] font-extrabold sm:text-[72px] xl:text-[96px]">
          THE ONLY GYM THAT KEEPS YOU ACCOUNTABLE.
        </h1>
        <Image
          src="/images/underline-hero.svg"
          alt=""
          width={565}
          height={41}
          unoptimized
          className="mt-1 h-auto w-full max-w-[565px] rotate-[2.03deg]"
        />
        <p className="mt-6 max-w-[649px] text-2xl leading-[1.2] xl:mt-[18px] xl:text-[32px]">
          After building you a customized workout schedule, our trainers know the days you miss and
          text and call you before every session.
        </p>
        <CtaButton variant="bright" className="mt-10 w-full px-[19px]! sm:w-[265px] xl:mt-[46px]">
          BOOK A FREE CONSULT
        </CtaButton>
      </div>
    </section>
  );
}

export function WhyNotWorking() {
  return (
    <section id="why" className="scroll-mt-4 bg-ink-light px-4 pt-24 pb-24 sm:px-8 lg:py-[112px]">
      <div className="mx-auto max-w-[720px]">
        <h2 className="space-y-[1lh] font-display text-5xl leading-[0.78] font-extrabold sm:text-[64px] lg:text-[80px]">
          <span className="block">WHY HASN’T THE GYM WORKED YET?</span>
          <span className="block">BECAUSE YOU WERE ON YOUR OWN.</span>
        </h2>
        <div className="mt-10 space-y-[1lh] text-2xl leading-[1.2] lg:mt-14 lg:text-[32px]">
          <p>
            We have talked to thousands of people wanting to make a change with their fitness. And
            the story is almost always the same.
          </p>
          <p>
            You have a wake up call. A chat with your doctor. Not fitting into last years winter
            clothes. Not being able to play with your kids or grandkids.
          </p>
          <p>
            So you start. You go to a big box gym like Planet Fitness. And for a few weeks you are
            solid.
          </p>
          <p>
            But then... life happens. You get tired. Or maybe you realize you don’t know what you’re
            doing and you get hurt.
          </p>
          <p>And so you stop again. And the cycle repeats.</p>
          <p>
            What you need isn’t motivation. <strong>You need accountability</strong>.{" "}
            <strong>You need a team.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export function Differently() {
  return (
    <StepCards
      id="different"
      heading="HOW WE DO THINGS DIFFERENTLY."
      className="pt-24 pb-24 lg:py-[112px]"
      cards={[
        {
          step: "FIRST",
          title: "TRAINING PLAN CUSTOMIZED FOR YOUR GOALS",
          src: "/images/learn-1.png",
          position: "50% 50%",
        },
        {
          step: "SECOND",
          title: "UNLIMITED PERSONAL TRAINING SESSIONS IN 1:4 GROUPS",
          src: "/images/learn-2.png",
          position: "68% 50%",
        },
        {
          step: "THIRD",
          title: "REMINDS YOU BEFORE IT STARTS. TEXT AND CALL IF YOU MISS.",
          src: "/images/learn-3.png",
          position: "50% 50%",
        },
      ]}
    />
  );
}
