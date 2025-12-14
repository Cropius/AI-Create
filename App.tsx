import React, { useState } from 'react';
import { BookOpen, FlaskConical, Move, Calculator, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';

import ScenarioBucket from './components/ScenarioBucket';
import SectionExperiment from './components/SectionExperiment';
import VectorPlayground from './components/VectorPlayground';
import SectionDataAnalysis from './components/SectionDataAnalysis';
import Quiz from './components/Quiz';
import TriangleRuleInteractive from './components/TriangleRuleInteractive';

function App() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: 'concept', title: '概念：合力与分力', icon: BookOpen },
    { id: 'experiment', title: '实验：探究规律', icon: FlaskConical },
    { id: 'rule', title: '法则：平行四边形', icon: Move },
    { id: 'calc', title: '计算与分析', icon: Calculator },
    { id: 'summary', title: '总结与提升', icon: ShieldCheck },
  ];

  const nextSection = () => {
    if (activeSection < sections.length - 1) setActiveSection(activeSection + 1);
    window.scrollTo(0,0);
  };

  const prevSection = () => {
    if (activeSection > 0) setActiveSection(activeSection - 1);
    window.scrollTo(0,0);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 shadow-sm flex-shrink-0 z-10 sticky top-0 md:h-screen overflow-y-auto">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-xl font-bold text-slate-800">力的合成与分解</h1>
          <p className="text-sm text-slate-500 mt-1">高中物理必修</p>
        </div>
        <nav className="p-4 space-y-2">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(index)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === index
                    ? 'bg-blue-50 text-blue-700 border border-blue-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={18} />
                {section.title}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto p-4 md:p-8 w-full">
        
        {/* Progress Bar (Mobile only) */}
        <div className="md:hidden mb-6 bg-slate-200 h-2 rounded-full overflow-hidden">
             <div 
                className="bg-blue-600 h-full transition-all duration-300" 
                style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
             ></div>
        </div>

        {/* Section 1: Concept */}
        {activeSection === 0 && (
          <div className="animate-fade-in">
            <header className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">1. 合力与分力</h2>
              <p className="text-slate-600 mt-2">理解共点力的概念，利用等效替代的思想理解合力和分力的关系。</p>
            </header>
            
            <ScenarioBucket />

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-lg">梳理与总结</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <button className="p-4 bg-orange-50 rounded border border-orange-100 text-left transition-all hover:scale-[1.02] hover:shadow-md hover:border-orange-300 active:scale-95 cursor-pointer group outline-none focus:ring-2 focus:ring-orange-300">
                        <h4 className="font-bold text-orange-800 mb-2 group-hover:text-orange-900">共点力</h4>
                        <p className="text-sm text-orange-900 group-hover:text-orange-950">几个力如果都作用在物体的同一点，或者它们的作用线交于一点，这几个力叫做共点力。</p>
                    </button>
                     <button className="p-4 bg-blue-50 rounded border border-blue-100 text-left transition-all hover:scale-[1.02] hover:shadow-md hover:border-blue-300 active:scale-95 cursor-pointer group outline-none focus:ring-2 focus:ring-blue-300">
                        <h4 className="font-bold text-blue-800 mb-2 group-hover:text-blue-900">等效替代</h4>
                        <p className="text-sm text-blue-900 group-hover:text-blue-950">一个力产生的效果跟几个力共同产生的效果相同，这个力就叫做那几个力的合力，那几个力叫做这个力的分力。</p>
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">易错辨析</h3>
                <Quiz question={{
                    id: 'tf-1',
                    type: 'true-false',
                    text: '(1) 合力与分力都是客观存在的力。',
                    correctAnswer: false,
                    explanation: '错。合力是一种等效替代，是为了研究方便引入的理想化概念，实际受力分析时，物体只受分力作用，合力并不独立存在。'
                }} />
                <Quiz question={{
                    id: 'tf-2',
                    type: 'true-false',
                    text: '(2) 合力 F 一定与其分力的作用效果相同。',
                    correctAnswer: true,
                    explanation: '对。合力的定义就是基于作用效果相同。'
                }} />
            </div>
          </div>
        )}

        {/* Section 2: Experiment */}
        {activeSection === 1 && (
            <div className="animate-fade-in">
                 <header className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900">2. 实验：探究力的合成规律</h2>
                    <p className="text-slate-600 mt-2">通过实验验证力的合成是否遵循平行四边形定则。</p>
                </header>
                <SectionExperiment />
            </div>
        )}

        {/* Section 3: Rule */}
        {activeSection === 2 && (
             <div className="animate-fade-in">
                <header className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900">3. 平行四边形定则</h2>
                    <p className="text-slate-600 mt-2">两个共点力合成时，以表示这两个力的有向线段为邻边作平行四边形。</p>
                </header>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
                     <p className="text-lg mb-4">
                        这两个邻边之间的<strong>对角线</strong>就代表合力的大小和方向。
                     </p>
                     <VectorPlayground initialF1={80} initialF2={60} initialAngle={60} showResultant={false} />
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-lg mb-2">【例 2】 杨浦大桥应用实例</h3>
                    <p className="text-sm text-slate-600 mb-4">
                        假设斜拉桥中某对钢索与竖直方向夹角都是 30° (即两索夹角 60°)，每根钢索拉力都是 3 × 10⁴ N。
                        求它们的合力。
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="flex justify-center bg-white rounded-lg border border-slate-100 p-4 shadow-inner">
                            <svg width="280" height="280" viewBox="0 0 300 300">
                                <defs>
                                    <marker id="arrow-blue-ex" markerWidth="10" markerHeight="10" refX="4" refY="2" orient="auto">
                                        <path d="M0,0 L0,4 L6,2 z" fill="#3b82f6" />
                                    </marker>
                                    <marker id="arrow-purple-ex" markerWidth="10" markerHeight="10" refX="4" refY="2" orient="auto">
                                        <path d="M0,0 L0,4 L6,2 z" fill="#a855f7" />
                                    </marker>
                                </defs>
                                {/* Grid */}
                                <pattern id="grid-ex" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                                </pattern>
                                <rect width="300" height="300" fill="url(#grid-ex)" />
                                
                                {/* Dashed Vertical Line */}
                                <line x1="150" y1="20" x2="150" y2="280" stroke="#cbd5e1" strokeDasharray="4 4" />
                                
                                {/* Origin */}
                                <circle cx="150" cy="50" r="4" fill="#1e293b" />
                                <text x="150" y="40" textAnchor="middle" fontSize="12" fontWeight="bold">O</text>

                                {/* F1 (Right, 30 deg from vertical) */}
                                <line x1="150" y1="50" x2="200" y2="136.6" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow-blue-ex)" />
                                <text x="210" y="140" fill="#3b82f6" fontWeight="bold">F₁</text>

                                {/* F2 (Left, 30 deg from vertical) */}
                                <line x1="150" y1="50" x2="100" y2="136.6" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow-blue-ex)" />
                                <text x="80" y="140" fill="#3b82f6" fontWeight="bold">F₂</text>

                                {/* Parallelogram Lines */}
                                <line x1="200" y1="136.6" x2="150" y2="223.2" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                                <line x1="100" y1="136.6" x2="150" y2="223.2" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />

                                {/* Resultant F (Vertical Down) */}
                                <line x1="150" y1="50" x2="150" y2="223.2" stroke="#a855f7" strokeWidth="4" markerEnd="url(#arrow-purple-ex)" />
                                <text x="160" y="220" fill="#a855f7" fontWeight="bold" fontSize="16">F</text>
                                
                                {/* Angle markers */}
                                <path d="M 150 90 A 40 40 0 0 1 170 84" fill="none" stroke="#64748b" />
                                <text x="165" y="80" fontSize="10" fill="#64748b">30°</text>
                                <path d="M 130 84 A 40 40 0 0 1 150 90" fill="none" stroke="#64748b" />
                                <text x="135" y="80" fontSize="10" fill="#64748b">30°</text>
                            </svg>
                        </div>
                        <div className="space-y-3 text-sm text-slate-700">
                            <p className="bg-slate-100 p-2 rounded">
                                <strong>已知：</strong> F₁ = F₂ = 3 × 10⁴ N，夹角 θ = 60°
                            </p>
                            <div>
                                <strong className="text-slate-900 block mb-1">几何解法：</strong>
                                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                                    <li>由于 F₁ = F₂，平行四边形为菱形。</li>
                                    <li>菱形的对角线平分夹角，故合力方向在两力夹角的平分线上（竖直向下）。</li>
                                </ul>
                            </div>
                            <div className="font-mono bg-slate-800 text-slate-200 p-3 rounded-lg text-xs leading-relaxed">
                                F = 2 × F₁ × cos(30°) <br/>
                                F = 2 × 3×10⁴ × (√3 / 2) <br/>
                                F = 3√3 × 10⁴ <br/>
                                F ≈ 5.2 × 10⁴ N
                            </div>
                            <p><strong>结论：</strong> 合力大小约为 5.2 × 10⁴ N，方向竖直向下。</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Section 4: Calculation */}
        {activeSection === 3 && (
            <div className="animate-fade-in">
                 <header className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900">4. 数据计算与规律分析</h2>
                </header>
                <SectionDataAnalysis />
            </div>
        )}

        {/* Section 5: Summary */}
        {activeSection === 4 && (
             <div className="animate-fade-in">
                <header className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900">5. 总结提升与矢量概念</h2>
                </header>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <h3 className="text-xl font-bold text-purple-700 mb-3">矢量 (Vector)</h3>
                        <p className="mb-2">既有大小又有方向，相加时遵循<strong>平行四边形定则</strong>的物理量。</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">力</span>
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">位移</span>
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">速度</span>
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">加速度</span>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-700 mb-3">标量 (Scalar)</h3>
                        <p className="mb-2">只有大小，没有方向，相加时遵循<strong>算术法则</strong>的物理量。</p>
                         <div className="flex flex-wrap gap-2">
                            <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-xs">质量</span>
                            <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-xs">时间</span>
                            <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-xs">路程</span>
                            <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-xs">功</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                     <h3 className="font-bold text-lg">针对训练</h3>
                     <Quiz 
                        question={{
                            id: 'summary-1',
                            type: 'single-choice',
                            text: '有两个大小分别为 3N 和 5N 的共点力，它们的合力大小可能是？',
                            options: ['0 N', '10 N', '12 N', '4 N'],
                            correctAnswer: 3,
                            explanation: '合力范围为 |5-3| ≤ F ≤ 5+3，即 2N ≤ F ≤ 8N。只有 4N 在此范围内。'
                        }}
                     />
                     
                     <TriangleRuleInteractive />
                     
                     <Quiz 
                        question={{
                            id: 'summary-2',
                            type: 'single-choice',
                            text: '关于力的合成的三角形定则，下列说法正确的是？',
                            options: [
                                '它是平行四边形定则的推论，本质一致',
                                '只适用于两个力夹角为 90° 的情况',
                                '两个分力必须共起点',
                                '三角形定则求合力比平行四边形定则更精确'
                            ],
                            correctAnswer: 0,
                            explanation: '三角形定则和平行四边形定则在本质上是相同的，都是矢量加法的几何法则。三角形定则可以看作是平移了其中一个矢量。'
                        }}
                     />
                </div>
            </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex justify-between">
          <button
            onClick={prevSection}
            disabled={activeSection === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
              activeSection === 0
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ChevronLeft size={20} />
            上一节
          </button>

          <button
            onClick={nextSection}
            disabled={activeSection === sections.length - 1}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-transform hover:scale-105 disabled:opacity-50 disabled:scale-100`}
          >
            {activeSection === sections.length - 1 ? '完成学习' : '下一节'}
            <ChevronRight size={20} />
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;