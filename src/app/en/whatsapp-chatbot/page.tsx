import Footer from "../_components/Footer";
import MainNav from "../_components/MainNav";
import Poster from "../_components/Poster";
import WhatsAppChatBotFeatures from "../_components/WhatsAppChatBotFeatures";
import WhatsAppChatbotGlobal from "../_components/WhatsAppChatbotGlobal";
import WhatsAppChatBotHero from "../_components/WhatsAppChatBotHero";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <MainNav />
      <div className="m-auto max-w-[2050px]">
        <WhatsAppChatBotHero />
        <WhatsAppChatbotGlobal />
        <WhatsAppChatBotFeatures />
        <Poster />
      </div>
      <Footer />
    </div>
  );
}
