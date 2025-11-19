@echo off
cls
echo ╔════════════════════════════════════════╗
echo ║   COMPLETE APP FIX - ALL FEATURES      ║
echo ║   This installs everything you need    ║
echo ╚════════════════════════════════════════╝
echo.
echo ⏳ This will take about 3-4 minutes...
echo.
pause
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Step 1/4: Installing AsyncStorage...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
call npx expo install @react-native-async-storage/async-storage
if errorlevel 1 (
    echo ❌ Error installing AsyncStorage
    pause
    exit /b 1
)
echo ✅ AsyncStorage installed!
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Step 2/4: Installing expo-image-picker...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
call npx expo install expo-image-picker
if errorlevel 1 (
    echo ❌ Error installing expo-image-picker
    pause
    exit /b 1
)
echo ✅ expo-image-picker installed!
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Step 3/4: Installing expo-image-manipulator...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
call npx expo install expo-image-manipulator
if errorlevel 1 (
    echo ❌ Error installing expo-image-manipulator
    pause
    exit /b 1
)
echo ✅ expo-image-manipulator installed!
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Step 4/4: Installing react-native-calendars...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
call npm install react-native-calendars
if errorlevel 1 (
    echo ❌ Error installing react-native-calendars
    pause
    exit /b 1
)
echo ✅ react-native-calendars installed!
echo.

echo ╔════════════════════════════════════════╗
echo ║          ✅ ALL DONE!                   ║
echo ║   All packages installed successfully! ║
echo ╚════════════════════════════════════════╝
echo.
echo 📦 Installed packages:
echo    ✓ AsyncStorage (item storage)
echo    ✓ expo-image-picker (camera/gallery)
echo    ✓ expo-image-manipulator (image optimization)
echo    ✓ react-native-calendars (date picker)
echo.
echo 🚀 Ready to start!
echo    Run: npm start
echo    Or:  npx expo start -c
echo.
pause
