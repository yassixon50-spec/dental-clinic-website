import { Header, Footer, FloatingButtons } from "@/components/layout";
import {
  Hero,
  About,
  Services,
  Doctors,
  WhyUs,
  BeforeAfter,
  AppointmentForm,
  Testimonials,
  Pricing,
  FAQ,
  Contact,
  PromoBanner,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PromoBanner />
        <About />
        <Services />
        <Doctors />
        <WhyUs />
        <BeforeAfter />
        <Testimonials />
        <Pricing />
        <AppointmentForm />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
