import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  const { setShowHeader } = useContext(AppContext);

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  return (
    <div className={`main-wrapper-with-header ${styles.wrapper}`}>
      <h1>Contact</h1>
    </div>
  );
};

export default Contact;
