import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
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

const STORAGE_KEY = '@journals_cache';

const JournalFetcher = () => {
    const [journals, setJournals] = useState<Journal[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Load cached journals from AsyncStorage
    const loadCachedJournals = async () => {
        try {
            const cachedJournals = await AsyncStorage.getItem(STORAGE_KEY);
            if (cachedJournals) {
                setJournals(JSON.parse(cachedJournals));
                setLoading(false);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error loading cached journals:", error);
            return false;
        }
    };

    // Save journals to AsyncStorage
    const saveJournalsToStorage = async (journals: Journal[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(journals));
        } catch (error) {
            console.error("Error saving journals to storage:", error);
        }
    };

    const fetchJournals = async (forceRefresh = false) => {
        // If not forcing refresh and we have cached data, skip API call
        if (!forceRefresh) {
            const hasCachedData = await loadCachedJournals();
            if (hasCachedData && !refreshing) {
                showToast({
                    title: "Journals Loaded",
                    description: "Your journal entries have been loaded from cache.",
                    icon: "database",
                });
                return;
            }
        }

        try {
            setLoading(true);
            const token = await AsyncStorage.getItem("authToken");
            const response = await axios.get("https://journal-app-backend-kxqs.onrender.com/journal", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const fetchedJournals = response.data;
            setJournals(fetchedJournals);
            await saveJournalsToStorage(fetchedJournals);

            showToast({
                title: "Journals Fetched",
                description: "Your journal entries have been fetched from the server.",
                icon: "cloud-download",
            });
        } catch (error) {
            console.error("Error fetching journals:", error);
            setJournals([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchJournals(true);
    };

    useEffect(() => {
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

    if (loading && journals.length === 0) {
        return <Text style={styles.loadingText}>Loading journals...</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ marginHorizontal: 20, fontSize: 18, fontWeight: "900", color: "gray", fontStyle: "italic", textAlign: "left" }}>
                    Recent Memories
                </Text>
                <TouchableOpacity
                    style={styles.refreshButton}
                    onPress={handleRefresh}
                    disabled={refreshing}
                >
                    <Icon name={refreshing ? "spinner" : "refresh"} size={20} color="#ffffff" />
                    <Text style={styles.refreshButtonText}>
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={[...journals].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                onRefresh={handleRefresh}
                refreshing={refreshing}
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
        </View>
    );
};

// Styles remain unchanged
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    refreshButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9A825',
        padding: 12,
        marginBottom: 16,
        borderRadius: 24,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        width: '30%',
        alignSelf: 'flex-end',
    },
    refreshButtonText: {
        marginLeft: 8,
        fontSize: 14,
        color: 'white',
        fontWeight: '600',
    },
    listContainer: {
        paddingBottom: 60,
    },
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