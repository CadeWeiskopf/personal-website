import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.nameWrapper}>
        <div className={styles.name}>Cade</div>
        <div className={styles.name}>Weiskopf</div>
      </div>
    </div>
  );
};
export default Home;
