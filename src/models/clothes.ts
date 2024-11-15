import { Schema, model, Document } from 'mongoose';

export interface IClothes extends Document {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
  size: string;
  color: string;
  rating: number;
  favorite: boolean;
  tags: string[];
}

const clothesSchema = new Schema<IClothes>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
  category: String,
  quantity: Number,
  size: String,
  color: String,
  rating: Number,
  favorite: { type: Boolean, default: false },
  tags: [String],
});

export const Clothes = model<IClothes>('Clothes', clothesSchema);
