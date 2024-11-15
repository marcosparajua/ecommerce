import { UserRepository } from '../repositories/userRepository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import supabase from '../utils/supaBaseClient.js';

export class AuthService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.repository.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
    }
    return null;
  }

  async register(userData: any): Promise<{ user: any; token: string }> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    console.log('User Data to Insert:', userData);

    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    console.log('Insert Response:', { data, error });

    if (error) {
      console.error('Supabase Error:', error.message);
      throw new Error('Error inserting user into database');
    }

    if (!data) {
      console.error('Supabase returned null data for user creation');
      throw new Error('No user created');
    }

    const token = jwt.sign(
      { id: data.id, isAdmin: data.isAdmin },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { user: data, token };
  }

  async getUserById(id: string): Promise<any | null> {
    return this.repository.findById(id);
  }
}
