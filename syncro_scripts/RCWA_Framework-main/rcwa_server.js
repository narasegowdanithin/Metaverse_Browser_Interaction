const http = require('http');
const WebSocket = require('ws');
//const path = require('path');

//const app = express();
const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    var textMessage = message.toString('utf-8');
        console.log('msg rec:' ,textMessage);
        //console.log(textMessage.type);

    // Broadcast the selected option to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(textMessage);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Serve your HTML file
//app.use(express.static(path.join(__dirname, 'public'));

server.listen(8081, () => {
  console.log('Server is running on http://localhost:8081');
});