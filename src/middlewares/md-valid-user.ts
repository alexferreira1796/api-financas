import { Request, Response, NextFunction } from 'express';
import { validate } from 'uuid';

import data from '../data';

function validUser(req: Request, res: Response, next: NextFunction) {
  const {id}: {id?: string} = req.params;
  const {email}: {email?: string} = req.body;

  if(!email && id) {

    if(!validate(id)) {
      return res.status(400).json({
        success: false,
        msg: 'ID invalid',
        data: null
      });
    }

    const hasUser = data.find((item) => item.getId() === id);
    if(!hasUser) {
      return res.status(400).json({
        success: false,
        msg: 'User not exists',
        data: null
      });
    }
  }

  if(!id && email) {
    const hasUser = data.find((item) => item.getEmail() === email);
    if(hasUser) {
      return res.status(400).json({
        success: false,
        msg: 'User exists',
        data: null
      });
    }
  }

  next();
}

export default validUser;