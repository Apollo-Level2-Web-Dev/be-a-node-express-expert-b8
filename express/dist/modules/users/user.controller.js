import { userService } from "./user.service";
const createUser = async (req, res) => {
    try {
        const result = await userService.createUserIntoDB(req.body);
        res.status(201).json({
            success: true,
            message: "User created!!",
            data: result.rows[0],
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
const getAllUsers = async (req, res) => {
    console.log("From Controller", req.user);
    try {
        const result = await userService.getAllUsersFromDB();
        // console.log(result);
        res.status(200).json({
            success: true,
            message: "Users retrived successfully!",
            data: result.rows,
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
const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params; // req.params.id
        const result = await userService.getSingleUserFromDB(id);
        // console.log(result);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!!",
            });
        }
        res.status(200).json({
            success: true,
            message: "User retrived successfully!",
            data: result.rows[0],
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
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userService.updateUserFromDB(req.body, id);
        // console.log(result);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!!",
            });
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result.rows[0],
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
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userService.deleteUserFromDB(id);
        // console.log(result);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!!",
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            // data: result.rows[0],
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
export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.controller.js.map