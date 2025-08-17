# MapleMetrics Android Build Instructions

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Android Studio** with Android SDK
3. **Java JDK 17** or higher
4. **Capacitor CLI**: `npm install -g @capacitor/cli`

## Environment Setup

### 1. Android Studio Setup
- Install Android Studio from https://developer.android.com/studio
- Install Android SDK (API level 34 recommended)
- Set up Android Virtual Device (AVD) for testing
- Configure environment variables:
  ```bash
  export ANDROID_HOME=$HOME/Android/Sdk
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```

### 2. Java Setup
- Install JDK 17 or higher
- Set JAVA_HOME environment variable

## Build Process

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Web Assets
```bash
npm run build
```

### 3. Initialize Android Platform (First time only)
```bash
npx cap add android
```

### 4. Sync Web Assets to Android
```bash
npx cap sync android
```

### 5. Open in Android Studio
```bash
npx cap open android
```

## Build Variants

### Development Build
```bash
npm run android:dev
```

### Release Build (for Play Store)
```bash
npm run android:release
```

## Android-Specific Configuration

### 1. Update Android Manifest
File: `android/app/src/main/AndroidManifest.xml`

Key configurations:
- App permissions
- Network security config
- Activity configurations
- Intent filters

### 2. App Icons and Splash Screens
Place your icons in:
- `android/app/src/main/res/mipmap-*/` (app icons)
- `android/app/src/main/res/drawable*/` (splash screens)

Required icon sizes:
- mdpi: 48x48
- hdpi: 72x72
- xhdpi: 96x96
- xxhdpi: 144x144
- xxxhdpi: 192x192

### 3. Signing Configuration
For Play Store release, configure signing in `android/app/build.gradle`:

```gradle
android {
    signingConfigs {
        release {
            keyAlias 'your-key-alias'
            keyPassword 'your-key-password'
            storeFile file('path/to/your/keystore.jks')
            storePassword 'your-store-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
        }
    }
}
```

## Testing

### 1. Test on Emulator
```bash
npx cap run android
```

### 2. Test on Physical Device
- Enable Developer Options on your Android device
- Enable USB Debugging
- Connect device via USB
- Run: `npx cap run android --target your-device-id`

## Release Preparation

### 1. Update Version Numbers
Update in these files:
- `package.json` → version
- `android/app/build.gradle` → versionCode and versionName
- `capacitor.config.ts` → if needed

### 2. Generate Signed APK/AAB
In Android Studio:
1. Build → Generate Signed Bundle/APK
2. Choose "Android App Bundle" for Play Store
3. Select your keystore and signing configuration
4. Choose "release" build variant
5. Generate the bundle

### 3. Test Release Build
- Install the signed APK on test devices
- Verify all functionality works correctly
- Test on different screen sizes and Android versions

## Play Store Submission

### 1. Create Play Console Account
- Sign up at https://play.google.com/console
- Pay one-time $25 registration fee

### 2. Prepare Store Assets
- App icons (512x512 PNG)
- Feature graphic (1024x500 PNG)
- Screenshots (phone and tablet sizes)
- App description and metadata

### 3. Upload App Bundle
- Upload the signed AAB file
- Fill in store listing information
- Set content rating
- Configure pricing and distribution

### 4. Review Process
- Google will review your app (typically 1-3 days)
- Address any policy violations if flagged
- App goes live once approved

## Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check Android SDK installation
   - Verify JAVA_HOME and ANDROID_HOME variables
   - Clean and rebuild: `./gradlew clean` in android folder

2. **App Won't Start**
   - Check AndroidManifest.xml permissions
   - Verify Capacitor plugins are properly installed
   - Check device logs: `adb logcat`

3. **Network Issues**
   - Ensure INTERNET permission is in manifest
   - Check network security config for HTTPS requirements
   - Test API endpoints are accessible

### Useful Commands:
```bash
# Check connected devices
adb devices

# View device logs
adb logcat

# Clear app data
adb shell pm clear com.maplemetrics.app

# Install APK manually
adb install app-release.apk
```

## Production Checklist

- [ ] App icons created for all densities
- [ ] Splash screens configured
- [ ] App signed with production keystore
- [ ] Version numbers updated
- [ ] Tested on multiple devices/screen sizes
- [ ] Privacy policy and terms of service links work
- [ ] All API endpoints use HTTPS
- [ ] App bundle optimized and under 150MB
- [ ] Store listing assets prepared
- [ ] Content rating obtained
- [ ] Beta testing completed

## Support

For build issues or questions:
- Check Capacitor documentation: https://capacitorjs.com/docs
- Android developer documentation: https://developer.android.com
- Contact: support@maplemetrics.com