import { test, expect } from '@playwright/test';

test.describe('Phone Shopping E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the shopping site
    await page.goto('/');
  });

  test('should complete phone shopping flow - add two phones to cart and purchase', async ({ page }) => {
    // Step 1: Verify homepage loads correctly
    await expect(page).toHaveTitle(/Vite App/);
    await expect(page.locator('h1')).toContainText('商品列表');

    // Step 2: Filter by phone category
    await page.getByText('手機', { exact: true }).first().click();
    
    // Verify phone filter is applied
    await expect(page.locator('.selected-filter')).toContainText('手機');
    await expect(page.locator('.product-count')).toContainText('共 4 項商品');

    // Step 3: Get the first two phone products info for verification
    const firstPhoneName = await page.locator('.product-card').first().locator('h3').textContent();
    const firstPhonePrice = await page.locator('.product-card').first().locator('.price').textContent();
    const secondPhoneName = await page.locator('.product-card').nth(1).locator('h3').textContent();
    const secondPhonePrice = await page.locator('.product-card').nth(1).locator('.price').textContent();

    // Verify the expected phones are displayed
    expect(firstPhoneName).toBe('iPhone 15 Pro');
    expect(firstPhonePrice).toBe('NT$ 35,900');
    expect(secondPhoneName).toBe('iPhone 14');
    expect(secondPhonePrice).toBe('NT$ 24,900');

    // Step 4: Add first phone to cart (iPhone 15 Pro)
    await page.locator('.product-card').first().getByRole('button', { name: '加入購物車' }).click();
    
    // Verify cart count updated to 1
    await expect(page.locator('.cart-badge')).toContainText('1');

    // Step 5: Add second phone to cart (iPhone 14)
    await page.locator('.product-card').nth(1).getByRole('button', { name: '加入購物車' }).click();
    
    // Verify cart count updated to 2
    await expect(page.locator('.cart-badge')).toContainText('2');

    // Step 6: Navigate to cart
    await page.getByRole('link', { name: /🛒.*2/ }).click();
    
    // Verify cart page loads
    await expect(page).toHaveURL(/\/cart/);
    await expect(page.locator('h1')).toContainText('購物車');

    // Step 7: Verify cart contents
    const cartItems = page.locator('.cart-item');
    await expect(cartItems).toHaveCount(2);

    // Verify first item in cart (iPhone 15 Pro)
    await expect(cartItems.first().locator('h3')).toContainText('iPhone 15 Pro');
    await expect(cartItems.first().locator('.item-price')).toContainText('NT$ 35,900');
    await expect(cartItems.first().locator('.quantity')).toContainText('1');

    // Verify second item in cart (iPhone 14)
    await expect(cartItems.nth(1).locator('h3')).toContainText('iPhone 14');
    await expect(cartItems.nth(1).locator('.item-price')).toContainText('NT$ 24,900');
    await expect(cartItems.nth(1).locator('.quantity')).toContainText('1');

    // Verify total amount
    await expect(page.locator('.total-amount')).toContainText('NT$ 60,800');

    // Step 8: Proceed to checkout
    await page.getByRole('button', { name: '結帳' }).click();
    
    // Verify checkout confirmation dialog
    await expect(page.locator('.checkout-confirmation')).toBeVisible();
    await expect(page.locator('.checkout-confirmation')).toContainText('總金額：NT$ 60,800');
    await expect(page.locator('.checkout-confirmation')).toContainText('確定要完成購買嗎？');

    // Step 9: Confirm purchase
    await page.getByRole('button', { name: '確認購買' }).click();
    
    // Handle purchase success dialog
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('購買成功！感謝您的購買。');
      await dialog.accept();
    });

    // Step 10: Verify redirect to order history
    await expect(page).toHaveURL(/\/history/);
    await expect(page.locator('h1')).toContainText('購買歷史');

    // Step 11: Verify order in history
    const orderItems = page.locator('.order');
    await expect(orderItems).toHaveCount(1);

    // Verify order details
    const order = orderItems.first();
    await expect(order.locator('.order-id')).toContainText(/訂單 #\d+/);
    await expect(order.locator('.order-date')).toContainText(/\d{4}\/\d{1,2}\/\d{1,2}/);
    await expect(order.locator('.order-total')).toContainText('NT$ 60,800');

    // Verify order items
    const orderProducts = order.locator('.order-item');
    await expect(orderProducts).toHaveCount(2);

    // Verify first order item (iPhone 15 Pro)
    await expect(orderProducts.first().locator('h4')).toContainText('iPhone 15 Pro');
    await expect(orderProducts.first().locator('.unit-price')).toContainText('單價: NT$ 35,900');
    await expect(orderProducts.first().locator('.quantity')).toContainText('數量: 1');
    await expect(orderProducts.first().locator('.subtotal')).toContainText('小計: NT$ 35,900');

    // Verify second order item (iPhone 14)
    await expect(orderProducts.nth(1).locator('h4')).toContainText('iPhone 14');
    await expect(orderProducts.nth(1).locator('.unit-price')).toContainText('單價: NT$ 24,900');
    await expect(orderProducts.nth(1).locator('.quantity')).toContainText('數量: 1');
    await expect(orderProducts.nth(1).locator('.subtotal')).toContainText('小計: NT$ 24,900');

    // Final verification - cart should be empty
    await expect(page.locator('.cart-badge')).not.toBeVisible();
  });

  test('should filter products by phone category correctly', async ({ page }) => {
    // Click on phone filter
    await page.getByText('手機', { exact: true }).first().click();
    
    // Verify only phone products are shown
    const products = page.locator('.product-card');
    await expect(products).toHaveCount(4);
    
    // Verify all products are phones
    for (let i = 0; i < 4; i++) {
      await expect(products.nth(i).locator('.category')).toContainText('手機');
    }
    
    // Verify filter tag is displayed
    await expect(page.locator('.selected-filter')).toContainText('手機');
  });

  test('should update cart count when adding products', async ({ page }) => {
    // Filter by phones
    await page.getByText('手機', { exact: true }).first().click();
    
    // Initially cart should be empty
    await expect(page.locator('.cart-badge')).not.toBeVisible();
    
    // Add first phone
    await page.locator('.product-card').first().getByRole('button', { name: '加入購物車' }).click();
    await expect(page.locator('.cart-badge')).toContainText('1');
    
    // Add second phone
    await page.locator('.product-card').nth(1).getByRole('button', { name: '加入購物車' }).click();
    await expect(page.locator('.cart-badge')).toContainText('2');
  });

  test('should calculate cart total correctly', async ({ page }) => {
    // Filter by phones and add two phones to cart
    await page.getByText('手機', { exact: true }).first().click();
    await page.locator('.product-card').first().getByRole('button', { name: '加入購物車' }).click();
    await page.locator('.product-card').nth(1).getByRole('button', { name: '加入購物車' }).click();
    
    // Go to cart
    await page.getByRole('link', { name: /🛒.*2/ }).click();
    
    // Verify total calculation (35,900 + 24,900 = 60,800)
    await expect(page.locator('.total-amount')).toContainText('NT$ 60,800');
  });
}); 