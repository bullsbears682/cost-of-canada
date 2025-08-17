import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [buildingStage, setBuildingStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        
        // Update building stages based on progress
        if (newProgress >= 20 && buildingStage === 0) setBuildingStage(1); // Foundation
        if (newProgress >= 40 && buildingStage === 1) setBuildingStage(2); // Walls
        if (newProgress >= 60 && buildingStage === 2) setBuildingStage(3); // Roof
        if (newProgress >= 80 && buildingStage === 3) setBuildingStage(4); // Details
        if (newProgress >= 95 && buildingStage === 4) setBuildingStage(5); // Complete
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [buildingStage, onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-hero flex items-center justify-center z-50 touch-manipulation">
      <div className="text-center px-4 max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-3xl">🍁</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            MapleMetrics
          </h1>
          <p className="text-white/80 text-sm md:text-base">
            Building your cost analysis...
          </p>
        </div>

        {/* House Building Animation */}
        <div className="relative w-48 h-32 md:w-64 md:h-40 mx-auto mb-8">
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
              <g className="animate-slide-up">
                <rect x="50" y="70" width="100" height="30" fill="#f59e0b" />
                <rect x="50" y="70" width="100" height="30" fill="none" stroke="#d97706" strokeWidth="1" />
              </g>
            )}
            
            {/* Roof - Stage 3 */}
            {buildingStage >= 3 && (
              <g className="animate-scale-in" style={{ transformOrigin: '100px 70px' }}>
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
              </g>
            )}
            
            {/* Windows and Door - Stage 4 */}
            {buildingStage >= 4 && (
              <g className="animate-fade-in">
                {/* Door */}
                <rect x="90" y="85" width="20" height="15" fill="#8b4513" />
                <circle cx="105" cy="92" r="1" fill="#fbbf24" />
                
                {/* Windows */}
                <rect x="60" y="80" width="15" height="12" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="1" />
                <rect x="125" y="80" width="15" height="12" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="1" />
                <line x1="67.5" y1="80" x2="67.5" y2="92" stroke="#1d4ed8" strokeWidth="0.5" />
                <line x1="60" y1="86" x2="75" y2="86" stroke="#1d4ed8" strokeWidth="0.5" />
                <line x1="132.5" y1="80" x2="132.5" y2="92" stroke="#1d4ed8" strokeWidth="0.5" />
                <line x1="125" y1="86" x2="140" y2="86" stroke="#1d4ed8" strokeWidth="0.5" />
              </g>
            )}
            
            {/* Finishing touches - Stage 5 */}
            {buildingStage >= 5 && (
              <g className="animate-fade-in">
                {/* Chimney */}
                <rect x="120" y="50" width="8" height="15" fill="#6b7280" />
                <rect x="118" y="48" width="12" height="4" fill="#4b5563" />
                
                {/* Smoke */}
                <g className="animate-bounce" style={{ animationDuration: '2s' }}>
                  <circle cx="122" cy="45" r="2" fill="#e5e7eb" opacity="0.7" />
                  <circle cx="125" cy="40" r="1.5" fill="#e5e7eb" opacity="0.5" />
                  <circle cx="127" cy="36" r="1" fill="#e5e7eb" opacity="0.3" />
                </g>
                
                {/* Grass details */}
                <g fill="#22c55e">
                  <rect x="30" y="108" width="2" height="4" />
                  <rect x="35" y="109" width="1" height="3" />
                  <rect x="165" y="108" width="2" height="4" />
                  <rect x="170" y="109" width="1" height="3" />
                </g>
              </g>
            )}
          </svg>
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <Progress 
            value={progress} 
            className="h-2 bg-white/20"
          />
          <div className="text-white/80 text-sm">
            {progress < 20 && "Preparing foundation..."}
            {progress >= 20 && progress < 40 && "Building walls..."}
            {progress >= 40 && progress < 60 && "Adding roof..."}
            {progress >= 60 && progress < 80 && "Installing windows..."}
            {progress >= 80 && progress < 95 && "Finishing touches..."}
            {progress >= 95 && "Welcome home! 🏠"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;