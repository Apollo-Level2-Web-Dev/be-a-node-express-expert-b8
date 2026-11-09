const { a: x, b: y } = require("./file1.js");

const add = require("./utils/add.js");

console.log("Additions : ", add(x, y));
