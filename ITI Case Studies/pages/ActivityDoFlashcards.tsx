import React, { useState, useEffect } from 'react';
import { Layers, Check, RefreshCcw, Trophy } from 'lucide-react';
import { useGame, ACTIVITIES } from '../context/GameContext';

const terms = [
  { id: 1, term: "Inclusive Meeting Practice", def: "Ensuring all voices have an opportunity to contribute." },
  { id: 2, term: "Psychological Safety", def: "Creating conditions where employees feel safe to speak up." },
  { id: 3, term: "Active Listening", def: "Demonstrating attention, reflection, and understanding." },
  { id: 4, term: "Perspective-Taking", def: "Considering how experiences differ across individuals." },
  { id: 5, term: "Equitable Participation", def: "Distributing speaking time and responsibilities fairly." },
  { id: 6, term: "Respectful Language", def: "Avoiding assumptions, stereotypes, or dismissive tones." },
  { id: 7, term: "Cultural Awareness", def: "Recognizing how culture shapes communication styles." },
  { id: 8, term: "Bias Interruption", def: "Identifying and stopping biased comments or actions." },
  { id: 9, term: "Allyship", def: "Taking action to support marginalized teammates." },
  { id: 10, term: "Microaffirmations", def: "Small behaviors that validate and encourage others." }
];

const ActivityDoFlashcards: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [selectedDef, setSelectedDef] = useState<number | null>(null);
  const [matches, setMatches] = useState<number[]>([]);
  const [shuffledDefs, setShuffledDefs] = useState<any[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const { completeActivity, isActivityCompleted } = useGame();
  const activityId = 'do_flashcards';
  const isPreviouslyCompleted = isActivityCompleted(activityId);

  useEffect(() => {
    setShuffledDefs([...terms].sort(() => Math.random() - 0.5));
  }, []);

  const handleMatch = (type: 'term' | 'def', id: number) => {
    if (matches.includes(id)) return;

    if (type === 'term') {
      setSelectedTerm(id);
      if (selectedDef !== null) {
        checkMatch(id, selectedDef);
      }
    } else {
      setSelectedDef(id);
      if (selectedTerm !== null) {
        checkMatch(selectedTerm, id);
      }
    }
  };

  const checkMatch = (termId: number, defId: number) => {
    if (termId === defId) {
      const newMatches = [...matches, termId];
      setMatches(newMatches);
      setSelectedTerm(null);
      setSelectedDef(null);

      if (newMatches.length === terms.length) {
          setIsCompleted(true);
          completeActivity(activityId, 100, ACTIVITIES[activityId as keyof typeof ACTIVITIES].maxXp);
      }

    } else {
      setTimeout(() => {
        setSelectedTerm(null);
        setSelectedDef(null);
      }, 500);
    }
  };

  const reset = () => {
    setMatches([]);
    setSelectedTerm(null);
    setSelectedDef(null);
    setShuffledDefs([...terms].sort(() => Math.random() - 0.5));
    setIsCompleted(false);
  };

  if (isCompleted || isPreviouslyCompleted) {
    return (
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up py-12">
            <div className="bg-white p-16 rounded-3xl shadow-lg border-t-8 border-illini-prairie">
            <Trophy className="w-24 h-24 text-illini-harvest mx-auto mb-8" />
            <h2 className="text-4xl font-bold text-illini-blue mb-6 font-montserrat">Excellent Work!</h2>
            <p className="text-2xl text-illini-storm-dark mb-10">
                You have mastered the core vocabulary for inclusive workplaces.
            </p>
            <div className="inline-block bg-illini-cloud px-8 py-4 rounded-xl text-2xl font-bold text-illini-prairie mb-10 border border-slate-200">
                XP Earned: +{ACTIVITIES.do_flashcards.maxXp}
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
      <div className="border-b border-illini-prairie pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-illini-prairie font-montserrat">Do 1: Inclusion Terminology</h1>
          <p className="text-xl text-illini-storm">Match the term to its correct definition.</p>
        </div>
        <button onClick={reset} className="text-illini-prairie hover:bg-green-50 p-3 rounded-full transition-colors">
          <RefreshCcw size={24} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Terms Column */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-illini-blue mb-6 font-montserrat flex items-center gap-3">
            <Layers size={24} className="text-illini-prairie"/> Terms
          </h2>
          {terms.map((item) => {
             const isMatched = matches.includes(item.id);
             const isSelected = selectedTerm === item.id;
             return (
              <button
                key={item.id}
                onClick={() => handleMatch('term', item.id)}
                disabled={isMatched}
                className={`w-full p-6 text-left rounded-xl border-2 transition-all shadow-sm ${
                  isMatched 
                    ? 'border-transparent bg-illini-prairie text-white opacity-50 cursor-default' 
                    : isSelected 
                      ? 'border-illini-prairie bg-green-50 text-illini-blue ring-4 ring-green-100' 
                      : 'border-slate-200 bg-white hover:border-green-300 text-illini-blue font-bold text-lg'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{item.term}</span>
                  {isMatched && <Check size={24} />}
                </div>
              </button>
             );
          })}
        </div>

        {/* Definitions Column */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-illini-blue mb-6 font-montserrat">Definitions</h2>
          {shuffledDefs.map((item) => {
             const isMatched = matches.includes(item.id);
             const isSelected = selectedDef === item.id;
             return (
              <button
                key={item.id}
                onClick={() => handleMatch('def', item.id)}
                disabled={isMatched}
                className={`w-full p-6 text-left rounded-xl border-2 transition-all shadow-sm ${
                  isMatched 
                    ? 'border-transparent bg-illini-prairie text-white opacity-50 cursor-default' 
                    : isSelected 
                      ? 'border-illini-prairie bg-green-50 text-illini-blue ring-4 ring-green-100' 
                      : 'border-slate-200 bg-white hover:border-green-300 text-illini-storm-dark text-lg'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{item.def}</span>
                  {isMatched && <Check size={24} />}
                </div>
              </button>
             );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityDoFlashcards;