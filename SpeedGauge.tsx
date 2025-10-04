import React, { useEffect, useState } from 'react';

interface SpeedGaugeProps {
  speed: number;
  maxSpeed: number;
}

const SpeedGauge: React.FC<SpeedGaugeProps> = ({ speed, maxSpeed }) => {
  const [animatedSpeed, setAnimatedSpeed] = useState(speed);
  const percentage = (animatedSpeed / maxSpeed) * 100;
  const isOverSpeedLimit = animatedSpeed >= 100;
  
  useEffect(() => {
    const animate = () => {
      setAnimatedSpeed(prev => {
        const diff = speed - prev;
        const step = Math.sign(diff) * Math.min(Math.abs(diff), 2);
        return prev + step;
      });
    };

    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, [speed]);
  
  // Calculate the angle for the needle
  const rotationAngle = (percentage * 180) / 100;
  
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative h-48 w-full bg-gray-800 rounded-t-full overflow-hidden">
        {/* Gauge background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-full bg-gray-700 rounded-t-full" />
        </div>
        
        {/* Speed zones */}
        <div className="absolute bottom-0 left-0 right-0 h-full">
          <div className="relative h-full w-full rounded-t-full overflow-hidden">
            <div className="absolute bottom-0 left-0 w-7/12 h-full bg-green-500 opacity-20 rounded-tl-full" />
            <div className="absolute bottom-0 right-0 w-5/12 h-full bg-amber-500 opacity-20" />
            <div className="absolute bottom-0 right-0 w-3/12 h-full bg-red-500 opacity-20 rounded-tr-full" />
          </div>
        </div>
        
        {/* Speed needle */}
        <div 
          className={`absolute bottom-0 left-1/2 h-40 w-1 bg-red-500 origin-bottom transform -translate-x-1/2 transition-transform duration-100
            ${isOverSpeedLimit ? 'animate-[shake_0.5s_ease-in-out_infinite]' : ''}`}
          style={{ transform: `translateX(-50%) rotate(${rotationAngle - 90}deg)` }}
        >
          <div className="absolute top-0 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg" />
        </div>
        
        {/* Speed markers */}
        <div className="absolute inset-0">
          {[0, 50, 100, 150, 200].map((value, index) => (
            <div
              key={value}
              className="absolute bottom-0 left-1/2 h-full origin-bottom"
              style={{ transform: `rotate(${(value / maxSpeed) * 180 - 90}deg)` }}
            >
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-white">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Speed display */}
      <div className={`text-center mt-4 ${isOverSpeedLimit ? 'animate-pulse' : ''}`}>
        <div className={`text-4xl font-bold ${isOverSpeedLimit ? 'text-red-500' : 'text-white'}`}>
          {Math.round(animatedSpeed)} km/h
        </div>
        {isOverSpeedLimit && (
          <div className="text-sm font-normal text-red-400 mt-2 flex items-center justify-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            Speed limit exceeded!
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedGauge;