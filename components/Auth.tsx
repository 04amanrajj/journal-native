import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios, { AxiosError } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useToast, Toast, ToastDescription, ToastTitle } from '@/components/ui/toast';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';

interface AuthProps {
    onAuthSuccess: () => void;
    onShowRegister: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess, onShowRegister }) => {
    const router = useRouter();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [response, setResponse] = React.useState('');
    const [loading, setLoading] = React.useState(false);

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

    async function handleSignIn() {
        setLoading(true);
        try {
            const res = await axios.post('https://journal-app-backend-kxqs.onrender.com/user/login', {
                email,
                password,
            });

            const { token } = res.data;
            await AsyncStorage.setItem('authToken', token);
            setResponse('Login successful!');
            onAuthSuccess();
        } catch (error: any) {
            console.error('Login error:', error);
            setResponse(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Sign In Section */}
            <View style={styles.signInContainer}>
                <Text style={styles.signInTitle}>Sign In</Text>
                <Text style={styles.signInDescription}>
                    Welcome back! Please sign in to continue.
                </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() =>
                    showToast({
                        title: "Feature Coming Soon",
                        description: "This feature is still in development.",
                        icon: "clock-o",
                    })
                }>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={handleSignIn}
                >
                    <Text style={styles.signInButtonText}>{loading ? 'Logging in...' : 'Login'}</Text>
                </TouchableOpacity>

                {/* Social Buttons */}
                <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() =>
                        showToast({
                            title: "Feature Coming Soon",
                            description: "This feature is still in development.",
                            icon: "clock-o",
                        })
                    }
                >
                    <FontAwesome5 name="google" size={20} color="black" />
                    <Text style={styles.socialButtonText}>Continue with Google</Text>
                    <FontAwesome5 name="arrow-right" size={16} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() =>
                        showToast({
                            title: "Feature Coming Soon",
                            description: "This feature is still in development.",
                            icon: "clock-o",
                        })
                    }
                >
                    <FontAwesome5 name="facebook" size={20} color="black" />
                    <Text style={styles.socialButtonText}>Continue with Facebook</Text>
                    <FontAwesome5 name="arrow-right" size={16} color="black" />
                </TouchableOpacity>
                {/* register Section */}
                <View>
                    <Text style={styles.registerText}>
                        Don't have an account?{' '}
                        <Text style={{ fontWeight: '700' }} onPress={onShowRegister}>
                            Register
                        </Text>
                    </Text>
                </View>
                {/* output Section */}
                <View>
                    <Text style={styles.output}>
                        {response || 'Response'}
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
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    signInContainer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    signInTitle: {
        color: 'black',
        fontSize: 30,
        fontWeight: '800',
        marginBottom: 8,
    },
    signInDescription: {
        color: 'black',
        fontSize: 14,
        fontWeight: '400',
        maxWidth: 300,
        lineHeight: 16,
    },
    registerText: {
        color: 'black',
        fontSize: 16,
        paddingTop: 40,
        fontWeight: '400',
    },
    formContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    input: {
        backgroundColor: '#F3F4F6',
        borderRadius: 9999,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 16,
        fontSize: 14,
        color: '#9CA3AF',
    },
    output: {
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 16,
        marginTop: 16,
        fontSize: 14,
        width: '100%',
        height: 150,
        color: '#9CA3AF',
    },
    forgotPassword: {
        textAlign: 'right',
        color: 'black',
        fontSize: 12,
        fontWeight: '400',
        marginBottom: 16,
    },
    signInButton: {
        backgroundColor: 'black',
        borderRadius: 9999,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    signInButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        borderRadius: 9999,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    socialButtonText: {
        color: 'black',
        fontSize: 14,
        fontWeight: '400',
        flex: 1,
        textAlign: 'center',
    },
});

export default Auth; 