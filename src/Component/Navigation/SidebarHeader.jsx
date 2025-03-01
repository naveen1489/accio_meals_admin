import Header from "./Header";
import SidePanel from "./SidePanel";

const SidebarHeader = ({ children, headingText, subTitle }) => {
  return (
    <div className="main">
      <div className="page_container">
        <SidePanel />

        <div
          style={{
            position: "sticky",
            left: "0",
            right: "0",
            width: "100%",
          }}
        >
          <Header
            heading={headingText}
            subTitle={subTitle}
            subheading={"formattedDateTime"}
          />

          <div
            style={{
              width: "100%",
              overflow: "scroll",
              marginTop: "5.5rem",
              height: "calc(100% - 5.5rem)",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
