import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useItems } from '../context/ItemsContext';

export default function AddItemScreen({ navigation }) {
  const { addItem } = useItems();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Hardware');
  const [desc, setDesc] = useState('');
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);

  // Request permissions
  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraPermission.status !== 'granted' || galleryPermission.status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please grant camera and photo library permissions to upload images.',
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    return true;
  };

  // Pick image from gallery
  const pickImageFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImage = {
          uri: result.assets[0].uri,
          id: Date.now(),
        };
        setImages([...images, newImage].slice(0, 5)); // Max 5 images
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image from gallery');
      console.log('Gallery error:', error);
    }
  };

  // Take photo with camera
  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImage = {
          uri: result.assets[0].uri,
          id: Date.now(),
        };
        setImages([...images, newImage].slice(0, 5)); // Max 5 images
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
      console.log('Camera error:', error);
    }
  };

  // Show image source options
  const showImageOptions = () => {
    Alert.alert(
      'Add Photo',
      'Choose how you want to add a photo',
      [
        {
          text: 'Take Photo',
          onPress: takePhoto,
        },
        {
          text: 'Choose from Gallery',
          onPress: pickImageFromGallery,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  // Remove image
  const removeImage = (imageId) => {
    setImages(images.filter((img) => img.id !== imageId));
  };

  const onSave = async () => {
    // Validation
    if (!name.trim()) {
      Alert.alert('Required Field', 'Please enter an item name');
      return;
    }
    if (!price.trim()) {
      Alert.alert('Required Field', 'Please enter a price');
      return;
    }
    if (images.length === 0) {
      Alert.alert('Required Field', 'Please add at least one photo');
      return;
    }

    setSaving(true);

    try {
      // Add item to context
      const newItem = await addItem({
        name: name.trim(),
        price: price.includes('/') ? price : `$${price}/day`,
        category: category.trim(),
        description: desc.trim(),
        images: images.map(img => img.uri),
      });

      setSaving(false);

      Alert.alert(
        '✅ Success!', 
        `${name} has been added successfully!`,
        [
          { 
            text: 'Add Another', 
            onPress: () => {
              // Reset form
              setName('');
              setPrice('');
              setCategory('Hardware');
              setDesc('');
              setImages([]);
            }
          },
          { 
            text: 'Done', 
            onPress: () => navigation.goBack(),
            style: 'cancel'
          }
        ]
      );
    } catch (error) {
      setSaving(false);
      Alert.alert('Error', 'Failed to add item. Please try again.');
      console.log('Save error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Item to Rent</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Image Upload Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Photos ({images.length}/5) *</Text>
          <Text style={styles.sectionSubtitle}>Add photos of your item</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.imageScroll}
            contentContainerStyle={styles.imageScrollContent}
          >
            {/* Add Photo Button */}
            {images.length < 5 && (
              <TouchableOpacity style={styles.addPhotoBtn} onPress={showImageOptions}>
                <Text style={styles.addPhotoIcon}>📷</Text>
                <Text style={styles.addPhotoText}>Add Photo</Text>
              </TouchableOpacity>
            )}

            {/* Display selected images */}
            {images.map((image) => (
              <View key={image.id} style={styles.imageContainer}>
                <Image source={{ uri: image.uri }} style={styles.previewImage} />
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeImage(image.id)}
                >
                  <Text style={styles.removeIcon}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Item Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Item Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput 
              style={styles.input} 
              value={name} 
              onChangeText={setName} 
              placeholder="e.g., Cordless Drill" 
              placeholderTextColor="#8A8A8A" 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price per Day *</Text>
            <View style={styles.priceInputContainer}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput 
                style={styles.priceInput} 
                value={price} 
                onChangeText={setPrice} 
                placeholder="12" 
                placeholderTextColor="#8A8A8A"
                keyboardType="numeric"
              />
              <Text style={styles.perDay}>/day</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <TextInput 
              style={styles.input} 
              value={category} 
              onChangeText={setCategory} 
              placeholder="e.g., Hardware, Electronics, Dress" 
              placeholderTextColor="#8A8A8A" 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput 
              style={[styles.input, styles.multiline]} 
              multiline 
              numberOfLines={4}
              value={desc} 
              onChangeText={setDesc} 
              placeholder="Describe your item, its condition, and any important details..." 
              placeholderTextColor="#8A8A8A" 
            />
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.saveBtn, saving && styles.saveBtnDisabled]} 
          onPress={onSave}
          disabled={saving}
        >
          <Text style={styles.saveText}>
            {saving ? 'Saving...' : 'Save Item'}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.helpText}>
          * Required fields
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAF8F3' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 12,
    backgroundColor: '#FAF8F3',
  },
  backBtn: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: 'white', 
    alignItems: 'center', 
    justifyContent: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 8, 
    elevation: 3 
  },
  backIcon: { 
    fontSize: 24, 
    color: '#1A1A1A', 
    fontWeight: '300',
    marginTop: -3,
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#1A1A1A' 
  },
  content: { 
    padding: 20, 
    paddingBottom: 40,
  },
  card: { 
    backgroundColor: 'white', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 16,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 8, 
    elevation: 3, 
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#6B6B6B',
    marginBottom: 16,
  },
  inputGroup: { 
    marginBottom: 16,
  },
  label: { 
    fontSize: 14, 
    color: '#4B4B4B', 
    fontWeight: '600',
    marginBottom: 8,
  },
  input: { 
    backgroundColor: '#F8F9F4', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#E6E6E6', 
    paddingHorizontal: 16, 
    paddingVertical: 14, 
    fontSize: 16, 
    color: '#1A1A1A' 
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9F4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dollarSign: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginRight: 4,
  },
  priceInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    padding: 0,
  },
  perDay: {
    fontSize: 14,
    color: '#6B6B6B',
    marginLeft: 4,
  },
  multiline: { 
    minHeight: 100, 
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  saveBtn: { 
    backgroundColor: '#C4C9A0', 
    borderRadius: 28, 
    paddingVertical: 18, 
    alignItems: 'center', 
    justifyContent: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 8, 
    elevation: 4,
    marginBottom: 12,
  },
  saveBtnDisabled: {
    opacity: 0.6,
  },
  saveText: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#1A1A1A' 
  },
  helpText: {
    fontSize: 12,
    color: '#8A8A8A',
    textAlign: 'center',
  },
  
  // Image Upload Styles
  imageScroll: {
    marginTop: 8,
  },
  imageScrollContent: {
    paddingRight: 20,
  },
  addPhotoBtn: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#C4C9A0',
    backgroundColor: '#F8F9F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addPhotoIcon: {
    fontSize: 36,
    marginBottom: 4,
  },
  addPhotoText: {
    fontSize: 12,
    color: '#6B6B6B',
    fontWeight: '600',
  },
  imageContainer: {
    width: 120,
    height: 120,
    marginRight: 12,
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E6E6E6',
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF4444',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  removeIcon: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
    lineHeight: 20,
  },
});
