import { Typography, styled } from "@mui/material";
import { Box } from "@mui/material";
import Sort from "../components/sort";
import FilterComponent from "../components/filter";
import { RootState } from "../store/redux";
import { setFilter } from "../store/filter-slice";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

interface Type {
  type: string;
  gender: string;
  category: string;
  price: number;
  size: string;
  brand: string;
  name: string;
  image: string;
  new: boolean;
}

export default function Clothes() {
  const dispatch = useDispatch();
  const [clothes, setClothes] = useState<Type[]>([]);
  const redux = useSelector((state: RootState) => state.filter);
  const search = useSelector((state: RootState) => state.search.search);

  useEffect(() => {
    const getClothes = async () => {
      const response = await axios.get("http://localhost:3000/clothes");
      setClothes(response.data.clothes);
    };
    getClothes();
  }, []);

  return (
    <>
      <Main>
        <FindBy>
          <FilterDiv
            onClick={() => {
              dispatch(setFilter(true));
            }}
          >
            <Filter>Filter</Filter>
            <FilterIcon src="/filter.png" />
          </FilterDiv>
          <FilterComponent />
          <Sort />
        </FindBy>
        <MainGrid>
          {clothes
            .filter(
              (item) =>
                redux.genderType === null || item.gender === redux.genderType
            )
            .filter(
              (item) =>
                redux.categoryType === null ||
                item.category === redux.categoryType
            )
            .filter(
              (item) =>
                redux.brandType === null || item.brand === redux.brandType
            )
            .filter(
              (item) =>
                item.price > redux.priceAmount[0] &&
                item.price < redux.priceAmount[1]
            )
            .filter(
              (item) =>
                redux.sizeType === null ||
                item.size === redux.sizeType.toLowerCase()
            )
            .filter(
              (item) => search === null || item.name === search.toLowerCase()
            )
            .map((item, index) => (
              <ArrivalDiv key={index}>
                <ImageDiv
                  style={{
                    backgroundImage: `url(http://localhost:3000${item.image})`,
                  }}
                ></ImageDiv>

                <About>
                  <Description>
                    <Name>{item.name}</Name>
                    <Brand>{item.brand}</Brand>
                  </Description>
                  <Price>{item.price}</Price>
                  <Favourite src="/heart.svg" alt="Favourite add icon, heart" />
                </About>
              </ArrivalDiv>
            ))}
        </MainGrid>
      </Main>
    </>
  );
}

const Main = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 100px 10px 100px;
`;

const FindBy = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: row;
`;

const FilterDiv = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid gray;
  padding: 8px 15px 8px 15px;
  cursor: pointer;
`;
const Filter = styled(Typography)`
  font-size: 20px;
`;

const FilterIcon = styled("img")`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`;

const MainGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  padding-top: 25px;
`;
const ArrivalDiv = styled(Box)`
  display: flex;
  flex-direction: column;
  border: 3px solid #d8d8e1;
  border-radius: 5px;
  cursor: pointer;
  justify-content: flex-end;
  position: relative;
`;

const ImageDiv = styled(Box)`
  display: flex;
  width: 100%;
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  border-bottom: 1px solid #d8d8e1;
  background-position: center;
`;

const About = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  padding: 10px 20px 20px 20px;
`;

const Favourite = styled("img")`
  display: flex;
  padding: 6px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 12px;
`;

const Description = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Name = styled(Typography)`
  color: black;
  font-size: 16px;
  font-family: "Cousine", monospace;
`;
const Brand = styled(Typography)`
  color: black;
  font-size: 16px;
  font-family: "Cousine", monospace;
  text-transform: uppercase;
`;

const Price = styled(Typography)`
  color: black;
  font-size: 16px;
  font-family: "Cousine", monospace;
`;
