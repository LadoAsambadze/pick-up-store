import { Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/redux";
import RedHeart from "/public/red-heart.avif";
import WhiteHeart from "/public/heart.svg";
import { removeFavourite, setFavourites } from "../store/favourites-slice";

export default function Favourites() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const data = useSelector((state: RootState) => state.data.data);
  const favourites = useSelector(
    (state: RootState) => state.favourites.favourites
  );
  const filteredData = data.filter((item) => favourites.includes(item._id));

  return (
    <>
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
        <>
          {filteredData.length === 0 ? (
            <EmptyBoxDiv>
              <EmptyText>No items added in favourites</EmptyText>
              <BoxImage src="/box.avif" />
            </EmptyBoxDiv>
          ) : (
            filteredData.map((item, index) => (
              <Main>
                <MainGrid>
                  <ArrivalDiv
                    key={index}
                    onClick={() => {
                      const id = item._id;
                      navigate(`/shoes/${id}`);
                    }}
                  >
                    <ImageDiv
                      style={{
                        backgroundImage: `url(https://pick-up-store-backend-production.up.railway.app${item.itemList[0].urls[0]})`,
                      }}
                    ></ImageDiv>
                    <About>
                      <Description>
                        <Name>{item.name}</Name>
                        <Brand>{item.brand}</Brand>
                      </Description>
                      <Price>{item.price}</Price>
                      <Favourite
                        src={
                          favourites.includes(item._id) ? RedHeart : WhiteHeart
                        }
                        onClick={(event) => {
                          event.stopPropagation();
                          if (favourites.includes(item._id)) {
                            dispatch(removeFavourite(item._id));
                          } else {
                            dispatch(setFavourites(item._id));
                          }
                        }}
                        alt="Favourite add icon, heart"
                      />
                    </About>
                  </ArrivalDiv>
                </MainGrid>
              </Main>
            ))
          )}
        </>
      )}
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
  z-index: 500;
  width: 20px;
  height: 20px;
  @media (min-width: 1440px) {
    top: 12px;
    right: 12px;
    padding: 6px;
    width: 40px;
    height: 40px;
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
  font-family: "Ysabeau Office", sans-serif;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  @media (min-width: 1440px) {
    font-size: 16px;
  }
`;
const Brand = styled(Typography)`
  color: black;
  font-size: 10px;
  font-family: "Ysabeau Office", sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  @media (min-width: 1440px) {
    font-size: 16px;
  }
`;

const Price = styled(Typography)`
  color: black;
  font-size: 10px;
  font-family: "Ysabeau Office", sans-serif;
  font-weight: 400;
  @media (min-width: 1440px) {
    font-size: 16px;
  }
`;

const EmptyBoxDiv = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

const BoxImage = styled("img")`
  width: 80px;
  height: 80px;

  margin-left: 20px;
  @media (min-width: 768px) {
    width: 100px;
    height: 100px;
    margin-left: 40px;
  }
`;

const EmptyText = styled(Typography)`
  color: #9c1801;
  font-size: 20px;
  font-family: "Ysabeau Office", sans-serif;
  font-weight: 400;
  @media (min-width: 768px) {
    font-size: 30px;
  }
`;
