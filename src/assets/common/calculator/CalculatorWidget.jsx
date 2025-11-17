import React, { useState } from 'react';
import { Calculator, Droplet } from 'lucide-react';

// src/assets/common/calculator/CalculatorWidget.jsx
// (파일 경로가 주석에 명시되어 있어 해당 경로로 이동)

const CalculatorWidget = () => {
  const [activeCalcTab, setActiveCalcTab] = useState('carbon'); 

  // 계산기 상태
  const [carbonInput, setCarbonInput] = useState('');
  const [carbonResult, setCarbonResult] = useState(null);
  const [waterInput, setWaterInput] = useState('');
  const [waterResult, setWaterResult] = useState(null);

  // 탄소 계산기 로직 (예시)
  // TODO: (AXIOS) 더 정확한 계산 로직 API 연동
  const handleCarbonCalc = () => {
    const value = parseFloat(carbonInput);
    if (!isNaN(value)) {
      setCarbonResult(value * 0.45); // (임시 계산)
    } else {
      setCarbonResult(null);
    }
  };

  // 물 계산기 로직 (예시)
  // TODO: (AXIOS) 더 정확한 계산 로직 API 연동
  const handleWaterCalc = () => {
    const value = parseFloat(waterInput);
    if (!isNaN(value)) {
      setWaterResult(value * 120); // (임시 계산)
    } else {
      setWaterResult(null);
    }
  };
  
  const renderCalcContent = () => {
    if (activeCalcTab === 'carbon') {
      return (
        <div className="pt-6">
          <h4 className="text-lg font-semibold text-white mb-2">탄소 발자국 계산기</h4>
          <p className="text-sm text-gray-300 mb-4">
            오늘 이동한 거리(km)를 입력하세요.
          </p>
          <div className="flex space-x-2">
            <input 
              type="number"
                value={carbonInput}
                onChange={(e) => setCarbonInput(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-gray-400"
                placeholder="이동 거리 (km)"
            />
            <button 
              onClick={handleCarbonCalc}
              className="flex-shrink-0 px-5 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              계산
            </button>
          </div>
          {carbonResult !== null && (
            <div className="mt-4 p-3 bg-black/20 rounded-lg text-center">
            <span className="text-sm text-gray-300">예상 배출량: </span>
            <span className="text-lg font-bold text-white">{carbonResult.toFixed(2)} kg CO₂</span>
            </div>
          )}
        </div>
        );
    }
    if (activeCalcTab === 'water') {
      return (
        <div className="pt-6">
          <h4 className="text-lg font-semibold text-white mb-2">물 발자국 계산기</h4>
          <p className="text-sm text-gray-300 mb-4">
            오늘 샤워 시간(분)을 입력하세요.
          </p>
          <div className="flex space-x-2">
            <input 
              type="number"
              value={waterInput}
              onChange={(e) => setWaterInput(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-gray-400"
              placeholder="샤워 시간 (분)"
            />
            <button 
              onClick={handleWaterCalc}
              className="flex-shrink-0 px-5 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              계산
            </button>
          </div>
          {waterResult !== null && (
            <div className="mt-4 p-3 bg-black/20 rounded-lg text-center">
              <span className="text-sm text-gray-300">예상 사용량: </span>
              <span className="text-lg font-bold text-white">{waterResult.toFixed(1)} L</span>
            </div>
          )}
        </div>
        );
    }
  };

  return (
    // EcoMainPage의 그리드에 맞게 col-span-6 유지
    <div className="col-span-12 md:col-span-6 rounded-3xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* 탭 영역 */}
      <div className="flex-shrink-0 p-4 pt-6 flex items-end space-x-2">
        <button 
          onClick={() => setActiveCalcTab('carbon')}
          className={`flex items-center space-x-2 px-4 py-2 font-semibold rounded-t-lg transition-colors
            ${activeCalcTab === 'carbon' 
              ? 'bg-gray-700 text-white' 
              : 'bg-black/30 text-gray-400 hover:bg-black/50'
            }`}
        >
          <Calculator className="w-4 h-4" />
          <span>탄소계산기</span>
        </button>
        <button 
          onClick={() => setActiveCalcTab('water')}
          className={`flex items-center space-x-2 px-4 py-2 font-semibold rounded-t-lg transition-colors
            ${activeCalcTab === 'water' 
              ? 'bg-gray-700 text-white' 
              : 'bg-black/30 text-gray-400 hover:bg-black/50'
            }`}
        >
          <Droplet className="w-4 h-4" /> 
          <span>물계산기</span>
        </button>
      </div>
      {/* 내용 영역 (어두운 배경) */}
      <div className="flex-1 p-6">
        {renderCalcContent()}
      </div>
    </div>
  );
};

export default CalculatorWidget;