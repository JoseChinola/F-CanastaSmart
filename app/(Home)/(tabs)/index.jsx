import DashboardLayout from "@/components/dashboard/DashboardLayout";
import HomeUser from "@/components/screens/HomeUser";
import colors from "@/constants/theme/colors";
import useColorScheme from "@/hooks/use-color-scheme";
import { useUser } from "@/hooks/useUser";
import { ActivityIndicator, Image, Text, View } from "react-native";


export default function Index() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? colors.dark : colors.light;
    const { user, loading, dashboard } = useUser();


    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-black">
                <Image
                    source={{
                        uri: "https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg",
                    }}
                    style={{ width: 150, height: 150, marginBottom: 20 }}
                />
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    if (!user) {
        return (
            <DashboardLayout title="Mi panel">
                <View className="flex-1 justify-center items-center">
                    <Text className="text-gray-900 dark:text-gray-100">
                        No se pudo cargar el usuario
                    </Text>
                </View>
            </DashboardLayout>
        );
    }

    if (!dashboard) {
        return (
            <DashboardLayout title="Mi panel">
                <View className="flex-1 justify-center items-center">
                    <Text className="text-gray-900 dark:text-gray-100">
                        No se pudo cargar los datos del dashboard
                    </Text>
                </View>
            </DashboardLayout>
        );
    }

    const role = user?.role?.name;
    const overview = dashboard?.overview || {};
    const aportes = dashboard?.recentReports || [];
    const listas = dashboard?.shoppingLists || [];
    const rewards = dashboard?.rewards || [];
    const activityHistory = dashboard?.activityHistory || [];

    // Datos del nivel actual
    const levelName = overview?.level || "Explorador 🧭";
    const levelColor = overview?.color || "#4B9CD3";
    const progress = Number(overview?.progress) || 0;


    return (
        <DashboardLayout
            title="Mi panel"
        >
            {/* --- 🧍 Sección de bienvenida --- */}
            <View className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 shadow-sm shadow-gray-800 dark:shadow-amber-50">
                <Text className="text-gray-900 dark:text-gray-100 font-medium text-base">
                    Hola, {user.firstname}!
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                    Nivel actual: <Text style={{ color: levelColor }}>{levelName}</Text>
                </Text>
            </View>

            {/* --- 🔀 Render dinámico según el rol --- */}
            {role === "USER" && (
                <HomeUser
                    levelColor={levelColor}
                    levelName={levelName}
                    overview={overview}
                    progress={progress}
                    aportes={aportes}
                    listas={listas}
                    activityHistory={activityHistory}
                    rewards={rewards} />
            )}

            {/* {role === "ADMIN" && (
                <>
                    <AdminDashboard dashboard={dashboard} />
                </>
            )}

            {role === "SUPERADMIN" && (
                <>
                    <SuperAdminDashboard dashboard={dashboard} />
                </>
            )}

            {role === "MODERATOR" && (
                <>
                    <ModeratorDashboard dashboard={dashboard} />
                </>
            )}

            {!["USER", "ADMIN", "SUPERADMIN", "MODERATOR"].includes(role) && (
                <Text className="text-gray-500 text-center mt-4">
                    Rol no reconocido: {role}
                </Text>
            )} */}

        </DashboardLayout>
    )
}