import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupNotiflix } from "./utils/notiflix-config.ts";
import { LandingPage } from "./components/landing-page.tsx";

setupNotiflix();
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        {/* <EnhancedLandingPage /> */}
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
