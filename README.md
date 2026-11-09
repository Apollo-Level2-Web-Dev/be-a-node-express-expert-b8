# Module 7: Express.js & PostgreSQL Monolithic REST API 🐘

This module introduces the **Express.js** web framework with **TypeScript** and integrates a relational database using **PostgreSQL** (`pg` library).

---

## 📂 Project Structure

```text
express/
├── package.json
├── tsconfig.json
└── src/
    ├── server.ts         # Server, routes, and DB initialization in a single file
    └── config/
        └── index.ts      # Environment variable configuration
```

---

## 🧠 Key Features & Technical Details

### 1. Built-in Express Middleware
Handles request body parsing for JSON, raw text, and URL-encoded payloads:
```typescript
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
```

### 2. PostgreSQL Connection Pooling (`pg.Pool`)
Manages reusable database connections efficiently:
```typescript
const pool = new Pool({
  connectionString: config.connection_string,
});
```

### 3. Automatic Schema Migration on Startup
Initializes the `users` table automatically if it does not already exist:
```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  age INT,
  is_Active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Parameterized SQL Queries & Safe Partial Updates
- Uses `$1, $2, ...` to protect against SQL Injection.
- Employs SQL `COALESCE` for non-destructive partial updates:
```sql
UPDATE users 
SET
  name = COALESCE($1, name),  
  password = COALESCE($2, password),
  age = COALESCE($3, age),
  is_Active = COALESCE($4, is_Active),
  updated_at = NOW() 
WHERE id = $5 RETURNING *;
```

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API health check |
| `POST` | `/api/v1/users` | Create a new user |
| `GET` | `/api/v1/users` | Retrieve all users |
| `GET` | `/api/v1/users/:id` | Retrieve single user by ID |
| `PUT` | `/api/v1/users/:id` | Update user details (name, password, age, is_Active) |
| `DELETE` | `/api/v1/users/:id` | Delete user by ID |

---

## 🚀 Getting Started

### 1. Navigate to the Express directory
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
Server will start listening on port `5000` with hot-reloading powered by `tsx`.
