@echo off
cls
echo ╔════════════════════════════════════════╗
echo ║   NUCLEAR OPTION - FULL REINSTALL      ║
echo ║   Use this if nothing else works       ║
echo ╚════════════════════════════════════════╝
echo.
echo ⚠️  WARNING: This will delete node_modules
echo    and reinstall everything from scratch
echo.
echo ⏳ This will take 5-7 minutes
echo.
pause
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Step 1: Deleting node_modules...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
if exist node_modules (
    rmdir /s /q node_modules
    echo ✅ node_modules deleted
) else (
    echo ⚠️  node_modules not found, skipping...
)
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Step 2: Deleting package-lock.json...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
if exist package-lock.json (
    del package-lock.json
    echo ✅ package-lock.json deleted
) else (
    echo ⚠️  package-lock.json not found, skipping...
)
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Step 3: Installing all base packages...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
call npm install
if errorlevel 1 (
    echo ❌ Error with npm install
    pause
    exit /b 1
)
echo ✅ Base packages installed!
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Step 4: Installing Expo-specific packages...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
call npx expo install @react-native-async-storage/async-storage expo-image-picker expo-image-manipulator
if errorlevel 1 (
    echo ❌ Error installing Expo packages
    pause
    exit /b 1
)
echo ✅ Expo packages installed!
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Step 5: Installing calendars...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
call npm install react-native-calendars
if errorlevel 1 (
    echo ❌ Error installing calendars
    pause
    exit /b 1
)
echo ✅ Calendars installed!
echo.

echo ╔════════════════════════════════════════╗
echo ║          ✅ COMPLETE SUCCESS!           ║
echo ║   Everything has been reinstalled      ║
echo ╚════════════════════════════════════════╝
echo.
echo 🎉 Your app is ready to run!
echo.
echo 📝 Next steps:
echo    1. Run: npm start
echo    2. Scan QR code with Expo Go
echo    3. Enjoy your app!
echo.
pause
