import GameTitleCard from "../components/GameTitleCard.js";

export default function GamesList(props) {
    var games_list = [{ game_id: "duels", game_name: "Дуэли!", duel: true, game_desc: "Сражайся с другими игроками в реальном времени!" }, { game_id: "wordtrans", game_name: "Слово-перевод", game_desc: "Выберите один правильный из четырех вариантов перевода татарского слова" }, { game_id: "transword", game_name: "Перевод-слово", game_desc: "Выберите один правильный из четырех вариантов перевода слова на татарский" }];

    return React.createElement(
        "div",
        { id: "games-list-page", "class": "page" },
        React.createElement(
            "div",
            { id: "games-list-page-container" },
            React.createElement("div", { id: "" }),
            React.createElement(
                "div",
                { id: "games-list" },
                React.createElement(
                    "div",
                    { className: "row" },
                    games_list.map(function (game, idx) {
                        return React.createElement(GameTitleCard, Object.assign({ key: idx }, game));
                    })
                )
            )
        )
    );
}