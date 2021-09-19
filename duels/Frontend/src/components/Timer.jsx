
export default function Timer(props) {
    const [timer, setTimer] = React.useState(0);
    React.useEffect(() => {
        setInterval(() => {
            setTimer((prev_timer) => prev_timer+1);
            props.onChange(timer);
        }, 1000);
    }, []);

    var mins = (Math.round(timer / 60));
    var secs = (timer % 60);

    if (mins < 10)
        mins = "0" + mins;
    if (secs < 10)
        secs = "0" + secs;
    
    mins += '';
    secs += '';
    
    return (
        <h4 className="warning"> {mins+":"+secs}</h4>
    )
}