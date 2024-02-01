import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import styles from "./About.module.css";

const About: React.FC = () => {
  const { setShowHeader } = useContext(AppContext);
  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  return <div className={styles.wrapper}></div>;
};
export default About;
