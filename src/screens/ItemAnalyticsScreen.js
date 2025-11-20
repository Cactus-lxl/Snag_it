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
import { Ionicons } from '@expo/vector-icons';

export default function ItemAnalyticsScreen({ navigation, route }) {
    const { item } = route.params;

    // Generate mock analytics data based on item
    const analytics = useMemo(() => {
        const basePrice = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 25;

        // Generate realistic rental data
        const timesRented = Math.floor(Math.random() * 15) + 3; // 3-17 times
        const averageRentalDays = Math.floor(Math.random() * 3) + 2; // 2-4 days average
        const totalDaysRented = timesRented * averageRentalDays;
        const totalRevenue = (basePrice * totalDaysRented).toFixed(2);
        const averageRevenuePerRental = (parseFloat(totalRevenue) / timesRented).toFixed(2);

        // Calculate utilization (assume item has been listed for 90 days)
        const daysListed = 90;
        const utilizationRate = ((totalDaysRented / daysListed) * 100).toFixed(1);

        // Rating data
        const averageRating = (4.2 + Math.random() * 0.8).toFixed(1); // 4.2-5.0
        const totalReviews = timesRented - Math.floor(Math.random() * 3); // Most rentals get reviews

        // Recent rentals (mock data)
        const recentRentals = [
            { id: 1, renter: 'Sarah M.', date: '2 days ago', duration: '3 days', amount: (basePrice * 3).toFixed(2), status: 'completed' },
            { id: 2, renter: 'Mike J.', date: '1 week ago', duration: '2 days', amount: (basePrice * 2).toFixed(2), status: 'completed' },
            { id: 3, renter: 'Emily R.', date: '2 weeks ago', duration: '4 days', amount: (basePrice * 4).toFixed(2), status: 'completed' },
            { id: 4, renter: 'David K.', date: '3 weeks ago', duration: '2 days', amount: (basePrice * 2).toFixed(2), status: 'completed' },
        ].slice(0, Math.min(timesRented, 4));

        return {
            timesRented,
            totalRevenue,
            averageRentalDays,
            totalDaysRented,
            averageRevenuePerRental,
            utilizationRate,
            averageRating,
            totalReviews,
            recentRentals,
            dailyPrice: basePrice.toFixed(2),
        };
    }, [item]);

    const renderStatCard = (icon, label, value, subtitle, color = '#6BAA38') => (
        <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: `${color}15` }]}>
                <Ionicons name={icon} size={24} color={color} />
            </View>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
            {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Item Analytics</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Item Overview */}
                <View style={styles.itemOverview}>
                    <View style={styles.itemImageContainer}>
                        {item.images && item.images.length > 0 ? (
                            <Image source={{ uri: item.images[0] }} style={styles.itemImage} resizeMode="cover" />
                        ) : item.image ? (
                            <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
                        ) : (
                            <View style={styles.itemImagePlaceholder}>
                                <Text style={styles.itemEmoji}>📦</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <View style={styles.itemPriceRow}>
                            <Ionicons name="pricetag" size={18} color="#6BAA38" />
                            <Text style={styles.itemPrice}>{item.price}</Text>
                        </View>
                        {item.category && (
                            <View style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{item.category}</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Key Metrics */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Performance Overview</Text>
                    <View style={styles.metricsGrid}>
                        {renderStatCard('cash-outline', 'Total Revenue', `$${analytics.totalRevenue}`, 'All time earnings', '#6BAA38')}
                        {renderStatCard('repeat-outline', 'Times Rented', analytics.timesRented, 'Total bookings', '#4A90E2')}
                        {renderStatCard('trending-up-outline', 'Utilization', `${analytics.utilizationRate}%`, 'Last 90 days', '#FFA500')}
                        {renderStatCard('star', 'Rating', analytics.averageRating, `${analytics.totalReviews} reviews`, '#FFD700')}
                    </View>
                </View>

                {/* Additional Stats */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Rental Statistics</Text>
                    <View style={styles.statsContainer}>
                        <View style={styles.statRow}>
                            <View style={styles.statRowLeft}>
                                <Ionicons name="calendar-outline" size={20} color="#6B6B6B" />
                                <Text style={styles.statRowLabel}>Average Rental Duration</Text>
                            </View>
                            <Text style={styles.statRowValue}>{analytics.averageRentalDays} days</Text>
                        </View>

                        <View style={styles.statRow}>
                            <View style={styles.statRowLeft}>
                                <Ionicons name="time-outline" size={20} color="#6B6B6B" />
                                <Text style={styles.statRowLabel}>Total Days Rented</Text>
                            </View>
                            <Text style={styles.statRowValue}>{analytics.totalDaysRented} days</Text>
                        </View>

                        <View style={styles.statRow}>
                            <View style={styles.statRowLeft}>
                                <Ionicons name="cash-outline" size={20} color="#6B6B6B" />
                                <Text style={styles.statRowLabel}>Avg Revenue per Rental</Text>
                            </View>
                            <Text style={styles.statRowValue}>${analytics.averageRevenuePerRental}</Text>
                        </View>

                        <View style={styles.statRow}>
                            <View style={styles.statRowLeft}>
                                <Ionicons name="pricetag-outline" size={20} color="#6B6B6B" />
                                <Text style={styles.statRowLabel}>Daily Rate</Text>
                            </View>
                            <Text style={styles.statRowValue}>${analytics.dailyPrice}/day</Text>
                        </View>
                    </View>
                </View>

                {/* Recent Rentals */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Rentals</Text>
                        <Text style={styles.sectionSubtitle}>Last {analytics.recentRentals.length} bookings</Text>
                    </View>
                    <View style={styles.rentalsList}>
                        {analytics.recentRentals.map((rental) => (
                            <View key={rental.id} style={styles.rentalCard}>
                                <View style={styles.rentalHeader}>
                                    <View style={styles.renterInfo}>
                                        <View style={styles.renterAvatar}>
                                            <Text style={styles.renterInitial}>{rental.renter[0]}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.renterName}>{rental.renter}</Text>
                                            <Text style={styles.rentalDate}>{rental.date}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rentalAmount}>
                                        <Text style={styles.amountValue}>${rental.amount}</Text>
                                        <View style={styles.statusBadge}>
                                            <Ionicons name="checkmark-circle" size={14} color="#6BAA38" />
                                            <Text style={styles.statusText}>Completed</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.rentalDetails}>
                                    <View style={styles.rentalDetailItem}>
                                        <Ionicons name="calendar-outline" size={16} color="#6B6B6B" />
                                        <Text style={styles.rentalDetailText}>{rental.duration}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Tips Section */}
                <View style={styles.tipsCard}>
                    <View style={styles.tipsHeader}>
                        <Ionicons name="bulb" size={24} color="#FFA500" />
                        <Text style={styles.tipsTitle}>Performance Tips</Text>
                    </View>
                    <Text style={styles.tipText}>
                        💡 Your item has a {analytics.utilizationRate}% utilization rate.
                        {parseFloat(analytics.utilizationRate) > 40
                            ? " That's excellent! Keep maintaining your item well."
                            : " Consider adjusting pricing or improving photos to increase bookings."}
                    </Text>
                    <Text style={styles.tipText}>
                        ⭐ With a {analytics.averageRating} rating, you're building great trust with renters!
                    </Text>
                    <Text style={styles.tipText}>
                        📸 Items with updated photos get 30% more bookings. Consider refreshing your photos periodically.
                    </Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('AddItem', { editItem: item })}
                    >
                        <Ionicons name="create-outline" size={20} color="#6BAA38" />
                        <Text style={styles.actionButtonText}>Edit Listing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.actionButtonSecondary]}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back-outline" size={20} color="#6B6B6B" />
                        <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>Back to Dashboard</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F6',
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
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    scrollView: {
        flex: 1,
    },
    itemOverview: {
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    itemImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 12,
        backgroundColor: '#E7EBD2',
        overflow: 'hidden',
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    itemImagePlaceholder: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemEmoji: {
        fontSize: 40,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    itemPriceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8,
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6BAA38',
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#F0F7E8',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6BAA38',
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#6B6B6B',
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    statCard: {
        width: '48%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    statIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 13,
        color: '#6B6B6B',
        fontWeight: '500',
        textAlign: 'center',
    },
    statSubtitle: {
        fontSize: 11,
        color: '#9B9B9B',
        marginTop: 2,
    },
    statsContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    statRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statRowLabel: {
        fontSize: 15,
        color: '#1A1A1A',
        fontWeight: '500',
    },
    statRowValue: {
        fontSize: 16,
        color: '#6BAA38',
        fontWeight: '700',
    },
    rentalsList: {
        gap: 12,
    },
    rentalCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    rentalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    renterInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    renterAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F7E8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    renterInitial: {
        fontSize: 18,
        fontWeight: '700',
        color: '#6BAA38',
    },
    renterName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    rentalDate: {
        fontSize: 13,
        color: '#6B6B6B',
    },
    rentalAmount: {
        alignItems: 'flex-end',
    },
    amountValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#6BAA38',
        marginBottom: 4,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#6BAA38',
    },
    rentalDetails: {
        flexDirection: 'row',
        gap: 16,
    },
    rentalDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    rentalDetailText: {
        fontSize: 13,
        color: '#6B6B6B',
    },
    tipsCard: {
        backgroundColor: '#FFF9E6',
        marginHorizontal: 20,
        marginBottom: 24,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#FFE5A0',
    },
    tipsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    tipsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    tipText: {
        fontSize: 14,
        color: '#6B6B6B',
        lineHeight: 20,
        marginBottom: 8,
    },
    actionButtons: {
        paddingHorizontal: 20,
        marginBottom: 40,
        gap: 12,
    },
    actionButton: {
        flexDirection: 'row',
        backgroundColor: '#F0F7E8',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: '#C4C9A0',
    },
    actionButtonSecondary: {
        backgroundColor: 'white',
        borderColor: '#E6E6E6',
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6BAA38',
    },
    actionButtonTextSecondary: {
        color: '#6B6B6B',
    },
});