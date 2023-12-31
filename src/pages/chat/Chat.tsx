import React from "react";
import { Client, IMessage } from "./client";
import styles from "./Chat.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../AppContext";
import { ICloseEvent, IMessageEvent } from "websocket";

const GetUsernameComponent: React.FC<{
  setClientUsername: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setClientUsername }) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (!usernameRef.current) {
            throw Error("missing username ref");
          }
          setClientUsername(usernameRef.current.value);
        }}
      >
        <label>Username</label>
        <input ref={usernameRef} />
        <button type="submit">ok</button>
      </form>
    </div>
  );
};

const Chat: React.FC = () => {
  const { setShowHeader } = useContext(AppContext);
  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  const [clientUsername, setClientUsername] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [client, setClient] = useState<Client>();

  const messagesWrapperRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!client) {
      return;
    }
    if (!messagesWrapperRef.current) {
      throw Error("missing messagesWrapperRef.current");
    }
    messagesWrapperRef.current.scrollTop =
      messagesWrapperRef.current.scrollHeight;
  }, [messages, client]);

  useEffect(() => {
    if (!clientUsername) {
      return;
    }
    if (client) {
      return;
    }

    const clientOnConnect = (client: Client) => {
      console.log("connected");
      setClient(client);
    };

    const clientOnMessageEvent = (message: IMessageEvent) => {
      setMessages((messages) => {
        messages.push(JSON.parse(message.data.toString()));
        return messages.map((e) => e);
      });
    };

    const clientOnCloseEvent = (event: ICloseEvent) => {
      setClient(undefined);
    };

    new Client(
      clientUsername,
      clientOnMessageEvent,
      clientOnCloseEvent,
      clientOnConnect
    );
  }, [client, clientUsername]);

  useEffect(() => {
    return () => {
      client?.closeConnection();
    };
  }, [client]);

  const sendMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!messageInputRef.current) {
      throw Error("missing messageinputref");
    }
    if (!client) {
      throw Error("missing client in state");
    }
    client.sendMessage(messageInputRef.current.value);
    messageInputRef.current.value = "";
  };

  return (
    <div className={styles.wrapper}>
      <h1>Chat</h1>
      {!clientUsername || !client ? (
        <GetUsernameComponent setClientUsername={setClientUsername} />
      ) : (
        <>
          <p>Hello, welcome</p>
          <div className={styles.chatWrapper}>
            <div
              className={styles.chatMessages}
              ref={messagesWrapperRef}
            >
              {messages.map((message, index) => {
                return (
                  <div
                    key={`chat-message-${index}`}
                    className={styles.chatMessageWrapper}
                  >
                    <div className={styles.chatMessageClient}>
                      {message.clientId}
                    </div>
                    <div className={styles.chatMessage}>{message.message}</div>
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
        </>
      )}
    </div>
  );
};
export default Chat;
