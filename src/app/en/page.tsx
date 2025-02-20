"use client";
import ChatBot from "./_components/ChatBot";
import FeaturesInfinte from "./_components/FeaturesInfinte";
import HeroSection from "./_components/HeroSection";
import HowBuild from "./_components/HowBuild";
import MainNav from "./_components/MainNav";
import Poster from "./_components/Poster";
import UseCases from "./_components/UseCases";
import Features from "./_components/Features";
import WhyChoose from "./_components/WhyChoose";
import Integrations from "./_components/Integrations";
import Faq from "./_components/Faq";
import Footer from "./_components/Footer";
import TrustedBy from "./_components/TrustedBy";
import Benefits from "./_components/Benefits";

type Props = {};

export default function LandingPage({}: Props) {
  return (
    <div>
      <MainNav />
      <div className="w-full pt-[50px] md:pt-[69px] xl:pt-[140px]">
        <HeroSection />
        <FeaturesInfinte />
        <TrustedBy />
        {/* <Testimonials /> */}
        <ChatBot />
        <UseCases title="Uses cases" />
        <Poster />
        <HowBuild />
        <Features />
        <WhyChoose />
        <Integrations />
        <Benefits />
        <Faq />
        <Poster />
      </div>
      <Footer />
    </div>
  );
}
