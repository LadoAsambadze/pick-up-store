import { styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { useState, useEffect } from "react";
import axios from "axios";

interface ProductsType {
  model: string;
  details: {
    price: string;
  };
  image: string;
}
export default function NewArrivals(props: any) {
  const [arrivals, setArrivals] = useState<ProductsType[]>([]);

  const getInfo = async () => {
    const response = await axios.get("http://localhost:3000/main");
    setArrivals(response.data.products);
  };

  useEffect(() => {
    getInfo();
  }, []);

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
      breakpoint: { max: 768, min: 450 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 450, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <div>
        <HeaderDiv>
          <Kind>New Arrivals</Kind>
        </HeaderDiv>
        <Carousel
          responsive={responsive}
          autoPlay={props.deviceType === "mobile" ? true : false}
          itemClass="carousel-item"
          infinite={true}
        >
          {arrivals.map((item, index) => (
            <ArrivalDiv key={index}>
              <ImageDiv
                style={{
                  backgroundImage: `url(http://localhost:3000${item.image})`,
                }}
              ></ImageDiv>
              <About>
                <Price>{item.details.price}</Price>
                <BrandName>Brand:{item.model}</BrandName>
                <Favourite
                  src="/heart-white.png"
                  alt="Favourite add icon, heart"
                />
              </About>
            </ArrivalDiv>
          ))}
        </Carousel>
      </div>
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
  cursor: pointer;
  justify-content: flex-end;
`;

const ImageDiv = styled(Box)`
  display: flex;
  width: 100%;
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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
