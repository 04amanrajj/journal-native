import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { PanGestureHandler, State, GestureHandlerRootView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library
const Notification: React.FC = () => {

    const [showNotification, setShowNotification] = useState(true);
    const translateX = new Animated.Value(0);
    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: true }
    );
    const onHandlerStateChange = (event: any) => {
        if (event.nativeEvent.state === State.END) {
            if (Math.abs(event.nativeEvent.translationX) > 100) {
                // Dismiss the notification if swiped far enough
                setShowNotification(false);
            } else {
                // Reset position if not swiped far enough
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            }
        }
    };
    return (
        showNotification && (
            <PanGestureHandler
                onGestureEvent={onGestureEvent}
                onHandlerStateChange={onHandlerStateChange}
            >
                <Animated.View
                    style={[
                        styles.notificationPopup,
                        { transform: [{ translateX }] },
                    ]}
                >
                    <View style={styles.notification}>
                        <Icon name="bell" size={24} color="white" />
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={styles.notificationText}>You have a new notification!</Text>
                        <Text style={{ fontSize: 10, textAlign: "right" }}>Swipe left to dismiss</Text>
                    </View>
                </Animated.View>
            </PanGestureHandler>
        )
    );
};

const styles = StyleSheet.create({
    notification: {
        backgroundColor: "#F9A825",
        borderRadius: 12,
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    notificationPopup: {
        width: "100%",
        padding: 8,
        backgroundColor: "#FFF",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        position: "absolute",
        top: 100,
        alignSelf: "center",
        zIndex: 10,
        flexDirection: "row",
    },
    notificationText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
});

export default Notification;