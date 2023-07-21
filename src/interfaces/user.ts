export interface AuthUser {
    id?: number,
    email: string,
    name: string,
    token : string,
    rol: number,//1: admin, 2:merchant
    refreshToken : string,
}
