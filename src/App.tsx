import Main from "./pages/main";
import { Routes, Route } from "react-router-dom";
import Section from "./pages/section";
import { Provider } from "react-redux";
import store from "./store/redux";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/section" element={<Section />} />
        </Routes>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
