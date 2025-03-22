import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import PopUp from "../Component/Popup";
// import PopUp from "../Components/Popup";

export const AlertContext = React.createContext();

// Context for Alerts and confirm Pop up
export function AlertContextProvider({ children }) {
  // sound for alert
  const [sound, setSound] = useState("");
  useEffect(() => {
    setSound(new Audio("../sounds/alert.mp3"));
  }, []);
  const showAlert = (type, message, popSound = false) => {
    var options = { position: "top-right", duration: 3000 };
    if (popSound) {
      sound.play();
    }
    if (type === "error") toast.error(message, options);
    else if (type === "success") toast.success(message, options);
    else if (type === "warning") toast.warning(message, options);
  };

  const [popUp, setPopUp] = useState(false);
  const [query, setQuery] = useState(null);
  const [handleYes, setHandleYes] = useState(null);

  const showPopUp = (query, handleYes) => {
    setQuery(query);
    setHandleYes(() => handleYes);
    setPopUp(true);
  };

  return (
    <AlertContext.Provider value={{ showAlert, popUp, setPopUp, showPopUp }}>
      {children}
      {popUp && <PopUp question={query} func={handleYes} />}
    </AlertContext.Provider>
  );
}

export const useAlert = () => React.useContext(AlertContext);