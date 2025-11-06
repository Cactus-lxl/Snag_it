# Sang-It Rental App - React Native (iPhone)

A beautiful rental app for tools with a modern, rustic design aesthetic built with React Native and Expo.

## 🎨 Design Features

### Color Scheme
- **Primary Color**: Muted olive/sage green (#C4C9A0)
- **Background**: Light cream/off-white (#FAF8F3)
- **Accent Coral**: #F4A89F for tool images
- **Accent Blue**: #6B9BD1 for interactive elements
- **Text**: Black (#1A1A1A) for headers, gray (#6B6B6B) for body

### Styling
- Clean, minimal interface with breathing room
- Rounded corners on all cards and buttons
- Subtle shadows for depth
- Rustic/organic feel with olive green palette
- Modern but approachable aesthetic

## 📱 Running on iPhone

### Method 1: Expo Go App (Easiest)

1. **Install Expo Go on your iPhone**
   - Open App Store
   - Search for "Expo Go"
   - Install the app

2. **Start the development server** (already running!)
   - The QR code should appear in your terminal

3. **Scan the QR code**
   - Open the Camera app on your iPhone
   - Point it at the QR code in the terminal
   - Tap the notification that appears
   - App will open in Expo Go

### Method 2: iOS Simulator (Mac only)

Press `i` in the terminal where Expo is running, or run:
```bash
npm run ios
```

## 🚀 Available Commands

```bash
npm start          # Start Expo development server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run in web browser
```

## 📂 Project Structure

```
Rental-App-1/
├── App.js                      # Main navigation setup
├── src/
│   ├── screens/
│   │   ├── SignupScreen.js     # Sign up page with RENT/BUY/Sign in buttons
│   │   ├── DashboardScreen.js  # Main dashboard with categories and tools
│   │   └── ChatScreen.js       # Chat interface for tool rentals
│   ├── data/
│   │   └── tool.js             # Tool data (rent & buy items)
│   └── components/
│       ├── ToggleTabs.js       # Buy/Rent toggle (web version)
│       └── ToolCard.js         # Tool card component (web version)
├── app.json                    # Expo configuration
├── babel.config.js             # Babel configuration
└── package.json                # Dependencies

```

## 🎯 Features

### Sign Up Screen
- Large "Sang-It" branding
- Circular profile placeholder (top right)
- Three pill-shaped buttons: RENT, BUY, Sign in
- Olive green background

### Dashboard
- Search bar with menu and search icons
- Buy/Rent toggle pills
- 2x2 category grid with icons
- "Top items near you" section
- Tool cards showing:
  - Tool images (coral gradient background)
  - Original price (strikethrough)
  - Current discounted price

### Chat Screen
- Olive green header with back button
- Message bubbles (sender in olive, receiver in white)
- Timestamps below messages
- Text input with send button
- Confirm rental button (blue accent)

## 🛠️ Tech Stack

- **React Native** 0.76.5
- **Expo** ~52.0.0
- **React Navigation** 6.x
- **React Native Safe Area Context**
- **React Native Screens**

## 📝 Notes

- All styling has been applied according to your wireframe design
- The app uses React Native components (View, Text, TouchableOpacity, etc.)
- Navigation is handled by React Navigation
- The design follows iOS Human Interface Guidelines
- Responsive layout that works on all iPhone sizes

## 🎨 Customization

To modify colors, update the color values in each screen's StyleSheet. The main colors used are:
- Olive Green: `#C4C9A0`
- Cream Background: `#FAF8F3`
- Coral: `#F4A89F`
- Blue: `#6B9BD1`
- Text Black: `#1A1A1A`
- Text Gray: `#6B6B6B`

Enjoy your beautifully styled rental app! 🎉
