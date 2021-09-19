const { findLobby, getLobbies } = require('./../internal/lobbyFunctions.js');
const { make_match } = require('./../internal/matchmaker.js');
const Profile = require('../internal/schemas/profile.js');
const Account = require('../internal/schemas/account.js');

module.exports = async function handlePacket(c, data) {
    var cmd = data.cmd.toLowerCase();
    // trace('received command: ' + cmd);
    
    switch(cmd) {
        case 'hello':
            trace("Hello from client: "+data.kappa);
            c.sendHello();
            break;
        case 'hello2':
            trace('Second hello from client: '+data.kappa);
            break;
        case 'message':
            trace('Message from client: '+data.msg);
            c.sendMessage(data.msg+' indeed');
            break;

        // preset commands
        case 'login':
            var { username, password } = data;
            Account.login(username, password)
            .then(function(account) {
                // this also sends the message
                c.login(account);
            }).catch(function(reason) {
                c.sendLogin('fail', reason);
            })
            break;
        case 'register':
            var { username, password } = data;
            Account.register(username, password)
            .then(function(account) {
                // this also sends the message
                c.register(account);
            }).catch(function(reason) {
                trace('error: ' + reason);
                c.sendRegister('fail', reason);
            })
            break;
        case 'lobby list':
            c.sendLobbyList();
            break;
        case 'lobby info':
            var lobbyid = data.lobbyid;
            c.sendLobbyInfo(lobbyid);
            break;
        case 'lobby join':
            var lobbyid = data.lobbyid;
            var minigame = data.minigame;

            var lobby;
            if (lobbyid) {
                lobby = findLobby(lobbyid);
            }
            else {
                lobby = make_match(c, minigame);
            }

            if (lobby !== null) {
                // it also sends the response
                lobby.addPlayer(c);
            }
            // else {
            //     c.sendRejectLobby()
            // }
            break;
        case 'lobby leave':
            var lobby = c.lobby;
            if (lobby !== null) {
                lobby.kickPlayer(c, 'you left the lobby', false);
            }
            break;

        // #######################
        // Add your commands here:
        case 'task answer':
            var correct = data.correct;
            var time = data.time;

            c.answered = true;
            c.correct = correct;
            c.time = time;

            // wait for others and go on
            if (c.lobby.players.each((p) => p.answered)) {

                // define the winner
                var winner = c;
                c.lobby.players.find((p) => {
                    if (p.answered && p.correct && (!winner.correct || p.time < winner.time)) {
                        winner = p;
                    }
                })

                c.lobby.players.forEach((p) => {
                    p.answered = true;
                    p.correct = undefined;
                    p.time = undefined;
                   
                    p.sendTaskNext(winner);
                });
            }
            break;
    }
}