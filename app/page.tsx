import { Differently, Hero, WhyNotWorking } from "@/components/home/sections";
import { Booking, Footer, Header } from "@/components/site/layout";
import Menu from "@/components/site/Menu";

const MENU_LINKS = [
  { href: "#why", label: "Why us" },
  { href: "#different", label: "How we're different" },
  { href: "#book", label: "Book a free consult" },
];

export default function Home() {
  return (
    <>
      <Header>
        <Menu links={MENU_LINKS} />
      </Header>
      <main className="flex-1">
        <Hero />
        <WhyNotWorking />
        <Differently />
        <Booking title="BOOK YOUR FREE CONSULT" />
      </main>
      <Footer />
    </>
  );
}
