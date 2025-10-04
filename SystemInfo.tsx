import React from 'react';
import { Info, Cpu, Zap } from 'lucide-react';

const SystemInfo: React.FC = () => {
  return (
    <div className="p-6 rounded-lg shadow-lg bg-gray-800 border border-gray-700">
      <div className="flex items-center mb-4">
        <Info className="h-5 w-5 mr-2 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">System Information</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <Cpu className="h-5 w-5 mr-3 text-amber-400 mt-0.5" />
          <div>
            <h4 className="text-white font-medium">AT89S52 Microcontroller</h4>
            <p className="text-sm text-gray-400 mt-1">
              8-bit microcontroller with 8K Flash, 256 bytes RAM, 32 I/O lines, and 3 timers/counters. 
              Controls all components in the system.
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Zap className="h-5 w-5 mr-3 text-amber-400 mt-0.5" />
          <div>
            <h4 className="text-white font-medium">Communication System</h4>
            <p className="text-sm text-gray-400 mt-1">
              315 MHz Radio Frequency Module provides wireless communication between the transmitter
              circuit (helmet) and receiver circuit (motorcycle).
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Info className="h-5 w-5 mr-3 text-amber-400 mt-0.5" />
          <div>
            <h4 className="text-white font-medium">Safety Features</h4>
            <ul className="text-sm text-gray-400 mt-1 list-disc list-inside">
              <li>Force Sensing Resistor (FSR) detects rider's helmet</li>
              <li>BLDC Fan for motorcycle speed detection</li>
              <li>Alcohol sensor prevents engine start if alcohol is detected</li>
              <li>LED warning system flashes when speed exceeds 100 km/h</li>
              <li>YOLO algorithm for object detection and enhanced awareness</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemInfo;