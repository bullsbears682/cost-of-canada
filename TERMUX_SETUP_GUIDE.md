# MapleMetrics on Termux - Complete Setup Guide

## What is Termux?
Termux is a Linux environment for Android that doesn't require root access. You can run Node.js, build tools, and even test your React app directly on your Android device.

## Prerequisites

### 1. Install Termux
- Download from **F-Droid** (recommended): https://f-droid.org/en/packages/com.termux/
- Or from **Google Play Store** (limited updates)

### 2. Install Termux:API (Optional but recommended)
- Provides access to Android APIs
- Download from F-Droid: https://f-droid.org/en/packages/com.termux.api/

## Initial Termux Setup

### 1. Update Package Lists
```bash
pkg update && pkg upgrade -y
```

### 2. Install Essential Packages
```bash
# Install Node.js and development tools
pkg install nodejs npm git python clang make libc++ -y

# Install additional tools
pkg install wget curl openssh -y
```

### 3. Configure Storage Access
```bash
termux-setup-storage
```
This gives Termux access to your device's shared storage.

## Setting Up MapleMetrics

### 1. Clone Your Repository
```bash
# Navigate to a good location
cd ~/

# Clone your repository
git clone https://github.com/bullsbears682/cost-of-canada.git
cd cost-of-canada
```

### 2. Install Dependencies
```bash
# Install Node.js dependencies
npm install

# If you get permission errors, try:
npm config set cache ~/.npm-cache --global
npm install --no-optional
```

### 3. Build the Application
```bash
# Build for production
npm run build

# Or build for development
npm run build:dev
```

## Running MapleMetrics on Termux

### Method 1: Development Server (Recommended)
```bash
# Start the development server
npm run dev

# The app will be available at:
# http://localhost:5173
```

### Method 2: Preview Built Version
```bash
# Build and preview
npm run build
npm run preview

# Available at:
# http://localhost:4173
```

### Method 3: Simple HTTP Server
```bash
# Install a simple HTTP server
npm install -g http-server

# Build the app
npm run build

# Serve the built files
cd dist
http-server -p 8080

# Available at:
# http://localhost:8080
```

## Accessing Your App

### 1. From Android Browser
- Open your Android browser
- Go to `http://localhost:5173` (or the port shown in terminal)
- Your MapleMetrics app should load!

### 2. From Other Devices (Same Network)
```bash
# Find your device's IP address
ifconfig

# Look for something like 192.168.1.xxx
# Then access from other devices: http://192.168.1.xxx:5173
```

## Termux-Specific Optimizations

### 1. Create Aliases for Easy Commands
```bash
# Edit your .bashrc
nano ~/.bashrc

# Add these aliases:
alias mm-dev="cd ~/cost-of-canada && npm run dev"
alias mm-build="cd ~/cost-of-canada && npm run build"
alias mm-serve="cd ~/cost-of-canada && npm run preview"

# Reload configuration
source ~/.bashrc
```

### 2. Create Startup Script
```bash
# Create a startup script
nano ~/start-maplemetrics.sh

# Add this content:
#!/bin/bash
cd ~/cost-of-canada
echo "🍁 Starting MapleMetrics..."
echo "📱 Access at: http://localhost:5173"
echo "🌐 Or from other devices: http://$(hostname -I | cut -d' ' -f1):5173"
npm run dev

# Make it executable
chmod +x ~/start-maplemetrics.sh
```

### 3. Run with a Single Command
```bash
# Now you can start with:
~/start-maplemetrics.sh
```

## Testing Android-Specific Features

### 1. Capacitor in Termux (Advanced)
```bash
# Install Capacitor CLI
npm install -g @capacitor/cli

# Add Android platform (if you have Android SDK)
npx cap add android

# Sync web assets
npx cap sync android
```

### 2. Test Mobile UI
- Use Chrome DevTools mobile emulation
- Access via `chrome://inspect` on desktop Chrome
- Test touch interactions and responsive design

## Troubleshooting Common Issues

### 1. Node.js Version Issues
```bash
# Check Node.js version
node --version

# If you need a different version, use n:
npm install -g n
n stable
```

### 2. Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max_old_space_size=2048"

# Add to .bashrc for persistence
echo 'export NODE_OPTIONS="--max_old_space_size=2048"' >> ~/.bashrc
```

### 3. Port Already in Use
```bash
# Kill processes on port 5173
pkill -f "vite"

# Or use a different port
npm run dev -- --port 3000
```

### 4. Build Fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 5. Permission Errors
```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

## Performance Tips for Termux

### 1. Optimize Termux Settings
```bash
# Increase swap space (if needed)
echo "vm.swappiness=10" >> /data/data/com.termux/files/usr/etc/sysctl.conf

# Use a faster terminal
pkg install zsh
chsh -s zsh
```

### 2. Use Development Mode
```bash
# Use development build for faster iteration
npm run dev

# Instead of full builds every time
```

### 3. Monitor Resources
```bash
# Install htop to monitor system resources
pkg install htop
htop
```

## Advanced: Full Android Development Setup

### 1. Install Android SDK (Advanced Users)
```bash
# This is complex and requires significant storage
# Only attempt if you have 8GB+ free space

# Install Java
pkg install openjdk-17

# Download Android command line tools
# (Follow official Android documentation)
```

### 2. Build APK in Termux
```bash
# If you have Android SDK set up:
npm run android:build

# This creates an APK you can install
```

## Quick Start Script

Create this script for easy setup:

```bash
#!/bin/bash
# quick-setup.sh

echo "🍁 MapleMetrics Termux Quick Setup"
echo "=================================="

# Update packages
echo "📦 Updating packages..."
pkg update -y

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📥 Installing Node.js..."
    pkg install nodejs npm git -y
fi

# Clone repository if not present
if [ ! -d "cost-of-canada" ]; then
    echo "📂 Cloning MapleMetrics..."
    git clone https://github.com/bullsbears682/cost-of-canada.git
fi

# Setup project
cd cost-of-canada
echo "🔧 Installing dependencies..."
npm install

echo "🏗️  Building application..."
npm run build

echo "✅ Setup complete!"
echo "🚀 Run: npm run dev"
echo "🌐 Then open: http://localhost:5173"
```

## Testing Checklist

- [ ] Termux installed and updated
- [ ] Node.js and npm working
- [ ] Repository cloned successfully
- [ ] Dependencies installed without errors
- [ ] App builds successfully
- [ ] Development server starts
- [ ] App accessible in browser
- [ ] Mobile UI responsive
- [ ] Touch interactions work
- [ ] All features functional

## Support

If you encounter issues:
1. Check Termux documentation: https://wiki.termux.com/
2. Verify Node.js compatibility
3. Try clearing caches and reinstalling
4. Check available storage space
5. Restart Termux completely

## Pro Tips

1. **Use External Keyboard**: Makes development much easier
2. **Split Screen**: Run Termux and browser side by side
3. **Save Battery**: Use power saving mode when not actively developing
4. **Backup**: Regularly commit and push your changes
5. **Update Regularly**: Keep Termux and packages updated

---

**Happy coding on Android! 🚀📱**

Your MapleMetrics app is now ready to run natively on your Android device through Termux!