import type { Metadata } from "next";
import { ClientTexts, Hero, WhatYouLearn } from "@/components/lp/sections";
import { Booking, Footer, Header, Results } from "@/components/site/layout";
import { CtaButton } from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Free Clarity Call | Rhode Island Strength and Conditioning",
  description:
    "Not sure how to achieve your fitness goals? Book a free Clarity Call with our founder Anthony.",
};

export default function LandingPage() {
  return (
    <>
      {/* Ad landing page: keep visitors here, so the logo doesn't navigate away. */}
      <Header logoHref="#">
        <CtaButton size="sm">BOOK A CALL</CtaButton>
      </Header>
      <main className="flex-1">
        <Hero />
        <WhatYouLearn />
        <ClientTexts />
        <Results />
        <Booking title="BOOK YOUR FREE CALL" />
      </main>
      <Footer />
    </>
  );
}
