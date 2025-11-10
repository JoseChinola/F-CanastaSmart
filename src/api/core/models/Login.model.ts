export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    token: string;
    verified: boolean;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    user: User;
}