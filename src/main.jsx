import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SideBarProvider } from "./Context/SidebarContext.jsx";
import DataProvider from "./Context/DataProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DataProvider>
      <SideBarProvider>
        <App />
      </SideBarProvider>
    </DataProvider>
  </BrowserRouter>
);
