import React from 'react';
import { LearningModule } from '../types';
import { CheckSquare, ArrowRight, PenTool } from 'lucide-react';

interface ModuleCardProps {
  module: LearningModule;
  isActive: boolean;
  onClick: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, isActive, onClick }) => {
  const Icon = module.icon;

  // Helper to parse IPS string for parentheses sub-bullets
  const renderIpsItem = (text: string) => {
    // Regex to find content inside parens at the end or middle
    const match = text.match(/(.*)\((.*)\)(.*)/);
    
    if (match) {
      const mainText = match[1].trim();
      const subText = match[2].trim();
      const afterText = match[3].trim();
      
      return (
        <span>
          {mainText} {afterText}
          <ul className="mt-1 ml-2 border-l-2 border-slate-200 pl-3">
             <li className="text-xs text-slate-500 font-medium">{subText}</li>
          </ul>
        </span>
      );
    }
    
    return <span>{text}</span>;
  };

  return (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer group
        ${isActive 
          ? 'border-brand-500 shadow-lg ring-1 ring-brand-500 bg-white' 
          : 'border-slate-200 bg-white hover:border-brand-300 hover:shadow-md'
        }
      `}
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${module.color}`}>
            <Icon size={24} />
          </div>
          {isActive && (
            <span className="text-xs font-bold px-2 py-1 bg-brand-100 text-brand-700 rounded-full uppercase tracking-wide">
              Selected
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2 font-heading">{module.title}</h3>
        <p className="text-sm text-slate-500 font-medium mb-4">Designed by {module.owner}</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 font-heading">Terminal Objective</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{module.tlo}</p>
          </div>
        </div>
      </div>

      {/* Expanded Content (Only visible when active, handled by parent mostly but styled here) */}
      <div className={`
        bg-slate-50 border-t border-slate-100 p-4 sm:p-6 transition-all duration-500 ease-in-out
        ${isActive ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 p-0 overflow-hidden border-none'}
      `}>
         <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3 font-heading">
                <ArrowRight size={16} className="text-brand-500" />
                Information Processing Steps
              </h4>
              <ul className="space-y-2">
                {module.ips.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                    {renderIpsItem(step)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-3 font-heading">
                <PenTool size={16} className="text-brand-500" />
                Key Instructional Tools
              </h4>
               <ul className="space-y-2">
                {module.tools.map((tool, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                     <CheckSquare size={14} className="text-brand-400" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
         </div>
      </div>
    </div>
  );
};