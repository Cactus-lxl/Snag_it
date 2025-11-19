import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { DateRange, PriceBreakdown } from '../types';
import { formatCurrency } from '../utils/priceCalculator';
import { formatDateRange } from '../utils/dateUtils';

interface PaymentScreenProps {
  navigation: any;
  route: {
    params: {
      item: any;
      dateRange: DateRange;
      priceBreakdown: PriceBreakdown;
    };
  };
}

export default function PaymentScreen({ navigation, route }: PaymentScreenProps) {
  const { item, dateRange, priceBreakdown } = route.params;
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [processing, setProcessing] = useState(false);

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\s/g, '').replace(/\D/g, '');
    if (cleaned.length <= 16) {
      setCardNumber(formatCardNumber(cleaned));
    }
  };

  const handleExpiryChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 4) {
      setExpiryDate(formatExpiry(cleaned));
    }
  };

  const handleCvvChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 4) {
      setCvv(cleaned);
    }
  };

  const isFormValid = () => {
    return (
      cardNumber.replace(/\s/g, '').length === 16 &&
      expiryDate.length === 5 &&
      cvv.length >= 3 &&
      cardholderName.trim().length > 0
    );
  };

  const handlePayment = async () => {
    if (!isFormValid()) return;

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      // Navigate to success screen
      navigation.replace('BookingSuccess', {
        item,
        dateRange,
        bookingId: 'BK' + Date.now().toString().slice(-8),
      });
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 32 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Summary Card */}
          <View style={styles.summaryCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.dateText}>{formatDateRange(dateRange.start, dateRange.end)}</Text>
            
            <View style={styles.divider} />
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>{formatCurrency(priceBreakdown.total)}</Text>
            </View>
          </View>

          {/* Payment Method Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            
            {/* Stripe-like Payment Form */}
            <View style={styles.paymentForm}>
              {/* Card Number */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChangeText={handleCardNumberChange}
                    keyboardType="number-pad"
                    maxLength={19}
                    editable={!processing}
                  />
                  <View style={styles.cardBrands}>
                    <Text style={styles.cardBrandIcon}>💳</Text>
                  </View>
                </View>
              </View>

              {/* Expiry and CVV */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChangeText={handleExpiryChange}
                    keyboardType="number-pad"
                    maxLength={5}
                    editable={!processing}
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    value={cvv}
                    onChangeText={handleCvvChange}
                    keyboardType="number-pad"
                    maxLength={4}
                    secureTextEntry
                    editable={!processing}
                  />
                </View>
              </View>

              {/* Cardholder Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cardholder Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  value={cardholderName}
                  onChangeText={setCardholderName}
                  autoCapitalize="words"
                  editable={!processing}
                />
              </View>
            </View>
          </View>

          {/* Security Notice */}
          <View style={styles.securityNotice}>
            <Text style={styles.securityIcon}>🔒</Text>
            <View style={styles.securityTextContainer}>
              <Text style={styles.securityTitle}>Secure Payment</Text>
              <Text style={styles.securityText}>
                Your payment information is encrypted and secure. The security deposit will be refunded after the item is returned in good condition.
              </Text>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Pay Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.payBtn, (!isFormValid() || processing) && styles.payBtnDisabled]}
            onPress={handlePayment}
            disabled={!isFormValid() || processing}
          >
            {processing ? (
              <View style={styles.processingContainer}>
                <ActivityIndicator color="#1A1A1A" />
                <Text style={styles.payText}>Processing...</Text>
              </View>
            ) : (
              <Text style={styles.payText}>Pay {formatCurrency(priceBreakdown.total)}</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    flex: 1,
  },
  summaryCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E6E6E6',
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    color: '#6B6B6B',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  paymentForm: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  cardBrands: {
    position: 'absolute',
    right: 12,
  },
  cardBrandIcon: {
    fontSize: 24,
  },
  row: {
    flexDirection: 'row',
  },
  securityNotice: {
    flexDirection: 'row',
    backgroundColor: '#E8EAD5',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 20,
  },
  securityIcon: {
    fontSize: 24,
  },
  securityTextContainer: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  securityText: {
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 20,
  },
  footer: {
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
  payBtn: {
    backgroundColor: '#C4C9A0',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payBtnDisabled: {
    backgroundColor: '#E6E6E6',
  },
  payText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
