import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { DateRange } from '../../types';
import { buildMarkedDates, formatDateRange } from '../../utils/dateUtils';
import { getTodayISO } from '../../utils/priceCalculator';

interface DateRangePickerSheetProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (range: DateRange) => void;
  unavailableDates?: string[];
  initialRange?: DateRange;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function DateRangePickerSheet({
  visible,
  onClose,
  onConfirm,
  unavailableDates = [],
  initialRange,
}: DateRangePickerSheetProps) {
  const [range, setRange] = useState<DateRange>(initialRange || {});
  const todayISO = getTodayISO();

  useEffect(() => {
    if (visible && initialRange) {
      setRange(initialRange);
    }
  }, [visible, initialRange]);

  const handleDayPress = (day: DateData) => {
    const dateStr = day.dateString;

    // Check if date is unavailable
    if (unavailableDates.includes(dateStr)) {
      return;
    }

    // If no start date or both dates are set, start new range
    if (!range.start || (range.start && range.end)) {
      setRange({ start: dateStr, end: undefined });
    }
    // If start is set but no end, set end date
    else if (range.start && !range.end) {
      if (dateStr >= range.start) {
        setRange({ ...range, end: dateStr });
      } else {
        // If selected date is before start, make it the new start
        setRange({ start: dateStr, end: undefined });
      }
    }
  };

  const handleConfirm = () => {
    if (range.start && range.end) {
      onConfirm(range);
      onClose();
    }
  };

  const handleClear = () => {
    setRange({});
  };

  const markedDates = buildMarkedDates(range, unavailableDates);
  const isRangeComplete = range.start && range.end;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Select Dates</Text>
            <TouchableOpacity onPress={handleClear}>
              <Text style={styles.clearBtn}>Clear</Text>
            </TouchableOpacity>
          </View>

          {/* Selected range display */}
          <View style={styles.rangeDisplay}>
            <Text style={styles.rangeText}>{formatDateRange(range.start, range.end)}</Text>
            {range.start && !range.end && (
              <Text style={styles.hintText}>Select end date</Text>
            )}
          </View>

          {/* Calendar */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <Calendar
              markingType="period"
              markedDates={markedDates}
              onDayPress={handleDayPress}
              minDate={todayISO}
              theme={{
                backgroundColor: 'transparent',
                calendarBackground: 'transparent',
                selectedDayBackgroundColor: '#C4C9A0',
                selectedDayTextColor: '#1A1A1A',
                todayTextColor: '#C4C9A0',
                dayTextColor: '#1A1A1A',
                textDisabledColor: '#999',
                monthTextColor: '#1A1A1A',
                textMonthFontWeight: '700',
                textMonthFontSize: 18,
                textDayFontSize: 16,
                textDayHeaderFontSize: 13,
                textDayHeaderFontWeight: '600',
              }}
            />
          </ScrollView>

          {/* Confirm button */}
          <TouchableOpacity
            style={[styles.confirmBtn, !isRangeComplete && styles.confirmBtnDisabled]}
            onPress={handleConfirm}
            disabled={!isRangeComplete}
          >
            <Text style={[styles.confirmText, !isRangeComplete && styles.confirmTextDisabled]}>
              Confirm Dates
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.85,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  closeBtn: {
    fontSize: 24,
    color: '#6B6B6B',
    width: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  clearBtn: {
    fontSize: 16,
    color: '#C4C9A0',
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  rangeDisplay: {
    padding: 20,
    alignItems: 'center',
  },
  rangeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  hintText: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  confirmBtn: {
    backgroundColor: '#C4C9A0',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
  },
  confirmBtnDisabled: {
    backgroundColor: '#E6E6E6',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  confirmTextDisabled: {
    color: '#999',
  },
});
