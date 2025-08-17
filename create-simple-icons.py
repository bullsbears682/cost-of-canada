#!/usr/bin/env python3
"""
Simple MapleMetrics icon generator
Creates basic app icons without getting creative
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
except ImportError:
    print("Installing required packages...")
    os.system("pip install Pillow")
    from PIL import Image, ImageDraw, ImageFont
    import os

def create_icon(size, output_path):
    """Create a simple MapleMetrics icon"""
    
    # Create image with blue background
    img = Image.new('RGBA', (size, size), (30, 64, 175, 255))  # #1e40af
    draw = ImageDraw.Draw(img)
    
    # Try to use a system font, fallback to default
    try:
        font_size = int(size * 0.3)
        font = ImageFont.truetype("/system/fonts/Roboto-Bold.ttf", font_size)
    except:
        try:
            font = ImageFont.load_default()
        except:
            font = None
    
    # Draw "MM" text in center
    text = "MM"
    if font:
        # Get text size
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
    else:
        # Fallback for text size
        text_width = size * 0.4
        text_height = size * 0.3
    
    # Center the text
    x = (size - text_width) // 2
    y = (size - text_height) // 2
    
    # Draw white text
    draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)
    
    # Add simple maple leaf (optional)
    if size >= 72:  # Only for larger icons
        leaf_size = size // 8
        leaf_x = size // 2
        leaf_y = size // 4
        
        # Simple leaf shape (triangle)
        points = [
            (leaf_x, leaf_y),
            (leaf_x - leaf_size, leaf_y + leaf_size),
            (leaf_x + leaf_size, leaf_y + leaf_size)
        ]
        draw.polygon(points, fill=(255, 255, 255, 200))
    
    # Save the icon
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, 'PNG')
    print(f"✅ Created: {output_path}")

def main():
    """Generate all required icon sizes"""
    
    print("🍁 Generating MapleMetrics app icons...")
    print("📱 Simple design: Blue background + white MM + small maple leaf")
    
    # Icon sizes for Android
    sizes = [
        (48, "android/app/src/main/res/mipmap-mdpi/ic_launcher.png"),
        (72, "android/app/src/main/res/mipmap-hdpi/ic_launcher.png"),
        (96, "android/app/src/main/res/mipmap-xhdpi/ic_launcher.png"),
        (144, "android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png"),
        (192, "android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png"),
        (512, "android/app/src/main/ic_launcher-playstore.png")
    ]
    
    for size, path in sizes:
        create_icon(size, path)
    
    print("\n🎉 All icons created successfully!")
    print("\n📋 Next steps:")
    print("1. npx cap sync android")
    print("2. cd android && ./gradlew assembleDebug")
    print("3. Your APK will be ready!")

if __name__ == "__main__":
    main()