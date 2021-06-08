import express, { Request, Response } from 'express';
import cors from 'cors';

// Interfaces
import IUser from './interfaces/IUser';

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
  const {email, password}: {email?: string, password?: string} = req.params;
  const {data} = req.body;

  return res.status(201).json({
    success: true,
    msg: 'Use exists',
    data: data
  });

});

// GET user for ID
app.get("/user/:id", [validUser], (req: Request, res: Response) => {
  const {id}: {id?: string} = req.params;
  const {data} = req.body;

  return res.status(201).json({
    success: true,
    msg: 'Use exists',
    data: data
  });

});