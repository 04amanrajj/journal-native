import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons'; // using Expo's vector icons

export default function NewJournalScreen() {


  
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>New journal</Text>
          <Text style={styles.headerSubtitle}>{currentDate}</Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Mood and Tag Section */}
      <View style={styles.moodTagSection}>
        <View style={styles.moodBox}>
          <View style={styles.moodIcon}>
            <FontAwesome name="smile-o" size={24} color="white" />
          </View>
          <View>
            <Text style={styles.moodText}>How is your mood today?</Text>
            <Text style={styles.moodSubText}>Neutral</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.tagButton}>
          <Feather name="tag" size={12} color="black" />
          <Text style={styles.tagButtonText}>Add tags</Text>
        </TouchableOpacity>
      </View>

      {/* Title and Text Area */}
      <View style={styles.inputSection}>
        <TextInput placeholder='Title' style={styles.title} />
        <View style={{ height: 1, backgroundColor: 'lightgray', marginBottom: 20 }} />
        <TextInput
          placeholder="What do you want to write about?"
          placeholderTextColor="gray"
          multiline
          style={styles.textArea}
        />

        {/* Bottom Icons */}
        <View style={styles.bottomIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="image" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="camera" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="microphone" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9E6",
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 40,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
    lineHeight: 22,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
    lineHeight: 16,
  },
  doneButton: {
    color: '#fff', // Yellow color
    fontWeight: '600',
    fontSize: 14,
    backgroundClip: 'text',
    textAlign: 'center',
    padding: 8,
    borderRadius: 22,
    backgroundColor: '#F9A825', // Yellow color
    paddingHorizontal: 16,
  },
  moodTagSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  moodBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    },
  moodIcon: {
    width: 28,
    height: 28,
    backgroundColor: '#4caf50', // Green
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  moodText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    lineHeight: 20,
  },
  moodSubText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
    lineHeight: 16,
  },
  tagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tagButtonText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.8)',
  },
  inputSection: {
    backgroundColor: '#ffffff',
    flex: 1,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#facc15',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
    marginBottom: 8,
  },
  textArea: {
    flex: 1,
    fontSize: 14,
    color: 'black',
    textAlignVertical: 'top',
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    marginTop: 24,
    width: '100%',
    marginBottom: 70,
    alignSelf: 'center',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
