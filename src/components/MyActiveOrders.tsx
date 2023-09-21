import { Box, Typography, styled } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/redux";
import { setActiveOrders } from "../store/active-order-slice";

export default function MyActiveOrders() {
  const dispatch = useDispatch();
  const activeOrders = useSelector(
    (state: RootState) => state.orders.activeOrders
  );


  const sentOrder = async (user: string, orderItem: object) => {
    const cookieToken = getCookie("token");
    const sentItem = {
      user: user,
      orderItems: [orderItem],
    };
    if (sentItem.user && sentItem.orderItems) {
      await axios.post("http://localhost:3000/sentorders", sentItem, {
        headers: {
          authorization: `Bearer ${cookieToken}`,
        },
      });
      const updatedOrders = activeOrders.map((order) => {
        if (order.user === user) {
          const updatedOrderItems = order.orderItems.filter(
            (item) => item !== orderItem
          );
          return {
            ...order,
            orderItems: updatedOrderItems,
          };
        }
        return order;
      });
      dispatch(setActiveOrders(updatedOrders));
    }
  };
  return (
    <>
      <ActiveOrders>
        {activeOrders &&
          [...new Set(activeOrders.map((item) => item.user))].map((user) => (
            <User key={user}>
              user: {user}
              <UserDiv>
                {activeOrders &&
                  activeOrders
                    .filter((item) => item.user === user)
                    .map((order) =>
                      order.orderItems.map((item, index) => (
                        <ProductDiv key={index}>
                          <MoveToSent
                            onClick={() => {
                              sentOrder(user, item);
                            }}
                          >
                            Move To Sent
                          </MoveToSent>
                          <ImageDiv>
                            <Image src={`http://localhost:3000${item.image}`} />
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
                                Full Name: {item.fullName}
                              </ShippingItem>
                              <ShippingItem>City: {item.city}</ShippingItem>
                              <ShippingItem>
                                Adress: {item.address}
                              </ShippingItem>
                              <ShippingItem>
                                Phone: {item.phoneNumber}
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
    </>
  );
}

const ActiveOrders = styled(Box)`
  width: 100%;
  height: 100%;
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
