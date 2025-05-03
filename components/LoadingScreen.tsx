// components/LoadingScreen.tsx
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import React from 'react';


interface LoadingScreenProps {
    redirectTo: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ redirectTo }) => {
    React.useEffect(() => {
        // Simulate redirection logic
        console.log(`Redirecting to ${redirectTo}`);
    }, [redirectTo]);

    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
            <ActivityIndicator size="large" color="#007AFF" />
        </View>
    );
};

export default LoadingScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF9E6', // or your theme background
    },
});