export class User {

  public email: string;
  public password: string;
  public name: string;
  public id?: number;

  constructor(email: string, password: string, name: string) {
    this.email = email;
    this.password = password;
    this.name = name;
  }

    getData(): object {
        const result = {};
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }
}
