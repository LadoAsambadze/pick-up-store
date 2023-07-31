import { styled } from "@mui/material";
import { keyframes } from "@emotion/react";

export default function LightBanner() {
  return (
    <>
      <CoverDiv>
        <TextContainer>
          <TextContent>PICK UP YOUR STYLE!</TextContent>
        </TextContainer>

        <TextContent>HERE GOES TEXT</TextContent>
        <TextContent>HERE GOES TEX</TextContent>

        <TextContent>HERE GOES TEXT</TextContent>
        <TextContent>HERE GOES TEX</TextContent>

        <TextContent>HERE GOES TEXT</TextContent>
        <TextContent>HERE GOES TEX</TextContent>
      </CoverDiv>
    </>
  );
}

const marqueeAnimation = keyframes`
  0% {
    opacity: 0.2;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.5;
  }
  
  100% {
    opacity: 0.2;
  }
 


`;

const CoverDiv = styled("div")`
  border-top: 1px solid black;
  width: 100%;
  background: linear-gradient(to top, black, #2e2829);
  height: 300px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;
const TextContainer = styled("div")`
  overflow: hidden;
  width: 100%;
  height: 36px;
  font-size: 28px;
  font-weight: 300;

  opacity: 0.92;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid black;
  flex-direction: column;
  @media (min-width: 768px) {
    height: 48px;
    font-size: 32px;
  }
`;

const TextContent = styled("span")`
  animation: ${marqueeAnimation} 4s linear infinite;
  color: lightgreen;
  text-shadow: 0px 0px 5px #fff; // add this line
  font-family: "Ysabeau Office", sans-serif;
`;
