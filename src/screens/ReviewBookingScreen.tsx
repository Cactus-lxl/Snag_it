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
import { DateRange, PriceBreakdown } from '../types';
import { formatDateRange } from '../utils/dateUtils';
import { formatCurrency, diffDays } from '../utils/priceCalculator';

interface ReviewBookingScreenProps {
  navigation: any;
  route: {
    params: {
      item: any;
      dateRange: DateRange;
      priceBreakdown: PriceBreakdown;
    };
  };
}

export default function ReviewBookingScreen({ navigation, route }: ReviewBookingScreenProps) {
  const { item, dateRange, priceBreakdown } = route.params;

  const handlePayment = () => {
    // Navigate to payment screen
    navigation.navigate('Payment', {
      item,
      dateRange,
      priceBreakdown,
    });
  };

  const unitLabel = useMemo(() => {
    if (!priceBreakdown.unit) return '';
    if (priceBreakdown.unit === 'hour') return 'hour';
    if (priceBreakdown.unit === 'day') return 'day';
    return 'week';
  }, [priceBreakdown.unit]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Booking</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Item Summary */}
        <View style={styles.card}>
          <View style={styles.itemRow}>
            <View style={styles.itemImageContainer}>
              {item.image ? (
                <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
              ) : (
                <Text style={styles.itemEmoji}>📦</Text>
              )}
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          </View>
        </View>

        {/* Dates */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Rental Period</Text>
          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>📅</Text>
            <Text style={styles.dateText}>{formatDateRange(dateRange.start, dateRange.end)}</Text>
          </View>
          {priceBreakdown.days && (
            <Text style={styles.daysText}>
              {priceBreakdown.days} {priceBreakdown.days === 1 ? 'day' : 'days'}
            </Text>
          )}
        </View>

        {/* Price Breakdown */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              Base price {priceBreakdown.days && `(${priceBreakdown.days} ${unitLabel}${priceBreakdown.days > 1 ? 's' : ''})`}
            </Text>
            <Text style={styles.priceValue}>{formatCurrency(priceBreakdown.base)}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service fee (10%)</Text>
            <Text style={styles.priceValue}>{formatCurrency(priceBreakdown.service)}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax (7%)</Text>
            <Text style={styles.priceValue}>{formatCurrency(priceBreakdown.tax)}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Security deposit (refundable)</Text>
            <Text style={styles.priceValue}>{formatCurrency(priceBreakdown.deposit)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(priceBreakdown.total)}</Text>
          </View>
        </View>

        {/* Info box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Your payment will be held securely. The security deposit will be refunded after the item is returned in good condition.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.footer}>
        <View style={styles.totalFooter}>
          <Text style={styles.footerLabel}>Total</Text>
          <Text style={styles.footerTotal}>{formatCurrency(priceBreakdown.total)}</Text>
        </View>
        <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
          <Text style={styles.payText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: 16,
    gap: 16,
    paddingBottom: 140,
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
  },
  itemRow: {
    flexDirection: 'row',
    gap: 12,
  },
  itemImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemEmoji: {
    fontSize: 28,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateLabel: {
    fontSize: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  daysText: {
    fontSize: 14,
    color: '#6B6B6B',
    marginTop: 8,
    marginLeft: 28,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: '#6B6B6B',
    flex: 1,
  },
  priceValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E6E6E6',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E8EAD5',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  infoIcon: {
    fontSize: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1A1A1A',
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  totalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  footerLabel: {
    fontSize: 16,
    color: '#6B6B6B',
  },
  footerTotal: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  payBtn: {
    backgroundColor: '#C4C9A0',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
});
