import { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import { AppContext } from "../../AppContext";
import { AlignItems, Header } from "../../components/header/Header";

const Home: React.FC = () => {
  const { setShowHeader } = useContext(AppContext);

  useEffect(() => {
    setShowHeader(false);
  }, [setShowHeader]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoWrapper}>
        <Header
          alignItems={AlignItems.Center}
          initAnim={true}
          smallText={false}
        />
        <br />
        <div className={styles.quoteAndAuthorWrapper}>
          <div className={styles.quoteWrapper}>
            <div className={styles.quote}>
              The only way to do great work is to love what you do.
            </div>
          </div>
          <div className={styles.quoteAuthor}>Steve Jobs</div>
        </div>
      </div>
    </div>
  );
};
export default Home;
