import React, { useState } from 'react';
import { PlayCircle, PauseCircle, CheckSquare, MessageSquare, Trophy } from 'lucide-react';
import { useGame, ACTIVITIES } from '../context/GameContext';

const ActivityAbsorbVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reflection, setReflection] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { completeActivity, isActivityCompleted } = useGame();
  const activityId = 'absorb_video';
  const isPreviouslyCompleted = isActivityCompleted(activityId);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate video end after 3 seconds for prototype
      setTimeout(() => {
        setIsPlaying(false);
        setCompleted(true);
      }, 3000);
    }
  };

  const handleSubmit = () => {
    if (reflection.trim().length > 10) {
        setSubmitted(true);
        completeActivity(activityId, 100, ACTIVITIES[activityId as keyof typeof ACTIVITIES].maxXp);
    }
  };

  if (submitted || isPreviouslyCompleted) {
     return (
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up py-12">
            <div className="bg-white p-16 rounded-3xl shadow-lg border-t-8 border-illini-berry">
                <Trophy className="w-24 h-24 text-illini-harvest mx-auto mb-8" />
                <h2 className="text-4xl font-bold text-illini-blue mb-6 font-montserrat">Module Complete!</h2>
                <p className="text-2xl text-illini-storm-dark mb-10">
                    Reflection submitted successfully.
                </p>
                <div className="inline-block bg-illini-cloud px-8 py-4 rounded-xl text-2xl font-bold text-illini-berry mb-10 border border-slate-200">
                    XP Earned: +{ACTIVITIES.absorb_video.maxXp}
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
      <div className="border-b border-illini-berry pb-4">
        <h1 className="text-4xl font-bold text-illini-berry font-montserrat">Absorb 2: Role-Play Analysis</h1>
        <p className="text-xl text-illini-storm">Daily Stand-up Recognition Practices</p>
      </div>

      {/* Video Player Mock */}
      <div className="relative bg-black rounded-3xl overflow-hidden aspect-video shadow-2xl group cursor-pointer" onClick={togglePlay}>
        <img 
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
          alt="Office Meeting" 
          className={`w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-80' : 'opacity-40'}`}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          {isPlaying ? (
            <div className="text-white font-bold animate-pulse flex flex-col items-center">
              <span className="text-2xl tracking-widest uppercase mb-2">Playing Scene...</span>
              <span className="text-base font-light">(Simulated Video Playback)</span>
            </div>
          ) : (
            <PlayCircle size={100} className="text-white opacity-90 group-hover:scale-110 transition-transform" />
          )}
        </div>

        {/* Video Controls Mock */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex items-center gap-6">
          <button className="text-white hover:text-illini-orange transition-colors">
            {isPlaying ? <PauseCircle size={40} /> : <PlayCircle size={40} />}
          </button>
          <div className="flex-1 h-3 bg-white/30 rounded-full overflow-hidden">
            <div className={`h-full bg-illini-orange transition-all duration-[3000ms] ease-linear ${isPlaying ? 'w-full' : completed ? 'w-full' : 'w-0'}`}></div>
          </div>
          <span className="text-white font-mono text-lg">03:14</span>
        </div>
      </div>

      {/* Reflection Section */}
      <div className={`transition-all duration-700 ${completed ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-10 blur-sm pointer-events-none'}`}>
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-illini-blue mb-6 flex items-center gap-3 font-montserrat">
            <MessageSquare className="text-illini-berry" size={32} /> Reflection
          </h2>
          <p className="text-illini-storm-dark mb-8 text-xl leading-relaxed">
            In the video, Manager #3 used specific, work-related praise. How did this differ from Manager #2's approach?
          </p>
          <textarea 
            className="w-full p-6 border border-slate-300 rounded-xl focus:ring-2 focus:ring-illini-berry focus:border-illini-berry outline-none h-40 resize-none text-lg"
            placeholder="Type your observation here..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
          ></textarea>
          <div className="mt-6 flex justify-end">
             <button 
                onClick={handleSubmit}
                disabled={reflection.length < 10}
                className="px-8 py-4 bg-illini-berry text-white font-bold text-lg rounded-xl hover:bg-purple-900 transition-colors shadow-md flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <CheckSquare size={24} /> Submit Reflection
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityAbsorbVideo;