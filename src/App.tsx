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
        <NewArrivals />
        <CoverDiv>
          <Photo src="/cover.png" />
        </CoverDiv>
        <BrandCarousel />
        <LightBanner />
      </Main>
    </>
  );
}

const Main = styled(Box)`
  width: 100%;
`;

const CoverDiv = styled("div")`
  width: 100%;
`;

const Photo = styled("img")`
  width: 100%;
  height: 300px;

  @media (min-width: 768px) {
    height: 450px;
  }
  @media (min-width: 1440px) {
    height: 600px;
  }
`;

export default App;
