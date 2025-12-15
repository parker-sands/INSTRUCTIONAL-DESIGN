import React from 'react';
import { Flag, CheckCircle, Smartphone, Lock, Mail } from 'lucide-react';

const Objectives: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-illini-blue mb-4 font-montserrat">Learning Objectives</h1>
        <p className="text-illini-storm-dark">
          Outlining the specific outcomes for the annual digital security refresher training.
        </p>
      </div>

      {/* Terminal Objective */}
      <section className="bg-illini-blue text-white p-10 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
             <Flag className="text-illini-orange" />
             <h2 className="text-illini-orange font-bold tracking-wider uppercase text-sm font-montserrat">Terminal Learning Objective</h2>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed font-light">
            After completing this module, all ITI employees will be able to <strong className="text-white font-semibold border-b-2 border-illini-orange">apply ITI’s digital security standards and procedures</strong> when presented with realistic workplace scenarios by demonstrating correct responses and earning a minimum score of 90% across all scenario-based activities.
          </p>
        </div>
      </section>

      {/* Specific Objectives */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:border-illini-industrial transition-all group hover:-translate-y-1">
          <div className="w-14 h-14 bg-illini-industrial text-white rounded-lg flex items-center justify-center mb-6 shadow-md">
            <Mail size={24} />
          </div>
          <h3 className="font-bold text-illini-blue mb-3 font-montserrat text-lg">Objective 1: Phishing</h3>
          <p className="text-illini-storm-dark text-sm leading-relaxed">
            By the end of this training, ITI employees will be able to recognize and evaluate elements of workplace communications that indicate potential phishing attempts across multiple digital platforms.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:border-illini-orange transition-all group hover:-translate-y-1">
          <div className="w-14 h-14 bg-illini-orange text-white rounded-lg flex items-center justify-center mb-6 shadow-md">
            <Lock size={24} />
          </div>
          <h3 className="font-bold text-illini-blue mb-3 font-montserrat text-lg">Objective 2: Passwords</h3>
          <p className="text-illini-storm-dark text-sm leading-relaxed">
            By the end of this training, ITI employees will be able to analyze sample passwords and adapt them to meet ITI’s digital security requirements in a variety of contexts.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:border-illini-patina transition-all group hover:-translate-y-1">
          <div className="w-14 h-14 bg-illini-patina text-white rounded-lg flex items-center justify-center mb-6 shadow-md">
            <Smartphone size={24} />
          </div>
          <h3 className="font-bold text-illini-blue mb-3 font-montserrat text-lg">Objective 3: Devices</h3>
          <p className="text-illini-storm-dark text-sm leading-relaxed">
            By the end of this training, ITI employees will be able to distinguish between secure and insecure device-handling behaviors and apply ITI’s best practices across different public or shared work environments.
          </p>
        </div>
      </div>

      <div className="bg-white border-l-8 border-illini-blue rounded-r-lg p-8 shadow-sm">
        <div className="flex gap-4">
            <CheckCircle className="text-illini-blue mt-1 flex-shrink-0" size={28} />
            <div>
            <h4 className="font-bold text-xl text-illini-blue font-montserrat">Why Connect-Type Activities?</h4>
            <p className="text-illini-storm-dark mt-2 leading-relaxed">
                Connect-type activities allow employees to quickly bridge the gap between what they know and how to apply it. In this ever-advancing age of AI infiltration, ITI needs to be on the edge of digital security.
            </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Objectives;