import React from "react";
// import Button from "./Button";
import { useAlert } from "../Context/AlertContext";
import "../Styles/PopUp.css";
// import gif from "../assets/dashboard/popupgif.png";
import { MdClose } from "react-icons/md";
import { Button } from "antd";

export default function PopUp({ question, func }) {
  const { popUp, setPopUp } = useAlert();

  const handleClose = () => {
    setPopUp(false);
  };
  const handleOutsideClick = (e) => {
    if (e.target.className === "popup_overlay") {
      handleClose();
    }
  };

  return (
    <>
      {popUp && (
        <div className="popup_overlay" onClick={handleOutsideClick}>
          <div className="pop_up">
            <div>
              <div></div>
              <div className="pop_up_gif">
                <img src={'gif'} alt="Popup GIF" />
              </div>
              <div className="pop_up_close" onClick={handleClose}>
                <MdClose size={24} className="close_icon" />
              </div>
            </div>
            <div className="pop_up_question">{question}</div>

            <div className="pop_up_buttons">
              <div onClick={() => setPopUp(false)}>
                {/* <Button iconLeft={true} name="No, Keep" /> */}
                <Button type="primary" style={{background:"white", color:"var(--sec-color)"}}>No, Keep</Button>
              </div>
              <div
                onClick={async () => {
                  func();
                  setPopUp(false);
                }}
              >
                {/* <Button name="Yes, Sure" iconLeft={true} /> */}
                <Button type="primary" style={{background:"var(--sec-color)", color:"white"}}>Yes, Sure</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}