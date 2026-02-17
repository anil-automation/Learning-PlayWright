# Complete Playwright Automation Learning Roadmap
## JavaScript/TypeScript + Playwright - Combined 10-Week Journey
### For Manual Testers Transitioning to Automation

---

## 📊 Overview

**Duration:** 10 weeks (70 days)
**Daily Commitment:** 1-2 hours
**Goal:** Become job-ready automation tester

### Learning Philosophy:
- **Learn JS concept → Apply immediately in Playwright**
- **Build real tests from Day 1**
- **Practice daily, not just watch/read**

---

## 🎯 Weekly Breakdown

| Week | Focus | What You'll Learn |
|------|-------|-------------------|
| Week 1 | JS Basics + First Tests | Variables, functions, first Playwright test |
| Week 2 | JS Control Flow + Locators | Loops, conditions, finding elements |
| Week 3 | Async/Await + Actions | Promises, clicking, filling forms |
| Week 4 | Objects/Arrays + Advanced Interactions | Data structures, complex UI interactions |
| Week 5 | TypeScript + Assertions | Type safety, validations |
| Week 6 | Page Object Model | Code organization, reusability |
| Week 7 | Advanced Features | API testing, fixtures, hooks |
| Week 8 | Framework Building | Project structure, best practices |
| Week 9-10 | Real Project | Complete test suite for portfolio |

---

## WEEK 1: JavaScript Basics + First Playwright Tests

### DAY 1: Setup Everything + Variables

**Morning: Setup (1 hour)**
1. Install Node.js from https://nodejs.org (LTS version)
2. Install VS Code from https://code.visualstudio.com
3. Verify installation:
```bash
node --version
npm --version
```

**Afternoon: JavaScript Basics (1 hour)**

**Concept: Variables**
```javascript
// Practice on https://playcode.io

// let - can be changed
let username = "testuser";
console.log(username);
username = "newuser"; // Can change
console.log(username);

// const - cannot be changed
const password = "Test@123";
console.log(password);
// password = "new"; // ERROR! Cannot change const

// var - old way (don't use)
var city = "Hyderabad";
```

**Apply in Playwright:**
```bash
# Create your first project
mkdir playwright-learning
cd playwright-learning
npm init -y
npm init playwright@latest
# Choose: JavaScript, tests folder, no GitHub Actions, yes browsers
```

**Your First Test:**
```javascript
// File: tests/day1-first-test.spec.js
const { test, expect } = require('@playwright/test');

test('my first test - using variables', async ({ page }) => {
    // Using variables in Playwright
    const url = 'https://www.google.com';
    const searchTerm = 'Playwright';
    
    await page.goto(url);
    console.log('Visited:', url);
    
    await expect(page).toHaveTitle(/Google/);
    console.log('✅ Test passed!');
});
```

**Run it:**
```bash
npx playwright test --headed
```

**Today's Achievement:** ✅ First test running!

---

### DAY 2: Data Types + Navigating Pages

**JavaScript: Data Types**
```javascript
// Practice on playcode.io

// Numbers
let age = 25;
let price = 99.99;
let discount = 20;
let finalPrice = price - discount;
console.log('Final price:', finalPrice);

// Strings
let firstName = 'John';
let lastName = 'Doe';
let fullName = firstName + ' ' + lastName; // Concatenation
console.log(fullName);

// Template literals (modern way)
let greeting = `Hello, ${firstName}!`;
console.log(greeting);

// Booleans
let isLoggedIn = false;
let hasAccess = true;
console.log('User logged in?', isLoggedIn);

// Arrays (lists)
let browsers = ['Chrome', 'Firefox', 'Safari'];
console.log('First browser:', browsers[0]);
console.log('Total browsers:', browsers.length);

// Objects (key-value pairs)
let user = {
    name: 'John Doe',
    email: 'john@test.com',
    age: 25,
    isActive: true
};
console.log('User name:', user.name);
console.log('User email:', user.email);
```

**Apply in Playwright:**
```javascript
// File: tests/day2-data-types.spec.js
const { test, expect } = require('@playwright/test');

test('using different data types', async ({ page }) => {
    // Object for test data
    const testData = {
        url: 'https://www.saucedemo.com',
        username: 'standard_user',
        password: 'secret_sauce'
    };
    
    // Array of URLs to check
    const websites = [
        'https://www.google.com',
        'https://www.saucedemo.com',
        'https://playwright.dev'
    ];
    
    // Navigate and verify
    await page.goto(testData.url);
    console.log('Testing URL:', testData.url);
    
    // Check page loaded
    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);
    
    const title = await page.title();
    console.log('Page title:', title);
});
```

**Practice Task:**
Create an object with 3 different test users and their passwords.

---

### DAY 3: Functions + Page Object Basics

**JavaScript: Functions**
```javascript
// Practice on playcode.io

// Simple function
function greet(name) {
    console.log('Hello, ' + name);
}

greet('John');
greet('Alice');

// Function with return value
function calculateTotal(price, quantity) {
    let total = price * quantity;
    return total;
}

let result = calculateTotal(100, 3);
console.log('Total:', result);

// Arrow function (modern way)
const add = (a, b) => {
    return a + b;
};

// Shorter arrow function
const multiply = (a, b) => a * b;

console.log('Add:', add(5, 3));
console.log('Multiply:', multiply(5, 3));

// Function for test scenario
const validateLogin = (username, password) => {
    if (username && password) {
        return 'Valid credentials';
    } else {
        return 'Invalid credentials';
    }
};

console.log(validateLogin('user', 'pass')); // Valid
console.log(validateLogin('', 'pass'));      // Invalid
```

**Apply in Playwright:**
```javascript
// File: tests/day3-functions.spec.js
const { test, expect } = require('@playwright/test');

// Reusable function for login
async function login(page, username, password) {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');
}

// Reusable function for verification
async function verifyUrl(page, expectedUrl) {
    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);
    console.log('Expected URL:', expectedUrl);
    return currentUrl.includes(expectedUrl);
}

test('using functions - valid login', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    
    const isCorrect = await verifyUrl(page, 'inventory');
    console.log('Login successful:', isCorrect);
    
    await expect(page).toHaveURL(/inventory/);
});

test('using functions - invalid login', async ({ page }) => {
    await login(page, 'invalid_user', 'wrong_password');
    
    // Should stay on login page
    await expect(page).toHaveURL(/saucedemo.com/);
});
```

**Today's Achievement:** ✅ Reusable test functions!

---

### DAY 4: Conditionals + Element Visibility

**JavaScript: If/Else**
```javascript
// Practice on playcode.io

// Simple if
let age = 20;
if (age >= 18) {
    console.log('Adult');
}

// if-else
let score = 75;
if (score >= 90) {
    console.log('Grade: A');
} else if (score >= 75) {
    console.log('Grade: B');
} else if (score >= 60) {
    console.log('Grade: C');
} else {
    console.log('Grade: F');
}

// Comparison operators
console.log(5 === 5);    // true (equal)
console.log(5 !== 3);    // true (not equal)
console.log(5 > 3);      // true (greater than)
console.log(5 < 3);      // false (less than)
console.log(5 >= 5);     // true (greater or equal)

// Logical operators
let isLoggedIn = true;
let isAdmin = false;

if (isLoggedIn && isAdmin) {
    console.log('Admin access');
} else if (isLoggedIn && !isAdmin) {
    console.log('User access');
} else {
    console.log('No access');
}

// Test validation logic
const checkPassword = (password) => {
    if (password.length < 8) {
        return 'Password too short';
    } else if (password.length > 20) {
        return 'Password too long';
    } else {
        return 'Password valid';
    }
};

console.log(checkPassword('abc'));      // too short
console.log(checkPassword('ValidPass123')); // valid
```

**Apply in Playwright:**
```javascript
// File: tests/day4-conditionals.spec.js
const { test, expect } = require('@playwright/test');

test('conditional logic - check element visibility', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    // Check if login button is visible
    const loginButton = page.locator('#login-button');
    const isVisible = await loginButton.isVisible();
    
    if (isVisible) {
        console.log('✅ Login button is visible');
        await loginButton.click();
    } else {
        console.log('❌ Login button not found');
    }
});

test('validate login based on credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    const username = 'standard_user';
    const password = 'secret_sauce';
    
    // Decide test path based on data
    if (username && password) {
        console.log('Testing valid login');
        await page.fill('#user-name', username);
        await page.fill('#password', password);
        await page.click('#login-button');
        
        // Should navigate to inventory
        await expect(page).toHaveURL(/inventory/);
    } else {
        console.log('Testing empty credentials');
        await page.click('#login-button');
        
        // Should show error
        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
    }
});
```

---

### DAY 5: Loops + Multiple Elements

**JavaScript: Loops**
```javascript
// Practice on playcode.io

// For loop
for (let i = 0; i < 5; i++) {
    console.log('Test iteration:', i);
}

// Looping through array
let testUsers = ['user1', 'user2', 'user3', 'admin'];

for (let i = 0; i < testUsers.length; i++) {
    console.log('Testing with:', testUsers[i]);
}

// forEach (modern way)
testUsers.forEach((user) => {
    console.log('Login test for:', user);
});

// forEach with index
testUsers.forEach((user, index) => {
    console.log(`Test ${index + 1}: ${user}`);
});

// While loop
let count = 0;
while (count < 3) {
    console.log('Count:', count);
    count++;
}

// Real example: Test data
let products = [
    { name: 'Laptop', price: 1000 },
    { name: 'Mouse', price: 20 },
    { name: 'Keyboard', price: 50 }
];

products.forEach((product) => {
    console.log(`${product.name} costs $${product.price}`);
});
```

**Apply in Playwright:**
```javascript
// File: tests/day5-loops.spec.js
const { test, expect } = require('@playwright/test');

test('loop through multiple test users', async ({ page }) => {
    const users = [
        { username: 'standard_user', password: 'secret_sauce', shouldPass: true },
        { username: 'locked_out_user', password: 'secret_sauce', shouldPass: false },
        { username: 'invalid_user', password: 'wrong', shouldPass: false }
    ];
    
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        console.log(`\nTest ${i + 1}: ${user.username}`);
        
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', user.username);
        await page.fill('#password', user.password);
        await page.click('#login-button');
        
        if (user.shouldPass) {
            console.log('✅ Should login successfully');
            await expect(page).toHaveURL(/inventory/);
        } else {
            console.log('❌ Should fail to login');
            await expect(page).toHaveURL(/saucedemo.com/);
        }
    }
});

test('interact with multiple elements', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Wait for products to load
    await page.waitForSelector('.inventory_item');
    
    // Get all product names
    const productNames = page.locator('.inventory_item_name');
    const count = await productNames.count();
    
    console.log(`Found ${count} products`);
    
    // Loop through and print each product
    for (let i = 0; i < count; i++) {
        const name = await productNames.nth(i).textContent();
        console.log(`Product ${i + 1}: ${name}`);
    }
});
```

**Today's Achievement:** ✅ Data-driven testing!

---

### DAY 6-7: Async/Await + Waiting Strategies

**JavaScript: Async/Await (CRITICAL!)**
```javascript
// Practice on playcode.io

// Simulating a delay (like page load)
function wait(seconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
}

// Without async/await (confusing)
function oldWay() {
    console.log('1. Starting');
    wait(2).then(() => {
        console.log('2. After 2 seconds');
        wait(1).then(() => {
            console.log('3. After 1 more second');
        });
    });
    console.log('4. This runs immediately!');
}

// With async/await (clean and readable)
async function newWay() {
    console.log('1. Starting');
    await wait(2); // Wait for 2 seconds
    console.log('2. After 2 seconds');
    await wait(1); // Wait for 1 more second
    console.log('3. After 1 more second');
    console.log('4. All done!');
}

newWay();

// Practical example: API call simulation
async function fetchUserData(userId) {
    console.log('Fetching user data...');
    await wait(1); // Simulate network delay
    
    return {
        id: userId,
        name: 'John Doe',
        email: 'john@test.com'
    };
}

async function testLogin() {
    console.log('Step 1: Getting user data');
    const user = await fetchUserData(123);
    console.log('User:', user);
    
    console.log('Step 2: Logging in');
    await wait(1);
    console.log('Logged in as:', user.name);
    
    console.log('Step 3: Loading dashboard');
    await wait(1);
    console.log('Dashboard loaded!');
}

testLogin();
```

**Understanding Promises:**
```javascript
// A Promise represents a future value

// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    let success = true;
    
    if (success) {
        resolve('Operation successful!');
    } else {
        reject('Operation failed!');
    }
});

// Using the Promise with async/await
async function handlePromise() {
    try {
        const result = await myPromise;
        console.log(result);
    } catch (error) {
        console.log('Error:', error);
    }
}

handlePromise();
```

**Apply in Playwright:**
```javascript
// File: tests/day6-async-await.spec.js
const { test, expect } = require('@playwright/test');

test('understanding async/await in Playwright', async ({ page }) => {
    // Every Playwright action returns a Promise
    // We use 'await' to wait for it to complete
    
    console.log('1. Starting navigation');
    await page.goto('https://www.saucedemo.com');
    console.log('2. Page loaded');
    
    console.log('3. Filling username');
    await page.fill('#user-name', 'standard_user');
    console.log('4. Username filled');
    
    console.log('5. Filling password');
    await page.fill('#password', 'secret_sauce');
    console.log('6. Password filled');
    
    console.log('7. Clicking login');
    await page.click('#login-button');
    console.log('8. Clicked login');
    
    console.log('9. Waiting for navigation');
    await page.waitForURL(/inventory/);
    console.log('10. Navigation complete!');
    
    // All these happen in sequence because of 'await'
});

test('waiting strategies', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    // Wait for element to be visible
    await page.waitForSelector('#login-button');
    console.log('Login button appeared');
    
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    
    // Click and wait for navigation to complete
    await Promise.all([
        page.waitForNavigation(), // Wait for navigation
        page.click('#login-button') // Click button
    ]);
    console.log('Navigation completed');
    
    // Wait for specific element after navigation
    await page.waitForSelector('.inventory_list');
    console.log('Products loaded');
});

test('handling timeouts', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    // Wait with custom timeout
    await page.waitForSelector('#login-button', { timeout: 5000 }); // 5 seconds
    
    // Wait for element to disappear
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Wait for login button to disappear (means we're logged in)
    await page.waitForSelector('#login-button', { state: 'hidden' });
    console.log('Login button hidden - we are logged in!');
});
```

**Common Waiting Patterns:**
```javascript
// 1. Wait for selector
await page.waitForSelector('#element');

// 2. Wait for URL
await page.waitForURL(/dashboard/);

// 3. Wait for navigation
await page.waitForNavigation();

// 4. Wait for load state
await page.waitForLoadState('networkidle');

// 5. Wait for specific state
await page.waitForSelector('#element', { state: 'visible' });
await page.waitForSelector('#element', { state: 'hidden' });

// 6. Wait for timeout (avoid! Use only when necessary)
await page.waitForTimeout(2000); // 2 seconds
```

**Today's Achievement:** ✅ Understanding async/await - the foundation of Playwright!

---

## WEEK 2: Control Flow + Locators & Selectors

### DAY 8: Installation Review + CSS Selectors

**Playwright Setup Check:**
```bash
# Make sure everything is installed
node --version  # Should show v18 or higher
npm --version   # Should show version

# In your project
npx playwright --version

# Install browsers if needed
npx playwright install
```

**CSS Selectors (Most Important!)**

**Concept: CSS Selectors are how you tell Playwright which element to interact with**

```javascript
// File: tests/day8-css-selectors.spec.js
const { test, expect } = require('@playwright/test');

test('CSS selector basics', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    // 1. ID selector (starts with #)
    // Use when element has unique ID
    const usernameById = page.locator('#user-name');
    await usernameById.fill('standard_user');
    
    // 2. Class selector (starts with .)
    const loginForm = page.locator('.login_wrapper');
    await expect(loginForm).toBeVisible();
    
    // 3. Attribute selector [attribute="value"]
    const usernameByAttr = page.locator('[data-test="username"]');
    const passwordByAttr = page.locator('[data-test="password"]');
    
    await passwordByAttr.fill('secret_sauce');
    
    // 4. Tag name
    const allButtons = page.locator('button');
    const buttonCount = await allButtons.count();
    console.log('Number of buttons:', buttonCount);
    
    // 5. Combining selectors
    const submitButton = page.locator('input#login-button');
    await submitButton.click();
});

test('advanced CSS selectors', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Wait for products page
    await page.waitForSelector('.inventory_list');
    
    // 6. Child selector (>)
    const directChild = page.locator('.inventory_list > .inventory_item');
    
    // 7. Descendant selector (space)
    const anyDescendant = page.locator('.inventory_item .inventory_item_name');
    
    // 8. Multiple classes
    const element = page.locator('.btn.btn_primary');
    
    // 9. Attribute contains (*=)
    const buttonContaining = page.locator('[id*="add-to-cart"]');
    
    // 10. Attribute starts with (^=)
    const startsWithCart = page.locator('[id^="add-to-cart"]');
    
    // 11. Attribute ends with ($=)
    const endsWithBackpack = page.locator('[id$="backpack"]');
    
    // 12. nth element
    const firstProduct = page.locator('.inventory_item').nth(0);
    const secondProduct = page.locator('.inventory_item').nth(1);
    const lastProduct = page.locator('.inventory_item').last();
    
    console.log('First product:', await firstProduct.locator('.inventory_item_name').textContent());
});
```

**CSS Selector Cheat Sheet:**
```javascript
// MEMORIZE THESE:

#id                    // Element with id
.class                 // Element with class
element                // Tag name
[attribute]            // Has attribute
[attribute="value"]    // Attribute equals value
[attribute*="value"]   // Attribute contains value
[attribute^="value"]   // Attribute starts with value
[attribute$="value"]   // Attribute ends with value

parent > child         // Direct child
parent descendant      // Any descendant
element.class          // Element with class
element#id             // Element with id
.class1.class2         // Multiple classes

:first-child           // First child
:last-child            // Last child
:nth-child(n)          // Nth child
```

**Practice Task:**
1. Go to https://www.saucedemo.com
2. Login (username: standard_user, password: secret_sauce)
3. Locate all "Add to cart" buttons using CSS
4. Count how many there are
5. Click the first one

---

### DAY 9: Array Methods + Text Selectors

**JavaScript: Array Methods**
```javascript
// Practice on playcode.io

let numbers = [1, 2, 3, 4, 5];

// forEach - loop through array
numbers.forEach((num) => {
    console.log('Number:', num);
});

// map - transform array
let doubled = numbers.map((num) => num * 2);
console.log('Doubled:', doubled); // [2, 4, 6, 8, 10]

// filter - keep elements that match condition
let evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log('Even numbers:', evenNumbers); // [2, 4]

// find - find first matching element
let firstEven = numbers.find((num) => num % 2 === 0);
console.log('First even:', firstEven); // 2

// some - check if any element matches
let hasEven = numbers.some((num) => num % 2 === 0);
console.log('Has even number:', hasEven); // true

// every - check if all elements match
let allPositive = numbers.every((num) => num > 0);
console.log('All positive:', allPositive); // true

// Test data example
let testUsers = [
    { name: 'John', age: 25, premium: true },
    { name: 'Jane', age: 17, premium: false },
    { name: 'Bob', age: 30, premium: true }
];

// Get all premium users
let premiumUsers = testUsers.filter(user => user.premium);
console.log('Premium users:', premiumUsers);

// Get all adult users
let adults = testUsers.filter(user => user.age >= 18);
console.log('Adults:', adults);

// Get all usernames
let names = testUsers.map(user => user.name);
console.log('Names:', names);
```

**Apply in Playwright with Text Selectors:**
```javascript
// File: tests/day9-text-selectors.spec.js
const { test, expect } = require('@playwright/test');

test('text selectors', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    // 1. Exact text match
    const loginButton = page.locator('text=Login');
    
    // 2. Partial text match (case insensitive)
    const logo = page.getByText('Swag Labs');
    await expect(logo).toBeVisible();
    
    // 3. Regular expression
    const errorMessage = page.getByText(/Username and password/i);
    
    // Login first
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    await page.waitForSelector('.inventory_list');
    
    // 4. Find element by text content
    const backpackTitle = page.getByText('Sauce Labs Backpack');
    await expect(backpackTitle).toBeVisible();
    
    // 5. Combining text with other selectors
    const addButton = page.locator('button', { hasText: 'Add to cart' });
});

test('working with multiple text elements', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    await page.waitForSelector('.inventory_list');
    
    // Get all product names
    const productNames = page.locator('.inventory_item_name');
    const count = await productNames.count();
    console.log(`Found ${count} products`);
    
    // Store all names in array
    let allNames = [];
    for (let i = 0; i < count; i++) {
        const name = await productNames.nth(i).textContent();
        allNames.push(name);
    }
    
    console.log('All product names:', allNames);
    
    // Filter products containing "Sauce"
    let sauceProducts = allNames.filter(name => name.includes('Sauce'));
    console.log('Sauce products:', sauceProducts);
    
    // Transform to uppercase
    let uppercase = allNames.map(name => name.toUpperCase());
    console.log('Uppercase:', uppercase);
});
```

**Today's Achievement:** ✅ Combining JavaScript arrays with Playwright!

---

### DAY 10: Objects + Role-Based Selectors

**JavaScript: Objects**
```javascript
// Practice on playcode.io

// Creating objects
let user = {
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    email: 'john@test.com',
    isActive: true
};

// Accessing properties
console.log(user.firstName);      // Dot notation
console.log(user['lastName']);    // Bracket notation
console.log(user.email);

// Adding properties
user.phone = '1234567890';
console.log(user.phone);

// Nested objects
let testData = {
    validUser: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    invalidUser: {
        username: 'invalid',
        password: 'wrong'
    },
    website: {
        url: 'https://www.saucedemo.com',
        title: 'Swag Labs'
    }
};

console.log(testData.validUser.username);
console.log(testData.website.url);

// Object methods
let product = {
    name: 'Laptop',
    price: 1000,
    discount: 0.1,
    
    // Method
    getFinalPrice: function() {
        return this.price * (1 - this.discount);
    },
    
    // Shorter syntax
    getInfo() {
        return `${this.name} costs $${this.price}`;
    }
};

console.log(product.getFinalPrice());  // 900
console.log(product.getInfo());        // Laptop costs $1000

// Destructuring (modern way)
let { username, password } = testData.validUser;
console.log(username); // standard_user
console.log(password); // secret_sauce
```

**Apply in Playwright with Role Selectors:**
```javascript
// File: tests/day10-role-selectors.spec.js
const { test, expect } = require('@playwright/test');

// Test data object
const testData = {
    validUser: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    website: {
        baseUrl: 'https://www.saucedemo.com'
    }
};

test('role-based selectors', async ({ page }) => {
    const { baseUrl } = testData.website;
    await page.goto(baseUrl);
    
    // 1. By role and name (BEST PRACTICE!)
    const usernameInput = page.getByRole('textbox', { name: /username/i });
    const passwordInput = page.getByRole('textbox', { name: /password/i });
    const loginButton = page.getByRole('button', { name: 'Login' });
    
    // Use test data object
    const { username, password } = testData.validUser;
    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();
    
    await page.waitForURL(/inventory/);
    
    // More role selectors
    const heading = page.getByRole('heading', { name: 'Products' });
    await expect(heading).toBeVisible();
    
    // Find link by role
    const aboutLink = page.getByRole('link', { name: 'About' });
    
    // Find all buttons
    const allButtons = page.getByRole('button');
    const buttonCount = await allButtons.count();
    console.log('Total buttons:', buttonCount);
});

test('combining objects and role selectors', async ({ page }) => {
    // Multiple test scenarios
    const scenarios = [
        {
            name: 'Valid Login',
            username: 'standard_user',
            password: 'secret_sauce',
            shouldPass: true
        },
        {
            name: 'Invalid Password',
            username: 'standard_user',
            password: 'wrong_password',
            shouldPass: false
        }
    ];
    
    for (const scenario of scenarios) {
        console.log(`\nTesting: ${scenario.name}`);
        
        await page.goto('https://www.saucedemo.com');
        
        const usernameField = page.getByRole('textbox', { name: /username/i });
        const passwordField = page.getByRole('textbox', { name: /password/i });
        const submitButton = page.getByRole('button', { name: 'Login' });
        
        await usernameField.fill(scenario.username);
        await passwordField.fill(scenario.password);
        await submitButton.click();
        
        if (scenario.shouldPass) {
            await expect(page).toHaveURL(/inventory/);
            console.log('✅ Login successful');
        } else {
            await expect(page).toHaveURL(/saucedemo.com/);
            console.log('❌ Login failed as expected');
        }
    }
});
```

**Common Roles:**
```javascript
// Buttons
page.getByRole('button')
page.getByRole('button', { name: 'Submit' })

// Links
page.getByRole('link', { name: 'Home' })

// Text inputs
page.getByRole('textbox')
page.getByRole('textbox', { name: 'Email' })

// Headings
page.getByRole('heading', { name: 'Welcome' })
page.getByRole('heading', { level: 1 })

// Checkboxes
page.getByRole('checkbox', { name: 'Remember me' })

// Radio buttons
page.getByRole('radio', { name: 'Male' })

// Images
page.getByRole('img', { name: 'Logo' })

// Lists
page.getByRole('list')
page.getByRole('listitem')
```

**Today's Achievement:** ✅ Test data organization + accessible selectors!

---

### DAY 11: Try/Catch + Locator Best Practices

**JavaScript: Error Handling**
```javascript
// Practice on playcode.io

// Without try/catch - program crashes
function divide(a, b) {
    return a / b;
}

// console.log(divide(10, 0)); // Returns Infinity

// Better with validation
function safeDivide(a, b) {
    if (b === 0) {
        throw new Error('Cannot divide by zero');
    }
    return a / b;
}

// Using try/catch
try {
    console.log(safeDivide(10, 2));  // Works
    console.log(safeDivide(10, 0));  // Throws error
} catch (error) {
    console.log('Error occurred:', error.message);
}

// Async/await with try/catch
async function fetchData() {
    try {
        // Simulate API call
        console.log('Fetching data...');
        // If this fails, catch block runs
        throw new Error('Network error');
    } catch (error) {
        console.log('Failed to fetch:', error.message);
        return null;
    } finally {
        console.log('Cleanup - always runs');
    }
}

fetchData();

// Real testing scenario
function validateEmail(email) {
    if (!email.includes('@')) {
        throw new Error('Invalid email format');
    }
    return true;
}

try {
    validateEmail('test@example.com'); // Valid
    console.log('Email is valid');
} catch (error) {
    console.log('Validation failed:', error.message);
}
```

**Apply in Playwright:**
```javascript
// File: tests/day11-error-handling.spec.js
const { test, expect } = require('@playwright/test');

test('handling errors gracefully', async ({ page }) => {
    try {
        await page.goto('https://www.saucedemo.com');
        
        // Try to find an element that might not exist
        const optionalElement = page.locator('#might-not-exist');
        
        // Check if it exists before interacting
        const exists = await optionalElement.count() > 0;
        
        if (exists) {
            await optionalElement.click();
        } else {
            console.log('Element not found, continuing test');
        }
        
        // Continue with test
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        
    } catch (error) {
        console.log('Error in test:', error.message);
        // Take screenshot for debugging
        await page.screenshot({ path: 'error-screenshot.png' });
    }
});

test('locator best practices', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    // ✅ GOOD - Role-based (user-facing)
    const loginButtonGood = page.getByRole('button', { name: 'Login' });
    
    // ✅ GOOD - Test ID
    const usernameGoodTestId = page.getByTestId('username'); // If data-testid exists
    
    // ✅ GOOD - Unique ID
    const usernameGood = page.locator('#user-name');
    
    // ⚠️ OK - Attribute
    const usernameOk = page.locator('[data-test="username"]');
    
    // ❌ BAD - Too generic
    const buttonBad = page.locator('button'); // Which button?
    
    // ❌ BAD - Position-based
    const buttonWorst = page.locator('button').nth(2); // Will break if buttons change
    
    // ❌ BAD - Complex CSS
    const inputBad = page.locator('.login_wrapper .form_group input.input_error');
    
    // Best practice: Use the most specific, stable locator
    await usernameGood.fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await loginButtonGood.click();
});

test('defensive programming', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    // 1. Wait for element before interacting
    await page.waitForSelector('#user-name', { state: 'visible' });
    await page.fill('#user-name', 'standard_user');
    
    // 2. Check if element exists
    const errorMessage = page.locator('[data-test="error"]');
    const hasError = await errorMessage.count() > 0;
    
    if (hasError) {
        const errorText = await errorMessage.textContent();
        console.log('Error:', errorText);
    }
    
    // 3. Use assertions with clear messages
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    await expect(page).toHaveURL(/inventory/, {
        timeout: 5000
    });
});
```

**Locator Priority Checklist:**
```javascript
// Priority order (best to worst):

// 1. BEST: getByRole (accessible, user-facing)
page.getByRole('button', { name: 'Submit' })

// 2. GREAT: getByTestId (added for testing)
page.getByTestId('submit-btn')

// 3. GOOD: getByLabel, getByPlaceholder (user-facing)
page.getByLabel('Email')
page.getByPlaceholder('Enter email')

// 4. OK: Unique attributes
page.locator('#email-input')
page.locator('[data-test="email"]')

// 5. AVOID: Fragile selectors
page.locator('.btn.btn-primary') // Classes can change
page.locator('div > div > button') // Position-dependent
page.locator('button').nth(2) // Index-based
```

---

### DAY 12-13: JSON + Test Data Management

**JavaScript: JSON**
```javascript
// JSON = JavaScript Object Notation
// Used for storing and exchanging data

// JavaScript Object
let user = {
    name: 'John',
    age: 25,
    email: 'john@test.com'
};

// Convert to JSON string
let jsonString = JSON.stringify(user);
console.log('JSON string:', jsonString);
// {"name":"John","age":25,"email":"john@test.com"}

// Convert from JSON string
let jsonObject = JSON.parse(jsonString);
console.log('JavaScript object:', jsonObject);

// Reading JSON data
let testDataJSON = `{
    "users": [
        {
            "username": "standard_user",
            "password": "secret_sauce",
            "type": "valid"
        },
        {
            "username": "locked_out_user",
            "password": "secret_sauce",
            "type": "locked"
        }
    ],
    "website": {
        "url": "https://www.saucedemo.com",
        "title": "Swag Labs"
    }
}`;

let testData = JSON.parse(testDataJSON);
console.log('First user:', testData.users[0]);
console.log('Website URL:', testData.website.url);

// Iterate through users
testData.users.forEach((user, index) => {
    console.log(`User ${index + 1}:`, user.username, user.type);
});
```

**Apply in Playwright:**
```javascript
// File: tests/test-data.json
{
    "validUsers": [
        {
            "username": "standard_user",
            "password": "secret_sauce",
            "expectedUrl": "inventory.html"
        },
        {
            "username": "problem_user",
            "password": "secret_sauce",
            "expectedUrl": "inventory.html"
        }
    ],
    "invalidUsers": [
        {
            "username": "locked_out_user",
            "password": "secret_sauce",
            "expectedError": "Epic sadface: Sorry, this user has been locked out."
        },
        {
            "username": "invalid_user",
            "password": "wrong_password",
            "expectedError": "Epic sadface: Username and password do not match"
        }
    ],
    "products": [
        {
            "name": "Sauce Labs Backpack",
            "price": 29.99
        },
        {
            "name": "Sauce Labs Bike Light",
            "price": 9.99
        }
    ]
}
```

```javascript
// File: tests/day12-test-data.spec.js
const { test, expect } = require('@playwright/test');
const testData = require('./test-data.json');

test('data-driven testing - valid users', async ({ page }) => {
    for (const user of testData.validUsers) {
        console.log(`\nTesting user: ${user.username}`);
        
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', user.username);
        await page.fill('#password', user.password);
        await page.click('#login-button');
        
        await expect(page).toHaveURL(new RegExp(user.expectedUrl));
        console.log('✅ Login successful');
    }
});

test('data-driven testing - invalid users', async ({ page }) => {
    for (const user of testData.invalidUsers) {
        console.log(`\nTesting user: ${user.username}`);
        
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', user.username);
        await page.fill('#password', user.password);
        await page.click('#login-button');
        
        const errorElement = page.locator('[data-test="error"]');
        await expect(errorElement).toBeVisible();
        
        const errorText = await errorElement.textContent();
        console.log('Error message:', errorText);
    }
});

test('using product data', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    await page.waitForSelector('.inventory_list');
    
    // Check if products from test data exist
    for (const product of testData.products) {
        console.log(`Checking product: ${product.name}`);
        
        const productElement = page.getByText(product.name);
        await expect(productElement).toBeVisible();
    }
});
```

**Creating Test Data Helpers:**
```javascript
// File: tests/helpers/test-data-helper.js
const testData = require('../test-data.json');

class TestDataHelper {
    // Get a random valid user
    getRandomValidUser() {
        const users = testData.validUsers;
        const randomIndex = Math.floor(Math.random() * users.length);
        return users[randomIndex];
    }
    
    // Get a specific user by username
    getUserByUsername(username) {
        return testData.validUsers.find(user => user.username === username)
            || testData.invalidUsers.find(user => user.username === username);
    }
    
    // Get all products
    getAllProducts() {
        return testData.products;
    }
    
    // Get product by name
    getProductByName(name) {
        return testData.products.find(product => product.name === name);
    }
}

module.exports = { TestDataHelper };
```

```javascript
// File: tests/day13-using-helper.spec.js
const { test, expect } = require('@playwright/test');
const { TestDataHelper } = require('./helpers/test-data-helper');

const dataHelper = new TestDataHelper();

test('using test data helper', async ({ page }) => {
    // Get random user
    const user = dataHelper.getRandomValidUser();
    console.log('Testing with user:', user.username);
    
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', user.username);
    await page.fill('#password', user.password);
    await page.click('#login-button');
    
    await expect(page).toHaveURL(/inventory/);
});

test('find specific product', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Get product from test data
    const product = dataHelper.getProductByName('Sauce Labs Backpack');
    console.log('Looking for:', product.name);
    console.log('Expected price:', product.price);
    
    const productElement = page.getByText(product.name);
    await expect(productElement).toBeVisible();
});
```

**Today's Achievement:** ✅ Organized test data management!

---

### DAY 14: Week 2 Review + Mini Project

**Review Concepts:**
1. ✅ CSS Selectors
2. ✅ Text Selectors
3. ✅ Role-based Selectors
4. ✅ Array methods (map, filter, forEach)
5. ✅ Objects and JSON
6. ✅ Error handling (try/catch)
7. ✅ Test data management

**Mini Project: Complete Login Test Suite**

```javascript
// File: tests/test-data/login-data.json
{
    "baseUrl": "https://www.saucedemo.com",
    "testScenarios": {
        "validLogins": [
            {
                "id": "TC001",
                "description": "Standard user login",
                "username": "standard_user",
                "password": "secret_sauce",
                "expectedResult": "success"
            },
            {
                "id": "TC002",
                "description": "Problem user login",
                "username": "problem_user",
                "password": "secret_sauce",
                "expectedResult": "success"
            }
        ],
        "invalidLogins": [
            {
                "id": "TC003",
                "description": "Locked out user",
                "username": "locked_out_user",
                "password": "secret_sauce",
                "expectedError": "Epic sadface: Sorry, this user has been locked out."
            },
            {
                "id": "TC004",
                "description": "Invalid credentials",
                "username": "invalid_user",
                "password": "wrong_password",
                "expectedError": "Epic sadface: Username and password do not match"
            },
            {
                "id": "TC005",
                "description": "Empty username",
                "username": "",
                "password": "secret_sauce",
                "expectedError": "Epic sadface: Username is required"
            },
            {
                "id": "TC006",
                "description": "Empty password",
                "username": "standard_user",
                "password": "",
                "expectedError": "Epic sadface: Password is required"
            }
        ]
    }
}
```

```javascript
// File: tests/week2-project-login-suite.spec.js
const { test, expect } = require('@playwright/test');
const loginData = require('./test-data/login-data.json');

// Helper function
async function attemptLogin(page, username, password) {
    await page.goto(loginData.baseUrl);
    
    if (username) {
        await page.fill('#user-name', username);
    }
    if (password) {
        await page.fill('#password', password);
    }
    
    await page.click('#login-button');
}

// Test valid logins
test.describe('Valid Login Tests', () => {
    for (const scenario of loginData.testScenarios.validLogins) {
        test(scenario.description, async ({ page }) => {
            console.log(`\n${scenario.id}: ${scenario.description}`);
            console.log(`Username: ${scenario.username}`);
            
            await attemptLogin(page, scenario.username, scenario.password);
            
            // Verify successful login
            await expect(page).toHaveURL(/inventory/);
            console.log('✅ Test passed');
        });
    }
});

// Test invalid logins
test.describe('Invalid Login Tests', () => {
    for (const scenario of loginData.testScenarios.invalidLogins) {
        test(scenario.description, async ({ page }) => {
            console.log(`\n${scenario.id}: ${scenario.description}`);
            console.log(`Username: "${scenario.username}"`);
            console.log(`Password: "${scenario.password}"`);
            
            await attemptLogin(page, scenario.username, scenario.password);
            
            // Verify error message
            const errorElement = page.locator('[data-test="error"]');
            await expect(errorElement).toBeVisible();
            
            const actualError = await errorElement.textContent();
            console.log('Expected error:', scenario.expectedError);
            console.log('Actual error:', actualError);
            
            expect(actualError).toContain(scenario.expectedError);
            console.log('✅ Test passed');
        });
    }
});

// Test UI elements
test.describe('Login Page UI Tests', () => {
    test('verify all login page elements', async ({ page }) => {
        await page.goto(loginData.baseUrl);
        
        // Check logo
        const logo = page.locator('.login_logo');
        await expect(logo).toBeVisible();
        await expect(logo).toHaveText('Swag Labs');
        
        // Check input fields
        const usernameInput = page.locator('#user-name');
        const passwordInput = page.locator('#password');
        await expect(usernameInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
        
        // Check placeholders
        await expect(usernameInput).toHaveAttribute('placeholder', 'Username');
        await expect(passwordInput).toHaveAttribute('placeholder', 'Password');
        
        // Check login button
        const loginButton = page.locator('#login-button');
        await expect(loginButton).toBeVisible();
        await expect(loginButton).toHaveValue('Login');
        
        console.log('✅ All UI elements present');
    });
});
```

**Run your mini project:**
```bash
npx playwright test week2-project-login-suite.spec.js --headed
```

**Today's Achievement:** ✅ Complete test suite with organized data!

---

## WEEK 3: Async/Await Deep Dive + Actions

### DAY 15: Advanced Async/Await + Clicking

**Async/Await Patterns:**
```javascript
// Practice on playcode.io

// Sequential execution
async function sequential() {
    console.log('Start');
    await wait(1); // Wait 1 second
    console.log('After 1 second');
    await wait(1);
    console.log('After 2 seconds');
    await wait(1);
    console.log('After 3 seconds');
}

// Parallel execution
async function parallel() {
    console.log('Start');
    
    // Start all promises at once
    const promise1 = wait(1);
    const promise2 = wait(1);
    const promise3 = wait(1);
    
    // Wait for all to complete
    await Promise.all([promise1, promise2, promise3]);
    console.log('All done (took 1 second, not 3!)');
}

// Error handling
async function withErrorHandling() {
    try {
        await riskyOperation();
        console.log('Success!');
    } catch (error) {
        console.log('Failed:', error.message);
    } finally {
        console.log('Cleanup code runs here');
    }
}
```

**Apply in Playwright:**
```javascript
// File: tests/day15-clicking.spec.js
const { test, expect } = require('@playwright/test');

test('different click types', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    await page.waitForSelector('.inventory_list');
    
    // 1. Regular click
    const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await addButton.click();
    console.log('✅ Clicked add to cart');
    
    // 2. Click and wait for something
    await Promise.all([
        page.waitForSelector('.shopping_cart_badge'),
        addButton.click()
    ]);
    
    // 3. Click with options
    await page.click('#shopping_cart_container', {
        clickCount: 1, // Single click
        button: 'left', // Left mouse button
        delay: 100 // Wait 100ms before releasing
    });
    
    // 4. Double click
    // await page.dblclick('#element');
    
    // 5. Right click
    // await page.click('#element', { button: 'right' });
    
    // 6. Force click (even if element not visible)
    // await page.click('#element', { force: true });
});

test('click and navigate', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    
    // Click and wait for navigation
    await Promise.all([
        page.waitForNavigation(),
        page.click('#login-button')
    ]);
    
    console.log('Navigated to:', page.url());
    await expect(page).toHaveURL(/inventory/);
});

test('clicking multiple elements', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    await page.waitForSelector('.inventory_list');
    
    // Get all "Add to cart" buttons
    const addButtons = page.locator('[id^="add-to-cart"]');
    const count = await addButtons.count();
    console.log(`Found ${count} add buttons`);
    
    // Click first 3 buttons
    for (let i = 0; i < Math.min(3, count); i++) {
        await addButtons.nth(i).click();
        console.log(`Clicked button ${i + 1}`);
        await page.waitForTimeout(500); // Small delay
    }
    
    // Verify cart badge
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('3');
});
```

**Today's Achievement:** ✅ Mastering clicks and async operations!

---

### DAY 16: Filling Forms

**Concept: Form Interactions**
```javascript
// File: tests/day16-forms.spec.js
const { test, expect } = require('@playwright/test');

test('basic form filling', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    // fill() - Clears and types
    await page.fill('#user-name', 'standard_user');
    
    // Verify value was filled
    const username = page.locator('#user-name');
    await expect(username).toHaveValue('standard_user');
    
    // Fill password
    await page.fill('#password', 'secret_sauce');
    
    // Clear a field
    await page.fill('#user-name', '');
    
    // Fill again
    await page.fill('#user-name', 'standard_user');
    
    await page.click('#login-button');
});

test('keyboard actions', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    // Type (slower, simulates real typing)
    await page.type('#user-name', 'standard_user', { delay: 100 });
    
    // Press keys
    await page.press('#user-name', 'Control+A'); // Select all
    await page.press('#user-name', 'Backspace'); // Delete
    
    // Type again
    await page.fill('#user-name', 'standard_user');
    
    // Tab to next field
    await page.press('#user-name', 'Tab');
    
    // Type password
    await page.fill('#password', 'secret_sauce');
    
    // Press Enter to submit
    await page.press('#password', 'Enter');
    
    await page.waitForURL(/inventory/);
});

test('form validation', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    // Try to submit empty form
    await page.click('#login-button');
    
    // Check error message
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    
    const errorText = await error.textContent();
    console.log('Error:', errorText);
    expect(errorText).toContain('Username is required');
});
```

---

### DAY 17: Checkboxes & Radio Buttons

```javascript
// File: tests/day17-checkboxes-radio.spec.js
const { test, expect } = require('@playwright/test');

test('working with checkboxes', async ({ page }) => {
    // Example website with checkboxes
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    
    // Check a checkbox
    await page.check('input[type="checkbox"]');
    
    // Uncheck
    await page.uncheck('input[type="checkbox"]');
    
    // Toggle (check if unchecked, uncheck if checked)
    const checkbox = page.locator('input[type="checkbox"]').first();
    const wasChecked = await checkbox.isChecked();
    console.log('Was checked:', wasChecked);
    
    if (wasChecked) {
        await checkbox.uncheck();
    } else {
        await checkbox.check();
    }
    
    // Verify state
    await expect(checkbox).toBeChecked();
});

test('working with radio buttons', async ({ page }) => {
    // Navigate to a page with radio buttons
    // This is just an example structure
    await page.goto('URL_WITH_RADIO_BUTTONS');
    
    // Select a radio button
    await page.check('input[value="male"]');
    
    // Verify it's selected
    const maleRadio = page.locator('input[value="male"]');
    await expect(maleRadio).toBeChecked();
    
    // Select another radio button
    await page.check('input[value="female"]');
    
    // Verify first one is now unchecked
    await expect(maleRadio).not.toBeChecked();
});
```

---

### DAY 18: Dropdowns & Select Elements

```javascript
// File: tests/day18-dropdowns.spec.js
const { test, expect } = require('@playwright/test');

test('working with dropdowns', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    
    const dropdown = page.locator('#dropdown');
    
    // Select by value
    await dropdown.selectOption('1');
    
    // Select by label
    await dropdown.selectOption({ label: 'Option 2' });
    
    // Select by index (0-based)
    await dropdown.selectOption({ index: 1 });
    
    // Verify selected value
    const selectedValue = await dropdown.inputValue();
    console.log('Selected value:', selectedValue);
    
    // Get selected text
    const selectedText = await dropdown.locator('option:checked').textContent();
    console.log('Selected text:', selectedText);
});

test('multiple selection dropdown', async ({ page }) => {
    // Example for multiple select
    await page.goto('URL_WITH_MULTI_SELECT');
    
    const multiSelect = page.locator('#multi-select');
    
    // Select multiple options
    await multiSelect.selectOption(['option1', 'option2', 'option3']);
    
    // Get all selected values
    const selected = await multiSelect.evaluate(el => 
        Array.from(el.selectedOptions).map(option => option.value)
    );
    console.log('Selected:', selected);
});
```

---

### DAY 19-20: File Upload & Download

```javascript
// File: tests/day19-file-upload.spec.js
const { test, expect } = require('@playwright/test');
const path = require('path');

test('file upload', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    
    // Path to file to upload
    const filePath = path.join(__dirname, 'test-files', 'sample.txt');
    
    // Upload file
    await page.setInputFiles('#file-upload', filePath);
    
    // Click upload button
    await page.click('#file-submit');
    
    // Verify upload success
    const uploadedFile = page.locator('#uploaded-files');
    await expect(uploadedFile).toContainText('sample.txt');
});

test('multiple file upload', async ({ page }) => {
    await page.goto('URL');
    
    const files = [
        path.join(__dirname, 'test-files', 'file1.txt'),
        path.join(__dirname, 'test-files', 'file2.txt')
    ];
    
    await page.setInputFiles('#file-input', files);
});

test('remove file', async ({ page }) => {
    await page.goto('URL');
    
    // Upload file first
    await page.setInputFiles('#file-input', 'path/to/file.txt');
    
    // Remove file
    await page.setInputFiles('#file-input', []);
});
```

```javascript
// File: tests/day20-file-download.spec.js
test('file download', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');
    
    // Start waiting for download before clicking
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click('a[href="download/sample.txt"]')
    ]);
    
    // Get download info
    console.log('Downloaded:', download.suggestedFilename());
    
    // Save file
    await download.saveAs(path.join(__dirname, 'downloads', download.suggestedFilename()));
});
```

---

### DAY 21: Hover & Mouse Actions

```javascript
// File: tests/day21-hover-mouse.spec.js
const { test, expect } = require('@playwright/test');

test('hover actions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    
    // Hover over element
    const avatar = page.locator('.figure').first();
    await avatar.hover();
    
    // Wait for hover effect
    const caption = page.locator('.figcaption').first();
    await expect(caption).toBeVisible();
    
    // Get text after hover
    const text = await caption.textContent();
    console.log('Hover text:', text);
});

test('mouse movements', async ({ page }) => {
    await page.goto('URL');
    
    // Move mouse to specific coordinates
    await page.mouse.move(100, 200);
    
    // Mouse down (press mouse button)
    await page.mouse.down();
    
    // Mouse up (release mouse button)
    await page.mouse.up();
    
    // Click at specific position
    await page.mouse.click(150, 250);
    
    // Double click
    await page.mouse.dblclick(150, 250);
});

test('drag and drop', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    
    const source = page.locator('#column-a');
    const target = page.locator('#column-b');
    
    // Drag and drop
    await source.dragTo(target);
    
    // Verify
    const columnAText = await page.locator('#column-a header').textContent();
    console.log('Column A now contains:', columnAText);
});
```

**Week 3 Achievement:** ✅ Master all UI interactions!

---

## WEEK 4: Objects/Arrays Deep Dive + Advanced Interactions

### DAY 22-23: Advanced Objects & Arrays

**JavaScript: Deep Dive**
```javascript
// Practice on playcode.io

// Spread operator
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Object spread
let user1 = { name: 'John', age: 25 };
let user2 = { ...user1, email: 'john@test.com' };
console.log(user2); // { name: 'John', age: 25, email: 'john@test.com' }

// Destructuring arrays
let [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest);  // [3, 4, 5]

// Destructuring objects
let user = {
    name: 'John',
    email: 'john@test.com',
    address: {
        city: 'Hyderabad',
        country: 'India'
    }
};

let { name, email, address: { city } } = user;
console.log(name);  // John
console.log(city);  // Hyderabad

// Array methods chaining
let numbers = [1, 2, 3, 4, 5, 6];
let result = numbers
    .filter(n => n % 2 === 0)  // Get even numbers: [2, 4, 6]
    .map(n => n * 2)           // Double them: [4, 8, 12]
    .reduce((sum, n) => sum + n, 0); // Sum: 24

console.log(result); // 24

// Practical testing example
let testResults = [
    { test: 'Login', status: 'passed', time: 2.5 },
    { test: 'Signup', status: 'failed', time: 3.1 },
    { test: 'Checkout', status: 'passed', time: 5.2 },
    { test: 'Search', status: 'passed', time: 1.8 }
];

// Get all passed tests
let passed = testResults.filter(t => t.status === 'passed');
console.log('Passed tests:', passed);

// Get test names
let testNames = testResults.map(t => t.name);

// Total time
let totalTime = testResults.reduce((sum, t) => sum + t.time, 0);
console.log('Total time:', totalTime);

// Find specific test
let loginTest = testResults.find(t => t.test === 'Login');
console.log('Login test:', loginTest);
```

**Apply in Playwright:**
```javascript
// File: tests/day22-advanced-data.spec.js
const { test, expect } = require('@playwright/test');

const testData = {
    users: [
        { username: 'standard_user', password: 'secret_sauce', type: 'standard' },
        { username: 'problem_user', password: 'secret_sauce', type: 'problem' },
        { username: 'performance_glitch_user', password: 'secret_sauce', type: 'slow' }
    ],
    products: [
        { name: 'Backpack', minPrice: 20, maxPrice: 40 },
        { name: 'Bike Light', minPrice: 5, maxPrice: 15 }
    ]
};

test('using destructuring', async ({ page }) => {
    // Destructure user data
    const { username, password } = testData.users[0];
    
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');
});

test('filtering and mapping products', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    await page.waitForSelector('.inventory_list');
    
    // Get all product elements
    const productElements = page.locator('.inventory_item');
    const count = await productElements.count();
    
    // Collect all product data
    let allProducts = [];
    for (let i = 0; i < count; i++) {
        const name = await productElements.nth(i).locator('.inventory_item_name').textContent();
        const priceText = await productElements.nth(i).locator('.inventory_item_price').textContent();
        const price = parseFloat(priceText.replace('$', ''));
        
        allProducts.push({ name, price });
    }
    
    console.log('All products:', allProducts);
    
    // Filter products under $30
    const affordable = allProducts.filter(p => p.price < 30);
    console.log('Affordable products:', affordable);
    
    // Get just the names
    const productNames = allProducts.map(p => p.name);
    console.log('Product names:', productNames);
    
    // Find most expensive
    const mostExpensive = allProducts.reduce((max, p) => 
        p.price > max.price ? p : max
    );
    console.log('Most expensive:', mostExpensive);
});
```

---

### DAY 24-25: Iframes & Alerts

```javascript
// File: tests/day24-iframes.spec.js
const { test, expect } = require('@playwright/test');

test('working with iframes', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    
    // Get iframe
    const frame = page.frameLocator('#mce_0_ifr');
    
    // Interact with elements inside iframe
    const editor = frame.locator('#tinymce');
    await editor.clear();
    await editor.fill('Hello from Playwright!');
    
    // Verify
    await expect(editor).toHaveText('Hello from Playwright!');
});

test('nested iframes', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/nested_frames');
    
    // Access frame by name
    const topFrame = page.frame({ name: 'frame-top' });
    const middleFrame = topFrame?.childFrames()[1];
    
    if (middleFrame) {
        const content = await middleFrame.locator('body').textContent();
        console.log('Middle frame content:', content);
    }
});
```

```javascript
// File: tests/day25-alerts.spec.js
test('handling alerts', async ({ page }) => {
    // Listen for alert before it appears
    page.on('dialog', async dialog => {
        console.log('Alert message:', dialog.message());
        await dialog.accept(); // Click OK
    });
    
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.click('button[onclick="jsAlert()"]');
});

test('handling confirm dialog', async ({ page }) => {
    page.on('dialog', async dialog => {
        console.log('Type:', dialog.type()); // confirm
        await dialog.dismiss(); // Click Cancel
    });
    
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.click('button[onclick="jsConfirm()"]');
    
    const result = page.locator('#result');
    await expect(result).toHaveText('You clicked: Cancel');
});

test('handling prompt', async ({ page }) => {
    page.on('dialog', async dialog => {
        await dialog.accept('Playwright User'); // Enter text and click OK
    });
    
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.click('button[onclick="jsPrompt()"]');
    
    const result = page.locator('#result');
    await expect(result).toContainText('Playwright User');
});
```

---

### DAY 26-27: Multiple Windows & Tabs

```javascript
// File: tests/day26-windows.spec.js
const { test, expect } = require('@playwright/test');

test('handling new windows', async ({ context, page }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');
    
    // Wait for new page to open
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.click('a[href="/windows/new"]')
    ]);
    
    // Wait for new page to load
    await newPage.waitForLoadState();
    
    // Work with new page
    const heading = await newPage.locator('h3').textContent();
    console.log('New window heading:', heading);
    
    // Switch back to original page
    await page.bringToFront();
    console.log('Original page title:', await page.title());
    
    // Close new page
    await newPage.close();
});

test('working with multiple tabs', async ({ context, page }) => {
    await page.goto('https://the-internet.herokuapp.com');
    
    // Open multiple new tabs
    const page2 = await context.newPage();
    await page2.goto('https://www.google.com');
    
    const page3 = await context.newPage();
    await page3.goto('https://playwright.dev');
    
    // Work with each page
    console.log('Page 1:', await page.title());
    console.log('Page 2:', await page2.title());
    console.log('Page 3:', await page3.title());
    
    // Close pages
    await page2.close();
    await page3.close();
});
```

---

### DAY 28: Week 4 Review + Practice Project

**Practice Project: E-commerce Flow**
```javascript
// File: tests/week4-project-ecommerce.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Complete E-commerce Flow', () => {
    test('add multiple products and checkout', async ({ page }) => {
        // Login
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        
        await page.waitForSelector('.inventory_list');
        
        // Add 3 products to cart
        const productsToAdd = [
            'sauce-labs-backpack',
            'sauce-labs-bike-light',
            'sauce-labs-bolt-t-shirt'
        ];
        
        for (const productId of productsToAdd) {
            await page.click(`[data-test="add-to-cart-${productId}"]`);
        }
        
        // Verify cart badge
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('3');
        
        // Go to cart
        await page.click('.shopping_cart_link');
        await expect(page).toHaveURL(/cart/);
        
        // Verify items in cart
        const cartItems = page.locator('.cart_item');
        const itemCount = await cartItems.count();
        expect(itemCount).toBe(3);
        
        // Proceed to checkout
        await page.click('[data-test="checkout"]');
        
        // Fill checkout form
        await page.fill('[data-test="firstName"]', 'John');
        await page.fill('[data-test="lastName"]', 'Doe');
        await page.fill('[data-test="postalCode"]', '12345');
        await page.click('[data-test="continue"]');
        
        // Verify checkout overview
        await expect(page).toHaveURL(/checkout-step-two/);
        
        // Finish order
        await page.click('[data-test="finish"]');
        
        // Verify success
        await expect(page).toHaveURL(/checkout-complete/);
        const successMessage = page.locator('.complete-header');
        await expect(successMessage).toHaveText('Thank you for your order!');
        
        console.log('✅ Complete e-commerce flow successful!');
    });
});
```

**Week 4 Achievement:** ✅ Complex user flows & advanced interactions!

---

## WEEK 5: TypeScript + Assertions

### DAY 29-30: TypeScript Basics

**Why TypeScript?**
- Catch errors before running tests
- Better code completion
- Self-documenting code

**TypeScript Basics:**
```typescript
// Basic types
let username: string = 'testuser';
let age: number = 25;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: string[] = ['a', 'b', 'c'];

// Objects (interfaces)
interface User {
    username: string;
    password: string;
    age: number;
    isActive: boolean;
}

let user: User = {
    username: 'john',
    password: 'pass123',
    age: 25,
    isActive: true
};

// Functions with types
function login(username: string, password: string): boolean {
    // Implementation
    return true;
}

// Arrow function with types
const calculateTotal = (price: number, quantity: number): number => {
    return price * quantity;
};

// Optional parameters
function greet(name: string, greeting?: string): string {
    if (greeting) {
        return `${greeting}, ${name}!`;
    }
    return `Hello, ${name}!`;
}

console.log(greet('John')); // Hello, John!
console.log(greet('John', 'Hi')); // Hi, John!
```

**Apply in Playwright:**
```typescript
// File: tests/day29-typescript.spec.ts
import { test, expect, Page } from '@playwright/test';

// Define types for test data
interface LoginCredentials {
    username: string;
    password: string;
}

interface Product {
    id: string;
    name: string;
    price: number;
}

// Helper function with types
async function login(page: Page, credentials: LoginCredentials): Promise<void> {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', credentials.username);
    await page.fill('#password', credentials.password);
    await page.click('#login-button');
}

test('TypeScript in Playwright', async ({ page }) => {
    const credentials: LoginCredentials = {
        username: 'standard_user',
        password: 'secret_sauce'
    };
    
    await login(page, credentials);
    await expect(page).toHaveURL(/inventory/);
});

// Class with TypeScript
class ProductPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    
    async addToCart(productId: string): Promise<void> {
        await this.page.click(`[data-test="add-to-cart-${productId}"]`);
    }
    
    async getCartCount(): Promise<number> {
        const badge = this.page.locator('.shopping_cart_badge');
        const isVisible = await badge.isVisible();
        
        if (!isVisible) return 0;
        
        const text = await badge.textContent();
        return parseInt(text || '0');
    }
}

test('using TypeScript class', async ({ page }) => {
    await login(page, {
        username: 'standard_user',
        password: 'secret_sauce'
    });
    
    const productPage = new ProductPage(page);
    await productPage.addToCart('sauce-labs-backpack');
    
    const count = await productPage.getCartCount();
    expect(count).toBe(1);
});
```

---

### DAY 31-33: Assertions Deep Dive

```typescript
// File: tests/day31-assertions.spec.ts
import { test, expect } from '@playwright/test';

test('page assertions', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    // URL assertions
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page).toHaveURL(/saucedemo/);
    
    // Title assertions
    await expect(page).toHaveTitle('Swag Labs');
    await expect(page).toHaveTitle(/Swag/);
});

test('element visibility assertions', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    const loginButton = page.locator('#login-button');
    
    // Visibility
    await expect(loginButton).toBeVisible();
    await expect(loginButton).not.toBeHidden();
    
    // Enabled/Disabled
    await expect(loginButton).toBeEnabled();
    await expect(loginButton).not.toBeDisabled();
});

test('text content assertions', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    const logo = page.locator('.login_logo');
    
    // Exact text
    await expect(logo).toHaveText('Swag Labs');
    
    // Contains text
    await expect(logo).toContainText('Swag');
    
    // Regex
    await expect(logo).toHaveText(/Swag/);
});

test('value assertions', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    await page.fill('#user-name', 'testuser');
    
    const username = page.locator('#user-name');
    
    // Input value
    await expect(username).toHaveValue('testuser');
    await expect(username).not.toHaveValue('');
});

test('attribute assertions', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    const username = page.locator('#user-name');
    
    // Has attribute
    await expect(username).toHaveAttribute('type', 'text');
    await expect(username).toHaveAttribute('placeholder', 'Username');
    
    // Has class
    await expect(username).toHaveClass(/input_error|/);
});

test('count assertions', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    await page.waitForSelector('.inventory_list');
    
    const products = page.locator('.inventory_item');
    
    // Count
    await expect(products).toHaveCount(6);
});

test('screenshot assertions', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    // Visual comparison (advanced)
    await expect(page).toHaveScreenshot('login-page.png');
});
```

**Custom Assertions:**
```typescript
// File: tests/day33-custom-assertions.spec.ts
import { test, expect } from '@playwright/test';

// Custom assertion function
async function expectElementWithText(
    page: Page,
    selector: string,
    expectedText: string
) {
    const element = page.locator(selector);
    await expect(element).toBeVisible();
    const actualText = await element.textContent();
    expect(actualText).toBe(expectedText);
}

test('using custom assertions', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await expectElementWithText(page, '.login_logo', 'Swag Labs');
});
```

**Today's Achievement:** ✅ Master all assertion types!

---

### DAY 34-35: Week 5 Practice

**Build a complete test with TypeScript and assertions:**

```typescript
// File: tests/week5-project.spec.ts
import { test, expect, Page } from '@playwright/test';

interface TestUser {
    username: string;
    password: string;
    expectedProducts: number;
}

class SauceDemoPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    
    async login(username: string, password: string): Promise<void> {
        await this.page.goto('https://www.saucedemo.com');
        await this.page.fill('#user-name', username);
        await this.page.fill('#password', password);
        await this.page.click('#login-button');
    }
    
    async verifyProductCount(expected: number): Promise<void> {
        const products = this.page.locator('.inventory_item');
        await expect(products).toHaveCount(expected);
    }
    
    async addProductToCart(productId: string): Promise<void> {
        await this.page.click(`[data-test="add-to-cart-${productId}"]`);
    }
    
    async getCartCount(): Promise<number> {
        const badge = this.page.locator('.shopping_cart_badge');
        const text = await badge.textContent();
        return parseInt(text || '0');
    }
}

test.describe('Week 5 Project - Complete Test Suite', () => {
    let sauceDemoPage: SauceDemoPage;
    
    test.beforeEach(async ({ page }) => {
        sauceDemoPage = new SauceDemoPage(page);
    });
    
    test('verify product catalog', async ({ page }) => {
        await sauceDemoPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);
        await sauceDemoPage.verifyProductCount(6);
    });
    
    test('add products to cart', async ({ page }) => {
        await sauceDemoPage.login('standard_user', 'secret_sauce');
        
        await sauceDemoPage.addProductToCart('sauce-labs-backpack');
        await sauceDemoPage.addProductToCart('sauce-labs-bike-light');
        
        const count = await sauceDemoPage.getCartCount();
        expect(count).toBe(2);
    });
});
```

**Week 5 Achievement:** ✅ TypeScript + Professional assertions!

---

## WEEK 6: Page Object Model (POM)

### DAY 36: Introduction to Page Object Model

**Concept: What is POM?**
Page Object Model is a design pattern where you create a class for each page/component of your application.

**Why Use POM?**
- ✅ Code reusability
- ✅ Easy maintenance (change locator in one place)
- ✅ Better readability
- ✅ Separation of test logic and page elements

**Without POM (Bad):**
```typescript
// Test 1
test('login test 1', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
});

// Test 2
test('login test 2', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
});

// If locator changes, you have to update EVERYWHERE! ❌
```

**With POM (Good):**
```typescript
// File: pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }
    
    async goto() {
        await this.page.goto('https://www.saucedemo.com');
    }
    
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    
    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }
}
```

```typescript
// File: tests/day36-with-pom.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login test 1', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
});

test('login test 2', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('locked out');
});

// If locator changes, update only in LoginPage.ts! ✅
```

**Today's Achievement:** ✅ Understanding POM benefits!

---

### DAY 37: Building Your First Page Object

**Create Complete Login Page Object:**

```typescript
// File: pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    
    // Locators
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly logo: Locator;
    
    constructor(page: Page) {
        this.page = page;
        
        // Define all locators
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
        this.logo = page.locator('.login_logo');
    }
    
    // Navigation
    async goto() {
        await this.page.goto('https://www.saucedemo.com');
    }
    
    // Actions
    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }
    
    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }
    
    async clickLogin() {
        await this.loginButton.click();
    }
    
    // Combined action
    async login(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }
    
    // Getters
    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }
    
    async isErrorVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }
    
    // Assertions (built into page object)
    async expectErrorMessage(expectedText: string) {
        await expect(this.errorMessage).toContainText(expectedText);
    }
    
    async expectLogoVisible() {
        await expect(this.logo).toBeVisible();
    }
}
```

**Create Products Page Object:**

```typescript
// File: pages/ProductsPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    
    // Locators
    readonly pageTitle: Locator;
    readonly inventoryList: Locator;
    readonly cartBadge: Locator;
    readonly cartIcon: Locator;
    
    constructor(page: Page) {
        this.page = page;
        
        this.pageTitle = page.locator('.title');
        this.inventoryList = page.locator('.inventory_list');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartIcon = page.locator('.shopping_cart_link');
    }
    
    // Dynamic locator for specific product
    getAddToCartButton(productId: string): Locator {
        return this.page.locator(`[data-test="add-to-cart-${productId}"]`);
    }
    
    getRemoveButton(productId: string): Locator {
        return this.page.locator(`[data-test="remove-${productId}"]`);
    }
    
    getProductByName(productName: string): Locator {
        return this.page.locator('.inventory_item', { hasText: productName });
    }
    
    // Actions
    async addToCart(productId: string) {
        await this.getAddToCartButton(productId).click();
    }
    
    async removeFromCart(productId: string) {
        await this.getRemoveButton(productId).click();
    }
    
    async goToCart() {
        await this.cartIcon.click();
    }
    
    // Getters
    async getCartCount(): Promise<number> {
        const isVisible = await this.cartBadge.isVisible();
        if (!isVisible) return 0;
        
        const text = await this.cartBadge.textContent();
        return parseInt(text || '0');
    }
    
    async getAllProducts(): Promise<string[]> {
        const products = this.page.locator('.inventory_item_name');
        const count = await products.count();
        
        const productNames: string[] = [];
        for (let i = 0; i < count; i++) {
            const name = await products.nth(i).textContent();
            if (name) productNames.push(name);
        }
        
        return productNames;
    }
    
    // Assertions
    async expectProductsLoaded() {
        await expect(this.inventoryList).toBeVisible();
    }
    
    async expectCartCount(expected: number) {
        if (expected === 0) {
            await expect(this.cartBadge).toBeHidden();
        } else {
            await expect(this.cartBadge).toHaveText(expected.toString());
        }
    }
}
```

**Using the Page Objects:**

```typescript
// File: tests/day37-using-pom.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Using Page Objects', () => {
    test('complete login and add to cart flow', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        
        // Login
        await loginPage.goto();
        await loginPage.expectLogoVisible();
        await loginPage.login('standard_user', 'secret_sauce');
        
        // Verify products page loaded
        await expect(page).toHaveURL(/inventory/);
        await productsPage.expectProductsLoaded();
        
        // Add items to cart
        await productsPage.addToCart('sauce-labs-backpack');
        await productsPage.expectCartCount(1);
        
        await productsPage.addToCart('sauce-labs-bike-light');
        await productsPage.expectCartCount(2);
        
        // Go to cart
        await productsPage.goToCart();
        await expect(page).toHaveURL(/cart/);
    });
    
    test('get all product names', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        
        const products = await productsPage.getAllProducts();
        console.log('Products:', products);
        expect(products.length).toBeGreaterThan(0);
    });
});
```

**Today's Achievement:** ✅ Created reusable page objects!

---

### DAY 38-39: Complete Page Object Suite

**Create All Page Objects:**

```typescript
// File: pages/CartPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }
    
    async getItemCount(): Promise<number> {
        return await this.cartItems.count();
    }
    
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
    
    async continueShopping() {
        await this.continueShoppingButton.click();
    }
    
    async expectItemCount(expected: number) {
        await expect(this.cartItems).toHaveCount(expected);
    }
}
```

```typescript
// File: pages/CheckoutPage.ts
import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly successMessage: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.successMessage = page.locator('.complete-header');
    }
    
    async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }
    
    async continue() {
        await this.continueButton.click();
    }
    
    async finishOrder() {
        await this.finishButton.click();
    }
    
    async getSuccessMessage(): Promise<string> {
        return await this.successMessage.textContent() || '';
    }
}
```

**Base Page Pattern (Advanced):**

```typescript
// File: pages/BasePage.ts
import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    
    async goto(path: string = '') {
        await this.page.goto(`https://www.saucedemo.com${path}`);
    }
    
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }
    
    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
    }
    
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}
```

```typescript
// File: pages/LoginPage.ts (Extended from BasePage)
import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    
    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }
    
    async goto() {
        await super.goto('/');
    }
    
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.waitForPageLoad();
    }
}
```

**Complete End-to-End Test:**

```typescript
// File: tests/day39-complete-flow.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('complete e2e flow with POM', async ({ page }) => {
    // Initialize all page objects
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    // Step 1: Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Step 2: Add products
    await productsPage.addToCart('sauce-labs-backpack');
    await productsPage.addToCart('sauce-labs-bike-light');
    await productsPage.expectCartCount(2);
    
    // Step 3: Go to cart
    await productsPage.goToCart();
    await cartPage.expectItemCount(2);
    
    // Step 4: Checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    await checkoutPage.continue();
    
    // Step 5: Finish
    await checkoutPage.finishOrder();
    const message = await checkoutPage.getSuccessMessage();
    expect(message).toContain('Thank you');
});
```

**Today's Achievement:** ✅ Complete page object framework!

---

### DAY 40-41: Page Object Best Practices

**Best Practices:**

```typescript
// ✅ GOOD: Clear method names
async login(username: string, password: string) { }
async addToCart(productId: string) { }
async proceedToCheckout() { }

// ❌ BAD: Unclear method names
async doIt() { }
async click() { }
async fill() { }

// ✅ GOOD: Return types specified
async getCartCount(): Promise<number> { }
async isLoggedIn(): Promise<boolean> { }

// ❌ BAD: No return type
async getCartCount() { }

// ✅ GOOD: Assertions in page object
async expectProductsLoaded() {
    await expect(this.inventoryList).toBeVisible();
}

// ✅ GOOD: Flexible methods
async addMultipleToCart(productIds: string[]) {
    for (const id of productIds) {
        await this.addToCart(id);
    }
}

// ✅ GOOD: Wait for elements
async clickLogin() {
    await this.loginButton.waitFor({ state: 'visible' });
    await this.loginButton.click();
}
```

**Project Structure:**

```
playwright-project/
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── auth/
│   │   └── login.spec.ts
│   ├── products/
│   │   └── shopping.spec.ts
│   └── checkout/
│       └── purchase.spec.ts
├── test-data/
│   └── users.json
├── utils/
│   └── helpers.ts
├── playwright.config.ts
└── package.json
```

**Today's Achievement:** ✅ Professional POM structure!

---

### DAY 42: Week 6 Review + Mini Project

**Mini Project: Complete POM Framework**

```typescript
// File: pages/index.ts (Export all pages)
export { LoginPage } from './LoginPage';
export { ProductsPage } from './ProductsPage';
export { CartPage } from './CartPage';
export { CheckoutPage } from './CheckoutPage';
```

```typescript
// File: tests/week6-project.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage, ProductsPage, CartPage, CheckoutPage } from '../pages';

test.describe('Week 6 Project - Complete POM Suite', () => {
    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
    });
    
    test('add single product to cart', async ({ page }) => {
        await productsPage.addToCart('sauce-labs-backpack');
        await productsPage.expectCartCount(1);
    });
    
    test('add multiple products to cart', async ({ page }) => {
        const products = ['sauce-labs-backpack', 'sauce-labs-bike-light', 'sauce-labs-bolt-t-shirt'];
        await productsPage.addMultipleToCart(products);
        await productsPage.expectCartCount(3);
    });
    
    test('complete purchase flow', async ({ page }) => {
        await productsPage.addToCart('sauce-labs-backpack');
        await productsPage.goToCart();
        
        await cartPage.expectItemCount(1);
        await cartPage.proceedToCheckout();
        
        await checkoutPage.fillShippingInfo('Test', 'User', '12345');
        await checkoutPage.continue();
        await checkoutPage.finishOrder();
        
        const success = await checkoutPage.getSuccessMessage();
        expect(success).toContain('Thank you');
    });
});
```

**Week 6 Achievement:** ✅ Complete Page Object Model mastery!

---

## WEEK 7: Advanced Features

### DAY 43-44: Fixtures & Hooks

**Understanding Fixtures:**
Fixtures are a way to set up and tear down test resources.

```typescript
// File: tests/fixtures/test-fixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage, ProductsPage } from '../pages';

type MyFixtures = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    
    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },
    
    authenticatedPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await use(page);
    }
});

export { expect } from '@playwright/test';
```

```typescript
// File: tests/day43-using-fixtures.spec.ts
import { test, expect } from './fixtures/test-fixtures';

test('using login page fixture', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    // loginPage is ready to use!
});

test('using authenticated page fixture', async ({ authenticatedPage, productsPage }) => {
    // Already logged in!
    await productsPage.addToCart('sauce-labs-backpack');
    await productsPage.expectCartCount(1);
});
```

**Advanced Hooks:**

```typescript
// File: tests/day44-hooks.spec.ts
import { test, expect } from '@playwright/test';

// Global hooks (in playwright.config.ts or separate file)
test.beforeAll(async () => {
    console.log('🚀 Starting test suite');
    // Setup: Create test data, connect to database, etc.
});

test.afterAll(async () => {
    console.log('✅ Test suite completed');
    // Cleanup: Remove test data, close connections, etc.
});

test.describe('Product Tests', () => {
    // Runs before each test in this describe block
    test.beforeEach(async ({ page }) => {
        console.log('Setting up test');
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
    });
    
    // Runs after each test in this describe block
    test.afterEach(async ({ page }, testInfo) => {
        console.log(`Test "${testInfo.title}" completed`);
        
        if (testInfo.status !== 'passed') {
            // Take screenshot on failure
            await page.screenshot({ 
                path: `screenshots/${testInfo.title}-failure.png` 
            });
        }
    });
    
    test('test 1', async ({ page }) => {
        // Test code
    });
    
    test('test 2', async ({ page }) => {
        // Test code
    });
});
```

---

### DAY 45-46: API Testing with Playwright

**Why API Testing?**
- Faster than UI tests
- Test backend logic directly
- Can create test data
- Validate API contracts

```typescript
// File: tests/day45-api-basics.spec.ts
import { test, expect } from '@playwright/test';

test('GET request', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    // Check status code
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    // Get response body
    const data = await response.json();
    console.log('Response:', data);
    
    // Validate response
    expect(data).toHaveProperty('id', 1);
    expect(data).toHaveProperty('userId');
    expect(data).toHaveProperty('title');
});

test('POST request', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'Test Post',
            body: 'This is a test',
            userId: 1
        }
    });
    
    expect(response.status()).toBe(201);
    
    const data = await response.json();
    expect(data.title).toBe('Test Post');
    expect(data.id).toBeDefined();
});

test('PUT request', async ({ request }) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
        data: {
            id: 1,
            title: 'Updated Title',
            body: 'Updated body',
            userId: 1
        }
    });
    
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.title).toBe('Updated Title');
});

test('DELETE request', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();
});
```

**API + UI Testing Combined:**

```typescript
// File: tests/day46-api-ui-combined.spec.ts
import { test, expect } from '@playwright/test';

test('create data via API, verify in UI', async ({ request, page }) => {
    // Step 1: Create data via API
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'New Product',
            body: 'Product Description',
            userId: 1
        }
    });
    
    const newPost = await response.json();
    console.log('Created post ID:', newPost.id);
    
    // Step 2: Verify in UI (example)
    await page.goto(`https://jsonplaceholder.typicode.com/posts/${newPost.id}`);
    // Verify the data appears correctly
});

test('login via API, use auth in UI', async ({ request, page }) => {
    // Some websites allow API login
    // This is an example pattern
    
    const response = await request.post('https://example.com/api/login', {
        data: {
            username: 'testuser',
            password: 'password123'
        }
    });
    
    const { token } = await response.json();
    
    // Set auth token in browser
    await page.goto('https://example.com');
    await page.evaluate((token) => {
        localStorage.setItem('authToken', token);
    }, token);
    
    // Now navigate to authenticated page
    await page.goto('https://example.com/dashboard');
});
```

**API Helper Class:**

```typescript
// File: utils/ApiHelper.ts
export class ApiHelper {
    private baseURL: string;
    
    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }
    
    async get(endpoint: string, request: any) {
        const response = await request.get(`${this.baseURL}${endpoint}`);
        return response.json();
    }
    
    async post(endpoint: string, data: any, request: any) {
        const response = await request.post(`${this.baseURL}${endpoint}`, { data });
        return response.json();
    }
    
    async createTestUser(userData: any, request: any) {
        return await this.post('/users', userData, request);
    }
    
    async deleteTestUser(userId: string, request: any) {
        await request.delete(`${this.baseURL}/users/${userId}`);
    }
}
```

---

### DAY 47-48: Authentication & Session Management

**Saving Authentication State:**

```typescript
// File: tests/auth.setup.ts
import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Wait for login to complete
    await page.waitForURL(/inventory/);
    
    // Save authentication state
    await page.context().storageState({ path: authFile });
});
```

```typescript
// File: playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
    projects: [
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/
        },
        {
            name: 'chromium',
            use: {
                storageState: 'playwright/.auth/user.json'
            },
            dependencies: ['setup']
        }
    ]
});
```

```typescript
// File: tests/day47-with-auth.spec.ts
import { test, expect } from '@playwright/test';

// This test will use saved authentication!
test('test with saved auth', async ({ page }) => {
    // Already logged in!
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Start testing immediately
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
});
```

**Multiple User Contexts:**

```typescript
// File: tests/day48-multiple-users.spec.ts
import { test, expect } from '@playwright/test';

test('different users in parallel', async ({ browser }) => {
    // User 1 context
    const user1Context = await browser.newContext({
        storageState: 'playwright/.auth/user1.json'
    });
    const user1Page = await user1Context.newPage();
    
    // User 2 context
    const user2Context = await browser.newContext({
        storageState: 'playwright/.auth/user2.json'
    });
    const user2Page = await user2Context.newPage();
    
    // Both users do things independently
    await user1Page.goto('https://www.saucedemo.com/inventory.html');
    await user2Page.goto('https://www.saucedemo.com/inventory.html');
    
    // Cleanup
    await user1Context.close();
    await user2Context.close();
});
```

---

### DAY 49: Screenshots, Videos & Traces

```typescript
// File: playwright.config.ts
export default defineConfig({
    use: {
        // Take screenshot on failure
        screenshot: 'only-on-failure',
        
        // Record video on failure
        video: 'retain-on-failure',
        
        // Collect trace on failure
        trace: 'on-first-retry',
    }
});
```

```typescript
// File: tests/day49-visual-debugging.spec.ts
import { test, expect } from '@playwright/test';

test('manual screenshots', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    
    // Screenshot entire page
    await page.screenshot({ path: 'screenshots/login-page.png' });
    
    // Screenshot specific element
    const logo = page.locator('.login_logo');
    await logo.screenshot({ path: 'screenshots/logo.png' });
    
    // Full page screenshot
    await page.screenshot({ 
        path: 'screenshots/full-page.png',
        fullPage: true 
    });
});

test('with trace', async ({ page }) => {
    // Start tracing
    await page.context().tracing.start({ screenshots: true, snapshots: true });
    
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Stop tracing and save
    await page.context().tracing.stop({ path: 'traces/trace.zip' });
});
```

**View trace:**
```bash
npx playwright show-trace traces/trace.zip
```

---

## WEEK 8: Framework Building

### DAY 50-51: Project Structure & Configuration

**Professional Project Structure:**

```
automation-framework/
├── src/
│   ├── pages/
│   │   ├── base/
│   │   │   └── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   ├── fixtures/
│   │   └── test-fixtures.ts
│   ├── utils/
│   │   ├── ApiHelper.ts
│   │   ├── DataHelper.ts
│   │   └── TestHelper.ts
│   └── types/
│       └── custom-types.ts
├── tests/
│   ├── auth/
│   │   ├── login.spec.ts
│   │   └── logout.spec.ts
│   ├── products/
│   │   ├── browse.spec.ts
│   │   └── search.spec.ts
│   ├── cart/
│   │   ├── add-to-cart.spec.ts
│   │   └── remove-from-cart.spec.ts
│   └── checkout/
│       └── purchase.spec.ts
├── test-data/
│   ├── users/
│   │   ├── valid-users.json
│   │   └── invalid-users.json
│   └── products/
│       └── products.json
├── config/
│   ├── dev.config.ts
│   ├── staging.config.ts
│   └── prod.config.ts
├── .github/
│   └── workflows/
│       └── playwright.yml
├── reports/
├── screenshots/
├── videos/
├── traces/
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

**Environment-Specific Configuration:**

```typescript
// File: config/dev.config.ts
export const devConfig = {
    baseURL: 'https://dev.saucedemo.com',
    timeout: 30000,
    retries: 1
};
```

```typescript
// File: config/staging.config.ts
export const stagingConfig = {
    baseURL: 'https://staging.saucedemo.com',
    timeout: 30000,
    retries: 2
};
```

```typescript
// File: playwright.config.ts
import { defineConfig } from '@playwright/test';

const environment = process.env.ENV || 'dev';
let config;

switch(environment) {
    case 'staging':
        config = require('./config/staging.config').stagingConfig;
        break;
    case 'prod':
        config = require('./config/prod.config').prodConfig;
        break;
    default:
        config = require('./config/dev.config').devConfig;
}

export default defineConfig({
    testDir: './tests',
    timeout: config.timeout,
    retries: config.retries,
    
    use: {
        baseURL: config.baseURL,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },
    
    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } },
        { name: 'firefox', use: { browserName: 'firefox' } },
        { name: 'webkit', use: { browserName: 'webkit' } },
    ],
    
    reporter: [
        ['html'],
        ['json', { outputFile: 'reports/test-results.json' }],
        ['junit', { outputFile: 'reports/junit.xml' }]
    ]
});
```

**Run with environment:**
```bash
ENV=staging npx playwright test
ENV=prod npx playwright test
```

---

### DAY 52-53: Test Data Management

**Data Helper:**

```typescript
// File: src/utils/DataHelper.ts
import * as fs from 'fs';
import * as path from 'path';

export class DataHelper {
    static loadJSON(fileName: string): any {
        const filePath = path.join(__dirname, '../../test-data', fileName);
        const rawData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(rawData);
    }
    
    static getRandomUser(userType: 'valid' | 'invalid' = 'valid'): any {
        const users = this.loadJSON(`users/${userType}-users.json`);
        const randomIndex = Math.floor(Math.random() * users.length);
        return users[randomIndex];
    }
    
    static getAllUsers(userType: 'valid' | 'invalid' = 'valid'): any[] {
        return this.loadJSON(`users/${userType}-users.json`);
    }
    
    static generateRandomEmail(): string {
        const timestamp = Date.now();
        return `test${timestamp}@example.com`;
    }
    
    static generateRandomString(length: number = 10): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}
```

**Test Data Files:**

```json
// File: test-data/users/valid-users.json
[
    {
        "username": "standard_user",
        "password": "secret_sauce",
        "type": "standard"
    },
    {
        "username": "problem_user",
        "password": "secret_sauce",
        "type": "problem"
    }
]
```

```typescript
// File: tests/day52-using-data-helper.spec.ts
import { test, expect } from '@playwright/test';
import { DataHelper } from '../src/utils/DataHelper';
import { LoginPage } from '../src/pages/LoginPage';

test('login with random valid user', async ({ page }) => {
    const user = DataHelper.getRandomUser('valid');
    
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    
    await expect(page).toHaveURL(/inventory/);
});

test.describe('test all valid users', () => {
    const validUsers = DataHelper.getAllUsers('valid');
    
    for (const user of validUsers) {
        test(`login with ${user.username}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await loginPage.login(user.username, user.password);
            await expect(page).toHaveURL(/inventory/);
        });
    }
});
```

**CSV Data Support:**

```typescript
// File: src/utils/CsvHelper.ts
import * as fs from 'fs';
import * as Papa from 'papaparse';

export class CsvHelper {
    static loadCSV(fileName: string): any[] {
        const filePath = path.join(__dirname, '../../test-data', fileName);
        const csvFile = fs.readFileSync(filePath, 'utf-8');
        const result = Papa.parse(csvFile, { header: true });
        return result.data;
    }
}
```

---

### DAY 54-55: Reporting & Logging

**Custom Reporter:**

```typescript
// File: src/utils/custom-reporter.ts
import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class CustomReporter implements Reporter {
    onBegin(config: any, suite: any) {
        console.log(`Starting test run with ${suite.allTests().length} tests`);
    }
    
    onTestBegin(test: TestCase) {
        console.log(`\n▶️  ${test.title} started`);
    }
    
    onTestEnd(test: TestCase, result: TestResult) {
        const status = result.status === 'passed' ? '✅' : '❌';
        console.log(`${status} ${test.title} - ${result.duration}ms`);
        
        if (result.status === 'failed') {
            console.log(`   Error: ${result.error?.message}`);
        }
    }
    
    onEnd(result: any) {
        console.log(`\nTest run finished: ${result.status}`);
    }
}

export default CustomReporter;
```

**Logging Utility:**

```typescript
// File: src/utils/Logger.ts
export class Logger {
    static info(message: string) {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }
    
    static error(message: string, error?: any) {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
        if (error) {
            console.error(error);
        }
    }
    
    static debug(message: string) {
        if (process.env.DEBUG) {
            console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`);
        }
    }
    
    static testStep(step: string) {
        console.log(`   ↪ ${step}`);
    }
}
```

```typescript
// Usage in tests
import { Logger } from '../src/utils/Logger';

test('with logging', async ({ page }) => {
    Logger.info('Starting login test');
    Logger.testStep('Navigate to login page');
    
    await page.goto('https://www.saucedemo.com');
    
    Logger.testStep('Fill credentials');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    
    Logger.testStep('Click login button');
    await page.click('#login-button');
    
    Logger.info('Login test completed');
});
```

---

### DAY 56: CI/CD Integration

**GitHub Actions Workflow:**

```yaml
# File: .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
  schedule:
    - cron: '0 0 * * *'  # Run daily at midnight

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright browsers
      run: npx playwright install --with-deps
    
    - name: Run Playwright tests
      run: npx playwright test
      env:
        ENV: staging
    
    - name: Upload test results
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
    
    - name: Upload screenshots
      if: failure()
      uses: actions/upload-artifact@v3
      with:
        name: screenshots
        path: screenshots/
        retention-days: 30
```

**Package.json Scripts:**

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:chrome": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:webkit": "playwright test --project=webkit",
    "test:staging": "ENV=staging playwright test",
    "test:prod": "ENV=prod playwright test",
    "report": "playwright show-report",
    "codegen": "playwright codegen"
  }
}
```

---

## WEEK 9-10: Real Project

### DAY 57-70: Build Complete Test Suite

**Project Goal:** Create a complete, production-ready test automation framework

**Day 57-58: Project Planning**

```typescript
// File: PROJECT_PLAN.md
/**
 * Test Automation Framework for SauceDemo
 * 
 * Test Coverage:
 * 1. Authentication
 *    - Valid login (multiple users)
 *    - Invalid login (various scenarios)
 *    - Logout
 * 
 * 2. Product Catalog
 *    - View all products
 *    - Product sorting
 *    - Product filtering
 * 
 * 3. Shopping Cart
 *    - Add single product
 *    - Add multiple products
 *    - Remove products
 *    - Update quantities
 * 
 * 4. Checkout
 *    - Complete purchase flow
 *    - Form validation
 *    - Order confirmation
 * 
 * 5. Cross-browser Testing
 *    - Chrome, Firefox, Safari
 * 
 * 6. API Testing
 *    - Product API
 *    - User API
 */
```

**Day 59-62: Implement Core Framework**

```typescript
// Complete Page Objects (Already done in Week 6)
// Complete Fixtures (Already done in Week 7)
// Complete Test Data (Already done in Week 8)

// File: tests/complete-suite/auth.spec.ts
import { test, expect } from '../src/fixtures/test-fixtures';
import { DataHelper } from '../src/utils/DataHelper';
import { Logger } from '../src/utils/Logger';

test.describe('Authentication Tests', () => {
    test.describe('Valid Login Scenarios', () => {
        const validUsers = DataHelper.getAllUsers('valid');
        
        for (const user of validUsers) {
            test(`should login successfully with ${user.type} user`, async ({ loginPage, page }) => {
                Logger.info(`Testing login for ${user.username}`);
                
                await loginPage.goto();
                await loginPage.login(user.username, user.password);
                
                await expect(page).toHaveURL(/inventory/);
                Logger.info('Login successful');
            });
        }
    });
    
    test.describe('Invalid Login Scenarios', () => {
        const invalidScenarios = [
            { username: '', password: '', expectedError: 'Username is required' },
            { username: 'user', password: '', expectedError: 'Password is required' },
            { username: 'invalid', password: 'wrong', expectedError: 'do not match' }
        ];
        
        for (const scenario of invalidScenarios) {
            test(`should show error: ${scenario.expectedError}`, async ({ loginPage }) => {
                await loginPage.goto();
                await loginPage.login(scenario.username, scenario.password);
                await loginPage.expectErrorMessage(scenario.expectedError);
            });
        }
    });
});
```

**Day 63-65: Product & Cart Tests**

```typescript
// File: tests/complete-suite/products.spec.ts
import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Product Catalog Tests', () => {
    test.beforeEach(async ({ authenticatedPage }) => {
        // Already logged in via fixture
    });
    
    test('should display all products', async ({ productsPage }) => {
        const products = await productsPage.getAllProducts();
        expect(products.length).toBeGreaterThan(0);
    });
    
    test('should add product to cart', async ({ productsPage }) => {
        await productsPage.addToCart('sauce-labs-backpack');
        await productsPage.expectCartCount(1);
    });
    
    test('should add multiple products to cart', async ({ productsPage }) => {
        const products = ['sauce-labs-backpack', 'sauce-labs-bike-light', 'sauce-labs-bolt-t-shirt'];
        
        for (const product of products) {
            await productsPage.addToCart(product);
        }
        
        await productsPage.expectCartCount(products.length);
    });
});
```

**Day 66-68: Checkout Flow Tests**

```typescript
// File: tests/complete-suite/checkout.spec.ts
import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Checkout Flow Tests', () => {
    test('complete purchase end-to-end', async ({ 
        authenticatedPage, 
        productsPage, 
        cartPage, 
        checkoutPage 
    }) => {
        // Add products
        await productsPage.addToCart('sauce-labs-backpack');
        await productsPage.goToCart();
        
        // Verify cart
        await cartPage.expectItemCount(1);
        await cartPage.proceedToCheckout();
        
        // Fill checkout info
        await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
        await checkoutPage.continue();
        
        // Complete purchase
        await checkoutPage.finishOrder();
        
        // Verify success
        const message = await checkoutPage.getSuccessMessage();
        expect(message).toContain('Thank you');
    });
});
```

**Day 69: Cross-Browser & Parallel Testing**

```typescript
// File: playwright.config.ts
export default defineConfig({
    workers: process.env.CI ? 2 : 4,
    
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] }
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] }
        },
        {
            name: 'mobile-chrome',
            use: { ...devices['Pixel 5'] }
        },
        {
            name: 'mobile-safari',
            use: { ...devices['iPhone 12'] }
        }
    ]
});
```

**Day 70: Final Polish & Documentation**

```typescript
// File: README.md
# Test Automation Framework

## Setup
```bash
npm install
npx playwright install
```

## Running Tests
```bash
# All tests
npm test

# Specific browser
npm run test:chrome

# Headed mode
npm run test:headed

# Specific environment
npm run test:staging

# Generate report
npm run report
```

## Project Structure
- `src/pages/` - Page Object Models
- `src/fixtures/` - Test fixtures
- `src/utils/` - Helper utilities
- `tests/` - Test specifications
- `test-data/` - Test data files
- `config/` - Environment configurations

## CI/CD
Tests run automatically on:
- Every push to main/develop
- Every pull request
- Daily at midnight (scheduled)

## Writing New Tests
1. Create page object if needed
2. Add test data to test-data/
3. Write test in appropriate folder
4. Use fixtures for common setup
5. Run and verify

## Best Practices
- Use Page Object Model
- Keep tests independent
- Use meaningful test names
- Add proper assertions
- Handle waits properly
- Clean up test data

## Contact
For questions: [your-email]
```

**Final Project Checklist:**

✅ Page Object Model implemented
✅ Test fixtures configured
✅ Test data management
✅ Environment configurations
✅ API testing included
✅ Authentication handling
✅ Comprehensive assertions
✅ Error handling
✅ Logging
✅ Screenshots/videos on failure
✅ CI/CD pipeline
✅ Cross-browser testing
✅ Parallel execution
✅ HTML reports
✅ Documentation
✅ README with instructions

---

## 🎓 Congratulations! You've Completed the Full Roadmap!

### What You've Learned:

**Week 1:** JavaScript Basics + First Tests
**Week 2:** Locators & Selectors
**Week 3:** Actions & Interactions
**Week 4:** Advanced UI Handling
**Week 5:** TypeScript & Assertions
**Week 6:** Page Object Model
**Week 7:** Advanced Features
**Week 8:** Framework Building
**Weeks 9-10:** Complete Real Project

### You Can Now:

✅ Write clean, maintainable test automation code
✅ Use Page Object Model effectively
✅ Handle complex UI interactions
✅ Test APIs with Playwright
✅ Manage test data professionally
✅ Configure CI/CD pipelines
✅ Run tests across multiple browsers
✅ Debug and troubleshoot tests
✅ Create professional test reports
✅ Build complete automation frameworks

### Next Steps:

1. **Polish your project** - Make it portfolio-ready
2. **Push to GitHub** - Showcase your work
3. **Write a blog post** - Document your learning journey
4. **Start applying for jobs** - You're ready!
5. **Keep learning** - Advanced topics, new tools

### Advanced Topics to Explore:

- Visual regression testing
- Performance testing with Playwright
- Component testing
- Database testing
- Docker integration
- Advanced CI/CD patterns
- Test data factories
- Custom commands
- Plugin development

### Resources for Continued Learning:

- Playwright Official Docs: https://playwright.dev
- Test Automation University: Free courses
- GitHub: Study open-source projects
- Communities: Playwright Discord, Reddit
- Blogs: Follow automation testing blogs
- Practice: Keep building projects

---

## 🎯 Your Achievement

**You've completed:**
- 70 days of learning
- 10 weeks of content
- JavaScript/TypeScript mastery
- Playwright expertise
- Professional framework building
- Real project experience

**You're now ready to:**
- Apply for Automation QA roles
- Contribute to test automation projects
- Build frameworks from scratch
- Mentor junior testers
- Continue growing in your career

---

## 💪 Final Words

Remember:
- You've learned the fundamentals AND advanced concepts
- You have a complete project to show employers
- You understand both theory and practice
- You're equipped with professional tools and patterns

**Most importantly:**
You didn't just learn Playwright - you learned how to think like an automation engineer!

Keep practicing, keep building, keep growing!

**Good luck in your automation testing career! 🚀**

---

*This roadmap took you from zero to job-ready in 10 weeks. You've put in the work, and now it's time to reap the rewards!*
