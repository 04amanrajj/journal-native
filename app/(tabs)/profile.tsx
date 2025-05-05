import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useToast, Toast, ToastDescription, ToastTitle } from '@/components/ui/toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter, useFocusEffect } from 'expo-router';
import * as Haptics from 'expo-haptics';
import axios from 'axios';
import Auth from '@/components/Auth';
import Register from '@/components/Register';
import LoadingScreen from '@/components/LoadingScreen';

const ProfileScreen: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showRegister, setShowRegister] = useState(false);

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

  const validateToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        setIsAuthenticated(false);
        return false;
      }

      // Validate token by making a lightweight API call
      const response = await axios.get('https://journal-app-backend-kxqs.onrender.com/user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.status === 200;
    } catch (error: any) {
      console.error('Token validation error:', error);
      await AsyncStorage.removeItem('authToken');
      setIsAuthenticated(false);
      return false;
    }
  };

  const fetchUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const response = await axios.get('https://journal-app-backend-kxqs.onrender.com/user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      console.log(data);
      setUsername(data.user.name || 'Unknown User');
      setEmail(data.user.email || 'No email provided');
      setPhone(data.user.phone || 'No phone provided');
      setIsAuthenticated(true);

      showToast({
        title: "Profile Loaded",
        description: "Your details are ready to view!",
        icon: "check-circle",
      });
    } catch (error: any) {
      console.error('Error fetching user details:', error);
      if (error.response && (error.response.status === 401 || error.response.status === 404)) {
        await AsyncStorage.removeItem('authToken');
        setIsAuthenticated(false);
      } else {
        showToast({
          title: "Oops, Something Went Wrong",
          description: "Please try again later.",
          icon: "exclamation-circle",
        });
      }
    }
  };

  const handleLogout = async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      await axios.post(
        "https://journal-app-backend-kxqs.onrender.com/user/logout",
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear all AsyncStorage data
      await AsyncStorage.clear();

      setIsAuthenticated(false);
      showToast({
        title: "Signed Out",
        description: "You're now logged out. Come back soon!",
        icon: "sign-out",
      });
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if the API call fails, clear local storage
      await AsyncStorage.clear();
      setIsAuthenticated(false);
      showToast({
        title: "Oops, Something Went Wrong",
        description: "Please try again later.",
        icon: "exclamation-circle",
      });
    }
  };

  const handleDeleteAccount = async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      await axios.delete('https://journal-app-backend-kxqs.onrender.com/user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      await AsyncStorage.removeItem('authToken');
      setIsAuthenticated(false);
      showToast({
        title: "Account Removed",
        description: "Your account has been successfully deleted.",
        icon: "trash",
      });
    } catch (error) {
      console.error('Error deleting account:', error);
      showToast({
        title: "Oops, Something Went Wrong",
        description: "Please try again later.",
        icon: "exclamation-circle",
      });
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    fetchUserDetails();
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const checkAuth = async () => {
        const isValid = await validateToken();
        if (!isValid) {
          setIsAuthenticated(false);
        }
      };
      checkAuth();
    }, [])
  );

  if (isAuthenticated === null) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingScreen />
      </View>
    );
  }

  if (!isAuthenticated) {
    return showRegister ? (
      <Register
        onRegisterSuccess={handleAuthSuccess}
        onShowAuth={() => setShowRegister(false)}
      />
    ) : (
      <Auth
        onAuthSuccess={handleAuthSuccess}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
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
            <Text style={styles.profileName}>{username}</Text>
            <Text style={styles.profileRole}>Web Designer</Text>
            <Text style={styles.profileLocation}>London</Text>
            <TouchableOpacity style={styles.changePhotoButton}>
              <Text style={styles.changePhotoText}>Change profile photo</Text>
            </TouchableOpacity>
          </View>
          {/* Settings List */}
          <View style={styles.settingsList}>
            {/* Name */}
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="user" size={16} color="#FFC107" />
                <Text style={styles.settingText}>{username}</Text>
              </View>
              <Icon name="chevron-right" size={16} color="#000000" />
            </TouchableOpacity>
            {/* Phone */}
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="phone" size={16} color="#FFC107" />
                <Text style={styles.settingSubText}>{phone}</Text>
              </View>
              <Icon name="chevron-right" size={16} color="#000000" />
            </TouchableOpacity>
            {/* Email */}
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="envelope" size={16} color="#FFC107" />
                <Text style={styles.settingSubText}>{email}</Text>
              </View>
              <Icon name="chevron-right" size={16} color="#000000" />
            </TouchableOpacity>
            {/* Change Password */}
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() =>
                showToast({
                  title: "Feature Coming Soon",
                  description: "This feature is still in development.",
                  icon: "clock-o",
                })
              }
            >
              <View style={styles.settingLeft}>
                <Icon name="shield" size={16} color="#FFC107" />
                <Text style={styles.settingText}>Change password</Text>
              </View>
              <Icon name="chevron-right" size={16} color="#000000" />
            </TouchableOpacity>
            {/* Privacy & Data */}
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => {
                showToast({
                  title: "Your Data is Protected",
                  description: "Used advanced encryption to keep your data safe.",
                  icon: "lock",
                });
              }}
            >
              <View style={styles.settingLeft}>
                <Icon name="lock" size={16} color="#000000" />
                <Text style={styles.settingText}>Privacy & Data</Text>
              </View>
              <Icon name="chevron-right" size={16} color="#000000" />
            </TouchableOpacity>
            {/* About */}
            <TouchableOpacity>
              <Link href={'/(tabs)/aboutme'} style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Icon name="info-circle" size={16} color="#000000" />
                  <Text style={styles.settingText}>About</Text>
                </View>
              </Link>
            </TouchableOpacity>
            {/* Log Out and Delete Account Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
              {/* Delete Account Button */}
              <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
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
    backgroundColor: '#FFC107',
    height: '100%',
    marginTop: 40,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderEndEndRadius: 40,
    borderStartEndRadius: 40,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#000000',
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
    backgroundColor: '#000000',
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
    backgroundColor: '#FFC107',
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
    borderBottomColor: '#FFECB3',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    width: '100%',
  },
  settingSubText: {
    color: '#000000',
    fontSize: 16,
    opacity: 0.7,
  },
  logoutButton: {
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteAccountButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF0000',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  deleteAccountText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;