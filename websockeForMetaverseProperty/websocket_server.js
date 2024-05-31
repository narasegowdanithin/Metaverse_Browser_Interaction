const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    ws.on('message', message => {
        // Broadcast the received message to all connected clients
        var textMessage = message.toString('utf-8');
        console.log('msg rec:' ,textMessage);
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                //console.log('msg passed : ' ,textMessage);
                client.send(textMessage);
            }
        });
    });
});

server.listen(8082, () => {
    console.log('Server is listening on port 8082');
});
