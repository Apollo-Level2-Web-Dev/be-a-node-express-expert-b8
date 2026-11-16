import fs from "fs";
const logger = (req, res, next) => {
    // console.log("Method -> URL -> Time:", req.method, req.url, Date.now());
    const log = `\nMethod : ${req.method} | URL : ${req.url} | Time : ${Date.now()}\n`;
    fs.appendFile("logger.txt", log, (err) => {
        // console.log(err);
    });
    next();
};
export default logger;
//# sourceMappingURL=logger.js.map