import { Users } from '@/api/core/models/Model';
import React from 'react';
import { Text, View } from 'react-native';


type HomeProps = {
    userData: Users;
};


const HomeModerator: React.FC<HomeProps> = ({ userData }) => {
    return (
        <View className="flex-1 justify-center items-center">
            <Text>Bienvenido MODERATOR</Text>
        </View>
    );
}


export default HomeModerator;