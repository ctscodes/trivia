import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class App extends Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    params: React.PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      questions: [],
      difficulty: props.params.difficulty,
      correctAnswers: 0,
      incorrectAnswers: 0,
      win: false,
      lose: false
    }
  }

  startGame = () => {
    let difficulty = this.state.difficulty
    let url = `https://beoderp.herokuapp.com/${difficulty}questions`
    window.fetch(url, { method: 'GET', headers: { 'Authorization': 'Bearer Chris' } })
       .then((resp) => { return resp.json() })
       .then((data) => {
         this.setState({ questions: data })
         if (!this.props.params.difficulty) {
           browserHistory.push(`/game/${difficulty}`)
         }
       })
  }

  setDifficulty = (event) => {
    this.setState({difficulty: event.target.value})
  }

  incrementCorrect = () => {
    const newScore = this.state.correctAnswers + 1
    this.setState({ correctAnswers: newScore, win: newScore >= 5 })
    if (newScore >= 5) {
      window.alert('You Win')
    } else if (newScore) {
      browserHistory.push(`/game/${this.state.difficulty}`)
    }
  }

  incrementIncorrect = () => {
    const newScore = this.state.incorrectAnswers + 1
    this.setState({ incorrectAnswers: newScore, lose: newScore >= 5 })
    if (newScore >= 5) {
      window.alert('You Lose')
    } else if (newScore) {
      browserHistory.push(`/game/${this.state.difficulty}`)
    }
  }

  render () {
    return <div className='startscreen'>
      <h1>Batman vs The Riddler!</h1>
      <div className='correct'>Correct Answers: {this.state.correctAnswers}</div>
      <div className='incorrect'>Incorrect Answers: {this.state.incorrectAnswers}</div>
      {React.cloneElement(this.props.children, { setDifficulty: this.setDifficulty, startGame: this.startGame, questions: this.state.questions, difficulty: this.state.difficulty, incrementCorrect: this.incrementCorrect, incrementIncorrect: this.incrementIncorrect })}
    </div>
  }
}

export default App
