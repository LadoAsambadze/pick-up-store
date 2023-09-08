import Main from "./pages/Main";
import { Routes, Route } from "react-router-dom";
import Clothes from "./pages/Clothes";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Shoes from "./pages/Shoes";
import Selected from "./pages/Selected";
import { useEffect } from "react";
import axios from "axios";
import { setData } from "./store/data-slice";
import { setLoading } from "./store/loading-slice";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import Favourites from "./pages/Favourites";
import Admin from "./pages/Admin";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAll = await axios.get("http://localhost:3000/api/users");
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
        <Route path="/Signup" element={<Singup />} />
        <Route path="/Favourites" element={<Favourites />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
