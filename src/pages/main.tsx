import BrandCarousel from "../components/brandCarousel";
import LightBanner from "../components/lightBanner";
import NewArrivals from "../components/newArrivals";

import CoverCarousel from "../components/coverCarousel";
import Advice from "../components/advice";

export default function Main() {
  return (
    <>
      <CoverCarousel />
      <NewArrivals />
      <Advice />

      <BrandCarousel />
      <LightBanner />
    </>
  );
}
