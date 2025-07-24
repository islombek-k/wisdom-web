import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { RegisterPage } from "./pages/Register/ui/RegisterPage";
import { OtpPage } from "./pages/Register/ui/OtpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
