// @flow
import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA.js';

export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(function([users, questions]) {
    return {
      users,
      questions,
    };
  });
};

export function saveQuestion(info: string) {
  return _saveQuestion(info);
};

export function saveQuestionAnswer(info: string) {
  return _saveQuestionAnswer(info);
}
