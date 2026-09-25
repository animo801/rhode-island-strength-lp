import { Differently, Hero, WhyNotWorking } from "@/components/home/sections";
import { Booking, Footer, Header, Results } from "@/components/site/layout";
import { CtaButton } from "@/components/site/primitives";

export default function Home() {
  return (
    <>
      <Header>
        <CtaButton size="sm" variant="bright">
          BOOK A CONSULT
        </CtaButton>
      </Header>
      <main className="flex-1">
        <Hero />
        <WhyNotWorking />
        <Differently />
        <Results />
        <Booking title="BOOK YOUR FREE CONSULT" />
      </main>
      <Footer />
    </>
  );
}
