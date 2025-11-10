import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useUser() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useUser debe estar dentro de un provider");
        
    }
    return context
}
