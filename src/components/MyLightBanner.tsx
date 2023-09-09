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
  height: 48px;
  font-size: 24px;
  font-weight: 300;
  background: #322f2f;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  @media (min-width: 768px) {
    height: 56px;
    font-size: 32px;
  }
`;

const TextContent = styled("span")`
  animation: ${marqueeAnimation} 4s linear infinite;
  color: #b5c1b5;
  text-shadow: 0px 0px 5px #94a195;
  font-family: "Ysabeau Office", sans-serif;
`;