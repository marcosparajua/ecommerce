import { Request, Response } from 'express';
import { OrderService } from '../services/orderService.js';
import { CartService } from '../services/cartService.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});
const orderService = new OrderService();
const cartService = new CartService();

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { paymentMethod } = req.body;
    const cart = await cartService.getCart(req.user.id);

    if (!cart.items.length)
      return res.status(400).json({ message: 'Cart is empty' });

    const order = await orderService.createOrder(
      req.user.id,
      cart.items,
      cart.total,
      paymentMethod
    );

    await cartService.clearCart(req.user.id);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.total * 100,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.status(201).json({
      order,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getUserOrders(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
