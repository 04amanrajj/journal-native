import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import CustomTabBar from '@/components/CustomTabBar';
import LoadingScreen from '@/components/LoadingScreen';
import { FontAwesome5 } from '@expo/vector-icons';

const TabLayout: React.FC = () => {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const validateToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      const response = await axios.get('https://journal-app-backend-kxqs.onrender.com/user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        await AsyncStorage.removeItem('authToken');
        setIsLoggedIn(false);
      }
    } catch (error: any) {
      console.error('Token validation error:', error);
      await AsyncStorage.removeItem('authToken');
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  if (isLoggedIn === null) {
    return <LoadingScreen />;
  }

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="create" options={{ title: 'Create' }} />
      <Tabs.Screen
        name="profile"
        options={{
          title: isLoggedIn ? 'Profile' : 'Login',
          href: '/(tabs)/profile',
        }}
      />
    </Tabs>
  );
};

export default TabLayout;