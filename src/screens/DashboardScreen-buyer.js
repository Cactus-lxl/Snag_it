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
  Image,
} from 'react-native';
import { useItems } from '../context/ItemsContext';
import FloatingActionButton from '../components/FloatingActionButton';
import SellerPromptBanner from '../components/SellerPromptBanner';

export default function DashboardScreen({ navigation, route }) {
  const { getAllItems } = useItems();
  const allTools = getAllItems();
  
  const [tab, setTab] = useState('Rent');
  const [searchText, setSearchText] = useState('');
  const scrollRef = useRef(null);
  const topItemsRef = useRef(null);
  const [topItemsPosition, setTopItemsPosition] = useState(0);

  useEffect(() => {
    const initialTab = route?.params?.initialTab;
    if (initialTab && (initialTab === 'Buy' || initialTab === 'Rent')) {
      setTab(initialTab);
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

  const filteredTools = allTools.filter((tool) => tool.type === tab.toLowerCase());

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
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          )}
        </View>
        <View style={styles.toolCardContent}>
          <Text style={styles.toolName} numberOfLines={2}>{item.name}</Text>
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
    navigation.navigate('Main', { screen: 'Profile' });
  };
  const goWhatToBuy = () => {
    setTab('Buy');
    if (scrollRef.current) scrollRef.current.scrollTo({ y: 0, animated: true });
    closeDrawer();
  };
  const goTopItems = () => {
    closeDrawer();
    if (scrollRef.current && topItemsPosition > 0) {
      scrollRef.current.scrollTo({ y: topItemsPosition - 20, animated: true });
    }
  };
  const goSettings = () => {
    closeDrawer();
    navigation.navigate('Settings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={openDrawer}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.searchInputContainer} 
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.searchPlaceholder}>Search tools...</Text>
        </TouchableOpacity>
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

        {/* Seller Prompt Banner */}
        <SellerPromptBanner navigation={navigation} />

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
        <View 
          ref={topItemsRef}
          onLayout={(event) => {
            const { y } = event.nativeEvent.layout;
            setTopItemsPosition(y);
          }}
        >
          <Text style={styles.toolListHeader}>
            Top items near you ({filteredTools.length})
          </Text>
          <View style={styles.toolList}>
            {filteredTools.map((tool) => (
              <View key={tool.id} style={styles.toolCardWrapper}>
                {renderToolCard({ item: tool })}
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

      {/* Floating Action Button */}
      <FloatingActionButton navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF8',
  },
  scrollView: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    height: 52,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  menuIcon: {
    fontSize: 24,
    color: '#1A1A1A',
    marginRight: 12,
  },
  searchInputContainer: {
    flex: 1,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#6B6B6B',
    letterSpacing: 0.4,
  },
  searchIcon: {
    fontSize: 20,
    color: '#6B6B6B',
  },
  toggleTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: 24,
    marginBottom: 32,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    minHeight: 44,
  },
  tabButtonActive: {
    backgroundColor: '#6BAA38',
    shadowColor: '#6BAA38',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B6B6B',
    letterSpacing: 0.4,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  categoriesSection: {
    marginHorizontal: 24,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1A1A1A',
    letterSpacing: 0.4,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    minHeight: 120,
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    letterSpacing: 0.4,
  },
  toolListHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 24,
    marginBottom: 16,
    color: '#1A1A1A',
    letterSpacing: 0.4,
  },
  toolList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 16,
  },
  toolCardWrapper: {
    width: '47%',
  },
  toolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  toolImg: {
    backgroundColor: '#F5F5F5',
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
    fontSize: 48,
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
  toolCardContent: {
    padding: 16,
  },
  toolName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1A1A1A',
    letterSpacing: 0.4,
    minHeight: 40,
  },
  priceContainer: {
    gap: 4,
  },
  originalPrice: {
    fontSize: 13,
    color: '#6B6B6B',
    textDecorationLine: 'line-through',
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6BAA38',
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
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 280,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 24,
    letterSpacing: 0.4,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    minHeight: 44,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16,16,16,0.08)',
  },
  drawerItemIcon: {
    fontSize: 24,
    width: 32,
    marginRight: 8,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    letterSpacing: 0.4,
  },
});
