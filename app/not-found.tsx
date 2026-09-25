import type { Metadata } from "next";
import Image from "next/image";
import { Footer, Header } from "@/components/site/layout";
import { CtaButton } from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Page Not Found | Rhode Island Strength and Conditioning",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative flex flex-1 items-center overflow-hidden">
        {/* Oversized 404 sits behind the copy as a texture. */}
        <p
          aria-hidden
          className="pointer-events-none absolute right-[-4%] bottom-[-6%] font-display text-[260px] leading-[0.78] font-extrabold text-ink-light select-none sm:text-[420px] lg:text-[560px]"
        >
          404
        </p>
        <div className="relative mx-auto w-full max-w-[1440px] px-4 py-24 sm:px-8 lg:px-[72px] lg:py-32">
          <p className="font-display text-[32px] leading-[0.78] font-extrabold opacity-60">
            ERROR 404
          </p>
          <h1 className="mt-4 max-w-[760px] font-display text-[56px] leading-[0.78] font-extrabold sm:text-[80px] xl:text-[96px]">
            LOOKS LIKE THIS PAGE MISSED ITS SESSION.
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
            Don’t worry, we’ll check in on it. In the meantime, head back home or book your free
            consult.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row xl:mt-[46px]">
            <CtaButton href="/" variant="bright" className="sm:w-[265px]">
              BACK TO HOME
            </CtaButton>
            <CtaButton
              href="/#book"
              className="bg-transparent! px-[19px]! ring-2 ring-white ring-inset hover:bg-white/10! sm:w-[265px]"
            >
              BOOK A FREE CONSULT
            </CtaButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
