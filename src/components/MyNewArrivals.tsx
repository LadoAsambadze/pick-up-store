import { styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import RedHeart from "/public/red-heart.avif";
import WhiteHeart from "/public/heart.svg";
import { removeFavourite, setFavourites } from "../store/favourites-slice";

export default function NewArrivals(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const data = useSelector((state: RootState) => state.data.data);
  const favourites = useSelector(
    (state: RootState) => state.favourites.favourites
  );

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1440 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1440, min: 1000 },
      items: 3,
    },
    tabletOne: {
      breakpoint: { max: 1000, min: 430 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 430, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Section>
        <HeaderDiv>
          <Kind>New Arrivals</Kind>
          <View
            onClick={() => {
              navigate("/NewArrivals");
            }}
          >
            View All
          </View>
        </HeaderDiv>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Carousel
            responsive={responsive}
            autoPlay={props.deviceType === "mobile"}
            itemClass="carousel-item"
            infinite={true}
          >
            {data
              .filter((item) => item.new)
              .map((item, index) => (
                <ArrivalDiv
                  onClick={() => {
                    const id = item._id;
                    const newData = data.find((item) => item._id === id);
                    if (newData) {
                      if (newData.type === "Shoes") {
                        navigate(`/shoes/${id}`);
                      } else if (newData.type === "Clothes") {
                        navigate(`/clothes/${id}`);
                      }
                    }
                  }}
                  key={index}
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
                    <Price>$ {item.price}</Price>
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
              ))}
          </Carousel>
        )}
      </Section>
    </>
  );
}

const Section = styled(Box)`
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;

  @media (min-width: 1440px) {
    padding-left: 80px;
    padding-right: 80px;
  }
`;

const HeaderDiv = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px 0px 25px 0px;
  justify-content: space-between;
  @media (min-width: 1440px) {
    padding: 30px 25px 25px 25px;
  }
`;

const Kind = styled(Typography)`
  color: black;
  font-size: 20px;
  font-weight: 400;
  font-family: "Ysabeau Office", sans-serif;
  @media (min-width: 1440px) {
    font-size: 24px;
  }
`;

const View = styled(Typography)`
  color: #686060;
  font-size: 16px;
  font-weight: 400;
  font-family: "Ysabeau Office", sans-serif;
  text-decoration: underline;
  cursor: pointer;
  text-underline-offset: 5px;
  &:hover {
    color: black;
  }
  @media (min-width: 1440px) {
    font-size: 24px;
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
  height: 170px;
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
  color: #012720;
  font-size: 10px;
  font-weight: 400;
  font-family: "Ysabeau Office", sans-serif;
  overflow: hidden;
  white-space: nowrap;
  @media (min-width: 1440px) {
    font-size: 16px;
  }
`;
const Brand = styled(Typography)`
  color: black;
  font-size: 10px;
  font-weight: 400;
  font-family: "Ysabeau Office", sans-serif;
  @media (min-width: 1440px) {
    font-size: 16px;
  }
`;
const Price = styled(Typography)`
  color: black;
  font-size: 10px;
  font-family: "Ysabeau Office", sans-serif;
  font-weight: 700;
  margin-top: 3px;
  @media (min-width: 1440px) {
    font-size: 16px;
  }
`;
