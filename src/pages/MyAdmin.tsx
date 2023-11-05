import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import MySentOrders from "../components/MySentOrders";
import MyActiveOrders from "../components/MyActiveOrders";
import { useDispatch } from "react-redux";
import { setActiveOrders, setSentOrders } from "../store/active-order-slice";
import MyProducts from "../components/MyProducts";
import MyAddProducts from "../components/MyAddProducts";
import { getCookie } from "cookies-next";

export default function Admin() {
  const dispatch = useDispatch();
  const [section, setSection] = useState("Page Statistic");

  useEffect(() => {
    const cookieToken = getCookie("token");
    if (section === "Active Orders" || "Page Statistic") {
      const getOrders = async () => {
        try {
          const response = await axios.get(
            "https://pick-up-store-backend-production.up.railway.app/admin/getorders",
            {
              headers: {
                authorization: `Bearer ${cookieToken}`,
              },
            }
          );
          dispatch(setActiveOrders(response.data.orders));
        } catch (error) {
          console.error(error);
        }
      };
      getOrders();
    }
    if (section === "Sent Orders" || "Page Statistic") {
      const getSentOrders = async () => {
        const response = await axios.get(
          "https://pick-up-store-backend-production.up.railway.app/admin/getsentorders",
          {
            headers: {
              authorization: `Bearer ${cookieToken}`,
            },
          }
        );
        dispatch(setSentOrders(response.data.orders));
      };
      getSentOrders();
    }
  }, [section]);

  const defineSection = (event: any) => {
    setSection(event.target.value);
  };

  return (
    <>
      <Main>
        <List>
          <ListButton
            onClick={defineSection}
            value="Page Statistic"
            style={{ background: section === "Page Statistic" ? "green" : "" }}
          >
            Page Statistic
          </ListButton>
          <ListButton
            onClick={defineSection}
            style={{ background: section === "All Products" ? "green" : "" }}
            value="All Products"
          >
            All Products
          </ListButton>
          <ListButton
            onClick={defineSection}
            style={{ background: section === "Add Products" ? "green" : "" }}
            value="Add Products"
          >
            Add Products
          </ListButton>
          <ListButton
            onClick={defineSection}
            style={{ background: section === "Active Orders" ? "green" : "" }}
            value="Active Orders"
          >
            Active Orders
          </ListButton>
          <ListButton
            onClick={defineSection}
            style={{ background: section === "Sent Orders" ? "green" : "" }}
            value="Sent Orders"
          >
            Sent Orders
          </ListButton>
        </List>
        {/* {section === "Page Statistic" && <MyPage Statistic />} */}
        {section === "All Products" && <MyProducts />}
        {section === "Add Products" && <MyAddProducts />}
        {section === "Active Orders" && <MyActiveOrders />}
        {section === "Sent Orders" && <MySentOrders />}
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
