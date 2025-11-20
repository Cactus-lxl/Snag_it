import React, { useMemo, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useItems } from '../context/ItemsContext';
import { Alert } from 'react-native';

export default function SellerDashboardScreen({ navigation }) {
  const { getUserItems, getAllItems, deleteItem } = useItems();
  const userItems = getUserItems(); // real user items from context
  const allItems = getAllItems();   // includes dummy + user items for stats, etc.

  const [searchText, setSearchText] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const scrollRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const appBarAnim = useRef(new Animated.Value(0)).current;
  const searchBarAnim = useRef(new Animated.Value(0)).current;
  const metricsAnim = useRef(new Animated.Value(0)).current;
  const searchScaleAnim = useRef(new Animated.Value(1)).current;

  // Track which dummy items have been "deleted" by the user (local only)
  const [hiddenDummyIds, setHiddenDummyIds] = useState([]);

  // Drawer state
  const DRAWER_WIDTH = 280;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: -DRAWER_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };

  // Page entry animation
  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(appBarAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(searchBarAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    Animated.stagger(75, [
      Animated.timing(metricsAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSearchFocus = () => {
    setSearchFocused(true);
    Animated.spring(searchScaleAnim, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start();
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
    Animated.spring(searchScaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  /**
   * recentUploads:
   * - Always shows up to 3 dummy items (those with !isUserAdded in allItems),
   *   unless the user has deleted them.
   * - Dummy items are transformed into "user-like" items:
   *   isUserAdded: true (so they show NEW badge + delete button)
   *   isDummy: true (so we know not to call deleteItem on them)
   * - Real user items (from context) are included as normal with isDummy: false.
   */
  const recentUploads = useMemo(() => {
    const realUserItems = [...userItems].map((u) => ({
      ...u,
      isDummy: false,
    }));

    // 3 dummy items max, skip ones user has "deleted"
    const dummyExamples = allItems
        .filter((item) => !item.isUserAdded && !hiddenDummyIds.includes(item.id))
        .slice(0, 3)
        .map((d) => ({
          ...d,
          isUserAdded: true, // so badges & delete show
          isDummy: true,
        }));

    // Show real user items first, then dummy examples
    const combined = [...realUserItems.reverse(), ...dummyExamples];
    return combined;
  }, [userItems, allItems, hiddenDummyIds]);

  const stats = useMemo(() => {
    const activeListings = recentUploads.length;

    const totalEarnings = (
        recentUploads
            .map((t) => parseFloat(String(t.price).replace(/[^0-9.]/g, '')) || 0)
            .reduce((a, b) => a + b, 0) * 1.5
    ).toFixed(1);

    const notificationsCount = activeListings;

    return { activeListings, totalEarnings, notificationsCount };
  }, [recentUploads]);

  const notifications = useMemo(() => {
    const baseNotifications = [];

    // Only real user items produce notifications (optional choice)
    userItems.slice(0, 3).forEach((item, index) => {
      baseNotifications.push({
        id: `user_${item.id}`,
        icon: 'checkmark-done-circle',
        iconColor: '#3FA268',
        title: 'Item added successfully',
        detail: `${item.name} is now available`,
        time: index === 0 ? 'Just now' : `${index}h ago`,
      });
    });

    return baseNotifications;
  }, [userItems]);

  const handlePotentialIncome = () => {
    navigation.navigate('PotentialIncome');
  };

  const handleYourItems = () => {
    navigation.navigate('YourItems');
  };

  const handleUpdates = () => {
    navigation.navigate('Updates');
  };

  const handleDeleteItem = (item) => {
    Alert.alert(
        'Delete Item',
        `Are you sure you want to delete "${item.name}"?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              if (item.isDummy) {
                // Locally hide dummy item; do NOT touch backend
                setHiddenDummyIds((prev) =>
                    prev.includes(item.id) ? prev : [...prev, item.id]
                );
                return;
              }

              // Real user item: call context delete
              await deleteItem(item.id);
            },
          },
        ],
        { cancelable: true }
    );
  };

  const renderUploadCard = (item) => {
    const currentPriceNum =
        parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
    const originalPriceNum = Math.round(currentPriceNum * 1.3);
    const priceUnit =
        String(item.price).match(/\/\w+/)?.[0] ?? '';

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
              key={item.id}
              style={styles.toolCard}
              onPress={() => navigation.navigate('ItemAnalytics', { item })}
              onPressIn={() => {
                Animated.spring(scaleAnim, {
                  toValue: 0.97,
                  useNativeDriver: true,
                }).start();
              }}
              onPressOut={() => {
                Animated.spring(scaleAnim, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start();
              }}
              activeOpacity={0.9}
          >
            <View style={styles.toolImg}>
              {item.images && item.images.length > 0 ? (
                  <Image
                      source={{ uri: item.images[0] }}
                      style={styles.toolImage}
                      resizeMode="cover"
                  />
              ) : item.image ? (
                  <Image
                      source={item.image}
                      style={styles.toolImage}
                      resizeMode="cover"
                  />
              ) : (
                  <Text style={styles.toolIcon}>📦</Text>
              )}
              {item.isUserAdded && (
                  <>
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>NEW</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => handleDeleteItem(item)}
                    >
                      <Ionicons name="trash-outline" size={18} color="white" />
                    </TouchableOpacity>
                  </>
              )}
            </View>
            <View style={styles.toolCardContent}>
              <Text style={styles.toolName} numberOfLines={2}>
                {item.name}
              </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.originalPrice}>
                  ${originalPriceNum}
                  {priceUnit}
                </Text>
                <Text style={styles.currentPrice}>{item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
    );
  };

  // Drawer item handlers
  const goAccount = () => {
    closeDrawer();
    navigation.navigate('Main', { screen: 'Profile' });
  };
  const goWhatToBuy = () => {
    closeDrawer();
    navigation.navigate('Main');
  };
  const goTopItems = () => {
    if (scrollRef.current) scrollRef.current.scrollTo({ y: 0, animated: true });
    closeDrawer();
  };
  const goSettings = () => {
    closeDrawer();
    navigation.navigate('Settings');
  };

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Top Section */}
        <View style={styles.topSection}>
          <Animated.View style={[styles.appBar, { opacity: appBarAnim }]}>
            <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
              <Ionicons name="menu" size={24} color="#6B6B6B" />
            </TouchableOpacity>
            <View style={styles.appBarCenter}>
              <Text style={styles.appBarTitle}>Dashboard</Text>
              <Text style={styles.appBarSubtitle}>Welcome back, Seller 👋</Text>
            </View>
            <TouchableOpacity style={styles.avatarButton}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>S</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
              style={[
                styles.searchBarContainer,
                {
                  opacity: searchBarAnim,
                  transform: [{ translateY: slideAnim }, { scale: searchScaleAnim }],
                },
              ]}
          >
            <View
                style={[
                  styles.searchBar,
                  searchFocused && styles.searchBarFocused,
                ]}
            >
              <Ionicons
                  name="search"
                  size={20}
                  color="#6B6B6B"
                  style={styles.searchIcon}
              />
              <TextInput
                  style={styles.searchInput}
                  placeholder="Search your listings..."
                  placeholderTextColor="#8A8A8A"
                  value={searchText}
                  onChangeText={setSearchText}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
              />
            </View>
          </Animated.View>
        </View>

        {/* Metrics Row */}
        <Animated.View
            style={[
              styles.statsRow,
              {
                opacity: metricsAnim,
                transform: [
                  {
                    translateY: metricsAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [15, 0],
                    }),
                  },
                ],
              },
            ]}
        >
          <TouchableOpacity
              style={[styles.statCard, styles.earningsCard]}
              activeOpacity={0.8}
              onPress={handlePotentialIncome}
          >
            <Ionicons
                name="cash-outline"
                size={24}
                color="#6BAA38"
                style={styles.statIcon}
            />
            <Text style={styles.statValue}>${stats.totalEarnings}</Text>
            <Text style={styles.statLabel}>Potential</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statCard} activeOpacity={0.8} onPress={handleYourItems}>
            <Ionicons
                name="cube-outline"
                size={24}
                color="#6BAA38"
                style={styles.statIcon}
            />
            <Text style={styles.statValue}>{stats.activeListings}</Text>
            <Text style={styles.statLabel}>Your Items</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statCard} activeOpacity={0.8} onPress={handleUpdates}>
            <Ionicons
                name="notifications-outline"
                size={24}
                color="#6BAA38"
                style={styles.statIcon}
            />
            <Text style={styles.statValue}>{stats.notificationsCount}</Text>
            <Text style={styles.statLabel}>Updates</Text>
          </TouchableOpacity>
        </Animated.View>

        <ScrollView
            ref={scrollRef}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
        >
          {/* Recent Uploads / Listings */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Your Listings ({recentUploads.length})
              </Text>
              {recentUploads.length === 0 && (
                  <TouchableOpacity
                      onPress={() => navigation.navigate('AddItem')}
                  >
                    <Text style={styles.sectionAction}>Add item</Text>
                  </TouchableOpacity>
              )}
            </View>

            {/* Empty state only if no user + no dummy (all deleted) */}
            {recentUploads.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>📦</Text>
                  <Text style={styles.emptyTitle}>No items yet</Text>
                  <Text style={styles.emptyText}>
                    Start by adding your first item to rent out!
                  </Text>
                  <TouchableOpacity
                      style={styles.emptyButton}
                      onPress={() => navigation.navigate('AddItem')}
                  >
                    <Text style={styles.emptyButtonText}>
                      Add Your First Item
                    </Text>
                  </TouchableOpacity>
                </View>
            )}

            {/* Always show current items (real + dummy that are not deleted) */}
            <View style={styles.toolList}>
              {recentUploads.map((t) => (
                  <View key={t.id} style={styles.toolCardWrapper}>
                    {renderUploadCard(t)}
                  </View>
              ))}
            </View>
          </View>

          {/* Latest Notifications */}
          {notifications.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Recent Activity</Text>
                </View>
                <View style={styles.notificationsList}>
                  {notifications.map((n) => (
                      <TouchableOpacity
                          key={n.id}
                          style={styles.notificationItem}
                          activeOpacity={0.8}
                      >
                        <View
                            style={[
                              styles.notificationIconContainer,
                              { backgroundColor: `${n.iconColor}15` },
                            ]}
                        >
                          <Ionicons name={n.icon} size={22} color={n.iconColor} />
                        </View>
                        <View style={styles.notificationContent}>
                          <Text style={styles.notificationTitle}>{n.title}</Text>
                          <Text style={styles.notificationDetail}>{n.detail}</Text>
                        </View>
                        <Text style={styles.notificationTime}>{n.time}</Text>
                      </TouchableOpacity>
                  ))}
                </View>
              </View>
          )}
        </ScrollView>

        {/* Drawer */}
        {drawerOpen && (
            <View style={styles.drawerOverlay} pointerEvents="box-none">
              <TouchableOpacity
                  style={styles.drawerBackdrop}
                  activeOpacity={1}
                  onPress={closeDrawer}
              />
              <Animated.View
                  style={[
                    styles.drawer,
                    { transform: [{ translateX: drawerAnim }] },
                  ]}
              >
                <Text style={styles.drawerTitle}>Menu</Text>
                <TouchableOpacity style={styles.drawerItem} onPress={goAccount}>
                  <Ionicons
                      name="person-outline"
                      size={20}
                      color="#6BAA38"
                      style={styles.drawerItemIcon}
                  />
                  <Text style={styles.drawerItemText}>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={goWhatToBuy}>
                  <Ionicons
                      name="cart-outline"
                      size={20}
                      color="#6BAA38"
                      style={styles.drawerItemIcon}
                  />
                  <Text style={styles.drawerItemText}>Browse Items</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={goTopItems}>
                  <Ionicons
                      name="star-outline"
                      size={20}
                      color="#6BAA38"
                      style={styles.drawerItemIcon}
                  />
                  <Text style={styles.drawerItemText}>Top of page</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={goSettings}>
                  <Ionicons
                      name="settings-outline"
                      size={20}
                      color="#6BAA38"
                      style={styles.drawerItemIcon}
                  />
                  <Text style={styles.drawerItemText}>Settings</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
        )}

        {/* Floating Add Button */}
        <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate('AddItem')}
            activeOpacity={0.85}
        >
          <Ionicons name="add" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F6',
  },
  topSection: {
    backgroundColor: '#F9FAF7',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
    zIndex: 0,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    marginBottom: 8,
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarCenter: {
    flex: 1,
    alignItems: 'center',
  },
  appBarTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  appBarSubtitle: {
    fontSize: 13,
    color: '#6B6B6B',
    fontWeight: '400',
    marginTop: 2,
  },
  avatarButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#C4C9A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  searchBarContainer: {
    marginBottom: 0,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 22,
    height: 44,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchBarFocused: {
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '400',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    minHeight: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
  },
  earningsCard: {
    backgroundColor: '#F0F7E8',
    borderColor: 'rgba(107, 170, 56, 0.15)',
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#6B6B6B',
    fontWeight: '500',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
    marginTop: 24,
  },
  sectionHeader: {
    marginHorizontal: 24,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  sectionAction: {
    fontSize: 15,
    color: '#6BAA38',
    fontWeight: '500',
  },
  toolList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    paddingBottom: 10,
    gap: 12,
  },
  toolCardWrapper: {
    width: '47.5%',
  },
  toolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  toolImg: {
    backgroundColor: '#E7EBD2',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  toolImage: {
    width: '100%',
    height: '100%',
  },
  toolIcon: {
    fontSize: 40,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#C4C9A0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  newBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: 0.5,
  },
  deleteBtn: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF4444',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  toolCardContent: {
    padding: 14,
  },
  toolName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1A1A1A',
    minHeight: 40,
  },
  priceContainer: {
    gap: 4,
  },
  originalPrice: {
    fontSize: 14,
    color: '#9B9B9B',
    textDecorationLine: 'line-through',
    fontWeight: '400',
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6BAA38',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6B6B6B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#6BAA38',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  notificationsList: {
    backgroundColor: 'transparent',
    marginHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  notificationDetail: {
    fontSize: 14,
    color: '#6B6B6B',
    fontWeight: '400',
    lineHeight: 19.6,
  },
  notificationTime: {
    fontSize: 12,
    color: '#A0A0A0',
    fontWeight: '400',
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  drawerBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 280,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 24,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  drawerItemIcon: {
    marginRight: 16,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6BAA38',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
});
