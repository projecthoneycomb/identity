import BaseError from './error';

export default class NotFoundError extends BaseError {
  
  constructor(message: string) {
    super(message, 404);
  }
}