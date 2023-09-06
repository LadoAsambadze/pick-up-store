import { Typography, styled } from "@mui/material";
import { Box } from "@mui/material";
import { keyframes } from "@mui/material";

export default function Gender() {
  return (
    <>
      <MainGrid>
        <LeftDiv>
          <ChooseDiv>
            <Choose>Men</Choose>
            <ArrowNext
              src="/arrow-next.png"
              alt="Arrow button next/right side"
            />
          </ChooseDiv>
        </LeftDiv>
        <RightDiv>
          <ChooseDiv>
            <Choose>Women</Choose>
            <ArrowNext
              src="/arrow-next.png"
              alt="Arrow button next/right side"
            />
          </ChooseDiv>
        </RightDiv>
      </MainGrid>
    </>
  );
}
const slideInFromLeft = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideInFromRight = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const MainGrid = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  @media (min-width: 1440px) {
    padding: 20px 180px 20px 180px;
  }
`;

const LeftDiv = styled(Box)`
  background-image: url("/men.jpg");
  width: 100%;
  height: 250px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  display: flex;
  align-items: flex-end;
  animation: ${slideInFromLeft} 1.5s ease-out;
  @media (min-width: 1440px) {
    height: 300px;
  }
`;

const RightDiv = styled(Box)`
  background-image: url("/women.jpg");
  width: 100%;
  height: 250px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  align-items: flex-end;
  animation: ${slideInFromRight} 1.5s ease-out;
  @media (min-width: 1440px) {
    height: 300px;
  }
`;

const ChooseDiv = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px 10px 15px;
  @media (min-width: 1440px) {
    padding: 20px 40px 20px 40px;
  }
`;
const Choose = styled(Typography)`
  color: #fff;
  font-family: "Ysabeau Office", sans-serif;
  font-size: 15px;
  font-style: normal;
  line-height: 30.132px;
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 7px;
  cursor: pointer;
  &:hover {
    color: gray;
  }
  @media (min-width: 1440px) {
    font-size: 20px;
  }
`;
const ArrowNext = styled("img")`
  width: 30px;
  height: 30px;
  cursor: pointer;
  @media (min-width: 1440px) {
    width: 40px;
    height: 40px;
  }
`;
