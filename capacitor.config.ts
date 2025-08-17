import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.05bbd1a29a81435689ae6ce7cb3599e2',
  appName: 'MapleMetrics',
  webDir: 'dist',
  server: {
    url: 'https://05bbd1a2-9a81-4356-89ae-6ce7cb3599e2.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#dc2626",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#dc2626'
    }
  }
};

export default config;