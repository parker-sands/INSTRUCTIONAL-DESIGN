import React, { useState } from 'react';
import { FileText, User, MessageCircle, AlertTriangle, CheckCircle, ArrowRight, RefreshCcw, Trophy } from 'lucide-react';
import { useGame, ACTIVITIES } from '../context/GameContext';

interface DialogueLine {
  speaker: string;
  role: 'PM' | 'Employee' | 'Dev';
  text: string;
}

interface Option {
  id: number;
  text: string;
  correct: boolean;
  feedback?: string;
}

interface Scenario {
  id: number;
  title: string;
  context: string;
  script: DialogueLine[];
  task: string;
  options: Option[];
  betterResponse?: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Project Sync",
    context: "A weekly status check-in regarding a delayed beta release.",
    script: [
      { speaker: "Project Manager", role: "PM", text: "So, tell me why the beta release is delayed again. We talked about this last week." },
      { speaker: "Developer", role: "Dev", text: "Well, the API documentation from the client was outdated. We had to rewrite the auth module." },
      { speaker: "Project Manager", role: "PM", text: "You should have checked that earlier. Now I have to explain this to the VP. Just get it done by Friday." }
    ],
    task: "Identify the primary error in the Project Manager's communication style based on ITI's 'Active Listening' policy.",
    options: [
      { id: 1, text: "The PM failed to ask 'How can I help?' and focused on blame instead of solutions.", correct: true, feedback: "Correct! This demonstrates a lack of empathy and collaborative problem solving." },
      { id: 2, text: "The PM was too soft and should have set a stricter deadline earlier.", correct: false },
      { id: 3, text: "The PM should have emailed the VP immediately instead of talking to the Developer.", correct: false }
    ]
  },
  {
    id: 2,
    title: "Relationship Management",
    context: "An employee expresses concern about their workload stability during a 1:1.",
    script: [
      { speaker: "Employee", role: "Employee", text: "I feel my work keeps getting reassigned without explanation. Am I doing something wrong?" },
      { speaker: "Project Manager", role: "PM", text: "It’s just how things are right now. Don't worry about it." }
    ],
    task: "How does the Project Manager's response impact the employee relationship?",
    options: [
      { id: 1, text: "It builds resilience by not sugar-coating the truth.", correct: false },
      { id: 2, text: "It dismisses the employee's concern and creates insecurity.", correct: true, feedback: "Exactly. Dismissiveness erodes trust." },
      { id: 3, text: "It efficiently closes the conversation to save time.", correct: false }
    ],
    betterResponse: "Thank you for bringing this up. Can you share a specific example so I can understand better?"
  },
  {
    id: 3,
    title: "Conflict Resolution",
    context: "Two team members are clashing over technical decisions.",
    script: [
      { speaker: "Employee A", role: "Employee", text: "Tom keeps overriding my decisions in the codebase." },
      { speaker: "Project Manager", role: "PM", text: "Figure it out between yourselves. I don't have time for refereeing." }
    ],
    task: "What is the primary risk of this management style?",
    options: [
      { id: 1, text: "It empowers the team to self-organize.", correct: false },
      { id: 2, text: "It ignores the power dynamic and avoids necessary mediation.", correct: true, feedback: "Right. Ignoring conflict rarely solves it." },
      { id: 3, text: "It demonstrates trust in Tom's technical ability.", correct: false }
    ],
    betterResponse: "Let’s unpack this. Tom, what led you to intervene? Then we’ll reset expectations together."
  }
];

const ActivityAbsorbScenarios: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedAnalysis, setSelectedAnalysis] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const { completeActivity, isActivityCompleted } = useGame();
  const activityId = 'absorb_scenarios';
  const isPreviouslyCompleted = isActivityCompleted(activityId);

  const currentScenario = scenarios[currentScenarioIndex];

  const handleNext = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedAnalysis(null);
    } else {
      setIsCompleted(true);
      completeActivity(activityId, 100, ACTIVITIES[activityId as keyof typeof ACTIVITIES].maxXp);
    }
  };

  const handleRestart = () => {
    setCurrentScenarioIndex(0);
    setSelectedAnalysis(null);
    setIsCompleted(false);
  };

  if (isCompleted || isPreviouslyCompleted) {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up py-12">
        <div className="bg-white p-12 rounded-2xl shadow-lg border-t-8 border-illini-berry">
          <Trophy className="w-20 h-20 text-illini-harvest mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-illini-blue mb-4 font-montserrat">Analysis Complete</h2>
          <p className="text-xl text-illini-storm-dark mb-8">
            You have successfully analyzed all three communication scenarios.
          </p>
           <div className="inline-block bg-illini-cloud px-8 py-4 rounded-xl text-2xl font-bold text-illini-berry mb-10 border border-slate-200">
             XP Earned: +{ACTIVITIES.absorb_scenarios.maxXp}
           </div>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-8 py-3 bg-illini-blue text-white font-bold rounded-lg hover:bg-illini-industrial transition-colors mx-auto shadow-md"
          >
             Return to Mission Control
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-illini-berry pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-illini-berry font-montserrat">Absorb 3: Written Scenarios</h1>
          <p className="text-xl text-illini-storm">Scenario {currentScenarioIndex + 1} of {scenarios.length}: {currentScenario.title}</p>
        </div>
        <div className="text-lg font-bold text-illini-storm-light">
          {Math.round(((currentScenarioIndex) / scenarios.length) * 100)}% Complete
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* The Scenario Script */}
        <div className="space-y-6">
          <div className="bg-white p-10 rounded-2xl shadow-md border border-slate-200 h-full">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-illini-berry" size={28} />
              <h2 className="font-bold text-illini-blue font-montserrat text-2xl">Transcript</h2>
            </div>
            <p className="text-sm text-illini-storm uppercase tracking-wider mb-8 font-bold">{currentScenario.context}</p>
            
            <div className="space-y-8 text-lg leading-relaxed">
              {currentScenario.script.map((line, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-sm ${line.role === 'PM' ? 'bg-illini-storm-light text-illini-storm-dark' : 'bg-illini-cloud text-illini-blue'}`}>
                    {line.role}
                  </div>
                  <div className={`p-6 rounded-2xl rounded-tl-none border ${line.role === 'PM' ? 'bg-slate-50 border-slate-100' : 'bg-blue-50 border-blue-100'}`}>
                    <p className={`font-bold mb-2 ${line.role === 'PM' ? 'text-slate-700' : 'text-illini-blue'}`}>{line.speaker}</p>
                    <p className="text-slate-800">"{line.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Panel */}
        <div className="space-y-8">
          <div className="bg-illini-berry text-white p-8 rounded-2xl shadow-lg">
             <h3 className="font-bold font-montserrat mb-3 flex items-center gap-3 text-xl">
               <MessageCircle size={24} /> Your Task
             </h3>
             <p className="text-purple-100 text-lg">
               {currentScenario.task}
             </p>
          </div>

          <div className="space-y-4">
             {currentScenario.options.map((option) => (
               <button
                 key={option.id}
                 onClick={() => setSelectedAnalysis(option.id)}
                 className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                   selectedAnalysis === option.id 
                     ? (option.correct ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                     : 'border-slate-200 bg-white hover:border-illini-berry'
                 }`}
               >
                 <div className="flex gap-4">
                   {selectedAnalysis === option.id ? (
                      option.correct ? <CheckCircle className="text-green-600 flex-shrink-0" size={24} /> : <AlertTriangle className="text-red-600 flex-shrink-0" size={24} />
                   ) : (
                      <div className="w-6 h-6 rounded-full border border-slate-300 flex-shrink-0 mt-1" />
                   )}
                   <span className={`text-lg font-medium ${selectedAnalysis === option.id ? 'text-slate-900' : 'text-slate-600'}`}>
                     {option.text}
                   </span>
                 </div>
                 
                 {/* Feedback Area */}
                 {selectedAnalysis === option.id && (
                   <div className={`mt-4 ml-10 text-base p-4 rounded-lg ${option.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                     <p className="font-bold mb-2">{option.correct ? 'Correct Assessment' : 'Try Again'}</p>
                     <p>{option.correct ? option.feedback : "Review the transcript and ITI policy on empathy."}</p>
                     
                     {/* Show better response if correct and available */}
                     {option.correct && currentScenario.betterResponse && (
                       <div className="mt-4 pt-4 border-t border-green-200">
                         <p className="font-bold text-green-900 mb-1">Better Response (Effective):</p>
                         <p className="italic">"{currentScenario.betterResponse}"</p>
                       </div>
                     )}
                   </div>
                 )}
               </button>
             ))}
          </div>

          {/* Next Button - Only appears when correct answer is selected */}
          {selectedAnalysis !== null && currentScenario.options.find(o => o.id === selectedAnalysis)?.correct && (
            <button 
              onClick={handleNext}
              className="w-full py-5 bg-illini-blue text-white font-bold text-xl rounded-xl shadow-md hover:bg-illini-industrial transition-colors flex justify-center items-center gap-3 animate-fade-in-up"
            >
              {currentScenarioIndex < scenarios.length - 1 ? 'Next Scenario' : 'Complete Activity'} <ArrowRight size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityAbsorbScenarios;