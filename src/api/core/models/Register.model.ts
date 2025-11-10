export interface RegisterData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
}