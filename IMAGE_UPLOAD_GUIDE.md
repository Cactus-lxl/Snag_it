# 📸 Image Upload Feature - Installation Guide

## 🎯 What's New?

The AddItemScreen now supports:
- ✅ Take photos with your camera
- ✅ Choose multiple images from your photo library
- ✅ Upload up to 5 images per item
- ✅ Image compression and optimization
- ✅ Preview and remove images before saving
- ✅ Beautiful UI with drag-to-scroll image gallery

---

## 🚀 Installation Steps

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install the new packages:
- `expo-image-picker` - For camera and gallery access
- `expo-image-manipulator` - For image compression

### Step 2: Clear Cache and Restart

```bash
npx expo start -c
```

### Step 3: Test on Your Phone

1. Open Expo Go app on your phone
2. Scan the QR code
3. Navigate to the "Add Item" screen
4. Grant camera and photo permissions when prompted
5. Test the image upload functionality!

---

## 📱 How to Use

### For Users (Sellers/Renters):

1. **Navigate to Add Item Screen**
   - Tap the "+" button or "Add Item" from your seller dashboard

2. **Add Photos**
   - Tap the "Add Photo" button
   - Choose between:
     - **Take Photo**: Opens camera to take a new photo
     - **Choose from Gallery**: Select existing photos (can select multiple)

3. **Manage Photos**
   - Scroll horizontally to view all selected images
   - Tap the red "×" button to remove unwanted images
   - Maximum 5 images per item

4. **Fill in Item Details**
   - Name (Required)
   - Price (Required)
   - Category
   - Description

5. **Save**
   - Tap "Save Item" when done
   - At least one image is required

---

## 🎨 Features Breakdown

### Image Compression
- All images are automatically compressed to reduce file size
- Resized to max width of 1200px
- 70% JPEG compression quality
- Maintains good visual quality while saving storage

### Permission Handling
- Automatically requests camera permission
- Automatically requests photo library permission
- Shows friendly error message if permissions denied
- Works on both iOS and Android

### Multiple Image Selection
- Select multiple images at once from gallery
- Limited to 5 images maximum per item
- Easy to manage and remove images

### Validation
- Ensures at least one image is uploaded
- Validates required fields (name, price)
- Shows helpful error messages

---

## 🔧 Troubleshooting

### Permission Issues
If you get permission errors:
1. Close the app completely
2. Go to your phone Settings
3. Find Expo Go app
4. Enable Camera and Photos permissions
5. Restart the app

### Images Not Showing
- Make sure you have a stable connection
- Try clearing the app cache: Shake phone → "Reload"

### "Module not found" Errors
```bash
# Clear node modules and reinstall
rm -rf node_modules
npm install
npx expo start -c
```

---

## 💡 Next Steps (TODO)

Currently, images are stored locally in the app state. To make them permanent:

1. **Set up cloud storage** (Firebase Storage, AWS S3, Cloudinary)
2. **Upload images to server** when saving item
3. **Store image URLs** in your database
4. **Display images** from URLs in item listings

---

## 📝 Code Structure

```
src/screens/AddItemScreen.js
├── Image Upload Functions
│   ├── requestPermissions()     - Handle camera/gallery permissions
│   ├── compressImage()          - Optimize image size
│   ├── pickImageFromGallery()   - Select from photo library
│   ├── takePhoto()              - Capture with camera
│   ├── showImageOptions()       - Show selection dialog
│   └── removeImage()            - Delete selected image
│
├── UI Components
│   ├── Image Gallery Scroll     - Horizontal scrollable images
│   ├── Add Photo Button         - Dashed border button
│   ├── Image Preview Cards      - 120x120 thumbnails
│   └── Remove Buttons           - Red × buttons
│
└── Validation
    └── onSave()                 - Validates before saving
```

---

## 🎥 Demo Flow

1. User taps "Add Item"
2. Taps "Add Photo" button
3. Chooses "Take Photo" or "Choose from Gallery"
4. Grants permissions (first time only)
5. Selects/captures images
6. Images appear in horizontal scroll
7. User can tap × to remove any image
8. Fills in item details
9. Taps "Save Item"
10. Success message and returns to previous screen

---

## ✅ Testing Checklist

- [ ] Camera opens and takes photos
- [ ] Gallery opens and selects multiple photos
- [ ] Images display correctly in preview
- [ ] Remove button deletes images
- [ ] Max 5 images enforced
- [ ] Validation shows errors for missing fields
- [ ] Validation requires at least 1 image
- [ ] Success message appears on save
- [ ] Navigation goes back after save

---

## 🆘 Need Help?

If you run into issues:
1. Check the Expo logs in terminal
2. Check the device logs in Expo Go app
3. Make sure all packages are installed correctly
4. Try restarting the Expo server with `-c` flag

---

**Happy Coding! 🎉**
