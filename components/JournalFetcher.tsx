import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
                setJournals(response.data);
            } catch (error) {
                console.error("Error fetching journals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJournals();
    }, []);

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
