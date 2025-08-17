#!/bin/bash

# Build script for MapleMetrics with Canadian Loading Screen
echo "🚀 Building MapleMetrics with Canadian Loading Screen..."

# Check if Android SDK is available
if [ -z "$ANDROID_HOME" ]; then
    echo "❌ ANDROID_HOME environment variable is not set"
    echo "Please set ANDROID_HOME to your Android SDK location"
    echo "Example: export ANDROID_HOME=/path/to/android-sdk"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the web app
echo "🔨 Building web application..."
npm run build

# Sync with Capacitor
echo "🔄 Syncing with Capacitor..."
npx cap sync android

# Build Android APK
echo "🤖 Building Android APK..."
npx cap build android

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📱 APK should be available in android/app/build/outputs/apk/release/"
    echo "🎉 Your app now includes the beautiful Canadian loading screen!"
else
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi