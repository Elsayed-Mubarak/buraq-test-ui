import AiStudioBuild from "../_components/AiStudioBuild";
import AiStudioCustomizations from "../_components/AiStudioCustomizations";
import AiStudioHero from "../_components/AiStudioHero";
import Footer from "../_components/Footer";
import MainNav from "../_components/MainNav";
import Poster from "../_components/Poster";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <MainNav />
      <div className="m-auto max-w-[2050px]">
        <AiStudioHero />
        <AiStudioBuild />
        <AiStudioCustomizations />
        <Poster />
      </div>
      <Footer />
    </div>
  );
}
