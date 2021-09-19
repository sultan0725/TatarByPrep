
export default function GameTitleCard(props) {
    var classes = ["card", "game-title-card", "m-2"];
    if (props.duel) {
        classes.push("border-warning");
    }

    var button_classes = ["btn", "btn-block", "btn-game-play"];
    if (props.duel) {
        button_classes.push("btn-warning");
    } else {
        button_classes.push("btn-success");
    }

    return React.createElement(
        "div",
        { className: classes.join(" ") },
        React.createElement(
            "div",
            { className: "game-title-card-content" },
            React.createElement(
                "div",
                { className: "card-header" },
                props.game_name
            ),
            React.createElement(
                "div",
                { className: "card-body" },
                React.createElement(
                    "p",
                    null,
                    props.game_desc
                ),
                React.createElement(
                    "a",
                    { href: "/games/" + props.game_id },
                    React.createElement(
                        "button",
                        { className: button_classes.join(" ") },
                        "\u0418\u0433\u0440\u0430\u0442\u044C!"
                    )
                )
            )
        )
    );
}