import Header from "./components/header";
import { styled } from "@mui/material";
import Box from "@mui/material/Box/Box";
import BrandCarousel from "./components/brandCarousel";
import NewArrivals from "./components/newArrivals";
import LightBanner from "./components/lightBanner";

function App() {
  return (
    <>
      <Header />
      <LightBanner />

      <Main>
        <NewArrivals />
        <BrandCarousel />
      </Main>
    </>
  );
}

const Main = styled(Box)`
  width: 100%;
  @media (min-width: 768px) {
    padding: 0px 10px 0px 10px;
  }
  @media (min-width: 1440px) {
    padding: 0px 20px 0px 20px;
  }
`;

export default App;
