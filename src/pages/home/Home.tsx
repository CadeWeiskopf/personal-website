import { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import { AppContext } from "../../AppContext";
import reactIcon from "../../components/icons/react-icon";
import dockerIcon from "../../components/icons/docker-icon";

export const NameAndTitle: React.FC<{
  alignItems: "flex-start" | "center" | "flex-end";
}> = ({ alignItems }) => {
  return (
    <>
      <div
        className={styles.nameAndTitleWrapper}
        style={{ alignItems }}
      >
        <div className={styles.nameWrapper}>
          <div className={styles.name}>Cade</div>
          <div className={styles.name}>Weiskopf</div>
        </div>
        <div className={styles.subtitleWrapper}>
          <div className={styles.subtitle}>&lt;Software Engineer&gt;</div>
        </div>
      </div>
    </>
  );
};

const Home: React.FC = () => {
  const { setShowHeader } = useContext(AppContext);

  useEffect(() => {
    setShowHeader(false);
  }, [setShowHeader]);

  return (
    <div className={styles.wrapper}>
      {reactIcon}
      {dockerIcon}
      <NameAndTitle alignItems="center" />
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
