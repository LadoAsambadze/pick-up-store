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
        infinite={true}
      >
        <PhotoDiv
          // style={{ backgroundImage: "url('/cover-back.jpg')" }}
        ></PhotoDiv>
      </Carousel>
    </>
  );
}

const PhotoDiv = styled("div")`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
`;
