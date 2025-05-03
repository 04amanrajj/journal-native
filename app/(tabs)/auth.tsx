import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios, { AxiosError } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '@/components/LoadingScreen';

const login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [response, setResponse] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);





    React.useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (token) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
            }
        };

        checkAuthStatus();
    }, []);

    if (isLoggedIn) {
        return (
            <LoadingScreen redirectTo="/profile" />
        );
    }

    async function handleSignIn() {
        try {
            const response = await axios.post('https://journal-app-backend-kxqs.onrender.com/user/login', {
                email,
                password,
            });
            await AsyncStorage.setItem('authToken', response.data.token);
            setResponse(response.data.message || 'Login successful!');
            console.log('Login successful:', response.data);
        } catch (error: unknown) {
            let errorMessage = 'An error occurred';

            if (axios.isAxiosError(error)) {
                // Axios error with response from backend
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                // Generic JS error
                errorMessage = error.message;
            }

            setResponse(errorMessage);
            console.error('Error during Login:', error);
        }
    }



    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            {/* Header */}

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
                <TouchableOpacity onPress={() => console.log('Forgot Password pressed')}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={handleSignIn}
                >
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>

                {/* Social Buttons */}
                <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => console.log('Continue with Google pressed')}
                >
                    <FontAwesome5 name="google" size={20} color="black" />
                    <Text style={styles.socialButtonText}>Continue with Google</Text>
                    <FontAwesome5 name="arrow-right" size={16} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => console.log('Continue with Facebook pressed')}
                >
                    <FontAwesome5 name="facebook" size={20} color="black" />
                    <Text style={styles.socialButtonText}>Continue with Facebook</Text>
                    <FontAwesome5 name="arrow-right" size={16} color="black" />
                </TouchableOpacity>
                {/* register Section */}
                <View>
                    <Text style={styles.registerText}>
                        Don't have an account?{' '}
                        <Text
                            style={{ fontWeight: '700' }}
                            onPress={() => console.log('Register pressed')}
                        >
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBBF24', // bg-yellow-400
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
        backgroundColor: '#F3F4F6', // bg-gray-100
        borderRadius: 9999, // rounded-full
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 16,
        fontSize: 14,
        color: '#9CA3AF', // text-gray-400
    },
    output: {
        backgroundColor: '#F3F4F6', // bg-gray-100
        borderRadius: 20, // rounded-full
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 16,
        marginTop: 16,
        fontSize: 14,
        width: '100%',
        height: 150,
        color: '#9CA3AF', // text-gray-400
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

export default login;