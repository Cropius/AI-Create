import React, { useState } from 'react';
import { User, Users, Info } from 'lucide-react';

const ScenarioBucket = () => {
  const [mode, setMode] = useState<'single' | 'dual'>('single');
  const [angle, setAngle] = useState(60); // Total angle in degrees

  // Physics Parameters
  const WEIGHT = 100; // Representing Gravity G
  const radian = (angle * Math.PI) / 180;
  
  // Force Calculation
  // Single: F = G
  // Dual: 2F cos(theta/2) = G => F = G / (2 * cos(theta/2))
  // We limit the max force for visualization purposes to avoid infinity at 180 deg
  const rawForce = mode === 'single' 
    ? WEIGHT 
    : WEIGHT / (2 * Math.cos(radian / 2));
    
  const forceDisplay = Math.round(rawForce);

  // Visualization Constants
  const width = 600;
  const height = 400;
  const cx = width / 2;
  const bucketY = 280; // The point where the handle connects to the rope
  const ropeLen = 130;
  const vectorScale = 1.0; // Scale factor for arrows

  // Calculate Hand Positions
  const getHandPos = (side: 'left' | 'right') => {
    // The visual attachment point of the rope to the bucket handle is about 35px above bucketY center
    const attachmentY = bucketY - 35;

    if (mode === 'single') {
        // One hand directly above
        return { x: cx, y: attachmentY - ropeLen };
    }
    const theta = radian / 2;
    const dx = ropeLen * Math.sin(theta);
    const dy = ropeLen * Math.cos(theta);
    return {
        x: side === 'left' ? cx - dx : cx + dx,
        y: attachmentY - dy
    };
  };

  const handL = getHandPos('left');
  const handR = getHandPos('right');

  // Component: Stick Figure Person
  const Person = ({ x, y, color, label, side }: { x: number, y: number, color: string, label: string, side?: 'left' | 'right' }) => {
    // Improved proportions for a realistic stick figure
    const groundY = 380;
    const hipY = 310;      // Legs are ~70px long
    const shoulderY = 240; // Torso is ~70px long
    const headY = 215;     // Head center
    const headRadius = 20;

    // Determine body horizontal position
    // We want the person to stand naturally relative to their hand position
    let bodyX = x;
    
    if (side === 'left') {
       // Stand to the left of the hand, maintaining a minimum distance from center
       bodyX = Math.min(x - 30, cx - 110);
    } else if (side === 'right') {
       // Stand to the right of the hand
       bodyX = Math.max(x + 30, cx + 110);
    } else {
       // Single mode: Teacher stands to the side (right)
       bodyX = cx + 90;
    }

    return (
      <g>
        {/* Legs */}
        <line x1={bodyX} y1={hipY} x2={bodyX - 25} y2={groundY} stroke={color} strokeWidth="6" strokeLinecap="round" />
        <line x1={bodyX} y1={hipY} x2={bodyX + 25} y2={groundY} stroke={color} strokeWidth="6" strokeLinecap="round" />
        
        {/* Body/Torso */}
        <line x1={bodyX} y1={hipY} x2={bodyX} y2={shoulderY} stroke={color} strokeWidth="8" strokeLinecap="round" />
        
        {/* Head */}
        <circle cx={bodyX} cy={headY} r={headRadius} fill={color} />
        
        {/* Arm: Shoulder to Hand */}
        <line x1={bodyX} y1={shoulderY} x2={x} y2={y} stroke={color} strokeWidth="6" strokeLinecap="round" />
        
        {/* Label */}
        <text x={bodyX} y={groundY + 25} textAnchor="middle" fill={color} fontSize="14" fontWeight="bold">{label}</text>
      </g>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm my-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          生活实例：提水桶
          <span className="text-sm font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Interactive Scenario</span>
        </h3>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <button 
            onClick={() => setMode('single')}
            className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${mode === 'single' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            <User size={16} />
            老师单独提
          </button>
          <button 
            onClick={() => setMode('dual')}
            className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${mode === 'dual' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            <Users size={16} />
            两人共同提
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Simulation Canvas */}
        <div className="relative flex-1 bg-gradient-to-b from-sky-50 to-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-inner">
           <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[400px]">
              {/* Ground */}
              <rect x="0" y="380" width={width} height="20" fill="#e2e8f0" />
              
              {/* Bucket (Centered at cx, bucketY) */}
              <g transform={`translate(${cx}, ${bucketY})`}>
                {/* Bucket Body */}
                <path d="M -30 0 L -25 70 L 25 70 L 30 0 Z" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
                <ellipse cx="0" cy="0" rx="30" ry="8" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
                {/* Water Level */}
                <path d="M -27 15 L -24 60 L 24 60 L 27 15 Z" fill="#3b82f6" opacity="0.5" />
                <ellipse cx="0" cy="15" rx="27" ry="7" fill="#60a5fa" opacity="0.8" />
                {/* Handle Arc */}
                <path d="M -30 0 A 30 35 0 0 1 30 0" fill="none" stroke="#334155" strokeWidth="3" />
                {/* Weight Vector (Gravity) */}
                <line x1="0" y1="35" x2="0" y2={35 + WEIGHT} stroke="#16a34a" strokeWidth="4" markerEnd="url(#arrow-green)" />
                <text x="10" y="100" fill="#16a34a" fontSize="14" fontWeight="bold">G</text>
              </g>

              {/* Ropes & Vectors */}
              <defs>
                 <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="4" refY="2" orient="auto">
                    <path d="M0,0 L0,4 L6,2 z" fill="#ef4444" />
                 </marker>
                 <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="4" refY="2" orient="auto">
                    <path d="M0,0 L0,4 L6,2 z" fill="#16a34a" />
                 </marker>
              </defs>

              {mode === 'single' ? (
                <>
                   {/* Rope */}
                   <line x1={cx} y1={bucketY - 35} x2={handL.x} y2={handL.y} stroke="#334155" strokeWidth="2" />
                   {/* Force Vector */}
                   <line 
                        x1={cx} y1={bucketY - 35} 
                        x2={cx} y2={bucketY - 35 - rawForce * vectorScale} 
                        stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow-red)" 
                   />
                   <text x={cx + 10} y={bucketY - 80} fill="#ef4444" fontSize="16" fontWeight="bold">F = {forceDisplay}N</text>
                   <Person x={handL.x} y={handL.y} color="#4f46e5" label="老师" />
                </>
              ) : (
                <>
                   {/* Rope Left */}
                   <line x1={cx} y1={bucketY - 35} x2={handL.x} y2={handL.y} stroke="#334155" strokeWidth="2" />
                   {/* Rope Right */}
                   <line x1={cx} y1={bucketY - 35} x2={handR.x} y2={handR.y} stroke="#334155" strokeWidth="2" />
                   
                   {/* Force Vector Left */}
                   <line 
                      x1={cx} y1={bucketY - 35} 
                      x2={cx - (rawForce * vectorScale) * Math.sin(radian/2)} 
                      y2={bucketY - 35 - (rawForce * vectorScale) * Math.cos(radian/2)} 
                      stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow-red)" 
                   />
                   <text x={cx - 60} y={bucketY - 60} fill="#ef4444" fontSize="14" fontWeight="bold">F₁</text>

                   {/* Force Vector Right */}
                    <line 
                      x1={cx} y1={bucketY - 35} 
                      x2={cx + (rawForce * vectorScale) * Math.sin(radian/2)} 
                      y2={bucketY - 35 - (rawForce * vectorScale) * Math.cos(radian/2)} 
                      stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow-red)" 
                   />
                   <text x={cx + 50} y={bucketY - 60} fill="#ef4444" fontSize="14" fontWeight="bold">F₂</text>

                   <Person x={handL.x} y={handL.y} color="#0ea5e9" label="学生A" side="left" />
                   <Person x={handR.x} y={handR.y} color="#0ea5e9" label="学生B" side="right" />
                   
                   {/* Angle Arc */}
                   <path d={`M ${cx - 20} ${bucketY - 35} A 20 20 0 0 1 ${cx + 20} ${bucketY - 35}`} fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
                   <text x={cx} y={bucketY - 50} textAnchor="middle" fill="#64748b" fontSize="12">θ</text>
                </>
              )}
           </svg>
           
           <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-slate-200 shadow-sm text-sm">
             <div className="flex justify-between gap-4 mb-1">
                 <span className="text-slate-600">桶重 G:</span>
                 <span className="font-bold text-green-600">{WEIGHT} N</span>
             </div>
             <div className="flex justify-between gap-4">
                 <span className="text-slate-600">{mode === 'single' ? '拉力 F:' : '分力 F₁, F₂:'}</span>
                 <span className="font-bold text-red-500">{forceDisplay} N</span>
             </div>
           </div>
        </div>

        {/* Controls & Explanation */}
        <div className="flex flex-col justify-center lg:w-64 space-y-6">
          {mode === 'dual' && (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                    两人手臂夹角 θ: <span className="text-blue-600">{angle}°</span>
                </label>
                <input 
                    type="range" 
                    min="10" 
                    max="150" 
                    step="5"
                    value={angle} 
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full accent-blue-600"
                />
                <p className="text-xs text-slate-500 mt-2">
                    拖动滑块改变角度，观察分力大小的变化。
                </p>
            </div>
          )}

          <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-slate-700">
                  <Info className="w-5 h-5 text-indigo-500 shrink-0" />
                  <p>
                      <strong>思考：</strong> 
                      {mode === 'single' 
                        ? '老师单独提水桶时，拉力 F 的大小等于水桶的重力 G。' 
                        : '当两个人分开提时，为了保持水桶平衡，两人的合力必须等于水桶重力。'}
                  </p>
              </div>
              
              {mode === 'dual' && (
                  <div className={`p-3 rounded-md text-sm border ${rawForce > WEIGHT * 1.5 ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
                      {rawForce > WEIGHT * 1.5 ? (
                          <p>⚠️ <strong>注意：</strong> 夹角越大，分力越大。当角度很大时，分力会远大于桶的重力，不仅费力，而且绳子容易断！</p>
                      ) : (
                          <p>夹角越小，分力越小。当夹角为 0° 时，两人各分担一半重量。</p>
                      )}
                  </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioBucket;