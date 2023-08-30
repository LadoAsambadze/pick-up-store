import { Typography, styled } from "@mui/material";
import { Box } from "@mui/material";
import Sort from "../components/sort";
import FilterComponent from "../components/filter";
import { RootState } from "../store/redux";
import { setFilter } from "../store/filter-slice";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

export default function Clothes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redux = useSelector((state: RootState) => state.filter);
  const search = useSelector((state: RootState) => state.search.search);
  const data = useSelector((state: RootState) => state.data.data);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const clothes = data.filter((item) => item.type === "clothes");

  return (
    <>
      <Main>
        <FilterComponent />
        <div
          style={{
            filter: redux.filter ? "blur(5px)" : "none",
            pointerEvents: redux.filter ? "none" : "auto",
          }}
        >
          <FindBy>
            <FilterDiv
              onClick={() => {
                dispatch(setFilter(true));
              }}
            >
              <Filter>Filter</Filter>
              <FilterIcon src="/filter.png" />
            </FilterDiv>

            <Sort />
          </FindBy>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                minHeight: "100vh",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <MainGrid>
              {clothes
                .filter(
                  (item) =>
                    redux.genderType === null ||
                    item.gender === redux.genderType
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
                // .filter(
                //   (item) =>
                //     redux.sizeType.length === 0 ||
                //     item.size.some((size) => redux.sizeType.includes(size))
                // )
                .filter(
                  (item) =>
                    search === "" ||
                    item.name.toLowerCase().includes(search.toLowerCase())
                )
                .sort((itemA, itemB) => {
                  if (redux.sortType === "low") {
                    return itemA.price - itemB.price;
                  } else if (redux.sortType === "high") {
                    return itemB.price - itemA.price;
                  } else if (
                    itemA.new &&
                    !itemB.new &&
                    redux.sortType === "new"
                  ) {
                    return -1; //
                  } else if (
                    !itemA.new &&
                    itemB.new &&
                    redux.sortType === "old"
                  ) {
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
                      <Favourite
                        src="/heart.svg"
                        alt="Favourite add icon, heart"
                      />
                    </About>
                  </ArrivalDiv>
                ))}
            </MainGrid>
          )}
        </div>
      </Main>
    </>
  );
}

const Main = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  min-height: 100vh;
  padding: 10px 20px 10px 20px;
  @media (min-width: 500px) {
    padding: 10px 35px 10px 35px;
  }
  @media (min-width: 768px) {
    padding: 10px 50px 10px 50px;
  }
  @media (min-width: 1200px) {
    padding: 10px 100px 10px 100px;
  }
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
  width: 130px;
  border-radius: 5px;
  padding: 10px 15px 10px 15px;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  cursor: pointer;
  border-color: #b8b2b2;
`;
const Filter = styled(Typography)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 500;
  color: black;
  font-size: 18px;
`;

const FilterIcon = styled("img")`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`;

const MainGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  padding-top: 10px;
  @media (min-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
    padding-top: 25px;
  }
`;
const ArrivalDiv = styled(Box)`
  display: flex;
  flex-direction: column;
  border: 1px solid #d8d8e1;
  border-radius: 5px;
  cursor: pointer;
  justify-content: flex-end;
  position: relative;
  @media (min-width: 1440px) {
    border: 2px solid #d8d8e1;
  }
`;

const ImageDiv = styled(Box)`
  display: flex;
  width: 100%;
  height: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  border-bottom: 1px solid #d8d8e1;
  background-position: center;
  @media (min-width: 500px) {
    height: 200px;
  }
  @media (min-width: 1200px) {
    height: 300px;
  }
`;

const About = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  padding: 10px 10px 10px 10px;
  @media (min-width: 1440px) {
    padding: 10px 20px 20px 20px;
  }
`;

const Favourite = styled("img")`
  display: flex;
  padding: 3px;
  justify-content: center;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 12px;
  @media (min-width: 1440px) {
    top: 12px;
    right: 12px;
    padding: 6px;
  }
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
  font-size: 10px;
  font-family: "Cousine", monospace;
  overflow: hidden;
  white-space: nowrap;
  @media (min-width: 1440px) {
    font-size: 16px;
  }
`;
const Brand = styled(Typography)`
  color: black;
  font-size: 10px;
  font-family: "Cousine", monospace;
  text-transform: uppercase;
  @media (min-width: 1440px) {
    font-size: 16px;
  }
`;

const Price = styled(Typography)`
  color: black;
  font-size: 10px;
  font-family: "Cousine", monospace;
  @media (min-width: 1440px) {
    font-size: 16px;
  }
`;
