import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';

export default function SigninScreen({ navigation }) {
  const { setUser } = useUser();

  // Set default values that will be used if user doesn't change them
  const [email, setEmail] = useState('demo@psu.edu');
  const [password, setPassword] = useState('password123');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      return 'Email is required';
    }
    if (!trimmedEmail.endsWith('@psu.edu')) {
      return 'Only @psu.edu emails are allowed';
    }
    return '';
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (emailError) {
      // Clear error as user types
      setEmailError('');
    }
  };

  const onSignin = () => {
    // Use current values (defaults if unchanged)
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      Alert.alert(
          'Invalid Email',
          'Please use your Penn State email address (@psu.edu) to sign in.',
          [{ text: 'OK' }]
      );
      return;
    }

    // Check password is not empty
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password.', [{ text: 'OK' }]);
      return;
    }

    // Clear any errors
    setEmailError('');

    // Mock sign-in: derive a name from email
    const name = email?.split('@')[0] || 'User';
    setUser({ name, role: 'renter' });
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.formCard}>
            <View style={styles.headerSection}>
              <Text style={styles.title}>Sign in</Text>
              <View style={styles.psuBadge}>
                <Text style={styles.psuText}>Penn State Only</Text>
              </View>
            </View>

            <View style={styles.demoNotice}>
              <Ionicons name="information-circle" size={20} color="#4A90E2" />
              <Text style={styles.demoText}>Demo mode: Click "Continue" to sign in instantly</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Penn State Email</Text>
              <TextInput
                  style={[styles.input, emailError ? styles.inputError : null]}
                  placeholder="abc1234@psu.edu"
                  placeholderTextColor="#8A8A8A"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={handleEmailChange}
              />
              {emailError ? (
                  <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle" size={16} color="#FF4444" />
                    <Text style={styles.errorText}>{emailError}</Text>
                  </View>
              ) : null}
              <Text style={styles.helperText}>Use your @psu.edu email address</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#8A8A8A"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={onSignin}>
              <Text style={styles.submitText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('Signup')} style={styles.linkBtn}>
              <Text style={styles.linkText}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F3',
  },
  content: {
    padding: 20,
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  psuBadge: {
    backgroundColor: '#041E42',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  psuText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  demoNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#E8F4FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#B3D9F2',
  },
  demoText: {
    flex: 1,
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: '#4B4B4B',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1A1A',
  },
  inputError: {
    borderColor: '#FF4444',
    borderWidth: 2,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  errorText: {
    fontSize: 13,
    color: '#FF4444',
    fontWeight: '500',
  },
  helperText: {
    fontSize: 12,
    color: '#6B6B6B',
    marginTop: 4,
  },
  submitBtn: {
    backgroundColor: '#C4C9A0',
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  linkBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  linkText: {
    color: '#1A1A1A',
    opacity: 0.8,
  },
});