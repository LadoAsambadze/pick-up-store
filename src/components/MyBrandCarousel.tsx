import { styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { keyframes } from "@mui/material";

export default function BrandCarousel(props: any) {
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    mobile2: {
      breakpoint: { max: 768, min: 500 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Section>
        <HeaderDiv>
          <Kind>Shop By Brand</Kind>
        </HeaderDiv>
        <Carousel
          responsive={responsive}
          autoPlay={props.deviceType === "mobile" ? true : false}
          draggable={props.deviceType !== "mobile" ? false : true}
          itemClass="carousel-item"
        >
          <PhotoDiv
            style={{ backgroundImage: "url('/adidas.avif')" }}
          ></PhotoDiv>
          <PhotoDiv style={{ backgroundImage: "url('/nike.avif')" }}></PhotoDiv>
          <PhotoDiv style={{ backgroundImage: "url('/puma.avif')" }}></PhotoDiv>
          <PhotoDiv
            style={{ backgroundImage: "url('/reebok.avif')" }}
          ></PhotoDiv>
          <PhotoDiv style={{ backgroundImage: "url('/zara.avif')" }}></PhotoDiv>
        </Carousel>
      </Section>
    </>
  );
}

const slideInFromLeft = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const Section = styled(Box)`
  width: 100%;
  padding-bottom: 10px;
  animation: ${slideInFromLeft} 1.5s ease-out;
  @media (min-width: 1440px) {
    padding-left: 80px;
    padding-right: 80px;
    padding-bottom: 20px;
  }
`;

const HeaderDiv = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px 30px 25px 30px;
  justify-content: space-between;
  @media (min-width: 1440px) {
    padding: 20px 10px 30px 25px;
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

const PhotoDiv = styled("div")`
  width: 100%;
  height: 200px;
  border-radius: 5px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @media (min-width: 1440px) {
    height: 250px;
  }
`;
