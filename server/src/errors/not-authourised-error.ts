import BaseError from './error';

export default class NotAuthorisedError extends BaseError {

  constructor(message: string = 'You are not authorised to perform this action.') {
    super(message, 403);
  }
}