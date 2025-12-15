import React from 'react';
import { Search, PenTool, Wrench, Zap, CheckCircle2 } from 'lucide-react';

export const STEPS_CONFIG = [
  { 
    id: 'analysis', 
    title: 'Analysis', 
    icon: Search, 
    color: 'bg-baby-pink',
    activeClass: 'bg-baby-pink border-baby-pink text-pink-900',
    hex: '#ffafcc' 
  },
  { 
    id: 'design', 
    title: 'Design', 
    icon: PenTool, 
    color: 'bg-mint',
    activeClass: 'bg-mint border-mint text-green-900',
    hex: '#c8f7d4' 
  },
  { 
    id: 'development', 
    title: 'Development', 
    icon: Wrench, 
    color: 'bg-icy-blue', 
    activeClass: 'bg-icy-blue border-icy-blue text-blue-900',
    hex: '#bde0fe' 
  },
  { 
    id: 'implementation', 
    title: 'Implementation', 
    icon: Zap, 
    color: 'bg-sky-blue', 
    activeClass: 'bg-sky-blue border-sky-blue text-blue-900',
    hex: '#a2d2ff' 
  },
  { 
    id: 'evaluation', 
    title: 'Evaluation', 
    icon: CheckCircle2, 
    color: 'bg-thistle', 
    activeClass: 'bg-thistle border-thistle text-purple-900',
    hex: '#cdb4db' 
  },
];

export const AddieFlowChart: React.FC = () => {
  // Config for the radial layout
  // Node radius kept compact
  const radius = 105; 
  // Increased label radius slightly to prevent corner overlap at steep angles
  const labelRadius = 180; 
  const center = 250; // Center for 500x500 box
  
  // Calculate position for a point on the circle
  const getPosition = (index: number, total: number, r: number) => {
    // -90 ensures index 0 is at the top (12 o'clock)
    const angle = (index * (360 / total)) - 90;
    const angleRad = (angle * Math.PI) / 180;
    return {
      x: center + r * Math.cos(angleRad),
      y: center + r * Math.sin(angleRad),
      angle
    };
  };

  return (
    <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[400px] md:max-w-[500px] mx-auto select-none my-8 md:my-0">
      {/* Background SVG for connecting arrows */}
      <svg className="absolute inset-0 w-full h-full text-slate-300" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="250" cy="250" r={radius} stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="opacity-50" />
        
        {/* Draw Small Arrows on path */}
        {STEPS_CONFIG.map((_, i) => {
          const start = getPosition(i, STEPS_CONFIG.length, radius);
          
          const midAngle = ((start.angle + 360 / STEPS_CONFIG.length / 2) * Math.PI) / 180;
          const arrowX = center + radius * Math.cos(midAngle);
          const arrowY = center + radius * Math.sin(midAngle);
          const rotation = start.angle + (360 / STEPS_CONFIG.length / 2) + 90;

          return (
            <g key={i} transform={`translate(${arrowX}, ${arrowY}) rotate(${rotation})`}>
              <path d="M-6 -6 L0 0 L-6 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          );
        })}
      </svg>

      {/* Nodes and Labels */}
      {STEPS_CONFIG.map((step, i) => {
        // 1. Node Position
        const nodePos = getPosition(i, STEPS_CONFIG.length, radius);
        const nodeLeft = (nodePos.x / 500) * 100;
        const nodeTop = (nodePos.y / 500) * 100;

        // 2. Label Position & Rotation
        // Position at outer radius
        const labelPos = getPosition(i, STEPS_CONFIG.length, labelRadius);
        const labelLeft = (labelPos.x / 500) * 100;
        const labelTop = (labelPos.y / 500) * 100;
        
        // Strict 72-degree increment rotation (360 / 5 = 72)
        // i=0 (Top): 0 deg
        // i=1 (Right Top): 72 deg
        // i=2 (Right Bottom): 144 deg
        // i=3 (Left Bottom): 216 deg
        // i=4 (Left Top): 288 deg
        let rotation = (i * 72) % 360;
        
        // Readability adjustment: Flip text for bottom hemisphere (90 < rot < 270)
        // This keeps the tangent line consistent (144 becomes -36, same slope)
        if (rotation > 90 && rotation < 270) {
          rotation += 180;
        }

        const Icon = step.icon;

        return (
          <React.Fragment key={step.id}>
            {/* Circle Node */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-default z-20"
              style={{ left: `${nodeLeft}%`, top: `${nodeTop}%` }}
            >
              <div 
                className={`
                  w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full shadow-md border-[3px] sm:border-4 border-white flex items-center justify-center
                  transition-transform duration-300 group-hover:scale-110
                  ${step.color}
                `}
              >
                <Icon size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8 text-slate-800 opacity-75" />
              </div>
            </div>
            
            {/* Label - Rotated Tangentially */}
            <div 
              className="absolute z-10 flex items-center justify-center pointer-events-none"
              style={{ 
                left: `${labelLeft}%`, 
                top: `${labelTop}%`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                width: '140px' // Increased width to prevent tight wrapping at steep angles
              }}
            >
              <div className={`
                bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-slate-200 
                whitespace-nowrap text-center
              `}>
                <span className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-800 font-heading tracking-wide">
                  {i + 1}. {step.title}
                </span>
              </div>
            </div>
          </React.Fragment>
        );
      })}

      {/* Central Hub Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white border border-slate-100 shadow-sm flex flex-col items-center justify-center p-2">
           <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-widest">Model</span>
           <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">ADDIE</span>
        </div>
      </div>
    </div>
  );
};