import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Text } from "react-native";

export default function Supermarket() {
    return (
        <DashboardLayout title="Supermercados">
            <Text className="text-black dark:text-gray-50 font-bold text-2xl">
                En espera de funcionamiento con tabs
            </Text>
        </DashboardLayout>
    )
}