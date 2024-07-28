import { Routes, Route } from "react-router-dom";
import CardPage from "./components/CardPage";
import Home from "./components/Home";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cards/:user_id" element={<CardPage />} />
      <Route path="/cards/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
