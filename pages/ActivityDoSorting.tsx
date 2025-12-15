import React, { useState } from 'react';
import { RefreshCw, ArrowRight, ArrowLeft, CheckCircle, Trophy } from 'lucide-react';
import { useGame, ACTIVITIES } from '../context/GameContext';

interface Card {
  id: number;
  text: string;
  category: 'inclusive' | 'non-inclusive';
}

const cards: Card[] = [
  { id: 1, text: "Invites quieter team members to share input.", category: 'inclusive' },
  { id: 2, text: "Checks for understanding before moving on.", category: 'inclusive' },
  { id: 3, text: "Acknowledges differing perspectives respectfully.", category: 'inclusive' },
  { id: 4, text: "Makes assumptions about coworkers’ abilities.", category: 'non-inclusive' },
  { id: 5, text: "Dismisses feedback from junior staff.", category: 'non-inclusive' },
  { id: 6, text: "Talks over teammates during discussions.", category: 'non-inclusive' },
  { id: 7, text: "Provides space for all voices in meetings.", category: 'inclusive' },
  { id: 8, text: "Uses stereotypes in conversation.", category: 'non-inclusive' },
  { id: 9, text: "Encourages collaboration across roles.", category: 'inclusive' },
  { id: 10, text: "Ignores cultural holidays others observe.", category: 'non-inclusive' }
];

const ActivityDoSorting: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sorted, setSorted] = useState<{id: number, correct: boolean}[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [rewriteText, setRewriteText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const { completeActivity, isActivityCompleted } = useGame();
  const activityId = 'do_sorting';
  const isPreviouslyCompleted = isActivityCompleted(activityId);

  const handleSort = (direction: 'left' | 'right') => {
    const card = cards[currentIndex];
    const isCorrect = (direction === 'left' && card.category === 'inclusive') || 
                      (direction === 'right' && card.category === 'non-inclusive');
    
    setSorted([...sorted, { id: card.id, correct: isCorrect }]);
    
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleSubmitRewrite = () => {
     if (rewriteText.length > 10) {
         setSubmitted(true);
         const correctCount = sorted.filter(s => s.correct).length;
         const scorePct = Math.round((correctCount / cards.length) * 100);
         completeActivity(activityId, scorePct, ACTIVITIES[activityId as keyof typeof ACTIVITIES].maxXp);
     }
  };

  const currentCard = cards[currentIndex];

  if (submitted || isPreviouslyCompleted) {
    return (
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up py-12">
            <div className="bg-white p-16 rounded-3xl shadow-lg border-t-8 border-illini-prairie">
            <Trophy className="w-24 h-24 text-illini-harvest mx-auto mb-8" />
            <h2 className="text-4xl font-bold text-illini-blue mb-6 font-montserrat">Sorting Completed</h2>
            <p className="text-2xl text-illini-storm-dark mb-10">
                You have analyzed and corrected workplace behaviors.
            </p>
            <div className="inline-block bg-illini-cloud px-8 py-4 rounded-xl text-2xl font-bold text-illini-prairie mb-10 border border-slate-200">
                XP Earned: +{ACTIVITIES.do_sorting.maxXp}
            </div>
            <div>
                <button 
                    onClick={() => window.history.back()}
                    className="px-8 py-3 bg-illini-blue text-white font-bold rounded-lg hover:bg-illini-industrial transition-colors"
                >
                    Return to Mission Control
                </button>
            </div>
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <div className="border-b border-illini-prairie pb-4">
        <h1 className="text-4xl font-bold text-illini-prairie font-montserrat">Do 3: Scenario Sorting</h1>
        <p className="text-xl text-illini-storm">Categorize behaviors and rewrite the non-inclusive ones.</p>
      </div>

      {!isFinished ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center h-[500px]">
          {/* Inclusive Target */}
          <div 
             onClick={() => handleSort('left')}
             className="h-full border-4 border-dashed border-green-300 rounded-3xl flex items-center justify-center bg-green-50 cursor-pointer hover:bg-green-100 transition-colors"
          >
            <h3 className="text-4xl font-bold text-green-700 font-montserrat opacity-60">Inclusive</h3>
          </div>

          {/* Card Stack */}
          <div className="h-full flex flex-col justify-center items-center relative">
             <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-200 w-full h-80 flex items-center justify-center text-center transform transition-all hover:scale-105">
               <p className="text-2xl font-bold text-illini-blue leading-relaxed">{currentCard.text}</p>
             </div>
             <div className="flex justify-between w-full mt-8 px-4">
                <button onClick={() => handleSort('left')} className="p-5 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors">
                  <ArrowLeft size={32} />
                </button>
                <button onClick={() => handleSort('right')} className="p-5 bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors">
                  <ArrowRight size={32} />
                </button>
             </div>
             <p className="mt-6 text-base text-slate-400 font-bold tracking-wide">Card {currentIndex + 1} of {cards.length}</p>
          </div>

          {/* Non-Inclusive Target */}
          <div 
             onClick={() => handleSort('right')}
             className="h-full border-4 border-dashed border-red-300 rounded-3xl flex items-center justify-center bg-red-50 cursor-pointer hover:bg-red-100 transition-colors"
          >
            <h3 className="text-4xl font-bold text-red-700 font-montserrat opacity-60 text-center">Non-Inclusive</h3>
          </div>
        </div>
      ) : (
        <div className="space-y-10 animate-fade-in-up">
           <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
             <h2 className="text-2xl font-bold text-illini-blue mb-4 font-montserrat">Part 2: Rewrite Task</h2>
             <p className="text-illini-storm-dark mb-6 text-lg">
               Select one of the non-inclusive scenarios and rewrite it to be inclusive.
             </p>
             
             {/* Using Card 5 ("Dismisses feedback from junior staff") as the example */}
             <div className="bg-red-50 p-6 rounded-xl border border-red-100 mb-6 text-red-900 italic text-xl">
               "{cards[4].text}"
             </div>

             <textarea
               value={rewriteText}
               onChange={(e) => setRewriteText(e.target.value)}
               className="w-full p-6 border border-slate-300 rounded-xl h-40 outline-none focus:ring-2 focus:ring-illini-prairie text-lg"
               placeholder="Type your improved version here..."
             ></textarea>

             <div className="flex justify-end mt-6">
               <button 
                  onClick={handleSubmitRewrite}
                  disabled={rewriteText.length < 10}
                  className="px-8 py-4 bg-illini-prairie text-white font-bold text-lg rounded-xl hover:bg-green-800 flex items-center gap-3 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                 <RefreshCw size={20} /> Submit Rewrite
               </button>
             </div>
           </div>

           <div className="bg-slate-100 p-8 rounded-2xl">
              <h3 className="font-bold text-slate-700 mb-4 text-lg">Sorting Results</h3>
              <div className="flex flex-wrap gap-4">
                {sorted.map((res, idx) => (
                  <div key={idx} className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shadow-sm ${res.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {idx + 1}
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ActivityDoSorting;