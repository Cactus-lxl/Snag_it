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
  Alert,
} from 'react-native';
import tools from '../data/tool';

export default function SellerDashboardScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const scrollRef = useRef(null);

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

  const recentUploads = useMemo(() => {
    // Mock: last 6 items as recently uploaded
    return [...tools].slice(-6).reverse();
  }, []);

  const stats = useMemo(() => {
    const activeListings = tools.length;
    const totalEarnings = (
      tools
        .map((t) => parseFloat(String(t.price).replace(/[^0-9.]/g, '')) || 0)
        .reduce((a, b) => a + b, 0) * 1.1 // mock multiplier to simulate lifetime revenue
    ).toFixed(1);
    const notificationsCount = 3;
    return { activeListings, totalEarnings, notificationsCount };
  }, []);

  const notifications = [
    { id: 'n1', icon: '🔔', title: 'New message', detail: 'Alex asked about your Cordless Drill', time: '2m ago' },
    { id: 'n2', icon: '✅', title: 'Listing approved', detail: 'Paint Sprayer is now live', time: '1h ago' },
    { id: 'n3', icon: '💰', title: 'Payout processed', detail: '$84.00 sent to your bank', time: 'Yesterday' },
  ];

  const renderUploadCard = (item) => {
    const currentPriceNum = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
    const originalPriceNum = Math.round(currentPriceNum * 1.3);
    const priceUnit = String(item.price).match(/\/\w+/) ? String(item.price).match(/\/\w+/)[0] : '';

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.toolCard}
        onPress={() => navigation.navigate('ItemRentals', { item })}
      >
        <View style={styles.toolImg}>
          <Text style={styles.toolIcon}>🧰</Text>
        </View>
        <View style={styles.toolCardContent}>
          <Text style={styles.toolName}>{item.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>${originalPriceNum}{priceUnit}</Text>
            <Text style={styles.currentPrice}>{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Drawer item handlers
  const goAccount = () => {
    closeDrawer();
    navigation.navigate('Account');
  };
  const goWhatToBuy = () => {
    closeDrawer();
    navigation.navigate('Dashboard', { initialTab: 'Buy' });
  };
  const goTopItems = () => {
    if (scrollRef.current) scrollRef.current.scrollTo({ y: 0, animated: true });
    closeDrawer();
  };
  const goSettings = () => {
    closeDrawer();
    Alert.alert('Settings', 'Settings coming soon');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={openDrawer}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search your listings..."
          placeholderTextColor="#6B6B6B"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>

      <ScrollView ref={scrollRef} style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.earningsCard]}>
            <Text style={styles.statLabel}>Total Made</Text>
            <Text style={styles.statValue}>${stats.totalEarnings}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Active Listings</Text>
            <Text style={styles.statValue}>{stats.activeListings}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Notifications</Text>
            <Text style={styles.statValue}>{stats.notificationsCount}</Text>
          </View>
        </View>

        {/* Recent Uploads */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent uploads</Text>
            <TouchableOpacity><Text style={styles.sectionAction}>View all</Text></TouchableOpacity>
          </View>
          <View style={styles.toolList}>
            {recentUploads.map((t) => (
              <View key={t.id} style={styles.toolCardWrapper}>
                {renderUploadCard(t)}
              </View>
            ))}
          </View>
        </View>

        {/* Latest Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest notifications</Text>
          </View>
          <View style={styles.notificationsList}>
            {notifications.map((n) => (
              <View key={n.id} style={styles.notificationItem}>
                <Text style={styles.notificationIcon}>{n.icon}</Text>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{n.title}</Text>
                  <Text style={styles.notificationDetail}>{n.detail}</Text>
                </View>
                <Text style={styles.notificationTime}>{n.time}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <View style={styles.drawerOverlay} pointerEvents="box-none">
          <TouchableOpacity style={styles.drawerBackdrop} activeOpacity={1} onPress={closeDrawer} />
          <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}>
            <Text style={styles.drawerTitle}>Menu</Text>
            <TouchableOpacity style={styles.drawerItem} onPress={goAccount}>
              <Text style={styles.drawerItemIcon}>👤</Text>
              <Text style={styles.drawerItemText}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={goWhatToBuy}>
              <Text style={styles.drawerItemIcon}>🛍️</Text>
              <Text style={styles.drawerItemText}>What to buy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={goTopItems}>
              <Text style={styles.drawerItemIcon}>⭐</Text>
              <Text style={styles.drawerItemText}>Top items</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={goSettings}>
              <Text style={styles.drawerItemIcon}>⚙️</Text>
              <Text style={styles.drawerItemText}>Settings</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      {/* Floating Add Item Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddItem')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Base layout — matching buyer dashboard palette and spacing
  container: {
    flex: 1,
    backgroundColor: '#FAF8F3',
  },
  scrollView: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  menuIcon: {
    fontSize: 24,
    color: '#6B6B6B',
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  searchIcon: {
    fontSize: 20,
    color: '#6B6B6B',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  earningsCard: {
    backgroundColor: '#C4C9A0',
  },
  statLabel: {
    fontSize: 12,
    color: '#4B4B4B',
    marginBottom: 6,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  // Sections
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    marginHorizontal: 20,
    marginBottom: 12,
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
    fontSize: 14,
    color: '#1A1A1A',
    opacity: 0.7,
    fontWeight: '600',
  },

  // Tool cards (reuse buyer look)
  toolList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 10,
    gap: 15,
  },
  toolCardWrapper: {
    width: '47%',
  },
  toolCard: {
    backgroundColor: 'white',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  toolImg: {
    backgroundColor: '#F4A89F',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolIcon: {
    fontSize: 48,
  },
  toolCardContent: {
    padding: 15,
  },
  toolName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  priceContainer: {
    gap: 4,
  },
  originalPrice: {
    fontSize: 14,
    color: '#6B6B6B',
    textDecorationLine: 'line-through',
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  // Notifications
  notificationsList: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  notificationItem: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  notificationIcon: {
    fontSize: 22,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  notificationDetail: {
    fontSize: 13,
    color: '#4B4B4B',
  },
  notificationTime: {
    fontSize: 12,
    color: '#6B6B6B',
  },

  // Drawer styles
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
    backgroundColor: 'white',
    paddingTop: 30,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  drawerItemIcon: {
    fontSize: 20,
    width: 28,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },

  // Floating Action Button
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#C4C9A0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 28,
    lineHeight: 28,
  },
});
