import React, { useState } from 'react';
import { Move, RotateCw } from 'lucide-react';

const TriangleRuleInteractive = () => {
  const [angle, setAngle] = useState(60);
  
  // Visualization Constants
  const start = { x: 40, y: 140 }; // Start point (tail of F1)
  const f1Length = 80;
  const f1Head = { x: start.x + f1Length, y: start.y };
  const f2Length = 70;
  
  // Calculate F2 Head based on angle
  // Angle is relative to the extension of F1 (horizontal)
  const rad = (angle * Math.PI) / 180;
  const f2Head = {
    x: f1Head.x + f2Length * Math.cos(-rad),
    y: f1Head.y + f2Length * Math.sin(-rad)
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border-2 border-indigo-100 shadow-lg mt-6 relative overflow-hidden group hover:border-indigo-300 transition-colors">
       {/* Background Icon */}
       <div className="absolute top-0 right-0 p-4 opacity-10">
           <Move size={120} className="text-indigo-600" />
       </div>

       <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
           {/* Text Side */}
           <div className="flex-1 space-y-4">
               <div className="flex items-center gap-3">
                   <span className="bg-indigo-600 text-white p-2 rounded-lg shadow-sm">
                       <Move size={20} />
                   </span>
                   <h4 className="font-bold text-2xl text-indigo-900">三角定则 (Triangle Rule)</h4>
               </div>
               
               <p className="text-indigo-800 leading-relaxed text-base">
                   把表示两个力的有向线段<strong>首尾相接</strong>，从第一个力的<strong>箭尾</strong>向第二个力的<strong>箭头</strong>画有向线段，这条线段就表示合力。
               </p>
               
               <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-indigo-100 text-sm text-indigo-700">
                   <p><strong>💡 核心技巧：</strong> "首尾相接，从始至终"。</p>
                   <p className="mt-1">它是平行四边形定则的简化形式，本质完全一致。</p>
               </div>
               
               {/* Controls */}
                <div className="pt-2 bg-white/50 p-3 rounded-lg border border-indigo-100/50">
                    <label className="text-xs font-bold text-indigo-800 uppercase flex items-center justify-between gap-2 mb-2">
                        <span className="flex items-center gap-1"><RotateCw size={14} /> 改变夹角 (Change Angle)</span>
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs">{angle}°</span>
                    </label>
                    <input 
                        type="range" 
                        min="0" 
                        max="160" 
                        value={angle} 
                        onChange={(e) => setAngle(Number(e.target.value))}
                        className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                </div>
           </div>

           {/* Interactive Diagram Side */}
           <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 flex-shrink-0 w-full md:w-auto flex justify-center items-center min-h-[200px]">
               <svg width="260" height="220" viewBox="0 0 260 220">
                   <defs>
                       <marker id="tri-arrow-red" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto">
                           <path d="M0,0 L0,4 L6,2 z" fill="#ef4444" />
                       </marker>
                       <marker id="tri-arrow-blue" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto">
                           <path d="M0,0 L0,4 L6,2 z" fill="#3b82f6" />
                       </marker>
                       <marker id="tri-arrow-purple" markerWidth="10" markerHeight="10" refX="6" refY="2" orient="auto">
                           <path d="M0,0 L0,4 L6,2 z" fill="#a855f7" />
                       </marker>
                   </defs>
                   
                   {/* Grid (Optional, faint) */}
                   <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                       <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f1f5f9" strokeWidth="0.5"/>
                   </pattern>
                   <rect width="260" height="220" fill="url(#smallGrid)" />

                   {/* Step 1 Label */}
                   <text x="10" y="20" fontSize="12" fill="#94a3b8" fontWeight="bold">首尾相接演示:</text>

                   {/* F1 */}
                   <line x1={start.x} y1={start.y} x2={f1Head.x} y2={f1Head.y} stroke="#ef4444" strokeWidth="4" markerEnd="url(#tri-arrow-red)" />
                   <text x={start.x + f1Length/2} y={start.y + 20} fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle">F₁</text>
                   
                   {/* F2 (Starts at end of F1) */}
                   <line x1={f1Head.x} y1={f1Head.y} x2={f2Head.x} y2={f2Head.y} stroke="#3b82f6" strokeWidth="4" markerEnd="url(#tri-arrow-blue)" />
                   {/* F2 Label */}
                   <text 
                     x={(f1Head.x + f2Head.x)/2 + 10} 
                     y={(f1Head.y + f2Head.y)/2 - 10} 
                     fill="#3b82f6" 
                     fontSize="14" 
                     fontWeight="bold"
                   >
                     F₂
                   </text>
                   
                   {/* Resultant F (Start of F1 to End of F2) */}
                   <line x1={start.x} y1={start.y} x2={f2Head.x} y2={f2Head.y} stroke="#a855f7" strokeWidth="4" markerEnd="url(#tri-arrow-purple)" strokeDasharray="6 4"/>
                   <text 
                     x={(start.x + f2Head.x)/2 - 10} 
                     y={(start.y + f2Head.y)/2 - 10} 
                     fill="#a855f7" 
                     fontSize="16" 
                     fontWeight="bold"
                   >
                     F (合力)
                   </text>
                   
                   {/* Start/End markers */}
                   <circle cx={start.x} cy={start.y} r="4" fill="#1e293b" />
                   <text x={start.x - 15} y={start.y + 5} fontSize="10" fill="#64748b">始</text>
                   <circle cx={f2Head.x} cy={f2Head.y} r="4" fill="#1e293b" />
                   <text x={f2Head.x + 10} y={f2Head.y + 5} fontSize="10" fill="#64748b">终</text>
               </svg>
           </div>
       </div>
    </div>
  );
};

export default TriangleRuleInteractive;