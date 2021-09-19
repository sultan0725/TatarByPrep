export default function TestAnswer(props) {
    return (
        <button className="btn btn-test-answer btn-outline-success btn-lg btn-block" onClick={props.onClick}>{props.text}</button>
    )
}