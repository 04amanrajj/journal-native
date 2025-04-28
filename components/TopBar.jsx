import React from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { Image } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

const TopBar = () => {
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <FontAwesome name="sun-o" size={24} color="#F9A825" />
                <Text style={styles.dateText}>{currentDate}</Text>
            </View>

            <Image
                source={{
                    uri: "https://storage.googleapis.com/a1aa/image/399c1188-8f92-43f0-9923-879989cbe663.jpg",
                }}
                style={styles.profileImage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
      },
      headerLeft: {
        flexDirection: "row",
        alignItems: "center",
      },
      dateText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#1A1A1A",
        marginLeft: 8,
      },
      profileImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
        overflow: "hidden",
      },
});

export default TopBar;