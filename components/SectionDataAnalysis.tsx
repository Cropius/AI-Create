import React, { useState } from 'react';

const SectionDataAnalysis = () => {
  // Hardcoded problem: F1 = 20N, F2 = 20N
  const F = 20;
  const angles = [0, 60, 90, 120, 180];
  
  // Calculate correct answers
  const calculateResultant = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    // R = sqrt(F^2 + F^2 + 2FFcos(theta))
    // Simplifies to 2F cos(theta/2)
    const res = Math.sqrt(2 * F * F + 2 * F * F * Math.cos(rad));
    return Math.round(res * 10) / 10;
  };

  const [inputs, setInputs] = useState<{[key: number]: string}>({});
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-emerald-600 pl-3">探究：合力大小与夹角的关系</h2>
        
        <p className="mb-4 text-slate-700">
            <strong>【例 3】</strong> 两个大小相等的共点力 $F_1, F_2$, 均为 <strong>20 N</strong>。
            请计算不同夹角下的合力 $F$ 大小，填入下表：
        </p>

        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 text-sm md:text-base">
                <thead>
                    <tr className="bg-slate-100">
                        <th className="border border-slate-300 p-3">夹角 θ</th>
                        {angles.map(a => <th key={a} className="border border-slate-300 p-3">{a}°</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-slate-300 p-3 font-bold bg-slate-50">合力 F (N)</td>
                        {angles.map(a => (
                            <td key={a} className="border border-slate-300 p-2 text-center">
                                {showAnswers ? (
                                    <span className="font-bold text-emerald-600">{calculateResultant(a)}</span>
                                ) : (
                                    <input 
                                        type="number" 
                                        className="w-16 p-1 border rounded text-center focus:ring-2 focus:ring-blue-400 outline-none"
                                        placeholder="?"
                                        value={inputs[a] || ''}
                                        onChange={(e) => setInputs({...inputs, [a]: e.target.value})}
                                    />
                                )}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="mt-4 flex gap-4">
            <button 
                onClick={() => setShowAnswers(!showAnswers)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
                {showAnswers ? '隐藏答案' : '显示答案与解析'}
            </button>
        </div>

        {showAnswers && (
             <div className="mt-6 space-y-4 bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <h4 className="font-bold text-emerald-800">规律总结 (Summary)</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                    <li>
                        当夹角为 <strong>0°</strong> 时 (同向)，合力最大：$F_{'{max}'} = F_1 + F_2 = 40N$。
                    </li>
                     <li>
                        当夹角为 <strong>180°</strong> 时 (反向)，合力最小：$F_{'{min}'} = |F_1 - F_2| = 0N$。
                    </li>
                     <li>
                        当两分力大小一定时，随着夹角的增大，合力 <strong>逐渐减小</strong>。
                    </li>
                    <li>
                        <strong>合力的取值范围：</strong> $|F_1 - F_2| \le F \le F_1 + F_2$。
                    </li>
                </ul>
             </div>
        )}
      </div>
    </div>
  );
};

export default SectionDataAnalysis;