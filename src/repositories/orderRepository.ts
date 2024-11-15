import { Order, IOrder } from '../models/order.js';

export class OrderRepository {
  async createOrder(order: Partial<IOrder>): Promise<IOrder> {
    const newOrder = new Order(order);
    return newOrder.save();
  }

  async getUserOrders(userId: string): Promise<IOrder[]> {
    return Order.find({ userId }).populate('items.clothes');
  }

  async getOrderById(orderId: string): Promise<IOrder | null> {
    return Order.findById(orderId).populate('items.clothes');
  }

  async updateOrderStatus(
    orderId: string,
    status: string
  ): Promise<IOrder | null> {
    return Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );
  }
}
