import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useToast, Toast, ToastDescription, ToastTitle } from '@/components/ui/toast';

import Icon from 'react-native-vector-icons/FontAwesome';

const toast = useToast();
function showToast() {

    const popup = () => {
        toast.show({
            placement: "top",
            duration: 3000,
            render: ({ id }) => {
                const uniqueToastId = "toast-" + id
                return (
                    <Toast nativeID={uniqueToastId} action="success" variant="outline" style={styles.notificationPopup}>
                        <View style={styles.notification}>
                            <Icon name="bell" size={24} color="white" />
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <ToastTitle style={styles.notificationText}>Hello!</ToastTitle>
                            <ToastDescription style={{ fontSize: 10, textAlign: 'right' }}>
                                This is a customized toast message.
                            </ToastDescription>
                        </View>
                    </Toast>
                )
            },
        })
    }
    popup()

}


const styles = StyleSheet.create({
    notification: {
        backgroundColor: '#F9A825',
        borderRadius: 12,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    notificationPopup: {
        width: '130%',
        padding: 8,
        backgroundColor: '#FFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        top: 50,
        alignSelf: 'center',
        zIndex: 10,
        flexDirection: 'row',
    },
    notificationText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
});

export default showToast;