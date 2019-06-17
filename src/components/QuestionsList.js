import React from 'react'
import QuestionCard from './QuestionCard'

class QuestionsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }



    render() {
        const { questions, userInfo } = this.props.data

        return(
            <div>

            {questions.map( ({ title, question, id}) =>
                <QuestionCard id={id} title={title} question={question} userInfo={userInfo} />
            )}
            
            </div>
        )
    }
}

export default QuestionsList