@echo off
cls
echo ╔════════════════════════════════════════╗
echo ║   SIMPLE FIX - Just Get It Working     ║
echo ╚════════════════════════════════════════╝
echo.

echo Step 1: Clearing npm cache...
call npm cache clean --force
echo ✅ Cache cleared
echo.

echo Step 2: Installing base packages...
call npm install
if errorlevel 1 (
    echo ❌ Error with npm install
    pause
    exit /b 1
)
echo ✅ Base packages installed
echo.

echo Step 3: Installing Expo CLI globally...
call npm install -g expo-cli
echo ✅ Expo CLI installed
echo.

echo Step 4: Letting Expo fix versions...
call npx expo install
echo ✅ Expo dependencies fixed
echo.

echo ╔════════════════════════════════════════╗
echo ║          ✅ READY!                      ║
echo ╚════════════════════════════════════════╝
echo.
echo Now run: npm start
echo.
pause
