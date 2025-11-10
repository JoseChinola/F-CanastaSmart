import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardList from "@/components/dashboard/DashboardList";
import { Text, View } from "react-native";


const HomeUser = ({ levelColor, levelName, overview, progress, aportes, listas, activityHistory, rewards }) => {


    return (
        <>
            {/* 📊 Cards métricas */}
            <View className="flex-row flex-wrap gap-3">
                <DashboardCard title="Mis puntos" value={overview?.points ?? 0} />
                <DashboardCard title="Listas activas" value={overview?.lists ?? 0} />
                <DashboardCard title="Productos reportados" value={overview?.reports ?? 0} />
                <DashboardCard
                    title="Nivel de reputación"
                    value={levelName}
                    color={levelColor}
                />
            </View>

            {/* 🔋 Progreso hacia el siguiente nivel */}
            <View className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 shadow-sm shadow-gray-800 dark:shadow-amber-50">
                <Text className="text-gray-900 dark:text-gray-100 mb-2">
                    Progreso hacia el siguiente nivel
                </Text>

                {/* Barra de progreso */}
                <View className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-1">
                    <View
                        style={{
                            width: `${progress * 100}%`,
                            backgroundColor: levelColor,
                        }}
                        className="h-3 rounded-full"
                    />
                </View>

                {/* Porcentaje */}
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                    {(progress * 100).toFixed(0)}%
                </Text>
            </View>

            {/* 🧾 Últimos aportes */}
            <DashboardList title="Últimos aportes" items={aportes} />

            {/* 🛒 Mis listas de compras */}
            <DashboardList title="Mis listas de compras" items={listas} />

            {/* 🕒 Historial de actividad */}
            <DashboardList
                title="Historial de actividad"
                items={activityHistory || []}
            />

            {/* 🏆 Recompensas */}
            <View className="mt-6 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                <Text className="text-lg font-semibold mb-4 dark:text-white text-gray-900">
                    🏆 Insignias y recompensas
                </Text>
                <View className="flex-row flex-wrap gap-2">
                    {rewards.length > 0 ? (
                        rewards.map((reward, i) => (
                            <View
                                key={i}
                                className="px-3 py-1 rounded-full mr-2 mb-2"
                                style={{ backgroundColor: levelColor }}
                            >
                                <Text className="text-xs font-bold text-white">{reward}</Text>
                            </View>
                        ))
                    ) : (
                        <Text className="text-gray-500 dark:text-gray-400 text-sm">
                            Aún no tienes recompensas
                        </Text>
                    )}
                </View>
            </View>
        </>
    )

}

export default HomeUser