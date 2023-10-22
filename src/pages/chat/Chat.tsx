import { Client } from "./client";
import styles from "./Chat.module.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";

const Chat: React.FC = () => {
  const { setShowHeader } = useContext(AppContext);

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  useEffect(() => {
    const client = new Client(`Test${new Date().getTime()}`);
    return () => {
      client.closeConnection();
    };
  }, []);

  return (
    <div className={`main-wrapper-with-header ${styles.wrapper}`}>
      <h1>Chat</h1>
      <p>Hello, welcome</p>
    </div>
  );
};
export default Chat;
