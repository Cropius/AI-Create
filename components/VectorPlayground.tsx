import React, { useState, useEffect } from 'react';
import { Vector2 } from '../types';
import { Eye, EyeOff } from 'lucide-react';

interface VectorPlaygroundProps {
  initialF1?: number;
  initialF2?: number;
  initialAngle?: number;
  showResultant?: boolean;
  interactive?: boolean;
}

const VectorPlayground: React.FC<VectorPlaygroundProps> = ({
  initialF1 = 100,
  initialF2 = 100,
  initialAngle = 60,
  showResultant = true,
  interactive = true,
}) => {
  const [f1Mag, setF1Mag] = useState(initialF1);
  const [f2Mag, setF2Mag] = useState(initialF2);
  const [angle, setAngle] = useState(initialAngle);
  const [isResultantVisible, setIsResultantVisible] = useState(showResultant);

  // Center of the SVG
  const cx = 200;
  const cy = 250;

  // Calculate endpoint of F1 (Horizontal fixed for simplicity)
  const f1End: Vector2 = {
    x: cx + f1Mag,
    y: cy,
  };

  // Calculate endpoint of F2 (Variable angle)
  // SVG coordinates: y increases downwards. 
  // Angle 0 is right. We want F2 to rotate counter-clockwise from F1.
  const rad = (angle * Math.PI) / 180;
  const f2End: Vector2 = {
    x: cx + f2Mag * Math.cos(-rad),
    y: cy + f2Mag * Math.sin(-rad),
  };

  // Calculate Resultant F (Parallelogram rule: vector addition)
  const fResultantEnd: Vector2 = {
    x: f1End.x + (f2End.x - cx),
    y: f1End.y + (f2End.y - cy),
  };

  const resultantMag = Math.sqrt(
    f1Mag * f1Mag + f2Mag * f2Mag + 2 * f1Mag * f2Mag * Math.cos(rad)
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="relative">
          <svg width="400" height="350" className="bg-slate-50 rounded-lg border border-slate-100">
            <defs>
              <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,4 L6,2 z" fill="#ef4444" />
              </marker>
              <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,4 L6,2 z" fill="#3b82f6" />
              </marker>
              <marker id="arrow-purple" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,4 L6,2 z" fill="#a855f7" />
              </marker>
            </defs>

            {/* Grid lines */}
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            </pattern>
            <rect width="400" height="350" fill="url(#grid)" />

            {/* Parallelogram dashed lines */}
            {isResultantVisible && (
              <>
                <line x1={f1End.x} y1={f1End.y} x2={fResultantEnd.x} y2={fResultantEnd.y} stroke="#94a3b8" strokeWidth="1" strokeDasharray="5,5" />
                <line x1={f2End.x} y1={f2End.y} x2={fResultantEnd.x} y2={fResultantEnd.y} stroke="#94a3b8" strokeWidth="1" strokeDasharray="5,5" />
                
                {/* Resultant Vector */}
                <line
                  x1={cx}
                  y1={cy}
                  x2={fResultantEnd.x}
                  y2={fResultantEnd.y}
                  stroke="#a855f7"
                  strokeWidth="4"
                  markerEnd="url(#arrow-purple)"
                />
                <text x={fResultantEnd.x + 10} y={fResultantEnd.y} fill="#a855f7" fontWeight="bold" fontSize="14">F</text>
              </>
            )}

            {/* F1 Vector */}
            <line
              x1={cx}
              y1={cy}
              x2={f1End.x}
              y2={f1End.y}
              stroke="#ef4444"
              strokeWidth="3"
              markerEnd="url(#arrow-red)"
            />
            <text x={f1End.x} y={f1End.y + 20} fill="#ef4444" fontWeight="bold">F₁</text>

            {/* F2 Vector */}
            <line
              x1={cx}
              y1={cy}
              x2={f2End.x}
              y2={f2End.y}
              stroke="#3b82f6"
              strokeWidth="3"
              markerEnd="url(#arrow-blue)"
            />
            <text x={f2End.x - 10} y={f2End.y - 10} fill="#3b82f6" fontWeight="bold">F₂</text>

            {/* Angle Arc */}
            <path
              d={`M ${cx + 30} ${cy} A 30 30 0 0 0 ${cx + 30 * Math.cos(-rad)} ${cy + 30 * Math.sin(-rad)}`}
              fill="none"
              stroke="#64748b"
              strokeWidth="1.5"
            />
            <text x={cx + 40} y={cy - 10} fontSize="12" fill="#64748b">θ</text>

            {/* Center Point */}
            <circle cx={cx} cy={cy} r="3" fill="#1e293b" />
            <text x={cx - 15} y={cy + 15} fontSize="12" fontWeight="bold">O</text>
          </svg>
        </div>

        {interactive && (
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-2">参数调整 (Parameters)</h3>
            
            <div>
              <label className="flex justify-between text-sm font-medium text-slate-600 mb-1">
                <span>F₁ 大小</span>
                <span className="text-red-500">{Math.round(f1Mag)} N</span>
              </label>
              <input
                type="range"
                min="20"
                max="150"
                value={f1Mag}
                onChange={(e) => setF1Mag(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium text-slate-600 mb-1">
                <span>F₂ 大小</span>
                <span className="text-blue-500">{Math.round(f2Mag)} N</span>
              </label>
              <input
                type="range"
                min="20"
                max="150"
                value={f2Mag}
                onChange={(e) => setF2Mag(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium text-slate-600 mb-1">
                <span>夹角 θ</span>
                <span className="text-slate-700">{angle}°</span>
              </label>
              <input
                type="range"
                min="0"
                max="180"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
                <button
                    onClick={() => setIsResultantVisible(!isResultantVisible)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                        isResultantVisible 
                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                        : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
                    }`}
                >
                    {isResultantVisible ? <EyeOff size={18}/> : <Eye size={18}/>}
                    {isResultantVisible ? '隐藏合力 (Hide)' : '显示合力 (Show)'}
                </button>
            </div>

            {isResultantVisible && (
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 animate-fade-in">
                    <div className="text-sm text-purple-800 mb-1">合力 F 大小 (Resultant):</div>
                    <div className="text-2xl font-bold text-purple-700">{Math.round(resultantMag)} N</div>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VectorPlayground;