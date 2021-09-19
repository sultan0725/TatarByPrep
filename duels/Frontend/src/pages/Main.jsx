import * as pages from './../pages.js';

export default function Main(props) {
    const [page, setPage] = React.useState('GamesList');

    return (
        React.createElement(pages[page], { setPage: setPage })
    );
}