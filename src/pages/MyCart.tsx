import { Box, CircularProgress, Typography, styled } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/redux";
import { getCookie } from "cookies-next";
import { setData } from "../store/data-slice";
import { setLoading } from "../store/loading-slice";

interface Type {
  name: string;
  size: string;
  color: string;
  quantity: number;
  image: string;
  amount: number;
  price: number;
  purchase_id: string;
  own_id: string;
}
interface User {
  id: string;
  user: string;
}

export default function Cart() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAll = await axios.get(
          "https://pick-up-store-backend-production.up.railway.app/api/users"
        );
        dispatch(setData(getAll.data.products));
        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(setLoading(true));
      }
    };

    fetchData();
  }, []);

  const allData = useSelector((state: RootState) => state.data.data);
  const arrays = allData.map((item) => item.itemList);
  const [load, setLoad] = useState(true);

  type Item = {
    own_id: string;
    color: string;
    urls: string[];
    size: {
      size: string;
      quantityt: number;
      [key: string]: string | number;
    };
  };

  const obj: Item[] = arrays.flat();
  const [selectedProducts, setSelectedProducts] = useState<Type[]>([]);
  const [stepone, setStepOne] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [check, setCheck] = useState(false);
  const user = useSelector(
    (state: RootState) => state.user.userinfo
  ) as User | null;
  const user_id = user ? user.user : null;
  useEffect(() => {
    const cookieToken = getCookie("token");
    if (user) {
      const getCart = async () => {
        const { data } = await axios.get(
          `https://pick-up-store-backend-production.up.railway.app/order/getCart?userId=${user.user}`,
          {
            headers: {
              authorization: `Bearer ${cookieToken}`,
            },
          }
        );
        const order = data.selectedItem;
        setSelectedProducts(order.flatMap((item: any) => item.orderItems));
      };
      getCart();
    }
  }, []);

  const updateAmount = async (purchase_id: string, new_amount: number) => {
    const cookieToken = getCookie("token");
    try {
      await axios.put(
        `https://pick-up-store-backend-production.up.railway.app/order/updateCart/${purchase_id}`,
        {
          new_amount,
          user_id,
        },
        {
          headers: {
            authorization: `Bearer ${cookieToken}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (purchase_id: string) => {
    const cookieToken = getCookie("token");

    try {
      await axios.delete(
        `https://pick-up-store-backend-production.up.railway.app/order/deleteProduct/${purchase_id}`,
        {
          data: { user_id },
          headers: {
            authorization: `Bearer ${cookieToken}`,
          },
        }
      );

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

  const orderData = {
    user: user_id,
    items: selectedProducts,
  };

  const makeOrder = async () => {
    const cookieToken = getCookie("token");

    try {
      const response = await axios.post(
        "https://pick-up-store-backend-production.up.railway.app/orderprocess/makeorder",
        orderData,
        {
          headers: {
            authorization: `Bearer ${cookieToken}`,
          },
        }
      );
      console.log("Order successful!", response.data);

      window.location.reload();
    } catch (error) {
      console.error("Error making the order:", error);
      alert("Please remove no avaliable products to make order");
      window.location.reload();
    }
  };

  const submit = async (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isPaid) {
      makeOrder();
    }
  }, [isPaid]);

  useEffect(() => {
    if (selectedProducts.length > 0) setLoad(false);
  }, [selectedProducts]);

  return (
    <>
      {load ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : selectedProducts.length === 0 ? (
        <EmptyBoxDiv>
          <EmptyText>No items added in cart</EmptyText>
          <BoxImage src="/empty-cart.png" />
        </EmptyBoxDiv>
      ) : (
        <Main>
          <FirstDiv>
            {selectedProducts.map((item, index) => (
              <ProductDiv key={index}>
                <ImageDiv>
                  <img
                    style={{ maxWidth: "100%" }}
                    src={`https://pick-up-store-backend-production.up.railway.app${item.image}`}
                    alt={item.name}
                  />
                </ImageDiv>
                <DescriptionDiv>
                  {obj
                    .filter((example) => example.own_id === item.own_id)
                    .map((filteredItem) => (
                      <Name
                        key={filteredItem.own_id}
                        style={{
                          textDecoration:
                            filteredItem.size[item.size] === 0
                              ? "line-through"
                              : "none",
                        }}
                      >
                        {item.name}
                      </Name>
                    ))}
                  <DescriptionSecondary>
                    <Size
                      style={{
                        textDecoration:
                          item.quantity > 0 ? "none" : "line-through",
                      }}
                    >
                      Size: {item.size}
                    </Size>

                    {obj
                      .filter((example) => example.own_id === item.own_id)
                      .map((filteredItem) => (
                        <Quantity key={filteredItem.own_id}>
                          Avaliable: {filteredItem.size[item.size]}
                        </Quantity>
                      ))}

                    {obj
                      .filter((example) => example.own_id === item.own_id)
                      .map((filteredItem) => (
                        <Warn key={filteredItem.own_id}>
                          {filteredItem.size[item.size] === 0
                            ? "OUT OF STOCK !!!"
                            : null}
                        </Warn>
                      ))}
                  </DescriptionSecondary>
                  <DescriptionSecondary>
                    <Price
                      style={{
                        textDecoration: item.quantity > 0 ? "" : "line-through",
                      }}
                    >
                      ${item.price * item.amount}
                    </Price>
                    <AddQuantity>
                      <Minus
                        onClick={async () => {
                          const newAmount = item.amount - 1;
                          if (newAmount >= 1) {
                            await updateAmount(item.purchase_id, newAmount);
                            setSelectedProducts((selectedProducts) =>
                              selectedProducts.map((product) =>
                                product.purchase_id === item.purchase_id &&
                                product.amount > 0
                                  ? {
                                      ...product,

                                      amount: newAmount,
                                    }
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
                            setSelectedProducts((selectedProducts) =>
                              selectedProducts.map((product) =>
                                product.purchase_id === item.purchase_id &&
                                product.quantity
                                  ? {
                                      ...product,
                                      amount: newAmount,
                                    }
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
                      }}
                    />
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
            <PaymentHeader>Payment details</PaymentHeader>
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
            <div
              style={{ background: "gray", width: "100%" }}
              onClick={() => {
                setCheck(!check);
              }}
            >
              Check out
            </div>
            <form
              onSubmit={submit}
              style={{
                display: check ? "flex" : "none",
                flexDirection: "column",
              }}
            >
              <label>Full name</label>
              <input
                onChange={(e) => {
                  const newFullName = e.target.value;
                  setSelectedProducts(
                    selectedProducts.map((product) => ({
                      ...product,
                      fullName: newFullName,
                    }))
                  );
                }}
                type="text"
                disabled={stepone}
              />
              <label>City</label>
              <input
                onChange={(e) => {
                  const newCity = e.target.value;
                  setSelectedProducts(
                    selectedProducts.map((product) => ({
                      ...product,
                      city: newCity,
                    }))
                  );
                }}
                type="text"
                disabled={stepone}
              />
              <label>Address</label>
              <input
                onChange={(e) => {
                  const newAddress = e.target.value;
                  setSelectedProducts(
                    selectedProducts.map((product) => ({
                      ...product,
                      address: newAddress,
                    }))
                  );
                }}
                type="text"
                disabled={stepone}
              />
              <label>Phone number</label>
              <input
                onChange={(e) => {
                  const newPhoneNumber = e.target.value;
                  setSelectedProducts(
                    selectedProducts.map((product) => ({
                      ...product,
                      phoneNumber: newPhoneNumber,
                    }))
                  );
                }}
                type="text"
                disabled={stepone}
              />

              <button
                style={{ background: stepone ? "Green" : "gray" }}
                type="submit"
                onClick={() => {
                  setStepOne(!stepone);
                }}
              >
                {stepone ? "Change" : "Submit"}
              </button>
            </form>

            <div style={{ display: stepone ? "block" : "none" }}>
              <h1>make payment</h1>
              <button
                onClick={() => {
                  setIsPaid(true);
                }}
              >
                Yes
              </button>
            </div>
          </SecondDiv>
        </Main>
      )}
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

const Warn = styled(Box)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 700;
  color: #ff0404;
  font-size: 14px;
  margin-left: 20px;
  margin-right: 20px;
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

const EmptyBoxDiv = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

const BoxImage = styled("img")`
  width: 80px;
  height: 80px;
  margin-left: 20px;
  @media (min-width: 768px) {
    width: 100px;
    height: 100px;
    margin-left: 40px;
  }
`;

const EmptyText = styled(Typography)`
  color: #9c1801;
  font-size: 20px;
  font-family: "Ysabeau Office", sans-serif;
  font-weight: 400;
  @media (min-width: 768px) {
    font-size: 30px;
  }
`;
