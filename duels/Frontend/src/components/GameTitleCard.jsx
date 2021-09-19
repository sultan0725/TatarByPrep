
export default function GameTitleCard(props) {
    const classes = ["card", "game-title-card", "m-2"];
    if (props.duels) {
        classes.push("border-warning");
    }
    
    const button_classes = ["btn", "btn-block", "btn-game-play"]
    if (props.duels) {
        button_classes.push("btn-warning");
    }
    else {
        button_classes.push("btn-success");
    }

    return (
        <div className={classes.join(" ")}>
            <div className="game-title-card-content">
                <div className="card-header">{props.game_name}</div>
                <div className="card-body">
                    <p>{props.game_desc}</p>
                    {/* <a href={"/games/"+props.game_id}> */}
                        <button className={button_classes.join(" ")} onClick={() => {
                            // if (props.duels)
                            //     window.duels = true;
                            // else window.duels = false;

                            // window.minigame = 

                            // setPage('TestGame');
                            sendJoinLobby(props.game_id);
                        }}>
                            Играть!
                        </button>
                    {/* </a> */}
                </div>
            </div>
        </div>
    )
}