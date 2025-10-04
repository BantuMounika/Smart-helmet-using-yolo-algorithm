import React from 'react';
import { HardHat as Helmet, X, Check, AlertTriangle } from 'lucide-react';

interface HelmetStatusProps {
  isWorn: boolean;
  onClick: () => void;
}

const HelmetStatus: React.FC<HelmetStatusProps> = ({ isWorn, onClick }) => {
  return (
    <div 
      className={`p-6 rounded-lg shadow-lg transition-all duration-300 cursor-pointer
        ${isWorn ? 'bg-green-900/20 border border-green-500/50' : 'bg-red-900/20 border border-red-500/50'}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className={`p-4 rounded-full ${isWorn ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          <Helmet className={`h-14 w-14 ${isWorn ? 'text-green-400' : 'text-gray-400'}`} />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white">
            Helmet Status
          </h3>
          <div className={`flex items-center justify-center mt-2 
            ${isWorn ? 'text-green-400' : 'text-red-400'}`}
          >
            {isWorn ? (
              <>
                <Check className="w-5 h-5 mr-1" />
                <span>Helmet Detected</span>
              </>
            ) : (
              <>
                <X className="w-5 h-5 mr-1" />
                <span>Helmet Not Detected</span>
              </>
            )}
          </div>
        </div>

        <div className="text-sm text-gray-300 mt-2 text-center">
          <AlertTriangle className="w-4 h-4 inline-block mr-1" />
          FSR Sensor: {isWorn ? 'Pressure Detected' : 'No Pressure'}
        </div>

        <div className="text-xs text-gray-400 mt-1 italic text-center">
          Click to toggle helmet status
        </div>
      </div>
    </div>
  );
};

export default HelmetStatus;