import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [buildingStage, setBuildingStage] = useState(0);

  useEffect(() => {
    const buildingStages = [
      { stage: 1, delay: 1000, progress: 20 },  // Foundation
      { stage: 2, delay: 2000, progress: 40 },  // Walls
      { stage: 3, delay: 1500, progress: 60 },  // Roof
      { stage: 4, delay: 2000, progress: 80 },  // Details
      { stage: 5, delay: 1500, progress: 100 }, // Complete
    ];

    let currentStageIndex = 0;
    
    const buildNext = () => {
      if (currentStageIndex < buildingStages.length) {
        const currentStage = buildingStages[currentStageIndex];
        setTimeout(() => {
          setBuildingStage(currentStage.stage);
          
          if (currentStage.stage === 5) {
            // House is complete, finish loading after a short pause
            setTimeout(onComplete, 1000);
          } else {
            currentStageIndex++;
            buildNext();
          }
        }, currentStage.delay);
      }
    };

    // Start building after a short delay
    setTimeout(buildNext, 500);
  }, [onComplete]);

  const getProgress = () => {
    switch (buildingStage) {
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
        {/* House Building Animation */}
        <div className="relative w-56 h-40 md:w-72 md:h-48 mx-auto mb-8">
          <svg 
            viewBox="0 0 200 120" 
            className="w-full h-full drop-shadow-lg"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
          >
            {/* Ground */}
            <rect 
              x="0" 
              y="110" 
              width="200" 
              height="10" 
              fill="#4ade80"
            />
            
            {/* Foundation - Stage 1 */}
            {buildingStage >= 1 && (
              <rect 
                x="50" 
                y="100" 
                width="100" 
                height="10" 
                fill="#6b7280"
                className="animate-scale-in"
              />
            )}
            
            {/* Walls - Stage 2 */}
            {buildingStage >= 2 && (
              <g className="animate-slide-up" style={{ animationDuration: '1s' }}>
                <rect x="50" y="70" width="100" height="30" fill="#f59e0b" />
                <rect x="50" y="70" width="100" height="30" fill="none" stroke="#d97706" strokeWidth="1" />
                {/* Brick pattern */}
                <line x1="50" y1="80" x2="150" y2="80" stroke="#d97706" strokeWidth="0.5" />
                <line x1="50" y1="90" x2="150" y2="90" stroke="#d97706" strokeWidth="0.5" />
                <line x1="70" y1="70" x2="70" y2="80" stroke="#d97706" strokeWidth="0.5" />
                <line x1="90" y1="80" x2="90" y2="90" stroke="#d97706" strokeWidth="0.5" />
                <line x1="110" y1="70" x2="110" y2="80" stroke="#d97706" strokeWidth="0.5" />
                <line x1="130" y1="80" x2="130" y2="90" stroke="#d97706" strokeWidth="0.5" />
              </g>
            )}
            
            {/* Roof - Stage 3 */}
            {buildingStage >= 3 && (
              <g className="animate-scale-in" style={{ transformOrigin: '100px 70px', animationDuration: '1.2s' }}>
                <polygon 
                  points="45,70 100,45 155,70" 
                  fill="#dc2626" 
                />
                <polygon 
                  points="45,70 100,45 155,70" 
                  fill="none" 
                  stroke="#991b1b" 
                  strokeWidth="1"
                />
                {/* Roof tiles pattern */}
                <line x1="50" y1="65" x2="95" y2="47" stroke="#991b1b" strokeWidth="0.5" />
                <line x1="55" y1="67" x2="100" y2="49" stroke="#991b1b" strokeWidth="0.5" />
                <line x1="105" y1="49" x2="150" y2="67" stroke="#991b1b" strokeWidth="0.5" />
                <line x1="100" y1="47" x2="145" y2="65" stroke="#991b1b" strokeWidth="0.5" />
              </g>
            )}
            
            {/* Windows and Door - Stage 4 */}
            {buildingStage >= 4 && (
              <g className="animate-fade-in" style={{ animationDuration: '1.5s' }}>
                {/* Door */}
                <rect x="90" y="85" width="20" height="15" fill="#8b4513" stroke="#654321" strokeWidth="0.5" />
                <circle cx="105" cy="92" r="1" fill="#fbbf24" />
                {/* Door panels */}
                <line x1="90" y1="90" x2="110" y2="90" stroke="#654321" strokeWidth="0.3" />
                <line x1="90" y1="95" x2="110" y2="95" stroke="#654321" strokeWidth="0.3" />
                
                {/* Left Window */}
                <rect x="60" y="80" width="15" height="12" fill="#87ceeb" stroke="#1d4ed8" strokeWidth="1" />
                <line x1="67.5" y1="80" x2="67.5" y2="92" stroke="#1d4ed8" strokeWidth="0.8" />
                <line x1="60" y1="86" x2="75" y2="86" stroke="#1d4ed8" strokeWidth="0.8" />
                {/* Window frame */}
                <rect x="59" y="79" width="17" height="14" fill="none" stroke="#b45309" strokeWidth="1" />
                
                {/* Right Window */}
                <rect x="125" y="80" width="15" height="12" fill="#87ceeb" stroke="#1d4ed8" strokeWidth="1" />
                <line x1="132.5" y1="80" x2="132.5" y2="92" stroke="#1d4ed8" strokeWidth="0.8" />
                <line x1="125" y1="86" x2="140" y2="86" stroke="#1d4ed8" strokeWidth="0.8" />
                {/* Window frame */}
                <rect x="124" y="79" width="17" height="14" fill="none" stroke="#b45309" strokeWidth="1" />
              </g>
            )}
            
            {/* Finishing touches - Stage 5 */}
            {buildingStage >= 5 && (
              <g className="animate-fade-in" style={{ animationDuration: '2s' }}>
                {/* Chimney */}
                <rect x="120" y="50" width="8" height="15" fill="#6b7280" stroke="#4b5563" strokeWidth="0.5" />
                <rect x="118" y="48" width="12" height="4" fill="#4b5563" />
                {/* Chimney bricks */}
                <line x1="120" y1="55" x2="128" y2="55" stroke="#4b5563" strokeWidth="0.3" />
                <line x1="120" y1="60" x2="128" y2="60" stroke="#4b5563" strokeWidth="0.3" />
                
                {/* Animated Smoke */}
                <g className="animate-bounce" style={{ animationDuration: '3s', animationIterationCount: 'infinite' }}>
                  <circle cx="122" cy="45" r="2" fill="#e5e7eb" opacity="0.8" />
                  <circle cx="125" cy="40" r="1.5" fill="#e5e7eb" opacity="0.6" />
                  <circle cx="127" cy="36" r="1" fill="#e5e7eb" opacity="0.4" />
                  <circle cx="129" cy="32" r="0.8" fill="#e5e7eb" opacity="0.2" />
                </g>
                
                {/* Enhanced Landscaping */}
                <g fill="#22c55e">
                  {/* Grass tufts */}
                  <rect x="25" y="108" width="2" height="4" />
                  <rect x="30" y="109" width="1" height="3" />
                  <rect x="35" y="107" width="2" height="5" />
                  <rect x="160" y="108" width="2" height="4" />
                  <rect x="165" y="109" width="1" height="3" />
                  <rect x="170" y="107" width="2" height="5" />
                  <rect x="175" y="109" width="1" height="3" />
                </g>
                
                {/* Decorative flowers */}
                <g>
                  <circle cx="40" cy="105" r="2" fill="#ec4899" />
                  <circle cx="42" cy="103" r="1.5" fill="#f97316" />
                  <circle cx="160" cy="105" r="2" fill="#8b5cf6" />
                  <circle cx="162" cy="103" r="1.5" fill="#eab308" />
                </g>
                
                {/* Welcome mat */}
                <rect x="85" y="99" width="30" height="3" fill="#92400e" stroke="#78350f" strokeWidth="0.3" />
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
            {buildingStage === 0 && "Finding the perfect location... 🔍"}
            {buildingStage === 1 && "Laying a solid foundation... 🏗️"}
            {buildingStage === 2 && "Raising the walls... 🧱"}
            {buildingStage === 3 && "Installing the roof... 🏠"}
            {buildingStage === 4 && "Adding windows and doors... 🚪"}
            {buildingStage === 5 && "Welcome to your new Canadian home! 🎉"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;