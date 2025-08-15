import { BrowserRouter, Routes, Route } from "react-router";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { RegisterPage } from "./pages/auth/ui/RegisterPage";
import { OtpPage } from "@/pages/auth/ui/OtpPage";
import { TranslatePage } from "@/pages/translate/ui/TranslatePage";
import { registerSW } from "virtual:pwa-register";
import HomePage from "@/pages/home/ui/HomePage";
import Grammar from "@/pages/grammar/Grammar";
import GrammarAndCollocationInner from "@/pages/grammar-inner/GrammarInner";
import Collocation from "@/pages/collocation/Collocation";
import CollocationInner from "@/pages/collocation-inner/CollocationInner";
import News from "@/pages/news/News";
import NewsDetails from "@/pages/news/NewsDetails";
import AboutUs from "@/pages/about-us/AboutUs";
import WisdomPro from "@/pages/wisdom-pro/WisdomPro";

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
          <Route path="/grammar" element={<Grammar />} />
          <Route path="/grammar/:id" element={<GrammarAndCollocationInner />} />
          <Route path="/collocation" element={<Collocation />} />
          <Route path="/collocation/:id" element={<CollocationInner />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/wisdom-pro" element={<WisdomPro />} />
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
