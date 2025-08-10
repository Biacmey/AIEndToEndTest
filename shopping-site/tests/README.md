# E2E Testing Guide

This project uses Playwright for end-to-end testing of the shopping site functionality.

## Test Files

- `phone-shopping.spec.ts` - Comprehensive E2E tests using direct Playwright API
- `phone-shopping-pom.spec.ts` - Same tests using Page Object Model pattern (recommended)
- `pages/shopping-page.ts` - Page Object classes for better test maintainability

## Test Coverage

The E2E tests cover the complete phone shopping flow:

1. **Homepage Navigation** - Loading the shopping site
2. **Product Filtering** - Filtering products by phone category
3. **Product Selection** - Adding specific phones to cart
4. **Cart Management** - Verifying cart contents and totals
5. **Checkout Process** - Complete purchase flow
6. **Order Verification** - Confirming order in purchase history

### Specific Test Cases

- Complete phone shopping flow (iPhone 15 Pro + iPhone 14)
- Phone category filtering
- Cart count updates
- Total calculation accuracy
- Order history verification

## Running Tests

### Prerequisites

1. Ensure the development server is running:
   ```bash
   npm run dev
   ```

2. Install Playwright browsers (first time only):
   ```bash
   npx playwright install
   ```

### Test Commands

```bash
# Run all E2E tests in headless mode
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug mode (step through tests)
npm run test:e2e:debug

# View test report
npm run test:e2e:report
```

### Running Specific Tests

```bash
# Run only phone shopping tests
npx playwright test phone-shopping

# Run only POM version
npx playwright test phone-shopping-pom

# Run specific test by name
npx playwright test --grep "should complete full phone shopping flow"
```

## Test Configuration

The tests are configured in `playwright.config.ts` with:

- **Base URL**: http://localhost:5173
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari  
- **Auto-server**: Automatically starts dev server before tests
- **Screenshots**: Captured on failure
- **Videos**: Recorded for failed tests
- **Traces**: Available for debugging

## Test Data

The tests expect the following products to be available:

- **iPhone 15 Pro** - NT$ 35,900
- **iPhone 14** - NT$ 24,900
- **Samsung Galaxy S24** - NT$ 28,900
- **小米14** - NT$ 15,900

## Page Object Model

The `pages/shopping-page.ts` file contains reusable page objects:

- `ShoppingPage` - Main product listing and filtering
- `CartPage` - Shopping cart and checkout functionality  
- `OrderHistoryPage` - Order verification and history

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure port 5173 is available
2. **Browser installation**: Run `npx playwright install` if browsers are missing
3. **Development server**: Tests require the dev server to be running
4. **CSS selectors**: Update selectors if UI components change

### Debug Tips

- Use `--headed` flag to see browser interactions
- Use `--debug` flag to step through tests
- Check `test-results/` folder for screenshots and videos
- Use `page.pause()` in tests to stop and inspect

## CI/CD Integration

The tests can be integrated into CI/CD pipelines. Example GitHub Actions workflow:

```yaml
- name: Install dependencies
  run: npm ci
  
- name: Install Playwright
  run: npx playwright install --with-deps
  
- name: Run E2E tests
  run: npm run test:e2e
``` 