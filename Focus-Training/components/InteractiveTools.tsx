import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { MOCK_ADHERENCE_DATA, SAMMY_CYOA_STORY } from '../constants';
import { CyoaEffect } from '../types';
import { CheckCircle2, AlertCircle, AlertTriangle, XCircle, RotateCcw, ArrowRight } from 'lucide-react';

export const AdherenceChart: React.FC = () => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold mb-2 text-slate-800 font-heading">Learner Performance: Trial Week Adherence</h3>
      <p className="text-sm text-slate-500 mb-6">
        Visualizing the data collected in <strong>Module 2: Time Management</strong>. 
        Learners score tasks (max 5) and breaks (max 5) daily.
      </p>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MOCK_ADHERENCE_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis hide domain={[0, 10]} />
            <Tooltip 
              cursor={{fill: '#f1f5f9'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <ReferenceLine y={8} label="Success Threshold (80%)" stroke="#ef4444" strokeDasharray="3 3" />
            <Bar dataKey="tasksCompleted" name="Tasks Completed" stackId="a" fill="#a2d2ff" radius={[0, 0, 4, 4]} />
            <Bar dataKey="breaksTaken" name="Breaks Taken" stackId="a" fill="#bde0fe" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-sky-blue rounded-full"></div>
          <span>Task Completion</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-icy-blue rounded-full"></div>
          <span>Breaks Taken</span>
        </div>
      </div>
    </div>
  );
};

export const EisenhowerMatrix: React.FC = () => {
  const [activeQuad, setActiveQuad] = useState<number | null>(null);

  const quadrants = [
    { id: 1, label: "Do First", desc: "Urgent & Important", color: "bg-mint border-green-300 text-green-900", example: "Client deadline today" },
    { id: 2, label: "Schedule", desc: "Less Urgent & Important", color: "bg-sky-blue border-blue-300 text-blue-900", example: "Strategic planning" },
    { id: 3, label: "Delegate", desc: "Urgent & Less Important", color: "bg-pastel-petal border-pink-300 text-pink-900", example: "Interrupting emails" },
    { id: 4, label: "Don't Do", desc: "Less Urgent & Less Important", color: "bg-thistle border-purple-300 text-purple-900", example: "Doomscrolling" },
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold mb-2 text-slate-800 font-heading">Interactive Tool: The Decision Matrix</h3>
      <p className="text-sm text-slate-500 mb-6">
        Introduced in <strong>Module 2</strong> to help learners trim categories. Hover/Tap to explore.
      </p>
      
      {/* Wrapper to handle absolute axis labels without clipping */}
      <div className="pl-6 pt-6 sm:pl-8"> 
        <div className="grid grid-cols-2 gap-2 sm:gap-4 aspect-square max-w-md mx-auto relative">
          {/* Labels for Axis */}
          <div className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] sm:text-xs font-bold text-slate-400 tracking-widest font-heading whitespace-nowrap">IMPORTANCE</div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-bold text-slate-400 tracking-widest font-heading whitespace-nowrap">URGENCY</div>

          {quadrants.map((q) => (
            <div 
              key={q.id}
              onMouseEnter={() => setActiveQuad(q.id)}
              onMouseLeave={() => setActiveQuad(null)}
              className={`
                relative p-2 sm:p-4 rounded-lg border-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300
                ${q.color}
                ${activeQuad === q.id ? 'scale-105 shadow-lg z-10' : 'hover:opacity-90'}
              `}
            >
              <span className="font-bold text-sm sm:text-lg font-heading leading-tight">{q.label}</span>
              <span className="text-[10px] sm:text-xs opacity-75 mt-1 hidden sm:block">{q.desc}</span>
              
              {activeQuad === q.id && (
                <div className="absolute inset-0 bg-white/95 flex items-center justify-center p-2 text-xs sm:text-sm font-medium text-slate-800 rounded-lg animate-in fade-in zoom-in duration-200">
                  <span className="hidden sm:inline">Ex: </span>{q.example}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CyoaPreview: React.FC = () => {
  const [currentNodeId, setCurrentNodeId] = useState(SAMMY_CYOA_STORY.start_node);
  const [feedback, setFeedback] = useState<{feedback: string, nextNodeId: string} | null>(null);
  const [totalScore, setTotalScore] = useState(0);

  const currentNode = SAMMY_CYOA_STORY.nodes[currentNodeId];

  const handleChoice = (nextNodeId: string, feedbackText: string, effects?: CyoaEffect[]) => {
    // Calculate score delta if present
    let scoreDelta = 0;
    if (effects) {
      effects.forEach(e => {
        if (e.type === 'score' && e.key === 'wellness') {
          scoreDelta += (e.delta || 0);
        }
      });
    }
    setTotalScore(prev => prev + scoreDelta);
    setFeedback({ feedback: feedbackText, nextNodeId: nextNodeId });
  };

  const advance = () => {
    if (feedback) {
      setCurrentNodeId(feedback.nextNodeId);
      setFeedback(null);
    }
  };

  const reset = () => {
    setCurrentNodeId(SAMMY_CYOA_STORY.start_node);
    setFeedback(null);
    setTotalScore(0);
  };

  // Helper styles based on outcome node type
  const isOutcome = currentNode.type === 'outcome';

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden flex flex-col max-h-[600px]">
       {/* Header */}
       <div className="flex justify-between items-center mb-4 z-20 relative border-b border-slate-100 pb-2">
         <div>
            <h3 className="text-base font-semibold text-slate-800 font-heading">Sammy's Remote Workday</h3>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">
              {isOutcome ? "Simulation Complete" : currentNode.title}
            </p>
         </div>
         <button onClick={reset} className="text-slate-400 hover:text-slate-600 transition-colors" title="Restart">
           <RotateCcw size={16} />
         </button>
       </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex-grow flex flex-col justify-start relative overflow-y-auto">
        
        {/* Feedback Overlay */}
        {feedback && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300 bg-white/95 backdrop-blur-sm">
            <div className="mb-3 text-brand-500"><CheckCircle2 size={36} /></div>
            <h4 className="text-lg font-bold mb-2 font-heading text-slate-900">Result</h4>
            <p className="text-sm leading-relaxed mb-6 text-slate-600 mx-auto">{feedback.feedback}</p>
            <button 
              onClick={advance}
              className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md transition-all flex items-center gap-2"
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="relative z-10">
          <p className="text-slate-800 font-medium mb-6 text-base leading-relaxed text-center font-heading">
            "{currentNode.body}"
          </p>
          
          {isOutcome ? (
            <div className="text-center py-4">
              <div className="text-4xl font-extrabold text-brand-500 mb-2 font-heading">{totalScore} pts</div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Final Wellness Score</p>
              <button 
                onClick={reset}
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-800 bg-brand-50 px-4 py-2 rounded-lg border border-brand-100 hover:border-brand-200 transition-all"
              >
                <RotateCcw size={16} /> Replay Simulation
              </button>
            </div>
          ) : (
            <div className="space-y-2 w-full">
              {currentNode.choices.map((choice, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleChoice(choice.next, choice.feedback || "", choice.effects)}
                  disabled={!!feedback}
                  className="w-full text-left p-3 rounded-lg bg-white border border-slate-200 hover:border-brand-300 hover:bg-brand-50 hover:shadow-sm transition-all text-sm text-slate-800 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold group-hover:bg-brand-200 group-hover:text-brand-700 transition-colors mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="leading-snug">{choice.label}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}