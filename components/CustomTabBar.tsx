import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <BlurView intensity={90} tint="light" style={styles.blurContainer}>
        {state.routes
          .filter((route) => route.name !== 'auth' && route.name !== 'about-me') // Exclude 'auth' and 'about-me'
          .map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const iconName = (() => {
              if (route.name === 'index') return 'home';
              if (route.name === 'create') return 'plus';
              if (route.name === 'explore') return 'search';
              if (route.name === 'profile') return 'user';
              return 'circle';
            })();

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
                style={[styles.tabButton, isFocused && styles.activeTabButton]}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, isFocused && styles.activeIcon]}>
                  <FontAwesome name={iconName} size={20} color={isFocused ? '#fff' : '#222'} />
                </View>
              </TouchableOpacity>
            );
          })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  blurContainer: {
    flexDirection: 'row',
    overflow: 'hidden', // Ensure the BlurView clips its children
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Ensure the TouchableOpacity clips its children
    borderRadius: 22, // Match the border radius of the active icon
  },
  activeTabButton: {
    backgroundColor: '#f59e0b', // Add background color for active tab
  },
  iconContainer: {
    width: 100,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIcon: {
    backgroundColor: '#f59e0b',
  },
});
