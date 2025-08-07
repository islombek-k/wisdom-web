import { BrowserRouter, Routes, Route } from "react-router";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { RegisterPage } from "./pages/auth/ui/RegisterPage";
import { OtpPage } from "@/pages/auth/ui/OtpPage";
import { TranslatePage } from "@/pages/translate/ui/TranslatePage";
import { registerSW } from "virtual:pwa-register";
import HomePage from "./pages/home/ui/HomePage";

registerSW({ immediate: true });
function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/translate" element={<TranslatePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
