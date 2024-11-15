import { Schema, model, Document } from 'mongoose';
import { ICartItem } from './cart.js';

export interface IOrder extends Document {
  userId: string;
  items: ICartItem[];
  total: number;
  paymentStatus: string; // e.g., 'Pending', 'Paid', 'Failed'
  orderStatus: string; // e.g., 'Processing', 'Shipped', 'Delivered'
  paymentMethod: string; // e.g., 'Credit Card', 'PayPal'
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  userId: { type: String, required: true },
  items: [
    {
      clothes: { type: Schema.Types.ObjectId, ref: 'Clothes' },
      quantity: Number,
    },
  ],
  total: { type: Number, required: true },
  paymentStatus: { type: String, default: 'Pending' },
  orderStatus: { type: String, default: 'Processing' },
  paymentMethod: { type: String, default: 'Credit Card' },
  createdAt: { type: Date, default: Date.now },
});

export const Order = model<IOrder>('Order', orderSchema);
