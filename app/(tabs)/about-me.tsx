import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

export default function AboutMe() {
    const openLink = (url: string): void => {
        Linking.openURL(url).catch((err: Error) => console.error('Failed to open URL:', err));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Basic Info Section */}


            {/*Card */}
            <View style={styles.card}>
                <Image
                    source={{ uri: 'https://i.imgur.com/S7yk5XY.png' }}
                    style={styles.profileImage}
                />
                <Text style={styles.title}>
                    Hi! I'm Aman Raj, a software developer
                </Text>
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
    );
}

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
        url: 'https://www.linkedin.com/in/aman-raj-226875339/',
        bgColor: '#0274B3',
        hoverColor: '#c1bcae',
        image: 'https://logo.clearbit.com/linkedin.com',
    },
];

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF9E6',
        alignItems: 'center',
        height: '100%',
        paddingTop: 40,
    },
    basicInfo: {
        alignItems: 'center',
        marginBottom: 24,
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
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    bio: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    card: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: 50,
        paddingBottom: 80,
        paddingHorizontal: 24,
        width: '95%',
        height: 300,
        position: 'relative',
        overflow: 'visible',
    },
    categoryRow: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 12,
    },
    categorySeparator: {
        marginHorizontal: 4,
    },
    categoryHighlight: {
        fontWeight: '900',
        fontSize: 12,
    },
    timeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '700',
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
        textShadowRadius: 2,
        textAlign: 'center',
        paddingHorizontal: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 16,
        padding: 8,
    },
    linksSection: {
        marginTop: 140,
        width: '100%',
        maxWidth: 320,
    },
    connectText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 12,
        textAlign: 'center',
        textTransform: 'uppercase',
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
});
