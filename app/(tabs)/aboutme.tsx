import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useToast, Toast, ToastDescription, ToastTitle } from '@/components/ui/toast';
import * as Haptics from 'expo-haptics';

export default function AboutMe() {
    const openLink = (url: string): void => {
        Linking.openURL(url).catch((err: Error) => console.error('Failed to open URL:', err));
    };

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

    return (
        <View style={styles.mainContainer}>
            {/* Fixed Profile Card */}
            <View style={styles.fixedCard}>
                <Image
                    source={{ uri: 'https://i.imgur.com/S7yk5XY.png' }}
                    style={styles.profileImage}
                />
                <Text style={styles.title}>
                    Hi! I'm Aman Raj, a software developer
                </Text>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Tech Stack Section */}
                <View style={styles.techStackSection}>
                    <Text style={styles.sectionTitle}>Tech Stack</Text>

                    {/* Frontend Stack */}
                    <View style={styles.stackContainer}>
                        <Text style={styles.stackTitle}>Frontend</Text>
                        <View style={styles.techGrid}>
                            {frontendTech.map((tech) => (
                                <View key={tech.name} style={styles.techItem}>
                                    <Icon name={tech.icon} size={24} color="#F9A825" />
                                    <Text style={styles.techName}>{tech.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Backend Stack */}
                    <View style={styles.stackContainer}>
                        <Text style={styles.stackTitle}>Backend</Text>
                        <View style={styles.techGrid}>
                            {backendTech.map((tech) => (
                                <View key={tech.name} style={styles.techItem}>
                                    <Icon name={tech.icon} size={24} color="#F9A825" />
                                    <Text style={styles.techName}>{tech.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Social Links Section */}
                <View style={styles.linksSection}>
                    <Text style={styles.connectText}>Connect with me</Text>
                    <View style={styles.linkGrid}>
                        {socialLinks.map(({ name, url, bgColor, hoverColor, image }) => (
                            <TouchableOpacity
                                key={name}
                                style={[styles.linkCard, { backgroundColor: bgColor, borderColor: hoverColor }]}
                                onPress={() => openLink(url)}
                            >
                                <Image source={{ uri: image }} style={styles.linkIcon} />
                                <Text style={styles.linkLabel}>{name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const frontendTech = [
    { name: 'React Native', icon: 'mobile' },
    { name: 'Expo', icon: 'rocket' },
    { name: 'TypeScript', icon: 'code' },
    { name: 'TailwindCSS', icon: 'paint-brush' },
    { name: 'GlueStack UI', icon: 'puzzle-piece' },
    { name: 'Haptics', icon: 'hand-o-up' },

];

const backendTech = [
    { name: 'Node.js', icon: 'server' },
    { name: 'Express', icon: 'code' },
    { name: 'PostgreSQL', icon: 'database' },
    { name: 'JWT', icon: 'lock' },
    { name: 'Knex.js', icon: 'database' },
    { name: 'bcrypt', icon: 'lock' },
];

const socialLinks = [
    {
        name: 'GitHub',
        url: 'https://github.com/04amanrajj',
        bgColor: '#d7d3c9',
        hoverColor: '#e0b0b0',
        image: 'https://logo.clearbit.com/github.com',
    },
    {
        name: 'Portfolio',
        url: 'https://04amanrajj.github.io/',
        bgColor: '#D0C8C6',
        hoverColor: '#b7d9b5',
        image: 'https://i.imgur.com/Zj872M7.jpeg',
    },
    {
        name: 'Instagram',
        url: 'https://instagram.com/04.aman.raj',
        bgColor: '#fff',
        hoverColor: '#a8bde9',
        image: 'https://logo.clearbit.com/instagram.com',
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/04amanrajj',
        bgColor: '#e8e8e8',
        hoverColor: '#a8bde9',
        image: 'https://logo.clearbit.com/linkedin.com',
    },
];

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF9E6',
    },
    fixedCard: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: 50,
        paddingBottom: 80,
        paddingHorizontal: 24,
        height: 300,
        backgroundColor: '#F9A825',
    },
    scrollContainer: {
        paddingTop: 430, // Adjust this value to control overlap
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    profileImage: {
        position: 'absolute',
        width: '113%',
        height: '250%',
        left: '1%',
        borderRadius: 50,
        marginBottom: 12,
        borderWidth: 4,
        borderColor: '#F9A825',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        resizeMode: 'cover',
        overflow: 'hidden',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '900',
        marginTop: 16,
        marginBottom: 8,
        lineHeight: 24,
        letterSpacing: 1,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textAlign: 'center',
        paddingHorizontal: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 16,
        padding: 8,
    },
    techStackSection: {
        width: '100%',
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    stackContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    stackTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 12,
    },
    techGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    techItem: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#FFF9E6',
        padding: 12,
        borderRadius: 12,
    },
    techName: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: '500',
        color: '#000',
        textAlign: 'center',
    },
    linksSection: {
        width: '100%',
        marginTop: 20,
        marginBottom: 40,
    },
    connectText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    linkGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    linkCard: {
        width: '48%',
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    linkIcon: {
        width: 64,
        height: 64,
        marginBottom: 8,
        borderRadius: 22,
    },
    linkLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    notificationPopup: {
        backgroundColor: '#000',
        borderRadius: 12,
        padding: 12,
    },
    notification: {
        backgroundColor: '#F9A825',
        borderRadius: 8,
        padding: 8,
    },
    notificationText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    notificationDescription: {
        color: '#fff',
        fontSize: 14,
    },
});
