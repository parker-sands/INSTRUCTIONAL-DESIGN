import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Layout, 
  Target, 
  BookOpen, 
  LineChart, 
  Github, 
  Linkedin, 
  FileText,
  ChevronDown,
  Layers
} from 'lucide-react';
import { MODULES, LEARNER_ANALYSIS, TEAM_MEMBERS } from './constants';
import { ModuleCard } from './components/ModuleCard';
import { AdherenceChart, EisenhowerMatrix, CyoaPreview } from './components/InteractiveTools';
import { DesignJourney } from './components/DesignJourney';
import { AddieFlowChart } from './components/AddieFlowChart';

function App() {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const activeModule = MODULES.find(m => m.id === activeModuleId) || MODULES[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = ['overview', 'modules', 'process', 'evaluation'].map(id => document.getElementById(id));
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const getNavClass = (sectionId: string) => {
    const base = "text-sm font-medium transition-colors px-3 py-1 rounded-full";
    if (activeSection === sectionId) {
      return `${base} text-brand-600 font-bold bg-brand-50 border border-brand-100`;
    }
    return `${base} text-slate-600 hover:text-brand-600 border border-transparent`;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold font-heading">
                F
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight font-heading">FOCUS <span className="text-slate-400 font-light font-sans">TRAINING</span></span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => scrollToSection('overview')} className={getNavClass('overview')}>Learner Analysis</button>
              <button onClick={() => scrollToSection('modules')} className={getNavClass('modules')}>Modules</button>
              <button onClick={() => scrollToSection('process')} className={getNavClass('process')}>ADDIE Process</button>
              <button onClick={() => scrollToSection('evaluation')} className={getNavClass('evaluation')}>Assessment</button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-600">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4 shadow-lg rounded-b-xl">
             <button onClick={() => scrollToSection('overview')} className="block w-full text-left text-slate-600 font-medium py-2">Learner Analysis</button>
              <button onClick={() => scrollToSection('modules')} className="block w-full text-left text-slate-600 font-medium py-2">Modules</button>
              <button onClick={() => scrollToSection('process')} className="block w-full text-left text-slate-600 font-medium py-2">ADDIE Process</button>
              <button onClick={() => scrollToSection('evaluation')} className="block w-full text-left text-slate-600 font-medium py-2">Assessment</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wide mb-6">
            Instructional Design Portfolio • Group 8
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight font-heading">
            <span className="text-brand-600">“FOCUS TRAINING”</span><br/> 
            <span className="block mt-2 sm:mt-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">For Adult Professionals Working From Home.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            A comprehensive instructional design project addressing the challenges of remote work: distractions, irregular routines, and blurred boundaries.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
             {TEAM_MEMBERS.map((member, i) => (
               <span key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${member.color} bg-opacity-50 border-opacity-50`}>
                 <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                 {member.name}
               </span>
             ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-4xl font-bold text-slate-900 mb-2 font-heading">42%</h3>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Time Spent Multitasking</p>
            <p className="text-sm text-slate-600 mt-2">During virtual meetings, significantly reducing retention and engagement (Microsoft Work Trend Index, 2023).</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-4xl font-bold text-slate-900 mb-2 font-heading">50%</h3>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Struggle With Focus</p>
            <p className="text-sm text-slate-600 mt-2">Remote professionals report difficulty maintaining sustained attention without structured interventions.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-4xl font-bold text-slate-900 mb-2 font-heading">ADDIE</h3>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Methodology Used</p>
            <p className="text-sm text-slate-600 mt-2">Full lifecycle design: Analysis, Design, Development, Implementation, and Evaluation plans included.</p>
          </div>
        </div>
      </section>

      {/* Analysis Section */}
      <section id="overview" className="bg-white py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Changed to lg:flex-row to allow stacking on tablet portrait */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/3 w-full">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 font-heading">Learner Analysis</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Our target audience consists of self-disciplined professionals transitioning to or struggling with remote work. They are technologically literate but lack structured habits for the home environment.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2 font-heading">The Instructional Gap</h4>
                <p className="text-sm text-slate-600">
                  Current state: Fragmented routines, high stress, digital overload.
                  <br/><br/>
                  Desired state: Learners use skills appropriately in 80% of situations to manage sleep, time, distractions, and sociability.
                </p>
              </div>
            </div>
            
            <div className="lg:w-2/3 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LEARNER_ANALYSIS.map((trait, i) => {
                const Icon = trait.icon;
                return (
                  <div key={i} className="flex gap-4 p-5 rounded-xl border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all bg-slate-50/50">
                    <div className="shrink-0 text-brand-600 mt-1">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1 font-heading">{trait.category}</h3>
                      <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                        {trait.description.map((point, idx) => (
                          <li key={idx} className="leading-snug">{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 font-heading">Modules</h2>
            <p className="text-slate-600">
              Four specialized modules designed to address specific barriers to productivity.<br/>
              Click a module to explore its instructional strategy.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              {MODULES.map((module) => (
                <ModuleCard 
                  key={module.id} 
                  module={module} 
                  isActive={activeModuleId === module.id}
                  onClick={() => setActiveModuleId(module.id)}
                />
              ))}
            </div>

            {/* Interactive Preview Panel - Sticky */}
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Layout size={20} className="text-brand-400" />
                  <h3 className="font-semibold font-heading">Interactive Component Preview</h3>
                </div>
                <p className="text-slate-300 text-sm mb-0">
                  Each module features interactive tools to move learners from "Declarative Knowledge" to "Application". Here is the key tool for <span className="text-white font-bold">{activeModule.title}</span>.
                </p>
              </div>

              {/* Dynamic Component Rendering based on Active Module */}
              <div className="transition-all duration-500">
                {activeModuleId === 1 && <CyoaPreview />}
                {activeModuleId === 2 && <EisenhowerMatrix />}
                {activeModuleId === 2 && <div className="mt-6"><AdherenceChart /></div>}
                {activeModuleId === 3 && (
                   <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                      <h3 className="text-lg font-semibold mb-4 text-slate-800 font-heading">Tool: Distraction Mapping</h3>
                      <div className="bg-amber-50 p-4 rounded border border-amber-100 mb-4 text-sm text-amber-800">
                        <strong>Scenario:</strong> You are working, but the laundry machine buzzes (Environmental) and your phone pings (Digital).
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-100">
                          <span className="text-sm font-medium font-heading">Digital Distractions</span>
                          <span className="text-xs bg-slate-200 px-2 py-1 rounded">Notifications, Email</span>
                        </div>
                         <div className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-100">
                          <span className="text-sm font-medium font-heading">Environmental Distractions</span>
                          <span className="text-xs bg-slate-200 px-2 py-1 rounded">Noise, Clutter</span>
                        </div>
                      </div>
                   </div>
                )}
                {activeModuleId === 4 && (
                   <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold mb-4 text-slate-800 font-heading">Tool: Communication Action Plan</h3>
                     <table className="w-full text-sm text-left">
                       <thead>
                         <tr className="border-b border-slate-200">
                           <th className="py-2 text-slate-500 font-normal">Communication Gap</th>
                           <th className="py-2 text-slate-500 font-normal">Strategy</th>
                           <th className="py-2 text-slate-500 font-normal">Status</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                         <tr>
                           <td className="py-3">Lack of non-verbal cues</td>
                           <td className="py-3">Use video for complex topics</td>
                           <td className="py-3"><span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span></td>
                         </tr>
                          <tr>
                           <td className="py-3">Working in silos</td>
                           <td className="py-3">Scheduled "open door" hours</td>
                           <td className="py-3"><span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">Planned</span></td>
                         </tr>
                       </tbody>
                     </table>
                   </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process Section - Updated Layout */}
      <section id="process" className="py-20 bg-brand-50 border-y border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Changed to lg:grid-cols-2 to allow stacking on tablet portrait */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column: Text */}
            <div className="text-left">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wide mb-4">
                Behind the Scenes
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-heading leading-tight">ADDIE PROCESS</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Instructional design is iterative. We followed the ADDIE model to ensure a systematic approach to the "Focus Training" curriculum.
              </p>
              <p className="text-slate-600 leading-relaxed">
                 Use the interactive tool below to explore our process from initial brainstorming and rejected ideas to the final polished deliverables.
              </p>
            </div>

            {/* Right Column: Flow Chart */}
            <div className="flex justify-center lg:justify-end w-full">
              <AddieFlowChart />
            </div>
          </div>

          <DesignJourney />
        </div>
      </section>

      {/* Evaluation Section */}
      <section id="evaluation" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           {/* Changed to lg:flex-row to allow stacking on tablet portrait */}
           <div className="flex flex-col lg:flex-row gap-12">
             <div className="lg:w-1/2 w-full">
               <h2 className="text-3xl font-bold text-slate-900 mb-6 font-heading">ASSESSMENT</h2>
               <div className="space-y-6">
                 <div className="flex gap-4">
                   <div className="mt-1 bg-brand-100 p-2 rounded-lg text-brand-600 h-fit shrink-0">
                     <Target size={20} />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-900 font-heading">Formative Assessment</h4>
                     <p className="text-sm text-slate-600 mt-1">
                       Occurs throughout modules via scenarios (Sammy's CYOA), self-checks, and mapping activities. 
                       Emphasis on self-awareness over rote recall.
                     </p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="mt-1 bg-brand-100 p-2 rounded-lg text-brand-600 h-fit shrink-0">
                     <FileText size={20} />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-900 font-heading">Performance Rubrics</h4>
                     <p className="text-sm text-slate-600 mt-1">
                       Learners calculate adherence rates (Goal: &gt;80%). 
                       Example: (Completed Tasks + Breaks) / Total Opportunities.
                     </p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="mt-1 bg-brand-100 p-2 rounded-lg text-brand-600 h-fit shrink-0">
                     <LineChart size={20} />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-900 font-heading">Program Evaluation</h4>
                     <p className="text-sm text-slate-600 mt-1">
                       Small group evaluation (8-12 participants) focusing on Clarity, Relevance, Engagement, and Usability.
                     </p>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="lg:w-1/2 w-full bg-slate-50 p-4 sm:p-8 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 font-heading">Sample Rubric: Time Management Trial</h3>
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-sm min-w-[300px]">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-3 text-left font-heading">Criteria</th>
                        <th className="p-3 text-center font-heading">Pts</th>
                        <th className="p-3 text-left font-heading">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      <tr>
                        <td className="p-3 font-medium text-slate-900">Completed All Tasks</td>
                        <td className="p-3 text-center text-brand-600 font-bold">5</td>
                        <td className="p-3 text-slate-600">Followed schedule exactly as planned.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-slate-900">Most Tasks</td>
                        <td className="p-3 text-center font-bold">3</td>
                        <td className="p-3 text-slate-600">Minor deviations but general adherence.</td>
                      </tr>
                       <tr>
                        <td className="p-3 font-medium text-slate-900">Compliance With Breaks</td>
                        <td className="p-3 text-center font-bold">3</td>
                        <td className="p-3 text-slate-600">Took intended Pomodoro/Movement breaks.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 text-xs rounded border border-yellow-100">
                  <strong>Calculation:</strong> (Daily Score / 9) * 100. Must exceed 80% to validate the routine.
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-2">
               <span className="font-bold text-2xl text-white tracking-tight font-heading block">FOCUS TRAINING</span>
               <p className="text-base text-slate-300 font-medium">For Adult Professionals Working From Home.</p>
            </div>
            
            <div className="text-left md:text-right space-y-1">
              <p className="text-sm font-semibold text-slate-200">EPOL 472, Instructional and Training System Design</p>
              <p className="text-sm text-slate-400">University of Illinois at Urbana-Champaign</p>
              <p className="text-sm text-slate-500">Fall 2025</p>
            </div>
          </div>
          
          <div className="mt-12 border-t border-slate-800 pt-8 text-center text-xs text-slate-600">
            &copy; 2025 Parker Sands LLC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;