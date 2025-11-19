import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { DateRange } from '../types';
import { formatDateRange } from '../utils/dateUtils';

interface BookingSuccessScreenProps {
  navigation: any;
  route: {
    params: {
      item: any;
      dateRange: DateRange;
      bookingId: string;
    };
  };
}

export default function BookingSuccessScreen({ navigation, route }: BookingSuccessScreenProps) {
  const { item, dateRange, bookingId } = route.params;

  const handleMessageSeller = () => {
    // Navigate to chat with seller
    navigation.navigate('Chat', { 
      toolId: item.id,
      bookingId: bookingId,
    });
  };

  const handleViewBookings = () => {
    // Navigate to bookings/rentals screen
    navigation.navigate('ItemRentals');
  };

  const handleDone = () => {
    // Go back to home (tab navigator)
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.checkmarkCircle}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </View>

        {/* Success message */}
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your rental has been confirmed. You'll receive a confirmation email shortly.
        </Text>

        {/* Booking details */}
        <View style={styles.card}>
          <Text style={styles.bookingId}>Booking #{bookingId}</Text>
          
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

          <View style={styles.divider} />

          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>📅 Rental Period</Text>
            <Text style={styles.dateValue}>{formatDateRange(dateRange.start, dateRange.end)}</Text>
          </View>
        </View>

        {/* Next steps */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Next Steps</Text>
          <Text style={styles.infoText}>
            • Message the seller to arrange pickup{'\n'}
            • Arrive on time and inspect the item{'\n'}
            • Return the item in good condition{'\n'}
            • Your deposit will be refunded after return
          </Text>
        </View>

        <View style={styles.spacer} />

        {/* Actions */}
        <TouchableOpacity style={styles.primaryBtn} onPress={handleMessageSeller}>
          <Text style={styles.primaryText}>Message Seller</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={handleViewBookings}>
          <Text style={styles.secondaryText}>View My Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textBtn} onPress={handleDone}>
          <Text style={styles.textBtnText}>Done</Text>
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
  content: {
    flex: 1,
    padding: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  checkmarkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#C4C9A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 48,
    color: '#1A1A1A',
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  bookingId: {
    fontSize: 12,
    color: '#6B6B6B',
    marginBottom: 12,
    textAlign: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
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
  divider: {
    height: 1,
    backgroundColor: '#E6E6E6',
    marginVertical: 12,
  },
  dateRow: {
    gap: 4,
  },
  dateLabel: {
    fontSize: 12,
    color: '#6B6B6B',
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  infoBox: {
    backgroundColor: '#E8EAD5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 22,
  },
  spacer: {
    flex: 1,
  },
  primaryBtn: {
    backgroundColor: '#C4C9A0',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
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
    marginBottom: 12,
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  textBtn: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  textBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B6B6B',
  },
});
