import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.join(process.cwd(), ".env"),
});
const config = {
    port: process.env.PORT,
    connection_string: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
};
export default config;
//# sourceMappingURL=index.js.map