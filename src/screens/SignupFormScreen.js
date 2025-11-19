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

export default function SignupFormScreen({ navigation, route }) {
  const role = route?.params?.role === 'rentee' ? 'rentee' : 'renter';
  const { setUser } = useUser();

  // Common fields with default values
  const [name, setName] = useState('Demo User');
  const [email, setEmail] = useState('demo@psu.edu');
  const [password, setPassword] = useState('password123');
  const [dob, setDob] = useState('2000-01-01');

  // Extra for rentee with default values
  const [phone, setPhone] = useState('(555) 123-4567');
  const [address, setAddress] = useState('123 College Ave, State College, PA 16801');
  const [idNumber, setIdNumber] = useState('');

  // Error states
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
      setEmailError('');
    }
  };

  const onSubmit = () => {
    // Validate all required fields with current values (defaults if unchanged)
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your full name.', [{ text: 'OK' }]);
      return;
    }

    // Validate email
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      Alert.alert(
          'Invalid Email',
          'Please use your Penn State email address (@psu.edu) to create an account.',
          [{ text: 'OK' }]
      );
      return;
    }

    if (!password.trim() || password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.', [{ text: 'OK' }]);
      return;
    }

    if (!dob.trim()) {
      Alert.alert('Error', 'Please enter your date of birth.', [{ text: 'OK' }]);
      return;
    }

    // Additional validation for rentee
    if (role === 'rentee') {
      if (!phone.trim()) {
        Alert.alert('Error', 'Please enter your phone number.', [{ text: 'OK' }]);
        return;
      }
      if (!address.trim()) {
        Alert.alert('Error', 'Please enter your address.', [{ text: 'OK' }]);
        return;
      }
    }

    // Clear errors
    setEmailError('');

    // Simple mock submit and set user context
    setUser({ name, role });
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign up as {role === 'rentee' ? 'Seller' : 'Buyer'}</Text>
          <View style={styles.psuBadge}>
            <Text style={styles.psuBadgeText}>PSU</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.demoNotice}>
            <Ionicons name="information-circle" size={20} color="#4A90E2" />
            <Text style={styles.demoText}>Demo mode: Click "Create account" to sign up instantly</Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Your details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full name</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Alex Johnson"
                  placeholderTextColor="#8A8A8A"
                  value={name}
                  onChangeText={setName}
              />
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
              <Text style={styles.helperText}>At least 6 characters</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of birth</Text>
              <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#8A8A8A"
                  value={dob}
                  onChangeText={setDob}
              />
            </View>
          </View>

          {role === 'rentee' && (
              <View style={styles.formCard}>
                <Text style={styles.sectionTitle}>Additional details</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Phone number</Text>
                  <TextInput
                      style={styles.input}
                      placeholder="(555) 555-5555"
                      placeholderTextColor="#8A8A8A"
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={setPhone}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Address</Text>
                  <TextInput
                      style={[styles.input, styles.inputMultiline]}
                      placeholder="Street, City, State, ZIP"
                      placeholderTextColor="#8A8A8A"
                      multiline
                      value={address}
                      onChangeText={setAddress}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Government ID (optional)</Text>
                  <TextInput
                      style={styles.input}
                      placeholder="ID / Passport number"
                      placeholderTextColor="#8A8A8A"
                      value={idNumber}
                      onChangeText={setIdNumber}
                  />
                </View>
              </View>
          )}

          <View style={styles.noticeCard}>
            <Ionicons name="shield-checkmark" size={24} color="#041E42" />
            <Text style={styles.noticeText}>
              Only Penn State students and staff with @psu.edu emails can join Snag-It
            </Text>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
            <Text style={styles.submitText}>Create account</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F3',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  backIcon: {
    fontSize: 20,
    color: '#1A1A1A',
    marginTop: -2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  psuBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#041E42',
    alignItems: 'center',
    justifyContent: 'center',
  },
  psuBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  demoNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#E8F4FD',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B3D9F2',
  },
  demoText: {
    flex: 1,
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '500',
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
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    color: '#4B4B4B',
    fontWeight: '600',
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
  inputMultiline: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  noticeCard: {
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#B3D9F2',
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 20,
  },
  submitBtn: {
    backgroundColor: '#C4C9A0',
    borderRadius: 28,
    paddingVertical: 16,
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
});