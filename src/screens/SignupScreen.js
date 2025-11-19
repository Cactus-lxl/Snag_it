import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';

const COLORS = {
  bg: '#C8CEA4',          // soft sage
  text: '#101010',
  textMuted: '#4A4A4A',
  card: 'rgba(255,255,255,0.96)',
  line: 'rgba(16,16,16,0.08)',
  accent: '#6BAA38',      // fresh green accent
};

export default function SignupScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.content}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand / Hero */}
        <View style={styles.hero}>
          <Image source={require('../../assets/1.png')} style={styles.heroImage} />
          <Text style={styles.headline}>Hey! Ready to rent some items?</Text>
          <Text style={styles.subhead}>Sign up as a</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttons}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => navigation.navigate('SignupForm', { role: 'renter' })}
            android_ripple={{ color: COLORS.line }}
          >
            <Text style={styles.buttonText}>🏠  BUYER</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => navigation.navigate('SignupForm', { role: 'rentee' })}
            android_ripple={{ color: COLORS.line }}
          >
            <Text style={styles.buttonText}>🛒  SELLER</Text>
          </Pressable>

          <View style={styles.separator}>
            <View style={styles.line} />
            <Text style={styles.sepText}>or</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.link}>Already have an account? <Text style={styles.linkStrong}>Sign in</Text></Text>
          </TouchableOpacity>
        </View>

        {/* Footer microcopy */}
        <Text style={styles.footerNote}>By continuing, you agree to Snag-It's Terms & Privacy.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  // Hero section
  hero: {
    alignItems: 'center',
    marginTop: 40,
  },
  heroImage: {
    width: '80%',
    height: 140,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  headline: {
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
    color: COLORS.text,
    fontWeight: '700',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  subhead: {
    fontSize: 18,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
  // Buttons section
  buttons: {
    marginTop: 20,
  },
  button: {
    backgroundColor: COLORS.card,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 0.4,
  },
  // Separator
  separator: {
    marginVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.line,
  },
  sepText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  link: {
    marginTop: 12,
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 15,
  },
  linkStrong: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  // Footer
  footerNote: {
    textAlign: 'center',
    color: 'rgba(16,16,16,0.55)',
    fontSize: 12,
    marginTop: 20,
  },
});
