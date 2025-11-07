import { getUserContributions } from "@/api/core/services/contributions.services";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    LayoutAnimation,
    Platform,
    Text,
    TouchableOpacity,
    UIManager,
    View
} from "react-native";

// Habilitar animaciones en Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Contributions() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const res = await getUserContributions();

            if (res.success) {
                const reportsWithState = res.reports.map((r) => ({ ...r, expanded: false }));
                setReports(reportsWithState);
            } else {
                console.error("Error cargando reportes:", res.message);
            }
        } catch (error) {
            console.error("Error al obtener reportes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const toggleExpand = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setReports((prev) =>
            prev.map((r) => (r.id === id ? { ...r, expanded: !r.expanded } : r))
        );
    };

    const getStatusBadge = (report) => {
        let bgColor, textColor, icon, label;
        if (report.revokedAt) {
            bgColor = "bg-red-100 dark:bg-red-800";
            textColor = "text-red-700 dark:text-red-100";
            icon = "close-circle";
            label = "Rechazado";
        } else if (report.isVerified) {
            bgColor = "bg-green-100 dark:bg-green-800";
            textColor = "text-green-700 dark:text-green-100";
            icon = "checkmark-circle";
            label = "Verificado";
        } else {
            bgColor = "bg-yellow-100 dark:bg-yellow-800";
            textColor = "text-yellow-700 dark:text-yellow-100";
            icon = "time";
            label = "Pendiente";
        }

        return (
            <View className={`flex-row items-center px-3 py-1 rounded-full ${bgColor}`}>
                <Ionicons name={icon} size={18} color={textColor.replace("text-", "#")} />
                <Text className={`ml-2 font-semibold text-sm ${textColor}`}>{label}</Text>
            </View>
        );
    };

    return (
        <DashboardLayout title="Mis Aportes">
            {loading ? (
                <View className="mt-10 flex items-center justify-center">
                    <ActivityIndicator size="large" color="#3b82f6" />
                    <Text className="text-gray-500 dark:text-gray-400 mt-2">
                        Cargando aportes...
                    </Text>
                </View>
            ) : reports.length === 0 ? (
                <Text className="text-center text-gray-500 dark:text-gray-400 mt-10">
                    No has realizado aportes todavía.
                </Text>
            ) : (
                reports.map((r) => (
                    <View
                        key={r.id}
                        className="bg-gray-100 dark:bg-gray-700 rounded-3xl mb-6 shadow-neumorph overflow-hidden shadow-sm shadow-gray-800 dark:shadow-gray-50"
                    >
                        {/* Header del Card */}
                        <TouchableOpacity
                            onPress={() => toggleExpand(r.id)}
                            className="flex-row justify-between items-center px-3 py-2"
                        >

                            <Image
                                source={{
                                    uri: "https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg",
                                }}
                                resizeMode="cover"
                                className="rounded-xl"
                                style={{ width: 60, height: 40 }}
                            />
                            <View>
                                <Text className="text-base text-center font-bold text-gray-900 dark:text-white">
                                    {r.product?.name || "Producto desconocido"}
                                </Text>
                                <Text className="text-sm text-gray-500 text-center dark:text-gray-300">
                                    {r.product.brand}
                                </Text>
                            </View>
                        
                            <Ionicons
                                name={r.expanded ? "chevron-up" : "chevron-down"}
                                size={28}
                                color="#3b82f6"
                            />
                        </TouchableOpacity>

                        {/* Detalle expandido */}
                        {r.expanded && (
                            <View className="p-3 gap-2.5 bg-gray-50 dark:bg-gray-600 border-t-2 border-gray-400 rounded-t-xl">

                                {/* Supermercado */}
                                <View className="bg-gray-200 dark:bg-gray-700 rounded-xl p-3 shadow-inner">
                                    <Text className="text-gray-700 dark:text-gray-200 font-medium mb-1">
                                        🏪 Supermercado
                                    </Text>
                                    <Text className="text-gray-600 dark:text-gray-300 text-sm">
                                        {r.supermarket?.name}{" "}
                                        {r.supermarket?.address ? `- ${r.supermarket.address}` : ""}
                                    </Text>

                                </View>
                                <View className="gap-1.5 bg-gray-200 dark:bg-gray-700 rounded-xl">
                                    {/* Precio */}
                                    <View className="flex-row justify-between items-center p-2 shadow-inner">
                                        <Text className="text-gray-700 dark:text-gray-200 font-medium mb-1">
                                            Precio Reportado
                                        </Text>
                                        <Text className="text-gray-700 dark:text-gray-200 font-medium px-2">
                                            ${r.price}
                                        </Text>
                                    </View>

                                    {/* Precio */}
                                    <View className="flex-row justify-between items-center p-2 shadow-inner border-t border-gray-400">
                                        <Text className="text-gray-700 dark:text-gray-200 font-medium mb-1">
                                            Fecha del Reporte
                                        </Text>
                                        <Text className="text-gray-700 dark:text-gray-200 font-medium px-2">
                                            {new Date(r.createdAt).toLocaleDateString("es-ES")}
                                        </Text>
                                    </View>
                                </View>
                                {/* Estado del reporte */}
                                <View className="flex-row items-center justify-between bg-gray-200 dark:bg-gray-700 rounded-xl p-3 shadow-inner">
                                    <Text className="text-gray-700 dark:text-gray-200 font-medium">
                                        🧾 Estado
                                    </Text>
                                    {getStatusBadge(r)}
                                </View>

                                {/* Verificaciones */}
                                {r.verifiedCount > 0 && (
                                    <View className="bg-gray-200 dark:bg-gray-700 rounded-xl p-2 shadow-inner">
                                        <Text className="text-gray-500 dark:text-gray-300 text-sm">
                                            Verificado por {r.verifiedCount} usuario
                                            {r.verifiedCount !== 1 && "s"}
                                        </Text>
                                    </View>
                                )}

                                {/* Fecha de rechazo */}
                                {r.revokedAt && (
                                    <View className="bg-red-50 dark:bg-red-900 rounded-xl p-2 shadow-inner">
                                        <Text className="text-red-700 dark:text-red-200 font-medium">
                                            🚫 Reporte rechazado el{" "}
                                            {new Date(r.revokedAt).toLocaleDateString("es-ES")}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                ))
            )}
        </DashboardLayout>
    );
}
