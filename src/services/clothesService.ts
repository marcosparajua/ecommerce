import { ClothesRepository } from '../repositories/clothesRepository.js';
import { IClothes } from '../models/clothes.js';

export class ClothesService {
  private repository: ClothesRepository;

  constructor() {
    this.repository = new ClothesRepository();
  }

  async getAllClothes(): Promise<IClothes[]> {
    return this.repository.findAll();
  }

  async getClothesById(id: string): Promise<IClothes | null> {
    return this.repository.findById(id);
  }

  async searchClothes(term: string): Promise<IClothes[]> {
    return this.repository.search(term);
  }

  async getClothesByTag(tag: string): Promise<IClothes[]> {
    return this.repository.findByTag(tag);
  }

  async createClothes(clothes: Partial<IClothes>): Promise<IClothes> {
    return this.repository.create(clothes);
  }

  async updateClothes(
    id: string,
    clothes: Partial<IClothes>
  ): Promise<IClothes | null> {
    return this.repository.update(id, clothes);
  }

  async deleteClothes(id: string): Promise<IClothes | null> {
    return this.repository.delete(id);
  }
}
