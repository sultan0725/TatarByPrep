export default function TestAnswer(props) {
    return React.createElement(
        "button",
        { className: "btn btn-test-answer btn-outline-success btn-lg btn-block", onClick: props.onClick },
        props.text
    );
}