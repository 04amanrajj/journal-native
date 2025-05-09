import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useToast, Toast, ToastDescription, ToastTitle } from '@/components/ui/toast';
import * as Haptics from 'expo-haptics';

interface RegisterProps {
    onRegisterSuccess: () => void;
    onShowAuth: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onShowAuth }) => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [response, setResponse] = React.useState('');

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

    const validateForm = () => {
        if (!username || !email || !password || !confirmPassword) {
            showToast({
                title: "Missing Fields",
                description: "Please fill in all required fields",
                icon: "exclamation-circle"
            });
            return false;
        }

        if (!email.includes('@')) {
            showToast({
                title: "Invalid Email",
                description: "Please enter a valid email address",
                icon: "exclamation-circle"
            });
            return false;
        }
        
        if (password !== confirmPassword) {
            showToast({
                title: "Password Mismatch",
                description: "Passwords do not match",
                icon: "exclamation-circle"
            });
            return false;
        }

        if (password.length < 6) {
            showToast({
                title: "Weak Password",
                description: "Password must be at least 6 characters long",
                icon: "exclamation-circle"
            });
            return false;
        }

        return true;
    };

    async function handleRegister() {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const res = await axios.post('https://journal-app-backend-kxqs.onrender.com/user/register', {
                username,
                email,
                phone,
                password,
            });

            const { token } = res.data;
            await AsyncStorage.setItem('authToken', token);
            showToast({
                title: "Registration Successful",
                description: "Welcome to Journal App!",
                icon: "check-circle"
            });
            onRegisterSuccess();
        } catch (error: any) {
            console.error('Registration error:', error);
            showToast({
                title: "Registration Failed",
                description: error.response?.data?.error || 'Registration failed. Please try again.',
                icon: "exclamation-circle"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Register Section */}
            <View style={styles.registerContainer}>
                <Text style={styles.registerTitle}>Create Account</Text>
                <Text style={styles.registerDescription}>
                    Join us and start your journaling journey today!
                </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, styles.textInput]}
                        placeholder="Full Name"
                        placeholderTextColor="#9CA3AF"
                        autoCapitalize="none"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <View style={styles.inputIcon}>
                        <FontAwesome5 name="user" size={20} color="#9CA3AF" />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, styles.textInput]}
                        placeholder="Email"
                        placeholderTextColor="#9CA3AF"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <View style={styles.inputIcon}>
                        <FontAwesome5 name="envelope" size={20} color="#9CA3AF" />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, styles.textInput]}
                        placeholder="Phone (optional)"
                        placeholderTextColor="#9CA3AF"
                        autoCapitalize="none"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />
                    <View style={styles.inputIcon}>
                        <FontAwesome5 name="phone" size={20} color="#9CA3AF" />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, styles.textInput]}
                        placeholder="Password"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        style={styles.inputIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <FontAwesome5
                            name={showPassword ? "eye-slash" : "eye"}
                            size={20}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, styles.textInput]}
                        placeholder="Confirm Password"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                        style={styles.inputIcon}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <FontAwesome5
                            name={showConfirmPassword ? "eye-slash" : "eye"}
                            size={20}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleRegister}
                >
                    <Text style={styles.registerButtonText}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Text>
                </TouchableOpacity>

                {/* Login Link */}
                <View>
                    <Text style={styles.loginText}>
                        Already have an account?{' '}
                        <Text
                            style={{ fontWeight: '700' }}
                            onPress={onShowAuth}
                        >
                            Login
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
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
        backgroundColor: '#FBBF24',
        paddingTop: 80,
    },
    registerContainer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    registerTitle: {
        color: 'black',
        fontSize: 30,
        fontWeight: '800',
        marginBottom: 8,
    },
    registerDescription: {
        color: 'black',
        fontSize: 14,
        fontWeight: '400',
        maxWidth: 300,
        lineHeight: 16,
    },
    formContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#F3F4F6',
        borderRadius: 9999,
        paddingVertical: 12,
        paddingHorizontal: 20,
        fontSize: 14,
        color: '#9CA3AF',
    },
    textInput: {
        paddingRight: 50,
    },
    inputIcon: {
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: [{ translateY: -10 }],
    },
    registerButton: {
        backgroundColor: 'black',
        borderRadius: 9999,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    registerButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    loginText: {
        color: 'black',
        fontSize: 16,
        paddingTop: 40,
        fontWeight: '400',
        textAlign: 'center',
    },
});

export default Register; 