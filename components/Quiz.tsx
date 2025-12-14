import React, { useState } from 'react';
import { Question } from '../types';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface QuizProps {
  question: Question;
}

const Quiz: React.FC<QuizProps> = ({ question }) => {
  const [selected, setSelected] = useState<number | boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (val: number | boolean) => {
    if (showResult) return;
    setSelected(val);
    setShowResult(true);
  };

  const isCorrect = selected === question.correctAnswer;

  return (
    <div className="my-4 p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="flex items-start gap-3">
        <HelpCircle className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-0.5" />
        <div className="w-full">
          <h4 className="font-semibold text-slate-800 mb-3 text-lg">{question.text}</h4>
          
          <div className="flex flex-col gap-3">
            {question.type === 'true-false' ? (
              <div className="flex gap-4 w-full">
                <button
                  onClick={() => handleSelect(true)}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 border cursor-pointer shadow-sm ${
                    showResult && question.correctAnswer === true
                      ? 'bg-green-100 text-green-800 border-green-400 ring-1 ring-green-400'
                      : showResult && selected === true && !isCorrect
                      ? 'bg-red-100 text-red-800 border-red-400 ring-1 ring-red-400'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  正确 (True)
                </button>
                <button
                  onClick={() => handleSelect(false)}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 border cursor-pointer shadow-sm ${
                    showResult && question.correctAnswer === false
                      ? 'bg-green-100 text-green-800 border-green-400 ring-1 ring-green-400'
                      : showResult && selected === false && !isCorrect
                      ? 'bg-red-100 text-red-800 border-red-400 ring-1 ring-red-400'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  错误 (False)
                </button>
              </div>
            ) : (
               <div className="flex flex-col gap-2 w-full">
                {question.options?.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 border cursor-pointer shadow-sm flex items-start gap-3 group ${
                            showResult && question.correctAnswer === idx
                            ? 'bg-green-50 border-green-400 text-green-900 ring-1 ring-green-200'
                            : showResult && selected === idx && !isCorrect
                            ? 'bg-red-50 border-red-400 text-red-900 ring-1 ring-red-200'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 hover:border-indigo-300'
                        }`}
                    >
                        <span className={`font-bold flex items-center justify-center w-6 h-6 rounded-full text-xs shrink-0 transition-colors ${
                             showResult && question.correctAnswer === idx
                             ? 'bg-green-200 text-green-800'
                             : showResult && selected === idx && !isCorrect
                             ? 'bg-red-200 text-red-800'
                             : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                        }`}>
                            {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="mt-0.5">{opt}</span>
                    </button>
                ))}
               </div>
            )}
          </div>

          {showResult && (
            <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 animate-fade-in ${isCorrect ? 'bg-green-50 text-green-900 border border-green-100' : 'bg-red-50 text-red-900 border border-red-100'}`}>
              {isCorrect ? <CheckCircle className="w-5 h-5 mt-0.5 text-green-600" /> : <XCircle className="w-5 h-5 mt-0.5 text-red-600" />}
              <div>
                <p className="font-bold mb-1">{isCorrect ? '回答正确!' : '回答错误'}</p>
                <p className="text-sm leading-relaxed opacity-90">{question.explanation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;