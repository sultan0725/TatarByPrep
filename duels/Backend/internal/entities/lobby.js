// note: only create lobbies with createLobby(), don't call the constructor directly
module.exports = class Lobby {
    lobbyid = -1; // assigned when created
    map = undefined;
    status = 'waiting'; // waiting, playing, or 'closed'
    players = [];
    max_players = undefined;

    tasks = null;

    constructor(map) {
        // if provided a string -
        if (typeof map === 'string') {
            // find a map with the name
            this.map = maps.find(function(_map) {
                return _map.name === map;
            })

            if (this.map === undefined) {
                trace(`Error: could not find a map called "${map}"`);
                this.close();
                return;
            }
        }
        else { // otherwise - just set the map
            this.map = map;
        }

        this.status = 'waiting';
        this.max_players = this.map.max_players;
    }

    updateStatus() {
        if (this.full) {
            this.status = 'playing';
            this.play();
        }
        if (this.empty) {
            this.status = 'waiting';
        }
    }

    addPlayer(player) {
        if (this.full) {
            trace('warning: can\'t add a player - the lobby is full!');
            player.onRejectLobby(this, 'lobby is full!');
            return -1;
        }
        else if (this.players.indexOf(player) !== -1) {
            trace('warning: can\'t add a player who\'s already in the lobby');
            player.onRejectLobby(this, 'already in the lobby');
            return -1;
        }
        else if (player.lobby !== null) {
            player.lobby.kickPlayer(player, 'changing lobbies', false);
        }

        this.players.push(player);
        player.lobby = this;
        player.onJoinLobby(this);

        this.updateStatus();

        trace('a player joined the lobby. now at ' + this.players.length + ' out of ' + this.max_players);
    }

    kickPlayer(player, reason, forced) {
        var idx = this.players.indexOf(player);
        this.players.splice(idx, 1);
        // todo: maybe send some command to the client
        player.onKickLobby(this, reason, forced);
        player.lobby = null;

        if (reason !== 'lobby is closing!')
            this.close();
        // this.updateStatus();
    }

    async getTasks() {
        // cache the tasks
        if (this.tasks === null) {
            trace('about to generate tasks. ' + this.tasks);
            this.tasks = this.map.getTasks();
            this.tasks = await this.tasks;
            trace('generated tasks for the lobby: ' + this.tasks.toString());
        }
        else if (!Array.isArray(this.tasks)) { // promise idk
            await this.tasks;
        }
        
        return this.tasks;
    }

    async addIntoPlay(player) {
        var tasks = await this.getTasks();
        player.onPlay(this, tasks, this.map.minigame);
    }

    broadcast(data) {
        this.players.forEach(function(player) {
            player.write(data);
        })
    }

    play() {
        var lobby = this;
        this.players.forEach(function(player) {
            lobby.addIntoPlay(player);
        })
    }

    close() {
        // kick all plaayers
        this.players.forEach((player) => this.kickPlayer(player, 'lobby is closing!', true));
        this.status = 'closed';
    }


    // data that is being sent about this lobby
    // (e.x. we don't want to send functions and everything about every player)
    serialize() {
        return {
            lobbyid: this.lobbyid,
            map: this.map,
            status: this.status,
            max_players: this.max_players,
            player_count: this.player_count,
            full: this.full
        }
    }

    get player_count() {
        return this.players.length;
    }

    get full() {
        return this.player_count >= this.max_players;
    }

    get empty() {
        return this.player_count == 0;
    }
}