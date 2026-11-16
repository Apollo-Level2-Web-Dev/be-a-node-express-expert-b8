import type { Request, Response } from "express";
declare const loginUser: (req: Request, res: Response) => Promise<void>;
declare const generateToken: (req: Request, res: Response) => Promise<void>;
export declare const authController: {
    loginUser: typeof loginUser;
    generateToken: typeof generateToken;
};
export {};
//# sourceMappingURL=auth.controller.d.ts.map