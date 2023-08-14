import { Box, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux";

export default function Cart() {
  const data = useSelector((state: RootState) => state.data.data);
  console.log(data);
  return (
    <>
      <Main>
        {data.map((item, index) => (
          <ProductDiv key={index}>
            <ImageDiv
              style={{
                backgroundImage: `url(http://localhost:3000${item.images[0].urls[0]})`,
              }}
            ></ImageDiv>
            <DescriptionDiv>
              <Name>Name of prgggggggggggggggggggggggoduct</Name>
              <Size>Size : XS</Size>
              <PiceXquantity>
                <Price>75$</Price>
                <Quantity>Quantity: 1</Quantity>
              </PiceXquantity>
              <ControlDiv>
                <ControlIcon src="/heart.svg" />
                <ControlIcon src="/delete.png" />
              </ControlDiv>
            </DescriptionDiv>
          </ProductDiv>
        ))}
      </Main>
    </>
  );
}

const Main = styled(Box)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
`;

const ProductDiv = styled(Box)`
  display: flex;
  flex-direction: row;
  padding: 10px;
  overflow: hidden;
`;

const ImageDiv = styled(Box)`
  width: 50%;
  height: 150px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const DescriptionDiv = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0px 0px 0px 20px;
  width: 50%;
  justify-content: space-between;
`;

const Name = styled(Typography)`
  font-size: 16px;
`;
const Size = styled(Typography)`
  font-size: 14px;

`;

const PiceXquantity = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

`;
const Price = styled(Typography)`
  font-size: 16px;
`;

const Quantity = styled(Typography)`
  font-size: 16px;
`;

const ControlDiv = styled(Box)`
  display: flex;
  flex-direction: row;
 
`;

const ControlIcon = styled("img")`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;