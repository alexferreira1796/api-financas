import { v4 as uuidv4 } from 'uuid';
import Transaction from './Transaction';
import ITransactions from '../interfaces/ITransactions';


class User {
  protected id: string;
  protected name: string;
  protected email: string;
  protected password: string;
  protected balance: number;
  protected transactions: Array<Transaction>;

  constructor(name: string, email: string, pass: string) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.password = pass;
    this.balance = 0;
    this.transactions = [];
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  setBalance() {
    const transaction = this.getTransaction();
    if(transaction) {
      this.balance = 0;
      let sum: number = 0;
      transaction.forEach(item => {
        if(item.getDescription() === "despesa") {
          sum -= Number(item.getValue());
        } else {
          sum += Number(item.getValue());
        }
      });
      this.balance = this.balance + sum;
    }
  }

  getTransaction(id?: string) {
    if(id) {
      const hasTransaction = this.transactions.filter((item) => item.getId() === id);
      if(hasTransaction.length <= 0) {
        return false;
      }
      return hasTransaction;
    } else {
      return this.transactions;
    }
  }

  removeTransaction(id: string) {
    const transaction = this.getTransaction(id);
    if(transaction) {
      const all = this.getTransaction();
      if(all) {
        const hasTransaction = all.filter((item) => item.getId() !== id);
        this.transactions = hasTransaction || [];
        this.setBalance();
        return this.transactions;
      } else {
        return false;
      }
    } 
    return false;
  }

  saveTransaction(data: ITransactions): Transaction[]  {
    const newDate = new Transaction(data.description, data.date, data.value);
    this.transactions.push(newDate);
    this.setBalance();
    return this.transactions;
  }

}

export default User;