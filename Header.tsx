import React from 'react';
import { HardHat as Helmet, AlertTriangle, AlertCircle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Helmet className="h-8 w-8 mr-3 text-amber-400" />
          <h1 className="text-2xl font-bold">RideSafe</h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-400" />
            <span className="text-sm">Safety First</span>
          </div>
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
            <span className="text-sm">AT89S52 Powered</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;