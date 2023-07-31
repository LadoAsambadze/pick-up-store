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
      <Main>
        <LightBanner />
        <NewArrivals />
        <BrandCarousel />
      </Main>
    </>
  );
}

const Main = styled(Box)`
  width: 100%;
`;

export default App;
