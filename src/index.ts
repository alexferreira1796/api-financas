import express, { Request, Response } from 'express';
import cors from 'cors';

// Interfaces
import IUser from './interfaces/IUser';
import ITransactions from './interfaces/ITransactions';

// Classes
import User from './classes/User';

// Banco de dados
import data from './data';

// Middleware
import validUser from './middlewares/md-valid-user';
import validEmailPassUser from './middlewares/md-valid-email-pass-user';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3000;
app.listen(port, () => {});

app.get("/", (req: Request, res: Response) => {
  res.send(`
  <body style='margin:0;padding:0'>
      <div style='display: flex;justify-content: center;align-items: center; align-content: center;width:99vw;height:99vh'>
        <h1 style='font-size:60px;font-weigth:600'>🚀 API Finanças</h1>
      </div>
  </body>
  `);
});

// GET all users
app.get("/users/", (req: Request, res: Response) => {
  const users = data.map((item) => ({
    id: item.getId(),
    name: item.getName(), 
    email: item.getEmail()
  }));
  return res.status(200).json({
    success: true,
    msg: "Users list",
    data: users
  })
});

// Add new user
app.post("/add/user", [validUser], (req: Request, res: Response) => {
  const {name, email, password}: IUser = req.body;

  const newUser = new User(name, email, password);

  data.push(newUser);

  return res.status(201).json({
    success: true,
    msg: 'User added successfully',
    data
  });

});

// Login for email anda pass
app.get("/user/:email/:password", [validUser, validEmailPassUser], (req: Request, res: Response) => {
  const {data} = req.body;

  return res.status(201).json({
    success: true,
    msg: 'Use exists',
    data: data
  });

});

// GET user for ID
app.get("/user/:id", [validUser], (req: Request, res: Response) => {
  const {data} = req.body;

  return res.status(201).json({
    success: true,
    msg: 'Use exists',
    data: data
  });

});

// POST Transaction
app.post("/user/:id/transaction", [validUser], (req: Request, res: Response) => {
  const {description, date, value}: ITransactions = req.body;
  const {data} = req.body;

  if(description && date && value) {

    if(description !== 'despesa' && description !== 'receita' ) {
      return res.status(400).json({
        success: false,
        msg: 'Description invalid',
        data: null
      });
    }

      const result = data[0].saveTransaction({description, date, value});

      return res.status(200).json({
        success: true,
        msg: 'Transaction add with success',
        data: result
      })

    } else {
      return res.status(400).json({
        success: false,
        msg: 'Fail, fill all fields',
        data: null
      });
    }
});

// DELETE Transaction
app.delete("/user/:id/transaction/:idTransaction", [validUser], (req: Request, res: Response) => {
  const {idTransaction}: {idTransaction?: string} = req.params;
  const {data} = req.body;

  const result = data[0].removeTransaction(idTransaction);
  if(!result) {
    return res.status(400).json({
      success: false,
      msg: 'Transaction not found',
      data: null
    })
  }

  return res.status(200).json({
    success: true,
    msg: 'Transaction delted with success',
    data: result
  });

});