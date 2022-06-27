import "./styles.css";
import Home from "./componants/Home";
import Header from "./componants/Header";
import CoinPage from "./componants/CoinPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coin/:id" element={<CoinPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
