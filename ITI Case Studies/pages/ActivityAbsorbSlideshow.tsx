import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Volume2, CheckCircle, FileText, AlertCircle, Trophy } from 'lucide-react';
import { useGame, ACTIVITIES } from '../context/GameContext';

const slides = [
  {
    id: 1,
    title: "Welcome to Eye-2-Eye",
    content: "Welcome to Eye-2-Eye with ITI. Consistency in communication is key to our global success.",
    bullets: [
      "Establishing a baseline for communication standards.",
      "Ensuring efficiency and clarity across global teams.",
      "Reducing analysis time for executives."
    ],
    imageColor: "bg-illini-berry"
  },
  {
    id: 2,
    title: "Why Consistency in Communication Matters",
    content: "Leadership depends on consistent, structured updates to make informed decisions quickly.",
    bullets: [
      "Inconsistent reporting slows progress and creates confusion across teams.",
      "Standardized updates ensure the right information reaches the right people at the right time."
    ],
    imageColor: "bg-illini-industrial"
  },
  {
    id: 3,
    title: "ITI’s Communication Expectations",
    content: "Weekly updates are the pulse of our global operations.",
    bullets: [
      "Include: project status, key accomplishments, upcoming milestones, blockers, and requests.",
      "Tone must be clear, concise, and professional.",
      "Avoid filler content or unnecessary detail."
    ],
    imageColor: "bg-illini-orange"
  },
  {
    id: 4,
    title: "Using the Weekly Update Template",
    content: "Follow the approved structure for all email updates:",
    bullets: [
      "Subject line format: 'Project Update – [Project Name] – [Week]'.",
      "Include a one-sentence summary followed by bulleted status.",
      "Explicitly list risks/blockers and leadership requests."
    ],
    imageColor: "bg-illini-patina"
  },
  {
    id: 5,
    title: "Frequent Issues to Avoid",
    content: "Common pitfalls that reduce communication effectiveness:",
    bullets: [
      "Too much detail or long paragraphs.",
      "Emotional or subjective tone.",
      "Missing risks, unclear asks, or inconsistent formatting.",
      "Sending updates inconsistently."
    ],
    imageColor: "bg-illini-earth"
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of weekly updates to leadership?",
    options: [
      "Lengthy explanations of daily work",
      "Quick decision support for leadership",
      "Sharing personal reflections",
      "Comparing your work to peers"
    ],
    correctIndex: 1
  },
  {
    id: 2,
    question: "Which item must be included in every weekly update?",
    options: [
      "Personal opinions",
      "Project status and key accomplishments",
      "Daily activity log",
      "Inspirational quotes"
    ],
    correctIndex: 1
  },
  {
    id: 3,
    question: "What tone should weekly updates use?",
    options: [
      "Emotional and conversational",
      "Sarcastic",
      "Clear and professional",
      "Aggressive"
    ],
    correctIndex: 2
  },
  {
    id: 4,
    question: "Which is a common mistake?",
    options: [
      "Using the ITI template",
      "Sending weekly updates",
      "Including risks or blockers",
      "Adding unnecessary detail"
    ],
    correctIndex: 3
  },
  {
    id: 5,
    question: "Which subject line follows ITI standards?",
    options: [
      "Weekly Thoughts",
      "Project Update – [Project Name] – [Week]",
      "FYI Team",
      "Status"
    ],
    correctIndex: 1
  }
];

const ActivityAbsorbSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  const { completeActivity, isActivityCompleted } = useGame();
  const activityId = 'absorb_slides';
  const isPreviouslyCompleted = isActivityCompleted(activityId);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleAnswer = (qIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    const newAnswers = [...quizAnswers];
    newAnswers[qIndex] = optionIndex;
    setQuizAnswers(newAnswers);
  };
  
  const handleSubmit = () => {
      setQuizSubmitted(true);
      const score = calculateScore();
      const scorePct = Math.round((score / quizQuestions.length) * 100);
      completeActivity(activityId, scorePct, ACTIVITIES[activityId as keyof typeof ACTIVITIES].maxXp);
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) score++;
    });
    return score;
  };
  
  if (isPreviouslyCompleted && !showQuiz) {
     // Optional: If you wanted to show a "Done" state initially, but we allow reviewing slides.
     // For now, we just show the completion screen if they finish the quiz again or navigate back.
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-illini-berry pb-4">
        <h1 className="text-4xl font-bold text-illini-berry font-montserrat">Absorb 1: Narrated Slideshow</h1>
        <p className="text-xl text-illini-storm">Weekly Leadership Updates Training</p>
      </div>

      {!showQuiz ? (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          {/* Slide Display */}
          <div className={`h-80 ${slides[currentSlide].imageColor} flex items-center justify-center text-white p-12 text-center`}>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
              <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">{slides[currentSlide].title}</h2>
              <div className="flex items-center justify-center gap-3 text-base uppercase tracking-widest opacity-80 font-bold">
                <Volume2 size={24} /> Narrated Audio Playing...
              </div>
            </div>
          </div>
          
          <div className="p-10 md:p-16">
            <h3 className="text-2xl md:text-3xl font-bold text-illini-blue mb-8 leading-tight">{slides[currentSlide].content}</h3>
            <ul className="space-y-4 mb-12">
              {slides[currentSlide].bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-4 text-xl text-illini-storm-dark">
                  <CheckCircle className="text-illini-berry flex-shrink-0 mt-1" size={24} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center pt-8 border-t border-slate-100">
              <button 
                onClick={handlePrev} 
                disabled={currentSlide === 0}
                className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-lg text-illini-storm disabled:opacity-30 hover:bg-illini-cloud transition-colors"
              >
                <ChevronLeft size={24} /> Previous
              </button>
              <div className="text-lg font-bold text-illini-berry">
                Slide {currentSlide + 1} of {slides.length}
              </div>
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 px-10 py-4 bg-illini-berry text-white rounded-xl font-bold text-lg hover:bg-purple-900 transition-colors shadow-md"
              >
                {currentSlide === slides.length - 1 ? 'Start Quiz' : 'Next'} <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16 border border-slate-200 animate-fade-in-up">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-illini-berry font-montserrat flex items-center gap-4">
              <FileText size={32} /> Knowledge Check
            </h2>
            {quizSubmitted && (
               <div className="bg-illini-berry text-white px-6 py-3 rounded-xl font-bold text-xl">
                 Score: {calculateScore()} / {quizQuestions.length}
               </div>
            )}
          </div>
          
          <div className="space-y-10">
            {quizQuestions.map((q, qIdx) => (
              <div key={q.id} className="p-8 bg-illini-cloud rounded-2xl">
                <p className="font-bold text-xl text-illini-blue mb-6">{qIdx + 1}. {q.question}</p>
                <div className="space-y-4">
                  {q.options.map((opt, oIdx) => {
                    let btnClass = "border-white bg-white hover:border-illini-berry";
                    let icon = null;

                    if (quizSubmitted) {
                      if (oIdx === q.correctIndex) {
                        btnClass = "border-green-500 bg-green-50 text-green-900 font-bold";
                        icon = <CheckCircle size={24} className="text-green-600" />;
                      } else if (quizAnswers[qIdx] === oIdx) {
                        btnClass = "border-red-500 bg-red-50 text-red-900";
                        icon = <AlertCircle size={24} className="text-red-600" />;
                      } else {
                        btnClass = "border-transparent bg-slate-100 text-slate-400";
                      }
                    } else if (quizAnswers[qIdx] === oIdx) {
                      btnClass = "border-illini-berry bg-purple-50 text-illini-berry font-bold";
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswer(qIdx, oIdx)}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all text-lg ${btnClass}`}
                      >
                        <div className="flex justify-between items-center">
                          {opt}
                          {icon}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 flex gap-6">
             {!quizSubmitted ? (
                <button 
                  onClick={handleSubmit}
                  disabled={quizAnswers.length < quizQuestions.length}
                  className="px-10 py-4 bg-illini-berry text-white rounded-xl font-bold text-lg hover:bg-purple-900 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Answers & Complete
                </button>
             ) : (
                <div className="w-full text-center">
                    <h3 className="text-2xl font-bold text-illini-blue mb-4">Module Completed!</h3>
                    <div className="inline-block bg-illini-cloud px-8 py-4 rounded-xl text-xl font-bold text-illini-berry mb-8 border border-slate-200">
                        XP Earned: +{ACTIVITIES.absorb_slides.maxXp}
                    </div>
                    <button 
                    onClick={() => { setShowQuiz(false); setCurrentSlide(0); setQuizAnswers([]); setQuizSubmitted(false); }}
                    className="px-10 py-4 bg-illini-blue text-white rounded-xl font-bold text-lg hover:bg-illini-industrial transition-colors shadow-md"
                    >
                    Restart Module
                    </button>
                </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityAbsorbSlideshow;