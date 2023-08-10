import { styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { useEffect } from "react";
import axios from "axios";
import { setLoading } from "../store/loading-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/redux";
import CircularProgress from "@mui/material/CircularProgress";
import { setData } from "../store/data-slice";

export default function NewArrivals(props: any) {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const data = useSelector((state: RootState) => state.data.data);

  useEffect(() => {
    const getShoesAndClothes = async () => {
      try {
        const shoesResponse = await axios.get("http://localhost:3000/shoes");
        const clothesResponse = await axios.get(
          "http://localhost:3000/clothes"
        );
        dispatch(
          setData([
            ...shoesResponse.data.shoes,
            ...clothesResponse.data.clothes,
          ])
        );
        dispatch(setLoading(false));
      } catch (error) {
        console.error({ message: "lado yyyyyyyyyyy", error });
        prompt("qegqegqegqe");
      }
    };
    getShoesAndClothes();
  }, []);

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
      breakpoint: { max: 1000, min: 450 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 450, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Section>
        <HeaderDiv>
          <Kind>New Arrivals</Kind>
          <View>View All</View>
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
                    <Favourite
                      src="/heart.svg"
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
  font-family: "Cousine", monospace;
  @media (min-width: 1440px) {
    font-size: 24px;
  }
`;

const View = styled(Typography)`
  color: #686060;
  font-size: 16px;
  font-weight: 400;
  font-family: "Cousine", monospace;
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
  border: 3px solid #d8d8e1;
  border-radius: 5px;
  cursor: pointer;
  justify-content: flex-end;
`;

const ImageDiv = styled(Box)`
  display: flex;
  width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  border-bottom: 1px solid #d8d8e1;
  background-position: center;
  @media (min-width: 1440px) {
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
  bottom: 45px;
  right: 40px;
`;

const Description = styled(Typography)`
  color: black;
  font-size: 16px;
  font-family: "Cousine", monospace;
`;

const Price = styled(Typography)`
  color: black;
  font-size: 16px;
  font-family: "Cousine", monospace;
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
