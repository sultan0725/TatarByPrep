
export default function EndRoom(props) {

    return (
        <div className="page" style={{justifyContent: 'center', display: 'flex', flexDirection: 'initial'}}>
            <h2 style={{flex: 1}}>
                {window.duel_result}
            </h2>
        </div>
    )
}