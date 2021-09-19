import GameTitleCard from "../components/GameTitleCard.js";

export default function GamesList(props) {
    const games_list = [
        { game_id: "duels", game_name: "Дуэли!", duel: true, game_desc: "Сражайся с другими игроками в реальном времени!" },
        { game_id: "wordtrans", game_name: "Слово-перевод", game_desc: "Выберите один правильный из четырех вариантов перевода татарского слова"},
        { game_id: "transword", game_name: "Перевод-слово", game_desc: "Выберите один правильный из четырех вариантов перевода слова на татарский"},
    ];

    return (
        <div id="games-list-page" class="page">
            <div id="games-list-page-container">
                <div id=""></div>
                <div id="games-list">
                    <div className="row">
                        {games_list.map((game, idx) => (
                            <GameTitleCard key={idx} {...game} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}