# Module 5: JavaScript Module Systems (CommonJS vs ESM) 📦

This module explores the two foundational module systems in the JavaScript and Node.js ecosystem: **CommonJS (CJS)** and **ECMAScript Modules (ESM)**.

---

## 📂 Project Structure

```text
.
├── commonjs/
│   ├── file1.js
│   ├── file2.js
│   └── utils/
│       └── add.js
└── esm/
    ├── file1.mjs
    ├── file2.mjs
    └── file3.mjs
```

---

## 🔹 1. CommonJS (`commonjs/`)

CommonJS is the traditional module format used natively by Node.js. It evaluates and loads modules synchronously.

### Key Concepts & Code Breakdown:
- **Exporting values (`commonjs/file1.js`):**
  ```javascript
  const a = 100;
  const b = 50;

  module.exports = { a, b };
  ```
- **Exporting functions (`commonjs/utils/add.js`):**
  ```javascript
  function add(x, y) {
    return x + y;
  }

  module.exports = add;
  ```
- **Importing with `require`, Destructuring & Aliasing (`commonjs/file2.js`):**
  ```javascript
  const { a: x, b: y } = require("./file1.js");
  const add = require("./utils/add.js");

  console.log("Additions : ", add(x, y));
  ```

### How to Run CommonJS:
```bash
node commonjs/file2.js
# Output: Additions :  150
```

---

## 🔹 2. ECMAScript Modules (`esm/`)

ESM is the official ECMAScript standard for JavaScript modules. It uses static analysis, making it tree-shakeable and browser-compatible.

### Key Concepts & Code Breakdown:
- **Default Export (`esm/file1.mjs`):**
  ```javascript
  const a = 100;
  export default a;
  ```
- **Named Exports (`esm/file3.mjs`):**
  ```javascript
  export const a = 100;
  export const b = 100;
  ```
- **Default & Named Imports with Aliasing (`esm/file2.mjs`):**
  ```javascript
  import a from "./file1.mjs";
  import { b as value } from "./file3.mjs";

  console.log(value);
  ```

### How to Run ESM:
```bash
node esm/file2.mjs
# Output: 100
```

---

## ⚖️ CommonJS vs ESM Comparison

| Feature | CommonJS (CJS) | ECMAScript Modules (ESM) |
| :--- | :--- | :--- |
| **Import Syntax** | `const pkg = require('./pkg')` | `import pkg from './pkg'` |
| **Export Syntax** | `module.exports = ...` or `exports.x = ...` | `export default ...` or `export const x = ...` |
| **Loading** | Synchronous, at runtime | Asynchronous / Static analysis |
| **File Extension** | `.js` (default in Node) | `.mjs` or `.js` with `"type": "module"` in `package.json` |
| **Tree Shaking** | Difficult / Not natively supported | First-class native support |
| **Top-Level Await** | Limited | Supported natively |
