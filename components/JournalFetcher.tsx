import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useToast, Toast, ToastDescription, ToastTitle } from '@/components/ui/toast';
import * as Haptics from 'expo-haptics';

interface Journal {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

const JournalFetcher = () => {
    const [journals, setJournals] = useState<Journal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                const response = await axios.get("https://journal-app-backend-kxqs.onrender.com/journal", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                showToast({
                    title: "Journals Fetched",
                    description: "Your journal entries have been fetched successfully.",
                    icon: "check",
                });

                setJournals(response.data);
            } catch (error) {
                console.error("Error fetching journals:", error);
                setJournals([]);

            } finally {
                setLoading(false);
            }
        };

        fetchJournals();
    }, []);

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

    if (loading) {
        return <Text style={styles.loadingText}>Loading journals...</Text>;
    }

    return (
        <FlatList
            data={journals.reverse()}
            nestedScrollEnabled={true}
            contentContainerStyle={{ paddingBottom: 60 }}
            ListHeaderComponent={() => (
                <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
                    Your Journal Entries
                </Text>
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.journalEntry}>
                    <Text style={styles.journalTitle}>{item.title}</Text>
                    <Text style={styles.journalText}>{item.content}</Text>
                    <Text style={styles.journalDate}>
                        {new Date(item.created_at).toLocaleString()}
                    </Text>
                </View>
            )}
        />
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
    loadingText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: "gray",
    },
    journalEntry: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    journalTitle: {
        fontWeight: "bold",
        fontSize: 16,
    },
    journalText: {
        marginTop: 8,
        fontSize: 14,
    },
    journalDate: {
        marginTop: 8,
        fontSize: 10,
        color: "gray",
    },
});

export default JournalFetcher;
