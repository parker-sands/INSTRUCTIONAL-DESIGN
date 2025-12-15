import React, { useState } from 'react';
import { MousePointer, ArrowRight, User, ThumbsUp, ThumbsDown, CheckCircle, XCircle, RefreshCcw, Trophy } from 'lucide-react';
import { useGame, ACTIVITIES } from '../context/GameContext';

interface SimulationScenario {
  id: number;
  title: string;
  prompt: string;
  options: {
    text: string;
    outcome: string; // Contains "Correct" or "Incorrect" and feedback
  }[];
}

const simulations: SimulationScenario[] = [
  {
    id: 1,
    title: "Mispronounced Name",
    prompt: "A coworker repeatedly mispronounces Maya’s name during a team introduction.",
    options: [
      { text: "Ignore it; it's not a big deal.", outcome: "Incorrect – dismisses the employee’s experience." },
      { text: "Pause and ask Maya to share the correct pronunciation.", outcome: "Correct – models allyship." },
      { text: "He said it close enough.", outcome: "Incorrect – minimizes respect." }
    ]
  },
  {
    id: 2,
    title: "Interruptions",
    prompt: "Alicia is interrupted twice by the same colleague while trying to explain her strategy during a meeting.",
    options: [
      { text: "Alicia, please finish your thought.", outcome: "Correct – restores her voice." },
      { text: "Let’s move on; we're out of time.", outcome: "Incorrect – silences her contribution." },
      { text: "Maybe it wasn’t important anyway.", outcome: "Incorrect – disrespectful." }
    ]
  },
  {
    id: 3,
    title: "Cultural Joke",
    prompt: "During a break, someone makes a joke about a coworker’s accent.",
    options: [
      { text: "Lighten up; it's just a joke.", outcome: "Incorrect – dismissive." },
      { text: "Comments about identity aren't appropriate.", outcome: "Correct – bias interruption." },
      { text: "Ignore it; it will blow over.", outcome: "Incorrect – enables harm." }
    ]
  },
  {
    id: 4,
    title: "Unequal Work Allocation",
    prompt: "You notice a manager repeatedly assigns low-visibility administrative tasks to one specific employee.",
    options: [
      { text: "Someone has to do it.", outcome: "Incorrect – normalizes inequity." },
      { text: "Rotate responsibilities fairly.", outcome: "Correct – equitable solution." },
      { text: "Ask them to do even more.", outcome: "Incorrect – worsens the issue." }
    ]
  },
  {
    id: 5,
    title: "Holiday Scheduling",
    prompt: "The team is discussing scheduling a major product launch that conflicts with a major cultural holiday.",
    options: [
      { text: "Consider the holiday calendar first.", outcome: "Correct – inclusive planning." },
      { text: "They can work around it.", outcome: "Incorrect – dismissive." },
      { text: "We don't have time for that.", outcome: "Incorrect – exclusionary." }
    ]
  }
];

const ActivityDoSimulation: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  const { completeActivity, isActivityCompleted } = useGame();
  const activityId = 'do_sim';
  const isPreviouslyCompleted = isActivityCompleted(activityId);

  const currentScenario = simulations[currentIndex];

  const handleSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOptionIndex(index);
  };

  const handleSubmit = () => {
    if (selectedOptionIndex === null) return;
    setIsSubmitted(true);
    
    // Check if correct (Simple check based on string content for this prototype)
    const outcomeText = currentScenario.options[selectedOptionIndex].outcome;
    if (outcomeText.startsWith("Correct")) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < simulations.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptionIndex(null);
      setIsSubmitted(false);
    } else {
      setCompleted(true);
      const finalScorePct = Math.round(((score + (currentScenario.options[selectedOptionIndex!].outcome.startsWith("Correct") ? 1 : 0)) / simulations.length) * 100);
      completeActivity(activityId, finalScorePct, ACTIVITIES[activityId as keyof typeof ACTIVITIES].maxXp);
    }
  };

  const handleRestart = () => {
    // Only resets local state to replay, doesn't remove XP
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed || isPreviouslyCompleted) {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up py-12">
        <div className="bg-white p-16 rounded-3xl shadow-lg border-t-8 border-illini-prairie">
          <Trophy className="w-24 h-24 text-illini-harvest mx-auto mb-8" />
          <h2 className="text-4xl font-bold text-illini-blue mb-6 font-montserrat">Simulation Complete</h2>
          <p className="text-2xl text-illini-storm-dark mb-10">
            You scored <strong className="text-illini-prairie">{isPreviouslyCompleted ? "Completed" : score}</strong> on inclusive decision making.
          </p>
          <div className="inline-block bg-illini-cloud px-8 py-4 rounded-xl text-2xl font-bold text-illini-industrial mb-10 border border-slate-200">
             XP Earned: +{ACTIVITIES.do_sim.maxXp}
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
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-illini-prairie pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-illini-prairie font-montserrat">Do 2: Inclusive Conversations</h1>
          <p className="text-xl text-illini-storm">Scenario {currentIndex + 1} of {simulations.length}: {currentScenario.title}</p>
        </div>
        <div className="text-lg font-bold text-illini-storm-light">
          Score: {score}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-illini-prairie p-10 text-white">
           <div className="flex items-start gap-6">
             <div className="bg-white/20 p-4 rounded-full mt-1">
               <User size={40} />
             </div>
             <div>
               <h2 className="text-base font-bold uppercase tracking-widest text-green-200 mb-3">Situation</h2>
               <p className="text-2xl font-medium leading-relaxed">
                 "{currentScenario.prompt}"
               </p>
             </div>
           </div>
        </div>

        <div className="p-10">
          <div className="space-y-6">
            <h3 className="text-illini-storm font-bold uppercase tracking-wide text-sm mb-4">Choose the inclusive response:</h3>
            
            {currentScenario.options.map((opt, idx) => {
              let btnClass = "border-slate-200 hover:border-illini-prairie hover:bg-green-50";
              let icon = <ArrowRight className="text-slate-300 group-hover:text-illini-prairie" size={24} />;

              if (isSubmitted) {
                const isCorrect = opt.outcome.startsWith("Correct");
                const isSelected = selectedOptionIndex === idx;

                if (isCorrect) {
                  btnClass = "border-green-500 bg-green-50";
                  icon = <CheckCircle className="text-green-600" size={24} />;
                } else if (isSelected && !isCorrect) {
                  btnClass = "border-red-500 bg-red-50";
                  icon = <XCircle className="text-red-600" size={24} />;
                } else {
                  btnClass = "border-slate-100 opacity-50";
                  icon = <div />;
                }
              } else if (selectedOptionIndex === idx) {
                btnClass = "border-illini-prairie bg-green-50 ring-2 ring-illini-prairie";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all flex justify-between items-center group ${btnClass}`}
                >
                  <div className="flex-1">
                    <span className={`font-bold text-xl ${isSubmitted && opt.outcome.startsWith("Correct") ? "text-green-900" : "text-illini-blue"}`}>
                      {opt.text}
                    </span>
                    {isSubmitted && (selectedOptionIndex === idx || opt.outcome.startsWith("Correct")) && (
                      <div className={`mt-3 text-base font-medium ${opt.outcome.startsWith("Correct") ? "text-green-700" : "text-red-700"}`}>
                        {opt.outcome}
                      </div>
                    )}
                  </div>
                  {icon}
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex justify-end">
            {!isSubmitted ? (
              <button 
                onClick={handleSubmit}
                disabled={selectedOptionIndex === null}
                className="px-10 py-4 bg-illini-prairie text-white font-bold text-lg rounded-xl hover:bg-green-800 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Response
              </button>
            ) : (
              <button 
                onClick={handleNext}
                className="px-10 py-4 bg-illini-blue text-white font-bold text-lg rounded-xl hover:bg-illini-industrial transition-colors shadow-md flex items-center gap-3 animate-fade-in-up"
              >
                {currentIndex < simulations.length - 1 ? 'Next Scenario' : 'Finish'} <ArrowRight size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDoSimulation;