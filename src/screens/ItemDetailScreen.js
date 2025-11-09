import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';

function getOwnerAndLocation(idOrName) {
  const owners = ['Alex Johnson', 'Sam Rivera', 'Priya Mehta', 'Chris Lee', 'Jordan Kim', 'Taylor Brown'];
  const locations = ['Brooklyn, NY', 'San Jose, CA', 'Austin, TX', 'Seattle, WA', 'Chicago, IL', 'Boston, MA'];
  const seed = typeof idOrName === 'number' ? idOrName : (String(idOrName).length || 0);
  const owner = owners[seed % owners.length];
  const location = locations[(seed + 3) % locations.length];
  return { owner, location };
}

export default function ItemDetailScreen({ navigation, route }) {
  const item = route?.params?.item || { name: 'Item', price: '$0', id: 'x' };
  const { owner, location } = useMemo(() => getOwnerAndLocation(item.id || item.name), [item]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Item details</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image placeholder */}
        <View style={styles.hero}>
          {item.image ? (
            <Image source={item.image} style={styles.heroImage} resizeMode="cover" />
          ) : (
            <Text style={styles.heroEmoji}>📦</Text>
          )}
        </View>

        {/* Main info */}
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>

          <View style={styles.ownerRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{(owner?.[0] || 'U').toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.ownerName}>{owner}</Text>
              <Text style={styles.ownerCaption}>Owner</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </View>

        {/* Actions */}
        <TouchableOpacity style={styles.primaryBtn} onPress={() => {}}>
          <Text style={styles.primaryText}>Rent this item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('Chat', { toolId: item.id })}>
          <Text style={styles.secondaryText}>Message owner</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  backIcon: {
    fontSize: 20,
    color: '#1A1A1A',
    marginTop: -2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  content: {
    padding: 20,
    gap: 14,
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: '#F5F5F5',
    height: 220,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroEmoji: {
    fontSize: 56,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    gap: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 10,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#C4C9A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  ownerCaption: {
    fontSize: 12,
    color: '#6B6B6B',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationIcon: {
    fontSize: 18,
  },
  locationText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  primaryBtn: {
    backgroundColor: '#C4C9A0',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  secondaryBtn: {
    backgroundColor: 'white',
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
});
