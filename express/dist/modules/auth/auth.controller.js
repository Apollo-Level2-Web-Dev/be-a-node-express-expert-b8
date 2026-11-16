import { authService } from "./auth.service";
import sendResponse from "../../utils/sencResponse";
const loginUser = async (req, res) => {
    try {
        const result = await authService.loginUserIntoDB(req.body);
        const { refreshToken } = result;
        res.cookie("refreshToken", refreshToken, {
            secure: false, // http -> false , https -> true / In Production -> true
            httpOnly: true, // Prevent XSS attack
            sameSite: "lax", // "none" , "strict", "lax" -> CSRF
            // maxAge
            path: "/",
            domain: "localhost", // .example.com
        });
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User login successfully!",
            data: result,
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error?.message,
            error: error,
        });
    }
};
const generateToken = async (req, res) => {
    try {
        // console.log(req.cookies.refreshToken);
        const result = await authService.generateAccessToken(req.cookies.refreshToken);
        res.status(200).json({
            success: true,
            message: "Access token generated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error,
        });
    }
};
export const authController = {
    loginUser,
    generateToken,
};
//# sourceMappingURL=auth.controller.js.map