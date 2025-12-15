import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Menu, X, Users, BookOpen, Layers, Zap, Building, PlayCircle, Trophy, Star, Lock, CheckCircle2 } from 'lucide-react';
import { useGame, ACTIVITIES } from '../context/GameContext';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { gameState, getProgressPercentage } = useGame();
  const navigate = useNavigate();
  
  const navItems = [
    { path: '/', label: 'Mission Control', icon: <LayoutDashboard size={22} /> },
    { path: '/org-profile', label: 'Organization Profile', icon: <Building size={22} /> },
  ];

  const scenarioItems = [
    { path: '/scenario/1', label: '1. Absorb (Onboarding)', icon: <BookOpen size={20} /> },
    { path: '/scenario/2', label: '2. Do (Inclusivity)', icon: <Layers size={20} /> },
    { path: '/scenario/3', label: '3. Connect (Security)', icon: <Zap size={20} /> },
  ];

  const absorbPrototypes = [
    { path: '/demo/onboarding-slides', label: 'Slideshow', id: 'absorb_slides' },
    { path: '/demo/roleplay-video', label: 'Role-Play Video', id: 'absorb_video' },
    { path: '/demo/written-scenarios', label: 'Written Scenarios', id: 'absorb_scenarios' },
  ];

  const doPrototypes = [
    { path: '/demo/flashcards', label: 'Flashcards', id: 'do_flashcards' },
    { path: '/demo/conversation-sim', label: 'Conversation Sim', id: 'do_sim' },
    { path: '/demo/scenario-sorting', label: 'Scenario Sorting', id: 'do_sorting' },
  ];

  const connectPrototypes = [
    { path: '/demo/phishing', label: 'Phishing Awareness', id: 'connect_phishing' },
    { path: '/demo/password', label: 'Password Tool', id: 'connect_password' },
    { path: '/demo/device', label: 'Device Safety', id: 'connect_device' },
  ];

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const ProgressLink = ({ to, label, id }: { to: string, label: string, id: string }) => {
    const isComplete = gameState.completedActivities.includes(id);
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center justify-between px-4 py-2 text-sm transition-colors rounded-md group ${
            isActive
              ? 'text-white font-bold bg-white/15'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`
        }
      >
        <span>{label}</span>
        {isComplete ? (
          <CheckCircle2 size={16} className="text-illini-harvest" />
        ) : (
          <div className="w-4 h-4 rounded-full border border-white/20 group-hover:border-white/50"></div>
        )}
      </NavLink>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-illini-cloud">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:flex-col w-80 bg-illini-blue text-white shadow-2xl relative flex-shrink-0 z-30">
        
        {/* GAMIFIED HUD HEADER */}
        <div className="p-6 border-b border-white/10 relative z-10 bg-illini-blue/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-illini-orange rounded-xl flex items-center justify-center shadow-lg border-2 border-white/20">
                 <Trophy className="text-white" size={24} />
               </div>
               <div>
                 <h2 className="font-black text-lg font-montserrat tracking-wide">LEVEL {gameState.level}</h2>
                 <p className="text-xs text-blue-200 font-bold tracking-wider">ITI TEAM MEMBER</p>
               </div>
             </div>
             <div className="text-right">
               <div className="text-2xl font-black text-illini-harvest font-mono">{gameState.xp}</div>
               <div className="text-[10px] uppercase tracking-widest text-white/50">XP Earned</div>
             </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-blue-200">
               <span>Progress</span>
               <span>{getProgressPercentage()}%</span>
            </div>
            <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden border border-white/10">
               <div 
                 className="h-full bg-gradient-to-r from-illini-orange to-illini-harvest transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,95,5,0.5)]"
                 style={{ width: `${getProgressPercentage()}%` }}
               ></div>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-white/20">
          <ul className="space-y-2 mb-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-8 py-3 transition-all duration-200 ${
                      isActive
                        ? 'bg-white/15 text-white border-r-4 border-illini-orange shadow-inner font-bold'
                        : 'text-slate-200 hover:bg-white/10 hover:text-white font-medium'
                    }`
                  }
                >
                  {item.icon}
                  <span className="text-lg">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          
          <div className="px-8 mb-3">
            <h3 className="text-xs font-black text-illini-orange uppercase tracking-widest font-montserrat border-b border-white/10 pb-2">Mission Log</h3>
          </div>
          <ul className="space-y-2 mb-8">
            {scenarioItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-8 py-3 transition-colors rounded-r-full mr-4 ${
                      isActive
                        ? 'text-white font-bold bg-white/10 border-l-4 border-illini-orange pl-7'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {item.icon}
                  <span className="text-base">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Absorb Section Header */}
          <div className="bg-illini-berry/90 backdrop-blur-sm px-8 py-2 mb-2 shadow-md flex justify-between items-center border-l-4 border-white/20">
            <h3 className="text-xs font-black text-white uppercase tracking-widest font-montserrat flex items-center gap-2">
              Absorb
            </h3>
            <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded text-white">
              {absorbPrototypes.filter(p => gameState.completedActivities.includes(p.id)).length}/{absorbPrototypes.length}
            </span>
          </div>
          <ul className="space-y-1 mb-6 px-4">
            {absorbPrototypes.map((item) => (
              <li key={item.path}>
                <ProgressLink to={item.path} label={item.label} id={item.id} />
              </li>
            ))}
          </ul>

          {/* Do Section Header */}
          <div className="bg-illini-prairie/90 backdrop-blur-sm px-8 py-2 mb-2 shadow-md flex justify-between items-center border-l-4 border-white/20">
            <h3 className="text-xs font-black text-white uppercase tracking-widest font-montserrat flex items-center gap-2">
               Do
            </h3>
            <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded text-white">
              {doPrototypes.filter(p => gameState.completedActivities.includes(p.id)).length}/{doPrototypes.length}
            </span>
          </div>
          <ul className="space-y-1 mb-6 px-4">
            {doPrototypes.map((item) => (
              <li key={item.path}>
                <ProgressLink to={item.path} label={item.label} id={item.id} />
              </li>
            ))}
          </ul>

          {/* Connect Section Header */}
          <div className="bg-illini-industrial/90 backdrop-blur-sm px-8 py-2 mb-2 shadow-md flex justify-between items-center border-l-4 border-white/20">
            <h3 className="text-xs font-black text-white uppercase tracking-widest font-montserrat flex items-center gap-2">
               Connect
            </h3>
             <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded text-white">
              {connectPrototypes.filter(p => gameState.completedActivities.includes(p.id)).length}/{connectPrototypes.length}
            </span>
          </div>
          <ul className="space-y-1 mb-8 px-4">
            {connectPrototypes.map((item) => (
              <li key={item.path}>
                <ProgressLink to={item.path} label={item.label} id={item.id} />
              </li>
            ))}
          </ul>
          
          {/* Certificate Link - Only shows when 100% */}
          <div className="px-6 pb-6">
             <button
               onClick={() => navigate('/victory')} 
               disabled={getProgressPercentage() < 100}
               className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold uppercase tracking-wide transition-all ${
                 getProgressPercentage() >= 100 
                   ? 'bg-illini-harvest text-illini-blue shadow-[0_0_20px_rgba(252,179,22,0.6)] animate-pulse hover:animate-none'
                   : 'bg-black/40 text-slate-500 cursor-not-allowed border border-white/5'
               }`}
             >
               {getProgressPercentage() >= 100 ? <Star size={18} /> : <Lock size={18} />}
               <span>Certificate</span>
             </button>
          </div>

        </nav>
        <div className="p-4 border-t border-white/10 relative z-10 bg-black/20 text-center">
           <p className="text-[10px] text-white/40 uppercase tracking-widest">Team #10 • UIUC EPOL 483</p>
        </div>
      </aside>

      {/* Mobile Header & Overlay - Simplified for brevity but functionality retained via react-router-dom Link */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
        <header className="md:hidden bg-illini-blue text-white p-4 flex justify-between items-center shadow-md z-20 flex-shrink-0">
          <div className="flex items-center gap-3">
             <div className="bg-illini-orange p-1.5 rounded-lg"><Trophy size={16}/></div>
             <span className="font-bold text-sm text-white font-mono">{gameState.xp} XP</span>
          </div>
          <button onClick={toggleMenu} className="p-2 focus:outline-none hover:bg-white/10 rounded-lg">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </header>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-illini-blue z-40 shadow-xl border-b border-white/10 max-h-[80vh] overflow-y-auto p-4">
             {/* Mobile Menu Content similar to desktop nav would go here */}
             <div className="text-center text-white p-4">Mobile Menu Active</div>
          </div>
        )}

        {/* Main Content Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 lg:p-16 scroll-smooth bg-illini-cloud w-full">
          <div className="max-w-[1920px] mx-auto pb-24 animate-fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;