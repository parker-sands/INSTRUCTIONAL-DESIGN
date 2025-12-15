import React, { useState } from 'react';
import { PROCESS_JOURNEY } from '../constants';
import { ChevronRight } from 'lucide-react';
import { STEPS_CONFIG } from './AddieFlowChart';

export const DesignJourney: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState(PROCESS_JOURNEY[0].id);
  const activeStage = PROCESS_JOURNEY.find(s => s.id === activeStageId) || PROCESS_JOURNEY[0];

  return (
    <div className="grid lg:grid-cols-12 gap-8 min-h-[600px]">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-4 flex flex-col gap-2">
        {PROCESS_JOURNEY.map((stage) => {
          const Icon = stage.icon;
          const isActive = activeStageId === stage.id;
          
          // Find matching config for colors
          const stepConfig = STEPS_CONFIG.find(s => s.id === stage.id);
          const activeClass = stepConfig ? stepConfig.activeClass : 'bg-slate-900 text-white';
          const iconBg = isActive && stepConfig ? 'bg-white/30 text-slate-900' : 'bg-slate-100 text-slate-500';

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`
                flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300
                ${isActive 
                  ? `${activeClass} shadow-lg scale-[1.02]` 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-brand-200'
                }
              `}
            >
              <div className={`p-2 rounded-lg ${iconBg}`}>
                <Icon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm font-heading">{stage.title}</h4>
                <p className={`text-xs mt-1 ${isActive ? 'text-slate-800/70' : 'text-slate-400'}`}>
                  Click to view artifacts
                </p>
              </div>
              {isActive && <ChevronRight className="ml-auto opacity-50" size={16} />}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-2xl font-bold text-slate-900 mb-2 font-heading">{activeStage.title}</h3>
          <p className="text-slate-600 leading-relaxed">{activeStage.summary}</p>
        </div>

        <div className="p-8 space-y-8 overflow-y-auto max-h-[600px]">
          {activeStage.artifacts.map((artifact, i) => (
            <div key={i} className="relative pl-8 border-l-2 border-slate-100 last:border-0 pb-8 last:pb-0">
              {/* Timeline dot */}
              <div className={`
                absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm
                ${artifact.type === 'draft' ? 'bg-pastel-petal' : artifact.type === 'final' ? 'bg-mint' : 'bg-sky-blue'}
              `}></div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-2 font-heading">
                  {artifact.title}
                  <span className={`
                    text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold
                    ${artifact.type === 'draft' ? 'bg-pastel-petal text-pink-900' : artifact.type === 'final' ? 'bg-mint text-green-900' : 'bg-sky-blue text-blue-900'}
                  `}>
                    {artifact.type.toUpperCase()}
                  </span>
                </h4>
                {artifact.author && (
                  <span className="text-xs font-medium text-slate-400">
                    Contributed by {artifact.author}
                  </span>
                )}
              </div>

              {/* Artifact Card */}
              <div className={`
                p-5 rounded-lg text-sm font-mono leading-relaxed whitespace-pre-wrap
                ${artifact.type === 'draft' 
                  ? 'bg-orange-50 text-slate-800 border border-orange-100 shadow-[2px_2px_0px_0px_#ffc8dd] rotate-[0.5deg]' 
                  : 'bg-slate-50 text-slate-700 border border-slate-200'
                }
              `}>
                {artifact.content}
              </div>

              {artifact.context && (
                <p className="mt-3 text-sm text-slate-500 italic">
                  <span className="font-bold not-italic">Design Note:</span> {artifact.context}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};