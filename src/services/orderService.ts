import { OrderRepository } from '../repositories/orderRepository.js';
import { ICartItem } from '../models/cart.js';
import { IOrder } from '../models/order.js';

export class OrderService {
  private repository: OrderRepository;

  constructor() {
    this.repository = new OrderRepository();
  }

  async createOrder(
    userId: string,
    items: ICartItem[],
    total: number,
    paymentMethod: string
  ): Promise<IOrder> {
    return this.repository.createOrder({
      userId,
      items,
      total,
      paymentMethod,
      paymentStatus: 'Pending',
      orderStatus: 'Processing',
    });
  }

  async getUserOrders(userId: string): Promise<IOrder[]> {
    return this.repository.getUserOrders(userId);
  }

  async getOrderById(orderId: string): Promise<IOrder | null> {
    return this.repository.getOrderById(orderId);
  }

  async updateOrderStatus(
    orderId: string,
    status: string
  ): Promise<IOrder | null> {
    return this.repository.updateOrderStatus(orderId, status);
  }
}
