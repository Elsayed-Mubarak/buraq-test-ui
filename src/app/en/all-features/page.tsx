import Footer from "../_components/Footer";
import MainNav from "../_components/MainNav";
import Poster from "../_components/Poster";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <MainNav />
      <div className="w-full pt-[50px] md:pt-[69px] xl:pt-[140px]">
        <div>All Features Page</div>
        <Poster />
      </div>
      <Footer />
    </div>
  );
}
