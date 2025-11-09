import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
} from 'react-native';
import { useUser } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';

export default function AccountScreen({ navigation }) {
  const { user, setUser } = useUser();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  
  const userData = {
    name: user?.name || 'Guest',
    joined: 'Mar 2024',
  };

  const options = [
    { key: 'edit', icon: 'person-outline', label: 'Edit Profile' },
    { key: 'payment', icon: 'card-outline', label: 'Payment Methods' },
    { key: 'payouts', icon: 'wallet-outline', label: 'Payouts' },
    { key: 'notifications', icon: 'notifications-outline', label: 'Notifications' },
    { key: 'security', icon: 'lock-closed-outline', label: 'Security' },
    { key: 'help', icon: 'help-circle-outline', label: 'Help & Support' },
    { key: 'theme', icon: 'color-palette-outline', label: 'Theme' },
    { key: 'feedback', icon: 'chatbubble-outline', label: 'Feedback' },
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

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{(userData.name?.[0] || 'G').toUpperCase()}</Text>
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{userData.name}</Text>
            <View style={styles.joinedPill}>
              <Text style={styles.joined}>Joined {userData.joined}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
            <Ionicons name="pencil-outline" size={18} color="#6BAA38" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Account Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT SETTINGS</Text>
          <View style={styles.list}>
            {options.map((opt, index) => (
              <Animated.View key={opt.key} style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => handleOptionPress(opt.key)}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  activeOpacity={0.9}
                >
                  <View style={styles.iconContainer}>
                    <Ionicons name={opt.icon} size={22} color="#6BAA38" />
                  </View>
                  <Text style={styles.itemLabel}>{opt.label}</Text>
                  <Ionicons name="chevron-forward" size={16} color="rgba(0,0,0,0.25)" />
                </TouchableOpacity>
                {index < options.length - 1 && <View style={styles.itemDivider} />}
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Log Out Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handleOptionPress('logout')}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={22} color="#C53030" />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F6',
  },
  content: {
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 24,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#C4C9A0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#6BAA38',
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    fontFamily: 'System',
  },
  joinedPill: {
    backgroundColor: 'rgba(107, 170, 56, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  joined: {
    fontSize: 13,
    color: '#6BAA38',
    fontWeight: '500',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(107, 170, 56, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    marginVertical: 0,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
    letterSpacing: 1,
    marginLeft: 6,
  },
  list: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 8,
  },
  itemLabel: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  itemDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginLeft: 56,
  },
  logoutButton: {
    backgroundColor: '#FFF5F5',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#C53030',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#C53030',
  },
});
