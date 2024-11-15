import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    if (token) {
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during login:', error.message);
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.register(req.body);
    res
      .status(201)
      .json({ message: 'User registered successfully', user, token });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error during registration:', error.message);
      res
        .status(500)
        .json({ message: 'Registration failed', error: error.message });
    } else {
      console.error('Unknown error during registration:', error);
      res.status(500).json({ message: 'Unknown registration error' });
    }
  }
};
