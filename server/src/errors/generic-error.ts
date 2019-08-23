export default class GenericError extends Error {

  code: number;
  
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.code = 500;
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