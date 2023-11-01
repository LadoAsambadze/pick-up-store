import { Box, Button, styled } from "@mui/material";

export default function MyShopAdress() {
  return (
    <Main>
      <ImgDiv>
        <Img src="bge.jpg" />
      </ImgDiv>
      <ImgDiv>
        <Img src="bg.jpg" />
        <LogDone>Location</LogDone>
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

const LogDone = styled(Button)`
  border-radius: 10px;
  background: white;
  color: black;
  text-align: center;
  font-size: 13px;
  font-family: "Ysabeau Office", sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 14px 30px 15px 30px;
  margin-top: 40px;
  position: absolute;
  left: 100px;
  bottom: 20px;
  &:hover {
    background: gray;
  }
`;
