import BotBuilderFeatures from "../_components/BotBuilderFeatures";
import BotBuilderHero from "../_components/BotBuilderHero";
import BuildingBlocksAssistant from "../_components/BuildingBlocksAssistant";
import DesignBuildChatbot from "../_components/DesignBuildChatbot";
import Footer from "../_components/Footer";
import Integrations from "../_components/Integrations";
import MainNav from "../_components/MainNav";
import Poster from "../_components/Poster";
import UseCases from "../_components/UseCases";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <MainNav />
      <div className="m-auto max-w-[2050px]">
        <BotBuilderHero />
        <DesignBuildChatbot />
        <UseCases title="See what we have build" />
        <BuildingBlocksAssistant />
        <Integrations />
        <BotBuilderFeatures />
        <Poster />
      </div>
      <Footer />
    </div>
  );
}
