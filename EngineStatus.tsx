import React from 'react';
import { Power, AlertCircle } from 'lucide-react';

interface EngineStatusProps {
  isRunning: boolean;
  canStart: boolean;
  onToggle: () => void;
  blockReason?: string;
}

const EngineStatus: React.FC<EngineStatusProps> = ({ 
  isRunning, 
  canStart,
  onToggle,
  blockReason
}) => {
  const getBgColor = () => {
    if (isRunning) return 'bg-green-900/20 border border-green-500/50';
    if (!canStart) return 'bg-red-900/20 border border-red-500/50';
    return 'bg-amber-900/20 border border-amber-500/50';
  };
  
  return (
    <div 
      className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${getBgColor()}`}
      data-testid="engine-status"
    >
      <div className="flex flex-col items-center space-y-4">
        <button 
          onClick={onToggle}
          disabled={!canStart && !isRunning}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 transform
            ${isRunning 
              ? 'bg-green-500 text-white shadow-lg shadow-green-500/50 hover:bg-green-600 scale-105' 
              : canStart 
                ? 'bg-gray-700 text-gray-300 hover:bg-amber-600 hover:text-white hover:scale-105' 
                : 'bg-red-900/50 text-gray-400 cursor-not-allowed'
            }`}
        >
          <Power 
            className={`h-12 w-12 transition-transform duration-500
              ${isRunning ? 'animate-pulse scale-110' : 'scale-100'}`}
          />
        </button>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white">
            Engine Status
          </h3>
          <div className={`mt-2 font-medium ${isRunning ? 'text-green-400' : 'text-gray-400'}`}>
            {isRunning ? (
              <div className="flex items-center justify-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Running
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                Stopped
              </div>
            )}
          </div>
        </div>

        {!canStart && !isRunning && blockReason && (
          <div className="text-sm text-red-300 mt-2 text-center animate-pulse">
            <AlertCircle className="w-4 h-4 inline-block mr-1" />
            {blockReason}
          </div>
        )}

        {canStart && !isRunning && (
          <div className="text-sm text-amber-300 mt-2 text-center">
            Ready to start
          </div>
        )}
      </div>
    </div>
  );
};

export default EngineStatus;