import { Box, styled } from "@mui/material";

export default function MyShopAdress() {
  return (
    <Main>
      <ImgDiv>
        <Img src="back.webp" />
      </ImgDiv>
    </Main>
  );
}

const Main = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const ImgDiv = styled(Box)`
  width: 100%;
  height: 100%;
  position: relative;
  @media (min-width: 768px) {
    width: 100%;
  }
`;
const Img = styled("img")`
  max-width: 100%;
`;
