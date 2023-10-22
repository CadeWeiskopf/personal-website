import {
  w3cwebsocket as W3CWebSocket,
  IMessageEvent,
  ICloseEvent,
} from "websocket";
const { REACT_APP_CHAT_SERVICE_ADDRESS } = process.env;

export interface IMessage {
  clientId: string;
  message: string;
}

export class Client {
  private client: W3CWebSocket;
  private clientId: string;

  sendMessage = (message: string) => {
    const data: IMessage = {
      clientId: this.clientId,
      message,
    };
    this.client.send(JSON.stringify(data));
  };

  closeConnection = () => {
    this.client.close();
  };

  constructor(
    id: string,
    onMessageEvent: (message: IMessageEvent) => void,
    onCloseEvent: (event: ICloseEvent) => void,
    onConnectCallback: (client: Client) => void
  ) {
    this.clientId = id;

    this.client = new W3CWebSocket(
      `ws://${REACT_APP_CHAT_SERVICE_ADDRESS}`,
      "echo-protocol"
    );

    this.client.onopen = () => {
      this.sendMessage("Hello world!");
      onConnectCallback(this);
    };

    this.client.onclose = onCloseEvent;

    this.client.onmessage = onMessageEvent;

    this.client.onerror = (error: Error) => {
      console.error(error);
      const isClosed = this.client.readyState === this.client.CLOSED;
      console.log(`isClosed=${isClosed}`);
    };
  }
}
