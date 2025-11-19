import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const settingsSections = [
    {
      title: 'NOTIFICATIONS',
      items: [
        {
          key: 'push',
          icon: 'notifications-outline',
          label: 'Push Notifications',
          type: 'toggle',
          value: pushEnabled,
          onToggle: setPushEnabled,
        },
        {
          key: 'email',
          icon: 'mail-outline',
          label: 'Email Notifications',
          type: 'toggle',
          value: emailEnabled,
          onToggle: setEmailEnabled,
        },
        {
          key: 'sms',
          icon: 'chatbox-outline',
          label: 'SMS Notifications',
          type: 'toggle',
          value: smsEnabled,
          onToggle: setSmsEnabled,
        },
      ],
    },
    {
      title: 'APPEARANCE',
      items: [
        {
          key: 'dark',
          icon: 'moon-outline',
          label: 'Dark Mode',
          type: 'toggle',
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          key: 'language',
          icon: 'language-outline',
          label: 'Language',
          type: 'link',
          value: 'English',
        },
      ],
    },
    {
      title: 'PRIVACY & SECURITY',
      items: [
        {
          key: 'privacy',
          icon: 'shield-checkmark-outline',
          label: 'Privacy Settings',
          type: 'link',
        },
        {
          key: 'password',
          icon: 'key-outline',
          label: 'Change Password',
          type: 'link',
        },
        {
          key: 'twofa',
          icon: 'finger-print-outline',
          label: 'Two-Factor Authentication',
          type: 'link',
        },
      ],
    },
    {
      title: 'ABOUT',
      items: [
        {
          key: 'terms',
          icon: 'document-text-outline',
          label: 'Terms of Service',
          type: 'link',
        },
        {
          key: 'privacy-policy',
          icon: 'lock-closed-outline',
          label: 'Privacy Policy',
          type: 'link',
        },
        {
          key: 'version',
          icon: 'information-circle-outline',
          label: 'App Version',
          type: 'info',
          value: '1.0.0',
        },
      ],
    },
  ];

  const handleItemPress = (key) => {
    // Handle navigation or actions for each setting
    console.log('Pressed:', key);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.list}>
              {section.items.map((item, index) => (
                <View key={item.key}>
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => item.type !== 'toggle' && handleItemPress(item.key)}
                    activeOpacity={item.type === 'toggle' ? 1 : 0.7}
                    disabled={item.type === 'info'}
                  >
                    <View style={styles.iconContainer}>
                      <Ionicons name={item.icon} size={22} color="#6BAA38" />
                    </View>
                    <View style={styles.itemContent}>
                      <Text style={styles.itemLabel}>{item.label}</Text>
                      {item.value && item.type !== 'toggle' && (
                        <Text style={styles.itemValue}>{item.value}</Text>
                      )}
                    </View>
                    {item.type === 'toggle' ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: '#E0E0E0', true: 'rgba(107, 170, 56, 0.3)' }}
                        thumbColor={item.value ? '#6BAA38' : '#f4f3f4'}
                        ios_backgroundColor="#E0E0E0"
                      />
                    ) : item.type === 'link' ? (
                      <Ionicons name="chevron-forward" size={16} color="rgba(0,0,0,0.25)" />
                    ) : null}
                  </TouchableOpacity>
                  {index < section.items.length - 1 && <View style={styles.itemDivider} />}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
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
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 8,
  },
  itemLabel: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  itemValue: {
    fontSize: 14,
    color: '#6B6B6B',
    fontWeight: '400',
  },
  itemDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginLeft: 60,
  },
});
