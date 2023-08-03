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
      breakpoint: { max: 4000, min: 1200 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1200, min: 767 },
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
      <Section>
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
                <Description>Men sneakers - Brand:{item.model}</Description>
                <Price>PRICE {item.details.price}</Price>
                <SizeDiv>
                  <Size>XS</Size>
                  <Size>S</Size>
                  <Size>M</Size>
                  <Size>L</Size>
                  <Size>XL</Size>
                </SizeDiv>
                <Favourite src="/heart.svg" alt="Favourite add icon, heart" />
              </About>
            </ArrivalDiv>
          ))}
        </Carousel>
      </Section>
    </>
  );
}

const Section = styled(Box)`
  width: 100%;
  padding-left: 80px;
  padding-right: 80px;
`;

const HeaderDiv = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px 25px 25px 25px;
  justify-content: space-between;
`;

const Kind = styled(Typography)`
  color: black;
  font-size: 24px;
  font-weight: 400;
  font-family: "Cousine", monospace;
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
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  border-bottom: 1px solid #d8d8e1;
  background-position: center;
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
  font-family: 'Cousine', monospace;
`;

const Price = styled(Typography)`
  color: black;
  font-size: 16px;
  font-family: 'Cousine', monospace;
`;

const SizeDiv = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Size = styled("button")`
  padding: 4px;
  border: 1px solid #d8d8e1;
  color: black;
  cursor: pointer;
  background: white;
  margin-right: 8px;
  margin-top: 5px;
`;
