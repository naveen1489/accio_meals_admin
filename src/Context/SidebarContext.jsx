import React, { useEffect, useState } from "react";
export const SidebarContext = React.createContext();

export function SideBarProvider({ children }) {
  const [collapseSidebar, setCollapseSidebar] = useState(false);
  const [windoWidth, setWindoWidth] = useState(null);
 
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWindoWidth(currentWidth);

      if (currentWidth > 1024) {
        setCollapseSidebar(false);
      } else {
        setCollapseSidebar(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SidebarContext.Provider
      value={{ collapseSidebar, setCollapseSidebar, windoWidth }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
