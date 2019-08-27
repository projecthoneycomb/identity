export default class BaseError extends Error {

  code: number;
  name: string;
  stack?: string;
  message: string;
  
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    const json: any = {
      name: this.name,
      message: this.message,
      code: this.code
    }

    if(process.env.NODE_ENV === 'development') {
      json.stack = this.stack;
    }

    return json;
  }
}