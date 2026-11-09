# Module 6: Raw Node.js HTTP Server & REST API ⚡

This module demonstrates how to build a production-style RESTful API using pure, native Node.js APIs (`http` module) and TypeScript—**without relying on Express or third-party web frameworks**.

---

## 📂 Project Structure

```text
node/
├── package.json
├── tsconfig.json
└── src/
    ├── server.ts
    ├── config/
    │   └── index.ts
    ├── controllers/
    │   └── product.controller.ts
    ├── database/
    │   └── db.json
    ├── routes/
    │   └── route.ts
    ├── service/
    │   └── product.service.ts
    ├── types/
    │   └── product.ts
    └── utils/
        ├── parseBody.ts
        └── sendResponse.ts
```

---

## 🧠 Key Architecture & Concepts

### 1. HTTP Server Setup (`src/server.ts`)
Creates an HTTP server using Node's native `http.createServer()`, forwarding all incoming `IncomingMessage` and `ServerResponse` instances to a centralized router:
```typescript
const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
  routeHandler(req, res);
});
```

### 2. Stream-based Body Parser (`src/utils/parseBody.ts`)
Because native Node doesn't parse incoming JSON bodies automatically, this utility buffers stream chunks from the request socket:
```typescript
export const bodyParser = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => { body += chunk.toString(); });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
};
```

### 3. Unified Response Formatter (`src/utils/sendResponse.ts`)
Encapsulates response header creation, HTTP status code setting, and JSON serialization into a reusable helper:
```typescript
export const sendResponse = (
  res: ServerResponse,
  success: boolean,
  statusCode: number,
  message: string,
  data?: any
) => { ... };
```

### 4. Controller & Service Pattern
- **`product.controller.ts`**: Extracts URL parameters (e.g. `/products/:id`), coordinates with the body parser, calls service methods, and writes HTTP responses.
- **`product.service.ts`**: Reads from and persists data to a mock JSON database file (`src/database/db.json`).

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Root health check |
| `GET` | `/products` | Get list of all products |
| `GET` | `/products/:id` | Get single product by numeric ID |
| `POST` | `/products` | Create a new product |
| `PUT` | `/products/:id` | Update existing product by ID |
| `DELETE` | `/products/:id` | Delete product by ID |

---

## 🚀 Getting Started

### 1. Navigate to the Node directory
```bash
cd node
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `node/` directory:
```env
PORT=5000
```

### 4. Start Development Server
```bash
npm run dev
```
Server will start listening on port `5000` with hot-reloading powered by `tsx`.
