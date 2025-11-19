import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';

const THEME = {
  colors: {
    accent: '#6BAA38',
    text: '#1A1A1A',
    surface: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.15)',
    shadow: 'rgba(0, 0, 0, 0.15)',
    menuShadow: 'rgba(0, 0, 0, 0.06)',
  },
  timing: {
    expand: 250,
    stagger: 50,
  },
};

const MENU_ITEMS = [
  {
    id: 'tool',
    icon: 'hammer',
    label: 'List a Tool',
    category: 'tool',
  },
  {
    id: 'clothing',
    icon: 'shirt',
    label: 'List Clothing',
    category: 'clothing',
  },
  {
    id: 'kitchen',
    icon: 'restaurant',
    label: 'List Kitchen Item',
    category: 'kitchen',
  },
  {
    id: 'manage',
    icon: 'settings',
    label: 'Manage My Listings',
    category: null,
  },
];

export default function FloatingActionButton({ navigation }) {
  const { user } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Animation values
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const menuAnimations = useRef(
    MENU_ITEMS.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(20),
    }))
  ).current;

  const toggleMenu = () => {
    // Haptic feedback (would need expo-haptics)
    // import * as Haptics from 'expo-haptics';
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    setIsExpanded(true);

    // Rotate + to ×
    Animated.spring(rotateAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
    }).start();

    // Scale main button slightly
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      friction: 8,
    }).start();

    // Stagger menu items
    const animations = menuAnimations.map((anim, index) =>
      Animated.parallel([
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: THEME.timing.expand,
          delay: index * THEME.timing.stagger,
          useNativeDriver: true,
        }),
        Animated.spring(anim.translateY, {
          toValue: 0,
          delay: index * THEME.timing.stagger,
          useNativeDriver: true,
          friction: 8,
        }),
      ])
    );

    Animated.stagger(THEME.timing.stagger, animations).start();
  };

  const closeMenu = () => {
    // Rotate × back to +
    Animated.spring(rotateAnim, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
    }).start();

    // Scale back to normal
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
    }).start();

    // Fade out menu items
    const animations = menuAnimations.map((anim) =>
      Animated.parallel([
        Animated.timing(anim.opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(anim.translateY, {
          toValue: 20,
          duration: 150,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.parallel(animations).start(() => {
      setIsExpanded(false);
    });
  };

  const handleMenuItemPress = (item) => {
    closeMenu();

    // Check if user is already a seller
    const isSeller = user?.role === 'rentee';

    if (!isSeller && item.id !== 'manage') {
      // Show onboarding for non-sellers
      setTimeout(() => setShowOnboarding(true), 300);
      return;
    }

    // Navigate based on selection
    setTimeout(() => {
      if (item.id === 'manage') {
        // Switch to seller dashboard
        navigation.navigate('SellerDashboard');
      } else {
        // Go to add item screen with category prefilled
        navigation.navigate('AddItem', { category: item.category });
      }
    }, 300);
  };

  const handleOnboardingConfirm = () => {
    setShowOnboarding(false);
    // Navigate to seller dashboard
    navigation.navigate('SellerDashboard');
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <>
      {/* Main FAB */}
      <View style={styles.fabContainer}>
        <Animated.View
          style={[
            styles.mainButton,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.fab}
            onPress={toggleMenu}
            activeOpacity={0.9}
          >
            <Animated.View style={{ transform: [{ rotate }] }}>
              <Ionicons name="add" size={28} color="#FFFFFF" />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        {/* Expanded Menu Items */}
        {isExpanded && (
          <>
            {/* Backdrop overlay */}
            <TouchableWithoutFeedback onPress={closeMenu}>
              <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            {/* Menu pills */}
            <View style={styles.menuContainer}>
              {MENU_ITEMS.map((item, index) => (
                <Animated.View
                  key={item.id}
                  style={[
                    styles.menuItemWrapper,
                    {
                      opacity: menuAnimations[index].opacity,
                      transform: [
                        { translateY: menuAnimations[index].translateY },
                      ],
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleMenuItemPress(item)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.menuIconContainer}>
                      <Ionicons
                        name={item.icon}
                        size={22}
                        color={THEME.colors.accent}
                      />
                    </View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </>
        )}
      </View>

      {/* Onboarding Modal */}
      <Modal
        visible={showOnboarding}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOnboarding(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <Ionicons name="sparkles" size={48} color={THEME.colors.accent} />
            </View>
            
            <Text style={styles.modalTitle}>Start Earning Today!</Text>
            <Text style={styles.modalText}>
              Want to start renting out your own items? List your tools, clothing, or equipment and earn money when you're not using them.
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleOnboardingConfirm}
            >
              <Text style={styles.modalButtonText}>Go to Seller Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowOnboarding(false)}
            >
              <Text style={styles.modalCancelText}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 1000,
  },
  mainButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: THEME.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: THEME.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
  backdrop: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: -1000,
    top: -1000,
    backgroundColor: THEME.colors.overlay,
  },
  menuContainer: {
    position: 'absolute',
    bottom: 80,
    right: 0,
    alignItems: 'flex-end',
    gap: 12,
  },
  menuItemWrapper: {
    marginBottom: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surface,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
    minWidth: 200,
    shadowColor: THEME.colors.menuShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${THEME.colors.accent}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: THEME.colors.text,
    flex: 1,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: THEME.colors.surface,
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  modalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${THEME.colors.accent}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: THEME.colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#6B6B6B',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 28,
  },
  modalButton: {
    backgroundColor: THEME.colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 28,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: THEME.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalCancelButton: {
    paddingVertical: 12,
  },
  modalCancelText: {
    fontSize: 15,
    color: '#6B6B6B',
    fontWeight: '600',
  },
});
