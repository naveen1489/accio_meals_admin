import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SideBarProvider } from "./Context/SidebarContext.jsx";
import DataProvider from "./Context/DataProvider.jsx";
import { AlertContextProvider } from "./Context/AlertContext.jsx";
import Alert from "./Component/Alert.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DataProvider>
      <SideBarProvider>
        <AlertContextProvider>
        <Alert/>
        <App />
        </AlertContextProvider>
      </SideBarProvider>
    </DataProvider>
  </BrowserRouter>
);
