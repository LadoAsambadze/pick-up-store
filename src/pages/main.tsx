import BrandCarousel from "../components/brandCarousel";
import LightBanner from "../components/lightBanner";
import CoverCarousel from "../components/coverCarousel";
import Advice from "../components/advice";
import NewArrivals from "../components/newArrivals";
import Gender from "../components/gender";

export default function Main() {
  return (
    <>
      <CoverCarousel />
      <Gender />
      <NewArrivals />
      <Advice />
      <BrandCarousel />
      <LightBanner />
    </>
  );
}
