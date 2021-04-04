import { ANSWER_QUESTION } from '../actions/questions';

export default function checker(store) {
  return function(next) {
    return function(action) {
      if (action.type === ANSWER_QUESTION) {
        const users = store.getState().users;
        const answers = Object.keys(users[action.authedUser].answers);
        if (answers.indexOf(action.qid) > -1) {
          return alert('You can only answer a question once.');
        }
      }
      return next(action);
    }
  };
}
