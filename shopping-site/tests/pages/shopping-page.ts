import { Page, expect, Locator } from '@playwright/test';

export class ShoppingPage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly phoneFilter: Locator;
  readonly selectedFilter: Locator;
  readonly productCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('.product-card');
    this.cartBadge = page.locator('.cart-badge');
    this.cartLink = page.getByRole('link', { name: /🛒/ });
    this.phoneFilter = page.getByText('手機', { exact: true }).first();
    this.selectedFilter = page.locator('.selected-filter');
    this.productCount = page.locator('.product-count');
  }

  async goto() {
    await this.page.goto('/');
  }

  async filterByPhones() {
    await this.phoneFilter.click();
  }

  async addProductToCart(index: number) {
    await this.productCards.nth(index).getByRole('button', { name: '加入購物車' }).click();
  }

  async getProductName(index: number): Promise<string | null> {
    return await this.productCards.nth(index).locator('h3').textContent();
  }

  async getProductPrice(index: number): Promise<string | null> {
    return await this.productCards.nth(index).locator('.price').textContent();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async expectPageTitle(title: RegExp) {
    await expect(this.page).toHaveTitle(title);
  }

  async expectHeading(text: string) {
    await expect(this.page.locator('h1')).toContainText(text);
  }

  async expectPhoneFilterApplied() {
    await expect(this.selectedFilter).toContainText('手機');
    await expect(this.productCount).toContainText('共 4 項商品');
  }

  async expectCartCount(count: string) {
    await expect(this.cartBadge).toContainText(count);
  }

  async expectCartEmpty() {
    await expect(this.cartBadge).not.toBeVisible();
  }
}

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly totalAmount: Locator;
  readonly checkoutButton: Locator;
  readonly checkoutConfirmation: Locator;
  readonly confirmPurchaseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart-item');
    this.totalAmount = page.locator('.total-amount');
    this.checkoutButton = page.getByRole('button', { name: '結帳' });
    this.checkoutConfirmation = page.locator('.checkout-confirmation');
    this.confirmPurchaseButton = page.getByRole('button', { name: '確認購買' });
  }

  async expectCartPage() {
    await expect(this.page).toHaveURL(/\/cart/);
    await expect(this.page.locator('h1')).toContainText('購物車');
  }

  async expectCartItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async expectCartItem(index: number, name: string, price: string, quantity: string) {
    const item = this.cartItems.nth(index);
    await expect(item.locator('h3')).toContainText(name);
    await expect(item.locator('.item-price')).toContainText(price);
    await expect(item.locator('.quantity')).toContainText(quantity);
  }

  async expectTotal(amount: string) {
    await expect(this.totalAmount).toContainText(amount);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async expectCheckoutConfirmation(amount: string) {
    await expect(this.checkoutConfirmation).toBeVisible();
    await expect(this.checkoutConfirmation).toContainText(`總金額：${amount}`);
    await expect(this.checkoutConfirmation).toContainText('確定要完成購買嗎？');
  }

  async confirmPurchase() {
    await this.confirmPurchaseButton.click();
  }
}

export class OrderHistoryPage {
  readonly page: Page;
  readonly orders: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orders = page.locator('.order');
  }

  async expectOrderHistoryPage() {
    await expect(this.page).toHaveURL(/\/history/);
    await expect(this.page.locator('h1')).toContainText('購買歷史');
  }

  async expectOrderCount(count: number) {
    await expect(this.orders).toHaveCount(count);
  }

  async expectOrder(index: number, total: string) {
    const order = this.orders.nth(index);
    await expect(order.locator('.order-id')).toContainText(/訂單 #\d+/);
    await expect(order.locator('.order-date')).toContainText(/\d{4}\/\d{1,2}\/\d{1,2}/);
    await expect(order.locator('.order-total')).toContainText(total);
  }

  async expectOrderItem(orderIndex: number, itemIndex: number, name: string, unitPrice: string, quantity: string, subtotal: string) {
    const order = this.orders.nth(orderIndex);
    const orderItem = order.locator('.order-item').nth(itemIndex);
    
    await expect(orderItem.locator('h4')).toContainText(name);
    await expect(orderItem.locator('.unit-price')).toContainText(`單價: ${unitPrice}`);
    await expect(orderItem.locator('.quantity')).toContainText(`數量: ${quantity}`);
    await expect(orderItem.locator('.subtotal')).toContainText(`小計: ${subtotal}`);
  }

  async expectOrderItemCount(orderIndex: number, count: number) {
    const order = this.orders.nth(orderIndex);
    await expect(order.locator('.order-item')).toHaveCount(count);
  }
} 