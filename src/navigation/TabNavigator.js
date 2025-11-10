import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, View, Text } from 'react-native';
import BuyerDashboardScreen from '../screens/DashboardScreen-buyer';
import SellerDashboardScreen from '../screens/DashboardScreen-seller';
import SearchScreen from '../screens/SearchScreen';
import ChatScreen from '../screens/ChatScreen';
import AccountScreen from '../screens/AccountScreen';
import { useUser } from '../context/UserContext';

const Tab = createBottomTabNavigator();

const THEME = {
  colors: {
    accent: '#6BAA38',
    text: '#1A1A1A',
    muted: '#6B6B6B',
    mutedLabel: '#8A8A8A',
    border: 'rgba(0, 0, 0, 0.08)',
    surface: '#FFFFFF',
    badge: '#E05B5B',
    badgeText: '#FFFFFF',
  },
  spacing: {
    barHeight: 72,
    iconSize: 24,
    iconLabelGap: 4,
    horizontalGutter: 16,
    verticalPadding: 8,
  },
  typography: {
    labelSize: 13,
    labelWeight: '500',
  },
  radius: {
    tabItem: 12,
    indicator: 8,
    badge: 9,
  },
};

// Icon + indicator component
const TabBarIcon = ({ focused, iconName, size, color, badge }) => (
  <View style={styles.iconContainer}>
    {focused && <View style={styles.activeIndicator} />}
    <View>
      <Ionicons name={iconName} size={size} color={color} />
      {badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
        </View>
      )}
    </View>
  </View>
);

export default function TabNavigator() {
  const { user } = useUser();

  // Auto-select buyer or seller dashboard
  const DashboardScreen =
    user?.role === 'rentee' ? SellerDashboardScreen : BuyerDashboardScreen;

  // Mock badge (connect this later to unread count)
  const messagesBadgeCount = 0;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }) => {
          let iconName = 'home-outline';
          let badge = 0;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Browse':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Messages':
              iconName = focused
                ? 'chatbubble-ellipses'
                : 'chatbubble-ellipses-outline';
              badge = messagesBadgeCount;
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          const color = focused
            ? THEME.colors.accent
            : THEME.colors.mutedLabel;

          return (
            <TabBarIcon
              focused={focused}
              iconName={iconName}
              size={THEME.spacing.iconSize}
              color={color}
              badge={badge}
            />
          );
        },
        tabBarActiveTintColor: THEME.colors.text,
        tabBarInactiveTintColor: THEME.colors.mutedLabel,
        tabBarStyle: {
          backgroundColor: THEME.colors.surface,
          borderTopWidth: 1,
          borderTopColor: THEME.colors.border,
          height: THEME.spacing.barHeight,
          paddingTop: THEME.spacing.verticalPadding,
          paddingBottom:
            Platform.OS === 'ios'
              ? 20
              : THEME.spacing.verticalPadding,
          paddingHorizontal: THEME.spacing.horizontalGutter,
          elevation: 0,
          shadowColor: 'transparent',
        },
        tabBarLabelStyle: {
          fontSize: THEME.typography.labelSize,
          fontWeight: THEME.typography.labelWeight,
          marginTop: THEME.spacing.iconLabelGap,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarAccessibilityLabel: route.name,
        tabBarTestID: `tab-${route.name.toLowerCase()}`,
      })}
      screenListeners={{
        tabPress: () => {
          if (Platform.OS === 'ios') {
            // Optional haptic feedback: 
            // import * as Haptics from 'expo-haptics';
            // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarAccessibilityLabel: 'Home tab',
        }}
      />
      <Tab.Screen
        name="Browse"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Browse',
          tabBarAccessibilityLabel: 'Browse tab',
        }}
      />
      <Tab.Screen
        name="Messages"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarAccessibilityLabel: 'Messages tab',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarAccessibilityLabel: 'Profile tab',
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
    minHeight: 44,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -6,
    width: 16,
    height: 2,
    backgroundColor: THEME.colors.accent,
    borderRadius: THEME.radius.indicator,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    minWidth: 18,
    height: 18,
    backgroundColor: THEME.colors.badge,
    borderRadius: THEME.radius.badge,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: THEME.colors.badgeText,
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 18,
  },
});
