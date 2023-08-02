import Main from "./pages/main";
import { Routes, Route } from "react-router-dom";
import Section from "./pages/section";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/section" element={<Section />} />
      </Routes>
    </>
  );
}

export default App;
