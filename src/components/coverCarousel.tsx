import { styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CoverCarousel(props: any) {
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
  };
  return (
    <>
      <Carousel
        responsive={responsive}
        autoPlay={props.deviceType === "mobile" ? true : false}
        draggable={props.deviceType !== "mobile" ? false : true}
    
      >
        <PhotoDiv
          style={{ backgroundImage: "url('/women-back.jpg')" }}
        ></PhotoDiv>
        <PhotoDiv
          style={{ backgroundImage: "url('/shoes-back.jpg')" }}
        ></PhotoDiv>
        <PhotoDiv style={{ backgroundImage: "url('/back.jpg')" }}></PhotoDiv>
      </Carousel>
    </>
  );
}

const PhotoDiv = styled("div")`
  width: 100%;
  height: 600px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
