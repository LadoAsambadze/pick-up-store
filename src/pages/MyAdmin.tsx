import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { getCookie } from "cookies-next";
interface Type {
  user: string;
  orderItems: {
    name: string;
    size: string;
    amount: string | number;
    price: number;
    image: string;
    purchase_id: string;
  }[];
  shippingDetails: {
    fullName: string;
    city: string;
    address: string;
    phoneNumber: number;
  };
  createdAt: string;
}
export default function Admin() {
  const [orders, setOrders] = useState<Type[]>([]);
  const [section, setSection] = useState("Dashboard");
  const [userId, setUserId] = useState(null);
  const [choosedItems, setChoosedItems] = useState([]);
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
  const sentItem = {
    user: userId,
    orderItems: [
      {
        image: "imageURL",
        size: "Medium",
        color: "Blue",
        name: "Item1",
        price: "20",
        amount: 2,
        purchase_id: "12345",
        own_id: "67890",
        fullName: "ladoDoe",
        city: "New York",
        address: "123 Main St",
        phoneNumber: "123-456-7890",
      },
    ],
  };
  const sentOrder = async () => {
    const cookieToken = getCookie("token");
    if (sentItem.user && sentItem.orderItems) {
      const response = await axios.post(
        "http://localhost:3000/sentorders",
        sentItem,
        {
          headers: {
            authorization: `Bearer ${cookieToken}`,
          },
        }
      );
      console.log(response);
    }
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
                              <MoveToSent
                                onClick={() => {
                                  sentOrder();
                                  setUserId(user);
                                  
                                }}
                              >
                                Move To Sent
                              </MoveToSent>
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
                                    Order Time: {order.createdAt}
                                  </ShippingItem>
                                  <ShippingItem>
                                    Purchase: {item.purchase_id}
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
        {section === "Sent Orders" && <SentOrders></SentOrders>}
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
  gap: 20px;
  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const User = styled(Box)`
  width: 100%;
  height: 100%;
  background: green;
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
  position: relative;
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

const MoveToSent = styled("button")`
  background: red;
  padding: 5px;
  color: white;
  position: absolute;
  right: 0;
  top: 0;
`;
