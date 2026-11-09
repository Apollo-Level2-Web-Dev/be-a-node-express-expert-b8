import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controllers/product.controller";

const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url; // "/" , "/products" , "/courses"
  const method = req.method; // "GET", "POST"

  if (url === "/" && method === "GET") {
    //   console.log("This is root route");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "This is root route!!" }));
  } else if (url?.startsWith("/products")) {
    // Product -> GET, PUT, POST
    productController(req, res);
  } else {
    //   console.log("This route is not defined");
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "This route is not defined" }));
  }
};

export default routeHandler;
