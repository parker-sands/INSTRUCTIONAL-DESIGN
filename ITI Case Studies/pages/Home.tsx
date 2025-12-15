import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Layers, Zap, Star, Trophy, CheckCircle2 } from 'lucide-react';
import { useGame } from '../context/GameContext';

const Home: React.FC = () => {
  const { gameState, getProgressPercentage } = useGame();
  
  const teamLinks = [
    { name: 'Parker Sands', id: 'parker-sands', bg: 'bg-illini-industrial' },
    { name: 'Charlie Stancik', id: 'charlie-stancik', bg: 'bg-illini-arches' },
    { name: 'Paige Miller', id: 'paige-miller', bg: 'bg-illini-patina' }
  ];

  // Helper to check if a scenario group is complete
  const isScenarioComplete = (ids: string[]) => ids.every(id => gameState.completedActivities.includes(id));

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Gamified Hero Section */}
      <section className="bg-illini-blue rounded-3xl shadow-xl p-10 md:p-14 text-white relative overflow-hidden border-b-8 border-illini-orange">
        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
           <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-illini-orange rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-lg">
                 <Trophy size={14} /> Mission Control
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-montserrat tracking-tight leading-tight">
                Welcome, <span className="text-illini-orange">ITI Team Member.</span>
              </h1>
              <p className="text-xl text-blue-100 font-medium mb-8 font-montserrat leading-relaxed max-w-xl">
                Your mission: Complete all 9 strategic training modules to verify your competency and earn your Annual Compliance Certificate.
              </p>
              
              <div className="flex flex-wrap gap-4">
                 <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 min-w-[140px]">
                    <div className="text-xs text-blue-200 uppercase tracking-wider font-bold mb-1">Current XP</div>
                    <div className="text-3xl font-black text-white font-mono">{gameState.xp}</div>
                 </div>
                 <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 min-w-[140px]">
                    <div className="text-xs text-blue-200 uppercase tracking-wider font-bold mb-1">Progress</div>
                    <div className="text-3xl font-black text-white font-mono">{getProgressPercentage()}%</div>
                 </div>
              </div>
           </div>
           
           {/* Progress Visual - Mission Status Card */}
           <div className="bg-white p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
              <h3 className="font-bold text-illini-storm-dark mb-6 uppercase tracking-widest text-sm border-b border-slate-100 pb-4 relative z-10">Mission Status</h3>
              <div className="space-y-6 relative z-10">
                 <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                       <span className="text-illini-blue flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-illini-berry"></span>
                          Absorb Protocols
                       </span>
                       <span className={isScenarioComplete(['absorb_slides', 'absorb_video', 'absorb_scenarios']) ? "text-green-600" : "text-slate-400"}>
                          {isScenarioComplete(['absorb_slides', 'absorb_video', 'absorb_scenarios']) ? "COMPLETED" : "IN PROGRESS"}
                       </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-illini-berry" style={{ width: `${(gameState.completedActivities.filter(id => id.includes('absorb')).length / 3) * 100}%` }}></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                       <span className="text-illini-blue flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-illini-prairie"></span>
                          Do Simulations
                       </span>
                       <span className={isScenarioComplete(['do_flashcards', 'do_sim', 'do_sorting']) ? "text-green-600" : "text-slate-400"}>
                          {isScenarioComplete(['do_flashcards', 'do_sim', 'do_sorting']) ? "COMPLETED" : "IN PROGRESS"}
                       </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-illini-prairie" style={{ width: `${(gameState.completedActivities.filter(id => id.includes('do')).length / 3) * 100}%` }}></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                       <span className="text-illini-blue flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-illini-industrial"></span>
                          Connect Challenges
                       </span>
                       <span className={isScenarioComplete(['connect_phishing', 'connect_password', 'connect_device']) ? "text-green-600" : "text-slate-400"}>
                          {isScenarioComplete(['connect_phishing', 'connect_password', 'connect_device']) ? "COMPLETED" : "IN PROGRESS"}
                       </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-illini-industrial" style={{ width: `${(gameState.completedActivities.filter(id => id.includes('connect')).length / 3) * 100}%` }}></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-illini-orange rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-20 w-80 h-80 bg-illini-arches rounded-full opacity-10 blur-3xl"></div>
      </section>

      {/* Team Members */}
      <section>
        <h2 className="text-3xl font-bold text-illini-blue mb-8 font-montserrat border-b-2 border-slate-200 pb-4">Training Development Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamLinks.map((member) => (
            <Link key={member.id} to={`/team/${member.id}`} className="group block">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-6 hover:border-illini-orange hover:shadow-md transition-all h-full">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md ${member.bg} group-hover:scale-110 transition-transform`}>
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-illini-blue font-montserrat group-hover:text-illini-orange transition-colors">{member.name}</h3>
                  <p className="text-sm text-illini-storm uppercase tracking-wide font-bold mt-1">Instructional Designer</p>
                </div>
                <ArrowRight className="ml-auto text-slate-300 group-hover:text-illini-orange transition-colors opacity-0 group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Scenarios Grid */}
      <section>
        <h2 className="text-3xl font-bold text-illini-blue mb-8 font-montserrat border-b-2 border-slate-200 pb-4">Start Your Training Modules</h2>
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Scenario 1 */}
          <Link to="/scenario/1" className="group block h-full">
            <div className={`h-full rounded-3xl shadow-sm border overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col ${isScenarioComplete(['absorb_slides', 'absorb_video', 'absorb_scenarios']) ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
              <div className="bg-illini-berry p-8 text-white relative overflow-hidden">
                {isScenarioComplete(['absorb_slides', 'absorb_video', 'absorb_scenarios']) && (
                   <div className="absolute top-4 right-4 bg-white text-illini-berry p-2 rounded-full shadow-lg z-10">
                      <CheckCircle2 size={24} />
                   </div>
                )}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <BookOpen size={28} />
                  </div>
                  <span className="text-sm font-bold uppercase bg-white/20 px-3 py-1 rounded-full tracking-wide">Absorb</span>
                </div>
                <h3 className="text-2xl font-bold font-montserrat leading-tight">Eye-2-Eye with ITI</h3>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-illini-storm-dark text-lg mb-6 leading-relaxed flex-1">
                  Converting company regulations and policies into interactive e-learning environments.
                </p>
                <div className="flex flex-col gap-3 mt-auto">
                   <span className="text-illini-berry font-bold text-lg flex items-center gap-2 group-hover:gap-3 transition-all">
                    {isScenarioComplete(['absorb_slides', 'absorb_video', 'absorb_scenarios']) ? "Review Module" : "Start Module"} <ArrowRight size={20} />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Scenario 2 */}
          <Link to="/scenario/2" className="group block h-full">
             <div className={`h-full rounded-3xl shadow-sm border overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col ${isScenarioComplete(['do_flashcards', 'do_sim', 'do_sorting']) ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
              <div className="bg-illini-prairie p-8 text-white relative">
                 {isScenarioComplete(['do_flashcards', 'do_sim', 'do_sorting']) && (
                   <div className="absolute top-4 right-4 bg-white text-illini-prairie p-2 rounded-full shadow-lg z-10">
                      <CheckCircle2 size={24} />
                   </div>
                )}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Layers size={28} />
                  </div>
                  <span className="text-sm font-bold uppercase bg-white/20 px-3 py-1 rounded-full tracking-wide">Do</span>
                </div>
                <h3 className="text-2xl font-bold font-montserrat leading-tight">Spectrum of Inclusivity</h3>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-illini-storm-dark text-lg mb-6 leading-relaxed flex-1">
                  Practicing inclusive communication in the workplace through simulations.
                </p>
                <div className="flex flex-col gap-3 mt-auto">
                   <span className="text-illini-prairie font-bold text-lg flex items-center gap-2 group-hover:gap-3 transition-all">
                    {isScenarioComplete(['do_flashcards', 'do_sim', 'do_sorting']) ? "Review Module" : "Start Module"} <ArrowRight size={20} />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Scenario 3 */}
          <Link to="/scenario/3" className="group block h-full">
             <div className={`h-full rounded-3xl shadow-sm border overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col ${isScenarioComplete(['connect_phishing', 'connect_password', 'connect_device']) ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
              <div className="bg-illini-industrial p-8 text-white relative">
                 {isScenarioComplete(['connect_phishing', 'connect_password', 'connect_device']) && (
                   <div className="absolute top-4 right-4 bg-white text-illini-industrial p-2 rounded-full shadow-lg z-10">
                      <CheckCircle2 size={24} />
                   </div>
                )}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Zap size={28} />
                  </div>
                  <span className="text-sm font-bold uppercase bg-white/20 px-3 py-1 rounded-full tracking-wide">Connect</span>
                </div>
                <h3 className="text-2xl font-bold font-montserrat leading-tight">Digital Security Safety</h3>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-illini-storm-dark text-lg mb-6 leading-relaxed flex-1">
                  Bridging the gap between knowledge and application for digital safety.
                </p>
                <div className="flex flex-col gap-3 mt-auto">
                   <span className="text-illini-industrial font-bold text-lg flex items-center gap-2 group-hover:gap-3 transition-all">
                    {isScenarioComplete(['connect_phishing', 'connect_password', 'connect_device']) ? "Review Module" : "Start Module"} <ArrowRight size={20} />
                  </span>
                </div>
              </div>
            </div>
          </Link>

        </div>
      </section>
    </div>
  );
};

export default Home;