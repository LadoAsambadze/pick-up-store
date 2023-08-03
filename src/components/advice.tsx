import { Typography, styled } from "@mui/material";
import { Box } from "@mui/material";

export default function Advice() {
  return (
    <>
      <MainGrid>
        <LeftDiv>
          <AdviceText>WE MADE YOUR EVERYDAY FASHION BETTER!</AdviceText>
          <Text>
            In our journey to improve everyday fashion, euphoria presents
            EVERYDAY wear range - Comfortable & Affordable fashion 24/7
          </Text>
          <ShopButton>Shop Now</ShopButton>
        </LeftDiv>
        <RightDiv></RightDiv>
      </MainGrid>
    </>
  );
}

const MainGrid = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 20px 105px 20px 105px;
`;

const LeftDiv = styled(Box)`
  background-image: url("/advice-black.png");
  width: 100%;
  height: 640px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const RightDiv = styled(Box)`
  background-image: url("/advice-color.png");
  width: 100%;
  height: 640px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const AdviceText = styled(Typography)`
  color: #fff;
  font-family: Causten;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 1px;
  margin-top: 183px;
  margin-left: 80px;
  margin-right: 80px;
`;

const Text = styled(Typography)`
  color: #fff;
  font-family: Causten;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 1px;
  margin-top: 30px;
  margin-left: 80px;
  margin-right: 90px;
`;

const ShopButton = styled("button")`
  padding: 12px 44px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  background: #fff;
  margin-top: 50px;
  margin-left: 80px;
  border: none;
  cursor: pointer;
`;
