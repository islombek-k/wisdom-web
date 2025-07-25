import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { RegisterPage } from "./pages/Auth/ui/RegisterPage";
import { OtpPage } from "./pages/Auth/ui/OtpPage";
import { TranslatePage } from "./pages/Translate/ui/TranslatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/translate" element={<TranslatePage />} />
        <Route path="/" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
