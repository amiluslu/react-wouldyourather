import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser, clearAuthedUser } from '../actions/authedUser';

class Login extends Component {
  state = {
    userId: null,
    toHome: false,
  }

  handleSelectionChanged = function(event) {
    const userId = event.target.value;

    this.setState(function(previousState) {
      return {
        ...previousState,
        userId,
      };
    });
  }

  handleLogin = function(event) {
    const { userId } = this.state;
    const { dispatch } = this.props;

    dispatch(setAuthedUser(userId));

    this.setState(function(previousState) {
      return {
        ...previousState,
        toHome: true,
      };
    });
  }

  componentDidMount() {
    this.props.dispatch(clearAuthedUser())
  }

  render() {
    // const { userId, toHome } = this.state
    const { userId, toHome } = this.state;
    const { history, users } = this.props;
    const selected = userId ? userId : -1;
    const avatar = userId ? users[userId].avatarURL : 'https://gravatar.com/avatar/d491e6f23348d30b34a4140af4169fec?s=400&d=mp&r=x';


    if(toHome) {
      const redirect = history.location.state;
      if (redirect != null) {
        return <Redirect to={redirect} push={true} />
      }
      return <Redirect to='/' />
    }

    return (
      <div>
        <h3 className='center'>Login</h3>
        <div className='login-box'>
          <span>Please select a user and press the login button.</span>
          <div className='user-select'>
           <img
              src={avatar}
              className='avatar'
            />
            <select value={selected} onChange={(event) => this.handleSelectionChanged(event)}>
              <option value={-1} disabled>Select user...</option>
              {Object.keys(users).map(function(key) {
                return (
                  <option value={users[key].id} key={key}>{users[key].name}</option>
                );
              })}
            </select>
          </div>
          <button
            className='btn'
            disabled={userId === null}
            onClick={(event) => this.handleLogin(event)}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login))


