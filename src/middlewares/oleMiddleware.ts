import { Request, Response, NextFunction } from 'express';

export const sellerOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== 'SELLER') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};
