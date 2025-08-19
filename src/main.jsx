import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top" richColors expand={true} visibleToasts={3} />
      <NextTopLoader color="oklch(59.6% 0.145 163.225)" height={3}/>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
