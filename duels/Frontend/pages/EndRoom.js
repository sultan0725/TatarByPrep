
export default function EndRoom(props) {

    return React.createElement(
        'div',
        { className: 'page', style: { justifyContent: 'center', display: 'flex', flexDirection: 'initial' } },
        React.createElement(
            'h2',
            { style: { flex: 1 } },
            window.duel_result
        )
    );
}