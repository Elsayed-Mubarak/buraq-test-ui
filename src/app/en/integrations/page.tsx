import Footer from "../_components/Footer";
import IntegrationsFilter from "../_components/IntegrationsFilter";
import IntegrationsHero from "../_components/IntegrationsHero";
import MainNav from "../_components/MainNav";
import Poster from "../_components/Poster";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <MainNav />
      <IntegrationsHero />
      <IntegrationsFilter />
      <Poster />
      <Footer />
    </div>
  );
}
