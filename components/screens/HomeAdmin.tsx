import { Users } from '@/api/core/models/Model';
import React from 'react';
import { Text, View } from 'react-native';

type HomeProps = {
    userData: Users;
};

const HomeAdmin: React.FC<HomeProps> = ({ userData }) => {
    return (
        <View className="flex-1 justify-center items-center">
            <Text>Bienvenido ADMIN</Text>
        </View>
    );
}

export default HomeAdmin;