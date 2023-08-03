import { styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { useState, useEffect } from "react";
import axios from "axios";

interface Type {
  type: string;
  gender: string;
  category: string;
  price: string;
  size: string;
  brand: string;
  name: string;
  image: string;
  new: boolean;
}

export default function NewArrivals(props: any) {
  const [arrivals, setArrivals] = useState<Type[]>([]);

  const getShoesAndClothes = async () => {
    const shoesResponse = await axios.get("http://localhost:3000/shoes");
    const clothesResponse = await axios.get("http://localhost:3000/clothes");
    setArrivals([...shoesResponse.data.shoes, ...clothesResponse.data.clothes]);
  };

  useEffect(() => {
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
        </HeaderDiv>
        <Carousel
          responsive={responsive}
          autoPlay={props.deviceType === "mobile" ? true : false}
          itemClass="carousel-item"
          infinite={true}
        >
          {arrivals
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
