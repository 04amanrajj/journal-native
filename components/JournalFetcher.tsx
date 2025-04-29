import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Journal {
    title: string;
    text: string;
    date: string; // stored as ISO string
}

interface Props {
    date?: Date;
    onData: (journals: Journal[]) => void;
}

const JournalFetcher: React.FC<Props> = ({ date, onData }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const stored = await AsyncStorage.getItem('journals');
                let parsed: Journal[] = stored ? JSON.parse(stored) : [];

                if (date) {
                    const target = date.toDateString();
                    parsed = parsed.filter(journal =>
                        new Date(journal.date).toDateString() === target
                    );
                }

                onData(parsed);
            } catch (err) {
                console.error("Failed to load journals", err);
                onData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchJournals();
    }, [date]);

    return null; // This component only fetches and returns data, no UI
};

export default JournalFetcher;
