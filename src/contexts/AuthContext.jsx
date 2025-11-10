import { loginUser, registerUser } from "@/api/core/services/auth.services";
import { getDashboardUser, updateInfoUser } from "@/api/core/services/users.services";
import { createContext, useEffect, useState } from "react";
import { getToken, removeTokenAndUser, saveToken } from "../lib/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(false);

    // ✅ Cargar usuario al iniciar
    useEffect(() => {
        initializeUser();
    }, []);

    const initializeUser = async () => {
        setLoading(true);
        try {
            const token = await getToken();
            if (!token) {
                setUser(null);
                return;
            }
            const dashboardRes = await getDashboardUser();
            if (dashboardRes.success) {
                setUser(dashboardRes.user);
                setDashboard(dashboardRes.data);
            } else {
                await removeTokenAndUser();
                setUser(null);
                setDashboard(null);
            }
        } catch (err) {
            console.error("Error al inicializar usuario:", err);
            await removeTokenAndUser();
            setUser(null);
            setDashboard(null);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Login: guarda token y actualiza usuario
    async function login(email, password) {
        setLoading(true);
        try {
            const res = await loginUser({ email, password });
            if (res.success) {
                const user = res.user;
                await saveToken(user.token);

                await initializeUser();
                
                return { success: true, user }
            } else {
                return { success: false, message: res.message };
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Ocurrió un error al iniciar sesión";
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    }

    // ✅ Actualiza datos del usuario
    async function updateUser(id, data) {
        setLoading(true);
        try {
            const response = await updateInfoUser(id, data);
            if (response.success) {
                await initializeUser(); // Refresca la info
                return { success: true, message: response.message };
            } else {
                return { success: false, message: response.message };
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message || "No se pudo actualizar el usuario";
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    }

    // ✅ Registro
    async function register(firstname, lastname, email, password) {
        setLoading(true);
        try {
            const res = await registerUser({ firstname, lastname, email, password });
            if (res.success) {
                return { success: true };
            } else {
                return { success: false, message: res.message || "Error al registrar usuario" };
            }
        } catch (err) {
            return { success: false, message: err.message || "Ocurrió un error registrando" };
        } finally {
            setLoading(false);
        }
    }

    // ✅ Logout
    async function logout() {
        await removeTokenAndUser();
        setUser(null);
        setDashboard(null);
    }

    return (
        <AuthContext.Provider value={{ user, dashboard, login, loading, logout, register, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}