import BaseError from './error';

export default class MissingParameterError extends BaseError {

  constructor(parameterName: string) {
    super(`Missing parameter: ${parameterName}`, 400);
  }
}