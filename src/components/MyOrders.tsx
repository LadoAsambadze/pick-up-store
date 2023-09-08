import { Box, Typography, styled } from "@mui/material";

export default function Orders() {
  return (
    <>
      <Main>
        <OrderDiv>
          <OrderImage src="/delete.png" />

          <OrderItemsSection>
            <User>qegqeg</User>
            <OrderItemDiv>
              <DescriptionDiv>
                <Name>saxeli</Name>
                <DetailsDiv>
                  <Size>size: 37</Size>
                  <Amount>amount: 2</Amount>
                </DetailsDiv>
                <Price>50$</Price>
                <OrderTime>1:11</OrderTime>
              </DescriptionDiv>
            </OrderItemDiv>
          </OrderItemsSection>
        </OrderDiv>
      </Main>
    </>
  );
}

const Main = styled(Box)`
  border: 1px solid black;
  width: 500px;
  height: 300px;
`;
const OrderDiv = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const User = styled(Box)``;

const OrderItemsSection = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const OrderItemDiv = styled(Box)`
  display: flex;
  flex-direction: row;
`;

const OrderImage = styled("img")`
  width: 100px;
  height: 100px;
`;

const DescriptionDiv = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const Name = styled(Typography)``;

const DetailsDiv = styled(Box)`
  display: flex;
  flex-direction: row;
`;

const Amount = styled(Typography)``;

const Size = styled(Typography)``;

const Price = styled(Typography)``;

const OrderTime = styled(Typography)``;
