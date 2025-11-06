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
} from 'react-native';

export default function AddItemScreen({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Hardware');
  const [desc, setDesc] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const onSave = () => {
    // Mock save
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add item to rent</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Picture URL</Text>
            <TextInput style={styles.input} value={photoUrl} onChangeText={setPhotoUrl} placeholder="https://..." placeholderTextColor="#8A8A8A" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Cordless Drill" placeholderTextColor="#8A8A8A" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="$12/day" placeholderTextColor="#8A8A8A" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Hardware" placeholderTextColor="#8A8A8A" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput style={[styles.input, styles.multiline]} multiline value={desc} onChangeText={setDesc} placeholder="Short description" placeholderTextColor="#8A8A8A" />
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F3' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  backIcon: { fontSize: 20, color: '#1A1A1A', marginTop: -2 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  content: { padding: 20, gap: 14 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, gap: 12 },
  inputGroup: { gap: 8 },
  label: { fontSize: 13, color: '#4B4B4B', fontWeight: '600' },
  input: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E6E6E6', paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, color: '#1A1A1A' },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  saveBtn: { backgroundColor: '#C4C9A0', borderRadius: 28, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  saveText: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
});
