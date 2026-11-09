# Be a Node & Express Expert 🚀

Welcome to the **Be a Node & Express Expert** repository! This repository provides a comprehensive, hands-on learning roadmap for mastering backend web development—progressing from core JavaScript module systems and pure Node.js HTTP servers to production-ready, modular Express.js architectures backed by PostgreSQL, secure authentication, and relational data modeling.

---

## 📑 Table of Contents

- [Repository & Branch Overview](#-repository--branch-overview)
- [Module Deep Dive](#-module-deep-dive)
  - [Module 5: JavaScript Module Systems (CommonJS vs ESM)](#module-5-javascript-module-systems-commonjs-vs-esm)
  - [Module 6: Pure Node.js HTTP Server & Custom REST API](#module-6-pure-nodejs-http-server--custom-rest-api)
  - [Module 7: Express.js Fundamentals & PostgreSQL Integration](#module-7-expressjs-fundamentals--postgresql-integration)
  - [Module 8: Modular Architecture, Authentication & Relational Modeling](#module-8-modular-architecture-authentication--relational-modeling)
- [Tech Stack](#-tech-stack)
- [Getting Started & Branch Navigation](#-getting-started--branch-navigation)
- [Environment Configuration](#-environment-configuration)
- [Scripts Reference](#-scripts-reference)

---

## 🌿 Repository & Branch Overview

The codebase is organized into independent Git branches corresponding to each learning milestone. The `main` branch acts as the documentation index, while each module branch contains its dedicated implementation.

| Branch | Focus | Folders / Tech | Highlights |
| :--- | :--- | :--- | :--- |
| **`main`** | Documentation | `README.md` | Master index and course documentation |
| **[`module-5`](https://github.com/Apollo-Level2-Web-Dev/be-a-node-express-expert-b8/tree/module-5)** | Module Systems | `commonjs/`, `esm/` | CommonJS (`require`) vs ECMAScript Modules (`import`/`export`) |
| **[`module-6`](https://github.com/Apollo-Level2-Web-Dev/be-a-node-express-expert-b8/tree/module-6)** | Pure Node.js | `node/` (TypeScript) | Raw `http` server, custom stream body-parser, JSON database CRUD |
| **[`module-7`](https://github.com/Apollo-Level2-Web-Dev/be-a-node-express-expert-b8/tree/module-7)** | Express & SQL | `express/` (TypeScript) | Express setup, PostgreSQL connection pool (`pg`), raw SQL CRUD |
| **[`module-8`](https://github.com/Apollo-Level2-Web-Dev/be-a-node-express-expert-b8/tree/module-8)** | Modular & Auth | `express/` (TypeScript) | 3-tier modular pattern, Bcrypt hashing, JWT authentication, 1-to-1 relational profiles with CASCADE delete |

---

## 🔍 Module Deep Dive

### Module 5: JavaScript Module Systems (CommonJS vs ESM)
> **Branch:** `module-5`  
> **Key Concepts:** CJS vs ESM syntax, module resolution, named vs default exports, destructuring, import aliasing.

This module explores the two standard module formats in JavaScript:
- **CommonJS (`commonjs/`)**:
  - Uses `require()` and `module.exports` / `exports`.
  - Dynamic, synchronous loading mechanism traditional in Node.js.
  - Demonstrates object destructuring and property renaming: `const { a: x, b: y } = require("./file1.js")`.
  - Utility module composition (`utils/add.js`).
- **ECMAScript Modules (`esm/`)**:
  - Uses modern static `import` and `export` statements (`.mjs` files).
  - Demonstrates `export default` for primary exports.
  - Demonstrates named exports (`export const a = 100`) and import aliasing (`import { b as value } from "./file3.mjs"`).

```text
module-5/
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

### Module 6: Pure Node.js HTTP Server & Custom REST API
> **Branch:** `module-6`  
> **Key Concepts:** Core `http` module, request/response streams, stream chunk buffering, manual URL routing, Service-Controller pattern, file-based database.

Before reaching for frameworks like Express, this module builds a full RESTful API using Node's low-level built-in APIs with TypeScript:
- **Core HTTP Server:** Built using `http.createServer()` handling `IncomingMessage` and `ServerResponse`.
- **Custom Body Parser (`src/utils/parseBody.ts`):** Asynchronously buffers data stream chunks from the request socket (`req.on("data", ...)`) and parses the raw JSON payload.
- **Custom Response Helper (`src/utils/sendResponse.ts`):** Standardizes API responses with consistent status codes, success flags, messages, and payloads.
- **Routing Engine (`src/routes/route.ts`):** Manual route matching and HTTP method dispatching (`GET`, `POST`, `PUT`, `DELETE`).
- **Persistence Layer (`src/database/db.json`):** File-based JSON mock database managed via `fs`.

#### Product API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Root health check |
| `GET` | `/products` | Retrieve all products |
| `GET` | `/products/:id` | Retrieve single product by ID |
| `POST` | `/products` | Create a new product (auto-generates timestamp ID) |
| `PUT` | `/products/:id` | Update existing product details |
| `DELETE` | `/products/:id` | Remove a product |

```text
node/
├── package.json
├── tsconfig.json
└── src/
    ├── server.ts
    ├── config/index.ts
    ├── controllers/product.controller.ts
    ├── database/db.json
    ├── routes/route.ts
    ├── service/product.service.ts
    ├── types/product.ts
    └── utils/
        ├── parseBody.ts
        └── sendResponse.ts
```

---

### Module 7: Express.js Fundamentals & PostgreSQL Integration
> **Branch:** `module-7`  
> **Key Concepts:** Express application setup, global middleware, PostgreSQL connection pooling (`pg`), schema migration, parameterized SQL queries, partial updates with `COALESCE`.

This module transitions from vanilla Node.js to Express.js and integrates a relational PostgreSQL database:
- **Express Middleware:** Configuration of built-in middlewares (`express.json()`, `express.urlencoded()`, `express.text()`).
- **PostgreSQL Connection Pool:** Utilizes `pg.Pool` with connection string management from environment variables.
- **Auto Database Initialization:** Runs `CREATE TABLE IF NOT EXISTS users (...)` on server startup with timestamp tracking (`created_at`, `updated_at`).
- **Safe Parameterized Queries:** Prevents SQL injection using parameterized values (`$1`, `$2`, etc.).
- **Dynamic Updates:** Uses SQL `COALESCE($1, column_name)` to support seamless partial updates in `PUT` requests.

#### User API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API status |
| `POST` | `/api/v1/users` | Register a new user |
| `GET` | `/api/v1/users` | Retrieve all users |
| `GET` | `/api/v1/users/:id` | Retrieve single user by ID |
| `PUT` | `/api/v1/users/:id` | Update user details (name, password, age, is_Active) |
| `DELETE` | `/api/v1/users/:id` | Delete a user |

```text
express/
├── package.json
├── tsconfig.json
└── src/
    ├── server.ts
    └── config/index.ts
```

---

### Module 8: Modular Architecture, Authentication & Relational Modeling
> **Branch:** `module-8`  
> **Key Concepts:** Separation of concerns, 3-tier modular architecture (Route -> Controller -> Service), Bcrypt password hashing, JWT authentication, PostgreSQL foreign key relations with `ON DELETE CASCADE`.

Refactoring the monolithic server into an enterprise-grade modular pattern with authentication and relational modeling:
- **`server.ts`**: Entry point responsible exclusively for starting the HTTP listener and initializing the PostgreSQL database pool.
- **`app.ts`**: Express application instance, global middleware setup, and top-level router orchestration (`/api/v1/users`, `/api/v1/auth`, `/api/v1/profiles`).
- **`db/index.ts`**: Dedicated database client connection and auto schema creation for both `users` and `profile` tables.
- **Feature Modules (`src/modules/`)**:
  - **`auth/`**: User login authentication (`POST /api/v1/auth/login`), password verification via `bcrypt.compare`, active account checks, and JWT access token issuance (`jwt.sign`).
  - **`profile/`**: User profile management (`POST /api/v1/profiles`) linked via a 1-to-1 foreign key relation (`user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE`).
  - **`users/`**: Full user management with automatic password hashing (`bcrypt.hash`) on registration, password sanitization on output, and partial updates with `COALESCE`.

#### Module 8 API Endpoints
| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/v1/auth/login` | Authenticate user & return signed JWT token |
| **Profile** | `POST` | `/api/v1/profiles` | Create profile for user (`user_id` foreign key) |
| **Users** | `POST` | `/api/v1/users` | Register user (password hashed with Bcrypt) |
| **Users** | `GET` | `/api/v1/users` | Retrieve all users (passwords omitted) |
| **Users** | `GET` | `/api/v1/users/:id` | Retrieve user by ID |
| **Users** | `PUT` | `/api/v1/users/:id` | Update user details (`COALESCE`) |
| **Users** | `DELETE` | `/api/v1/users/:id` | Delete user (cascades to profile) |

```text
express/
├── package.json
├── tsconfig.json
└── src/
    ├── app.ts                  # Express application setup
    ├── server.ts               # Server bootstrapping & listener
    ├── config/
    │   └── index.ts            # Environment config loader
    ├── db/
    │   └── index.ts            # Database pool & initDB (users & profile)
    └── modules/
        ├── auth/
        │   ├── auth.controller.ts # Login request handler
        │   ├── auth.route.ts      # Auth route definitions
        │   └── auth.service.ts    # Bcrypt verify & JWT token generation
        ├── profile/
        │   ├── profile.controller.ts # Profile request handler
        │   ├── profile.route.ts      # Profile route definitions
        │   └── profile.service.ts    # Profile creation with FK check
        └── users/
            ├── user.interface.ts  # Types & interfaces
            ├── user.route.ts      # User routes
            ├── user.controller.ts # User request handlers
            └── user.service.ts    # User CRUD & password hashing
```

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (v18+)
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL (`pg` pool)
- **Security:** `bcryptjs` (password hashing), `jsonwebtoken` (JWT token auth)
- **Dev Tooling:** `tsx` (TypeScript execute & watch), `dotenv`

---

## 🚀 Getting Started & Branch Navigation

### 1. Clone the Repository
```bash
git clone https://github.com/Apollo-Level2-Web-Dev/be-a-node-express-expert-b8.git
cd be-a-node-express-expert-b8
```

### 2. Switch to Any Module Branch
You can checkout any branch to explore its specific implementation:

```bash
# Check out Module 5 (Module Systems)
git checkout module-5

# Check out Module 6 (Pure Node HTTP Server)
git checkout module-6

# Check out Module 7 (Express + PostgreSQL monolith)
git checkout module-7

# Check out Module 8 (Modular Express + Auth + Relational DB)
git checkout module-8
```

### 3. Install Dependencies & Run
Inside `module-6`, `module-7`, or `module-8`:

```bash
# Navigate to the project directory
cd node      # in module-6
# OR
cd express   # in module-7 / module-8

# Install dependencies
npm install

# Create environment file
cp .env.example .env   # (or create .env manually, see below)

# Run development server with live-reloading
npm run dev
```

---

## 🔐 Environment Configuration

For **`module-6`**, create `.env` inside `node/`:
```env
PORT=5000
```

For **`module-7`** and **`module-8`**, create `.env` inside `express/`:
```env
PORT=5000
CONNECTION_STRING=postgresql://<username>:<password>@<host>:<port>/<database>?sslmode=require
```

---

## 📜 Scripts Reference

In projects utilizing `package.json` (`node` and `express`):

- `npm run dev`: Runs the TypeScript server in watch mode using `tsx`.
- `npm test`: Runs test suite (if configured).

---

Happy Coding! 💻
