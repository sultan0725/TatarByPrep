var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Loader from './../components/Loader.js';
import TestAnswer from '../components/TestAnswer.js';

var TestGame = function (_React$Component) {
    _inherits(TestGame, _React$Component);

    function TestGame(props) {
        _classCallCheck(this, TestGame);

        var _this = _possibleConstructorReturn(this, (TestGame.__proto__ || Object.getPrototypeOf(TestGame)).call(this, props));

        _this.state = {
            isLoaded: false,
            error: null,
            questions: window.tasks,
            question_id: 0,
            correct_answers: 0,
            wrong_answers: 0
        };

        // for testing
        _this.state = {
            isLoaded: true,
            error: null,
            question_id: 0,
            questions: [{
                question: "Как переводится слово \"алма\"?",
                answers: ["яблоко", "мясо", "рыба", "молоко"],
                correct: 0
            }, {
                question: "Как переводится слово \"ит\"?",
                answers: ["яблоко", "мясо", "рыба", "молоко"],
                correct: 1
            }, {
                question: "Как переводится слово \"балык\"?",
                answers: ["яблоко", "мясо", "рыба", "молоко"],
                correct: 2
            }, {
                question: "Как переводится слово \"алма\"?",
                answers: ["яблоко", "мясо", "рыба", "молоко"],
                correct: 0
            }, {
                question: "Как переводится слово \"алма\"?",
                answers: ["яблоко", "мясо", "рыба", "молоко"],
                correct: 0
            }],
            correct_answers: 0,
            wrong_answers: 0,

            my_points: 0,
            opponent_points: 0
        };
        return _this;
    }

    _createClass(TestGame, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            // fetch("/api/tasks/pimsleur/1/5")
            // .then(res => res.json())
            // .then((result) => {
            //     this.setState({
            //         isLoaded: true,
            //         questions: result
            //     });
            // }, (error) => {
            //     this.setState({
            //         isLoaded: true,
            //         error
            //     })
            // });

            client.on('task next', function (_ref) {
                var winner = _ref.winner;

                _this2.setState(function (prev_state) {
                    return {
                        question_id: prev_state.question_id + 1
                    };
                });
            });
        }
    }, {
        key: 'clickAnswer',
        value: function clickAnswer(answer_idx) {
            if (this.curr_question.correct === answer_idx) {
                // correct
                if (!window.duel) {
                    this.setState(function (prev_state) {
                        return {
                            correct_answers: prev_state.correct_answers + 1
                        };
                    });
                }
            } else {
                // incorrect
                if (!window.duel) {
                    this.setState(function (prev_state) {
                        return {
                            wrong_answers: prev_state.wrong_answers + 1
                        };
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            if (!this.state.isLoaded) {
                return React.createElement(Loader, null);
            } else if (this.state.error) {
                return React.createElement(
                    'div',
                    null,
                    '\u041E\u0448\u0438\u0431\u043A\u0430: ',
                    this.state.error
                );
            } else {
                // loaded fine
                return React.createElement(
                    'div',
                    { id: 'test-game-page', className: 'page' },
                    React.createElement(
                        'div',
                        { className: 'progress game-progress', style: { height: '50px' } },
                        React.createElement('div', {
                            className: 'progress-bar bg-success',
                            role: 'progressbar',
                            'aria-valuemin': '0',
                            'aria-valuemax': this.state.questions.length,
                            'aria-valuenow': this.state.correct_answers,
                            style: {
                                width: this.state.correct_answers / this.state.questions.length * 100 + '%'
                            }
                        }),
                        React.createElement('div', {
                            className: 'progress-bar bg-danger',
                            role: 'progressbar',
                            'aria-valuemin': '0',
                            'aria-valuemax': this.state.questions.length,
                            'aria-valuenow': this.state.wrong_answers,
                            style: {
                                width: this.state.wrong_answers / this.state.questions.length * 100 + '%'
                            }
                        })
                    ),
                    React.createElement(
                        'div',
                        { className: 'question' },
                        React.createElement(
                            'h2',
                            null,
                            this.curr_question.question
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'answers container' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-sm' },
                                React.createElement(TestAnswer, { key: 0, text: this.curr_question.answers[0], onClick: function onClick() {
                                        return _this3.clickAnswer(0);
                                    } })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm' },
                                React.createElement(TestAnswer, { key: 1, text: this.curr_question.answers[1], onClick: function onClick() {
                                        return _this3.clickAnswer(1);
                                    } })
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-sm' },
                                React.createElement(TestAnswer, { key: 2, text: this.curr_question.answers[2], onClick: function onClick() {
                                        return _this3.clickAnswer(2);
                                    } })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm' },
                                React.createElement(TestAnswer, { key: 3, text: this.curr_question.answers[3], onClick: function onClick() {
                                        return _this3.clickAnswer(3);
                                    } })
                            )
                        )
                    )
                );
            }
        }
    }, {
        key: 'curr_question',
        get: function get() {
            return this.state.questions[this.state.question_id];
        }
    }]);

    return TestGame;
}(React.Component);

export default TestGame;