import "./App.css";
import Chart from "./components/Chart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Offers from "./components/Offers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chart />} />
        <Route path="/offers" element={<Offers />} />
      </Routes>
    </Router>
  );
}

export default App;
