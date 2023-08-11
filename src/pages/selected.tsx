import {  Typography, styled } from "@mui/material";
import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/redux";
import { useLocation } from "react-router-dom";
import { setSizeType } from "../store/filter-slice";

export default function Selected() {
  const dispatch = useDispatch();
  const redux = useSelector((state: RootState) => state.filter);
  const location = useLocation();
  const isShoesPage = location.pathname === "/selected";
  const clotheOptions = ["XXS", "XL", "XS", "S", "M", "L", "XXL", "3XS", "4XS"];
  const shoesOptions = [
    "31",
    "32",
    "33",
    "34",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
  ];
  const handleSize = (sizeContent: string) => {
    dispatch(setSizeType(sizeContent));
  };
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

  const responsive2 = {
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
      items: 3,
    },
  };
  return (
    <>
      <Main>
        <Description>
          <Name>Nike Pegasus Turbo Next Nature</Name>
          <Brand>Brand: Puma</Brand>
          <Price>$ 40.33</Price>
        </Description>
        <Carousel
          responsive={responsive}
          itemClass="carousel-item2"
          infinite={true}
          removeArrowOnDeviceType={["mobile"]}
          showDots={true}
        >
          <ImageDiv></ImageDiv>
        </Carousel>
        <Carousel
          responsive={responsive2}
          itemClass="carousel-item2"
          infinite={true}
          removeArrowOnDeviceType={["mobile"]}
        >
          <SmallImageDiv></SmallImageDiv>
          <SmallImageDiv></SmallImageDiv>
          <SmallImageDiv></SmallImageDiv>
          <SmallImageDiv></SmallImageDiv>
        </Carousel>
        <SizeDiv>
          <SizeHeader>Select Size</SizeHeader>
          <SizeListDiv>
            {(isShoesPage ? shoesOptions : clotheOptions).map((size) => (
              <SizeChoose
                key={size}
                onClick={() => handleSize(size)}
                className={redux.sizeType.includes(size) ? "selected" : ""}
              >
                {size}
              </SizeChoose>
            ))}
          </SizeListDiv>
          <AddToBag>Add to bag</AddToBag>
          <AddToFav>Add to favourite</AddToFav>
        </SizeDiv>
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
const ImageDiv = styled(Box)`
  width: 100%;
  height: 300px;
  background-image: url("/Capture.PNG");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const SmallImageDiv = styled(Box)`
  height: 100px;
  background-image: url("/Capture.PNG");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 5px 2px 2px 2px;
`;

const SizeDiv = styled(Box)`
  padding: 20px 25px 12px 25px;
`;
const SizeHeader = styled(Typography)`
  font-size: 20px;
`;

const SizeListDiv = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 18px;
  padding: 20px 0px 20px 0px;
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

const AddToBag = styled("button")`
  padding: 18px 24px 18px 24px;
  width: 100%;
  border-radius: 30px;
  border: none;
  background: #655a5a;
  color: white;
`;

const AddToFav = styled("button")`
  padding: 18px 24px 18px 24px;
  width: 100%;
  border-radius: 30px;
  border: 1px solid gray;
  background: white;
  color: black;
  margin-top: 15px;
`;
