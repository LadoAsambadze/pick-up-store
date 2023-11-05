import { Box, Button, styled } from "@mui/material";

export default function MyShopAdress() {
  return (
    <Main>
      <ImgDiv>
        <Img src="bge.webp" />
        <LocButton>Sales</LocButton>
      </ImgDiv>
      <ImgDiv>
        <Img src="bg.webp" />
        <LocButton
          onClick={() =>
            window.open("https://maps.app.goo.gl/XsEPkjhhTSHvWkUc9", "_blank")
          }
        >
          Location
        </LocButton>
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
    width: 50%;
  }
`;
const Img = styled("img")`
  max-width: 100%;
`;

const LocButton = styled(Button)`
  background: white;
  color: #645555;
  text-align: center;
  font-size: 12px;
  font-family: "Ysabeau Office", sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 10px 20px 10px 20px;
  margin-top: 40px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  border: 1px solid black;
  &:hover {
    background: gray;
    color: white;
  }
  @media (min-width: 768px) {
    padding: 15px 30px 15px 30px;
    font-size: 15px;
    right: 50px;
    bottom: 50px;
  }
`;
