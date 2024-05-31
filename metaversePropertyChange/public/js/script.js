let socket;


    // Replace with your WebSocket server URL
    socket = new WebSocket('8082 webscoket url')
    socket.onopen = function(event) {
        console.log('WebSocket is open now.');
    }
    socket.onclose = function(event) {
        console.log('WebSocket is closed now.');
    }
    socket.onerror = function(error) {
        console.error('WebSocket Error: ', error);
    }
    socket.onmessage = function(event) {
        console.log('WebSocket Message: ', event.data);
        displayMessage(event.data);
    };

function sendMessage(message) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
        console.log('Message sent: ' + message);
    } else {
        console.log('WebSocket is not open. Message not sent: ' + message);
    }
}

function displayMessage(message) {
    const messageField = document.getElementById('messageField');
    messageField.value += message + '\n';
}

