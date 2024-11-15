import { CartRepository } from '../repositories/cartRepository.js';
import { IClothes } from '../models/clothes.js';
import { ICart } from '../models/cart.js';

export class CartService {
  private repository: CartRepository;

  constructor() {
    this.repository = new CartRepository();
  }

  async getCart(userId: string): Promise<ICart> {
    let cart = await this.repository.findByUserId(userId);
    if (!cart) {
      cart = await this.repository.createCart(userId);
    }
    return cart;
  }

  async addItemToCart(
    userId: string,
    clothes: IClothes,
    quantity: number
  ): Promise<ICart> {
    const cart = await this.getCart(userId);
    const item = cart.items.find(
      (item) => item.clothes._id!.toString() === clothes._id!.toString()
    );

    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ clothes, quantity });
    }

    cart.total += clothes.price * quantity;
    return this.repository.updateCart(cart);
  }

  async updateItemQuantity(
    userId: string,
    clothesId: string,
    quantity: number
  ): Promise<ICart> {
    const cart = await this.getCart(userId);
    const item = cart.items.find(
      (item) => item.clothes._id!.toString() === clothesId
    );

    if (!item) throw new Error('Item not found');
    cart.total -= item.clothes.price * item.quantity;
    item.quantity = quantity;
    cart.total += item.clothes.price * quantity;

    return this.repository.updateCart(cart);
  }

  async removeItemFromCart(userId: string, clothesId: string): Promise<ICart> {
    const cart = await this.getCart(userId);
    const itemIndex = cart.items.findIndex(
      (item) => item.clothes._id!.toString() === clothesId
    );

    if (itemIndex === -1) throw new Error('Item not found');

    const item = cart.items[itemIndex];
    cart.total -= item.clothes.price * item.quantity;
    cart.items.splice(itemIndex, 1);

    return this.repository.updateCart(cart);
  }

  async clearCart(userId: string): Promise<void> {
    await this.repository.deleteCart(userId);
  }
}
