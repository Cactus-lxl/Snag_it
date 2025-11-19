import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useItems } from '../context/ItemsContext';

export default function PotentialIncomeScreen({ navigation, route }) {
    const { getUserItems, getAllItems } = useItems();
    const userItems = getUserItems();
    const allItems = getAllItems();

    // Get hiddenDummyIds from route params (passed from dashboard) or use empty array
    const hiddenDummyIds = route?.params?.hiddenDummyIds || [];

    // Calculate items including non-deleted dummy items (same logic as dashboard)
    const allItemsForCalculation = useMemo(() => {
        const realUserItems = [...userItems];

        // Get dummy items that haven't been deleted
        const dummyItems = allItems
            .filter((item) => !item.isUserAdded && !hiddenDummyIds.includes(item.id))
            .slice(0, 3);

        return [...realUserItems, ...dummyItems];
    }, [userItems, allItems, hiddenDummyIds]);

    const stats = useMemo(() => {
        // Sum up all item prices (user items + non-deleted dummy items)
        const totalDailyValue = allItemsForCalculation.reduce((sum, item) => {
            const price = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
            return sum + price;
        }, 0);

        // Apply 1.5x multiplier for "potential" optimistic earnings
        // (This simulates items being rented with good utilization + tips/extras)
        const dailyAverage = (totalDailyValue * 1.5).toFixed(0);

        // Calculate monthly and yearly based on daily average
        const monthlyEstimate = (parseFloat(dailyAverage) * 30).toFixed(0);
        const yearlyEstimate = (parseFloat(dailyAverage) * 365).toFixed(0);

        // Per item average (monthly earnings / number of items)
        const averagePerItem = allItemsForCalculation.length > 0
            ? (parseFloat(monthlyEstimate) / allItemsForCalculation.length).toFixed(0)
            : 0;

        return {
            dailyAverage,
            monthlyEstimate,
            yearlyEstimate,
            averagePerItem,
            totalItems: allItemsForCalculation.length,
            userItemsCount: userItems.length,
            dummyItemsCount: allItemsForCalculation.length - userItems.length,
        };
    }, [allItemsForCalculation, userItems.length]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Potential Income</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.heroSection}>
                    <View style={styles.heroIconContainer}>
                        <Ionicons name="trending-up" size={40} color="#6BAA38" />
                    </View>
                    <Text style={styles.heroTitle}>Your Earning Potential</Text>
                    <Text style={styles.heroSubtitle}>
                        Based on {stats.totalItems} active listing{stats.totalItems !== 1 ? 's' : ''}
                    </Text>
                    {stats.dummyItemsCount > 0 && (
                        <Text style={styles.heroNote}>
                            Includes {stats.dummyItemsCount} example item{stats.dummyItemsCount > 1 ? 's' : ''}
                        </Text>
                    )}
                </View>

                <View style={styles.statsContainer}>
                    <View style={[styles.statCard, styles.primaryCard]}>
                        <View style={styles.statHeader}>
                            <Ionicons name="calendar-outline" size={24} color="#6BAA38" />
                            <Text style={styles.statLabel}>Daily Average</Text>
                        </View>
                        <Text style={styles.statValue}>${stats.dailyAverage}</Text>
                        <Text style={styles.statSubtext}>Estimated daily earnings</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={styles.statHeader}>
                            <Ionicons name="calendar" size={24} color="#6BAA38" />
                            <Text style={styles.statLabel}>Monthly Estimate</Text>
                        </View>
                        <Text style={styles.statValue}>${stats.monthlyEstimate}</Text>
                        <Text style={styles.statSubtext}>Projected monthly income</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={styles.statHeader}>
                            <Ionicons name="stats-chart" size={24} color="#6BAA38" />
                            <Text style={styles.statLabel}>Yearly Estimate</Text>
                        </View>
                        <Text style={styles.statValue}>${stats.yearlyEstimate}</Text>
                        <Text style={styles.statSubtext}>Annual projection</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={styles.statHeader}>
                            <Ionicons name="cube-outline" size={24} color="#6BAA38" />
                            <Text style={styles.statLabel}>Per Item (Monthly)</Text>
                        </View>
                        <Text style={styles.statValue}>${stats.averagePerItem}</Text>
                        <Text style={styles.statSubtext}>Average per item</Text>
                    </View>
                </View>

                <View style={styles.tipsSection}>
                    <View style={styles.tipsSectionHeader}>
                        <Ionicons name="bulb" size={24} color="#FFA500" />
                        <Text style={styles.tipsSectionTitle}>Maximize Your Earnings</Text>
                    </View>

                    <View style={styles.tipCard}>
                        <View style={styles.tipNumber}>
                            <Text style={styles.tipNumberText}>1</Text>
                        </View>
                        <View style={styles.tipContent}>
                            <Text style={styles.tipTitle}>Add More Items</Text>
                            <Text style={styles.tipText}>
                                Each new listing increases your potential income. List items you're not using!
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tipCard}>
                        <View style={styles.tipNumber}>
                            <Text style={styles.tipNumberText}>2</Text>
                        </View>
                        <View style={styles.tipContent}>
                            <Text style={styles.tipTitle}>Quality Photos</Text>
                            <Text style={styles.tipText}>
                                Clear, well-lit photos can increase bookings by up to 40%.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tipCard}>
                        <View style={styles.tipNumber}>
                            <Text style={styles.tipNumberText}>3</Text>
                        </View>
                        <View style={styles.tipContent}>
                            <Text style={styles.tipTitle}>Competitive Pricing</Text>
                            <Text style={styles.tipText}>
                                Research similar items to set competitive rates that attract renters.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tipCard}>
                        <View style={styles.tipNumber}>
                            <Text style={styles.tipNumberText}>4</Text>
                        </View>
                        <View style={styles.tipContent}>
                            <Text style={styles.tipTitle}>Keep Calendar Updated</Text>
                            <Text style={styles.tipText}>
                                Accurate availability increases your chances of getting bookings.
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.disclaimer}>
                    <Ionicons name="information-circle-outline" size={20} color="#6B6B6B" />
                    <Text style={styles.disclaimerText}>
                        Estimates based on 1.5x multiplier for optimistic earnings potential. Actual income may vary based on demand, seasonality, and item condition.
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.ctaButton}
                    onPress={() => navigation.navigate('AddItem')}
                >
                    <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
                    <Text style={styles.ctaButtonText}>Add More Items</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9F9F6' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
    scrollView: { flex: 1 },
    heroSection: { alignItems: 'center', paddingVertical: 40, paddingHorizontal: 24, backgroundColor: 'white', marginBottom: 20 },
    heroIconContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#F0F7E8', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
    heroTitle: { fontSize: 28, fontWeight: '700', color: '#1A1A1A', marginBottom: 8 },
    heroSubtitle: { fontSize: 16, color: '#6B6B6B', fontWeight: '400' },
    heroNote: { fontSize: 13, color: '#9B9B9B', fontWeight: '400', marginTop: 4, fontStyle: 'italic' },
    statsContainer: { paddingHorizontal: 20, gap: 16, marginBottom: 32 },
    statCard: { backgroundColor: 'white', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.04)' },
    primaryCard: { backgroundColor: '#F0F7E8', borderColor: 'rgba(107, 170, 56, 0.2)' },
    statHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    statLabel: { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
    statValue: { fontSize: 36, fontWeight: '700', color: '#6BAA38', marginBottom: 4 },
    statSubtext: { fontSize: 14, color: '#6B6B6B', fontWeight: '400' },
    tipsSection: { paddingHorizontal: 20, marginBottom: 24 },
    tipsSectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
    tipsSectionTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
    tipCard: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    tipNumber: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#6BAA38', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    tipNumberText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
    tipContent: { flex: 1 },
    tipTitle: { fontSize: 16, fontWeight: '600', color: '#1A1A1A', marginBottom: 4 },
    tipText: { fontSize: 14, color: '#6B6B6B', lineHeight: 20 },
    disclaimer: { flexDirection: 'row', backgroundColor: '#FFF9E6', borderRadius: 12, padding: 16, marginHorizontal: 20, marginBottom: 24, gap: 8 },
    disclaimerText: { flex: 1, fontSize: 13, color: '#6B6B6B', lineHeight: 18 },
    ctaButton: { flexDirection: 'row', backgroundColor: '#6BAA38', marginHorizontal: 20, marginBottom: 40, paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 4 },
    ctaButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});