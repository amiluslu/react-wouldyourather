import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class Dashboard extends Component {
  state = {
    showAnswered: false,
  }

  handleFilterClicked = function(answered) {
    this.setState(function() {
      return {
        showAnswered: answered
      };
    });
  }

  render() {
    const { showAnswered } = this.state;
    const { authedUser, questions } = this.props;
    const questionsArray = Object.keys(questions).map((key) => questions[key]);
    const filteredQuestions = questionsArray.filter(function(question) {
      const contains = (
        question.optionOne.votes.indexOf(authedUser) > -1 ||
        question.optionTwo.votes.indexOf(authedUser) > -1
      );
      return showAnswered ? contains : !contains;
    });
    const sortedQuestions = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp);

    return (
      <div>
        <h3 className='center'>Dashboard</h3>
        <div className='btn-group'>
          <button
            className={!showAnswered ? 'btn-lft active' : 'btn-lft'}
            onClick={(event) => this.handleFilterClicked(false)}
          >
            Unanswered
          </button>
          <button
            className={showAnswered ? 'btn-rght active' : 'btn-rght'}
            onClick={(event) => this.handleFilterClicked(true)}
          >
            Answered
          </button>
        </div>
        <ul className='question-list'>
          {sortedQuestions.map((question) => (
            <li key={question.id}>
              <Question question={question} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users,
  };
}

export default connect(mapStateToProps)(Dashboard)
