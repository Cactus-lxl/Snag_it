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

export default function SigninScreen({ navigation }) {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignin = () => {
    // Mock sign-in: derive a name from email
    const name = email?.split('@')[0] || 'User';
    setUser({ name, role: 'renter' });
    navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <Text style={styles.title}>Sign in</Text>

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

          <TouchableOpacity style={styles.submitBtn} onPress={onSignin}>
            <Text style={styles.submitText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.replace('Signup')} style={styles.linkBtn}>
            <Text style={styles.linkText}>Don’t have an account? Sign up</Text>
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
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
