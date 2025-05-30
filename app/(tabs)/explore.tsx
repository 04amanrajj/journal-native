import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, RefreshControl } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useToast, Toast, ToastDescription, ToastTitle } from '@/components/ui/toast';
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import JournalFetcher from "@/components/JournalFetcher";
import * as Haptics from 'expo-haptics';
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";


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
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [refreshing, setRefreshing] = useState(false);

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

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        // Add a small delay to show the refresh animation
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRefreshing(false);
    }, []);

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

    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>VIEW YOUR JOURNALS</Text>
                    <Image
                        source={{
                            uri: "https://storage.googleapis.com/a1aa/image/3cd0f475-e1c5-4f0c-50ec-62349e437b0c.jpg",
                        }}
                        style={styles.image}
                    />
                </View>
                {/* Calendar */}


                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    style={{ flex: 1 }}
                    nestedScrollEnabled={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#F9A825"]}
                            tintColor="#F9A825"
                        />
                    }
                >
                    <View style={styles.dateContainer}>
                        <View style={styles.monthContainer}>
                            <Text style={styles.monthText}>
                                <Text style={styles.bold}>{months[currentDate.getMonth()]}</Text>,{" "}
                                {currentDate.getFullYear()}
                            </Text>
                            <View style={{ flexDirection: "row", width: "40%", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                <TouchableOpacity onPress={goToPreviousMonth} style={{ backgroundColor: "#fbbf59", padding: 10, marginRight: 2, borderRadius: "20%" }}>
                                    <FontAwesomeIcon icon={faChevronLeft} size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={goToNextMonth} style={{ backgroundColor: "#fbbf59", padding: 10, borderRadius: "20%" }}>
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

                    {/* JournalFetcher */}
                    <JournalFetcher />
                </ScrollView>
            </View>
        </GestureHandlerRootView>

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
        width: "100%",
        height: 150,
        borderRadius: 16,
        marginTop: 24,
        alignSelf: "center",
    },
    dateContainer: {
        paddingTop: 24,
        paddingHorizontal: 24,
    },
    monthContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        width: "100%",
        justifyContent: "space-between",
    },
    monthText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#4b5563",
        width: "40%",
        textAlign: "left",
    },
    bold: {
        fontWeight: "bold",
    },
    calendar: {
        backgroundColor: "#fff",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        padding: 24,
        marginHorizontal: 2,
        marginBottom: 22,
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
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
        backgroundColor: "#3b82f6",
        color: "#fff",
        fontWeight: "700",
    },
    selectedDay: {
        backgroundColor: "#f87171",
        color: "#fff",
        fontWeight: "600",
    },
});

export default explore;
