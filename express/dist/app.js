import express, {} from "express";
import { userRoute } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import globalErrorHandler from "./middleware/globalErrorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const corsOptions = {
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/profiles", profileRoute);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "This is root route",
        author: "PH",
    });
});
// Global Error Handling Middleware
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map