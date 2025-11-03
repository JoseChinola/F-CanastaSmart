import { loginUser, registerUser } from "@/api/core/services/auth.services";
import { getDashboardUser, updateInfoUser } from "@/api/core/services/users.services";
import { createContext, useEffect, useState } from "react";
import { getToken, removeTokenAndUser, saveToken } from "../lib/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [dashboard, setDashboard] = useState(null)
    const [loading, setLoading] = useState(false);


    // Al montar, revisar token y cargar perfil
    useEffect(() => {
        const initialize = async () => {
            setLoading(true);
            try {
                const token = await getToken();
                if (!token) return; // si no hay token, salimos
                const dashboardRes = await getDashboardUser();
                if (dashboardRes.success) {
                    setUser(dashboardRes.user);
                    if (dashboardRes.success) setDashboard(dashboardRes.data);
                } else {
                    await removeTokenAndUser();
                    setUser(null);
                }
            } catch (err) {
                console.error("Error al inicializar usuario:", err);
                await removeTokenAndUser();
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initialize();
    }, []);



    async function login(email, password) {
        try {
            setLoading(true);
            const res = await loginUser({ email, password });
            if (res.success) {
                const user = res.user;
                await saveToken(user.token);
                return { success: true, user };
            } else {
                return { success: false, message: res.message };
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Ocurrió un error al iniciar sesión';
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    }

    async function updateUser(id, data) {
        try {
            setLoading(true);
            const response = await updateInfoUser(id, data);

            if (response.success) {
                const refreshed = await getDashboardUser();
                if (refreshed.success && refreshed.user) {
                    setUser(refreshed.user);
                }
                return { success: true, message: response.message };
            } else {
                return { success: false, message: response.message };
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'No se pudo actualizar el usuario';
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    }

    async function register(firstname, lastname, email, password) {
        setLoading(true);
        try {
            const res = await registerUser({ firstname, lastname, email, password });
            console.log("REs ", res)
            // Retornamos un objeto consistente
            if (res.success) {
                return { success: true };
            } else {
                return { success: false, message: res.message || 'Error al registrar usuario' };
            }
        } catch (err) {
            return { success: false, message: err.message || 'Ocurrió un error registrando' };
        } finally {
            setLoading(false);
        }
    }


    async function logout() {

    }
    return (
        <AuthContext.Provider value={{ user, dashboard, login, loading, logout, register, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}