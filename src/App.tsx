import Main from "./pages/main";
import { Routes, Route } from "react-router-dom";
import Clothes from "./pages/clothes";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/header";
import Footer from "./components/footer";
import Shoes from "./pages/shoes";
import Selected from "./pages/selected";
import { useEffect } from "react";
import axios from "axios";
import { setData } from "./store/data-slice";
import { setLoading } from "./store/loading-slice";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Singup from "./pages/singup";
import { getCookie } from "cookies-next";
import { setUser } from "./store/user-slice";
import { RootState } from "./store/redux";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.username);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAll = await axios.get("http://localhost:3000/all");
        dispatch(setData(getAll.data.products));
        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(setLoading(true));
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/shoes/:id" element={<Selected />} />
        <Route path="/clothes/:id" element={<Selected />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Singup" element={<Singup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
