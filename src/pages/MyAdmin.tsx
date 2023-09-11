import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get("http://localhost:3000/getorders");
      setOrders(response.data.orders);
    };
    getOrders();
  }, []);
  console.log(orders);
  return (
    <>
      <Main>
        <List>
          <ListButton>Dashboard</ListButton>
          <ListButton>Orders</ListButton>
          <ListButton>Products</ListButton>
          <ListButton>Sent Orders</ListButton>
        </List>
        <div>
          {orders &&
            [...new Set(orders.map((item) => item.user))].map((user) => (
              <div key={user}>
                <div>
                  {user}:
                  {orders &&
                    orders
                      .filter((item) => item.user === user)
                      .map((order, index) =>
                        order.orderItems.map((item, index) => (
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
                                <Size>{item.size}</Size>
                                <Quantity>{item.amount}</Quantity>
                                <Price>{item.price}</Price>
                              </DescriptionSecondary>
                              <DescriptionSecondary>
                                <Size>{order.shippingDetails.fullName}</Size>
                                <Quantity>
                                  {order.shippingDetails.address}
                                </Quantity>
                              </DescriptionSecondary>
                            </DescriptionDiv>
                          </ProductDiv>
                        ))
                      )}
                </div>
              </div>
            ))}
        </div>
      </Main>
    </>
  );
}

const Main = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100vh;
`;

const List = styled(Box)`
  width: 20%;
  height: 100vh;
  background: gray;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 50px 20px 50px;
`;

const ListButton = styled("button")`
  cursor: pointer;
  margin-bottom: 20px;
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
