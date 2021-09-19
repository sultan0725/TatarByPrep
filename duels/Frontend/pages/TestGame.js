var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Loader from './../components/Loader.js';
import TestAnswer from '../components/TestAnswer.js';
import Timer from '../components/Timer.js';

var TestGame = function (_React$Component) {
    _inherits(TestGame, _React$Component);

    function TestGame(props) {
        _classCallCheck(this, TestGame);

        var _this = _possibleConstructorReturn(this, (TestGame.__proto__ || Object.getPrototypeOf(TestGame)).call(this, props));

        _this.state = {
            isLoaded: true,
            error: null,
            questions: window.tasks,
            question_id: 0,
            correct_answers: 0,
            wrong_answers: 0,

            won_answers: 0,
            lost_answers: 0,

            timer: 0,
            waiting: false
        };

        if (false) {
            // // for testing
            // this.state = {
            //     isLoaded: true,
            //     error: null,
            //     question_id: 0,
            //     questions: [
            //         {
            //             question: "Как переводится слово \"алма\"?",
            //             answers: ["яблоко", "мясо", "рыба", "молоко"],
            //             correct: 0
            //         },
            //         {
            //             question: "Как переводится слово \"ит\"?",
            //             answers: ["яблоко", "мясо", "рыба", "молоко"],
            //             correct: 1
            //         },
            //         {
            //             question: "Как переводится слово \"балык\"?",
            //             answers: ["яблоко", "мясо", "рыба", "молоко"],
            //             correct: 2
            //         },
            //         {
            //             question: "Как переводится слово \"алма\"?",
            //             answers: ["яблоко", "мясо", "рыба", "молоко"],
            //             correct: 0
            //         },
            //         {
            //             question: "Как переводится слово \"алма\"?",
            //             answers: ["яблоко", "мясо", "рыба", "молоко"],
            //             correct: 0
            //         }
            //     ],
            //     correct_answers: 0,
            //     wrong_answers: 0,

            //     my_points: 0,
            //     opponent_points: 0,

            //     timer: 0
            // };
        }
        return _this;
    }

    _createClass(TestGame, [{
        key: 'endQuiz',
        value: function endQuiz() {
            sendFinishTasks(this.state.won_answers, this.state.lost_answers);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            client.on('duel end', function (_ref) {
                var result = _ref.result;

                window.duel_result = result;
                _this2.props.setRoom('EndRoom');
            });

            // on "task next"
            client.on('task next', function (_ref2) {
                var won = _ref2.won;
                // "won" is a bool
                _this2.setState(function (prev_state) {
                    if (prev_state.question_id < _this2.state.questions.length - 1) {
                        return {
                            question_id: prev_state.question_id + 1
                        };
                    } else {
                        _this2.endQuiz();
                    }
                });

                // sweet sweet points
                if (window.duels) {
                    console.log('did i win the duel task?' + won);
                    if (won === true) {
                        _this2.setState(function (prev_state) {
                            return {
                                won_answers: prev_state.won_answers + 1
                            };
                        });
                    } else if (won === false) {
                        _this2.setState(function (prev_state) {
                            return {
                                lost_answers: prev_state.lost_answers + 1
                            };
                        });
                    } else {
                        // nobody won
                    }
                }
            });
        }
    }, {
        key: 'clickAnswer',
        value: function clickAnswer(answer_idx) {
            var _this3 = this;

            var correct = this.curr_question.correct === answer_idx;

            if (correct) {
                // correct
                if (!window.duels) {
                    this.setState(function (prev_state) {
                        if (prev_state.question_id === prev_state.questions.length - 1) {
                            _this3.endQuiz();
                            return {
                                correct_answers: prev_state.correct_answers + 1,
                                question_id: prev_state.question_id
                            };
                        }
                        return {
                            correct_answers: prev_state.correct_answers + 1,
                            question_id: prev_state.question_id + 1
                        };
                    });
                }
            } else {
                // incorrect
                if (!window.duels) {
                    this.setState(function (prev_state) {
                        if (prev_state.question_id === prev_state.questions.length - 1) {
                            _this3.endQuiz();
                            return {
                                wrong_answers: prev_state.wrong_answers + 1,
                                question_id: prev_state.question_id
                            };
                        }
                        return {
                            wrong_answers: prev_state.wrong_answers + 1,
                            question_id: prev_state.question_id + 1
                        };
                    });
                }
            }

            sendTaskAnswer(correct, this.state.timer);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

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
                    React.createElement(Timer, { onChange: function onChange(timer) {
                            _this4.setState({ timer: timer });
                        } }),
                    !window.duels ? React.createElement(
                        'div',
                        { className: 'progress game-progress', style: { height: '40px' } },
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
                    ) : React.createElement(
                        'div',
                        { className: 'progress game-progress', style: { height: '40px' } },
                        React.createElement(
                            'div',
                            {
                                className: 'progress-bar bg-success',
                                role: 'progressbar',
                                'aria-valuemin': '0',
                                'aria-valuemax': this.state.questions.length,
                                'aria-valuenow': this.state.won_answers,
                                style: {
                                    // width: "50%",
                                    width: (this.state.won_answers + this.state.lost_answers == 0 ? 1 : this.state.won_answers) * 100 + '%' // Math.max((this.state.lost_answers + this.state.won_answers), 1) 
                                }
                            },
                            this.state.won_answers
                        ),
                        React.createElement(
                            'div',
                            {
                                className: 'progress-bar bg-danger',
                                role: 'progressbar',
                                'aria-valuemin': '0',
                                'aria-valuemax': this.state.questions.length,
                                'aria-valuenow': this.state.lost_answers,
                                style: {
                                    // width: "50%",
                                    width: (this.state.won_answers + this.state.lost_answers == 0 ? 1 : this.state.lost_answers) * 100 + '%' // Math.max((this.state.lost_answers + this.state.won_answers), 1) 
                                }
                            },
                            this.state.lost_answers
                        )
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
                                React.createElement(TestAnswer, { key: 0, text: this.curr_question.answers[0].toLowerCase(), onClick: function onClick() {
                                        return _this4.clickAnswer(0);
                                    } })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm' },
                                React.createElement(TestAnswer, { key: 1, text: this.curr_question.answers[1].toLowerCase(), onClick: function onClick() {
                                        return _this4.clickAnswer(1);
                                    } })
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-sm' },
                                React.createElement(TestAnswer, { key: 2, text: this.curr_question.answers[2].toLowerCase(), onClick: function onClick() {
                                        return _this4.clickAnswer(2);
                                    } })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm' },
                                React.createElement(TestAnswer, { key: 3, text: this.curr_question.answers[3].toLowerCase(), onClick: function onClick() {
                                        return _this4.clickAnswer(3);
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