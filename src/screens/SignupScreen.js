import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

export default function SignupScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Replaced profile icon with hero image */}
      {/* <View style={styles.profileIcon} /> */}
      
      <View style={styles.header}>
        {/* Replace title with image */}
        <Image source={require('../../assets/1.png')} style={styles.heroImage} />
        <Text style={styles.subtitle}>Hey! ready to rent some items?</Text>
        <Text style={styles.paragraph}>Sign up as a</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignupForm', { role: 'renter' })}
        >
          <Text style={styles.buttonText}>🏠 BUYER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignupForm', { role: 'rentee' })}
        >
          <Text style={styles.buttonText}>🛒 SELLER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signin')}
        >
          <Text style={styles.buttonText}>👤 Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4C9A0',
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  profileIcon: {
    position: 'absolute',
    top: 60,
    right: 40,
    width: 120,
    height: 120,
    backgroundColor: '#FAF8F3',
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginTop: 180,
  },
  heroImage: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 72,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
    letterSpacing: -2,
  },
  subtitle: {
    fontSize: 20,
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 32,
    maxWidth: 400,
  },
  paragraph: {
    fontSize: 16,
    color: '#1A1A1A',
    marginTop: 6,
  },
  buttonsContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
});
