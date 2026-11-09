# Module 8: Modular Architecture, Authentication & Relational Modeling in Express 🏗️🔐

This module takes backend development to an enterprise-grade standard. It refactors Express.js into a **scalable, modular 3-tier architecture**, introduces **relational database modeling with foreign keys and cascading deletes in PostgreSQL**, and implements **secure authentication using Bcrypt and JSON Web Tokens (JWT)**.

---

## 📂 Project Structure

```text
express/
├── package.json
├── tsconfig.json
└── src/
    ├── app.ts                  # Express application configuration & route binding
    ├── server.ts               # Server bootstrapping, DB connection & listener
    ├── config/
    │   └── index.ts            # Centralized environment variable loader
    ├── db/
    │   └── index.ts            # PostgreSQL pool & automatic schema migrations
    └── modules/
        ├── auth/               # Authentication module (Login, Bcrypt, JWT)
        │   ├── auth.controller.ts
        │   ├── auth.route.ts
        │   └── auth.service.ts
        ├── profile/            # User profile module (1-to-1 relation with CASCADE delete)
        │   ├── profile.controller.ts
        │   ├── profile.route.ts
        │   └── profile.service.ts
        └── users/              # Users module (CRUD operations & password hashing)
            ├── user.interface.ts
            ├── user.controller.ts
            ├── user.route.ts
            └── user.service.ts
```

---

## 🧠 Key Features & Architectural Patterns

### 1. Modular 3-Tier Pattern (`Route -> Controller -> Service`)
Each domain feature is self-contained in `src/modules/<feature>`:
- **`*.route.ts`**: Defines URL routes and maps HTTP verbs to controller actions.
- **`*.controller.ts`**: HTTP transport layer—extracts request data, validates input, calls service functions, and formats HTTP responses.
- **`*.service.ts`**: Pure business logic and direct database queries using PostgreSQL connection pool.
- **`*.interface.ts`**: TypeScript type definitions and interfaces for compile-time safety.

### 2. Relational Database Modeling with PostgreSQL
The database automatically initializes two relational tables with a **one-to-one relationship** on startup:
- **`users` Table:**
  - `id SERIAL PRIMARY KEY`
  - `name VARCHAR(255)`
  - `email VARCHAR(255) UNIQUE NOT NULL`
  - `password VARCHAR(255) NOT NULL` (Bcrypt hashed)
  - `age INT`
  - `is_Active BOOLEAN DEFAULT true`
  - `created_at TIMESTAMP`, `updated_at TIMESTAMP`
- **`profile` Table (Foreign Key & Cascade Delete):**
  - `id SERIAL PRIMARY KEY`
  - `user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE`
  - `bio TEXT`, `address TEXT`, `phone VARCHAR(15)`, `gender VARCHAR(15)`
  - `created_at TIMESTAMP`, `updated_at TIMESTAMP`

### 3. Secure Authentication & Authorization (`src/modules/auth/`)
- **Password Hashing:** Passwords are securely hashed with a salt factor of 10 (`bcrypt.hash`) before being saved in PostgreSQL.
- **Password Verification:** Uses constant-time comparison via `bcrypt.compare` during user login.
- **Account State Verification:** Verifies that the user account is active (`is_active`) before granting access.
- **JWT Token Generation:** Creates a signed JWT access token (`jwt.sign`) carrying user claims (`id`, `name`, `email`) with a 1-day expiration.

### 4. Application vs Server Separation
- **`src/app.ts`**: Pure Express application configuration. Sets up global middlewares (`express.json()`, `express.urlencoded()`, `express.text()`), attaches feature routers (`/api/v1/users`, `/api/v1/auth`, `/api/v1/profiles`), and defines the root endpoint.
- **`src/server.ts`**: Bootstrapper. Initializes the database connection and schema (`initDB()`), then binds the HTTP listener to the configured port.

---

## 📡 API Endpoints Reference

### 🔐 Authentication (`/api/v1/auth`)
| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Authenticate user & return JWT | `{ "email": "...", "password": "..." }` |

### 👤 Profiles (`/api/v1/profiles`)
| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/profiles` | Create profile for existing user | `{ "user_id": 1, "bio": "...", "address": "...", "phone": "...", "gender": "..." }` |

### 👥 Users (`/api/v1/users`)
| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/users` | Register new user (password is auto-hashed) | `{ "name": "...", "email": "...", "password": "...", "age": 25 }` |
| `GET` | `/api/v1/users` | Retrieve all users | None |
| `GET` | `/api/v1/users/:id` | Retrieve single user by ID | None |
| `PUT` | `/api/v1/users/:id` | Partial update user details (`COALESCE`) | `{ "name": "...", "age": 26 }` |
| `DELETE` | `/api/v1/users/:id` | Delete user (cascades to profile) | None |

### 🌐 System
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Root API health check |

---

## 🚀 Getting Started

### 1. Navigate to the project directory
```bash
cd express
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `express/` directory:
```env
PORT=5000
CONNECTION_STRING=postgresql://<username>:<password>@<host>:<port>/<database>?sslmode=require
```

### 4. Run Development Server
```bash
npm run dev
```
The server will start listening on port `5000` with live reloading via `tsx watch`.
