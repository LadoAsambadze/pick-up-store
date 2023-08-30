import { Box, Button, Typography, styled } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux";

interface Type {
  product_id: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  image: string;
  amount: number;
  price: number;
  purchase_id: string;
}
interface User {
  id: string;
}

export default function Cart() {
  const [selectedProducts, setSelectedProducts] = useState<Type[]>([]);
  const user = useSelector(
    (state: RootState) => state.user.userinfo
  ) as User | null;
  const user_id = user ? user.id : null;
  useEffect(() => {
    if (user) {
      // access user properties here

      const getCart = async () => {
        const { data } = await axios.get(
          `http://localhost:3000/getCart?userId=${user.id}`
        );
        const order = data.selectedItem;
        setSelectedProducts(order.flatMap((item: any) => item.orderItems));
      };
      getCart();
    }
  }, []);

  const updateAmount = async (purchase_id: string, new_amount: number) => {
    try {
      await axios.put(`http://localhost:3000/updateCart/${purchase_id}`, {
        new_amount,
        user_id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (purchase_id: string) => {
    try {
      await axios.delete(`http://localhost:3000/deleteProduct/${purchase_id}`, {
        data: { user_id },
      });

      setSelectedProducts(
        selectedProducts.filter(
          (product) => product.purchase_id !== purchase_id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  let totalPrice = 0;
  selectedProducts.forEach((product) => {
    totalPrice += product.price * product.amount;
  });
  let shipping = 0;

  shipping = selectedProducts.length * 3;

  return (
    <>
      <Main>
        <FirstDiv>
          {selectedProducts.map((item, index) => (
            <ProductDiv key={index}>
              <ImageDiv>
                <img
                  style={{ maxWidth: "100%" }}
                  src={`http://localhost:3000${item.image}`}
                />
              </ImageDiv>
              <DescriptionDiv>
                <Name>{item.name}</Name>
                <DescriptionSecondary>
                  <Size>Size: {item.size}</Size>
                  <Quantity>Avaliable: {item.quantity}</Quantity>
                </DescriptionSecondary>

                <DescriptionSecondary>
                  <Price>${item.price * item.amount}</Price>
                  <AddQuantity>
                    <Minus
                      onClick={async () => {
                        const newAmount = item.amount - 1;
                        if (newAmount >= 0) {
                          await updateAmount(item.purchase_id, newAmount);
                          setSelectedProducts(
                            selectedProducts.map((product) =>
                              product.purchase_id === item.purchase_id &&
                              product.amount > 0
                                ? { ...product, amount: newAmount }
                                : product
                            )
                          );
                        }
                      }}
                      src="/icon-minus.svg"
                    />

                    <Quantity>{item.amount}</Quantity>
                    <Plus
                      onClick={async () => {
                        const newAmount = item.amount + 1;
                        if (newAmount <= item.quantity) {
                          await updateAmount(item.purchase_id, newAmount);
                          setSelectedProducts(
                            selectedProducts.map((product) =>
                              product.purchase_id === item.purchase_id &&
                              product.amount < product.quantity
                                ? { ...product, amount: newAmount }
                                : product
                            )
                          );
                        }
                      }}
                      src="/icon-plus.svg"
                    />
                  </AddQuantity>
                </DescriptionSecondary>

                <DescriptionSecondary>
                  <ControlIcon src="/heart.svg" />
                  <ControlIcon
                    src="/delete.png"
                    onClick={() => {
                      deleteProduct(item.purchase_id);
                      console.log(item.purchase_id);
                    }}
                  />
                  <Change variant="contained">Change</Change>
                </DescriptionSecondary>
              </DescriptionDiv>
            </ProductDiv>
          ))}
        </FirstDiv>
        <SecondDiv
          style={{
            display: selectedProducts.length > 0 ? "block" : "none",
          }}
        >
          <PaymentHeader> Payment details</PaymentHeader>
          <TotaltDiv>
            <ItemDiv>
              <Items>Items ({selectedProducts.length})</Items>
              <PriceX>${totalPrice}</PriceX>
            </ItemDiv>
            <ItemDiv>
              <Items>Shipping</Items>
              <PriceX>${shipping}</PriceX>
            </ItemDiv>
            <ItemDiv>
              <Items>Total Price</Items>
              <PriceX>${totalPrice + shipping}</PriceX>
            </ItemDiv>
          </TotaltDiv>
        </SecondDiv>
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
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding-left: 80px;
    padding-right: 80px;
  }
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

const PaymentHeader = styled(Typography)`
  font-size: 25px;
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 500;
  text-align: left;
  width: 100%;
  margin-left: 20px;
`;
const TotaltDiv = styled(Box)`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background: var(--white, #fff);
  box-shadow: 0px 20px 35px 0px rgba(0, 0, 0, 0.05);
  padding: 20px;
  width: 100%;
  margin-bottom: 15px;
`;

const ItemDiv = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Items = styled(Typography)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 500;
  color: #08213d;
  font-size: 14px;
`;

const PriceX = styled(Typography)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 500;
  color: #08213d;
  font-size: 14px;
`;

const FirstDiv = styled(Box)`
  width: 100%;
  @media (min-width: 768px) {
    width: 60%;
  }
`;

const SecondDiv = styled(Box)`
  width: 90%;

  @media (min-width: 768px) {
    width: 35%;
  }
`;
