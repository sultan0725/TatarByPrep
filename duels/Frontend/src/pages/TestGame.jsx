import Loader from './../components/Loader.js';
import TestAnswer from '../components/TestAnswer.js';
import Timer from '../components/Timer.js';

export default class TestGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
    }

    endQuiz() {
        sendFinishTasks(this.state.won_answers, this.state.lost_answers);
    }

    componentDidMount() {
        client.on('duel end', ({result}) => {
            window.duel_result = result;
            this.props.setRoom('EndRoom');
        });

        // on "task next"
        client.on('task next', ({ won }) => { // "won" is a bool
            this.setState((prev_state) => {
                if (prev_state.question_id < this.state.questions.length - 1) {
                    return {
                        question_id: prev_state.question_id+1
                    }
                }
                else {
                    this.endQuiz();
                }
            });

            // sweet sweet points
            if (window.duels) {
                console.log('did i win the duel task?' + won);
                if (won === true) {
                    this.setState((prev_state) => {
                        return {
                            won_answers: prev_state.won_answers+1
                        }
                    })
                }
                else if(won === false) {
                    this.setState((prev_state) => {
                        return {
                            lost_answers: prev_state.lost_answers+1
                        }
                    })
                }
                else {
                    // nobody won
                }
            }
        })
    }

    get curr_question() {
        return this.state.questions[this.state.question_id];
    }

    clickAnswer(answer_idx) {
        const correct = this.curr_question.correct === answer_idx;

        if (correct) { // correct
            if (!window.duels) {
                this.setState((prev_state) => {
                    if (prev_state.question_id === prev_state.questions.length-1) {
                        this.endQuiz();
                        return {
                            correct_answers: prev_state.correct_answers+1,
                            question_id: prev_state.question_id
                        }
                    }
                    return {
                        correct_answers: prev_state.correct_answers+1,
                        question_id: prev_state.question_id+1
                    }
                })
            }
        }
        else { // incorrect
            if (!window.duels) {
                this.setState((prev_state) => {
                    if (prev_state.question_id === prev_state.questions.length-1) {
                        this.endQuiz();
                        return {
                            wrong_answers: prev_state.wrong_answers+1,
                            question_id: prev_state.question_id
                        }
                    }
                    return {
                        wrong_answers: prev_state.wrong_answers+1,
                        question_id: prev_state.question_id+1
                    }
                })
            }
        }

        sendTaskAnswer(correct, this.state.timer);
    }

    render() {
        if (!this.state.isLoaded) {
            return <Loader />;
        }
        else if(this.state.error) {
            return <div>Ошибка: {this.state.error}</div>;
        }
        else { // loaded fine
            return (
                <div id="test-game-page" className="page">
                    {/* <button onClick={() => {this.setState({correct_answers: this.state.correct_answers+1})}}>+</button> */}
                    {/* <p>{this.state.correct_answers + this.state.wrong_answers}/{this.state.questions.length}</p> */}
                    <Timer onChange={(timer) => { this.setState({timer: timer}) }} />
                    {/* <div>{this.state.correct_answers}</div>
                    <div>{this.state.wrong_answers}</div> */}
                        {
                            !window.duels ? (
                                <div className="progress game-progress" style={{height: '40px'}}>
                                    <div
                                        className="progress-bar bg-success"
                                        role="progressbar"
                                        aria-valuemin="0"
                                        aria-valuemax={this.state.questions.length}
                                        aria-valuenow={this.state.correct_answers}
                                        style={{
                                            width: this.state.correct_answers / this.state.questions.length * 100 + '%',
                                        }}
                                    />
                                    <div
                                        className={'progress-bar bg-danger'}
                                        role="progressbar"
                                        aria-valuemin="0"
                                        aria-valuemax={this.state.questions.length}
                                        aria-valuenow={this.state.wrong_answers}
                                        style={{
                                            width: this.state.wrong_answers / this.state.questions.length * 100 + '%',
                                        }}
                                    />
                                </div>)
                            : (
                                <div className="progress game-progress" style={{height: '40px'}}>
                                    <div
                                        className="progress-bar bg-success"
                                        role="progressbar"
                                        aria-valuemin="0"
                                        aria-valuemax={this.state.questions.length}
                                        aria-valuenow={this.state.won_answers}
                                        style={{
                                            // width: "50%",
                                            width: (this.state.won_answers + this.state.lost_answers == 0 ? 1 : this.state.won_answers) * 100 + '%', // Math.max((this.state.lost_answers + this.state.won_answers), 1) 
                                        }}
                                    >
                                        {this.state.won_answers}
                                    </div>
                                    <div
                                        className={'progress-bar bg-danger'}
                                        role="progressbar"
                                        aria-valuemin="0"
                                        aria-valuemax={this.state.questions.length}
                                        aria-valuenow={this.state.lost_answers}
                                        style={{
                                            // width: "50%",
                                            width: (this.state.won_answers + this.state.lost_answers == 0 ? 1 : this.state.lost_answers) * 100 + '%', // Math.max((this.state.lost_answers + this.state.won_answers), 1) 
                                        }}
                                    >
                                        {this.state.lost_answers}
                                    </div>
                                </div>
                            )
                        }
                    {/* <div className="progress game-progress">
                        <div
                            className="progress-bar bg-black"
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax={this.state.questions.length}
                            aria-valuenow={this.state.correct_answers+this.state.wrong_answers}
                            style={{
                                width: (this.state.correct_answers + this.state.wrong_answers) / this.state.questions.length * 100 + '%',
                                // marginTop: -20
                            }}
                        >
                            {this.state.correct_answers + this.state.wrong_answers}/{this.state.questions.length}
                        </div>
                    </div> */}
                    <div className="question">
                        <h2>
                        {this.curr_question.question}
                        </h2>
                    </div>
                    <div className="answers container">
                        <div className="row">
                            <div className="col-sm">
                                <TestAnswer key={0} text={this.curr_question.answers[0].toLowerCase()} onClick={() => this.clickAnswer(0)} />
                            </div>
                            <div className="col-sm">
                                <TestAnswer key={1} text={this.curr_question.answers[1].toLowerCase()} onClick={() => this.clickAnswer(1)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <TestAnswer key={2} text={this.curr_question.answers[2].toLowerCase()} onClick={() => this.clickAnswer(2)} />
                            </div>
                            <div className="col-sm">
                                <TestAnswer key={3} text={this.curr_question.answers[3].toLowerCase()} onClick={() => this.clickAnswer(3)} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

}