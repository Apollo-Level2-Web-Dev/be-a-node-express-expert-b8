import type { IUser } from "./user.interface";
declare const createUserIntoDB: (payload: IUser) => Promise<import("pg").QueryResult<any>>;
declare const getAllUsersFromDB: () => Promise<import("pg").QueryResult<any>>;
declare const getSingleUserFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
declare const updateUserFromDB: (payload: any, id: string) => Promise<import("pg").QueryResult<any>>;
declare const deleteUserFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
export declare const userService: {
    createUserIntoDB: typeof createUserIntoDB;
    getAllUsersFromDB: typeof getAllUsersFromDB;
    getSingleUserFromDB: typeof getSingleUserFromDB;
    updateUserFromDB: typeof updateUserFromDB;
    deleteUserFromDB: typeof deleteUserFromDB;
};
export {};
//# sourceMappingURL=user.service.d.ts.map