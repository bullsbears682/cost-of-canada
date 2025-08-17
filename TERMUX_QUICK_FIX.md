# Termux Quick Fix Guide

## Issue: Commands Got Combined
You accidentally ran multiple commands as one. Let's fix this step by step.

## Step-by-Step Fix:

### 1. First, install the packages correctly:
```bash
pkg install nodejs git -y
```
**Note:** `npm` comes bundled with `nodejs` in Termux, so we don't need to install it separately.

### 2. Verify Node.js and npm are installed:
```bash
node --version
npm --version
```
You should see version numbers for both.

### 3. Now clone the repository (separate command):
```bash
git clone https://github.com/bullsbears682/cost-of-canada.git
```

### 4. Navigate to the project:
```bash
cd cost-of-canada
```

### 5. Install dependencies:
```bash
npm install
```

### 6. Start the development server:
```bash
npm run dev
```

## If You Get Errors:

### Error: "npm not found"
```bash
# Check if npm is available
which npm

# If not found, try reinstalling nodejs
pkg uninstall nodejs
pkg install nodejs
```

### Error: "Permission denied" during npm install
```bash
# Set npm cache directory
mkdir ~/.npm-cache
npm config set cache ~/.npm-cache --global
npm install
```

### Error: "ENOSPC" (No space left)
```bash
# Check available space
df -h

# Clear npm cache if needed
npm cache clean --force
```

### Error: "gyp ERR" during install
```bash
# Install build tools
pkg install python clang make libc++
npm install
```

## Alternative: Step-by-Step Commands

Copy and paste these **one at a time**:

```bash
pkg install nodejs git python clang make -y
```

```bash
node --version && npm --version
```

```bash
git clone https://github.com/bullsbears682/cost-of-canada.git
```

```bash
cd cost-of-canada
```

```bash
npm install --verbose
```

```bash
npm run build
```

```bash
npm run dev
```

## Success Indicators:

When everything works, you'll see:
- ✅ Node.js and npm versions displayed
- ✅ Repository cloned successfully
- ✅ Dependencies installed without errors
- ✅ Development server starts
- ✅ Message like: "Local: http://localhost:5173"

## Quick Test:
Once the server starts, open your Android browser and go to:
**http://localhost:5173**

You should see the MapleMetrics app running!

## Troubleshooting Checklist:

- [ ] Termux is updated: `pkg update && pkg upgrade`
- [ ] Node.js installed: `pkg install nodejs git -y`
- [ ] Versions check: `node --version && npm --version`
- [ ] Repository cloned: `git clone https://github.com/bullsbears682/cost-of-canada.git`
- [ ] In correct directory: `cd cost-of-canada && pwd`
- [ ] Dependencies installed: `npm install`
- [ ] Server starts: `npm run dev`
- [ ] App loads in browser: http://localhost:5173