import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SpeedGauge from './components/SpeedGauge';
import HelmetStatus from './components/HelmetStatus';
import AlcoholSensor from './components/AlcoholSensor';
import EngineStatus from './components/EngineStatus';
import WirelessStatus from './components/WirelessStatus';
import SpeedControl from './components/SpeedControl';
import YoloVisualization from './components/YoloVisualization';
import SystemInfo from './components/SystemInfo';
import { SystemState } from './types';

function App() {
  const [state, setState] = useState<SystemState>({
    helmetWorn: false,
    alcoholDetected: false,
    engineRunning: false,
    speed: 0,
    wirelessConnected: true,
  });

  // Check if engine can start
  const canEngineStart = state.helmetWorn && !state.alcoholDetected;
  
  // Get reason why engine can't start
  const getEngineBlockReason = (): string | undefined => {
    if (!state.helmetWorn) return 'Helmet not detected';
    if (state.alcoholDetected) return 'Alcohol detected';
    return undefined;
  };

  // Toggle helmet status
  const toggleHelmet = () => {
    setState(prev => {
      const newHelmetState = !prev.helmetWorn;
      // If helmet is removed while engine is running, stop the engine
      return {
        ...prev,
        helmetWorn: newHelmetState,
        engineRunning: newHelmetState ? prev.engineRunning : false
      };
    });
  };

  // Toggle alcohol detection
  const toggleAlcohol = () => {
    setState(prev => {
      const newAlcoholState = !prev.alcoholDetected;
      // If alcohol is detected while engine is running, stop the engine
      return {
        ...prev,
        alcoholDetected: newAlcoholState,
        engineRunning: newAlcoholState ? false : prev.engineRunning
      };
    });
  };

  // Toggle engine status
  const toggleEngine = () => {
    setState(prev => ({
      ...prev,
      engineRunning: !prev.engineRunning,
      // Reset speed when engine stops
      speed: !prev.engineRunning ? prev.speed : 0
    }));
  };

  // Update speed
  const handleSpeedChange = (newSpeed: number) => {
    setState(prev => ({
      ...prev,
      speed: prev.engineRunning ? newSpeed : 0
    }));
  };

  // Stop engine if helmet is removed or alcohol is detected
  useEffect(() => {
    if ((!state.helmetWorn || state.alcoholDetected) && state.engineRunning) {
      setState(prev => ({
        ...prev,
        engineRunning: false,
        speed: 0
      }));
    }
  }, [state.helmetWorn, state.alcoholDetected, state.engineRunning]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Top row - Status components */}
          <div className="lg:col-span-1">
            <HelmetStatus 
              isWorn={state.helmetWorn} 
              onClick={toggleHelmet} 
            />
          </div>
          
          <div className="lg:col-span-1">
            <AlcoholSensor 
              isDetected={state.alcoholDetected} 
              onClick={toggleAlcohol} 
            />
          </div>
          
          <div className="lg:col-span-1">
            <EngineStatus 
              isRunning={state.engineRunning}
              canStart={canEngineStart}
              onToggle={toggleEngine}
              blockReason={getEngineBlockReason()}
            />
          </div>
          
          {/* Middle row - Speed and RF */}
          <div className="lg:col-span-2 md:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Speed Monitor</h3>
                <SpeedGauge speed={state.speed} maxSpeed={200} />
              </div>
              
              <SpeedControl 
                speed={state.speed} 
                onSpeedChange={handleSpeedChange} 
              />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 gap-6">
              <WirelessStatus isConnected={state.wirelessConnected} />
              <SystemInfo />
            </div>
          </div>
          
          {/* Bottom row - YOLO visualization */}
          <div className="lg:col-span-3 md:col-span-2">
            <YoloVisualization isActive={state.engineRunning} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;