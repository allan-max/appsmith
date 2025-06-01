export default {
  appname: "chat-widget",
  history: [{ role: "CHATBOT", message: "Como posso te ajudar?" }],
  lastUserMessage: "",

  async send(msg) {
    let newMessage = { role: "USER", message: msg };
    this.history.push(newMessage);

    this.lastUserMessage = msg;

    let reply = await Query1.run();
		Custom1.model.botMessage = reply.response;

    this.history.push({ role: "CHATBOT", message: reply.response });
    storeValue(this.appname, this.history);
  },

  onLoad() {
    let chatHistory = appsmith.store[this.appname];
    if (chatHistory !== undefined) {
      this.history = chatHistory;
    }
  },

  reset() {
    removeValue(this.appname);
    this.history = [{ role: "CHATBOT", message: "Como posso te ajudar?" }];
  }
}