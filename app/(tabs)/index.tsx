import React from "react";
import TopBar from "@/components/TopBar";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView, StatusBar
} from "react-native";


export default function Home() {
  const today = new Date();
  const currentDay = today.getDay(); 

  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - ((currentDay + 6) % 7));

  const weekDates = Array.from({ length: 7 }, (_, idx) => {
    const date = new Date(firstDayOfWeek);
    date.setDate(firstDayOfWeek.getDate() + idx);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      isToday: date.toDateString() === today.toDateString(),
    };
  },
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <TopBar />
        {/* Greeting */}

        <Text style={styles.greeting}>
          Good afternoon,
          {"\n"}
          <Text style={styles.greetingBold}>Zhofran!</Text>
        </Text>

        {/* Navigation Buttons */}

        <View style={styles.navButtons}>
          {weekDates.map((item, idx) => (
            <View key={idx} style={styles.navButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  {
                    backgroundColor: item.isToday ? "#F9A825" : "#FFFFFF",
                    borderWidth: 1,
                    borderColor: "#E0E0E0",
                  },
                ]}
                onPress={() => { }}
              >
                <Text
                  style={{
                    color: item.isToday ? "white" : "black",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>

              <Text style={styles.navButtonText}>{item.day}</Text>
            </View>
          ))}
        </View>


        {/* Stats and Quotes */}

        <View style={styles.statsContainer}>
          <View style={styles.stats}>
            {[
              { label: "Best streak", value: "21" },

              { label: "Entries", value: "536" },

              { label: "Days", value: "1.500" },
            ].map((item, idx) => (
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
          <Text style={styles.memoriesTitle}>Today</Text>

          <Text style={styles.memoriesCount}>2 Memories</Text>
        </View>

        <View style={styles.memoryItem}>
          <View style={styles.memoryDate}>
            <Text style={styles.memoryDay}>23</Text>

            <Text style={styles.memoryMonth}>Jan</Text>
          </View>

          <View style={styles.memoryDetails}>
            <Text style={styles.memoryLocation}>Prague, Czech Republic</Text>

            <Text style={styles.memoryDescription}>
              Arriving in Prague felt like stepping into a fairytale. The Old
              Town Squar...
            </Text>
          </View>

          <TouchableOpacity onPress={() => { }}>
            <Text style={styles.memoryButtonText}>...</Text>
          </TouchableOpacity>
        </View><View style={styles.memoryItem}>
          <View style={styles.memoryDate}>
            <Text style={styles.memoryDay}>23</Text>

            <Text style={styles.memoryMonth}>Jan</Text>
          </View>

          <View style={styles.memoryDetails}>
            <Text style={styles.memoryLocation}>Prague, Czech Republic</Text>

            <Text style={styles.memoryDescription}>
              Arriving in Prague felt like stepping into a fairytale. The Old
              Town Squar...
            </Text>
          </View>

          <TouchableOpacity onPress={() => { }}>
            <Text style={styles.memoryButtonText}>...</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.createButton} onPress={() => { }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9E6",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 50,
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
    marginBottom: 32,
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
    fontSize: 24,
    fontWeight: "800",
    color: "black",
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
  memoriesTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3B3B3B",
  },
  memoriesCount: {
    fontSize: 12,
    fontWeight: "300",
    color: "#3B3B3B",
  },
  memoryItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  memoryDate: {
    backgroundColor: "#F9A825",
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
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
});
