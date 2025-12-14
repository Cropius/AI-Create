import React, { useState, useRef, useEffect } from 'react';
import Quiz from './Quiz';
import { ArrowDown, Move, RotateCcw, Eye, EyeOff } from 'lucide-react';

const SectionExperiment = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [showPrinciple, setShowPrinciple] = useState(false);
  
  // Coordinates
  const svgWidth = 600;
  const svgHeight = 400;
  const center = svgWidth / 2;
  const anchorA = { x: center, y: 50 };
  const targetO = { x: center, y: 220 }; // The goal position

  // Handle Positions (Draggable)
  const [h1, setH1] = useState({ x: center - 100, y: 320 });
  const [h2, setH2] = useState({ x: center + 100, y: 320 });
  const [hSingle, setHSingle] = useState({ x: center, y: 380 });

  // Dragging State
  const [dragging, setDragging] = useState<'h1' | 'h2' | 'hSingle' | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Physics Logic (Simplified Spring Model)
  // We assume the rubber band and the connecting strings act like springs with similar constants for smooth interaction.
  // Step 1 (Two forces): Knot K is the centroid of A, H1, H2 (assuming equal k)
  // Step 2 (One force): Knot K is the midpoint of A, HSingle (assuming equal k)
  
  const getKnotPosition = () => {
    if (step === 1) {
      return {
        x: (anchorA.x + h1.x + h2.x) / 3,
        y: (anchorA.y + h1.y + h2.y) / 3
      };
    } else {
      return {
        x: (anchorA.x + hSingle.x) / 2,
        y: (anchorA.y + hSingle.y) / 2
      };
    }
  };

  const knot = getKnotPosition();

  // Check if target reached (tolerance of 5px)
  const distToTarget = Math.hypot(knot.x - targetO.x, knot.y - targetO.y);
  const isTargetReached = distToTarget < 8;

  // Calculate Forces (Proportional to length)
  const scaleFactor = 0.5; // Arbitrary scale for display N
  const getForce = (p1: {x:number, y:number}, p2: {x:number, y:number}) => {
    return Math.round(Math.hypot(p1.x - p2.x, p1.y - p2.y) * scaleFactor);
  };

  const force1 = getForce(knot, h1);
  const force2 = getForce(knot, h2);
  const forceSingle = getForce(knot, hSingle);
  const forceRubber = getForce(anchorA, knot);

  // Event Handlers
  const handlePointerDown = (id: 'h1' | 'h2' | 'hSingle', e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(id);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !svgRef.current) return;
    
    const CTM = svgRef.current.getScreenCTM();
    if (!CTM) return;

    const x = (e.clientX - CTM.e) / CTM.a;
    const y = (e.clientY - CTM.f) / CTM.d;

    // Constrain within bounds roughly
    const boundedX = Math.max(20, Math.min(svgWidth - 20, x));
    const boundedY = Math.max(50, Math.min(svgHeight - 20, y));

    if (dragging === 'h1') setH1({ x: boundedX, y: boundedY });
    if (dragging === 'h2') setH2({ x: boundedX, y: boundedY });
    if (dragging === 'hSingle') setHSingle({ x: boundedX, y: boundedY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setDragging(null);
  };

  // Reset positions
  const reset = () => {
    setH1({ x: center - 100, y: 320 });
    setH2({ x: center + 100, y: 320 });
    setHSingle({ x: center, y: 380 });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-indigo-600 pl-3">实验：探究力的合成规律</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Control Panel */}
            <div className="lg:w-1/3 space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h3 className="font-bold text-slate-700 mb-2 flex items-center flex-wrap gap-2">
                        实验原理：
                        <button 
                            onClick={() => setShowPrinciple(!showPrinciple)}
                            className={`relative px-3 py-1 rounded border transition-all duration-300 font-bold flex items-center gap-2 overflow-hidden ${
                                showPrinciple 
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                                : 'bg-slate-200 border-slate-300 text-transparent hover:bg-slate-300 min-w-[7em]'
                            }`}
                            aria-label={showPrinciple ? "Hide Principle" : "Show Principle"}
                        >
                           {showPrinciple ? (
                             <>
                               等效替代法
                             </>
                           ) : (
                             <span className="opacity-0">等效替代法</span> 
                           )}
                           {!showPrinciple && <span className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs select-none">点击查看</span>} 
                        </button>
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                         分别用一个力 F 和两个力 F₁、F₂，使橡皮条伸长到<span className="font-bold text-red-500">同一点 O</span>。
                    </p>
                    <p className="text-xs text-slate-500">
                        (Equivalent Substitution: Using one force to produce the same effect as two forces.)
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <button 
                        onClick={() => setStep(1)}
                        className={`py-3 rounded-lg text-sm font-bold border transition-all ${step === 1 ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                    >
                        步骤1: 两力拉
                        <div className="text-xs font-normal opacity-80">Two Forces</div>
                    </button>
                    <button 
                        onClick={() => setStep(2)}
                        className={`py-3 rounded-lg text-sm font-bold border transition-all ${step === 2 ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                    >
                        步骤2: 一力拉
                        <div className="text-xs font-normal opacity-80">One Force</div>
                    </button>
                </div>

                <div className="p-4 bg-indigo-50 text-indigo-900 rounded-lg text-sm border border-indigo-100">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Move size={16} /> 
                        操作指南
                    </h4>
                    {step === 1 ? (
                        <ul className="list-disc pl-4 space-y-1">
                            <li>拖动下方的两个 <span className="font-bold">测力计</span>。</li>
                            <li>调整方向和拉力大小。</li>
                            <li>目标：使 <span className="text-orange-500 font-bold">● 结点</span> 与 <span className="text-red-500 font-bold">⭕ O点</span> 重合。</li>
                        </ul>
                    ) : (
                        <ul className="list-disc pl-4 space-y-1">
                            <li>拖动下方的一个 <span className="font-bold">测力计</span>。</li>
                            <li>目标：再次使 <span className="text-orange-500 font-bold">● 结点</span> 到达 <span className="text-red-500 font-bold">⭕ 同一位置 O</span>。</li>
                        </ul>
                    )}
                </div>

                <button onClick={reset} className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 px-2 py-1">
                    <RotateCcw size={14} /> 重置位置
                </button>
            </div>

            {/* Interactive SVG Area */}
            <div className="lg:w-2/3 relative">
                <svg 
                    ref={svgRef}
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
                    className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200 touch-none cursor-crosshair shadow-inner"
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                >
                    <defs>
                         {/* Wood Texture Pattern */}
                         <pattern id="woodPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                             <rect width="20" height="20" fill="#fefce8" />
                             <path d="M0 10 L20 10 M10 0 L10 20" stroke="#fef9c3" strokeWidth="1" />
                         </pattern>
                         <marker id="arrow-gray" markerWidth="10" markerHeight="10" refX="4" refY="2" orient="auto">
                            <path d="M0,0 L0,4 L6,2 z" fill="#94a3b8" />
                         </marker>
                    </defs>
                    <rect width={svgWidth} height={svgHeight} fill="url(#woodPattern)" />

                    {/* Target O */}
                    <g transform={`translate(${targetO.x}, ${targetO.y})`}>
                        <circle r="8" fill="none" stroke={isTargetReached ? "#22c55e" : "#ef4444"} strokeWidth="2" strokeDasharray="2,2" />
                        <text x="15" y="5" fill={isTargetReached ? "#22c55e" : "#ef4444"} fontWeight="bold" fontSize="14">O (Target)</text>
                    </g>
                    {isTargetReached && (
                         <text x={svgWidth/2} y={svgHeight - 20} textAnchor="middle" fill="#22c55e" fontWeight="bold" fontSize="16">
                            ✓ 达成目标 (Target Reached)
                         </text>
                    )}

                    {/* Rubber Band (Anchor A to Knot) */}
                    <line 
                        x1={anchorA.x} y1={anchorA.y} 
                        x2={knot.x} y2={knot.y} 
                        stroke="#f59e0b" 
                        strokeWidth="6" 
                        strokeLinecap="round"
                    />
                    
                    {/* Anchor A */}
                    <circle cx={anchorA.x} cy={anchorA.y} r="6" fill="#334155" />
                    <text x={anchorA.x} y={anchorA.y - 15} textAnchor="middle" fontWeight="bold" fill="#334155">A</text>

                    {/* Strings and Scales */}
                    {step === 1 ? (
                        <>
                            {/* String 1 */}
                            <line x1={knot.x} y1={knot.y} x2={h1.x} y2={h1.y} stroke="#94a3b8" strokeWidth="2" />
                            {/* Scale 1 Handle */}
                            <g 
                                transform={`translate(${h1.x}, ${h1.y}) rotate(${Math.atan2(h1.y - knot.y, h1.x - knot.x) * 180 / Math.PI - 90})`}
                                onPointerDown={(e) => handlePointerDown('h1', e)}
                                className="cursor-grab active:cursor-grabbing hover:opacity-80 transition-opacity"
                            >
                                <rect x="-15" y="0" width="30" height="50" rx="4" fill="#fff" stroke="#cbd5e1" strokeWidth="2" />
                                <line x1="0" y1="0" x2="0" y2="-20" stroke="#94a3b8" strokeWidth="2" />
                                <circle cx="0" cy="-20" r="3" fill="#94a3b8" /> {/* Hook */}
                                <text x="0" y="30" textAnchor="middle" fontSize="10" transform="rotate(90, 0, 30)" fill="#64748b">{force1}N</text>
                            </g>
                            
                            {/* String 2 */}
                            <line x1={knot.x} y1={knot.y} x2={h2.x} y2={h2.y} stroke="#94a3b8" strokeWidth="2" />
                            {/* Scale 2 Handle */}
                            <g 
                                transform={`translate(${h2.x}, ${h2.y}) rotate(${Math.atan2(h2.y - knot.y, h2.x - knot.x) * 180 / Math.PI - 90})`}
                                onPointerDown={(e) => handlePointerDown('h2', e)}
                                className="cursor-grab active:cursor-grabbing hover:opacity-80 transition-opacity"
                            >
                                <rect x="-15" y="0" width="30" height="50" rx="4" fill="#fff" stroke="#cbd5e1" strokeWidth="2" />
                                <line x1="0" y1="0" x2="0" y2="-20" stroke="#94a3b8" strokeWidth="2" />
                                <circle cx="0" cy="-20" r="3" fill="#94a3b8" />
                                <text x="0" y="30" textAnchor="middle" fontSize="10" transform="rotate(90, 0, 30)" fill="#64748b">{force2}N</text>
                            </g>

                            {/* Label for Scales */}
                            <text x={h1.x} y={h1.y + 60} textAnchor="middle" fontSize="12" fill="#475569" className="pointer-events-none bg-white">F₁ 测力计</text>
                            <text x={h2.x} y={h2.y + 60} textAnchor="middle" fontSize="12" fill="#475569" className="pointer-events-none">F₂ 测力计</text>
                        </>
                    ) : (
                        <>
                             {/* String Single */}
                            <line x1={knot.x} y1={knot.y} x2={hSingle.x} y2={hSingle.y} stroke="#94a3b8" strokeWidth="2" />
                             {/* Scale Single Handle */}
                             <g 
                                transform={`translate(${hSingle.x}, ${hSingle.y}) rotate(${Math.atan2(hSingle.y - knot.y, hSingle.x - knot.x) * 180 / Math.PI - 90})`}
                                onPointerDown={(e) => handlePointerDown('hSingle', e)}
                                className="cursor-grab active:cursor-grabbing hover:opacity-80 transition-opacity"
                            >
                                <rect x="-15" y="0" width="30" height="50" rx="4" fill="#fff" stroke="#cbd5e1" strokeWidth="2" />
                                <line x1="0" y1="0" x2="0" y2="-20" stroke="#94a3b8" strokeWidth="2" />
                                <circle cx="0" cy="-20" r="3" fill="#94a3b8" />
                                <text x="0" y="30" textAnchor="middle" fontSize="10" transform="rotate(90, 0, 30)" fill="#64748b">{forceSingle}N</text>
                            </g>
                             <text x={hSingle.x} y={hSingle.y + 60} textAnchor="middle" fontSize="12" fill="#475569" className="pointer-events-none">F 测力计</text>
                        </>
                    )}

                    {/* Knot */}
                    <circle cx={knot.x} cy={knot.y} r="5" fill="#f97316" stroke="white" strokeWidth="2" />
                    
                </svg>
            </div>
        </div>
      </div>

      <div className="space-y-4">
          <h3 className="font-bold text-lg text-slate-800">实验检测 (Check)</h3>
          <Quiz 
            question={{
                id: 'exp-1',
                type: 'single-choice',
                text: '本实验采用的物理研究方法是？',
                options: ['控制变量法', '等效替代法', '理想实验法', '图像法'],
                correctAnswer: 1,
                explanation: '实验中要求两次拉橡皮条都要伸长到同一点 O，即产生相同的作用效果，这属于等效替代法。'
            }}
          />
          <Quiz 
            question={{
                id: 'exp-2',
                type: 'single-choice',
                text: '关于实验操作，下列说法错误的是？',
                options: [
                    '实验前应检查弹簧测力计是否调零',
                    '弹簧测力计、细绳、橡皮筋都应与木板平面平行',
                    '两个弹簧测力计之间夹角必须为90°',
                    '读数时视线要正对刻度线'
                ],
                correctAnswer: 2,
                explanation: '两个分力之间的夹角适当即可，不需要必须是90度。只要保证两次效果相同即可。'
            }}
          />
      </div>
    </div>
  );
};

export default SectionExperiment;