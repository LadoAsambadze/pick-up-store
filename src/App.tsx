import Main from "./pages/main";
import { Routes, Route } from "react-router-dom";
import Clothes from "./pages/clothes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/redux";
import Header from "./components/header";
import Footer from "./components/footer";
import Shoes from "./pages/shoes";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/clothes" element={<Clothes />} />
            <Route path="/shoes" element={<Shoes />} />
          </Routes>
          <Footer />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
