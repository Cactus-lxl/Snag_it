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
import tools from '../data/tool';

export default function DashboardScreen({ navigation, route }) {
  const [tab, setTab] = useState('Rent');
  const [searchText, setSearchText] = useState('');
  const scrollRef = useRef(null);
  const topItemsRef = useRef(null); // Add ref for top items section
  const [topItemsPosition, setTopItemsPosition] = useState(0); // Store position

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
          {item.image ? (
            <Image 
              source={item.image} 
              style={styles.toolImage}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.toolIcon}>🔧</Text>
          )}
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
    closeDrawer();
    // Scroll to the top items section using measured position
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
        <View 
          ref={topItemsRef}
          onLayout={(event) => {
            const { y } = event.nativeEvent.layout;
            setTopItemsPosition(y);
          }}
        >
          <Text style={styles.toolListHeader}>Top items near you</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF8', // offWhite - cleaner, more modern background
  },
  scrollView: {
    flex: 1,
  },
  // Search Bar - 52px height, 24px horizontal padding
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24, // 8-point grid: lg spacing
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    height: 52,
    borderRadius: 12, // input radius from design system
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  menuIcon: {
    fontSize: 24,
    color: '#1A1A1A', // textDark
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16, // body font size
    color: '#1A1A1A',
    letterSpacing: 0.4,
  },
  searchIcon: {
    fontSize: 20,
    color: '#6B6B6B', // textMuted
  },
  // Toggle Tabs - following button specs
  toggleTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', // white for better contrast
    borderRadius: 24, // button radius
    marginHorizontal: 24,
    marginBottom: 32, // xl spacing between sections
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
    minHeight: 44, // accessibility min hit area
  },
  tabButtonActive: {
    backgroundColor: '#6BAA38', // primary green
    shadowColor: '#6BAA38',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  tabText: {
    fontSize: 16, // button font size
    fontWeight: '600', // semiBold
    color: '#6B6B6B', // textMuted
    letterSpacing: 0.4,
  },
  tabTextActive: {
    color: '#FFFFFF', // white text on primary button
  },
  // Categories Section - H2 typography + proper spacing
  categoriesSection: {
    marginHorizontal: 24, // lg padding
    marginBottom: 40, // xxl spacing between main sections
  },
  sectionTitle: {
    fontSize: 20, // H2 font size
    fontWeight: '600', // semiBold
    marginBottom: 16, // md spacing
    color: '#1A1A1A', // textDark
    letterSpacing: 0.4,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16, // md spacing
  },
  // Category Cards - following card specs
  categoryCard: {
    backgroundColor: '#FFFFFF', // white cards
    padding: 20, // card padding from design system
    borderRadius: 16, // card radius
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    minHeight: 120, // ensure good proportions
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 12, // sm spacing
  },
  categoryName: {
    fontSize: 16, // body font size
    fontWeight: '600', // semiBold
    color: '#1A1A1A', // textDark
    letterSpacing: 0.4,
  },
  // Tool List Header - H2 typography
  toolListHeader: {
    fontSize: 20, // H2
    fontWeight: '600', // semiBold
    marginHorizontal: 24,
    marginBottom: 16, // md spacing
    color: '#1A1A1A', // textDark
    letterSpacing: 0.4,
  },
  toolList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24, // lg padding
    paddingBottom: 24,
    gap: 16, // md spacing between cards
  },
  toolCardWrapper: {
    width: '47%',
  },
  // Tool Cards - following card design system
  toolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16, // card radius
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  toolImg: {
    backgroundColor: '#F5F5F5', // neutral background for images
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  toolImage: {
    width: '100%',
    height: '100%',
  },
  toolIcon: {
    fontSize: 48,
  },
  toolCardContent: {
    padding: 16, // md padding for card content
  },
  toolName: {
    fontSize: 16, // body font size
    fontWeight: '600', // semiBold
    marginBottom: 8, // xs spacing
    color: '#1A1A1A', // textDark
    letterSpacing: 0.4,
  },
  priceContainer: {
    gap: 4,
  },
  originalPrice: {
    fontSize: 13, // caption size
    color: '#6B6B6B', // textMuted
    textDecorationLine: 'line-through',
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: '700', // bold
    color: '#6BAA38', // primary green for emphasis
  },

  // Drawer styles - updated with design system
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
    paddingHorizontal: 24, // lg padding
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  drawerTitle: {
    fontSize: 20, // H2
    fontWeight: '600', // semiBold
    color: '#1A1A1A', // textDark
    marginBottom: 24, // lg spacing
    letterSpacing: 0.4,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16, // md spacing
    minHeight: 44, // accessibility hit area
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16,16,16,0.08)', // divider color
  },
  drawerItemIcon: {
    fontSize: 24, // icon size from design system
    width: 32,
    marginRight: 8, // icon-text spacing
  },
  drawerItemText: {
    fontSize: 16, // body size
    fontWeight: '600', // semiBold
    color: '#1A1A1A', // textDark
    letterSpacing: 0.4,
  },
});
