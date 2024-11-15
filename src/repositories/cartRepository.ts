import { Cart, ICart } from '../models/cart.js';

export class CartRepository {
  async findByUserId(userId: string): Promise<ICart | null> {
    return Cart.findOne({ userId }).populate('items.clothes');
  }

  async createCart(userId: string): Promise<ICart> {
    const newCart = new Cart({ userId, items: [] });
    return newCart.save();
  }

  async updateCart(cart: ICart): Promise<ICart> {
    return cart.save();
  }

  async deleteCart(userId: string): Promise<void> {
    await Cart.findOneAndDelete({ userId });
  }
}
