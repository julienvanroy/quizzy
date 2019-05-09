import React, {Component} from 'react';

class Question extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        console.log('props', this.props);
    }

    handleChange(e) {
        e.preventDefault();
        this.props.onChoiceChange(e.target.value);
    }

    render() {
        const question = this.props.question;
        return (
            <div>
                <h3>{question.question}</h3>
                <ul className="flex wrap">
                    {question.answers.map((choice) => {
                        if(choice.image === true){
                            return (
                                <span className="image">
                                    <input type="radio" onChange={this.handleChange} name={choice.answerText}
                                           value={choice.valid}/><img key={Math.floor(Math.random() * Math.floor(1337))} src={choice.answerText} alt="reponse"/>
                                </span>)
                        } else return (
                            <span className="btn" key={Math.floor(Math.random() * Math.floor(1337))}>
                                <input type="radio" onChange={this.handleChange} name={choice.answerText}
                                       value={choice.valid}/> {choice.answerText}
                            </span>
                        )
                    })
                    }
                </ul>
            </div>
        );
    }
}

export default Question;
