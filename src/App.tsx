import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { RegisterPage } from "./pages/Auth/ui/RegisterPage";
import { OtpPage } from "@/pages/Auth/ui/OtpPage";
import { TranslatePage } from "@/pages/Translate/ui/TranslatePage";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });
function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/translate" element={<TranslatePage />} />
          <Route path="/" element={<Navigate to="/register" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
