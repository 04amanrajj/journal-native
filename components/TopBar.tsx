import React, { useState } from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { Image } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';

const TopBar = () => {
    const [showMenu, setShowMenu] = useState(false);
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

            <TouchableOpacity onPress={() => setShowMenu(prev => !prev)}>
                <Image
                    source={{
                        uri: "https://storage.googleapis.com/a1aa/image/399c1188-8f92-43f0-9923-879989cbe663.jpg",
                    }}
                    style={styles.profileImage}
                />
            </TouchableOpacity>

            {showMenu && (
                <View style={styles.menu}>
                    <BlurView intensity={50} style={{ borderRadius: 8 }}>
                        <TouchableOpacity onPress={() => console.log('Profile pressed')}>
                            <Text style={styles.menuItem}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log('Settings pressed')}>
                            <Text style={styles.menuItem}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log('Logout pressed')}>
                            <Text style={styles.menuItem}>Logout</Text>
                        </TouchableOpacity>
                    </BlurView>
                </View>
            )}
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
    menu: {
        position: 'absolute',
        top: 60,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingTop: 10,
        elevation: 5, // Android shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 1,
    },
    menuItem: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 16,
    },

});

export default TopBar;