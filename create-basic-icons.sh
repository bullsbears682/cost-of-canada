#!/bin/bash

echo "🍁 Creating simple MapleMetrics app icons..."

# Function to create SVG icon
create_svg_icon() {
    local size=$1
    local output_file=$2
    
    cat > "$output_file" << EOF
<svg width="$size" height="$size" viewBox="0 0 $size $size" xmlns="http://www.w3.org/2000/svg">
  <!-- Blue background -->
  <rect width="$size" height="$size" rx="$(($size/5))" fill="#1e40af"/>
  
  <!-- Simple maple leaf (for larger icons) -->
  $(if [ $size -ge 72 ]; then
    leaf_size=$(($size/8))
    leaf_x=$(($size/2))
    leaf_y=$(($size/4))
    echo "<polygon points=\"$leaf_x,$(($leaf_y)) $(($leaf_x-$leaf_size)),$(($leaf_y+$leaf_size)) $(($leaf_x+$leaf_size)),$(($leaf_y+$leaf_size))\" fill=\"white\" opacity=\"0.8\"/>"
  fi)
  
  <!-- MM text -->
  <text x="$(($size/2))" y="$(($size*3/5))" font-family="Arial, sans-serif" font-size="$(($size/4))" font-weight="bold" text-anchor="middle" fill="white">MM</text>
</svg>
EOF
    
    echo "✅ Created SVG: $output_file"
}

# Create directories
mkdir -p android/app/src/main/res/mipmap-mdpi
mkdir -p android/app/src/main/res/mipmap-hdpi
mkdir -p android/app/src/main/res/mipmap-xhdpi
mkdir -p android/app/src/main/res/mipmap-xxhdpi
mkdir -p android/app/src/main/res/mipmap-xxxhdpi

# Generate SVG icons (we'll convert these to PNG manually)
create_svg_icon 48 "icon-48.svg"
create_svg_icon 72 "icon-72.svg" 
create_svg_icon 96 "icon-96.svg"
create_svg_icon 144 "icon-144.svg"
create_svg_icon 192 "icon-192.svg"
create_svg_icon 512 "icon-512.svg"

echo ""
echo "🎨 Simple icon design created:"
echo "   - Blue background (#1e40af)"
echo "   - White 'MM' text" 
echo "   - Small maple leaf (on larger icons)"
echo "   - Rounded corners"
echo ""
echo "📋 SVG files created - you can:"
echo "1. Open any SVG in browser and take screenshot"
echo "2. Use online SVG to PNG converter"
echo "3. Or use the HTML generator: create-app-icons.html"
echo ""
echo "📁 Place the PNG files in:"
echo "   - 48px → android/app/src/main/res/mipmap-mdpi/ic_launcher.png"
echo "   - 72px → android/app/src/main/res/mipmap-hdpi/ic_launcher.png" 
echo "   - 96px → android/app/src/main/res/mipmap-xhdpi/ic_launcher.png"
echo "   - 144px → android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png"
echo "   - 192px → android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png"
echo "   - 512px → android/app/src/main/ic_launcher-playstore.png"