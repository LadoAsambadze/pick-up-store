import { styled } from "@mui/material";
import { keyframes } from "@emotion/react";

export default function LightBanner() {
  return (
    <>
      <TextContainer>
        <TextContent>PICK UP YOUR STYLE!</TextContent>
      </TextContainer>
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
const TextContainer = styled("div")`
  overflow: hidden;
  width: 100%;
  height: 36px;
  font-size: 20px;
  font-weight: 300;
  background-color: black;
  opacity: 0.96;
  display: flex;
  align-items: center;
  justify-content: center;
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
