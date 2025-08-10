import { test, expect } from '@playwright/test';
import { ShoppingPage, CartPage, OrderHistoryPage } from './pages/shopping-page';

test.describe('Phone Shopping E2E Tests (Page Object Model)', () => {
  let shoppingPage: ShoppingPage;
  let cartPage: CartPage;
  let orderHistoryPage: OrderHistoryPage;

  test.beforeEach(async ({ page }) => {
    shoppingPage = new ShoppingPage(page);
    cartPage = new CartPage(page);
    orderHistoryPage = new OrderHistoryPage(page);
    
    await shoppingPage.goto();
  });

  test('should complete full phone shopping flow', async ({ page }) => {
    // Step 1: Verify homepage
    await shoppingPage.expectPageTitle(/Vite App/);
    await shoppingPage.expectHeading('商品列表');

    // Step 2: Filter by phones
    await shoppingPage.filterByPhones();
    await shoppingPage.expectPhoneFilterApplied();

    // Step 3: Verify expected phones are displayed
    const firstPhoneName = await shoppingPage.getProductName(0);
    const firstPhonePrice = await shoppingPage.getProductPrice(0);
    const secondPhoneName = await shoppingPage.getProductName(1);
    const secondPhonePrice = await shoppingPage.getProductPrice(1);

    expect(firstPhoneName).toBe('iPhone 15 Pro');
    expect(firstPhonePrice).toBe('NT$ 35,900');
    expect(secondPhoneName).toBe('iPhone 14');
    expect(secondPhonePrice).toBe('NT$ 24,900');

    // Step 4: Add phones to cart
    await shoppingPage.expectCartEmpty();
    
    await shoppingPage.addProductToCart(0); // iPhone 15 Pro
    await shoppingPage.expectCartCount('1');
    
    await shoppingPage.addProductToCart(1); // iPhone 14
    await shoppingPage.expectCartCount('2');

    // Step 5: Go to cart and verify contents
    await shoppingPage.goToCart();
    await cartPage.expectCartPage();
    await cartPage.expectCartItemCount(2);
    
    // Verify cart items
    await cartPage.expectCartItem(0, 'iPhone 15 Pro', 'NT$ 35,900', '1');
    await cartPage.expectCartItem(1, 'iPhone 14', 'NT$ 24,900', '1');
    await cartPage.expectTotal('NT$ 60,800');

    // Step 6: Checkout process
    await cartPage.proceedToCheckout();
    await cartPage.expectCheckoutConfirmation('NT$ 60,800');

    // Step 7: Confirm purchase and handle dialog
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('購買成功！感謝您的購買。');
      await dialog.accept();
    });
    
    await cartPage.confirmPurchase();

    // Step 8: Verify order history
    await orderHistoryPage.expectOrderHistoryPage();
    await orderHistoryPage.expectOrderCount(1);
    await orderHistoryPage.expectOrder(0, 'NT$ 60,800');
    
    // Verify order items
    await orderHistoryPage.expectOrderItemCount(0, 2);
    await orderHistoryPage.expectOrderItem(0, 0, 'iPhone 15 Pro', 'NT$ 35,900', '1', 'NT$ 35,900');
    await orderHistoryPage.expectOrderItem(0, 1, 'iPhone 14', 'NT$ 24,900', '1', 'NT$ 24,900');

    // Final verification - cart should be empty
    await shoppingPage.expectCartEmpty();
  });

  test('should handle phone filtering correctly', async ({ page }) => {
    await shoppingPage.filterByPhones();
    await shoppingPage.expectPhoneFilterApplied();
    
    // Verify correct number of phone products
    await expect(shoppingPage.productCards).toHaveCount(4);
  });

  test('should update cart count correctly', async ({ page }) => {
    await shoppingPage.filterByPhones();
    await shoppingPage.expectCartEmpty();
    
    await shoppingPage.addProductToCart(0);
    await shoppingPage.expectCartCount('1');
    
    await shoppingPage.addProductToCart(1);
    await shoppingPage.expectCartCount('2');
  });

  test('should calculate totals correctly', async ({ page }) => {
    await shoppingPage.filterByPhones();
    await shoppingPage.addProductToCart(0); // iPhone 15 Pro (35,900)
    await shoppingPage.addProductToCart(1); // iPhone 14 (24,900)
    
    await shoppingPage.goToCart();
    await cartPage.expectTotal('NT$ 60,800'); // 35,900 + 24,900 = 60,800
  });
}); 