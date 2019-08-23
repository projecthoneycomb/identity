export default class DatabaseError extends Error {

  code: number;
  
  constructor(error: Error) {
    super(error.message);
    
    this.name = this.constructor.name;
    this.message = error.message;
    this.code = 500;
    this.stack = error.stack;
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