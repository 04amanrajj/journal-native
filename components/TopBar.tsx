import React, { useState } from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { Image } from 'react-native';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
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
import * as DocumentPicker from 'expo-document-picker';
import { useToast, Toast, ToastDescription, ToastTitle } from '@/components/ui/toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TopBar = () => {
    const toast = useToast();
    const showToast = ({ title = "Hello!", description = "This is a customized toast message.", icon = "bell" }) => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        toast.show({
            placement: "top",
            duration: 3000,
            render: ({ id }) => {
                const uniqueToastId = "toast-" + id;
                return (
                    <Toast nativeID={uniqueToastId} action="info" variant="outline" style={styles.notificationPopup}>
                        <View style={styles.notification}>
                            <Icon name={icon} size={24} color="white" />
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <ToastTitle style={styles.notificationText}>{title}</ToastTitle>
                            <ToastDescription style={styles.notificationDescription}>
                                {description}
                            </ToastDescription>
                        </View>
                    </Toast>
                );
            },
        });
    };

    const [showActionsheet, setShowActionsheet] = useState(false);
    const [isImporting, setIsImporting] = useState(false);

    const handleClose = () => setShowActionsheet(false);

    const handleImport = async () => {
        try {
            setIsImporting(true);
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/zip'],
                copyToCacheDirectory: true
            });

            if (result.canceled === false && result.assets && result.assets[0]) {
                const file = result.assets[0];
                console.log('File details before upload:', {
                    size: file.size,
                    name: file.name,
                    type: file.mimeType,
                    uri: file.uri
                });
                // Create form data for file upload
                const formData = new FormData();
                formData.append('file', {
                    uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri,
                    name: file.name,
                    type: file.mimeType
                } as any);
                const token = await AsyncStorage.getItem('authToken');
                // Upload file to backend
                const response = await axios.post('https://journal-app-backend-kxqs.onrender.com/journal/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },

                });

                if (response.status !== 200) {
                    throw new Error('Failed to import journals');
                }

                const data = response.data;
                // Handle successful import
                console.log('Journals imported:', data);
                showToast({
                    title: "Journals Imported",
                    description: "Your journals have been successfully imported.",
                    icon: "check-circle"
                });
            }
        } catch (error) {
            console.error('Error importing journals:', error);
            showToast({
                title: "Error Importing Journals",
                description: "Please try again.",
                icon: "exclamation-triangle"
            });
        } finally {
            setIsImporting(false);
            handleClose();
        }
    };

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

            {showActionsheet && (
                <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
                    <ActionsheetBackdrop />
                    <ActionsheetContent>
                        <ActionsheetDragIndicatorWrapper>
                            <ActionsheetDragIndicator />
                        </ActionsheetDragIndicatorWrapper>
                        <ActionsheetItem onPress={handleClose}>
                            <Link href={'/(tabs)/profile'}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FontAwesome name="user" size={20} color="#666" style={{ marginRight: 10 }} />
                                    <Text>View Profile</Text>
                                </View>
                            </Link>
                        </ActionsheetItem>
                        <ActionsheetItem onPress={handleClose}>
                            <Link href={'/(tabs)/create'}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FontAwesome name="pencil" size={20} color="#666" style={{ marginRight: 10 }} />
                                    <Text>New Journal Entry</Text>
                                </View>
                            </Link>
                        </ActionsheetItem>
                        <ActionsheetItem onPress={handleClose}>
                            <Link href={'/(tabs)/aboutme'}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FontAwesome name="info-circle" size={20} color="#666" style={{ marginRight: 10 }} />
                                    <Text>About Me</Text>
                                </View>
                            </Link>
                        </ActionsheetItem>
                        <ActionsheetItem onPress={handleClose}>
                            <Link href={'/(tabs)'}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FontAwesome name="home" size={20} color="#666" style={{ marginRight: 10 }} />
                                    <Text>Homee</Text>
                                </View>
                            </Link>
                        </ActionsheetItem>
                        <ActionsheetItem onPress={handleImport} disabled={isImporting}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome
                                    name="archive"
                                    size={20}
                                    color={isImporting ? '#999' : '#d9534f'}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={{ color: isImporting ? '#999' : '#d9534f' }}>
                                    {isImporting ? 'Importing...' : 'Import from Day One journal'}
                                </Text>
                            </View>
                        </ActionsheetItem>
                    </ActionsheetContent>
                </Actionsheet>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    notification: {
        backgroundColor: '#F9A825',
        borderRadius: 12,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 0,
    },
    notificationPopup: {
        minWidth: '90%',
        width: '100%',
        padding: 12,
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
        alignItems: 'center',
    },
    notificationText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'left',
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    notificationDescription: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'left',
        flexShrink: 1,
        flexWrap: 'wrap',
    },
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