import React from 'react'
import QuestionCard from './QuestionCard'
import axios from 'axios'

class AllQuestionsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            questions: []
        }

    }

    componentDidMount() {
        const { id } = this.props
        const endpoint = `http://localhost:5000/api/questions/`;
        axios
          .get(endpoint)
          .then(res => {
            console.log("Askers data:", res.data);
            this.setState({
                questions: res.data
            })
          })
          .catch(err => {
            console.log("Can't retrieve asker info", err);
          });
    }


    render() {
        const { questions } = this.state


        return(
            <div>
                    <h1>Community Questions</h1>

            {questions.map( ({ title, question, id}) =>
                <QuestionCard id={id} title={title} question={question}  />
        
            )}
            
            </div>
        )
    }
}

export default AllQuestionsList