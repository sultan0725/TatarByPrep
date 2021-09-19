import GameTitleCard from "../components/GameTitleCard.js";

export default function GamesList(props) {
    var games_list = [{ game_id: "duels", game_name: "Дуэли!", duels: true, game_desc: "Сражайся с другими игроками в реальном времени на знание татарского языка!" }, { game_id: "word-trans", game_name: "Слово-перевод", game_desc: "Выберите один правильный из четырех вариантов перевода татарского слова" }, { game_id: "trans-word", game_name: "Перевод-слово", game_desc: "Выберите один правильный из четырех вариантов перевода слова на татарский" }, { game_id: "4th-out", game_name: "Четвертый лишний", game_desc: "Выберите одно лишнее из четырех татарских слов" }];

    React.useEffect(function () {
        client.on('play', function (data) {
            window.tasks = data.tasks;
            window.minigame = data.minigame;
            window.duels = data.minigame == 'duels';
            props.setPage('TestGame');
        });
    }, []);

    return React.createElement(
        "div",
        { id: "games-list-page", className: "page" },
        React.createElement(
            "div",
            { id: "games-list-page-container" },
            React.createElement("div", { id: "idk" }),
            React.createElement(
                "div",
                { id: "games-list" },
                React.createElement(
                    "div",
                    { className: "row" },
                    games_list.map(function (game, idx) {
                        return React.createElement(GameTitleCard, Object.assign({ key: idx }, game, { setPage: props.setPage }));
                    })
                )
            )
        )
    );
}