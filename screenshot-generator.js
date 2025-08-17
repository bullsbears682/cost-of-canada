import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Google Play Store screenshot dimensions
const SCREENSHOT_SIZES = {
  phone: { width: 1080, height: 1920 }, // 9:16 ratio
  tablet: { width: 1920, height: 1200 }, // 8:5 ratio
  feature: { width: 1024, height: 500 }  // Feature graphic
};

// Screenshot scenarios
const SCENARIOS = [
  {
    name: 'home-screen',
    description: 'Main dashboard with Canadian loading screen',
    path: '/',
    waitFor: '.page-fade-in'
  },
  {
    name: 'market-dashboard',
    description: 'Real-time market data dashboard',
    path: '/market-dashboard',
    waitFor: '.market-dashboard'
  },
  {
    name: 'housing-analyzer',
    description: 'Housing affordability calculator',
    path: '/housing-analyzer',
    waitFor: '.housing-analyzer'
  },
  {
    name: 'retirement-planner',
    description: 'Retirement planning tool',
    path: '/retirement-planner',
    waitFor: '.retirement-planner'
  },
  {
    name: 'salary-calculator',
    description: 'Salary requirements calculator',
    path: '/salary-calculator',
    waitFor: '.salary-calculator'
  },
  {
    name: 'benefits-finder',
    description: 'Government benefits finder',
    path: '/benefits-finder',
    waitFor: '.benefits-finder'
  },
  {
    name: 'tools-grid',
    description: 'All tools with action buttons',
    path: '/',
    waitFor: '.grid',
    scrollTo: '.grid'
  },
  {
    name: 'mobile-interface',
    description: 'Mobile-optimized interface',
    path: '/',
    waitFor: '.mobile-layout',
    viewport: { width: 375, height: 812 } // iPhone X
  }
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateScreenshots() {
  console.log('🚀 Starting screenshot generation...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // Create screenshots directory
    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    for (const scenario of SCENARIOS) {
      console.log(`📸 Generating screenshot: ${scenario.name}`);
      
      const page = await browser.newPage();
      
      // Set viewport
      const viewport = scenario.viewport || SCREENSHOT_SIZES.phone;
      await page.setViewport(viewport);
      
      // Navigate to page
      await page.goto(`http://localhost:4173${scenario.path}`, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Wait for specific element
      if (scenario.waitFor) {
        try {
          await page.waitForSelector(scenario.waitFor, { timeout: 10000 });
        } catch (error) {
          console.log(`⚠️  Element ${scenario.waitFor} not found, continuing...`);
        }
      }

      // Scroll to specific element if needed
      if (scenario.scrollTo) {
        await page.evaluate((selector) => {
          const element = document.querySelector(selector);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, scenario.scrollTo);
        await sleep(1000);
      }

      // Wait for animations to complete
      await sleep(2000);

      // Take screenshot
      const screenshotPath = path.join(screenshotsDir, `${scenario.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      console.log(`✅ Saved: ${screenshotPath}`);
      await page.close();
    }

    // Generate feature graphic
    console.log('🎨 Generating feature graphic...');
    const featurePage = await browser.newPage();
    await featurePage.setViewport(SCREENSHOT_SIZES.feature);
    await featurePage.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    
    // Create feature graphic layout
    await featurePage.evaluate(() => {
      const style = document.createElement('style');
      style.textContent = `
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .feature-graphic {
          text-align: center;
          padding: 40px;
        }
        .feature-graphic h1 {
          font-size: 48px;
          font-weight: bold;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .feature-graphic p {
          font-size: 24px;
          opacity: 0.9;
          margin-bottom: 30px;
        }
        .feature-graphic .icon {
          font-size: 80px;
          margin-bottom: 20px;
        }
      `;
      document.head.appendChild(style);
      
      document.body.innerHTML = `
        <div class="feature-graphic">
          <div class="icon">🍁</div>
          <h1>MapleMetrics</h1>
          <p>Navigate Canada's Housing Market</p>
          <p style="font-size: 18px; opacity: 0.8;">Comprehensive financial tools for Canadian homebuyers</p>
        </div>
      `;
    });

    const featurePath = path.join(screenshotsDir, 'feature-graphic.png');
    await featurePage.screenshot({
      path: featurePath,
      fullPage: false
    });

    console.log(`✅ Saved: ${featurePath}`);
    await featurePage.close();

  } catch (error) {
    console.error('❌ Error generating screenshots:', error);
  } finally {
    await browser.close();
  }

  console.log('🎉 Screenshot generation complete!');
  console.log('📁 Check the "screenshots" folder for your images');
}

// Run the script
generateScreenshots().catch(console.error);