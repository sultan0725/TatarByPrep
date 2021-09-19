import * as pages from './pages.js';
window.page_id = 'TestGame';
// window.page_id = 'GamesList';

var page;
switch(window.page_id) {
    case 'GamesList':
        page = pages.GamesList;
        break;
    case 'TestGame':
        page = pages.TestGame;
        break;
    default:
        console.error('UNABLE TO FIND THE PAGE! page_id: ' + window.page_id);
        break;
}

const documentRoot = document.querySelector('#game-wrapper');
ReactDOM.render(React.createElement(page), documentRoot);