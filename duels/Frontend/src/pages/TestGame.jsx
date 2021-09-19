import Loader from './../components/Loader.js';
import TestAnswer from '../components/TestAnswer.js';

export default class TestGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            questions: window.tasks,
            question_id: 0,
            correct_answers: 0,
            wrong_answers: 0
        };

        // for testing
        this.state = {
            isLoaded: true,
            error: null,
            question_id: 0,
            questions: [
                {
                    question: "Как переводится слово \"алма\"?",
                    answers: ["яблоко", "мясо", "рыба", "молоко"],
                    correct: 0
                },
                {
                    question: "Как переводится слово \"ит\"?",
                    answers: ["яблоко", "мясо", "рыба", "молоко"],
                    correct: 1
                },
                {
                    question: "Как переводится слово \"балык\"?",
                    answers: ["яблоко", "мясо", "рыба", "молоко"],
                    correct: 2
                },
                {
                    question: "Как переводится слово \"алма\"?",
                    answers: ["яблоко", "мясо", "рыба", "молоко"],
                    correct: 0
                },
                {
                    question: "Как переводится слово \"алма\"?",
                    answers: ["яблоко", "мясо", "рыба", "молоко"],
                    correct: 0
                }
            ],
            correct_answers: 0,
            wrong_answers: 0,

            my_points: 0,
            opponent_points: 0
        };
    }

    componentDidMount() {
        
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

        client.on('task next', ({ winner }) => {
            this.setState((prev_state) => {
                return {
                    question_id: prev_state.question_id+1
                }
            });

            
        })
    }

    get curr_question() {
        return this.state.questions[this.state.question_id];
    }

    clickAnswer(answer_idx) {
        if (this.curr_question.correct === answer_idx) { // correct
            if (!window.duel) {
                this.setState((prev_state) => {
                    return {
                        correct_answers: prev_state.correct_answers+1
                    }
                })
            }
        }
        else { // incorrect
            if (!window.duel) {
                this.setState((prev_state) => {
                    return {
                        wrong_answers: prev_state.wrong_answers+1
                    }
                })
            }
        }
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
                    <div className="progress game-progress" style={{height: '50px'}}>
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
                            className="progress-bar bg-danger"
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax={this.state.questions.length}
                            aria-valuenow={this.state.wrong_answers}
                            style={{
                                width: this.state.wrong_answers / this.state.questions.length * 100 + '%',
                            }}
                        />
                    </div>
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
                        {/* {'Placeholder question?'} */}
                        </h2>
                    </div>
                    <div className="answers container">
                        <div className="row">
                            <div className="col-sm">
                                <TestAnswer key={0} text={this.curr_question.answers[0]} onClick={() => this.clickAnswer(0)} />
                            </div>
                            <div className="col-sm">
                                <TestAnswer key={1} text={this.curr_question.answers[1]} onClick={() => this.clickAnswer(1)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <TestAnswer key={2} text={this.curr_question.answers[2]} onClick={() => this.clickAnswer(2)} />
                            </div>
                            <div className="col-sm">
                                <TestAnswer key={3} text={this.curr_question.answers[3]} onClick={() => this.clickAnswer(3)} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

}