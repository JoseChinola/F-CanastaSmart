import { Api } from "../../index";
import { LoginData, LoginResponse } from '../models/Login.model';
import { RegisterData, RegisterResponse } from "../models/Register.model";

interface TokenResponse {
    success: boolean;
    message: string;
    token: string;
}

interface verifyEmailResponse {
    success: boolean;
    message: string;
}

interface resetpassword {
    userId: string;
    password: string;
}

interface verify_OTP {
    email: string;
    otp: string;
}

interface verifyOTP_Response {
    success: boolean;
    message: string;
    userId: string;
}

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
    try {
        console.log("data: ", data)
        const response = await Api.post(`/auth/register`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al registrar usuario');
    }
};

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await Api.post(`/auth/login`, data);
        return response.data;
    } catch (error: any) {
        return error.response?.data || 'Error al iniciar sesión'
    }
};

export const resendVerifyEmail = async (email: string): Promise<TokenResponse> => {
    try {
        const response = await Api.post(`/auth/resend-verification`, { email });
        return response.data;
    } catch (error: any) {
        return error.response?.data || { token: '' };
    }
}

export const confirmEmail = async (token: string): Promise<verifyEmailResponse> => {
    try {
        const response = await Api.post(`/auth/verify-email?token=${token}`);
        return response.data;
    } catch (error: any) {
        return error.response?.data || 'Error al verificar correo'
    }
}

export const resetPassword = async (reset_password: resetpassword): Promise<verifyEmailResponse> => {
    try {
        const response = await Api.put(`/auth/reset-password`, reset_password)
        return response.data
    } catch (error: any) {
        return error.response?.data || 'Error cambiando contraseña'
    }
}

export const sendResetPasswordEmail = async (email: string): Promise<verifyEmailResponse> => {
    try {
        const response = await Api.post(`/auth/forgot-password`, { email })
        return response.data
    } catch (error: any) {
        return error.response?.data || 'Error solicitando cambio de contraseña'
    }
}

export const verifyForgotPasswordOtp = async (data: verify_OTP): Promise<verifyOTP_Response> => {
    try {
        const response = await Api.post(`/auth/verify-otp-password`, data)
        return response.data
    } catch (error: any) {
        return error.response?.data || 'Error al verificar OTP'
    }
}