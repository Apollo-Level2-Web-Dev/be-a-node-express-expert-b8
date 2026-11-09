import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
  // /product -> GET , POST, PUT

  const url = req.url;
  const method = req.method;
  // console.log(url);  -> /products/1 -> []
  const urlParams = url?.split("/");
  // console.log(urlParams); ["","products","1"]
  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;
  // console.log(id);

  // Get All Product
  if (url === "/products" && method === "GET") {
    try {
      const products = productService();
      sendResponse(res, true, 200, "Products retrived successfully!", products);
    } catch (error) {
      sendResponse(res, false, 500, "Internal server error");
    }
  } else if (method === "GET" && id !== null) {
    try {
      const products = productService(); // [{},{},{}]
      const product = products.find((p: IProduct) => p.id === id);

      if (!product) {
        return sendResponse(res, false, 404, "Product not found!");
      }
      sendResponse(res, true, 200, "Product retrived successfully!", product);
    } catch (error) {
      sendResponse(res, false, 500, "Internal server error");
    }
  } else if (method === "POST" && url === "/products") {
    // "abcd" => "a", "b" , "c" => "abc"
    const body = await bodyParser(req);
    // console.log(body);
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    // console.log(newProduct);

    const products = productService(); // [{},{}]

    products.push(newProduct); // [{},{},{new}]

    createProduct(products);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product created successfully!",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await bodyParser(req);
    const products = productService(); // [{},{}]

    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);
    if (index < 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found!",
        }),
      );
    }
    // product => [{},{}]
    // product[1] => {}

    // console.log(products[index]);

    products[index] = { id: products[index].id, ...body };

    createProduct(products);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product updated successfully!",
        data: products[index],
      }),
    );
  } else if (method === "DELETE" && id !== null) {
    const products = productService(); // [{},{}]
    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);
    if (index < 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found!",
        }),
      );
    }

    // const arr = ["a", "b", "c"];
    // console.log(arr.splice(2,1));
    // arr.splice(2, 1);
    // console.log(arr);

    products.splice(index, 1);

    createProduct(products);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product deleted successfully!",
      }),
    );
  }
};

export default productController;
