import React, { useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';

interface YoloVisualizationProps {
  isActive: boolean;
}

const YoloVisualization: React.FC<YoloVisualizationProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw road background
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw road lines
    ctx.strokeStyle = '#FFF';
    ctx.setLineDash([15, 15]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    
    // Draw vehicle
    ctx.setLineDash([]);
    ctx.fillStyle = '#555';
    ctx.fillRect(canvas.width / 2 - 30, canvas.height - 100, 60, 80);
    
    // Draw YOLO detection boxes with labels
    if (isActive) {
      // Vehicle detection
      drawDetectionBox(ctx, canvas.width / 2 - 40, canvas.height - 110, 80, 100, 'Vehicle', 0.93);
      
      // Road sign detection
      drawDetectionBox(ctx, 50, 50, 40, 40, 'Sign', 0.87);
      
      // Pedestrian detection
      drawDetectionBox(ctx, canvas.width - 100, canvas.height - 150, 30, 70, 'Person', 0.82);

      // Animate detections
      requestAnimationFrame(() => {
        if (canvasRef.current) {
          const randomOffset = Math.sin(Date.now() / 1000) * 5;
          ctx.translate(randomOffset, 0);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
      });
    }
  }, [isActive]);
  
  const drawDetectionBox = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    label: string, 
    confidence: number
  ) => {
    // Draw box
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    
    // Draw label background
    ctx.fillStyle = '#00ff00';
    const textMetrics = ctx.measureText(label);
    ctx.fillRect(x, y - 20, textMetrics.width + 60, 20);
    
    // Draw label text
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.fillText(`${label} ${(confidence * 100).toFixed(0)}%`, x + 5, y - 5);
  };
  
  return (
    <div className="p-6 rounded-lg shadow-lg bg-gray-800 border border-gray-700">
      <div className="flex items-center mb-4">
        <Camera className="h-5 w-5 mr-2 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">YOLO Object Detection</h3>
      </div>
      
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <canvas 
          ref={canvasRef} 
          width={800}
          height={400}
          className="w-full h-auto"
        />
      </div>
      
      <div className="mt-3 text-sm text-gray-400">
        {isActive ? (
          <span className="text-green-400 flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Active - Detecting objects in real-time
          </span>
        ) : (
          <span className="flex items-center">
            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
            Inactive - Engine must be started
          </span>
        )}
      </div>
    </div>
  );
};

export default YoloVisualization;