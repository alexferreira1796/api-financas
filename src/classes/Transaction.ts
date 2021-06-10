import { v4 as uuidv4 } from 'uuid';

class Transaction {
  protected id: string;
  protected description: string;
  protected date: string;
  protected value: number;

  constructor(desc: string, date: string, value: number) {
    this.id = uuidv4();
    this.description = desc;
    this.date = date;
    this.value = value;
  }

  getId(): string {
    return this.id;
  }
}

export default Transaction;