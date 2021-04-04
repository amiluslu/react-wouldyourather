import { getInitialData } from '../utils/api';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';

export function handleInitialData() {
  return function(dispatch) {
    getInitialData()
      .then(function({ users, questions }) {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
      });
  }
}
