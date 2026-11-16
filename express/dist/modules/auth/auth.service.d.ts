declare const loginUserIntoDB: (payload: {
    email: string;
    password: string;
}) => Promise<{
    accessToken: string;
    refreshToken: string;
    user: any;
}>;
declare const generateAccessToken: (token: string) => Promise<{
    accessToken: string;
}>;
export declare const authService: {
    loginUserIntoDB: typeof loginUserIntoDB;
    generateAccessToken: typeof generateAccessToken;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map