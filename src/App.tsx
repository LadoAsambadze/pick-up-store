import Main from "./pages/main";
import { Routes, Route } from "react-router-dom";
import Clothes from "./pages/clothes";
import { Provider } from "react-redux";
import store from "./store/redux";
import Header from "./components/header";
import Footer from "./components/footer";
import Shoes from "./pages/shoes";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/shoes" element={<Shoes />} />
        </Routes>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
