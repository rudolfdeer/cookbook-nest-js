export {};

class InternalError {
  message: string;

  constructor(err = new Error()) {
    this.message = err.message;
  }
}

module.exports = {
  InternalError,
};
