import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/redux";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import {
  setGenderType,
  setCategoryType,
  setPriceAmount,
  setFilter,
  setBrandType,
  setSizeType,
} from "../store/filter-slice";
export default function FilterComponent() {
  const dispatch = useDispatch();
  const [gender, setGender] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const [price, setPrice] = useState(false);
  const [size, setSize] = useState(false);
  const redux = useSelector((state: RootState) => state.filter);
  const handleChange = (_event: Event, newValue: number | number[]) => {
    dispatch(setPriceAmount(newValue as number[]));
  };
  const clotheOptions = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
  let shoesOptions = [];
  for (let i = 12; i <= 46; i++) {
    shoesOptions.push(i.toString());
  }

  const genderOptions = ["Male", "Female", "Unisex"];
  const categoryOptions = ["Women", "Men", "Kids"];
  const brandOptions = ["Adidas", "Nike", "Puma", "Zara", "Rebook"];
  const handleSize = (sizeContent: string) => {
    dispatch(setSizeType(sizeContent));
  };
  const handleGender = (genderContent: string) => {
    dispatch(setGenderType(genderContent));
  };
  const handleCategory = (categoryContent: string) => {
    dispatch(setCategoryType(categoryContent));
  };
  const handleBrand = (brandContent: string) => {
    dispatch(setBrandType(brandContent));
  };

  const location = useLocation();
  const isShoesPage = location.pathname === "/shoes";

  return (
    <>
      <Main>
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
          <div style={{ display: gender ? "flex" : "none", marginTop: "20px" }}>
            {genderOptions.map((item) => (
              <FormControlLabel
                key={item}
                onClick={() => {
                  handleGender(item);
                }}
                control={
                  <Checkbox
                    value={item}
                    checked={redux.genderType.includes(item)}
                  />
                }
                label={item}
              />
            ))}
          </div>
          <HeaderDiv onClick={() => setCategory(!category)}>
            <Type>Category</Type>
            <Arrow src="/Icon.svg" />
          </HeaderDiv>
          <div style={{ display: category ? "block" : "none" }}>
            {categoryOptions.map((item) => (
              <FormControlLabel
                key={item}
                onClick={() => {
                  handleCategory(item);
                }}
                control={
                  <Checkbox
                    value={item}
                    checked={redux.categoryType.includes(item)}
                  />
                }
                label={item}
              />
            ))}
          </div>
          <HeaderDiv
            onClick={() => {
              setBrand(!brand);
            }}
          >
            <Type>Brand</Type>
            <Arrow src="/Icon.svg" />
          </HeaderDiv>
          <BrandDiv style={{ display: brand ? "flex" : "none" }}>
            {brandOptions.map((item) => (
              <FormControlLabel
                key={item}
                onClick={() => {
                  handleBrand(item);
                }}
                control={
                  <Checkbox
                    value={item}
                    checked={redux.brandType.includes(item)}
                  />
                }
                label={item}
              />
            ))}
          </BrandDiv>
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
                value={redux.priceAmount}
                onChange={handleChange}
                valueLabelDisplay="auto"
              />
            </Box>
          </PriceRangeDiv>
          <RangesDiv>
            <RangeBox>{redux.priceAmount[0]}</RangeBox>
            <RangeBox>{redux.priceAmount[1]}</RangeBox>
          </RangesDiv>
        </ShowMain>
        <Line></Line>
        <SizeDiv onClick={() => setSize(!size)}>
          <FilterHead>Size</FilterHead>
          <Arrow src="/arrow-up.svg" alt="Arrow icon up/down" />
        </SizeDiv>
        <Line></Line>
        <ShowMain style={{ display: size ? "flex" : "none" }}>
          <SizeListDiv>
            {(isShoesPage ? shoesOptions : clotheOptions).map((size) => (
              <SizeChoose
                key={size}
                onClick={() => handleSize(size)}
                className={redux.sizeType.includes(size) ? "selected" : ""}
              >
                {size}
              </SizeChoose>
            ))}
          </SizeListDiv>
        </ShowMain>
      </Main>
    </>
  );
}

const BrandDiv = styled(Box)`
  display: flex;
  flex-direction: column;
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
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d1c5c5;
    border-radius: 6px;
  }
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
  font-size: 20px;
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
