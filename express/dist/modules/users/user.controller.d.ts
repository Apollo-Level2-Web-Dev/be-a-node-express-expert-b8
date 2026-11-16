import type { Request, Response } from "express";
declare const createUser: (req: Request, res: Response) => Promise<void>;
declare const getAllUsers: (req: Request, res: Response) => Promise<void>;
declare const getSingleUser: (req: Request, res: Response) => Promise<void>;
declare const updateUser: (req: Request, res: Response) => Promise<void>;
declare const deleteUser: (req: Request, res: Response) => Promise<void>;
export declare const userController: {
    createUser: typeof createUser;
    getAllUsers: typeof getAllUsers;
    getSingleUser: typeof getSingleUser;
    updateUser: typeof updateUser;
    deleteUser: typeof deleteUser;
};
export {};
//# sourceMappingURL=user.controller.d.ts.map