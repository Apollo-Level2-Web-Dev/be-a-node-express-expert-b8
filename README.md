# Module 9: Advanced Express.js Middlewares, RBAC & Global Error Handling 🛡️⚡

This module elevates Express backend development to production standards by integrating **Role-Based Access Control (RBAC)**, **custom & third-party middlewares**, **TypeScript declaration merging**, and **centralized global error handling**.

---

## 📂 Project Structure

```text
express/
├── package.json
├── tsconfig.json
├── logger.txt                  # Request audit log output
└── src/
    ├── app.ts                  # App configuration & middleware pipeline
    ├── server.ts               # Server bootstrap & database pool connection
    ├── config/
    │   └── index.ts            # Environment variables loader
    ├── db/
    │   └── index.ts            # PostgreSQL pool & auto schema migration (with role column)
    ├── middleware/
    │   ├── auth.ts             # JWT authentication & Role-Based Access Control (RBAC)
    │   ├── globalErrorHandler.ts # Centralized 4-argument error handler
    │   ├── index.d.ts          # TypeScript declaration merging for Express.Request
    │   └── logger.ts           # Custom file-based request logging middleware
    ├── modules/
    │   ├── auth/               # Login & JWT token issuance
    │   │   ├── auth.controller.ts
    │   │   ├── auth.route.ts
    │   │   └── auth.service.ts
    │   ├── profile/            # 1-to-1 User Profile management
    │   │   ├── profile.controller.ts
    │   │   ├── profile.route.ts
    │   │   └── profile.service.ts
    │   └── users/              # Users CRUD with role-protected routes
    │       ├── user.controller.ts
    │       ├── user.interface.ts
    │       ├── user.route.ts
    │       └── user.service.ts
    ├── types/
    │   └── index.ts            # Role types ("admin" | "agent" | "user") & constants
    └── utils/
        └── sencResponse.ts     # Generic type-safe response helper
```

---

## 🧠 Key Features & Architectural Patterns

### 1. Role-Based Access Control (RBAC) Middleware (`src/middleware/auth.ts`)
Higher-order middleware function that enforces authentication and authorization before requests reach route controllers:
- **Token Extraction:** Reads the JWT token from the `Authorization` header.
- **Verification:** Verifies signature against `config.jwt_secret`.
- **Database Validation:** Checks user existence in PostgreSQL and confirms active status (`is_active`).
- **Role Guard:** Matches user role against permitted roles:
  ```typescript
  const auth = (...roles: Role[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      // 1. Verify token
      // 2. Validate user in DB
      // 3. Confirm is_active status
      // 4. Validate roles.includes(user.role)
      // 5. Attach decoded token to req.user
      next();
    };
  };
  ```

### 2. TypeScript Declaration Merging (`src/middleware/index.d.ts`)
Extends Express's global `Request` interface to safely attach decoded token payload without TypeScript compilation errors:
```typescript
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
```

### 3. Centralized Global Error Handler (`src/middleware/globalErrorHandler.ts`)
A dedicated 4-argument Express error-handling middleware that catches all unhandled exceptions and errors passed via `next(err)`:
```typescript
const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
```

### 4. Custom Audit Logger Middleware (`src/middleware/logger.ts`)
Asynchronously appends request method, URL, and epoch timestamp to `logger.txt`:
```typescript
const logger = (req: Request, res: Response, next: NextFunction) => {
  const log = `\nMethod : ${req.method} | URL : ${req.url} | Time : ${Date.now()}\n`;
  fs.appendFile("logger.txt", log, (err) => {});
  next();
};
```

### 5. CORS & Cookie Parser Integration
Configured in `src/app.ts`:
- **CORS:** Restricted origin white-listing (`http://localhost:3000`).
- **Cookie Parser:** Parses incoming request cookies for cookie-based session/token support.

### 6. Generic Type-Safe API Response (`src/utils/sencResponse.ts`)
Standardizes JSON responses across the entire application using TypeScript generics:
```typescript
sendResponse<T>(res, { statusCode, success, message, data, error });
```

---

## 📡 API Endpoints Reference & Permission Matrix

| Module | Method | Endpoint | Required Role / Access | Description |
| :--- | :--- | :--- | :--- | :--- |
| **System** | `GET` | `/` | **Public** | API root health check |
| **Auth** | `POST` | `/api/v1/auth/login` | **Public** | Authenticate user & return signed JWT |
| **Profiles** | `POST` | `/api/v1/profiles` | **Public** | Create user profile (1-to-1 foreign key) |
| **Users** | `POST` | `/api/v1/users` | **Public** | Register new user (default role: `user`) |
| **Users** | `GET` | `/api/v1/users` | `admin`, `agent` | Retrieve list of all users |
| **Users** | `GET` | `/api/v1/users/:id` | `admin`, `agent`, `user` | Retrieve single user by ID |
| **Users** | `PUT` | `/api/v1/users/:id` | `admin`, `user` | Update user details (name, password, age, etc.) |
| **Users** | `DELETE`| `/api/v1/users/:id` | **Public / Controller-Managed** | Delete user (cascades to profile) |

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
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>?sslmode=require
JWT_SECRET=your_super_secret_jwt_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
```

### 4. Run Development Server
```bash
npm run dev
```
The server will run on port `5000` with hot-reloading via `tsx watch`.
