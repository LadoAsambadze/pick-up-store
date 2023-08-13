import { Typography, styled } from "@mui/material";
import { Box } from "@mui/material";
import Sort from "../components/sort";
import FilterComponent from "../components/filter";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../store/filter-slice";
import { RootState } from "../store/redux";
import { useNavigate } from "react-router-dom";

export default function Shoes() {
  const dispatch = useDispatch();
  const redux = useSelector((state: RootState) => state.filter);
  const search = useSelector((state: RootState) => state.search.search);
  const data = useSelector((state: RootState) => state.data.data);
  const shoes = data.filter((item) => item.type === "shoes");
  const navigate = useNavigate();
  console.log(data);

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
          {shoes

            .filter(
              (item) =>
                redux.sizeType.length === 0 ||
                redux.sizeType.includes(item.size)
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
                search === "" ||
                item.name.toLowerCase().includes(search.toLowerCase())
            )
            .filter(
              (item) =>
                redux.genderType === null || redux.genderType === item.gender
            )
            .filter(
              (item) =>
                redux.categoryType === null ||
                redux.categoryType === item.category
            )
            .sort((itemA, itemB) => {
              if (redux.sortType === "low") {
                return itemA.price - itemB.price;
              } else if (redux.sortType === "high") {
                return itemB.price - itemA.price;
              } else if (itemA.new && !itemB.new && redux.sortType === "new") {
                return -1; //
              } else if (!itemA.new && itemB.new && redux.sortType === "old") {
                return 1;
              } else {
                return 0;
              }
            })

            .map((item, index) => (
              <ArrivalDiv
                onClick={() => {
                  const id = item._id;
                  navigate(`/shoes/${id}`);
                }}
                key={index}
              >
                <ImageDiv
                  style={{
                    backgroundImage: `url(http://localhost:3000${item.images[0].urls[0]})`,
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

// const SizeDiv = styled(Box)`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `;

// const Size = styled("button")`
//   padding: 4px;
//   border: 1px solid #d8d8e1;
//   color: black;
//   cursor: pointer;
//   background: white;
//   margin-right: 8px;
//   margin-top: 5px;
// `;

// <SizeDiv>
//                   <Size>XS</Size>
//                   <Size>S</Size>
//                   <Size>M</Size>
//                   <Size>L</Size>
//                   <Size>XL</Size>
//                 </SizeDiv>
