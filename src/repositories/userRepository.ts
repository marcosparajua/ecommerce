import supabase from '../utils/supaBaseClient.js';

export class UserRepository {
  async findByEmail(email: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error fetching user by email:', error.message);
      return null;
    }

    return data;
  }

  async create(user: Partial<any>): Promise<{ data: any; error: any }> {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .single();

    if (error) {
      console.error('Error inserting user into Supabase:', error.message);
    }

    return { data, error };
  }

  async findById(id: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user by ID:', error.message);
      return null;
    }

    return data;
  }
}
