const { REACT_APP_CHAT_SERVICE_ADDRESS } = process.env;
if (!REACT_APP_CHAT_SERVICE_ADDRESS) {
  throw Error("missing env-var: REACT_APP_CHAT_SERVICE_ADDRESS");
}
export { REACT_APP_CHAT_SERVICE_ADDRESS };