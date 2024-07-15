import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "./Components/Layout/Header";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/test" element={<TestPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
