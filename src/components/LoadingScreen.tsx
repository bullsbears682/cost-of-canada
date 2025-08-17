import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [analysisStage, setAnalysisStage] = useState(0);

  useEffect(() => {
    // Canadian data analysis stages
    const stages = [
      { stage: 1, delay: 1200, progress: 20 },  // Maple leaf grows
      { stage: 2, delay: 1500, progress: 40 },  // Housing data bars
      { stage: 3, delay: 1300, progress: 60 },  // Economic indicators
      { stage: 4, delay: 1400, progress: 80 },  // Regional comparison
      { stage: 5, delay: 1000, progress: 100 }, // Analysis complete
    ];

    let currentStageIndex = 0;
    
    const analyzeNext = () => {
      if (currentStageIndex < stages.length) {
        const currentStage = stages[currentStageIndex];
        setTimeout(() => {
          setAnalysisStage(currentStage.stage);
          
          if (currentStage.stage === 5) {
            // Analysis is complete
            setTimeout(onComplete, 800);
          } else {
            currentStageIndex++;
            analyzeNext();
          }
        }, currentStage.delay);
      }
    };

    // Start analysis after a short delay
    setTimeout(analyzeNext, 500);
  }, [onComplete]);

  const getProgress = () => {
    switch (analysisStage) {
      case 0: return 0;
      case 1: return 20;
      case 2: return 40;
      case 3: return 60;
      case 4: return 80;
      case 5: return 100;
      default: return 0;
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-hero flex items-center justify-center z-50 touch-manipulation">
      <div className="text-center px-4 max-w-md mx-auto">
        {/* Canadian Data Analysis Animation */}
        <div className="relative w-64 h-48 md:w-80 md:h-60 mx-auto mb-8">
          <svg 
            viewBox="0 0 240 180" 
            className="w-full h-full drop-shadow-lg"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
          >
            {/* Background Grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ffffff20" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="240" height="180" fill="url(#grid)" />
            
            {/* Central Maple Leaf - Stage 1 */}
            {analysisStage >= 1 && (
              <g className="animate-scale-in" style={{ transformOrigin: '120px 90px', animationDuration: '1.5s' }}>
                <path 
                  d="M120,60 L125,75 L140,70 L130,85 L145,95 L125,90 L120,105 L115,90 L95,95 L110,85 L100,70 L115,75 Z" 
                  fill="#dc2626" 
                  stroke="#991b1b" 
                  strokeWidth="2"
                  className="floating"
                />
                {/* Maple leaf veins */}
                <line x1="120" y1="75" x2="120" y2="95" stroke="#991b1b" strokeWidth="1.5" />
                <line x1="115" y1="80" x2="125" y2="80" stroke="#991b1b" strokeWidth="1" />
                <line x1="110" y1="85" x2="130" y2="85" stroke="#991b1b" strokeWidth="1" />
              </g>
            )}
            
            {/* Housing Data Bars - Stage 2 */}
            {analysisStage >= 2 && (
              <g className="animate-slide-up" style={{ animationDuration: '1.2s' }}>
                {/* Data bars representing housing costs */}
                <rect x="30" y="140" width="15" height="25" fill="#3b82f6" className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                  <animate attributeName="height" values="0;25" dur="1s" begin="0.2s" />
                  <animate attributeName="y" values="165;140" dur="1s" begin="0.2s" />
                </rect>
                <rect x="50" y="120" width="15" height="45" fill="#10b981" className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
                  <animate attributeName="height" values="0;45" dur="1s" begin="0.4s" />
                  <animate attributeName="y" values="165;120" dur="1s" begin="0.4s" />
                </rect>
                <rect x="70" y="130" width="15" height="35" fill="#f59e0b" className="animate-scale-in" style={{ animationDelay: '0.6s' }}>
                  <animate attributeName="height" values="0;35" dur="1s" begin="0.6s" />
                  <animate attributeName="y" values="165;130" dur="1s" begin="0.6s" />
                </rect>
                
                {/* Labels */}
                <text x="37" y="175" fill="#ffffff80" fontSize="8" textAnchor="middle">BC</text>
                <text x="57" y="175" fill="#ffffff80" fontSize="8" textAnchor="middle">ON</text>
                <text x="77" y="175" fill="#ffffff80" fontSize="8" textAnchor="middle">AB</text>
              </g>
            )}
            
            {/* Economic Indicators - Stage 3 */}
            {analysisStage >= 3 && (
              <g className="animate-fade-in" style={{ animationDuration: '1.5s' }}>
                {/* Curved trend line */}
                <path 
                  d="M160,140 Q170,130 180,125 T200,120" 
                  fill="none" 
                  stroke="#22c55e" 
                  strokeWidth="3"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                >
                  <animate attributeName="stroke-dashoffset" values="100;0" dur="1.5s" />
                </path>
                
                {/* Data points */}
                <circle cx="160" cy="140" r="4" fill="#22c55e" className="animate-scale-in" style={{ animationDelay: '0.5s' }} />
                <circle cx="175" cy="128" r="4" fill="#22c55e" className="animate-scale-in" style={{ animationDelay: '0.8s' }} />
                <circle cx="190" cy="125" r="4" fill="#22c55e" className="animate-scale-in" style={{ animationDelay: '1.1s' }} />
                <circle cx="200" cy="120" r="4" fill="#22c55e" className="animate-scale-in" style={{ animationDelay: '1.4s' }} />
                
                {/* Dollar signs floating up */}
                <g className="animate-slide-up" style={{ animationDuration: '2s', animationDelay: '0.5s' }}>
                  <text x="165" y="115" fill="#fbbf24" fontSize="12" fontWeight="bold">$</text>
                  <text x="185" y="110" fill="#fbbf24" fontSize="10" fontWeight="bold">$</text>
                  <text x="195" y="105" fill="#fbbf24" fontSize="8" fontWeight="bold">$</text>
                </g>
              </g>
            )}
            
            {/* Regional Comparison Pie Chart - Stage 4 */}
            {analysisStage >= 4 && (
              <g className="animate-scale-in" style={{ transformOrigin: '180px 60px', animationDuration: '1.3s' }}>
                {/* Pie slices */}
                <path d="M 180,60 L 180,40 A 20,20 0 0,1 195,50 Z" fill="#3b82f6" />
                <path d="M 180,60 L 195,50 A 20,20 0 0,1 190,75 Z" fill="#10b981" />
                <path d="M 180,60 L 190,75 A 20,20 0 0,1 170,75 Z" fill="#f59e0b" />
                <path d="M 180,60 L 170,75 A 20,20 0 0,1 175,45 Z" fill="#ef4444" />
                <path d="M 180,60 L 175,45 A 20,20 0 0,1 180,40 Z" fill="#8b5cf6" />
                
                {/* Center circle */}
                <circle cx="180" cy="60" r="8" fill="#1f2937" />
                <text x="180" y="64" fill="#ffffff" fontSize="6" textAnchor="middle">CA</text>
              </g>
            )}
            
            {/* Final Analytics Dashboard - Stage 5 */}
            {analysisStage >= 5 && (
              <g className="animate-fade-in" style={{ animationDuration: '1.8s' }}>
                {/* Dashboard frame */}
                <rect x="20" y="20" width="200" height="20" fill="#1f293780" stroke="#3b82f6" strokeWidth="1" rx="4" />
                <rect x="25" y="24" width="30" height="12" fill="#22c55e" rx="2" />
                <rect x="60" y="24" width="25" height="12" fill="#f59e0b" rx="2" />
                <rect x="90" y="24" width="35" height="12" fill="#ef4444" rx="2" />
                
                {/* Animated data stream */}
                <g>
                  <circle cx="200" cy="30" r="2" fill="#22c55e" opacity="0.8">
                    <animate attributeName="cx" values="200;180;200" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="205" cy="30" r="1.5" fill="#3b82f6" opacity="0.6">
                    <animate attributeName="cx" values="205;185;205" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                </g>
                
                {/* Success checkmark */}
                <g className="animate-scale-in" style={{ animationDelay: '1s' }}>
                  <circle cx="120" cy="40" r="12" fill="#22c55e" />
                  <path d="M112,40 L118,46 L128,34" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                </g>
              </g>
            )}
          </svg>
        </div>

        {/* Progress Bar and Messages */}
        <div className="space-y-4">
          <Progress 
            value={getProgress()} 
            className="h-2 bg-white/20"
          />
          <div className="text-white/80 text-sm md:text-base font-medium">
            {analysisStage === 0 && "Initializing Canadian cost analysis... 🇨🇦"}
            {analysisStage === 1 && "Connecting to government databases... 🍁"}
            {analysisStage === 2 && "Analyzing provincial housing data... 🏠"}
            {analysisStage === 3 && "Processing economic indicators... 📈"}
            {analysisStage === 4 && "Comparing regional costs... 🗺️"}
            {analysisStage === 5 && "Welcome to MapleMetrics! Ready to explore! ✨"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;