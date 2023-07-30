import { styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";

export default function BrandCarousel(props: any) {
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <HeaderDiv>
        <Kind>Shop By Brand</Kind>
      </HeaderDiv>
      <Carousel
        responsive={responsive}
        autoPlay={props.deviceType === "mobile" ? true : false}
        draggable={props.deviceType !== "mobile" ? false : true}
        itemClass="carousel-item"
      >
        <Photo src="/adidas.jpg" />
        <Photo src="/nike.jpg" />
        <Photo src="/puma.jpg" />
        <Photo src="/reebok.png" />
        <Photo src="/zara.jpg" />
      </Carousel>
    </>
  );
}

const HeaderDiv = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 20px 0px 20px;
  justify-content: space-between;
`;

const Kind = styled(Typography)`
  color: black;
  font-size: 20px;
  font-weight: 400px;
`;
const Photo = styled("img")`
  width: 100%;
  height: 210px;
  border-radius: 5px;
  cursor: pointer;
`;
