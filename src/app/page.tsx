import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import WorkProcess from "@/components/home/WorkProcess";
import Testimonial from "@/components/home/Testimonial";
import LeadMagnet from "@/components/home/LeadMagnet";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBadges />
        <ServicesSection />
        <WhyChooseUs />
        <WorkProcess />
        <Testimonial />
        <LeadMagnet />
        {/* FAQSection sekarang di-render di dalam ServicesSection,
         * sehingga kontennya dapat berubah dinamis mengikuti tab aktif.
         * Lihat ServicesSection.tsx untuk detail. */}
      </main>
      <Footer />
    </div>
  );
}
