import { Typography, styled } from "@mui/material";
import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Selected() {
  const data = useSelector((state: RootState) => state.data.data);
  const { id } = useParams();
  const shoesItem = data.find((item) => item._id === id);
  const [selectedImage, setSelectedImage] = useState(
    shoesItem?.images[0].urls[0]
  );
  const initialResult = shoesItem?.images[0];
  const [selectedSort, setSelectedSort] = useState(shoesItem?.images[0].urls);
  const [selectedColor, setSelectedColor] = useState(
    initialResult && initialResult.color
  );
  const [cartImage, setCartImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const result = shoesItem?.images.find((item) => item.color === selectedColor);
  const [quantity, setQuantity] = useState(null);

  function handleSelect(key, value) {
    setQuantity(value);
    setSelectedSize(key);
  }
  const cartData = {
    product_id: id,
    name: shoesItem?.name,
    size: selectedSize,
    color: selectedColor,
    quantity: quantity,
    image: cartImage,
  };

  const addToCart = async () => {
    if (Object.values(cartData).every((value) => value)) {
      try {
        const response = await axios.post(
          "http://localhost:3000/addCart",
          cartData
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      console.log("Please select all options before adding to cart.");
    }
  };
  return (
    <>
      <Main>
        <DivideDivFirst>
          <ImageDiv src={`http://localhost:3000${selectedImage}`} />
        </DivideDivFirst>
        <DivideDivSecond>
          <Description>
            <Name>Nike Pegasus Turbo Next Nature</Name>
            <Brand>Brand: Puma</Brand>
            <Price>$ 40.33</Price>
          </Description>

          <Carousel responsive={responsiveSort} infinite={true}>
            {selectedSort &&
              selectedSort.map((item, index) => (
                <SmallImageDivSort
                  key={index}
                  style={{
                    backgroundImage: `url(http://localhost:3000${item})`,
                  }}
                  onClick={() => {
                    setSelectedImage(item);
                  }}
                ></SmallImageDivSort>
              ))}
          </Carousel>
          <SizeDiv>
            <SizeHeader>Select Size</SizeHeader>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {result &&
                Object.entries(result.size).map(([key, value], index) => (
                  <SizeChoose
                    style={{
                      backgroundColor:
                        key === selectedSize ? "lightblue" : "transparent",
                      pointerEvents: value === 0 ? "none" : "auto",
                      filter: value === 0 ? "blur(0.5px)" : "none",
                      opacity: value === 0 ? "0.5" : "1",
                    }}
                    key={index}
                    onClick={() => handleSelect(key, value)}
                  >
                    {key}
                  </SizeChoose>
                ))}
            </div>
            <Carousel
              responsive={responsiveColor}
              itemClass="carousel-item-small"
              infinite={true}
              removeArrowOnDeviceType={["tablet", "desktop"]}
            >
              {shoesItem &&
                shoesItem.images.map((item, index) => (
                  <SmallImageDiv
                    key={index}
                    style={{
                      backgroundImage: `url(http://localhost:3000${item.urls[0]})`,
                    }}
                    onClick={() => {
                      setSelectedImage(item.urls[0]);
                      setSelectedSort(item.urls);
                      setSelectedColor(item.color);
                      setCartImage(item.urls[0]);
                    }}
                  ></SmallImageDiv>
                ))}
            </Carousel>
            <AddToCart onClick={addToCart}>Add to bag</AddToCart>
            <AddToFav>Add to favourite</AddToFav>
            <ReviewsDiv>
              <ReviewHeader>Reviews</ReviewHeader>
              <ArrowDiv>
                <Star src="/star.png" />
                <Star src="/star.png" />
                <Star src="/star.png" />
                <Star src="/star.png" />
              </ArrowDiv>
              <img
                style={{ width: "20px", height: "20px" }}
                src="/arrow-down-black.png"
              />
            </ReviewsDiv>
          </SizeDiv>
        </DivideDivSecond>
      </Main>
    </>
  );
}

const Main = styled(Box)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
  padding-top: 20px;
  @media (min-width: 900px) {
    flex-direction: row;
    padding-left: 40px;
    padding-right: 40px;
  }
  @media (min-width: 1100px) {
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 40px;
  }
`;

const Description = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0px 25px 12px 25px;
`;

const Name = styled(Typography)`
  font-size: 20px;
  text-align: left;
`;
const Brand = styled(Typography)`
  font-size: 14px;
  text-align: left;
`;
const Price = styled(Typography)`
  font-size: 16px;
  text-align: left;
  margin-top: 15px;
`;
const ImageDiv = styled("img")`
  width: 100%;
  @media (min-width: 768px) {
    width: 97%;
  }
`;

const SmallImageDiv = styled(Box)`
  height: 100px;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 5px 2px 2px 2px;
  cursor: pointer;
  @media (min-width: 500px) {
    height: 150px;
  }
  @media (min-width: 900px) {
    height: 120px;
  }
`;

const SmallImageDivSort = styled(Box)`
  height: 50px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 5px 2px 2px 2px;
  cursor: pointer;

  @media (min-width: 500px) {
    height: 100px;
  }
  @media (min-width: 900px) {
    height: 100px;
  }
`;

const SizeDiv = styled(Box)`
  padding: 20px 25px 12px 25px;
`;
const SizeHeader = styled(Typography)`
  font-size: 20px;
`;

const SizeChoose = styled(Box)`
  border-radius: 8px;
  border: 1px solid #bebcbd;
  opacity: 0.8;
  width: 65px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddToCart = styled("button")`
  padding: 18px 24px 18px 24px;
  width: 100%;
  border-radius: 30px;
  border: none;
  background: #655a5a;
  color: white;

  @media (min-width: 900px) {
    width: 70%;
    margin-top: 20px;
  }
`;

const AddToFav = styled("button")`
  padding: 18px 24px 18px 24px;
  width: 100%;
  border-radius: 30px;
  border: 1px solid gray;
  background: white;
  color: black;
  margin-top: 15px;
  @media (min-width: 900px) {
    width: 70%;
  }
`;

const DivideDivFirst = styled(Box)`
  width: 100%;
  @media (min-width: 900px) {
    width: 50%;
  }
`;
const DivideDivSecond = styled(Box)`
  width: 100%;
  @media (min-width: 900px) {
    width: 50%;
  }
`;

const ReviewsDiv = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  @media (min-width: 900px) {
    width: 50%;
  }
`;

const ReviewHeader = styled(Typography)`
  font-size: 20px;
`;

const Star = styled("img")`
  width: 20px;
  height: 20px;
`;

const ArrowDiv = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const responsiveColor = {
  desktop: {
    breakpoint: { max: 4000, min: 1100 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1100, min: 900 },
    items: 3,
  },
  tabletOne: {
    breakpoint: { max: 900, min: 550 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 550, min: 0 },
    items: 3,
  },
};
const responsiveSort = {
  desktop: {
    breakpoint: { max: 4000, min: 1440 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1440, min: 900 },
    items: 4,
  },
  tabletOne: {
    breakpoint: { max: 900, min: 550 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 550, min: 0 },
    items: 5,
  },
};
