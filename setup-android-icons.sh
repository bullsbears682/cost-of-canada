#!/bin/bash

echo "🍁 Setting up MapleMetrics Android icon directories..."

# Create Android icon directories
mkdir -p android/app/src/main/res/mipmap-mdpi
mkdir -p android/app/src/main/res/mipmap-hdpi  
mkdir -p android/app/src/main/res/mipmap-xhdpi
mkdir -p android/app/src/main/res/mipmap-xxhdpi
mkdir -p android/app/src/main/res/mipmap-xxxhdpi

echo "📁 Created icon directories:"
echo "  - mipmap-mdpi (48x48)"
echo "  - mipmap-hdpi (72x72)"
echo "  - mipmap-xhdpi (96x96)"
echo "  - mipmap-xxhdpi (144x144)"
echo "  - mipmap-xxxhdpi (192x192)"

echo ""
echo "📋 Next steps:"
echo "1. Open create-app-icons.html in your browser"
echo "2. Download all icon sizes"
echo "3. Place them in the correct directories:"
echo "   - ic_launcher.png (48x48) → android/app/src/main/res/mipmap-mdpi/"
echo "   - ic_launcher.png (72x72) → android/app/src/main/res/mipmap-hdpi/"
echo "   - ic_launcher.png (96x96) → android/app/src/main/res/mipmap-xhdpi/"
echo "   - ic_launcher.png (144x144) → android/app/src/main/res/mipmap-xxhdpi/"
echo "   - ic_launcher.png (192x192) → android/app/src/main/res/mipmap-xxxhdpi/"
echo "   - ic_launcher-playstore.png (512x512) → android/app/src/main/"

echo ""
echo "✅ Then run: npx cap sync android"
echo "🚀 Then build: cd android && ./gradlew assembleDebug"