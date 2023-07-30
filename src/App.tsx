import Header from "./components/header";
import { styled } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import BrandCarousel from "./components/brandCarousel";

function App() {
  return (
    <>
      <Header />
      <Main>
        <HeaderDiv>
          <Brand>Shop By Brand</Brand>
        </HeaderDiv>
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

// const DivBox = styled("div")`
//   display: grid;
//   grid-template-rows: repeat(3, 1fr);
//   grid-template-columns: repeat(1, 1fr);
//   height: 350px;
//   padding-top: 20px;
// `;

const HeaderDiv = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
`;

const Brand = styled(Typography)`
  color: black;
  font-size: 20px;
  font-weight: 400px;
`;

export default App;
