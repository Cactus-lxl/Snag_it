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
import { categoryItems, getCategoryIcon } from '../data/categories';

export default function CategoryScreen({ navigation, route }) {
  const name = route?.params?.name || 'Category';
  const items = useMemo(() => categoryItems[name] || [], [name]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getCategoryIcon(name)} {name}</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Top {name.toLowerCase()} rentals near you</Text>

        <View style={styles.grid}>
          {items.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card} onPress={() => navigation.navigate('ItemDetail', { item })}>
              <View style={styles.cardImg}>
                {item.image ? (
                  <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
                ) : (
                  <Text style={styles.cardIcon}>📦</Text>
                )}
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    overflow: 'hidden',
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImg: {
    backgroundColor: '#F5F5F5',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardIcon: {
    fontSize: 36,
  },
  cardBody: {
    padding: 12,
  },
  cardName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
});
