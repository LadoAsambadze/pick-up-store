import { styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";

export default function NewArrivals(props: any) {
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 767 },
      items: 3,
    },
    tabletOne: {
      breakpoint: { max: 768, min: 500 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 400, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <HeaderDiv>
        <Kind>New Arrivals</Kind>
      </HeaderDiv>
      <Carousel
        responsive={responsive}
        autoPlay={props.deviceType === "mobile" ? true : false}
        draggable={props.deviceType !== "mobile" ? false : true}
        itemClass="carousel-item"
      >
        <ArrivalDiv>
          <Photo src="/shoes.webp" />
          <About>
            <Price>price: 70$</Price>
            <BrandName>Reebook</BrandName>
            <Favourite src="/heart-white.png" alt="Favourite add icon, heart" />
          </About>
        </ArrivalDiv>
        <ArrivalDiv>
          <Photo src="/shoes.webp" />
          <About>
            <Price>price: 70$</Price>
            <BrandName>Reebook</BrandName>
            <Favourite src="/heart-white.png" alt="Favourite add icon, heart" />
          </About>
        </ArrivalDiv>
        <ArrivalDiv>
          <Photo src="/shoes.webp" />
          <About>
            <Price>price: 70$</Price>
            <BrandName>Reebook</BrandName>
            <Favourite src="/heart-white.png" alt="Favourite add icon, heart" />
          </About>
        </ArrivalDiv>
        <ArrivalDiv>
          <Photo src="/shoes.webp" />
          <About>
            <Price>price: 70$</Price>
            <BrandName>Reebook</BrandName>
            <Favourite src="/heart-white.png" alt="Favourite add icon, heart" />
          </About>
        </ArrivalDiv>
        <ArrivalDiv>
          <Photo src="/shoes.webp" />
          <About>
            <Price>price: 70$</Price>
            <BrandName>Reebook</BrandName>
            <Favourite src="/heart-white.png" alt="Favourite add icon, heart" />
          </About>
        </ArrivalDiv>
        <ArrivalDiv>
          <Photo src="/shoes.webp" />
          <About>
            <Price>price: 70$</Price>
            <BrandName>Reebook</BrandName>
            <Favourite src="/heart-white.png" alt="Favourite add icon, heart" />
          </About>
        </ArrivalDiv>
      </Carousel>
    </>
  );
}

const HeaderDiv = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px 10px 25px;
  justify-content: space-between;
`;

const Kind = styled(Typography)`
  color: black;
  font-size: 24px;
  font-weight: 400;
  font-family: "Ysabeau Office", sans-serif;
`;

const ArrivalDiv = styled(Box)`
  display: flex;
  flex-direction: column;
  border: 3px solid black;
  border-radius: 5px;
`;
const Photo = styled("img")`
  width: 100%;
  height: 300px;
  border-radius: 5px;
`;

const About = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  padding: 20px;
`;
const Price = styled(Typography)`
  color: white;
  font-size: 16px;
  font-family: "Ysabeau Office", sans-serif;
`;
const Favourite = styled("img")`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const BrandName = styled(Typography)`
  color: white;
  font-size: 16px;
  font-family: "Ysabeau Office", sans-serif;
`;
