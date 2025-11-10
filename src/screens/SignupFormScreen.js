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
} from 'react-native';
import { useUser } from '../context/UserContext';

export default function SignupFormScreen({ navigation, route }) {
  const role = route?.params?.role === 'rentee' ? 'rentee' : 'renter';
  const { setUser } = useUser();

  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(''); // YYYY-MM-DD

  // Extra for rentee
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [idNumber, setIdNumber] = useState('');

  const onSubmit = () => {
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
        <Text style={styles.headerTitle}>Sign up as {role === 'rentee' ? 'Rentee' : 'Renter'}</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#8A8A8A"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
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
  content: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
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
  inputMultiline: {
    minHeight: 70,
    textAlignVertical: 'top',
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
