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
import { Ionicons } from '@expo/vector-icons';
import { useItems } from '../context/ItemsContext';

export default function UpdatesScreen({ navigation }) {
    const { getUserItems } = useItems();
    const userItems = getUserItems();

    const activityData = useMemo(() => {
        if (userItems.length === 0) {
            return {
                hasActivity: false,
                recentActivities: [],
                views: 0,
                favorites: 0,
                messages: 0,
            };
        }

        const recentActivities = [];

        userItems.slice(0, 5).forEach((item, i) => {
            const timeAgo = i === 0 ? 'Just now' : i === 1 ? '2 hours ago' : i === 2 ? '5 hours ago' : i === 3 ? 'Yesterday' : '2 days ago';
            recentActivities.push({
                id: `item_${item.id}`,
                type: 'listing',
                icon: 'checkmark-done-circle',
                iconColor: '#6BAA38',
                title: 'Item listed successfully',
                description: `${item.name} is now available for rent`,
                time: timeAgo,
            });
        });

        const views = Math.floor(Math.random() * 50) + 20;
        const favorites = Math.floor(Math.random() * 10) + 1;
        const messages = Math.floor(Math.random() * 5);

        if (messages > 0) {
            recentActivities.unshift({
                id: 'msg_1',
                type: 'message',
                icon: 'chatbubble',
                iconColor: '#4A90E2',
                title: 'New message received',
                description: 'A renter is interested in your item',
                time: '30 min ago',
            });
        }

        if (favorites > 2) {
            recentActivities.splice(1, 0, {
                id: 'fav_1',
                type: 'favorite',
                icon: 'heart',
                iconColor: '#FF6B6B',
                title: 'Item favorited',
                description: `${userItems[0]?.name || 'Your item'} was added to someone's wishlist`,
                time: '1 hour ago',
            });
        }

        return {
            hasActivity: true,
            recentActivities: recentActivities.slice(0, 8),
            views,
            favorites,
            messages,
        };
    }, [userItems]);

    const renderActivityCard = (activity) => {
        return (
            <TouchableOpacity key={activity.id} style={styles.activityCard} activeOpacity={0.8}>
                <View style={[styles.activityIcon, { backgroundColor: `${activity.iconColor}15` }]}>
                    <Ionicons name={activity.icon} size={24} color={activity.iconColor} />
                </View>
                <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>{activity.title}</Text>
                    <Text style={styles.activityDescription}>{activity.description}</Text>
                </View>
                <Text style={styles.activityTime}>{activity.time}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Updates</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {!activityData.hasActivity ? (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIconContainer}>
                            <Ionicons name="notifications-outline" size={80} color="#C4C9A0" />
                        </View>
                        <Text style={styles.emptyTitle}>No Activity Yet</Text>
                        <Text style={styles.emptyText}>Once you add items and start receiving rental requests, you'll see:</Text>

                        <View style={styles.featuresList}>
                            <View style={styles.featureItem}>
                                <Ionicons name="calendar" size={24} color="#6BAA38" />
                                <Text style={styles.featureText}>New booking requests</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Ionicons name="chatbubbles" size={24} color="#4A90E2" />
                                <Text style={styles.featureText}>Messages from renters</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Ionicons name="card" size={24} color="#6BAA38" />
                                <Text style={styles.featureText}>Payment confirmations</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Ionicons name="return-down-back" size={24} color="#6BAA38" />
                                <Text style={styles.featureText}>Item return notifications</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Ionicons name="star" size={24} color="#FFA500" />
                                <Text style={styles.featureText}>Reviews and ratings</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.emptyButton} onPress={() => navigation.navigate('AddItem')}>
                            <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
                            <Text style={styles.emptyButtonText}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <View style={styles.statsSection}>
                            <Text style={styles.sectionTitle}>Activity Overview</Text>
                            <View style={styles.statsGrid}>
                                <View style={styles.statCard}>
                                    <Ionicons name="eye" size={28} color="#4A90E2" />
                                    <Text style={styles.statValue}>{activityData.views}</Text>
                                    <Text style={styles.statLabel}>Total Views</Text>
                                </View>
                                <View style={styles.statCard}>
                                    <Ionicons name="heart" size={28} color="#FF6B6B" />
                                    <Text style={styles.statValue}>{activityData.favorites}</Text>
                                    <Text style={styles.statLabel}>Favorites</Text>
                                </View>
                                <View style={styles.statCard}>
                                    <Ionicons name="chatbubble" size={28} color="#6BAA38" />
                                    <Text style={styles.statValue}>{activityData.messages}</Text>
                                    <Text style={styles.statLabel}>Messages</Text>
                                </View>
                                <View style={styles.statCard}>
                                    <Ionicons name="cube" size={28} color="#6BAA38" />
                                    <Text style={styles.statValue}>{userItems.length}</Text>
                                    <Text style={styles.statLabel}>Active Items</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.activitySection}>
                            <Text style={styles.sectionTitle}>Recent Activity</Text>
                            <View style={styles.activitiesList}>
                                {activityData.recentActivities.map((activity) => renderActivityCard(activity))}
                            </View>
                        </View>

                        <View style={styles.tipsCard}>
                            <View style={styles.tipsHeader}>
                                <Ionicons name="trending-up" size={24} color="#6BAA38" />
                                <Text style={styles.tipsTitle}>Boost Your Engagement</Text>
                            </View>
                            <Text style={styles.tipText}>📊 Your items are getting noticed! Keep your availability calendar updated.</Text>
                            <Text style={styles.tipText}>💬 Quick responses lead to more bookings. Try to reply within 24 hours.</Text>
                            <Text style={styles.tipText}>⭐ Great reviews attract more renters. Provide excellent service!</Text>
                        </View>
                    </>
                )}
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
    emptyState: { alignItems: 'center', paddingVertical: 40, paddingHorizontal: 32 },
    emptyIconContainer: { marginBottom: 24 },
    emptyTitle: { fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginBottom: 12 },
    emptyText: { fontSize: 16, color: '#6B6B6B', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
    featuresList: { width: '100%', marginBottom: 32, gap: 16 },
    featureItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 12, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    featureText: { fontSize: 15, color: '#1A1A1A', fontWeight: '500' },
    emptyButton: { flexDirection: 'row', backgroundColor: '#6BAA38', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 12, alignItems: 'center', gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 4 },
    emptyButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
    statsSection: { paddingHorizontal: 20, paddingVertical: 24 },
    sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A1A', marginBottom: 16 },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    statCard: { width: '48%', backgroundColor: 'white', borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
    statValue: { fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginTop: 8, marginBottom: 4 },
    statLabel: { fontSize: 13, color: '#6B6B6B', fontWeight: '500', textAlign: 'center' },
    activitySection: { paddingHorizontal: 20, marginBottom: 24 },
    activitiesList: { gap: 12 },
    activityCard: { backgroundColor: 'white', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
    activityIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    activityContent: { flex: 1 },
    activityTitle: { fontSize: 15, fontWeight: '600', color: '#1A1A1A', marginBottom: 4 },
    activityDescription: { fontSize: 14, color: '#6B6B6B', lineHeight: 18 },
    activityTime: { fontSize: 12, color: '#A0A0A0', fontWeight: '400' },
    tipsCard: { backgroundColor: '#F0F7E8', marginHorizontal: 20, marginBottom: 40, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: 'rgba(107, 170, 56, 0.2)' },
    tipsHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    tipsTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
    tipText: { fontSize: 14, color: '#6B6B6B', lineHeight: 20, marginBottom: 8 },
});