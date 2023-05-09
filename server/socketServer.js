/*
    DIRECT MESSAGING SERVER
*/


const WebSocket = require('ws');

const channels = { 'channel1': { clients: new Set() } }; // Example channel

const socket_to_channel_map = new Map();

// Consider adding a <client, channel> mapping to reduce client cleaning time

const server = new WebSocket.Server({ port: 8000 });

server.on('connection', (socket) => {
    console.log('WebSocket client connected');

    socket.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            // If message contains join attribute
            if (data.join_channel) {
                // delete entry from socket to channel map if user exists
                if (socket_to_channel_map.has(socket)) {
                    const channel_id = socket_to_channel_map.get(socket);
                    if (channels[channel_id]) {
                        channels[channel_id].clients.delete(socket);
                    } else {
                        console.log("Warning: Deleting user from non-existent channel");
                    }
                    socket_to_channel_map.delete(socket);
                }
                // Update entry to socket to channel map 
                socket_to_channel_map.set(socket, data.join_channel);
                // Update channel clients
                if (channels[data.join_channel]) {
                    channels[data.join_channel].clients.add(socket);
                } else {
                    // Create new channel representation if channel id is not in server
                    console.log("Created channel " + data.join_channel + " in memory");
                    channels[data.join_channel] = { clients: new Set([socket]) };
                }
                return;
            }
            // If message contains channel attribute
            if (data.channel_id) {
                // Find room in channels
                const channel = channels[data.channel_id];

                if (channel) {
                    // Send message to all clients in room
                    channel.clients.forEach((client) => {
                        if (client != socket && client.readyState === WebSocket.OPEN) {
                            client.send(message);
                        }
                    });
                    console.log("Broadcasted message: " + message + "\n to users: ", channel.clients.size);
                } else {
                    console.log("Received message for non-existing channel");
                }
            } else {
                console.error('Missing channel property in message');
            }
        } catch (error) {
            console.error('Failed to parse message as JSON:', message);
        }
    });

    socket.on('close', () => {

        // Remove the disconnected client from all chat channels
        if (socket_to_channel_map.has(socket)) {
            const channel_id = socket_to_channel_map.get(socket);
            if (channels[channel_id]) {
                channels[channel_id].clients.delete(socket);
            } else {
                console.log("Warning: Deleting user from non-existent channel");
            }
            socket_to_channel_map.delete(socket);
        }
        return console.log('WebSocket client disconnected');
    });
});

server.on('listening', () => {
    console.log('WebSocket server listening on port 8000 for multiple chat channels');
});

server.on('error', (error) => {
    console.error('WebSocket server error:', error);
});

server.on('close', async () => {
    console.log('WebSocket server closed');
});

module.exports = server;