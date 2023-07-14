const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const app = express();
const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();
const PORT = process.env.PORT | 3000;

const socketsImage = {};

app.ws("/", (ws, req) => {
  ws.on("message", (msg) => {
    const message = JSON.parse(msg);

    switch (message.method) {
      case "connection":
        conntectionHandler(ws, message);
        break;
      case "draw":
        drawHandler(ws, message);
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
  sendCurrentImage(ws, message);
}

function broadcastConnection(ws, message) {
  aWss.clients.forEach((client) => {
    if (client.id === message.id) {
      client.send(JSON.stringify({ method: "connection", success: true }));
    }
  });
}

function sendCurrentImage(ws, message) {
  const imageUrl = socketsImage[ws.id];
  if (imageUrl) ws.send(JSON.stringify({ method: "draw", url: imageUrl }));
}

function drawHandler(ws, message) {
  saveCurrentImage(ws, message);
  broadcastDraw(ws, message);
}

function broadcastDraw(ws, message) {
  aWss.clients.forEach((client) => {
    if (client.id === message.id) {
      client.send(JSON.stringify({ method: "draw", url: message.url }));
    }
  });
}

function saveCurrentImage(ws, message) {
  socketsImage[ws.id] = message.url;
}
