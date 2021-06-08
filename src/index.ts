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

app.get("/user/:id", [validUser], (req: Request, res: Response) => {
  const {id}: {id?: string} = req.params;

  const hasUser = data.filter((item) => item.getId() === id);
  if(!hasUser) {
    return res.status(400).json({
      success: false,
      msg: 'User not found',
      data: null
    });
  }

  return res.status(201).json({
    success: true,
    msg: 'Use exists',
    data: hasUser
  });

});