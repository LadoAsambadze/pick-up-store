import { styled } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import LightBanner from "./MyLightBanner";

export default function Footer() {
  return (
    <>
      <LightBanner />
      <MainDiv>
        <Description>
          <SectionStore>
            <Kind>About Us</Kind>
            <Kind>Legacy</Kind>
            <Kind>Follow</Kind>
            <Kind>Test</Kind>
            <Kind>Test</Kind>
          </SectionStore>
        </Description>
        <IconDiv>
          <Icon src="facebook.avif" alt="Facebook icon" />
          <Icon src="instagram.avif" alt="Instagram icon" />
          <Icon src="twitter.avif" alt="Twitter icon" />
        </IconDiv>
      </MainDiv>
    </>
  );
}

const MainDiv = styled("div")`
  width: 100%;
  background: #d4d4c9;
  display: flex;
  flex-direction: column;
  padding: 0px 50px 65px 50px;
  @media (min-width: 1440px) {
    padding: 0px 165px 44px 165px;
    flex-direction: row;
    justify-content: space-between;
  }
`;
const Description = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (min-width: 1440px) {
    align-items: flex-start;
  }
`;

const SectionStore = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  @media (min-width: 1440px) {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const Kind = styled(Typography)`
  color: #3c4242;
  cursor: pointer;
  margin-top: 10px;
  font-family: "Ysabeau Office", sans-serif;
  font-weight: 300;
  @media (min-width: 1440px) {
    margin-top: 0;
    margin-right: 15px;
    font-size: 20px;
  }
`;

const IconDiv = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: 30px;
  @media (min-width: 1440px) {
    justify-content: flex-end;
  }
`;
const Icon = styled("img")`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
`;
