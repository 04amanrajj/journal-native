import React, { useState } from "react";
import TopBar from "@/components/TopBar";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import {  GestureHandlerRootView } from "react-native-gesture-handler";
import JournalFetcher from "@/components/JournalFetcher";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library

export default function Home() {


  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning,";
    } else if (currentHour < 18) {
      return "Good afternoon,";
    } else {
      return "Good evening,";
    }
  };

  const calculateStats = (journals: any[]) => {
    const totalEntries = journals.length;
    const uniqueDays = new Set(journals.map((journal) => new Date(journal.date).toDateString())).size;
    const bestStreak = calculateBestStreak(journals); // Replace with your streak calculation logic

    return [
      { label: "Best streak", value: bestStreak },
      { label: "Entries", value: totalEntries },
      { label: "Days", value: uniqueDays },
    ];
  };

  const calculateBestStreak = (journals: any[]) => {
    // Example logic to calculate the best streak
    const sortedDates = [...new Set(journals.map((journal) => new Date(journal.date).toDateString()))]
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    let streak = 1;
    let maxStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1]);
      const currentDate = new Date(sortedDates[i]);

      // Check if the current date is the next day of the previous date
      if (currentDate.getTime() - prevDate.getTime() === 86400000) {
        streak++;
        maxStreak = Math.max(maxStreak, streak);
      } else {
        streak = 1;
      }
    }

    return maxStreak;
  };

  const [journals, setJournals] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedMemories, setSelectedMemories] = useState<any[]>([]);


  const today = new Date();
  const currentDay = today.getDay();
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - ((currentDay + 6) % 7));

  const weekDates = Array.from({ length: 7 }, (_, idx) => {
    const date = new Date(firstDayOfWeek);
    date.setDate(firstDayOfWeek.getDate() + idx);

    const hasJournal = journals.some((journal) => {
      if (!journal.date) return false;
      const journalDate = new Date(journal.date);
      return journalDate.toLocaleDateString("en-US") === date.toLocaleDateString("en-US");
    });

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date, // Pass the full Date object
      isToday: date.toLocaleDateString("en-US") === today.toLocaleDateString("en-US"),
      hasJournal, // Add flag for journal existence
    };
  });

  const handleDateSelect = (date: Date) => {
    // Normalize the date to the system's local time zone and format it as YYYY-MM-DD
    const selectedDateStr = date.toLocaleDateString("en-US"); // "en-US" outputs YYYY-MM-DD format

    // Filter journals for the selected date
    const filtered = journals.filter((journal) => {
      if (!journal.date) return false; // Skip invalid entries
      const journalDateStr = new Date(journal.date).toLocaleDateString("en-US"); // Normalize to YYYY-MM-DD format
      return journalDateStr === selectedDateStr;
    });

    // Log useful debugging information
    console.log("Selected date:", selectedDateStr);
    console.log("Filtered journals for selected date:", filtered);

    // Update state with the selected date and filtered journals
    setSelectedDate(selectedDateStr);
    setSelectedMemories(filtered);
  };





  const stats = calculateStats(journals);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {/* Header */}
        <View style={{
          paddingHorizontal: 20,
          paddingTop: 50,
        }}>
          <TopBar />
          {/* Greeting */}
          <Text style={styles.greeting}>
            {getGreeting()}
            {"\n"}
            <Text style={styles.greetingBold}>Aman!</Text>
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.content}>

          {/* Navigation Buttons */}

          <View style={styles.navButtons}>
            {weekDates.map((item, idx) => (
              <View key={idx} style={styles.navButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    {
                      backgroundColor: item.isToday
                        ? "#F9A825"
                        : item.hasJournal
                          ? "#A5D6A7" // Green background if journal exists
                          : "#FFFFFF",
                      borderWidth: 1,
                      borderColor: "#E0E0E0",
                    },
                  ]}
                  onPress={() =>
                    handleDateSelect(
                      new Date(
                        item.date
                      )
                    )
                  }
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {item.hasJournal ? (
                      <Icon name="check" size={16} color={item.isToday ? "white" : "green"} />
                    ) : <Text
                      style={{
                        color: item.isToday ? "white" : "black",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {item.date.getDate()}
                    </Text>
                    }
                  </View>
                </TouchableOpacity>

                <Text style={styles.navButtonText}>{item.day}</Text>
              </View>
            ))}
          </View>
          {/* Stats and Quotes */}

          <View style={styles.statsContainer}>
            <View style={styles.stats}>
              {stats.map((item, idx) => (
                <View key={idx} style={styles.statItem}>
                  <Text style={styles.statLabel}>{item.label}</Text>
                  <Text style={styles.statValue}>{item.value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.quoteContainer}>
              <Text style={styles.quoteTitle}>Quotes of the day</Text>

              <Text style={styles.quoteText}>
                “Happiness is not by chance, but by choice.”
              </Text>

              <Text style={styles.quoteAuthor}>— Jim Rohn</Text>
            </View>

            <TouchableOpacity style={styles.feelingButton} onPress={() => { }}>
              <Text style={styles.feelingButtonText}>
                How are you feeling today?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Memories Section */}

          <View style={styles.memoriesHeader}>
            <Text style={{ color: "#888", fontStyle: "italic", margin: "auto", textAlign: "center", width: '100%' }}>
              {selectedDate ? (
                selectedMemories.length === 0 ? (
                  <Text style={{ color: "#888", fontStyle: "italic", margin: "auto", width: '100%' }}>
                    No memories recorded on this day.
                  </Text>
                ) : (
                  <Text>
                    Recent Memories
                  </Text>
                )
              ) : null}
            </Text>
          </View>

          <View style={styles.memoryDetails}>
            <JournalFetcher
              onData={(data) => {
                if (Array.isArray(data)) {
                  const validJournals = data.filter((journal) => {
                    return journal.date && !isNaN(new Date(journal.date).getTime());
                  });
                  setJournals(validJournals);
                } else {
                  console.error("Invalid data received from JournalFetcher:", data);
                }
              }}
            />
            <View>
              {selectedMemories.slice(-3).map((journal, index) => {
                return (
                  <View key={index} style={styles.memoryItem}>
                    <View style={styles.journalEntry}>
                      <Text style={styles.journalTitle}>{journal.title}</Text>
                      <Text style={styles.journalText}>{journal.text}</Text>
                      <Text style={styles.journalDate}>
                        {new Date(journal.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9E6",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    color: "#3B3B3B",
    marginBottom: 24,
  },
  greetingBold: {
    fontWeight: "bold",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    marginTop: 16,
  },
  navButtonContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  navButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  navButtonText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  statsContainer: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    marginBottom: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,

  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#F9A825",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "black",
    paddingHorizontal: 40,
  },
  quoteContainer: {
    borderColor: "#E6E6E6",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    color: "#3B3B3B",
  },
  quoteTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },
  quoteText: {
    fontStyle: "italic",
    fontSize: 12,
    marginBottom: 4,
  },
  quoteAuthor: {
    fontSize: 12,
    fontWeight: "300",
  },
  feelingButton: {
    backgroundColor: "#F9A825",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  feelingButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  memoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  memoriesCount: {
    fontSize: 12,
    fontWeight: "900",
    color: "#3B3B3B",
    textAlign: "center",
    borderRadius: 12,
    overflow: "hidden",
    width: '30%',
    margin: 'auto',
  },
  memoryItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  memoryDay: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  memoryMonth: {
    color: "white",
    fontSize: 10,
    fontWeight: "300",
  },
  memoryDetails: {
    flex: 1,
  },
  memoryLocation: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3B3B3B",
  },
  memoryDescription: {
    fontSize: 12,
    fontWeight: "300",
    color: "#6B7280",
    maxWidth: 280,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  memoryButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3B3B3B",
  },
  createButton: {
    backgroundColor: "#F9A825",
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 90,
    width: 100,
    height: 50,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
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
