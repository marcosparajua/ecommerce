import supabase from '../utils/supaBaseClient.js';

export class ClothesRepository {
  /**
   * Fetch all clothes from the database.
   */
  async findAll(): Promise<any[]> {
    const { data, error } = await supabase.from('clothes').select('*');
    if (error) throw error;
    return data;
  }

  /**
   * Fetch a specific piece of clothing by ID.
   * @param id The ID of the clothing item.
   */
  async findById(id: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('clothes')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return null;
    return data;
  }

  /**
   * Search clothes by a term in their name.
   * @param term The term to search for.
   */
  async search(term: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('clothes')
      .select('*')
      .ilike('name', `%${term}%`); // Case-insensitive search
    if (error) throw error;
    return data;
  }

  /**
   * Find clothes that contain a specific tag.
   * @param tag The tag to filter by.
   */
  async findByTag(tag: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('clothes')
      .select('*')
      .contains('tags', [tag]);
    console.log('findByTag response:', { data, error });
    if (error) throw error;
    return data;
  }

  /**
   * Create a new clothing item in the database.
   * @param clothes The clothing item data.
   */
  async create(clothes: Partial<any>): Promise<any> {
    const { data, error } = await supabase
      .from('clothes')
      .insert([clothes])
      .single();
    if (error) throw error;
    return data;
  }

  /**
   * Update a clothing item in the database.
   * @param id The ID of the clothing item.
   * @param clothes The updated data for the clothing item.
   */
  async update(id: string, clothes: Partial<any>): Promise<any | null> {
    const { data, error } = await supabase
      .from('clothes')
      .update(clothes)
      .eq('id', id)
      .single();
    if (error) return null;
    return data;
  }

  /**
   * Delete a clothing item by ID.
   * @param id The ID of the clothing item.
   */
  async delete(id: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('clothes')
      .delete()
      .eq('id', id)
      .single();
    if (error) return null;
    return data;
  }
}
