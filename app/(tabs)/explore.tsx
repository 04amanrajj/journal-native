import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
export default function Home() {



  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <FontAwesome name="sun-o" size={24} color="#F9A825" />

            <Text style={styles.dateText}>{currentDate}</Text>
          </View>

          <Image
            source={{
              uri: "https://storage.googleapis.com/a1aa/image/399c1188-8f92-43f0-9923-879989cbe663.jpg",
            }}
            style={styles.profileImage}
          />
        </View>

        {/* Greeting */}

        <Text style={styles.greeting}>
          Good afternoon,
          {"\n"}
          <Text style={styles.greetingBold}>Zhofran!</Text>
        </Text>

        {/* Navigation Buttons */}

        <View style={styles.navButtons}>
          {["check", "check", "times", "map-marker", "", "", ""].map(
            (icon, idx) => (
              <View key={idx} style={styles.navButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    {
                      backgroundColor:
                        idx <= 1
                          ? "#F9A825"
                          : idx === 2
                            ? "#B3B3B3"
                            : "transparent",
                    },
                  ]}
                  onPress={() => { }}
                >
                  {icon ? (
                    <FontAwesome
                      name="check"
                      size={idx === 3 ? 20 : 16}
                      color="white"
                    />
                  ) : (
                    <Text style={styles.navButtonText}>
                      {["Thu", "Fri", "Sat"][idx - 4]}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )
          )}
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
        </View>
      </ScrollView>

      {/* Bottom Navigation */}

      
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
  },
  navButtonContainer: {
    flex: 1,
    alignItems: "center",
  },
  navButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  navButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3B3B3B",
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
  bottomNav: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: "90%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
  },
  bottomNavItem: {
    alignItems: "center",
  },
  bottomNavLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3B3B3B",
  },
});
