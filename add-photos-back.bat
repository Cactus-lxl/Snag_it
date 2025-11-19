@echo off
cls
echo ╔════════════════════════════════════════╗
echo ║   ADDING IMAGE UPLOAD BACK             ║
echo ║   With correct versions for Expo 54    ║
echo ╚════════════════════════════════════════╝
echo.
echo ⏳ This will take about 2-3 minutes...
echo.
pause
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Installing expo-image-picker...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
call npx expo install expo-image-picker
if errorlevel 1 (
    echo ❌ Error installing expo-image-picker
    pause
    exit /b 1
)
echo ✅ expo-image-picker installed!
echo.

echo ╔════════════════════════════════════════╗
echo ║          ✅ SUCCESS!                    ║
echo ║   Image upload is ready!               ║
echo ╚════════════════════════════════════════╝
echo.
echo 📸 You can now:
echo    ✓ Take photos with camera
echo    ✓ Choose photos from gallery
echo    ✓ Add up to 5 photos per item
echo.
echo 🚀 Next: Restart your app
echo    Run: npm start
echo    Or:  npx expo start -c
echo.
pause
