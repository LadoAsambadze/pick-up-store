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
  const [cartImage, setCartImage] = useState<String | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const result = shoesItem?.images.find((item) => item.color === selectedColor);
  const [quantity, setQuantity] = useState<Number | null>(null);

  function handleSelect(key: string | null, value: any) {
    setQuantity(value);
    setSelectedSize(key);
    console.log(typeof key, typeof value);
  }
  const cartData = {
    product_id: id,
    name: shoesItem?.name,
    size: selectedSize,
    color: selectedColor,
    quantity: quantity,
    image: cartImage,
    price: shoesItem?.price,
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
            <Brand>Brand: {shoesItem?.brand}</Brand>
            <Price>Price: ${shoesItem?.price}</Price>
          </Description>

          <Carousel responsive={responsiveSort} infinite={true}>
            {selectedSort &&
              selectedSort.map((item, index) => (
                <SmallImageDivSort
                  key={index}
                  style={{
                    backgroundImage: `url(http://localhost:3000${item})`,
                    border:
                      selectedImage === item ? "1px solid #cf9f58" : "none",
                  }}
                  onClick={() => {
                    setSelectedImage(item);
                  }}
                ></SmallImageDivSort>
              ))}
          </Carousel>
          <SizeDiv>
            <SizeHeader>Select Size</SizeHeader>
            <ItemSizeSection>
              {result &&
                Object.entries(result.size).map(([key, value], index) => (
                  <SizeChoose
                    style={{
                      backgroundColor:
                        key === selectedSize ? "#90dfe2" : "transparent",
                      pointerEvents: value === 0 ? "none" : "auto",
                      filter: value === 0 ? "blur(0.7px)" : "none",
                      opacity: value === 0 ? "0.5" : "1",
                    }}
                    key={index}
                    onClick={() => handleSelect(key, value)}
                  >
                    {key}
                  </SizeChoose>
                ))}
            </ItemSizeSection>
            <SizeHeader>Select Color</SizeHeader>
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
                      border:
                        selectedImage === item.urls[0]
                          ? "2px solid #cf9f58"
                          : "none",
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
            <AddQuantity>
              <Minus src="/icon-minus.svg" />
              <Quantity>0</Quantity>
              <Plus src="/icon-plus.svg" />
            </AddQuantity>
            <AddToCart onClick={addToCart}>
              <CartIcon src="/cart-icon.svg" alt="Cart Icon" />
              <ButtonText>Add To Cart</ButtonText>
            </AddToCart>
            <AddToFav>
              <HeartIcon src="/heart-white.png" alt="Favorite/heart icon" />
              <ButtonText>Add To Favourite</ButtonText>
            </AddToFav>
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
  padding: 0px 20px 12px 20px;
`;

const Name = styled(Typography)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 700;
  color: black;
  font-size: 20px;
  text-align: left;
`;
const Brand = styled(Typography)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 500;
  color: black;
  font-size: 14px;
  text-align: left;
  margin-top: 5px;
`;
const Price = styled(Typography)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 700;
  color: black;
  font-size: 18px;
  text-align: left;
  margin-top: 10px;
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
  border-radius: 3px;
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
  border-radius: 5px;

  @media (min-width: 500px) {
    height: 100px;
  }
  @media (min-width: 900px) {
    height: 100px;
  }
`;

const SizeDiv = styled(Box)`
  padding: 20px 20px 12px 20px;
`;

const ItemSizeSection = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const SizeHeader = styled(Typography)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 700;
  color: black;
  font-size: 16px;
`;
const SizeChoose = styled(Box)`
  border-radius: 8px;
  border: 1px solid #5e5a5c;
  width: 55px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  cursor: pointer;
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 400;
  color: #534c4c;
  font-size: 14px;
`;

const AddQuantity = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 70px 10px 70px;
  width: 100%;
  border: none;
  color: black;
  border-radius: 10px;
  background: var(--light-grayish-blue, #f7f8fd);
  margin-top: 10px;

  @media (min-width: 900px) {
    width: 70%;
    margin-top: 20px;
  }
`;

const Minus = styled("img")`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
const Plus = styled("img")`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const Quantity = styled(Typography)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 500;
  color: black;
  font-size: 17px;
`;

const AddToCart = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 77px 16px 77px;
  width: 100%;
  border: none;
  color: white;
  border-radius: 10px;
  background: var(--orange, #ff7d1a);
  box-shadow: 0px 8px 10px 0px #ffede0;
  margin-top: 10px;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0px 8px 10px 0px #896666, 0px 2px 6px rgba(255, 255, 255, 0.4); /* Add white shadow on hover */
  }
  @media (min-width: 900px) {
    width: 70%;
    margin-top: 20px;
  }
`;

const CartIcon = styled("img")`
  width: 17px;
  height: 15px;
`;
const HeartIcon = styled("img")`
  width: 16px;
  height: 16px;
`;
const ButtonText = styled(Typography)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 400px;
  font-size: 13px;
  color: white;
  margin-left: 7px;
`;
const AddToFav = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 77px 16px 77px;
  width: 100%;
  border: none;
  color: white;
  border-radius: 10px;
  background: var(--orange, #ff7d1a);
  box-shadow: 0px 8px 10px 0px #ffede0;
  margin-top: 15px;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0px 8px 10px 0px #896666, 0px 2px 6px rgba(255, 255, 255, 0.4); /* Add white shadow on hover */
  }
  @media (min-width: 900px) {
    width: 70%;
    margin-top: 20px;
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
