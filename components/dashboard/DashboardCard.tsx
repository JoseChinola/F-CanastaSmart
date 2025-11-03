import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface DashboardCardProps {
    title: string;
    value: string | number;
    color?: string;
    onPress?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, onPress, color }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-gray-50 dark:bg-gray-800 p-4 flex-4/12 rounded-3xl shadow-xs shadow-gray-900 dark:shadow-amber-50"

        >
            <Text className="text-gray-500 dark:text-gray-300 text-sm font-medium">{title}</Text>
            <Text className="text-xl font-bold mt-2 text-gray-500 dark:text-gray-300" style={{ color: color }} >{value}</Text>
        </TouchableOpacity>
    );
};

export default DashboardCard;
