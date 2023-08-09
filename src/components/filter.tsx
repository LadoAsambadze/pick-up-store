import { Box, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/redux";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import {
  setGenderType,
  setCategoryType,
  setValue,
  setFilter,
  setBrandType
} from "../store/filter-slice";

export default function FilterComponent() {
  const dispatch = useDispatch();
  const [gender, setGender] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);

  const [price, setPrice] = useState(false);
  const [size, setSize] = useState(false);

  const value = useSelector((state: RootState) => state.filter.value);
  const handleChange = (event: Event, newValue: number | number[]) => {
    dispatch(setValue(newValue as number[]));
  };
  const filter = useSelector((store: RootState) => store.filter.filter);

  return (
    <>
      <MainBack style={{ display: filter ? "flex" : "none" }}>
        <Main style={{ display: filter ? "flex" : "none" }}>
          <Header>
            <FilterDiv>
              <FilterHead>Filter</FilterHead>
              <FilterIcon src="/filter.svg" alt="Filter icon " />
            </FilterDiv>
            <Xdiv
              onClick={() => {
                dispatch(setFilter(false));
              }}
            >
              <CloseIcon src="/close.png" />
            </Xdiv>
          </Header>
          <Line></Line>
          <ListDiv>
            <HeaderDiv
              onClick={() => {
                setGender(!gender);
              }}
            >
              <Type>Gender</Type>
              <Arrow src="/Icon.svg" />
            </HeaderDiv>
            <div
              style={{ display: gender ? "block" : "none", marginTop: "20px" }}
            >
              <p onClick={() => dispatch(setGenderType("Girl"))}>Girl</p>
              <p onClick={() => dispatch(setGenderType("Boy"))}>Boy</p>
            </div>
            <HeaderDiv onClick={() => setCategory(!category)}>
              <Type>Category</Type>
              <Arrow src="/Icon.svg" />
            </HeaderDiv>
            <div style={{ display: category ? "block" : "none" }}>
              <p onClick={() => dispatch(setCategoryType("Men"))}>Men</p>
              <p onClick={() => dispatch(setCategoryType("Women"))}>Women</p>
              <p onClick={() => dispatch(setCategoryType("Kid"))}>Kid</p>
            </div>
            <HeaderDiv
              onClick={() => {
                setBrand(!brand);
              }}
            >
              <Type>Brand</Type>
              <Arrow src="/Icon.svg" />
            </HeaderDiv>
            <div style={{ display: brand ? "block" : "none" }}>
              <p onClick={() => dispatch(setBrandType("Nike"))}>Nike</p>
              <p onClick={() => dispatch(setBrandType("Adidas"))}>Adidas</p>
              <p onClick={() => dispatch(setBrandType("Puma"))}>Puma</p>
              <p onClick={() => dispatch(setBrandType("Zara"))}>Zara</p>
              <p onClick={() => dispatch(setBrandType("Reebok"))}>Reebok</p>
            </div>
            <HeaderDiv>
              <Type>Color</Type>
              <Arrow src="/Icon.svg" />
            </HeaderDiv>
          </ListDiv>
          <Line></Line>
          <PriceDiv
            onClick={() => {
              setPrice(!price);
            }}
          >
            <FilterHead style={{ cursor: "pointer" }}>Price</FilterHead>
            <Arrow src="/arrow-up.svg" alt="Arrow icon up/down" />
          </PriceDiv>
          <ShowMain style={{ display: price ? "flex" : "none" }}>
            <PriceRangeDiv>
              <Box sx={{ width: "100%" }}>
                <Slider
                  getAriaLabel={() => "Price Range"}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                />
              </Box>
            </PriceRangeDiv>
            <RangesDiv>
              <RangeBox>{value[0]}</RangeBox>
              <RangeBox>{value[1]}</RangeBox>
            </RangesDiv>
          </ShowMain>
          <Line></Line>
          <SizeDiv onClick={() => setSize(!size)}>
            <FilterHead style={{ cursor: "pointer" }}>Size</FilterHead>
            <Arrow src="/arrow-up.svg" alt="Arrow icon up/down" />
          </SizeDiv>
          <Line></Line>
          <ShowMain style={{ display: size ? "flex" : "none" }}>
            <SizeListDiv>
              <SizeChoose>XXS</SizeChoose>
              <SizeChoose>XL</SizeChoose>
              <SizeChoose>XS</SizeChoose>
              <SizeChoose>S</SizeChoose>
              <SizeChoose>M</SizeChoose>
              <SizeChoose>L</SizeChoose>
              <SizeChoose>XXL</SizeChoose>
              <SizeChoose>3XS</SizeChoose>
              <SizeChoose>4XS</SizeChoose>
            </SizeListDiv>
          </ShowMain>
        </Main>
      </MainBack>
    </>
  );
}

const MainBack = styled(Box)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: 90;
  left: 0;
  left: 0px;
  top: 108px;
`;
const Main = styled(Box)`
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: white;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  border: 1px solid black;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px 20px 30px;
`;

const FilterDiv = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const FilterHead = styled(Typography)`
  color: #807d7e;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.44px;
`;
const FilterIcon = styled("img")`
  margin-left: 10px;
  width: 20px;
  height: 20px;
  transform: rotate(90deg);
`;

const Xdiv = styled(Box)`
  border: 2px solid #807d7e;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    border-color: black;
  }
  margin-left: 200px;
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

const HeaderDiv = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  cursor: pointer;
`;
const Type = styled(Typography)`
  color: #8a8989;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Arrow = styled("img")`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const ListDiv = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 22px 30px 40px 30px;
`;

const PriceDiv = styled(Box)`
  padding: 20px 30px 20px 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PriceRangeDiv = styled(Box)`
  padding: 20px 30px 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #bebcbd;
`;

const RangesDiv = styled(Box)`
  padding: 0px 40px 20px 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RangeBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 2px solid #bebcbd;
`;

const SizeDiv = styled(Box)`
  padding: 20px 30px 20px 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SizeListDiv = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 18px;
  padding: 20px 40px 20px 40px;
`;

const SizeChoose = styled(Box)`
  border-radius: 8px;
  border: 1px solid #bebcbd;
  opacity: 0.8;
  width: 65px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShowMain = styled(Box)`
  display: flex;
  flex-direction: column;
`;
