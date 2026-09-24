import fs from 'fs';
import path from 'path';
import { User, Product, Category, Order, Review, AdminStats } from '../types';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_REVIEWS } from '../data/initialData';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

export interface DatabaseSchema {
  users: User[];
  products: Product[];
  categories: Category[];
  orders: Order[];
  reviews: Review[];
  adminPasswordHash: string;
}

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(content);
      }
    } catch (err) {
      console.warn('Could not read store.json, initializing fresh store:', err);
    }

    // Default seed
    const defaultData: DatabaseSchema = {
      users: [
        {
          id: 'usr-admin',
          name: 'VIVE Admin',
          email: 'admin@vivepanya.com',
          phone: '+91 98765 43210',
          role: 'admin',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'usr-customer',
          name: 'Priya Sundaram',
          email: 'customer@vivepanya.com',
          phone: '+91 98450 12345',
          role: 'customer',
          createdAt: new Date().toISOString(),
        }
      ],
      products: INITIAL_PRODUCTS,
      categories: INITIAL_CATEGORIES,
      reviews: INITIAL_REVIEWS,
      orders: [
        {
          id: 'ord-1001',
          orderNumber: 'VP-2026-1001',
          customer: {
            userId: 'usr-customer',
            name: 'Priya Sundaram',
            email: 'customer@vivepanya.com',
            phone: '+91 98450 12345',
          },
          deliveryAddress: {
            name: 'Priya Sundaram',
            phone: '+91 98450 12345',
            email: 'customer@vivepanya.com',
            address: '42 Orchid Residency, 4th Main Road, Indiranagar',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560038',
          },
          items: [
            {
              productId: 'prod-1',
              name: 'Neem & Tulsi Herbal Purifying Soap',
              price: 149,
              quantity: 2,
              image: '/src/assets/images/product_neem_tulsi_soap_1790230422423.jpg',
            },
            {
              productId: 'prod-2',
              name: 'Cold-Pressed Virgin Coconut Oil (500ml)',
              price: 349,
              quantity: 1,
              image: '/src/assets/images/product_virgin_coconut_oil_1790230435872.jpg',
            },
          ],
          subtotal: 647,
          deliveryCharges: 0,
          discount: 0,
          total: 647,
          paymentMethod: 'Online Payment',
          paymentStatus: 'Paid',
          status: 'Delivered',
          timeline: [
            { status: 'Pending', timestamp: '2026-03-01T10:00:00Z', note: 'Order placed via Online UPI' },
            { status: 'Confirmed', timestamp: '2026-03-01T11:30:00Z', note: 'Payment verified and order confirmed' },
            { status: 'Packed', timestamp: '2026-03-01T15:00:00Z', note: 'Item safely packaged with eco-friendly filler' },
            { status: 'Shipped', timestamp: '2026-03-02T09:00:00Z', note: 'Dispatched via Blue Dart Express (AWB #8492019)' },
            { status: 'Out for Delivery', timestamp: '2026-03-03T08:30:00Z', note: 'Courier out for delivery in Indiranagar' },
            { status: 'Delivered', timestamp: '2026-03-03T14:10:00Z', note: 'Package handed over to recipient' },
          ],
          createdAt: '2026-03-01T10:00:00Z',
          updatedAt: '2026-03-03T14:10:00Z',
        },
        {
          id: 'ord-1002',
          orderNumber: 'VP-2026-1002',
          customer: {
            name: 'Aarav Sharma',
            email: 'aarav@example.com',
            phone: '+91 99887 76655',
          },
          deliveryAddress: {
            name: 'Aarav Sharma',
            phone: '+91 99887 76655',
            email: 'aarav@example.com',
            address: 'B-702 Celestial Towers, Bandra West',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400050',
          },
          items: [
            {
              productId: 'prod-3',
              name: 'Artisanal Festival Gift Box Collection',
              price: 749,
              quantity: 1,
              image: '/src/assets/images/product_gift_festival_box_1790230452588.jpg',
            }
          ],
          subtotal: 749,
          deliveryCharges: 0,
          discount: 75,
          total: 674,
          couponCode: 'VIVE10',
          paymentMethod: 'Cash on Delivery',
          paymentStatus: 'Pending',
          status: 'Shipped',
          timeline: [
            { status: 'Pending', timestamp: '2026-03-06T14:20:00Z', note: 'Cash on Delivery order placed' },
            { status: 'Confirmed', timestamp: '2026-03-06T15:00:00Z', note: 'Customer phone confirmation completed' },
            { status: 'Packed', timestamp: '2026-03-06T18:00:00Z', note: 'Gift box sealed and boxed' },
            { status: 'Shipped', timestamp: '2026-03-07T11:00:00Z', note: 'Dispatched via Express Courier' },
          ],
          createdAt: '2026-03-06T14:20:00Z',
          updatedAt: '2026-03-07T11:00:00Z',
        }
      ],
      adminPasswordHash: bcrypt.hashSync('admin123', 8),
    };

    this.saveDataToFile(defaultData);
    return defaultData;
  }

  private saveDataToFile(data: DatabaseSchema) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write store.json:', err);
    }
  }

  private save() {
    this.saveDataToFile(this.data);
  }

  // --- Users & Auth ---
  public getUsers(): User[] {
    return this.data.users;
  }

  public findUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public createUser(user: User): User {
    this.data.users.push(user);
    this.save();
    return user;
  }

  public verifyAdminPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.data.adminPasswordHash);
  }

  // --- Products ---
  public getProducts(): Product[] {
    return this.data.products;
  }

  public getProductById(id: string): Product | undefined {
    return this.data.products.find(p => p.id === id || p.slug === id);
  }

  public createProduct(product: Product): Product {
    this.data.products.unshift(product);
    this.updateCategoryCounts();
    this.save();
    return product;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.data.products[idx] = { ...this.data.products[idx], ...updates };
    this.updateCategoryCounts();
    this.save();
    return this.data.products[idx];
  }

  public deleteProduct(id: string): boolean {
    const initialLen = this.data.products.length;
    this.data.products = this.data.products.filter(p => p.id !== id);
    if (this.data.products.length !== initialLen) {
      this.updateCategoryCounts();
      this.save();
      return true;
    }
    return false;
  }

  // --- Categories ---
  public getCategories(): Category[] {
    this.updateCategoryCounts();
    return this.data.categories;
  }

  public createCategory(category: Category): Category {
    this.data.categories.push(category);
    this.save();
    return category;
  }

  private updateCategoryCounts() {
    this.data.categories = this.data.categories.map(cat => {
      const count = this.data.products.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length;
      return { ...cat, itemCount: count };
    });
  }

  // --- Orders ---
  public getOrders(): Order[] {
    return this.data.orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getOrdersByCustomerEmail(email: string): Order[] {
    return this.data.orders
      .filter(o => o.customer.email.toLowerCase() === email.toLowerCase() || o.deliveryAddress.email.toLowerCase() === email.toLowerCase())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getOrderById(id: string): Order | undefined {
    return this.data.orders.find(o => o.id === id || o.orderNumber.toUpperCase() === id.toUpperCase());
  }

  public createOrder(order: Order): Order {
    // Reduce stock
    for (const item of order.items) {
      const p = this.data.products.find(prod => prod.id === item.productId);
      if (p) {
        p.stock = Math.max(0, p.stock - item.quantity);
      }
    }

    // Save order
    this.data.orders.unshift(order);

    // Auto-record customer if not registered
    const existingUser = this.findUserByEmail(order.deliveryAddress.email);
    if (!existingUser) {
      this.data.users.push({
        id: `usr-${Date.now()}`,
        name: order.deliveryAddress.name,
        email: order.deliveryAddress.email,
        phone: order.deliveryAddress.phone,
        role: 'customer',
        createdAt: new Date().toISOString(),
      });
    }

    this.save();
    return order;
  }

  public updateOrderStatus(id: string, status: Order['status'], note?: string): Order | null {
    const order = this.data.orders.find(o => o.id === id || o.orderNumber === id);
    if (!order) return null;

    order.status = status;
    order.updatedAt = new Date().toISOString();
    order.timeline.push({
      status,
      timestamp: new Date().toISOString(),
      note: note || `Status updated to ${status}`,
    });

    if (status === 'Delivered') {
      order.paymentStatus = 'Paid';
    }

    this.save();
    return order;
  }

  public cancelOrder(id: string, reason: string): Order | null {
    const order = this.data.orders.find(o => o.id === id || o.orderNumber === id);
    if (!order) return null;

    order.status = 'Cancelled';
    order.cancellationReason = reason;
    order.updatedAt = new Date().toISOString();
    order.timeline.push({
      status: 'Cancelled',
      timestamp: new Date().toISOString(),
      note: `Cancelled: ${reason}`,
    });

    // Restore stock
    for (const item of order.items) {
      const p = this.data.products.find(prod => prod.id === item.productId);
      if (p) {
        p.stock += item.quantity;
      }
    }

    this.save();
    return order;
  }

  // --- Reviews ---
  public getReviewsForProduct(productId: string): Review[] {
    return this.data.reviews.filter(r => r.productId === productId);
  }

  public addReview(review: Review): Review {
    this.data.reviews.unshift(review);

    // Recalculate product rating
    const prodReviews = this.data.reviews.filter(r => r.productId === review.productId);
    const avgRating = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
    const p = this.data.products.find(prod => prod.id === review.productId);
    if (p) {
      p.rating = Number(avgRating.toFixed(1));
      p.reviewCount = prodReviews.length;
    }

    this.save();
    return review;
  }

  // --- Admin Stats ---
  public getStats(): AdminStats {
    const totalSales = this.data.orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.total, 0);

    const pendingOrders = this.data.orders.filter(o => o.status === 'Pending').length;
    const deliveredOrders = this.data.orders.filter(o => o.status === 'Delivered').length;
    const lowStockProducts = this.data.products.filter(p => p.stock <= 20).length;

    return {
      totalProducts: this.data.products.length,
      totalOrders: this.data.orders.length,
      totalCustomers: this.data.users.filter(u => u.role === 'customer').length,
      totalSales,
      pendingOrders,
      deliveredOrders,
      lowStockProducts,
    };
  }
}

export const db = new Database();
