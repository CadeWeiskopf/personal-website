import {
  client as WebSocketClient,
  Message as WebSocketMessage,
  connection as WebSocketConnection,
  w3cwebsocket as W3CWebSocket,
  IMessageEvent,
  ICloseEvent,
} from "websocket";
const { REACT_APP_CHAT_SERVICE_ADDRESS } = process.env;

interface IMessage {
  clientId: string;
  message: string;
}

export class Client {
  private client: W3CWebSocket;
  private clientId: string;
  private connection: WebSocketConnection | undefined;

  sendMessage = (message: string) => {
    const data: IMessage = {
      clientId: this.clientId,
      message,
    };
    this.connection?.send(JSON.stringify(data));
  };

  private receiveMessage = (message: WebSocketMessage) => {
    if (message.type === "utf8") {
      console.log(`${this.clientId} New WebSocketMessage: ${message.utf8Data}`);
    } else if (message.type === "binary") {
      console.log(
        `${this.clientId} New binary message: ${message.binaryData.length} bytes`
      );
    }
  };

  constructor(id: string, onConnectCallback?: (client: Client) => void) {
    this.clientId = id;

    this.client = new W3CWebSocket(
      `ws://${REACT_APP_CHAT_SERVICE_ADDRESS}`,
      "echo-protocol"
    );

    this.client.onopen = () => {
      this.sendMessage("Hello world!");
    };

    this.client.onclose = (event: ICloseEvent) => {};

    this.client.onmessage = (message: IMessageEvent) => {};

    this.client.onerror = (error: Error) => {};
  }
}
