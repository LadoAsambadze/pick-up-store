import { styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
      <Carousel
        responsive={responsive}
        autoPlay={props.deviceType === "mobile" ? true : false}
        draggable={props.deviceType !== "mobile" ? false : true}
        itemClass="carousel-item"
      >
        <Photo src="/adidas.png" />
        <Photo src="/nike.jpg" />
        <Photo src="/puma.webp" />
        <Photo src="/nike.jpg" />
        <Photo src="/adidas.png" />
      </Carousel>
    </>
  );
}

const Photo = styled("img")`
  width: 100%;
  height: 280px;
  border-radius: 5px;

`;
