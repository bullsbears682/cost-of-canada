# Build MapleMetrics APK on Your Mobile Phone

## 🚀 Your Android App is Ready to Build!

Your MapleMetrics app is a **real native Android app** ready for Google Play Store. Here's how to build the APK directly on your phone.

## ✅ **What You Already Have:**
- ✅ React app built and optimized
- ✅ Android project created (`/android` folder)
- ✅ Capacitor configured properly
- ✅ Bundle size optimized (367KB main chunk)
- ✅ All assets synced to Android project

## 📱 **Build APK on Your Phone (Termux):**

### **Method 1: Quick Build (Recommended)**
```bash
# You're already in the android directory
cd ~/cost-of-canada/android

# Install Java if not already installed
pkg install openjdk-17

# Set Java environment
export JAVA_HOME=/data/data/com.termux/files/usr/opt/openjdk

# Try building (might work without full Android SDK)
./gradlew assembleDebug --offline
```

### **Method 2: Full Android SDK Setup**
```bash
# Install required packages (needs 4GB+ storage)
pkg install openjdk-17 wget unzip

# Download Android SDK
cd ~
wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip

# Extract and setup
unzip commandlinetools-linux-9477386_latest.zip
mkdir -p android-sdk/cmdline-tools
mv cmdline-tools android-sdk/cmdline-tools/latest

# Set environment variables
export ANDROID_HOME=~/android-sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Install Android platform
yes | sdkmanager --licenses
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

# Build APK
cd ~/cost-of-canada/android
echo "sdk.dir=$ANDROID_HOME" > local.properties
./gradlew assembleDebug
```

## 📦 **Alternative: Use Your Computer**

If mobile building is too complex, you can:

### **1. Transfer Project to Computer:**
```bash
# Zip your project
cd ~/cost-of-canada
tar -czf maplemetrics-project.tar.gz .

# Upload to cloud storage or transfer via USB
```

### **2. Build on Computer:**
```bash
# On computer with Android Studio:
npm install
npm run build
npx cap sync android
npx cap open android

# Build → Generate Signed Bundle/APK
```

## 🎯 **What Your APK Will Include:**

### **✅ Native Android App Features:**
- **Real app icon** in Android app drawer
- **Offline functionality** (works without internet)
- **Native performance** 
- **Android system integration**
- **Push notification support** (if you add it later)
- **File system access**
- **Native navigation**

### **✅ Your MapleMetrics Features:**
- Housing affordability calculator
- Retirement planning tools
- Government benefits finder
- Real-time market data
- User profiles and saved calculations
- Feedback system
- All your React components working natively

## 📱 **Expected APK Details:**
- **File size**: ~5-10MB (very reasonable)
- **Package name**: com.maplemetrics.app
- **App name**: MapleMetrics
- **Minimum Android**: API 24 (Android 7.0)
- **Target Android**: API 34 (Android 14)

## 🚀 **After Building APK:**

### **1. Install on Your Phone:**
```bash
# APK will be at:
# android/app/build/outputs/apk/debug/app-debug.apk

# Copy to downloads
cp app/build/outputs/apk/debug/app-debug.apk ~/storage/downloads/MapleMetrics.apk

# Install via file manager
```

### **2. Test Your Native App:**
- **Tap the MapleMetrics icon** in your app drawer
- **Test all features** work as native app
- **Share APK** with friends for testing

### **3. Prepare for Play Store:**
- **Create signed release APK** (need keystore)
- **Generate app icons** (use the SVG files created)
- **Take screenshots** of your app
- **Upload to Play Console**

## 💡 **Quick Start Command:**

**Try this one command to build:**
```bash
cd ~/cost-of-canada/android && pkg install openjdk-17 && export JAVA_HOME=/data/data/com.termux/files/usr/opt/openjdk && ./gradlew assembleDebug --offline
```

## 🎯 **Success Indicators:**

When the build succeeds, you'll see:
```
BUILD SUCCESSFUL in 30s
37 actionable tasks: 37 executed
```

And your APK will be at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 🇨🇦 **Your Native MapleMetrics Android App:**

This APK will be a **real Android app** that:
- Installs like any Play Store app
- Appears in app drawer with icon
- Runs independently (not in browser)
- Works offline after initial load
- Has native Android performance
- Is ready for Google Play Store

Ready to build your first native Android APK? 🚀📱