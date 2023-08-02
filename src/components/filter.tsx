import { Box, Typography, styled } from "@mui/material";

export default function FilterComponent() {
  return (
    <>
      <Main style={{ display: "none" }}>
        <Header>
          <FilterHead>Product Filters</FilterHead>
          <Xdiv>
            <CloseIcon src="/close.png" />
          </Xdiv>
        </Header>
        <Line></Line>
        <HeaderDiv>
          <Type>Gender</Type>
          <Arrow src="/arrow-down-black.png" />
        </HeaderDiv>
        <Line></Line>
        <HeaderDiv>
          <Type>Price</Type>
          <Arrow src="/arrow-down-black.png" />
        </HeaderDiv>
        <Line></Line>
        <HeaderDiv>
          <Type>Category</Type>
          <Arrow src="/arrow-down-black.png" />
        </HeaderDiv>
        <Line></Line>
        <HeaderDiv>
          <Type>Style</Type>
          <Arrow src="/arrow-down-black.png" />
        </HeaderDiv>
        <Line></Line>
        <HeaderDiv>
          <Type>Size</Type>
          <Arrow src="/arrow-down-black.png" />
        </HeaderDiv>
        <Line></Line>
        <HeaderDiv>
          <Type>Color</Type>
          <Arrow src="/arrow-down-black.png" />
        </HeaderDiv>
        <Line></Line>
      </Main>
    </>
  );
}

const Main = styled(Box)`
  width: 300px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  position: absolute;
  left: 0;
  top: 0;
  border: 1px solid black;
  padding: 10px 0px 10px 0px;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

const FilterHead = styled(Typography)`
  font-size: 20px;
  color: black;
`;

const Xdiv = styled(Box)`
  border: 2px solid black;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CloseIcon = styled("img")`
  width: 12px;
  height: 12px;
`;

const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background: gray;
`;

const Type = styled(Typography)`
  font-size: 20px;
`;

const Arrow = styled("img")`
  width: 20px;
  height: 20px;
`;

const HeaderDiv = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px 20px 15px;
  cursor: pointer;
`;
