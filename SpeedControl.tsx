import React from 'react';
import { Gauge, AlertCircle } from 'lucide-react';

interface SpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const SpeedControl: React.FC<SpeedControlProps> = ({ speed, onSpeedChange }) => {
  const isOverLimit = speed >= 100;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSpeedChange(parseInt(e.target.value, 10));
  };
  
  return (
    <div className="p-6 rounded-lg shadow-lg bg-gray-800 border border-gray-700">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Gauge className="h-5 w-5 mr-2 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Speed Control</h3>
          </div>
          <div className={`text-lg font-bold ${isOverLimit ? 'text-red-400' : 'text-white'}`}>
            {speed} km/h
          </div>
        </div>
        
        <input
          type="range"
          min="0"
          max="200"
          step="5"
          value={speed}
          onChange={handleChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        
        <div className="flex justify-between text-xs text-gray-400">
          <span>0</span>
          <span>50</span>
          <span className={speed >= 100 ? 'text-red-400 font-semibold' : ''}>100</span>
          <span>150</span>
          <span>200</span>
        </div>
        
        {isOverLimit && (
          <div className="mt-2 text-sm text-red-400 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Speed limit exceeded! LED warning activated.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedControl;