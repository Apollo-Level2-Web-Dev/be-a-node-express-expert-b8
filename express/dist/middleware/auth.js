import jwt, {} from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            // console.log(roles); ["admin"]
            // 1-> Check if the token exists
            // 2-> Verify Token
            // 3-> Check if the user exists
            // 4-> Is the user status Active
            //console.log(req.headers.authorization);
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access!!",
                });
            }
            const decode = jwt.verify(token, config.jwt_secret);
            // console.log(decode);
            const user = await pool.query(`
    SELECT * FROM users WHERE email=$1
    `, [decode.email]);
            //   console.log(user.rows[0]);
            if (user.rowCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found!!",
                });
            }
            if (!user.rows[0].is_active) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden!!",
                });
            }
            // roles = ["admin", "agent", "user"]
            // user.role = "admin"
            if (roles.length && !roles.includes(user.rows[0].role)) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access!!",
                });
            }
            //console.log(req);  req : { body : ""}
            req.user = decode;
            //console.log(req);  req : { body : "", user : ""}
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
export default auth;
//# sourceMappingURL=auth.js.map