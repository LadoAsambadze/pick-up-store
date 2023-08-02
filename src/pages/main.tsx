import BrandCarousel from "../components/brandCarousel";
import Footer from "../components/footer";
import Header from "../components/header";
import LightBanner from "../components/lightBanner";
import NewArrivals from "../components/newArrivals";

export default function Main() {
  return (
    <>
      <Header />
      <LightBanner />
      <NewArrivals />
      <BrandCarousel />
      <Footer />
    </>
  );
}
