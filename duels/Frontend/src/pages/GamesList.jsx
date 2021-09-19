import GameTitleCard from "../components/GameTitleCard.js";

export default function GamesList(props) {
    const games_list = [
        { game_id: "duels", game_name: "Дуэли!", duels: true, game_desc: "Сражайся с другими игроками в реальном времени на знание татарского языка!" },
        { game_id: "word-trans", game_name: "Слово-перевод", game_desc: "Выберите один правильный из четырех вариантов перевода татарского слова"},
        { game_id: "trans-word", game_name: "Перевод-слово", game_desc: "Выберите один правильный из четырех вариантов перевода слова на татарский"},
        { game_id: "4th-out", game_name: "Четвертый лишний", game_desc: "Выберите одно лишнее из четырех татарских слов"},
    ];

    React.useEffect(() => {
        client.on('play', (data) => {
            window.tasks = data.tasks;
            window.minigame = data.minigame;
            window.duels = data.minigame == 'duels';
            props.setPage('TestGame');
        })
    }, []);

    return (
        <div id="games-list-page" className="page">
            <div id="games-list-page-container">
                <div id="idk"></div>
                <div id="games-list">
                    <div className="row">
                        {games_list.map((game, idx) => (
                            <GameTitleCard key={idx} {...game} setPage={props.setPage} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}