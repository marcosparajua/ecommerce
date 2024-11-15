import { Request, Response } from 'express';
import { CartService } from '../services/cartService.js';
import { ClothesService } from '../services/clothesService.js';

const cartService = new CartService();
const clothesService = new ClothesService();

export const getCart = async (req: Request, res: Response) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { clothesId, quantity } = req.body;
    const clothes = await clothesService.getClothesById(clothesId);
    if (!clothes) return res.status(404).json({ message: 'Clothes not found' });

    const cart = await cartService.addItemToCart(
      req.user.id,
      clothes,
      quantity
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { clothesId, quantity } = req.body;
    const cart = await cartService.updateItemQuantity(
      req.user.id,
      clothesId,
      quantity
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeCartItem = async (req: Request, res: Response) => {
  try {
    const { clothesId } = req.params;
    const cart = await cartService.removeItemFromCart(req.user.id, clothesId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    await cartService.clearCart(req.user.id);
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
