import BaseError from './error';

export default class DatabaseError extends BaseError {

  constructor(error: Error) {
    super(error.message, 400);
  }
}