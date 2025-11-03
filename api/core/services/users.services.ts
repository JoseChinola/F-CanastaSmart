import { Api } from "../../index";


export const getProfile = async () => {
    try {
        const response = await Api.get("/users/profile");
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al cargar usuario');
    }
};

export const getDashboardUser = async () => {
    try {
        const response = await Api.get("/users/dashboard");
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al cargar usuario');
    }
};

export const updateInfoUser = async (userId: string, data: Record<string, any>) => {
    try {
        // PATCH en vez de PUT
        const response = await Api.patch(`/users/${userId}`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error actualizando usuario");
    }
};

export const changeUserPassword = async (userId: string, newPassword: string) => {
    try {
        // PATCH en vez de PUT
        const response = await Api.put(`/users/${userId}`, { newPassword });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error actualizando usuario");
    }
};