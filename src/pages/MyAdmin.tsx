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

  console.log(section);

  return (
    <>
      <Main>
        <List>
          <ListButton onClick={defineSection} value="Dashboard">
            Dashboard
          </ListButton>

          <ListButton onClick={defineSection} value="Add Product">
            Products
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
        {/* <div>
          {orders &&
            [...new Set(orders.map((item) => item.user))].map((user) => (
              <div key={user}>
                <div>
                  User: {user}
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
                                <Quantity>{order.createdAt}</Quantity>
                              </DescriptionSecondary>
                            </DescriptionDiv>
                          </ProductDiv>
                        ))
                      )}
                </div>
              </div>
            ))}
        </div> */}
      </Main>
    </>
  );
}

const Main = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: white;
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
  padding: 20px 20px 20px 20px;
  @media (min-width: 768px) {
    flex-direction: column;
  }
`;

const ListButton = styled("button")`
  cursor: pointer;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-family: "Ysabeau Office", sans-serif;
  font-size: 12px;
  background: white;
  margin-right: 10px;
  @media (min-width: 768px) {
    margin-bottom: 20px;
    width: 130px;
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
  height: 200px;
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

const Quantity = styled(Box)`
  font-family: "Kumbh Sans", sans-serif;
  font-weight: 500;
  color: #08213d;
  font-size: 14px;
  margin-left: 20px;
  margin-right: 20px;
`;

const Image = styled("img")`
  width: 200px;
  height: 200px;
`;
