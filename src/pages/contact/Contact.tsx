import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";

const Contact: React.FC = () => {
  const { setShowHeader } = useContext(AppContext);

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  return <></>;
};

export default Contact;
