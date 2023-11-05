import Main from "./pages/MyMain";
import { Routes, Route, Navigate } from "react-router-dom";
import Clothes from "./pages/MyClothes";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/MyHeader";
import Footer from "./components/MyFooter";
import Shoes from "./pages/MyShoes";
import Selected from "./pages/MySelected";
import { useEffect, useState } from "react";
import axios from "axios";
import { setData } from "./store/data-slice";
import { setLoading } from "./store/loading-slice";
import Cart from "./pages/MyCart";
import Login from "./pages/MyLogin";
import Signup from "./pages/MySignUp";
import Favourites from "./pages/MyFavourites";
import Admin from "./pages/MyAdmin";
import FilterComponent from "./components/MyFilter";
import { Box, styled } from "@mui/material";
import { RootState } from "./store/redux";
import MyNewArrivals from "./pages/MyNewArrivals";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

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

  const reduxFilter = useSelector((state: RootState) => state.filter.filter);
  const [slide, setSlide] = useState(reduxFilter);

  useEffect(() => {
    setSlide(reduxFilter);
  }, [reduxFilter]);
  return (
    <>
      <Wrapper
        style={{
          transform: slide ? "translateX(0%)" : "translateX(-100%)",
        }}
      >
        <FilterComponent />
      </Wrapper>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/shoes/:id" element={<Selected />} />
        <Route path="/clothes/:id" element={<Selected />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Favourites" element={<Favourites />} />
        <Route
          path="/Admin"
          element={user.userinfo?.isAdmin ? <Admin /> : <Navigate to="/" />}
        />
        <Route path="/NewArrivals" element={<MyNewArrivals />} />
      </Routes>
      <Footer />
    </>
  );
}

const Wrapper = styled(Box)`
  transition: transform 0.5s ease-in-out;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2000;
`;

export default App;
