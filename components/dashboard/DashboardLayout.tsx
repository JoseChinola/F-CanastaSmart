import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DashboardHeader } from './DashboardHeader';



interface DashboardLayoutProps {
    children: React.ReactNode;
    title: string;
}


const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {

    return (
        <SafeAreaView className='flex-1 bg-white dark:bg-gray-900'>
            <DashboardHeader title={title} />
            <ScrollView
                className='flex-1 p-4'
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

export default DashboardLayout