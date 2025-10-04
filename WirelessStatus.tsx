import React from 'react';
import { Radio, Wifi, WifiOff } from 'lucide-react';

interface WirelessStatusProps {
  isConnected: boolean;
}

const WirelessStatus: React.FC<WirelessStatusProps> = ({ isConnected }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg transition-all duration-300
      ${isConnected ? 'bg-blue-900/20 border border-blue-500/50' : 'bg-gray-800 border border-gray-700'}`}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className={`p-4 rounded-full ${isConnected ? 'bg-blue-500/20' : 'bg-gray-700'}`}>
          <Radio className={`h-14 w-14 ${isConnected ? 'text-blue-400' : 'text-gray-500'}`} />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white">
            RF Communication
          </h3>
          <div className={`flex items-center justify-center mt-2 
            ${isConnected ? 'text-blue-400' : 'text-gray-500'}`}
          >
            {isConnected ? (
              <>
                <Wifi className="w-5 h-5 mr-1" />
                <span>Connected (315 MHz)</span>
              </>
            ) : (
              <>
                <WifiOff className="w-5 h-5 mr-1" />
                <span>Disconnected</span>
              </>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-400 mt-1 text-center">
          Transmitter ↔ Receiver
        </div>
      </div>
    </div>
  );
};

export default WirelessStatus;