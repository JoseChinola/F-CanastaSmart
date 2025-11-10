import React from "react";
import { Text, View } from "react-native";

interface Product {
    name?: string;
    brand?: string;
}

interface Supermarket {
    name?: string;
}

interface AporteItem {
    price?: number;
    product?: Product;
    supermarket?: Supermarket;
}

interface ListaItem {
    name: string;
}

interface ActivityItem {
    name: string;
}

type DashboardItem = AporteItem | ListaItem | ActivityItem;

interface DashboardListProps {
    items: DashboardItem[];
    title: string;
}

const DashboardList: React.FC<DashboardListProps> = ({ items, title }) => {
    const renderItem = (item: DashboardItem, i: number) => {
        const isAporte = "product" in item;
        const isLista = "name" in item && !("product" in item) && !("price" in item);
        const isActivity = "name" in item && !("product" in item) && !("supermarket" in item);

        if (isAporte) {
            const aporte = item as AporteItem;
            return (
                <View
                    key={i}
                    className="bg-white dark:bg-gray-700 rounded-2xl p-4 mb-3 shadow-sm shadow-gray-800 dark:shadow-amber-50"
                >
                    <View className="flex-row justify-between">
                        <Text className="text-gray-900 dark:text-gray-100 font-semibold text-base">
                            {aporte.product?.name}
                        </Text>
                        <Text className="text-indigo-500 dark:text-indigo-400 font-bold">
                            ${aporte.price}
                        </Text>
                    </View>

                    <Text className="text-gray-500 dark:text-gray-300 text-xs mt-1">
                        {aporte.product?.brand} • {aporte.supermarket?.name}
                    </Text>

                </View>
            );
        }

        if (isLista) {
            const lista = item as ListaItem;
            return (
                <View
                    key={i}
                    className="bg-white dark:bg-gray-700 rounded-2xl p-4 mb-3 shadow-sm shadow-gray-800 dark:shadow-amber-50"
                >
                    <Text className="text-gray-900 dark:text-gray-100 font-semibold text-base">
                        🛒 {lista.name}
                    </Text>
                </View>
            );
        }

        if (isActivity) {
            const act = item as ActivityItem;
            return (
                <View
                    key={i}
                    className="bg-white dark:bg-gray-700 rounded-2xl p-4 mb-3 shadow-sm shadow-gray-800 dark:shadow-amber-50"
                >
                    <Text className="text-gray-800 dark:text-gray-100 text-base">
                        🕒 {act.name}
                    </Text>
                </View>
            );
        }

        return null;
    };

    return (
        <View className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-3xl shadow-sm shadow-gray-800 dark:shadow-amber-50">
            <Text className="text-xl font-semibold dark:text-white text-gray-900 mb-4">
                {title}
            </Text>

            {items.length === 0 ? (
                <Text className="text-gray-400 dark:text-gray-300 text-sm italic">
                    No hay elementos
                </Text>
            ) : (
                items.map(renderItem)
            )}
        </View>
    );
};

export default DashboardList;
