import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IntroPython from "./pages/IntroPython";
import AdvancedJavaScript from "./pages/AdvancedJavaScript";
import MachineLearning from "./pages/MachineLearning";
import DataScience from "./pages/DataScience";
import SignIn from "./pages/SignIn"; // เพิ่มการนำเข้า SignIn
import SignUp from "./pages/SignUp"; // เพิ่มการนำเข้า SignUp

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/introPython/:id" element={<IntroPython />} />
      <Route path="/AdvancedJavaScript/:id" element={<AdvancedJavaScript />} />
      <Route path="/MachineLearning/:id" element={<MachineLearning />} />
      <Route path="/DataScience/:id" element={<DataScience />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
