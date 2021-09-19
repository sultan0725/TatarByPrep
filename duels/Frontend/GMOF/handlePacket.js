client.on('login', (data) => {

});

client.on('hello', () => {
    console.log('HELLO RECEIVED!!');
});



client.on('lobby join', (data) => {
    var lobby = data.lobby
    window.lobby = lobby
    
    sendRequestLobbies()
});

client.on('lobby reject', (data) => {
    var lobby = data.lobby
    var reason = data.reason
    alert("Failed to join the lobby! Reason: " + reason)
});

client.on('lobby leave', (data) => {
    var lobby = data.lobby
    var reason = data.reason
    var forced = data.forced
    window.lobby = undefined
    if (forced)
        show_message_async("Kicked from the lobby! Reason: " + reason)
    else
        show_message_async("You left the lobby")
    
    sendRequestLobbies()
});



client.on('play', (data) => {
    const tasks = data.tasks;
    window.tasks = tasks;
});