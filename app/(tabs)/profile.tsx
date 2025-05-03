import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Notification from '@/components/Notification'; // Import the Notification component
import { GestureHandlerRootView } from 'react-native-gesture-handler';





const profileScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [showNotification, setShowNotification] = useState(false); // State to control notification visibility

  const toggleSwitch = () => setIsDarkMode((previousState) => !previousState);

  const handleLogout = () => {
    setShowNotification(false); // Hide the notification first

    // ConfirmationModal.show({
    //   title: 'Log Out',
    //   message: 'Are you sure you want to log out?',
    //   onConfirm: () => {
    //     // Handle logout logic here
    //     console.log('Logged out');
    //     setShowNotification(false); // Hide the notification after logout
    //   },
    // });


    setTimeout(() => {
      setShowNotification(true); // Show the notification after a small delay
    }, 100); // Add a 100ms delay
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          {/* Header Section */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              <Icon name="chevron-left" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Settings</Text>
          </View>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image
              source={{ uri: 'https://storage.googleapis.com/a1aa/image/1a98223e-ed3c-4575-bca2-5503e93b72e0.jpg' }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>Leslie Alexander</Text>
            <Text style={styles.profileRole}>Web Designer</Text>
            <Text style={styles.profileLocation}>London</Text>
            <TouchableOpacity style={styles.changePhotoButton}>
              <Text style={styles.changePhotoText}>Change profile photo</Text>
            </TouchableOpacity>
          </View>
          {/* Settings List */}
          <View style={styles.settingsList}>
            {/* Dark Mode */}
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="moon-o" size={16} color="#000000" />
                <Text style={styles.settingText}>Dark mode</Text>
              </View>
              <Switch
                trackColor={{ false: '#FFECB3', true: '#000000' }}
                thumbColor="#FFFFFF"
                onValueChange={toggleSwitch}
                value={isDarkMode}
              />
            </View>
            {/* Name */}
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="user" size={16} color="#FFC107" />
                <Text style={styles.settingText}>Name</Text>
              </View>
              <Icon name="chevron-right" size={16} color="#000000" />
            </TouchableOpacity>
            {/* Phone */}
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="phone" size={16} color="#FFC107" />
                <Text style={styles.settingSubText}>(480) 555-0103</Text>
              </View>
              <Icon name="chevron-right" size={16} color="#000000" />
            </TouchableOpacity>
            {/* Email */}
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="envelope" size={16} color="#FFC107" />
                <Text style={styles.settingSubText}>leslie@sample.com</Text>
              </View>
              <Icon name="chevron-right" size={16} color="#000000" />
            </TouchableOpacity>
            {/* Change Password */}
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="shield" size={16} color="#FFC107" />
                <Text style={styles.settingText}>Change password</Text>
              </View>
              <Icon name="chevron-right" size={16} color="#000000" />
            </TouchableOpacity>
            {/* Privacy & Data */}
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="lock" size={16} color="#000000" />
                <Text style={styles.settingText}>Privacy & Data</Text>
              </View>
              <Icon name="chevron-right" size={16} color="#000000" />
            </TouchableOpacity>
            {/* About */}
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="info-circle" size={16} color="#000000" />
                <Text style={styles.settingText}>About</Text>
              </View>
              <Icon name="chevron-right" size={16} color="#000000" />
            </TouchableOpacity>
            {/* Log Out and Delete Account Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
              {/* Delete Account Button */}
              <TouchableOpacity style={styles.deleteAccountButton}>
                <Text style={styles.deleteAccountText}>Delete Account</Text>
              </TouchableOpacity>

              {/* Log Out Button */}
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Notification Component */}
      {showNotification && <Notification />}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC107', // Yellow background
    height: '100%',
    marginTop: 40,
  },
  scrollContent: {
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderEndEndRadius: 24,
    borderStartEndRadius: 24,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#000000', // Black header
    padding: 24,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 24,
    top: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#000000', // Black profile section
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  profileRole: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
  },
  profileLocation: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 16,
  },
  changePhotoButton: {
    backgroundColor: '#FFC107', // Yellow button
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  changePhotoText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
  },
  settingsList: {
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FFECB3', // Light yellow border
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
  },
  settingSubText: {
    color: '#000000',
    fontSize: 12,
    opacity: 0.7,
  },
  settingStatus: {
    color: '#000000',
    fontSize: 12,
    opacity: 0.7,
  },
  logoutButton: {
    backgroundColor: '#000000', // Black background
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8, // Add spacing between buttons
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteAccountButton: {
    backgroundColor: '#FFFFFF', // White background
    borderWidth: 1,
    borderColor: '#FF0000', // Red outline
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    flex: 1,
    marginRight: 8, // Add spacing between buttons
  },
  deleteAccountText: {
    color: '#FF0000', // Red text
    fontSize: 12,
    fontWeight: '600',
  },
});

export default profileScreen;