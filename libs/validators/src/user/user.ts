export class UserValidator {
  /**
   * A function to validate username and password values received by the request body (so before any other operations).
   * @param user an object (hopefully) containing the username and password properties.
   * @returns throws an Error when it encounters an invalid value, otherwise void.
   */
  public throwErrorOnInvalidNameOrPassword(user: {
    [key: string]: any;
  }): Error | void {
    // Strip object down to only username and password properties:
    const { username, password } = user;

    // Check if the object had any username or password properties:
    if (typeof username === 'undefined')
      throw new Error('Username was not provided!');
    if (typeof password === 'undefined')
      throw new Error('Password was not provided!');

    // Validate that it is actually a string:
    if (typeof username !== 'string')
      throw new Error('Username must be a string!');
    if (typeof password !== 'string')
      throw new Error('Password must be a string!');

    // Validate username and password lengths (password is 128 characters after Node.js Scrypt encrypts it).
    if (username.length < 5)
      throw new Error('Username must be 5 characters or more!');
    if (username.length > 28)
      throw new Error('Username must be 28 characters or less!');
    if (password.length < 5)
      throw new Error('Password must be 5 characters or more!');
    if (password.length > 50)
      throw new Error('Password must be 50 characters or less!');

    if (username == password)
      throw new Error('Username and Password cannot be the same!');

    return;
  }
}
