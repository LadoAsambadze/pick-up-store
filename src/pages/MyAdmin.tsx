import { Box, styled } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import MySentOrders from "../components/MySentOrders";
import MyActiveOrders from "../components/MyActiveOrders";
import { useDispatch } from "react-redux";
import { setActiveOrders, setSentOrders } from "../store/active-order-slice";
import MyProducts from "../components/MyProducts";
import MyAddProducts from "../components/MyAddProducts";
// import MyDashboard from "../components/MyDashboard";
import { getCookie } from "cookies-next";

export default function Admin() {
  const dispatch = useDispatch();
  const [section, setSection] = useState("Dashboard");

  useEffect(() => {
    const cookieToken = getCookie("token");
    if (section === "Active Orders" || "Dashboard") {
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
    if (section === "Sent Orders" || "Dashboard") {
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
          <ListButton onClick={defineSection} value="Dashboard">
            Dashboard
          </ListButton>
          <ListButton onClick={defineSection} value="All Products">
            All Products
          </ListButton>
          <ListButton onClick={defineSection} value="Add Products">
            Add Products
          </ListButton>
          <ListButton onClick={defineSection} value="Active Orders">
            Active Orders
          </ListButton>
          <ListButton onClick={defineSection} value="Sent Orders">
            Sent Orders
          </ListButton>
        </List>
        {/* {section === "Dashboard" && <MyDashboard />} */}
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

// const Dashboard = styled(Box)`
//   width: 100%;
//   height: 100%;
//   background: blue;
// `;

// const AddProduct = styled(Box)`
//   width: 100%;
//   height: 100%;
// `;

// const RemoveProduct = styled(Box)`
//   width: 100%;
//   height: 100%;
//   background: red;
// `;
