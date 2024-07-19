import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "./Components/Layout/Header";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import TestPage from "./pages/TestPage";
import Dresses from "./pages/Dresses/Dresses";
import Shoes from "./pages/Shoes/Shoes";
import Accessories from "./pages/Accessories/Accessories";
import ProductDetail from "./Components/ProductDetail";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dresses" element={<Dresses />}></Route>
        <Route path="/shoes" element={<Shoes />}></Route>
        <Route path="/accessories" element={<Accessories />}></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
        <Route path="/test" element={<TestPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
