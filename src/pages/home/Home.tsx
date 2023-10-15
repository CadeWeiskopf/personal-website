import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.nameWrapper}>
        <div className={styles.name}>Cade</div>
        <div className={styles.name}>Weiskopf</div>
      </div>
      <div className={styles.subtitleWrapper}>
        <div className={styles.subtitle}>&lt;Software Engineer&gt;</div>
      </div>

      <div className={styles.quoteAndAuthorWrapper}>
        <div className={styles.quoteWrapper}>
          <div className={styles.quote}>
            The world is a book, and those who do not travel read only one page
          </div>
        </div>
        <div className={styles.quoteAuthor}>Saint Augustine</div>
      </div>
    </div>
  );
};
export default Home;
