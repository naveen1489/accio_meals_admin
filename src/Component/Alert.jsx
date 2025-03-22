import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";

export default function Alert() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 540) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Toaster
        position={!mobile ? "bottom-right" : "top-right"}
        reverseOrder={true}
        toastOptions={{
          error: {
            icon: (
              <MdErrorOutline
                style={{ color: "#D32F2F", width: "1.5rem", height: "1.5rem" }}
              />
            ),
            style: {
              background: "#FFFFFF",
              border: "1px solid rgba(240, 240, 240, 0.10)",
              color: "#4B4C51",
              zIndex: "1",
            },
          },
          success: {
            icon: (
              <IoIosCheckmarkCircleOutline
                style={{ color: "#2E7D32", width: "1.5rem", height: "1.5rem" }}
              />
            ),
            style: {
              background: "#FFFFFF",
              border: "1px solid rgba(240, 240, 240, 0.10)",
              color: "#4B4C51",
              zIndex: "1",
            },
          },
        }}
      />
    </>
  );
}