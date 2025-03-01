import styles from "../../Styles/SidebarHeader.module.css";

const SidebarMenuBtn = ({
  page,
  route,
  handleItemClick,
  icon,
  heading,
  activePage,
  collapseSidebar,
}) => {
  return (
    <>
      <li
        className={activePage === page ? styles.activeSidebar : ""}
        onClick={() => handleItemClick(page, route)}
      >
        <div className={activePage !== page ? styles.activeDiv : ""}>
          <div></div>
        </div>{" "}
        {icon}
        {!collapseSidebar && heading}
      </li>
    </>
  );
};

export default SidebarMenuBtn;
