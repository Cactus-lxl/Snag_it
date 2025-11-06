import React, { useState, useRef, useEffect } from 'react';
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

export default function DashboardScreen({ navigation, route }) {
  const [tab, setTab] = useState('Rent');
  const [searchText, setSearchText] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    const initialTab = route?.params?.initialTab;
    if (initialTab && (initialTab === 'Buy' || initialTab === 'Rent')) {
      setTab(initialTab);
      // reset after handling so it doesn't persist
      navigation.setParams({ initialTab: undefined });
    }
  }, [route?.params?.initialTab]);

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

  const filteredTools = tools.filter((tool) => tool.type === tab.toLowerCase());

  const categories = [
    { name: 'Hardware', icon: '🔨' },
    { name: 'Dress', icon: '👗' },
    { name: 'Kitchen', icon: '🥣' },
    { name: 'Crafts', icon: '🎨' },
  ];

  const renderToolCard = ({ item }) => {
    const currentPriceNum = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    const originalPriceNum = Math.round(currentPriceNum * 1.3);
    const priceUnit = item.price.match(/\/\w+/) ? item.price.match(/\/\w+/)[0] : '';

    return (
      <TouchableOpacity
        style={styles.toolCard}
        onPress={() => navigation.navigate('ItemDetail', { item })}
      >
        <View style={styles.toolImg}>
          <Text style={styles.toolIcon}>🔧</Text>
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
    setTab('Buy');
    if (scrollRef.current) scrollRef.current.scrollTo({ y: 0, animated: true });
    closeDrawer();
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
          placeholder="Search tools..."
          placeholderTextColor="#6B6B6B"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>

      <ScrollView ref={scrollRef} style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Toggle Tabs */}
        <View style={styles.toggleTabs}>
          <TouchableOpacity
            style={[styles.tabButton, tab === 'Buy' && styles.tabButtonActive]}
            onPress={() => setTab('Buy')}
          >
            <Text style={[styles.tabText, tab === 'Buy' && styles.tabTextActive]}>
              Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, tab === 'Rent' && styles.tabButtonActive]}
            onPress={() => setTab('Rent')}
          >
            <Text style={[styles.tabText, tab === 'Rent' && styles.tabTextActive]}>
              Rent
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, idx) => (
              <TouchableOpacity key={idx} style={styles.categoryCard} onPress={() => navigation.navigate('Category', { name: category.name })}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tools List */}
        <Text style={styles.toolListHeader}>Top items near you</Text>
        <View style={styles.toolList}>
          {filteredTools.map((tool) => (
            <View key={tool.id} style={styles.toolCardWrapper}>
              {renderToolCard({ item: tool })}
            </View>
          ))}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  toggleTabs: {
    flexDirection: 'row',
    backgroundColor: '#E8E8E8',
    borderRadius: 35,
    marginHorizontal: 20,
    marginBottom: 25,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#C4C9A0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B6B6B',
  },
  tabTextActive: {
    color: '#1A1A1A',
  },
  categoriesSection: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1A1A1A',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  categoryCard: {
    backgroundColor: '#C4C9A0',
    padding: 30,
    borderRadius: 20,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  toolListHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 20,
    marginBottom: 20,
    color: '#1A1A1A',
  },
  toolList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 20,
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
});
