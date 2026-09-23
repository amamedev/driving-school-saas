import "@/App.css";
import Router from "@/app/router";
import Providers from "@/app/providers";
import { Toaster } from "sonner";

function App() {
  return (
    <Providers>
      <Router />
      <Toaster />
    </Providers>
  );
}

export default App;
