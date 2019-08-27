import BaseError from './error';

export default class GenericError extends BaseError {
  
  constructor(message: string) {
    super(message, 500);
  }
}