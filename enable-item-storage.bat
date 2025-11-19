@echo off
cls
echo ╔════════════════════════════════════════╗
echo ║   ADDING ITEM STORAGE FEATURE          ║
echo ║   Items will now persist!              ║
echo ╚════════════════════════════════════════╝
echo.
echo ⏳ This will take about 1-2 minutes...
echo.
pause
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo Installing AsyncStorage for item storage...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
call npx expo install @react-native-async-storage/async-storage
if errorlevel 1 (
    echo ❌ Error installing AsyncStorage
    pause
    exit /b 1
)
echo ✅ AsyncStorage installed!
echo.

echo ╔════════════════════════════════════════╗
echo ║          ✅ SUCCESS!                    ║
echo ║   Item storage feature is ready!       ║
echo ╚════════════════════════════════════════╝
echo.
echo 📱 What's New:
echo    ✓ Seller-added items now persist
echo    ✓ Items appear in buyer dashboard
echo    ✓ Items are searchable
echo    ✓ Dummy examples still included
echo    ✓ NEW badge on user-added items
echo.
echo 📝 Next step: Run start-app.bat
echo.
pause
