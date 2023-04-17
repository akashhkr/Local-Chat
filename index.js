const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

function generateRandomUsername() {
    const usernames = [
        "Sneaky Squirrel",
        "Caffeinated Camel",
        "Chatty Cheetah",
        "Punctual Penguin",
        "Motivated Moose",
        "Inquisitive Iguana",
        "Dynamic Dolphin",
        "Curious Koala",
        "Efficient Elephant",
        "Productive Puma"
    ];
    const randomIndex = Math.floor(Math.random() * usernames.length);
    return usernames[randomIndex];
}


io.on('connection', (socket) => {
    const username = generateRandomUsername();
    console.log(`${username} connected`);
    
    socket.emit('user connected', {
        username: username,
    });

    socket.on('chat message', (data) => {
        console.log('Received message:', data);
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log(`${username} disconnected`);
    });
});


http.listen(3000, () => {
   console.log('listening on *:3000');
});
