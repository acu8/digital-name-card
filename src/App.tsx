import { Routes, Route } from "react-router-dom";
import CardPage from "./components/CardPage";
import Home from "./components/Home";
import RegisterPage from "./components/RegisterPage";
import SearchPage from "./components/SearchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cards/:user_id" element={<CardPage />} />
      <Route path="/cards/register" element={<RegisterPage />} />
      <Route path="/cards/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
