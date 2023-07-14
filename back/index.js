const express = require("express");

const app = express();
const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();
const PORT = process.env.PORT | 3000;

app.ws("/", (ws, req) => {
  ws.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.method) {
      case "connection":
        conntectionHandler(ws, message);
        break;

      default:
        console.log("Не найден ни один метод");
        break;
    }
  });
});

app.listen(PORT, () => {
  console.log(`Start server on ${PORT}`);
});

function conntectionHandler(ws, message) {
  ws.id = message.id;
  broadcastConnection(ws, message);
}

function broadcastConnection(ws, message) {
  aWss.clients.forEach((client) => {
    if (client.id === message.id) {
      client.send(`Текущий пользователь: ${message.userName}`);
    }
  });
}
