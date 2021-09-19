
/**
 * 
 * @param {string} lobbyid 
 */
function sendJoinLobby(minigame) {
    client.send({ cmd: "lobby join", minigame })
}

function sendLeaveLobby() {
    client.send({ cmd: "lobby leave" })
}

function sendRequestLobby(lobbyid) {
    client.send({ cmd: "lobby info", lobbyid: lobbyid })
}

function sendRequestLobbies() {
    client.send({cmd: "lobby list" })
}

function sendHello() {
    client.send({ cmd: "hello", kappa: "haha websocket" })
}

/**
 * 
 * @param {string} username 
 * @param {string} password 
 */
function sendLogin(username, password) {
    client.send({ cmd: "login", username, password })
}


/**
 * 
 * @param {string} username 
 * @param {string} password 
 */
function sendRegister(username, password) {
    client.send({ cmd: "register", username, password });
}



// function sendRequestTasks(type, amount) {
//     client.send({ cmd: "task list", type, amount });
// }

function sendTaskAnswer(correct, timer) {
    client.send({ cmd: "task answer", correct, timer });
}

function sendFinishTasks(score1, score2) {
    client.send({ cmd: 'task finish', score1, score2 });
}