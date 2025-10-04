import React from 'react';
import { FlaskConical as Flask, AlertOctagon, Check } from 'lucide-react';

interface AlcoholSensorProps {
  isDetected: boolean;
  onClick: () => void;
}

const AlcoholSensor: React.FC<AlcoholSensorProps> = ({ isDetected, onClick }) => {
  return (
    <div 
      className={`p-6 rounded-lg shadow-lg transition-all duration-300 cursor-pointer
        ${isDetected ? 'bg-red-900/20 border border-red-500/50' : 'bg-green-900/20 border border-green-500/50'}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className={`p-4 rounded-full ${isDetected ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
          <Flask className={`h-14 w-14 ${isDetected ? 'text-red-400' : 'text-green-400'}`} />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white">
            Alcohol Sensor
          </h3>
          <div className={`flex items-center justify-center mt-2 
            ${isDetected ? 'text-red-400' : 'text-green-400'}`}
          >
            {isDetected ? (
              <>
                <AlertOctagon className="w-5 h-5 mr-1" />
                <span>Alcohol Detected</span>
              </>
            ) : (
              <>
                <Check className="w-5 h-5 mr-1" />
                <span>No Alcohol Detected</span>
              </>
            )}
          </div>
        </div>

        {isDetected && (
          <div className="text-sm text-red-300 mt-2 text-center animate-pulse">
            <AlertOctagon className="w-4 h-4 inline-block mr-1" />
            Engine Start Prevented
          </div>
        )}

        <div className="text-xs text-gray-400 mt-1 italic text-center">
          Click to toggle alcohol detection
        </div>
      </div>
    </div>
  );
};

export default AlcoholSensor;