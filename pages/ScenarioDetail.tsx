import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { scenarios } from '../data/content';
import { Target, ShieldCheck, DollarSign, LayoutDashboard, ArrowRight, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const FormatObjective = ({ text }: { text: string }) => {
  const parts = text.split('***');
  return (
    <span>
      {parts.map((part, i) => 
        i % 2 === 1 ? (
          <em key={i} className="font-bold uppercase italic text-current not-italic">{part}</em>
        ) : (
          part
        )
      )}
    </span>
  );
};

const ScenarioDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'objectives' | 'activities' | 'logistics'>('overview');

  const scenario = scenarios[id || ''];

  if (!scenario) {
    return <Navigate to="/" replace />;
  }

  // Theme colors based on scenario type
  const themeColor = scenario.type === 'Absorb' ? 'bg-illini-berry' : scenario.type === 'Do' ? 'bg-illini-prairie' : 'bg-illini-industrial';
  const themeText = scenario.type === 'Absorb' ? 'text-illini-berry' : scenario.type === 'Do' ? 'text-illini-prairie' : 'text-illini-industrial';
  const themeBorder = scenario.type === 'Absorb' ? 'border-illini-berry' : scenario.type === 'Do' ? 'border-illini-prairie' : 'border-illini-industrial';

  // Define chart colors
  const CHART_COLORS = [
    '#13294B', // Illini Blue
    '#FF5F05', // Illini Orange
    '#1D58A7', // Illini Industrial
    '#009FD4', // Illini Arches
    '#007E8E', // Illini Patina
    '#5C0E41', // Illini Berry
    '#FCB316', // Illini Harvest
    '#006230', // Illini Prairie
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  const budgetChartData = scenario.budget.filter(b => !b.isTotal && (b.costForMonth || b.estimatedCost)).map(b => ({
      name: b.role,
      value: b.costForMonth || b.estimatedCost || 0
  }));

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className={`${themeColor} text-white p-10 md:p-16 rounded-3xl shadow-xl relative overflow-hidden`}>
        <div className="relative z-10">
          <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-lg text-sm font-bold uppercase tracking-widest mb-6 font-montserrat border border-white/30 shadow-sm">
            Scenario {scenario.number}: {scenario.type}-Type Activity
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-montserrat leading-tight">{scenario.title}</h1>
          
          {/* Internal Navigation Tabs */}
          <div className="flex flex-wrap gap-3 mt-10">
             <button 
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 rounded-xl text-base font-bold transition-all flex items-center gap-2 shadow-md ${activeTab === 'overview' ? 'bg-white text-slate-900 scale-105' : 'bg-black/20 text-white hover:bg-black/30'}`}
             >
                <LayoutDashboard size={20} /> Analysis
             </button>
             <button 
                onClick={() => setActiveTab('objectives')}
                className={`px-6 py-3 rounded-xl text-base font-bold transition-all flex items-center gap-2 shadow-md ${activeTab === 'objectives' ? 'bg-white text-slate-900 scale-105' : 'bg-black/20 text-white hover:bg-black/30'}`}
             >
                <Target size={20} /> Objectives
             </button>
             <button 
                onClick={() => setActiveTab('activities')}
                className={`px-6 py-3 rounded-xl text-base font-bold transition-all flex items-center gap-2 shadow-md ${activeTab === 'activities' ? 'bg-white text-slate-900 scale-105' : 'bg-black/20 text-white hover:bg-black/30'}`}
             >
                <ShieldCheck size={20} /> Activities
             </button>
             <button 
                onClick={() => setActiveTab('logistics')}
                className={`px-6 py-3 rounded-xl text-base font-bold transition-all flex items-center gap-2 shadow-md ${activeTab === 'logistics' ? 'bg-white text-slate-900 scale-105' : 'bg-black/20 text-white hover:bg-black/30'}`}
             >
                <DollarSign size={20} /> Budget
             </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in-up">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-10">
             <section className="bg-white p-10 rounded-3xl shadow-md border border-slate-200">
               <h2 className={`text-2xl font-bold mb-6 font-montserrat ${themeText}`}>Problem Statement</h2>
               <p className="text-xl text-illini-storm-dark leading-relaxed font-medium">{scenario.problemStatement}</p>
             </section>
             <section className="bg-white p-10 rounded-3xl shadow-md border border-slate-200">
               <h2 className={`text-2xl font-bold mb-6 font-montserrat ${themeText}`}>Target Audience</h2>
               <p className="text-xl text-illini-storm-dark leading-relaxed font-medium">{scenario.targetAudience}</p>
             </section>
          </div>
        )}

        {/* OBJECTIVES TAB */}
        {activeTab === 'objectives' && (
          <div className="space-y-10">
            {/* Terminal Objective - POP */}
            <section className="bg-white p-12 rounded-3xl shadow-xl border-t-8 border-illini-orange relative overflow-hidden group hover:shadow-2xl transition-shadow">
               <div className="absolute -top-10 -right-10 opacity-5 transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
                  <Target size={250} />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-illini-orange p-2 rounded-lg text-white">
                       <Target size={32} />
                    </div>
                    <h2 className="text-illini-orange font-black uppercase tracking-widest text-lg font-montserrat">Terminal Learning Objective</h2>
                  </div>
                  <p className="text-2xl md:text-3xl text-illini-blue font-medium leading-relaxed">
                    <FormatObjective text={scenario.terminalObjective} />
                  </p>
               </div>
            </section>
            
            <div className="grid md:grid-cols-3 gap-8">
              {scenario.objectives.map((obj) => (
                <div key={obj.id} className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 hover:border-illini-blue transition-colors group flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-white shadow-lg ${themeColor}`}>
                    {obj.icon && <obj.icon size={32} />}
                  </div>
                  <h3 className="font-bold text-2xl text-illini-blue mb-4 font-montserrat">{obj.title}</h3>
                  <p className="text-lg text-illini-storm-dark leading-relaxed">
                     <FormatObjective text={obj.description} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVITIES TAB */}
        {activeTab === 'activities' && (
          <div className="space-y-10">
             {scenario.prototypes && (
               <div className="bg-illini-cloud border-l-8 border-illini-orange p-8 rounded-r-2xl shadow-sm">
                 <h3 className="text-illini-orange font-bold font-montserrat mb-6 flex items-center gap-3 text-xl">
                   <Target size={28} /> Interactive Prototypes Available
                 </h3>
                 <div className="flex flex-wrap gap-6">
                   {scenario.prototypes.map((proto) => (
                     <Link key={proto.path} to={proto.path} className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-200 rounded-xl font-bold text-lg text-illini-blue hover:border-illini-orange hover:text-illini-orange transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                       <proto.icon size={24} /> {proto.label}
                     </Link>
                   ))}
                 </div>
               </div>
             )}

             {scenario.activities.map((act) => (
               <div key={act.id} className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
                  <div className={`p-8 text-white flex justify-between items-center ${themeColor}`}>
                     <div className="flex items-center gap-6">
                        <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                          {act.icon && <act.icon size={32} />}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold font-montserrat">{act.title}</h3>
                          <span className="text-sm bg-black/20 px-3 py-1 rounded-full font-bold uppercase tracking-wide mt-2 inline-block">{act.duration}</span>
                        </div>
                     </div>
                     <span className="text-6xl font-black opacity-20 hidden md:block">0{act.id}</span>
                  </div>
                  <div className="p-10 grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div>
                        <h4 className={`text-lg font-black uppercase tracking-wide mb-2 font-montserrat ${themeText}`}>Context</h4>
                        <p className="text-lg text-illini-storm-dark leading-relaxed font-medium">{act.context}</p>
                      </div>
                      <div>
                        <h4 className={`text-lg font-black uppercase tracking-wide mb-2 font-montserrat ${themeText}`}>Format</h4>
                        <div className="bg-illini-cloud px-4 py-2 rounded-lg text-base font-bold text-illini-blue inline-block border border-slate-200">
                          {act.deliveryFormat}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className={`text-lg font-black uppercase tracking-wide mb-4 font-montserrat ${themeText}`}>What Learners Do</h4>
                      <ul className="space-y-4">
                        {act.learnerActions.map((action, i) => (
                          <li key={i} className="text-lg text-illini-storm-dark flex gap-3 items-start">
                             <CheckCircle size={24} className={`${themeText} flex-shrink-0 mt-0.5`} />
                             <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* LOGISTICS TAB */}
        {activeTab === 'logistics' && (
           <div className="space-y-10">
             <section className="bg-white p-10 rounded-3xl shadow-md border border-slate-200">
               <h2 className={`text-2xl font-bold mb-6 font-montserrat ${themeText}`}>Resource Implications</h2>
               <ul className="grid md:grid-cols-2 gap-6">
                 {scenario.resourceImplications.map((imp, i) => (
                   <li key={i} className="flex gap-4 text-xl text-illini-storm-dark items-start">
                      <div className={`w-3 h-3 rounded-full mt-2.5 flex-shrink-0 ${themeColor}`}></div>
                      {imp}
                   </li>
                 ))}
               </ul>
             </section>

             <div className="grid lg:grid-cols-3 gap-8">
                <section className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-md border border-slate-200">
                  <h2 className={`text-2xl font-bold mb-8 font-montserrat ${themeText}`}>Budget Breakdown</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-base text-left text-illini-storm-dark">
                      <thead className={`text-sm text-white uppercase ${themeColor}`}>
                        <tr>
                          <th className="px-6 py-4 rounded-tl-xl">Item / Role</th>
                          <th className="px-6 py-4 text-right">Est. Cost</th>
                          <th className="px-6 py-4 rounded-tr-xl">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scenario.budget.map((item, index) => {
                          const rowColor = !item.isTotal ? CHART_COLORS[index % CHART_COLORS.length] : 'transparent';
                          return (
                            <tr key={index} className={`border-b border-slate-100 ${item.isTotal ? 'bg-illini-cloud font-bold text-illini-blue text-lg' : 'hover:bg-slate-50'}`}>
                              <td className="px-6 py-5 font-medium flex items-center gap-3">
                                {!item.isTotal && (
                                  <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: rowColor}}></div>
                                )}
                                {item.role}
                              </td>
                              <td className="px-6 py-5 text-right font-mono">
                                {item.costForMonth ? formatCurrency(item.costForMonth) : item.estimatedCost ? formatCurrency(item.estimatedCost) : '-'}
                              </td>
                              <td className="px-6 py-5 text-sm text-slate-500">
                                {item.description || (item.percentTime ? `${item.percentTime}% of Monthly FTE` : '')}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {scenario.budgetNote && (
                    <p className="mt-6 text-sm font-medium italic text-illini-storm text-center bg-slate-50 p-4 rounded-lg">{scenario.budgetNote}</p>
                  )}
                </section>

                <section className="bg-white p-6 rounded-3xl shadow-md border border-slate-200 flex flex-col">
                  <h3 className={`font-bold font-montserrat mb-4 text-center ${themeText}`}>Cost Distribution</h3>
                  <div className="flex-1 w-full min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={budgetChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                          nameKey="name"
                        >
                          {budgetChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </section>
             </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default ScenarioDetail;