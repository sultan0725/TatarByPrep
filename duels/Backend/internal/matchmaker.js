const { createLobby } = require('./lobbyFunctions.js');

module.exports = class MatchMaker {
    // this will just pick the first non-full lobby
    static make_match(user, minigame) {
        var match_lobby = null;
        // this a so called 'arrow function'.
        // (lobby) => {} is the same as function(lobby) {}

        Object.values(global.lobbies).forEach((lobby) => {
            // you can add additional checks for user rank, etc.
            // and your own matchmaking logic
            if (lobby.players.length > 0 && lobby.players.length < lobby.max_players && lobby.map.minigame === minigame) {
                match_lobby = lobby;
            }
        });

        // a second run
        if (match_lobby === null) {
            Object.values(global.lobbies).forEach((lobby) => {
                // you can add additional checks for user rank, etc.
                // and your own matchmaking logic
                if (!lobby.full && lobby.map.minigame === minigame) {
                    match_lobby = lobby;
                }
        });
        }

        if (match_lobby === null) {
            trace('searching for a map for the minigame ' + minigame);
            var map = global.maps.find(map => map.minigame === minigame);
            trace('found: ' + map.toString());
            trace('all maps: ' + global.maps.toString());
            match_lobby = createLobby(map);
        }

        return match_lobby;
    }

    // if you want to implement an MMR system
    // result should be 1 if won, 0 if lost and 0.5 on draw
    static get_mmr_change(player_mmr, opponent_mmr, result) {
        const k = 100; // maximum possible gain/loss, when the weakest players wins from the best
        const mmr_scale = 800; // the bigger the number, the less the result changes with mmr difference. (e.x. chess uses 400, making a huge difference from even 200 mmr)

        const percent = (player_mmr + opponent_mmr) / player_mmr;
        const transformed_mmr1 = 10 ** (player_mmr / mmr_scale);
        const transformed_mmr2 = 10 ** (opponent_mmr / mmr_scale);

        const expected_result = transformed_mmr1 / (transformed_mmr1 + transformed_mmr2);

        return Math.round(k * (result - expected_result));
    }
}