
export default function Loader(props) {
    return React.createElement(
        "div",
        { id: "game-loader" },
        React.createElement(
            "p",
            null,
            "Loading..."
        )
    );
}