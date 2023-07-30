import Header from "./components/header";
import { styled } from "@mui/material";
import Box from "@mui/material/Box/Box";

import BrandCarousel from "./components/brandCarousel";
import NewArrivals from "./components/newArrivals";

function App() {
  return (
    <>
      <Header />
      <Main>
        <BrandCarousel />
        <NewArrivals />
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

// const DivBox = styled("div")`
//   display: grid;
//   grid-template-rows: repeat(3, 1fr);
//   grid-template-columns: repeat(1, 1fr);
//   height: 350px;
//   padding-top: 20px;
// `;

export default App;
