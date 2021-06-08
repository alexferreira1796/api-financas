import { Request, Response, NextFunction } from 'express';

import data from '../data';

function validEmailPassUser(req: Request, res: Response, next: NextFunction) {
  const {email, password}: {email?: string, password?: string} = req.params;

  if(email && password) {
    const hasUser = data.find((item) => item.getEmail() === email && item.getPassword() === password);
    if(!hasUser) {
      return res.status(400).json({
        success: false,
        msg: 'Password or Email error',
        data: null
      });
    }

    req.body.data = hasUser;
  }

  next();
}

export default validEmailPassUser;