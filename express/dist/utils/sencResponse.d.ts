import type { Response } from "express";
type TReponse<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T;
    error?: any;
};
declare const sendResponse: <T>(res: Response, data: TReponse<T>) => void;
export default sendResponse;
//# sourceMappingURL=sencResponse.d.ts.map