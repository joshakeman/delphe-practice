import React from 'react';
import './App.css';
import axios from 'axios'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core'
import { styled } from '@material-ui/styles';
import { compose, spacing, palette } from '@material-ui/system';
import Box from '@material-ui/core/Box';

import QuestionsList from './components/QuestionsList'
import Dashboard from './components/Dashboard'

import QuestionCard from './components/QuestionCard'

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
}

class App extends React.Component {

  state = {
    selectedAnswer: {},
    answers: [],
    questions: [],
    userInfo: [],
    didReload: false
  }

  componentDidMount() {
    const id = 2
    const endpoint = `http://localhost:5000/api/users/${id}/questions`;
    axios
      .get(endpoint)
      .then(res => {
        console.log("Askers data:", res.data);
        this.setState({ userInfo: res.data });
        this.setState({ questions: res.data.questions });
        this.setState({ answers: res.data.answers });
        this.setState({ questionCount: res.data.questions.length });
        this.setState({ answerCount: res.data.answers.length });
      })
      .catch(err => {
        console.log("Can't retrieve asker info", err);
      });

    // GET Users (askers + experts) data
    const allUsers = "http://localhost:5000/api/users/";
    axios
      .get(allUsers)
      .then(res => {
        console.log("All Users:", res.data);
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log("Can't retrieve all users", err);
      });
  }

  addQuestion = question => {
    const questionObject = {
      ...question
    }
    questionObject.user_id = 2

    axios
      .post('http://localhost:5000/api/questions', questionObject)
      .then(res => {
        console.log("Updated questions:", res.data);
        // this.setState({ questions: res.data });
        this.setState({ didReload: !this.state.didReload });
      })
      .catch(err => {
        console.log("Can't retrieve all users", err);
      });
  }

  render() {
    const { questions, answers, questionCount, answerCount, userInfo } = this.state
    return (
      <Dashboard data={this.state} addQuestion={this.addQuestion}/>
    );
  }
}

export default App;
