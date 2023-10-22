import { Client, IMessage } from "./client";
import styles from "./Chat.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import { IMessageEvent } from "websocket";

const Chat: React.FC = () => {
  const { setShowHeader } = useContext(AppContext);
  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [client, setClient] = useState<Client>();

  const messageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const clientOnMessageEvent = (message: IMessageEvent) => {
      console.log("received message", JSON.parse(message.data.toString()));
      setMessages((messages) => {
        messages.push(JSON.parse(message.data.toString()));
        return messages.map((e) => e);
      });
    };

    const newClient = new Client(
      `Test${new Date().getTime()}`,
      clientOnMessageEvent
    );
    setClient(newClient);

    return () => {
      newClient.closeConnection();
    };
  }, []);

  const sendMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!messageInputRef.current) {
      throw Error("missing messageinputref");
    }
    if (!client) {
      throw Error("missing client in state");
    }
    client.sendMessage(messageInputRef.current.value);
  };

  return (
    <div className={`main-wrapper-with-header ${styles.wrapper}`}>
      <h1>Chat</h1>
      <p>Hello, welcome</p>
      <div className={styles.chatWrapper}>
        <div className={styles.chatMessages}>
          {messages.map((message, index) => {
            return (
              <div
                key={`chat-message-${index}`}
                className={styles.chatMessage}
              >
                {message.clientId} -- {message.message}
              </div>
            );
          })}
        </div>
        <div className={styles.chatInput}>
          <form onSubmit={sendMessageSubmit}>
            <input ref={messageInputRef} />
            <button type="submit">send</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Chat;
