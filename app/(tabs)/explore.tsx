import React, { useEffect, useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, StatusBar } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const explore = () => {
    const [journals, setJournals] = useState<{ title: string; text: string; date: string }[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    useFocusEffect(
        React.useCallback(() => {
            const loadJournals = async () => {
                try {
                    const savedJournals = await AsyncStorage.getItem('journals');
                    if (savedJournals) {
                        setJournals(JSON.parse(savedJournals));
                    }
                } catch (error) {
                    console.error('Error loading journals:', error);
                }
            };

            loadJournals();
        }, [])
    );

    const handleSelectDay = (day: number) => {
        setSelectedDay(day);
    };

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate(); // 0th day of next month = last day of this month
    };

    const goToPreviousMonth = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };

    const goToNextMonth = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };

    const days = useMemo(() => {
        const today = new Date();
        const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
        const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

        const days = [];
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(<View key={`empty-${i}`} style={styles.dayContainer} />);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday =
                day === today.getDate() &&
                currentDate.getMonth() === today.getMonth() &&
                currentDate.getFullYear() === today.getFullYear();
            const isSelected = day === selectedDay;
            days.push(
                <View
                    key={`day-${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`}
                    style={styles.dayContainer}
                >
                    <TouchableOpacity onPress={() => handleSelectDay(day)}>
                        <Text
                            style={[
                                styles.day,
                                isToday && styles.todayDay,
                                isSelected && styles.selectedDay,
                            ]}
                        >
                            {day}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return days;
    }, [currentDate, selectedDay]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Your header remains same */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    VIEW YOUR JOURNALS
                </Text>
                <Image
                    source={{
                        uri: "https://storage.googleapis.com/a1aa/image/3cd0f475-e1c5-4f0c-50ec-62349e437b0c.jpg",
                    }}
                    style={styles.image}
                />
            </View>
            <FlatList
                data={journals.reverse()}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <>
                        <View style={styles.dateContainer}>
                            <View style={styles.monthContainer}>
                                <Text style={styles.monthText}>
                                    <Text style={styles.bold}>{months[currentDate.getMonth()]}</Text>,{" "}
                                    {currentDate.getFullYear()}
                                </Text>
                                <View style={{ flexDirection: "row", width: '40%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <TouchableOpacity onPress={goToPreviousMonth} style={{ backgroundColor: '#fbbf59', padding: 10, marginRight: 2, borderRadius: "20%" }}>
                                        <FontAwesomeIcon icon={faChevronLeft} size={20} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={goToNextMonth} style={{ backgroundColor: '#fbbf59', padding: 10, borderRadius: "20%" }}>
                                        <FontAwesomeIcon icon={faChevronRight} size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.calendar}>
                            <View style={styles.weekdays}>
                                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                                    <Text key={`${day}-${index}`} style={styles.weekday}>
                                        {day}
                                    </Text>
                                ))}
                            </View>
                            <View style={styles.daysContainer}>{days}</View>
                        </View>

                        <Text style={{ margin: 20, fontSize: 28, fontWeight: "900" }}>Recent Journal Entries</Text>
                    </>
                }
                renderItem={({ item }) => (
                    <View style={styles.journalEntry}>
                        <Text style={styles.journalTitle}>{item.title}</Text>
                        <Text style={styles.journalText}>{item.text}</Text>
                        <Text style={styles.journalDate}>{new Date(item.date).toLocaleString()}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF9E6",
        padding: 16,
        paddingTop: 100,
    },
    header: {
        borderRadius: 24,
        paddingBottom: 24,
        paddingHorizontal: 14,
        position: "relative",
    },
    title: {
        color: "#000",
        fontSize: 24,
        fontWeight: "900",
        textAlign: "left",
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 16,
        marginTop: 24,
        alignSelf: "center",
    },
    dateContainer: {
        paddingTop: 24,
        paddingHorizontal: 24,
    },
    optionText: {
        color: "#4b5563",
        fontSize: 14,
        marginBottom: 8,
    },
    monthContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        width: '100%',
        justifyContent: 'space-between',
    },
    monthText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#4b5563",
        width: '40%',
        textAlign: "left",
    },
    bold: {
        fontWeight: "bold",
    },
    calendar: {
        backgroundColor: "#fff",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Add this for Android
        padding: 16,
    },
    weekdays: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 8,
    },
    weekday: {
        color: "#9ca3af",
        fontSize: 12,
        fontWeight: "600",
        textAlign: "left",

    },
    daysContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    dayContainer: {
        width: "14%",
        alignItems: "center",
        marginBottom: 8,
    },
    day: {
        width: 28,
        height: 28,
        lineHeight: 28,
        borderRadius: 14,
        textAlign: "center",
        color: "#4b5563",
        fontSize: 14,
    },
    todayDay: {
        backgroundColor: "#3b82f6", // blue background
        color: "#fff",              // white text
        fontWeight: "700",
    },
    selectedDay: {
        backgroundColor: "#f87171",
        color: "#fff",
        fontWeight: "600",
    },
    journalContainer: {
        flex: 1,
        backgroundColor: '#FFF9E6',
        padding: 16,
    },
    journalEntry: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    journalTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    journalText: {
        marginTop: 8,
        fontSize: 14,
    },
    journalDate: {
        marginTop: 8,
        fontSize: 10,
        color: 'gray',
    },
});

export default explore;
