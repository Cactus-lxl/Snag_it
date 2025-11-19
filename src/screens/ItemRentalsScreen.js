import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';

function parsePriceToNumber(priceStr) {
  const num = parseFloat(String(priceStr).replace(/[^0-9.]/g, '')) || 0;
  return num;
}

function buildRentals(item) {
  const names = ['Alex Johnson', 'Sam Rivera', 'Priya Mehta', 'Chris Lee', 'Jordan Kim', 'Taylor Brown', 'Jamie Chen', 'Ava Patel'];
  const statuses = ['Completed', 'Ongoing', 'Scheduled'];
  const when = ['Today', 'Yesterday', '2 days ago', 'Last week', 'Next week'];
  const base = typeof item.id === 'number' ? item.id : String(item.id || item.name || '').length;
  const rate = parsePriceToNumber(item.price);

  const rentals = Array.from({ length: 6 }).map((_, i) => {
    const duration = (base + i) % 3 + 1; // 1-3 (hours or days)
    const amount = (rate * duration) || 0;
    const name = names[(base + i) % names.length];
    const status = statuses[(base + i) % statuses.length];
    const whenText = when[(base + i) % when.length];
    return {
      id: `${item.id}-${i}`,
      name,
      status,
      when: whenText,
      duration,
      amount: amount.toFixed(2),
    };
  });

  return rentals;
}

export default function ItemRentalsScreen({ navigation, route }) {
  const item = route?.params?.item || { id: 'x', name: 'Item', price: '$0' };
  const rentals = useMemo(() => buildRentals(item), [item]);
  const totalRevenue = useMemo(() => rentals.reduce((sum, r) => sum + parseFloat(r.amount), 0).toFixed(2), [rentals]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{item.name}</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total revenue</Text>
            <Text style={styles.summaryValue}>${totalRevenue}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total rentals</Text>
            <Text style={styles.summaryValue}>{rentals.length}</Text>
          </View>
        </View>

        {/* Queue / History */}
        <Text style={styles.sectionTitle}>Renter queue & history</Text>
        <View style={styles.list}>
          {rentals.map((r) => (
            <View key={r.id} style={styles.listItem}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{(r.name[0] || 'U').toUpperCase()}</Text>
              </View>
              <View style={styles.itemBody}>
                <Text style={styles.itemTitle}>{r.name}</Text>
                <Text style={styles.itemSubtitle}>{r.status} • {r.when}</Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemAmount}>${r.amount}</Text>
                <Text style={styles.itemMeta}>x{r.duration}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F3' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  backIcon: { fontSize: 20, color: '#1A1A1A', marginTop: -2 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  content: { padding: 20, gap: 14, paddingBottom: 40 },

  summaryCard: { backgroundColor: 'white', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, gap: 10 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  summaryLabel: { fontSize: 14, color: '#4B4B4B', fontWeight: '600' },
  summaryValue: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  divider: { height: 1, backgroundColor: '#EEE' },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', marginTop: 6 },
  list: { marginTop: 8, gap: 10 },
  listItem: { backgroundColor: 'white', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#C4C9A0', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  itemBody: { flex: 1 },
  itemTitle: { fontSize: 15, fontWeight: '700', color: '#1A1A1A' },
  itemSubtitle: { fontSize: 12, color: '#6B6B6B', marginTop: 2 },
  itemRight: { alignItems: 'flex-end' },
  itemAmount: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  itemMeta: { fontSize: 12, color: '#6B6B6B' },
});
