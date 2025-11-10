import { Api } from "../../index";


export const getUserContributions = async () => {
    try {
        const response = await Api.get("/priceReports");
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al cargar reporte de precios');
    }
};