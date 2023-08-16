import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Offers from "./components/Offers";
import Chart from "./components/Chart";
import Navbar from "./components/Navbar";
import ComplaintAnalysis from "./pages/ComplaintAnalysis";
import Predictions from "./pages/Predictions";
import SoftwareUpdate from "./pages/SoftwareUpdate";

import "./assets/index.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Chart />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/complaints-analysis" element={<ComplaintAnalysis />} />
          <Route path="/software-update" element={<SoftwareUpdate />} />
          <Route path="/predictions" element={<Predictions />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
