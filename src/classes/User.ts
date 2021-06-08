import { v4 as uuidv4 } from 'uuid';

class User {
  protected id: string;
  protected name: string;
  protected email: string;
  protected password: string;
  protected balance: number;

  constructor(name: string, email: string, pass: string) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.password = pass;
    this.balance = 0;
  }

  getId(): string {
    return this.id;
  }

}

export default User;