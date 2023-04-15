/*
    SERVER
*/

const express = require('express');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded(
    { extended: true },
));

module.exports = app;



/*
    DIRECT MESSAGING SERVER
*/


const WebSocket = require('ws');

const channels = [
    { id: 'channel1', clients: new Set() },  // Example channel
];

// Consider adding a <client, channel> mapping to reduce client cleaning time

const server = new WebSocket.Server({ port: 8000 });

server.on('connection', (socket) => {
    console.log('WebSocket client connected');

    socket.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            // If message contains channel attribute
            if (data.channel) {
                // Find room in channels
                const channel = channels.find((r) => r.id === data.channel);

                if (channel) {
                    // Send message to all clients in room
                    channel.clients.forEach((client) => {
                        if (client != socket && client.readyState === WebSocket.OPEN) {
                            client.send(message);
                        }
                    });
                    console.log("Broadcasted message: " + message);
                    // Add sender to channel if not present
                    channel.clients.add(socket);
                } else {
                    // Create new channel representation if channel id is not in server
                    console.log("Created channel " + data.channel + " in memory");
                    channels.push({ id: data.channel, clients: new Set([socket]) })
                }
            } else {
                console.error('Missing channel property in message');
            }
        } catch (error) {
            console.error('Failed to parse message as JSON:', message);
        }
    });

    socket.on('close', () => {
        console.log('WebSocket client disconnected');
        // Remove the disconnected client from all chat channels
        channels.forEach((channel) => {
            channel.clients.delete(socket);
        });
    });
});

server.on('listening', () => {
    console.log('WebSocket server listening on port 8000 for multiple chat channels');
});

server.on('error', (error) => {
    console.error('WebSocket server error:', error);
});

server.on('close', () => {
    console.log('WebSocket server closed');
});

