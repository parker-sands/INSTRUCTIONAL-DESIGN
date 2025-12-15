import React from 'react';
import { useGame } from '../context/GameContext';
import { Navigate } from 'react-router-dom';
import { Trophy, Star, Download, RefreshCcw } from 'lucide-react';

const Victory: React.FC = () => {
  const { gameState, getProgressPercentage, resetProgress } = useGame();

  if (getProgressPercentage() < 100) {
    return <Navigate to="/" replace />;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-6">
         <div className="inline-block p-6 rounded-full bg-illini-harvest shadow-2xl mb-4 animate-bounce">
            <Trophy size={64} className="text-illini-blue" />
         </div>
         <h1 className="text-5xl md:text-7xl font-black text-illini-blue font-montserrat tracking-tight">MISSION ACCOMPLISHED</h1>
         <p className="text-2xl text-illini-storm-dark max-w-2xl mx-auto">
            Congratulations! You have successfully completed all prototypes and mastered the core competencies.
         </p>
      </div>

      {/* Certificate Card */}
      <div className="bg-white border-[16px] border-double border-illini-blue p-12 md:p-20 text-center shadow-2xl relative overflow-hidden print:shadow-none print:border-8 print:w-full">
         <div className="absolute top-0 left-0 w-full h-4 bg-illini-orange"></div>
         
         {/* Background Watermark */}
         <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Star size={400} />
         </div>

         <div className="relative z-10 space-y-8">
            <div className="flex justify-center mb-8">
               <div className="w-20 h-20 bg-illini-blue text-illini-orange flex items-center justify-center rounded-full font-black text-2xl border-4 border-illini-orange">
                 ITI
               </div>
            </div>
            
            <h2 className="text-4xl font-serif font-bold text-illini-blue uppercase tracking-widest">Certificate of Completion</h2>
            
            <p className="text-xl text-illini-storm-dark italic">This certifies that the recipient has successfully completed the</p>
            
            <h3 className="text-3xl md:text-4xl font-bold text-illini-industrial font-montserrat py-4 border-b-2 border-illini-cloud inline-block px-12">
               ITI Strategic Competency & Compliance Training
            </h3>
            
            <div className="grid grid-cols-2 gap-12 mt-12 max-w-lg mx-auto text-left">
               <div>
                  <p className="text-sm uppercase tracking-widest text-slate-400 font-bold mb-1">Score</p>
                  <p className="text-2xl font-bold text-illini-blue">{Math.round(Object.values(gameState.activityScores).reduce((a, b) => a + b, 0) / gameState.totalActivities)}%</p>
               </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-slate-400 font-bold mb-1">XP Earned</p>
                  <p className="text-2xl font-bold text-illini-blue">{gameState.xp}</p>
               </div>
            </div>

            <div className="mt-16 flex justify-between items-end max-w-2xl mx-auto border-t border-slate-200 pt-8">
               <div className="text-left">
                  <div className="font-script text-2xl text-illini-blue mb-2">Team #10</div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Instructional Designers</p>
               </div>
               <div className="text-right">
                  <p className="text-lg font-bold text-illini-blue">{new Date().toLocaleDateString()}</p>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Date</p>
               </div>
            </div>
         </div>
      </div>

      <div className="flex justify-center gap-6 print:hidden">
         <button 
           onClick={handlePrint}
           className="flex items-center gap-3 px-8 py-4 bg-illini-blue text-white font-bold text-lg rounded-xl hover:bg-illini-industrial shadow-lg hover:-translate-y-1 transition-all"
         >
            <Download size={24} /> Download / Print
         </button>
         <button 
           onClick={() => {
             if(window.confirm("Are you sure? This will clear all your progress.")) {
               resetProgress();
             }
           }}
           className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-200 text-illini-storm-dark font-bold text-lg rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-600 shadow-sm transition-all"
         >
            <RefreshCcw size={24} /> Reset Progress
         </button>
      </div>
    </div>
  );
};

export default Victory;