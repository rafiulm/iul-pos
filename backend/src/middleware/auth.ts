import type { Request, Response, NextFunction } from 'express';
import { auth } from '../auth/auth';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const session = await auth.api.getSession({ 
      headers: req.headers 
    });
    
    if (!session || !session.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    (req as any).user = session.user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ error: "Unauthorized" });
  }
}
