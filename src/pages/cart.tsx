import { Box, Button, Typography, styled } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

interface Type {
  name: string;
  size: string;
  color: string;
  quantity: number;
  image: string;
  amount: number;
  price: number;
}

export default function Cart() {
  const [selectedProducts, setSelectedProducts] = useState<Type[]>([]);

  useEffect(() => {
    const getCart = async () => {
      const response = await axios.get(
        `https://pick-up-store-backend-production.up.railway.app/getCart`
      );
      setSelectedProducts(response.data.selectedItem);
    };
    getCart();
  }, []);

  return (
    <>
      <Main>
        {selectedProducts.map((item, index) => (
          <ProductDiv key={index}>
            <ImageDiv>
              <img
                style={{ maxWidth: "100%" }}
                src={`https://pick-up-store-backend-production.up.railway.app${item.image}`}
              />
            </ImageDiv>
            <DescriptionDiv>
              <Name>{item.name}</Name>
              <DescriptionSecondary>
                <Size>Size: {item.size}</Size>
                <Quantity>Avaliable: {item.quantity}</Quantity>
              </DescriptionSecondary>

              <DescriptionSecondary>
                <Price>${item.price}</Price>
                <AddQuantity>
                  <Minus src="/icon-minus.svg" />
                  <Quantity>{item.amount}</Quantity>
                  <Plus src="/icon-plus.svg" />
                </AddQuantity>
              </DescriptionSecondary>

              <DescriptionSecondary>
                <ControlIcon src="/heart.svg" />
                <ControlIcon src="/delete.png" />
                <Change variant="contained">Change</Change>
              </DescriptionSecondary>
            </DescriptionDiv>
          </ProductDiv>
        ))}
      </Main>
    </>
  );
}

const Main = styled(Box)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  background: #f8f8f8;
`;

const ProductDiv = styled(Box)`
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  background: var(--white, #fff);
  box-shadow: 0px 20px 35px 0px rgba(0, 0, 0, 0.05);
  padding: 20px;
  width: 100%;
  margin-bottom: 15px;
`;

const ImageDiv = styled(Box)`
  width: 50%;
  height: 100%;
  border-radius: 15px;
  background: var(--secondary, #eef1f4);
  background-position: center;
  background-size: cover;
  overflow: hidden;
`;

const DescriptionDiv = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 25px;
`;

const Name = styled(Typography)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 500;
  font-size: 16px;
  font-style: normal;
  line-height: 18px;
`;

const Price = styled(Typography)`
  font-size: 14px;
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 400;
  line-height: 15px;
`;

const Size = styled(Typography)`
  font-size: 14px;
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 400;
  line-height: 15px;
`;

const DescriptionSecondary = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-top: 25px;
`;

const ControlIcon = styled("img")`
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-right: 10px;
`;

const AddQuantity = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: var(--light-grayish-blue, #f4f5fd);
  padding: 5px 10px 5px 10px;
  border: none;
  color: black;
  border-radius: 10px;

  margin-left: 25px;
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
  font-weight: 500;
  color: #08213d;
  font-size: 14px;
  margin-left: 20px;
  margin-right: 20px;
`;

const Change = styled(Button)`
  font-size: 10px;
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 500;
  background: #ff7d1a;
  padding: 5px;
  margin-left: 10px;
`;
