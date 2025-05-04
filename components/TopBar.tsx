import React, { useState } from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { Image } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Button } from "react-native";
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetItem,
    ActionsheetItemText,
    ActionsheetIcon,
} from '@/components/ui/actionsheet';
import { Link } from 'expo-router';

const TopBar = () => {
    const [showActionsheet, setShowActionsheet] = React.useState(false)
    const handleClose = () => setShowActionsheet(false)
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

            <TouchableOpacity onPress={() => setShowActionsheet(true)}>
                <Image
                    source={{
                        uri: "https://storage.googleapis.com/a1aa/image/399c1188-8f92-43f0-9923-879989cbe663.jpg",
                    }}
                    style={styles.profileImage}
                />
            </TouchableOpacity>

            <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
                <ActionsheetBackdrop />
                <ActionsheetContent>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>
                    <ActionsheetItem onPress={handleClose}>
                        <Link href={'/(tabs)/profile'}>Visit profile</Link>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={handleClose}>
                        <Link href={'/(tabs)/auth'} style={{ width: '200%' }}>
                            <Text>signup</Text>
                        </Link>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={handleClose}>
                        <Link href={'/(tabs)/aboutme'}>about me</Link>
                    </ActionsheetItem>
                    <ActionsheetItem isDisabled onPress={handleClose}>
                        <ActionsheetItemText>Delete</ActionsheetItemText>
                    </ActionsheetItem>
                </ActionsheetContent>
            </Actionsheet>


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