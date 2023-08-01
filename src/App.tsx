import Header from "./components/header";
import BrandCarousel from "./components/brandCarousel";
import NewArrivals from "./components/newArrivals";
import LightBanner from "./components/lightBanner";
import Footer from "./components/footer";

function App() {
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

export default App;
