import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Feather } from '@expo/vector-icons'; // using Expo's vector icons
import Icon from 'react-native-vector-icons/FontAwesome';
import { useToast, Toast, ToastDescription, ToastTitle } from '@/components/ui/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axios from 'axios';
import * as Haptics from 'expo-haptics';

export default function NewJournalScreen() {
  const [showNotification, setShowNotification] = useState(false); // Control notification visibility
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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


  const handleSaveJournal = async () => {
    if (title.trim() === "" && text.trim() === "") {
      showToast({
        title: "Empty Entry",
        description: "Please write something before saving.",
        icon: "exclamation-triangle",
      });
      return;
    }

    const newEntry = {
      title: title.trim(),
      content: text.trim(),
      // date: new Date().toISOString(),
    };

    try {

      const response = await axios.post('https://journal-app-backend-kxqs.onrender.com/journal/create', newEntry, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('authToken')}`,
        },
      });

      console.log('Response from server:', response.data);
      console.log('Journal saved!');

      showToast({
        title: "Journal Saved",
        description: "Your journal entry has been saved successfully.",
        icon: "check",
      });

  
    } catch (error) {
      console.error('Error saving journal:', error);
      showToast({
        title: "Error Saving Journal",
        description: "There was an error saving your journal entry.",
        icon: "exclamation-triangle",
      });
    }
  };

  return (

    <GestureHandlerRootView>
      <View style={styles.container}>
        <StatusBar style="dark" />

        {/* Notification Popup */}


        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>New journal</Text>
            <Text style={styles.headerSubtitle}>{currentDate}</Text>
          </View>
          <TouchableOpacity onPress={handleSaveJournal}>
            <Text style={styles.doneButton}>Save</Text>
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
          <TextInput placeholder='Title' style={styles.title} value={title} onChangeText={setTitle} />
          <View style={{ height: 1, backgroundColor: 'lightgray', marginBottom: 20 }} />
          <TextInput
            placeholder="What do you want to write about?"
            placeholderTextColor="gray"
            multiline
            style={styles.textArea}
            value={text}
            onChangeText={setText}
          />

          {/* Bottom Icons */}
          <View style={styles.bottomIcons}>
            <TouchableOpacity style={styles.iconButton}
             onPress={() =>
              showToast({
                  title: "Feature Coming Soon",
                  description: "This feature is still in development.",
                  icon: "clock-o",
              })
          }>
              <FontAwesome name="image" size={20} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}
             onPress={() =>
              showToast({
                  title: "Feature Coming Soon",
                  description: "This feature is still in development.",
                  icon: "clock-o",
              })
          }>
              <FontAwesome name="camera" size={20} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                const randomParagraph = `This is a randomly generated paragraph for testing purposes. It contains multiple sentences to simulate real journal content. The number ${Math.floor(Math.random() * 1000)} is included to make it unique. Another random number: ${Math.floor(Math.random() * 1000)}. Enjoy testing!`;

                setTitle(`#Test ${Math.floor(Math.random() * 100)}`);
                setText(randomParagraph);
              }}
            >
              <FontAwesome name="random" size={20} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}
              onPress={() => {
                setTitle('');
                setText('');
                setShowNotification(false); // Hide the notification
              }}
            >
              <FontAwesome name="times" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </View >
    </GestureHandlerRootView>
  );
}

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
  showNotificationButton: {
    backgroundColor: "#F9A825",
    padding: 12,
    borderRadius: 8,
    bottom: 100,
    marginTop: 20,
    alignSelf: "center",
  },
  showNotificationButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
