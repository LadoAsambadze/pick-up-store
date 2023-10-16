import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/redux";
import axios from "axios";
import { setSentOrders } from "../store/active-order-slice";
import { getCookie } from "cookies-next";

export default function MySentOrders() {
  const dispatch = useDispatch();
  const sentOrders = useSelector((state: RootState) => state.orders.sentOrders);

  const removeOrder = async (user: any, item: any) => {
    const cookieToken = getCookie("token");
    try {
      await axios.delete("https://pick-up-store-backend-production.up.railway.app/admin/removesentorders", {
        data: { user, item },
        headers: {
          authorization: `Bearer ${cookieToken}`,
        },
      });
      const updatedSentOrders = sentOrders.map((order) => {
        if (order.user === user) {
          const updatedSentOrderItems = order.orderItems.filter(
            (itm) => itm !== item
          );
          return {
            ...order,
            orderItems: updatedSentOrderItems,
          };
        }
        return order;
      });
      dispatch(setSentOrders(updatedSentOrders));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <>
      <SentOrders>
        {sentOrders &&
          [...new Set(sentOrders.map((item) => item.user))].map((user) => (
            <User key={user}>
              user: {user}
              <UserDiv>
                {sentOrders &&
                  sentOrders
                    .filter((item) => item.user === user)
                    .map((order) =>
                      order.orderItems.map((item: any, index: any) => (
                        <ProductDiv key={index}>
                          <Remove
                            onClick={() => {
                              removeOrder(user, item);
                            }}
                          >
                            Remove
                          </Remove>
                          <ImageDiv>
                            <Image src={`https://pick-up-store-backend-production.up.railway.app${item.image}`} />
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
      </SentOrders>
    </>
  );
}

const SentOrders = styled(Box)`
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
  background: #b3afaf;
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

const Remove = styled("button")`
  background: red;
  padding: 5px;
  color: white;
  position: absolute;
  right: 0;
  top: 0;
`;
