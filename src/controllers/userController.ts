import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';

const authService = new AuthService();

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await authService.getUserById(req.user.id);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
