import React, { useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");
const TAB_WIDTH = (width - 90) / 4; // 4 tabs, accounting for container padding

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const animatedValues = useRef(
    state.routes.map(() => new Animated.Value(0))
  ).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the active tab
    state.routes.forEach((_, index) => {
      Animated.spring(animatedValues[index], {
        toValue: state.index === index ? 1 : 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    });

    // Animate the sliding indicator
    Animated.spring(slideAnim, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [state.index]);

  const handlePress = (route: any, index: number) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (state.index !== index && !event.defaultPrevented) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      navigation.navigate(route.name);
    }
  };

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={90} tint="light" style={styles.blurContainer}>
        <Animated.View
          style={[
            styles.slidingIndicator,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        />
        {state.routes
          .filter((route) => route.name !== "aboutme")
          .map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const iconName = (() => {
              if (route.name === "index") return "home";
              if (route.name === "create") return "plus";
              if (route.name === "explore") return "search";
              if (route.name === "profile") return "user";
              return "circle";
            })();

            const scale = animatedValues[index].interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.2],
            });

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={() => handlePress(route, index)}
                style={[styles.tabButton, isFocused && styles.activeTabButton]}
                activeOpacity={0.7}
              >
                <Animated.View
                  style={[
                    styles.iconContainer,
                    isFocused && styles.activeIcon,
                    { transform: [{ scale }] },
                  ]}
                >
                  <FontAwesome
                    name={iconName}
                    size={20}
                    color={isFocused ? "#fff" : "#222"}
                  />
                </Animated.View>
              </TouchableOpacity>
            );
          })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  blurContainer: {
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 25,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  slidingIndicator: {
    position: "absolute",
    width: TAB_WIDTH,
    height: 44,
    backgroundColor: "#f59e0b",
    borderRadius: 22,
    left: 25, // Account for container padding
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 22,
  },
  activeTabButton: {
    backgroundColor: "transparent", // Changed to transparent to show sliding indicator
  },
  iconContainer: {
    width: 100,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  activeIcon: {
    backgroundColor: "transparent", // Changed to transparent to show sliding indicator
  },
});
