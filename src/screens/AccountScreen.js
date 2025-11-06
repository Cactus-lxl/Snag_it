import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useUser } from '../context/UserContext';

export default function AccountScreen({ navigation }) {
  const { user, setUser } = useUser();
  const userData = {
    name: user?.name || 'Guest',
    joined: 'Joined • Mar 2024',
  };

  const options = [
    { key: 'edit', icon: '👤', label: 'Edit Profile' },
    { key: 'payment', icon: '💳', label: 'Payment Methods' },
    { key: 'payouts', icon: '💰', label: 'Payouts' },
    { key: 'notifications', icon: '🔔', label: 'Notifications' },
    { key: 'security', icon: '🔒', label: 'Security' },
    { key: 'help', icon: '❓', label: 'Help & Support' },
    { key: 'logout', icon: '🚪', label: 'Log out', danger: true },
  ];

  const handleOptionPress = (key) => {
    if (key === 'logout') {
      // Clear user state and go to Signup
      setUser(null);
      navigation.reset({ index: 0, routes: [{ name: 'Signup' }] });
      return;
    }
    // ... could handle other options here later
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(userData.name?.[0] || 'G').toUpperCase()}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.joined}>{userData.joined}</Text>
          </View>
        </View>

        {/* Account Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account settings</Text>
          <View style={styles.list}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt.key}
                style={[styles.listItem, opt.danger && styles.listItemDanger]}
                onPress={() => handleOptionPress(opt.key)}
                activeOpacity={0.7}
              >
                <Text style={styles.itemIcon}>{opt.icon}</Text>
                <Text style={[styles.itemLabel, opt.danger && styles.itemLabelDanger]}>{opt.label}</Text>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    paddingBottom: 40,
    gap: 24,
  },
  headerCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#C4C9A0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  joined: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 6,
  },
  list: {
    backgroundColor: 'transparent',
    gap: 10,
  },
  listItem: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  listItemDanger: {
    backgroundColor: '#fff7f7',
  },
  itemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  itemLabel: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  itemLabelDanger: {
    color: '#B00020',
  },
  chevron: {
    fontSize: 22,
    color: '#6B6B6B',
    paddingLeft: 6,
  },
});
