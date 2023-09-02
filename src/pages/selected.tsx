import { Typography, styled } from "@mui/material";
import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Rating } from "@mui/material";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
interface User {
  id: string;
}

export default function Selected() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const data = useSelector((state: RootState) => state.data.data);
  let shoesItem: any;
  if (data) {
    shoesItem = data.find((item) => item._id === id);
  }
  const user = useSelector(
    (state: RootState) => state.user.userinfo
  ) as User | null;

  const [selectedColor, setSelectedColor] = useState(
    shoesItem?.images[0] && shoesItem?.images[0].color
  );
  let result: any;
  if (shoesItem) {
    result = shoesItem?.images.find(
      (item: any) => item.color === selectedColor
    );
  }
  const [selectedImage, setSelectedImage] = useState(
    shoesItem?.images[0].urls[0]
  );
  const [selectedSort, setSelectedSort] = useState(shoesItem?.images[0].urls);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [choosedAmount, setChoosedAmount] = useState<number>(1);
  const [amountWarn, setAmountWarn] = useState(false);
  const [check, setCheck] = useState(false);

  function handleSelect(key: string | null, value: any) {
    setQuantity(value);
    setSelectedSize(key);
  }
  const user_id = user ? user.id : null;
  const cartData = {
    user: user_id,
    orderItems: [
      {
        product_id: id,
        name: shoesItem?.name,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        image: selectedImage,
        price: shoesItem?.price,
        amount: choosedAmount,
      },
    ],
  };
  useEffect(() => {
    if (shoesItem) {
      setSelectedColor(shoesItem.images[0].color);
      setSelectedImage(shoesItem.images[0].urls[0]);
      setSelectedSort(shoesItem.images[0].urls);
      result = shoesItem.images.find(
        (item: any) => item.color === selectedColor
      );
    }
  }, [data, shoesItem]);

  const addToCart = async () => {
    if (Object.values(cartData).every((value) => value)) {
      const cookieToken = getCookie("token");

      try {
        if (choosedAmount !== 0) {
          await axios.post("http://localhost:3000/order/addCart", cartData, {
            headers: {
              authorization: `Bearer ${cookieToken}`,
            },
          });

          setAmountWarn(false);
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
        console.log("Please log in");
      }
    } else {
      console.log("Please select all options before adding to cart.");
    }
    if (choosedAmount === 0) {
      setAmountWarn(true);
    }
    if (!selectedSize) {
      setCheck(true);
    }
  };
  useEffect(() => {
    if (
      data &&
      shoesItem &&
      result &&
      selectedSort &&
      selectedImage &&
      selectedColor
    ) {
      setLoading(false);
    }
  }, [data, shoesItem, result, selectedColor, selectedImage, selectedSort]);

  if (loading) {
    return <div>Loading...</div>;
  }
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
            <Price>Price: $ {shoesItem?.price}</Price>
          </Description>

          <Carousel responsive={responsiveSort} infinite={true}>
            {selectedSort &&
              selectedSort.map((item: any, index: any) => (
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
          <FromSizeDiv>
            <HeaderDiv>
              <Header>Select Size</Header>
              <Warning
                style={{ display: selectedSize || !check ? "none" : "block" }}
              >
                Please Select Size
              </Warning>
            </HeaderDiv>

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
                    onClick={() => {
                      handleSelect(key, value), setChoosedAmount(1);
                    }}
                  >
                    {key}
                  </SizeChoose>
                ))}
            </ItemSizeSection>
            <HeaderDiv>
              <Header>Select Color</Header>
            </HeaderDiv>
            <Carousel
              responsive={responsiveColor}
              itemClass="carousel-item-small"
              infinite={true}
              removeArrowOnDeviceType={["tablet", "desktop"]}
            >
              {shoesItem &&
                shoesItem.images.map((item: any, index: any) => (
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
                      setChoosedAmount(0);
                      if (selectedColor !== item.color) {
                        setSelectedSize(null);
                        setQuantity(0);
                      }
                    }}
                  ></SmallImageDiv>
                ))}
            </Carousel>
            <PriceSum>
              $
              {shoesItem?.price !== undefined
                ? choosedAmount * shoesItem.price
                : 0}
            </PriceSum>

            <AddQuantity>
              <Minus
                onClick={() => {
                  if (choosedAmount > 0) {
                    setChoosedAmount(choosedAmount - 1);
                  }
                }}
                src="/icon-minus.svg"
              />
              <Quantity>{choosedAmount}</Quantity>

              <Plus
                onClick={() => {
                  if (choosedAmount < quantity) {
                    setChoosedAmount(choosedAmount + 1);
                    setAmountWarn(false);
                  }
                  if (!selectedSize) {
                    setCheck(true);
                  }
                }}
                src="/icon-plus.svg"
              />
            </AddQuantity>
            <Warning style={{ display: amountWarn ? "block" : "none" }}>
              Please Select Amount
            </Warning>
            <AddToCart onClick={addToCart}>
              <CartIcon src="/cart-icon.svg" alt="Cart Icon" />
              <ButtonText>Add To Cart</ButtonText>
            </AddToCart>
            <AddToFav>
              <HeartIcon src="/heart-white.png" alt="Favorite/heart icon" />
              <ButtonText>Add To Favourite</ButtonText>
            </AddToFav>
            <Reviews>Reviews</Reviews>
            <Rating name="read-only" value={4.3} readOnly />
          </FromSizeDiv>
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
  @media (min-width: 768px) {
    flex-direction: row;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 30px;
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
  font-weight: 500;
  color: black;
  font-size: 16px;
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
  @media (min-width: 550px) {
    height: 100px;
  }
`;

const HeaderDiv = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Warning = styled(Typography)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 500;
  color: red;
  font-size: 14px;
  margin-left: 20px;
`;
const FromSizeDiv = styled(Box)`
  padding: 20px 20px 12px 20px;
`;

const ItemSizeSection = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Header = styled(Typography)`
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
  color: #7a7070;
  font-size: 14px;
`;

const AddQuantity = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 90px 10px 90px;
  width: 100%;
  border: none;
  color: black;
  border-radius: 10px;
  background: var(--light-grayish-blue, #f4f5fd);
  margin-top: 10px;

  @media (min-width: 900px) {
    width: 70%;
    margin-top: 20px;
  }
`;
const PriceSum = styled(Typography)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 700;
  color: #08213d;
  font-size: 22px;
  margin-top: 5px;
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

const Quantity = styled(Box)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 700;
  color: #08213d;
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
    box-shadow: 0px 8px 10px 0px #896666, 0px 2px 6px rgba(255, 255, 255, 0.4);
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

const Reviews = styled(Typography)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 700;
  color: #062950;
  font-size: 17px;
  margin-top: 10px;
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
    items: 3,
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
    items: 4,
  },
  mobile: {
    breakpoint: { max: 550, min: 0 },
    items: 5,
  },
};
