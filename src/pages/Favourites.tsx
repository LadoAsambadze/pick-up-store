import { styled } from "@mui/material";
import { Box } from "@mui/system";

export default function Favourites() {
  return (
    <>
      <Main>
        <MainGrid></MainGrid>
      </Main>
    </>
  );
}

const Main = styled(Box)`
  width: 100%;
  min-height: 100vh;
`;

const MainGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  padding-top: 10px;
  @media (min-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
    padding-top: 25px;
  }
`;
