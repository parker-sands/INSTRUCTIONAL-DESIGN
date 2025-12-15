import React from 'react';
import { Mail, Lock, Coffee, ArrowRight } from 'lucide-react';

const Activities: React.FC = () => {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-illini-blue mb-2 font-montserrat">Connect-Type Activities</h1>
        <p className="text-illini-storm-dark">Three distinct modules designed to bridge the gap between knowledge and application.</p>
      </div>

      {/* Activity 1 - Industrial Blue */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow">
        <div className="bg-illini-industrial p-8 text-white flex items-center gap-6">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
            <Mail size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-montserrat">Activity 1: Email Phishing Awareness</h2>
            <p className="text-blue-100 font-medium mt-1">Review & Evaluation • 20-30 Minutes</p>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <h3 className="font-bold text-illini-blue mb-2 font-montserrat text-lg">The Context</h3>
            <p className="text-illini-storm-dark leading-relaxed">
              Cyber attackers are impersonating real people and internal patterns. Employees struggle to transfer onboarding knowledge to new formats (Slack, SMS).
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-illini-cloud p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-illini-blue mb-3 font-montserrat">What Learners Do</h4>
              <ul className="space-y-3 text-sm text-illini-storm-dark">
                <li className="flex gap-2"><ArrowRight size={16} className="text-illini-orange flex-shrink-0 mt-1" /> Review 10 digital communication samples (Email, SMS, Slack).</li>
                <li className="flex gap-2"><ArrowRight size={16} className="text-illini-orange flex-shrink-0 mt-1" /> Evaluate if genuine or phishing.</li>
                <li className="flex gap-2"><ArrowRight size={16} className="text-illini-orange flex-shrink-0 mt-1" /> Analyze indicators for suspicious messages.</li>
                <li className="flex gap-2"><ArrowRight size={16} className="text-illini-orange flex-shrink-0 mt-1" /> Select appropriate next action steps.</li>
              </ul>
            </div>
            <div className="bg-illini-cloud p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-illini-blue mb-3 font-montserrat">Delivery Format</h4>
              <p className="text-sm text-illini-storm-dark mb-3 leading-relaxed">
                Company LMS using interactive question formats with immediate feedback. Includes a brief reflection prompt at the end to reinforce the connection between prior awareness and evolving threats.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity 2 - Orange */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow">
        <div className="bg-illini-orange p-8 text-white flex items-center gap-6">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
            <Lock size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-montserrat">Activity 2: Creating/Transforming Secure Passwords</h2>
            <p className="text-orange-50 font-medium mt-1">Interactive Transformation • 10 Minutes</p>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <h3 className="font-bold text-illini-blue mb-2 font-montserrat text-lg">The Context</h3>
            <p className="text-illini-storm-dark leading-relaxed">
              Employees often rely on patterns or reuse passwords. This activity bridges the gap between knowing "strong password" theory and actually creating them.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-illini-cloud p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-illini-blue mb-3 font-montserrat">What Learners Do</h4>
              <ul className="space-y-3 text-sm text-illini-storm-dark">
                <li className="flex gap-2"><ArrowRight size={16} className="text-illini-altgeld flex-shrink-0 mt-1" /> Generate initial word using random-word tool.</li>
                <li className="flex gap-2"><ArrowRight size={16} className="text-illini-altgeld flex-shrink-0 mt-1" /> Combine with unrelated words to create 16+ character strings.</li>
                <li className="flex gap-2"><ArrowRight size={16} className="text-illini-altgeld flex-shrink-0 mt-1" /> Receive immediate strength feedback (Weak/Neutral/Strong).</li>
                <li className="flex gap-2"><ArrowRight size={16} className="text-illini-altgeld flex-shrink-0 mt-1" /> Adapt at least 5 unique passwords.</li>
              </ul>
            </div>
            <div className="bg-illini-cloud p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-illini-blue mb-3 font-montserrat">Delivery Format</h4>
              <p className="text-sm text-illini-storm-dark mb-3 leading-relaxed">
                Simple text-entry interface in LMS. Focuses on repetitive practice to internalize the creation principle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity 3 - Industrial */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow">
        <div className="bg-illini-industrial p-8 text-white flex items-center gap-6">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
            <Coffee size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-montserrat">Activity 3: Device Safety & Security</h2>
            <p className="text-blue-100 font-medium mt-1">Scenario Branching • 15 Minutes</p>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <h3 className="font-bold text-illini-blue mb-2 font-montserrat text-lg">The Context</h3>
            <p className="text-illini-storm-dark leading-relaxed">
              Small actions in public spaces create vulnerabilities. Learners must distinguish secure behaviors in real-world environments (e.g., coffee shops).
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-illini-cloud p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-illini-blue mb-3 font-montserrat">What Learners Do</h4>
              <ul className="space-y-3 text-sm text-illini-storm-dark">
                <li className="flex gap-2"><ArrowRight size={16} className="text-illini-patina flex-shrink-0 mt-1" /> Evaluate conversation-style advice from coworkers.</li>
                <li className="flex gap-2"><ArrowRight size={16} className="text-illini-patina flex-shrink-0 mt-1" /> Identify insights aligning with ITI policy.</li>
                <li className="flex gap-2"><ArrowRight size={16} className="text-illini-patina flex-shrink-0 mt-1" /> Exclude advice that introduces risk.</li>
                <li className="flex gap-2"><ArrowRight size={16} className="text-illini-patina flex-shrink-0 mt-1" /> Navigate text-based scenarios for different locations.</li>
              </ul>
            </div>
            <div className="bg-illini-cloud p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-illini-blue mb-3 font-montserrat">Delivery Format</h4>
              <p className="text-sm text-illini-storm-dark mb-3 leading-relaxed">
                Branching or multi-select response scenarios in LMS showing how best practices vary by environment.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Activities;