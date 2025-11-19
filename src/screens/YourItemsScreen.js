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
import { useItems } from '../context/ItemsContext';

export default function YourItemsScreen({ navigation }) {
    const { getUserItems } = useItems();
    const userItems = getUserItems();

    const portfolioStats = useMemo(() => {
        const totalValue = userItems.reduce((sum, item) => {
            const price = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
            return sum + price;
        }, 0);

        const categories = userItems.reduce((acc, item) => {
            const category = item.category || 'General';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});

        const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];

        return {
            totalItems: userItems.length,
            totalValue: totalValue.toFixed(0),
            categories: Object.keys(categories).length,
            topCategory: topCategory ? topCategory[0] : 'None',
            topCategoryCount: topCategory ? topCategory[1] : 0,
        };
    }, [userItems]);

    const renderItemCard = (item, index) => {
        return (
            <TouchableOpacity
                key={item.id}
                style={styles.itemCard}
                onPress={() => navigation.navigate('ItemDetail', { item })}
                activeOpacity={0.8}
            >
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
                    <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                    <View style={styles.itemMeta}>
                        <Ionicons name="pricetag" size={16} color="#6BAA38" />
                        <Text style={styles.itemPrice}>{item.price}</Text>
                    </View>
                    {item.category && (
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>{item.category}</Text>
                        </View>
                    )}
                </View>
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
                <Text style={styles.headerTitle}>Your Items</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddItem')} style={styles.addBtn}>
                    <Ionicons name="add" size={24} color="#6BAA38" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {userItems.length === 0 ? (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIconContainer}>
                            <Ionicons name="cube-outline" size={80} color="#C4C9A0" />
                        </View>
                        <Text style={styles.emptyTitle}>No Items Yet</Text>
                        <Text style={styles.emptyText}>Start earning by listing items you want to rent out!</Text>
                        <Text style={styles.emptySubtext}>Popular categories:</Text>
                        <View style={styles.categorySuggestions}>
                            <View style={styles.suggestionChip}>
                                <Text style={styles.suggestionText}>🔧 Power Tools</Text>
                            </View>
                            <View style={styles.suggestionChip}>
                                <Text style={styles.suggestionText}>📷 Electronics</Text>
                            </View>
                            <View style={styles.suggestionChip}>
                                <Text style={styles.suggestionText}>🎉 Party Supplies</Text>
                            </View>
                            <View style={styles.suggestionChip}>
                                <Text style={styles.suggestionText}>⚽ Sports Gear</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.emptyButton} onPress={() => navigation.navigate('AddItem')}>
                            <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
                            <Text style={styles.emptyButtonText}>Add Your First Item</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <View style={styles.summarySection}>
                            <Text style={styles.sectionTitle}>Portfolio Overview</Text>
                            <View style={styles.summaryGrid}>
                                <View style={styles.summaryCard}>
                                    <Ionicons name="cube" size={28} color="#6BAA38" />
                                    <Text style={styles.summaryValue}>{portfolioStats.totalItems}</Text>
                                    <Text style={styles.summaryLabel}>Active Items</Text>
                                </View>
                                <View style={styles.summaryCard}>
                                    <Ionicons name="cash" size={28} color="#6BAA38" />
                                    <Text style={styles.summaryValue}>${portfolioStats.totalValue}</Text>
                                    <Text style={styles.summaryLabel}>Daily Value</Text>
                                </View>
                                <View style={styles.summaryCard}>
                                    <Ionicons name="grid" size={28} color="#6BAA38" />
                                    <Text style={styles.summaryValue}>{portfolioStats.categories}</Text>
                                    <Text style={styles.summaryLabel}>{portfolioStats.categories === 1 ? 'Category' : 'Categories'}</Text>
                                </View>
                                <View style={styles.summaryCard}>
                                    <Ionicons name="star" size={28} color="#6BAA38" />
                                    <Text style={styles.summaryValue}>{portfolioStats.topCategoryCount}</Text>
                                    <Text style={styles.summaryLabel} numberOfLines={1}>{portfolioStats.topCategory}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.itemsSection}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>All Items ({userItems.length})</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('AddItem')}>
                                    <Text style={styles.sectionAction}>Add More</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.itemsList}>
                                {userItems.map((item, index) => renderItemCard(item, index))}
                            </View>
                        </View>

                        <View style={styles.tipsCard}>
                            <View style={styles.tipsHeader}>
                                <Ionicons name="bulb" size={24} color="#FFA500" />
                                <Text style={styles.tipsTitle}>Pro Tips</Text>
                            </View>
                            <Text style={styles.tipsText}>💡 Keep your listings updated with clear photos and accurate descriptions to attract more renters!</Text>
                            <Text style={styles.tipsText}>📸 Items with 3+ photos get 2x more bookings.</Text>
                            <Text style={styles.tipsText}>⭐ Respond quickly to inquiries to build trust with renters.</Text>
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
    addBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F7E8', alignItems: 'center', justifyContent: 'center' },
    scrollView: { flex: 1 },
    emptyState: { alignItems: 'center', paddingVertical: 60, paddingHorizontal: 32 },
    emptyIconContainer: { marginBottom: 24 },
    emptyTitle: { fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginBottom: 12 },
    emptyText: { fontSize: 16, color: '#6B6B6B', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
    emptySubtext: { fontSize: 14, color: '#1A1A1A', fontWeight: '600', marginBottom: 12 },
    categorySuggestions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 32 },
    suggestionChip: { backgroundColor: '#F0F7E8', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#C4C9A0' },
    suggestionText: { fontSize: 14, color: '#1A1A1A', fontWeight: '500' },
    emptyButton: { flexDirection: 'row', backgroundColor: '#6BAA38', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 12, alignItems: 'center', gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 4 },
    emptyButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
    summarySection: { paddingHorizontal: 20, paddingVertical: 24 },
    sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A1A', marginBottom: 16 },
    summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    summaryCard: { width: '48%', backgroundColor: 'white', borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
    summaryValue: { fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginTop: 8, marginBottom: 4 },
    summaryLabel: { fontSize: 13, color: '#6B6B6B', fontWeight: '500', textAlign: 'center' },
    itemsSection: { paddingHorizontal: 20, marginBottom: 24 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
    sectionAction: { fontSize: 15, color: '#6BAA38', fontWeight: '600' },
    itemsList: { gap: 12 },
    itemCard: { backgroundColor: 'white', borderRadius: 16, flexDirection: 'row', overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
    itemImageContainer: { width: 120, height: 120, backgroundColor: '#E7EBD2' },
    itemImage: { width: '100%', height: '100%' },
    itemImagePlaceholder: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
    itemEmoji: { fontSize: 40 },
    itemInfo: { flex: 1, padding: 16, justifyContent: 'space-between' },
    itemName: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', marginBottom: 8 },
    itemMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    itemPrice: { fontSize: 16, fontWeight: '600', color: '#6BAA38' },
    categoryBadge: { alignSelf: 'flex-start', backgroundColor: '#F0F7E8', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginTop: 8 },
    categoryText: { fontSize: 12, fontWeight: '600', color: '#6BAA38' },
    tipsCard: { backgroundColor: '#FFF9E6', marginHorizontal: 20, marginBottom: 40, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#FFE5A0' },
    tipsHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    tipsTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
    tipsText: { fontSize: 14, color: '#6B6B6B', lineHeight: 20, marginBottom: 8 },
});