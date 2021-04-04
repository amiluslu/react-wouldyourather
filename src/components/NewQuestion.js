import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  }

  handleChange = function(event, optionIndex) {
    const text = event.target.value;

    this.setState(function(previousState) {
      return optionIndex === 1
        ? { ...previousState, 'optionOne': text }
        : { ...previousState, 'optionTwo': text };
    });
  }

  handleSubmit = function(event) {
    event.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion(optionOne, optionTwo));

    this.setState(function(previousState) {
      return {
        ...previousState,
        toHome: true,
      };
    })
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state;
    const { authedUser, users } = this.props;
    console.log(authedUser)
    console.log(users)

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <h3 className='center'>New Question</h3>
        <div className='question'>
          <img
            src={`${users[authedUser].avatarURL}`}
            className='avatar'
          />
          <span>
            Would You Rather...
          </span>
          <form
            onSubmit={(event) => this.handleSubmit(event)}
          >
            <div className="option">
              <textarea
                value={optionOne}
                onChange={(event) => this.handleChange(event, 1)}
              />
              <span className='hint'>
                Option One
              </span>
            </div>
            <div className="option opt-offset">
              <textarea
                value={optionTwo}
                onChange={(event) => this.handleChange(event, 2)}
              />
              <span className='hint'>
                Option Two
              </span>
            </div>
            <button
              className='btn'
              type='submit'
              disabled={optionOne === '' || optionTwo === ''}
            >
              ASK
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(NewQuestion)
