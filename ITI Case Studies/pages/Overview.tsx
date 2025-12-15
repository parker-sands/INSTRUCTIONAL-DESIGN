import React from 'react';
import { AlertTriangle, Users, Globe } from 'lucide-react';

const Overview: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-illini-blue rounded-2xl shadow-lg p-8 md:p-12 relative overflow-hidden text-white border-b-4 border-illini-orange">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-block px-3 py-1 bg-white text-illini-blue rounded-full text-xs font-bold uppercase tracking-wide mb-4 font-montserrat shadow-sm">
            Scenario 3
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight font-montserrat">
            Digital Security Safety Situational Training at ITI
          </h1>
          <p className="text-xl text-blue-50 font-light border-l-4 border-illini-orange pl-4">
            A Connect-Type Activity Strategy
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-2xl font-bold text-illini-blue mb-6 flex items-center gap-2 font-montserrat">
          <Users className="text-illini-orange" /> Team Members
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Parker Sands', 'Charlie Stancik', 'Paige Miller'].map((member, index) => (
            <div key={member} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-all hover:border-illini-orange hover:-translate-y-1 group">
              <div className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg shadow-sm ${index === 1 ? 'bg-illini-arches' : index === 2 ? 'bg-illini-patina' : 'bg-illini-industrial'}`}>
                {member.charAt(0)}
              </div>
              <h3 className="font-bold text-lg text-illini-blue font-montserrat">{member}</h3>
              <p className="text-sm text-illini-storm">Instructional Design Team</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem & Audience Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-illini-altgeld">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-illini-altgeld/10 rounded-lg">
                <AlertTriangle className="text-illini-altgeld" size={24} />
              </div>
              <h2 className="text-xl font-bold text-illini-blue font-montserrat">Problem Statement</h2>
            </div>
            <div className="prose text-illini-storm-dark">
              <p className="mb-4">
                All ITI employees have already completed the company’s digital security compliance training during their initial onboarding, therefore they know the foundations of good digital security practices, but still struggle to apply that knowledge on the job.
              </p>
              <p>
                The gap does not stem from a lack of knowledge, it stems from an <strong className="text-illini-industrial bg-blue-50 px-1">inability to apply security principles in specific situations</strong>. Connect-type activities will allow employees to quickly bridge this gap.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-illini-industrial">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-illini-industrial/10 rounded-lg">
                <Globe className="text-illini-industrial" size={24} />
               </div>
              <h2 className="text-xl font-bold text-illini-blue font-montserrat">Target Audience</h2>
            </div>
            <div className="prose text-illini-storm-dark">
              <p className="mb-4 font-bold text-lg text-illini-blue font-montserrat border-b border-slate-200 pb-2">All ITI Employees</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-illini-orange">
                <li>Most hold bachelor’s or master’s degrees.</li>
                <li>Possess strong technical expertise.</li>
                <li>Operate within multicultural teams.</li>
                <li>Work in remote or hybrid environments.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Overview;