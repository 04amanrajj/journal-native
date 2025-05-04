import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBBF24',
  },
  text: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
});

export default LoadingScreen;