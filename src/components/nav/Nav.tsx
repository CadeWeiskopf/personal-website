import styles from "./Nav.module.css";

const NavButton: React.FC = () => {
  return <div className={styles.buttonWrapper}>?</div>;
};

const NavList: React.FC = () => {
  return <div className={styles.listWrapper}>list</div>;
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
