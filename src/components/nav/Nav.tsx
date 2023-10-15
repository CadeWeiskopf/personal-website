import styles from "./Nav.module.css";
import compassIcon from "../icons/compass-icon";

const NavButton: React.FC = () => {
  return <div className={styles.buttonWrapper}>{compassIcon}</div>;
};

const NavList: React.FC = () => {
  return <div className={styles.listWrapper}></div>;
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
