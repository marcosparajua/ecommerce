import { Schema, model, Document } from 'mongoose';
import { IClothes } from './clothes.js';

export interface ICartItem {
  clothes: IClothes;
  quantity: number;
}

export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
  total: number;
}

const cartSchema = new Schema<ICart>({
  userId: { type: String, required: true },
  items: [
    {
      clothes: { type: Schema.Types.ObjectId, ref: 'Clothes', required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  total: { type: Number, default: 0 },
});

export const Cart = model<ICart>('Cart', cartSchema);
