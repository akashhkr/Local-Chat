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

$(function () {
    const socket = io();
    let username;

    socket.on('user connected', function (data) {
        username = data.username;
        
        const systemMessageElement = $('<li>').addClass('system-message').text(`${username} joined the chat`);
        $('#messages').append(systemMessageElement);
        // Scroll to the bottom of the chat messages container
        $('#messages').scrollTop($('#messages')[0].scrollHeight);

        $(document).ready(function () {
            $('#username-display').text(username);
        });
    });

    socket.on('chat message', function (data) {
        let messageClass = 'incoming';
        let messageUsername = data.username;
        if (data.username === username) {
            messageClass = 'outgoing';
            messageUsername = '';
        }
        
        const messageElement = $('<li>').addClass(messageClass);
        const usernameElement = $('<span>').addClass('username').text(messageUsername);
        const messageTextElement = $('<span>').addClass('message-text').text(`${data.message}`);
        messageElement.append(usernameElement).append(messageTextElement);
        $('#messages').append(messageElement);
        // Scroll to the bottom of the chat messages container
        $('#messages').scrollTop($('#messages')[0].scrollHeight);
    });

    socket.on('user disconnected', function (data) {
        const systemMessageElement = $('<li>').addClass('system-message').text(`${data.username} left the chat`);
        $('#messages').append(systemMessageElement);
        // Scroll to the bottom of the chat messages container
        $('#messages').scrollTop($('#messages')[0].scrollHeight);
    });    

    $('#message-form').submit(function (e) {
        console.log('Submit event triggered'); // Add this line for debugging
        e.preventDefault();
        socket.emit('chat message', {
            username: username,
            message: $('#input').val()
        });

        console.log('Message sent:', $('#input').val()); // Add this line for debugging

        $('#input').val('');
        return false;
    });
});
