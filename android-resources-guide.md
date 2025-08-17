# Android Resources Guide for MapleMetrics

## App Icons Required

### 1. Launcher Icons (Adaptive Icons - Recommended)
Create these files in `android/app/src/main/res/`:

```
mipmap-mdpi/ic_launcher.png (48x48)
mipmap-hdpi/ic_launcher.png (72x72)
mipmap-xhdpi/ic_launcher.png (96x96)
mipmap-xxhdpi/ic_launcher.png (144x144)
mipmap-xxxhdpi/ic_launcher.png (192x192)

mipmap-mdpi/ic_launcher_foreground.png (108x108)
mipmap-hdpi/ic_launcher_foreground.png (162x162)
mipmap-xhdpi/ic_launcher_foreground.png (216x216)
mipmap-xxhdpi/ic_launcher_foreground.png (324x324)
mipmap-xxxhdpi/ic_launcher_foreground.png (432x432)
```

### 2. Play Store Icon
- **ic_launcher-playstore.png** (512x512)
- No transparency
- PNG format
- High quality, crisp design

## Splash Screen Resources

### 1. Splash Images
Create these files in `android/app/src/main/res/`:

```
drawable-mdpi/splash.png (320x480)
drawable-hdpi/splash.png (480x800)
drawable-xhdpi/splash.png (720x1280)
drawable-xxhdpi/splash.png (960x1600)
drawable-xxxhdpi/splash.png (1280x1920)
```

### 2. Splash Screen Configuration
File: `android/app/src/main/res/values/styles.xml`

```xml
<resources>
    <style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
        <item name="android:background">@drawable/splash</item>
    </style>
</resources>
```

## Icon Design Guidelines

### MapleMetrics Icon Concept
Based on your app branding:

1. **Main Element**: Maple leaf symbol
2. **Secondary Elements**: 
   - Housing/building silhouette
   - Chart/graph elements
   - Canadian colors (red, white)

3. **Color Scheme**:
   - Primary: Canadian red (#FF0000)
   - Secondary: White (#FFFFFF)
   - Accent: Blue (#1e40af) - matching your current theme

### Design Specifications

#### Launcher Icon:
- **Size**: 1024x1024 (design canvas)
- **Safe Zone**: 768x768 (content area)
- **Key Line Shapes**: Circle, square, rounded square
- **Format**: PNG with transparency
- **Style**: Modern, flat design with subtle shadows

#### Splash Screen:
- **Background**: Solid color matching app theme (#1e40af)
- **Logo**: Centered MapleMetrics logo
- **Text**: Optional tagline below logo
- **Style**: Simple, clean, fast loading

## Resource Generation Tools

### 1. Android Studio Image Asset Studio
1. Right-click `res` folder in Android Studio
2. New → Image Asset
3. Choose "Launcher Icons (Adaptive and Legacy)"
4. Upload your 1024x1024 icon
5. Configure foreground and background
6. Generate all sizes automatically

### 2. Online Tools
- **App Icon Generator**: https://appicon.co/
- **Adaptive Icon Tool**: https://adapticon.tooo.io/
- **Icon Kitchen**: https://icon.kitchen/

### 3. Command Line Tools (Optional)
Using ImageMagick to resize icons:
```bash
# Generate all icon sizes from 1024x1024 source
convert icon-1024.png -resize 48x48 mipmap-mdpi/ic_launcher.png
convert icon-1024.png -resize 72x72 mipmap-hdpi/ic_launcher.png
convert icon-1024.png -resize 96x96 mipmap-xhdpi/ic_launcher.png
convert icon-1024.png -resize 144x144 mipmap-xxhdpi/ic_launcher.png
convert icon-1024.png -resize 192x192 mipmap-xxxhdpi/ic_launcher.png
```

## Adaptive Icons (Android 8.0+)

### Benefits:
- Consistent visual treatment across devices
- Smooth animations and effects
- Better integration with system UI

### Structure:
1. **Foreground**: Your main icon design (transparent background)
2. **Background**: Solid color or simple pattern
3. **Mask**: System applies circular, square, or rounded square mask

### Implementation:
File: `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
```

## Testing Your Icons

### 1. Preview in Android Studio
- Use Image Asset Studio preview
- Test different mask shapes
- Check at various sizes

### 2. Test on Devices
- Install on physical devices
- Check home screen appearance
- Verify in app drawer
- Test on different Android versions

### 3. Play Store Preview
- Upload to Play Console (draft)
- Preview how icon appears in store
- Test on different device types

## Quick Setup Script

Create this script to quickly set up your Android resources:

```bash
#!/bin/bash
# setup-android-resources.sh

echo "Setting up Android resources for MapleMetrics..."

# Create directories
mkdir -p android/app/src/main/res/mipmap-mdpi
mkdir -p android/app/src/main/res/mipmap-hdpi
mkdir -p android/app/src/main/res/mipmap-xhdpi
mkdir -p android/app/src/main/res/mipmap-xxhdpi
mkdir -p android/app/src/main/res/mipmap-xxxhdpi
mkdir -p android/app/src/main/res/drawable-mdpi
mkdir -p android/app/src/main/res/drawable-hdpi
mkdir -p android/app/src/main/res/drawable-xhdpi
mkdir -p android/app/src/main/res/drawable-xxhdpi
mkdir -p android/app/src/main/res/drawable-xxxhdpi

echo "Directories created. Now add your icon files to the appropriate folders."
echo "Don't forget to run 'npx cap sync android' after adding resources."
```

## Checklist

Before submitting to Play Store:

- [ ] All icon sizes generated and placed correctly
- [ ] Adaptive icons configured (foreground + background)
- [ ] Play Store icon (512x512) created
- [ ] Splash screens for all densities
- [ ] Icons tested on different devices
- [ ] Icons appear correctly in Play Console preview
- [ ] No copyright issues with icon design
- [ ] Icons follow Material Design guidelines
- [ ] High quality, professional appearance

## Tips for Success

1. **Keep it Simple**: Icons should be recognizable at small sizes
2. **Test Early**: Preview icons on actual devices frequently
3. **Follow Guidelines**: Adhere to Material Design principles
4. **Be Unique**: Stand out while remaining professional
5. **Optimize Files**: Keep file sizes reasonable for faster loading
6. **Version Control**: Keep source files (1024x1024) in version control
7. **Brand Consistency**: Match your web app and marketing materials

## Need Help?

If you need professional icon design:
- Hire a designer on Fiverr, Upwork, or 99designs
- Use AI tools like Midjourney or DALL-E for initial concepts
- Contact: support@maplemetrics.com for recommendations