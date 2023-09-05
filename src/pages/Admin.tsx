import { Box, styled } from "@mui/system";
import Orders from "../components/Orders";
import { useEffect } from "react";
import axios from "axios";

export default function Admin() {
  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get("http://localhost:3000/getorders");
      console.log(response);
    };
    getOrders();
  }, []);
  return (
    <>
      <Main>
        <List>
          <ListButton>Dashboard</ListButton>
          <ListButton>Orders</ListButton>
          <ListButton>Products</ListButton>
          <ListButton>Sent Orders</ListButton>
        </List>
        <Orders />
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
