import Faq from "../_components/Faq";
import Footer from "../_components/Footer";
import MainNav from "../_components/MainNav";
import PricingHero from "../_components/PricingHero";
import UseCases from "../_components/UseCases";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <MainNav />
      <div className="pt-[50px] md:pt-[69px] xl:pt-[140px]">
        <PricingHero />
        <UseCases title="Use cases" />
        <Faq />
      </div>
      <Footer />
    </div>
  );
}
