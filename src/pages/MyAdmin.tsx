import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [section, setSection] = useState("Dashboard");
  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get("http://localhost:3000/getorders");
      setOrders(response.data.orders);
    };
    getOrders();
  }, []);

  const defineSection = (event: any) => {
    setSection(event.target.value);
  };

  return (
    <>
      <Main>
        <List>
          <ListButton onClick={defineSection} value="Dashboard">
            Dashboard
          </ListButton>
          <ListButton onClick={defineSection} value="Add Product">
            Add Products
          </ListButton>
          <ListButton onClick={defineSection} value="Remove Product">
            Products
          </ListButton>
          <ListButton onClick={defineSection} value="Active Orders">
            Active Orders
          </ListButton>
          <ListButton onClick={defineSection} value="Sent Orders">
            Sent Orders
          </ListButton>
        </List>
        {section === "Dashboard" && <Dashboard></Dashboard>}
        {section === "Add Product" && <AddProduct></AddProduct>}
        {section === "Remove Product" && <RemoveProduct></RemoveProduct>}
        {section === "Active Orders" && (
          <ActiveOrders>
            {orders &&
              [...new Set(orders.map((item) => item.user))].map((user) => (
                <User key={user}>
                  user: {user}
                  <UserDiv>
                    {orders &&
                      orders
                        .filter((item) => item.user === user)
                        .map((order) =>
                          order.orderItems.map((item, index) => (
                            <ProductDiv key={index}>
                              <ImageDiv>
                                <Image
                                  src={`http://localhost:3000${item.image}`}
                                />
                              </ImageDiv>
                              <DescriptionDiv>
                                <Name>{item.name}</Name>
                                <ProductDetails>
                                  <DescriptionItem>
                                    Size: {item.size}
                                  </DescriptionItem>
                                  <DescriptionItem>
                                    Amount: {item.amount}
                                  </DescriptionItem>
                                  <DescriptionItem>
                                    Price: {item.price}
                                  </DescriptionItem>
                                </ProductDetails>
                                <ShippingDetails>
                                  <ShippingItem>
                                    Full Name: {order.shippingDetails.fullName}
                                  </ShippingItem>
                                  <ShippingItem>
                                    City: {order.shippingDetails.city}
                                  </ShippingItem>
                                  <ShippingItem>
                                    Adress: {order.shippingDetails.address}
                                  </ShippingItem>
                                  <ShippingItem>
                                    Phone: {order.shippingDetails.phoneNumber}
                                  </ShippingItem>
                                  <ShippingItem>
                                    Time: {order.createdAt}
                                  </ShippingItem>
                                </ShippingDetails>
                              </DescriptionDiv>
                            </ProductDiv>
                          ))
                        )}
                  </UserDiv>
                </User>
              ))}
          </ActiveOrders>
        )}
      </Main>
    </>
  );
}

const Main = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const List = styled(Box)`
  background: gray;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 5px 20px 5px;

  @media (min-width: 768px) {
    flex-direction: column;
  }
`;

const ListButton = styled("button")`
  cursor: pointer;
  border: none;
  padding: 5px;
  border-radius: 5px;
  font-family: "Ysabeau Office", sans-serif;
  font-size: 10px;
  background: white;
  margin-right: 10px;
  @media (min-width: 768px) {
    margin-bottom: 20px;
    width: 130px;
  }
`;

const Dashboard = styled(Box)`
  width: 100%;
  height: 100%;
  background: blue;
`;

const AddProduct = styled(Box)`
  width: 100%;
  height: 100%;
`;

const RemoveProduct = styled(Box)`
  width: 100%;
  height: 100%;
  background: red;
`;

const ActiveOrders = styled(Box)`
  width: 100%;
  height: 100%;
`;

const SentOrders = styled(Box)`
  width: 100%;
  height: 100%;
  background: orange;
`;

const UserDiv = styled(Box)`
  width: 100%;
  height: 100%;

  padding: 10px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const User = styled(Box)`
  width: 100%;
  height: 100%;
  background: green;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const ProductDiv = styled(Box)`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background: var(--white, #fff);
  box-shadow: 0px 20px 35px 0px rgba(0, 0, 0, 0.05);
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const ImageDiv = styled(Box)`
  width: 30%;
  height: 100%;
  border-radius: 15px;
  background: var(--secondary, #eef1f4);
  background-position: center;
  background-size: cover;
  overflow: hidden;
`;

const Image = styled("img")`
  max-width: 100%;
`;

const DescriptionDiv = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-left: 10px;
`;

const Name = styled(Typography)`
  font-family: "Ysabeau Office", sans-serif;
  font-weight: 300;
  font-size: 16px;
  font-style: normal;
`;

const DescriptionItem = styled(Typography)`
  font-size: 14px;
  font-family: "Ysabeau Office", sans-serif;
  font-weight: 300;
  margin-right: 5px;
`;

const ProductDetails = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;
const ShippingDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ShippingItem = styled(Typography)`
  font-size: 14px;
  font-family: "Ysabeau Office", sans-serif;
  font-weight: 400;
  line-height: 15px;
`;
