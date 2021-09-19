var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

export default function Timer(props) {
    var _React$useState = React.useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        timer = _React$useState2[0],
        setTimer = _React$useState2[1];

    React.useEffect(function () {
        setInterval(function () {
            setTimer(function (prev_timer) {
                return prev_timer + 1;
            });
            props.onChange(timer);
        }, 1000);
    }, []);

    var mins = Math.round(timer / 60);
    var secs = timer % 60;

    if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;

    mins += '';
    secs += '';

    return React.createElement(
        "h4",
        { className: "warning" },
        " ",
        mins + ":" + secs
    );
}