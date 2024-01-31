import styles from "./Nav.module.css";
import compassIcon from "../icons/compass-icon";
import { Link } from "react-router-dom";
import { createRef } from "react";
import routes from "../../AppRoutes";
import SlideToggle from "../slide-toggle/SlideToggle";

const navListRef = createRef<HTMLDivElement>();

export const NavButton: React.FC = () => {
  const showNavList = () => {
    if (!navListRef.current) {
      throw Error("no navlistref set");
    }
    navListRef.current.classList.add(styles.active);
  };

  const hideNavList = () => {
    if (!navListRef.current) {
      throw Error("no navlistref set");
    }
    navListRef.current.classList.remove(styles.active);
  };

  return (
    <div
      className={styles.buttonWrapper}
      onMouseEnter={showNavList}
      onMouseLeave={hideNavList}
    >
      {compassIcon}
    </div>
  );
};

export const NavList: React.FC = () => {
  return (
    <nav
      className={styles.listWrapper}
      ref={navListRef}
    >
      {routes.map((route, index) => {
        return (
          <Link
            key={`navlink-route-${index}`}
            className={styles.listWrapperLink}
            to={route.path}
          >
            {route.navLabel}
          </Link>
        );
      })}
      <div className={styles.listWrapperLink}>
        <SlideToggle />
      </div>
    </nav>
  );
};

const Nav: React.FC = () => {
  return (
    <>
      <NavButton />
      <NavList />
    </>
  );
};

export default Nav;
