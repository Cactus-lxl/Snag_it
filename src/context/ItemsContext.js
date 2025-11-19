import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dummyItems from '../data/tool';

const ItemsContext = createContext();

export function ItemsProvider({ children }) {
  const [items, setItems] = useState(dummyItems); // Start with dummy data
  const [userAddedItems, setUserAddedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user-added items from storage on app start
  useEffect(() => {
    loadUserItems();
  }, []);

  // Load items from AsyncStorage
  const loadUserItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('userAddedItems');
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        setUserAddedItems(parsedItems);
        // Combine dummy items with user items
        setItems([...dummyItems, ...parsedItems]);
      }
    } catch (error) {
      console.log('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save items to AsyncStorage
  const saveUserItems = async (newItems) => {
    try {
      await AsyncStorage.setItem('userAddedItems', JSON.stringify(newItems));
    } catch (error) {
      console.log('Error saving items:', error);
    }
  };

  // Add a new item
  const addItem = async (itemData) => {
    const newItem = {
      id: `user_${Date.now()}`,
      name: itemData.name,
      price: itemData.price,
      category: itemData.category || 'Hardware',
      description: itemData.description || '',
      images: itemData.images || [],
      type: 'rent',
      createdAt: new Date().toISOString(),
      isUserAdded: true,
    };

    const updatedUserItems = [...userAddedItems, newItem];
    setUserAddedItems(updatedUserItems);
    setItems([...dummyItems, ...updatedUserItems]);
    await saveUserItems(updatedUserItems);
    
    return newItem;
  };

  // Delete an item (only user-added items)
  const deleteItem = async (itemId) => {
    const updatedUserItems = userAddedItems.filter(item => item.id !== itemId);
    setUserAddedItems(updatedUserItems);
    setItems([...dummyItems, ...updatedUserItems]);
    await saveUserItems(updatedUserItems);
  };

  // Get all items (dummy + user-added)
  const getAllItems = () => {
    return items;
  };

  // Get user-added items only
  const getUserItems = () => {
    return userAddedItems;
  };

  // Search items by name or category
  const searchItems = (query) => {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return items;
    
    return items.filter(item => 
      item.name.toLowerCase().includes(lowerQuery) ||
      (item.category && item.category.toLowerCase().includes(lowerQuery)) ||
      (item.description && item.description.toLowerCase().includes(lowerQuery))
    );
  };

  // Get items by category
  const getItemsByCategory = (category) => {
    return items.filter(item => 
      item.category && item.category.toLowerCase() === category.toLowerCase()
    );
  };

  const value = {
    items,
    userAddedItems,
    loading,
    addItem,
    deleteItem,
    getAllItems,
    getUserItems,
    searchItems,
    getItemsByCategory,
  };

  return (
    <ItemsContext.Provider value={value}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within ItemsProvider');
  }
  return context;
}
