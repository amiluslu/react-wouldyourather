/* @flow */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/questions';

class Question extends Component {
  handleOptionClicked = function(option) {
    console.log(this.props)
    const { answerQuestion, authedUser, question } = this.props;
    const answer = option === 1 ? 'optionOne' : 'optionTwo';
    answerQuestion(authedUser, question.id, answer);
  }

  render() {
    const { authedUser, question, users } = this.props;
    const answers = Object.keys(users[authedUser].answers);
    const answered = answers.indexOf(question.id) > -1 ? true : false;
    const votesOptionOne = question.optionOne.votes.length;
    const votesOptionTwo = question.optionTwo.votes.length;
    const votesTotal = votesOptionOne + votesOptionTwo;
    const percentVotesOptionOne = (votesOptionOne / votesTotal).toFixed(2) * 100;
    const percentVotesOptionTwo = (votesOptionTwo / votesTotal).toFixed(2) * 100;

    return (
      <Link to={`/questions/${question.id}`} className='question'>
        <img
          src={`${users[question.author].avatarURL}`}
          className='avatar'
        />
        <span>Asked by {question.author}</span>
        <span>Would You Rather...</span>
        <div className='option'>
          <button
            className={
              question.optionOne.votes.indexOf(authedUser) > -1
              ? 'question-option-selected'
              : answered
                ? 'answered'
                : ''
            }
            onClick={(event) => this.handleOptionClicked(1)}
          >
            {question.optionOne.text}
          </button>
          {answered && <span className='stats'>
            Votes: {question.optionOne.votes.length} ({percentVotesOptionOne}%)
          </span>}
        </div>
        <div className='option opt-offset'>
          <button
            className={
              question.optionTwo.votes.indexOf(authedUser) > -1
              ? 'question-option-two question-option-selected'
              : answered
                ? 'question-option-two answered'
                : 'question-option-two'
            }
            onClick={(event) => this.handleOptionClicked(2)}
          >
            {question.optionTwo.text}
          </button>
          {answered && <span className='stats'>
            Votes: {question.optionTwo.votes.length} ({percentVotesOptionTwo}%)
          </span>}
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  console.log(actions)
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps, actions)(Question);
