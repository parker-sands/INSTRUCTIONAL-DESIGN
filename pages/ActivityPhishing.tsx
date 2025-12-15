import React, { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle, XCircle, Info, MessageSquare, Smartphone, ArrowRight, RefreshCw, Trophy } from 'lucide-react';
import { useGame, ACTIVITIES } from '../context/GameContext';

interface PhishingSample {
  id: number;
  channel: 'Email' | 'SMS' | 'Slack';
  sender: string;
  subject?: string; // Only for Email
  body: string;
  isPhishing: boolean;
  clues: string[];
}

const samples: PhishingSample[] = [
  {
    id: 1,
    channel: 'Email',
    sender: 'IT Support <itsupport@iti-secure.com>',
    subject: 'Your Password Expires in 2 Hours – ACTION REQUIRED',
    body: 'Hello,\n\nOur records indicate your ITI network password is expiring in the next 2 hours.\n\nTo avoid losing access to your email and critical systems, please click the link below and log in using your current credentials:\n\nhttp://itipassword-reset.com\n\nThank you,\nITI IT Support Team',
    isPhishing: true,
    clues: [
      'Domain is itipassword-reset.com instead of official ITI domain',
      'Sense of extreme urgency ("2 hours")',
      'Generic greeting ("Hello," no name)',
      'HTTP link, not HTTPS'
    ]
  },
  {
    id: 2,
    channel: 'Email',
    sender: '“CEO - Michael Tan” <michael.tan.ceo@outlook.com>',
    subject: 'Need a quick favor',
    body: 'Hi,\n\nI’m stepping into a client meeting and need you to pick up 10 Apple gift cards for employee rewards.\n\nCan you buy them now and send me the codes in the next 30 minutes? I’ll get you reimbursed right away.\n\nPlease reply ONLY to this email.\n\n– Michael',
    isPhishing: true,
    clues: [
      'External personal email (@outlook.com) rather than corporate',
      'Unusual request involving gift cards',
      'Strong urgency and pressure',
      'Asking to reply only to that email'
    ]
  },
  {
    id: 3,
    channel: 'SMS',
    sender: 'ITI Security',
    body: 'ITI: Your verification code is 483921. Do not share this code with anyone.',
    isPhishing: false,
    clues: [
      'Short, expected format of MFA code',
      'No links to click',
      'Explicitly says not to share the code'
    ]
  },
  {
    id: 4,
    channel: 'SMS',
    sender: 'Pkg Notice',
    body: 'Your ITI parcel is waiting for delivery confirmation. Confirm address now: http://itidelivery-update.info',
    isPhishing: true,
    clues: [
      'Vague "ITI parcel" with no details',
      'Suspicious URL with odd domain (delivery-update.info)',
      'Unexpected request to click a link'
    ]
  },
  {
    id: 5,
    channel: 'Email',
    sender: 'Human Resources <benefits@iti.com>',
    subject: 'Reminder: Benefits Open Enrollment Closes Friday',
    body: 'Hi Parker,\n\nThis is a reminder that ITI’s annual benefits open enrollment period will close on Friday, April 18.\n\nYou can review and update your benefits by logging into the HR portal from the company intranet. Do not share your login information with anyone.\n\nIf you have any questions, please contact HR directly.\n\nBest,\nITI HR Team',
    isPhishing: false,
    clues: [
      'Personalized greeting ("Hi Parker")',
      'Uses existing HR portal via intranet (no strange external link)',
      'No request for credentials or personal data by email'
    ]
  },
  {
    id: 6,
    channel: 'Email',
    sender: '“Microsoft Account Team” <security@m1crosoft.com>',
    subject: 'Unusual sign-in activity detected on your Microsoft account',
    body: 'Dear User,\n\nWe detected an unusual sign-in attempt from an unrecognized device. Your Microsoft account will be locked unless you verify your information.\n\nVerify your account now: https://m1crosoft-security.com/login\n\nThank you,\nMicrosoft Account Security',
    isPhishing: true,
    clues: [
      'Misspelled domain (m1crosoft with number 1)',
      'Generic greeting ("Dear User")',
      'Threat of lockout to push urgency',
      'Link goes to non-Microsoft domain'
    ]
  },
  {
    id: 7,
    channel: 'Slack',
    sender: 'alex.chan (External)',
    body: 'Hey, here’s the updated financial forecast. Please download and review before today’s call:\n\n[Download_Forecast_Q4.zip]',
    isPhishing: true,
    clues: [
      'External user in Slack',
      'Unexpected ZIP file',
      'No context or prior conversation'
    ]
  },
  {
    id: 8,
    channel: 'Slack',
    sender: 'Priya Patel',
    body: '@Parker Here’s the updated project tracker you asked for. It’s in our usual shared drive folder.\n\n[Open Project Tracker]',
    isPhishing: false,
    clues: [
      'Known coworker',
      'Refers to prior request',
      'Document stored in usual shared folder'
    ]
  },
  {
    id: 9,
    channel: 'Email',
    sender: '“Carlos Ramirez - DataSync” <c.ramirez@datasync.com>',
    subject: 'Agenda for Friday’s integration meeting',
    body: 'Hi Parker,\n\nAttached is the draft agenda for Friday’s integration meeting with ITI.\n\nPlease let me know if there’s anything you’d like to add.\n\nBest,\nCarlos',
    isPhishing: false,
    clues: [
      'Expected communication from known vendor',
      'No credential requests or weird links',
      'Clear business context'
    ]
  },
  {
    id: 10,
    channel: 'Email',
    sender: 'ITI Security <security@iti-secure-alert.com>',
    subject: 'New Mandatory VPN Client – Install Today',
    body: 'Dear ITI Employee,\n\nWe have deployed a new mandatory VPN client. To remain compliant, all employees must install the new software today.\n\nDownload here: https://iti-secure-alert.com/vpnsetup.exe\n\nFailure to install may result in restricted access.\n\nITI Security Team',
    isPhishing: true,
    clues: [
      'Fake-looking domain (iti-secure-alert.com)',
      'EXE download from non-official site',
      'Threat of consequences to create pressure',
      'Generic "Dear ITI Employee" greeting'
    ]
  }
];

const ActivityPhishing: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  const { completeActivity, isActivityCompleted } = useGame();
  const activityId = 'connect_phishing';
  const isPreviouslyCompleted = isActivityCompleted(activityId);

  const currentSample = samples[currentIndex];

  const handleChoice = (choiceIsPhishing: boolean) => {
    setAnswered(true);
    const correct = choiceIsPhishing === currentSample.isPhishing;
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
    }
  };

  const nextSample = () => {
    if (currentIndex < samples.length - 1) {
      setAnswered(false);
      setIsCorrect(false);
      setCurrentIndex((prev) => (prev + 1));
    } else {
      setCompleted(true);
      // Final Score Calculation
      // If previously completed, we don't re-award XP, but the context handles that check.
      const finalScorePct = Math.round(((score + (isCorrect ? 1 : 0)) / samples.length) * 100);
      completeActivity(activityId, finalScorePct, ACTIVITIES[activityId as keyof typeof ACTIVITIES].maxXp);
    }
  };

  const renderContent = () => {
    if (currentSample.channel === 'Email') {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-300 overflow-hidden min-h-[500px]">
          <div className="bg-slate-100 p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <span className="text-sm text-slate-500 font-medium flex items-center gap-2">
              <Mail size={16} /> ITI Mail - Inbox
            </span>
          </div>
          <div className="p-8">
            <div className="border-b border-slate-100 pb-6 mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-2 font-montserrat">{currentSample.subject}</h2>
              <div className="flex items-center gap-2 text-base text-slate-500 mb-1">
                <span className="font-semibold text-slate-700">From:</span> {currentSample.sender}
              </div>
              <div className="flex items-center gap-2 text-base text-slate-500">
                <span className="font-semibold text-slate-700">To:</span> me@iti.com
              </div>
            </div>
            <div className="prose prose-lg text-slate-700 whitespace-pre-wrap font-sans">
              {currentSample.body}
            </div>
          </div>
        </div>
      );
    }

    if (currentSample.channel === 'SMS') {
      return (
        <div className="bg-slate-100 rounded-[3rem] shadow-xl border-8 border-slate-800 overflow-hidden w-full max-w-sm mx-auto min-h-[600px] relative">
          <div className="bg-slate-800 text-white p-6 pt-10 text-center text-lg font-medium">
            Messages
          </div>
          <div className="p-6 flex flex-col gap-6 bg-white h-full">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-3">
                <Smartphone size={32} className="text-slate-500" />
              </div>
              <span className="text-sm text-slate-500 font-bold">{currentSample.sender}</span>
            </div>
            <div className="bg-slate-100 p-6 rounded-3xl rounded-tl-none text-base text-slate-800 self-start max-w-[90%] shadow-sm">
              {currentSample.body}
            </div>
            <div className="text-xs text-slate-400 self-start pl-2">Today 9:41 AM</div>
          </div>
        </div>
      );
    }

    if (currentSample.channel === 'Slack') {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-300 overflow-hidden min-h-[500px]">
          <div className="bg-[#3F0E40] text-white p-4 flex items-center gap-3">
             <MessageSquare size={20} />
             <span className="font-bold text-base">ITI Workspace</span>
          </div>
          <div className="p-8 flex gap-6">
             <div className="w-12 h-12 rounded bg-illini-industrial text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
               {currentSample.sender.charAt(0).toUpperCase()}
             </div>
             <div>
               <div className="flex items-baseline gap-3 mb-2">
                 <span className="font-bold text-slate-900 text-lg">{currentSample.sender}</span>
                 <span className="text-sm text-slate-500">10:23 AM</span>
               </div>
               <div className="text-slate-800 whitespace-pre-wrap text-lg">
                 {currentSample.body}
               </div>
             </div>
          </div>
        </div>
      );
    }
  };

  if (completed || isPreviouslyCompleted) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center animate-fade-in-up">
        <div className="bg-white p-16 rounded-3xl shadow-xl border-t-8 border-illini-industrial">
           <Trophy className="w-24 h-24 text-illini-harvest mx-auto mb-6" />
           <h2 className="text-4xl font-bold text-illini-blue mb-4 font-montserrat">Module Complete!</h2>
           <p className="text-xl text-illini-storm-dark mb-8">
             You have analyzed all {samples.length} communication samples.
           </p>
           <div className="inline-block bg-illini-cloud px-8 py-4 rounded-xl text-2xl font-bold text-illini-industrial mb-10 border border-slate-200">
             XP Earned: +{ACTIVITIES.connect_phishing.maxXp}
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
      <div className="border-b border-illini-storm-light pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-illini-blue font-montserrat">Activity 1: Phishing Analysis</h1>
          <p className="text-xl text-illini-storm">Sample {currentIndex + 1} of {samples.length}</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-lg font-bold text-illini-blue">
             Score: {score}
           </div>
           <div className="text-base font-bold text-illini-industrial bg-blue-50 px-4 py-2 rounded-full">
             Format: {currentSample.channel}
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Message Interface */}
        <div className="lg:col-span-2 space-y-6">
          {renderContent()}

          {!answered && (
            <div className="flex gap-6 justify-center pt-4">
              <button 
                onClick={() => handleChoice(false)}
                className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-300 text-slate-700 font-bold text-lg rounded-xl hover:bg-slate-50 transition-colors shadow-sm hover:shadow-md"
              >
                <CheckCircle size={24} className="text-illini-prairie" />
                Mark as Genuine
              </button>
              <button 
                onClick={() => handleChoice(true)}
                className="flex items-center gap-3 px-8 py-4 bg-illini-orange text-white font-bold text-lg rounded-xl hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg"
              >
                <AlertTriangle size={24} />
                Report as Phishing
              </button>
            </div>
          )}
        </div>

        {/* Feedback Panel */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
            <h3 className="text-xl font-bold text-illini-blue mb-6 flex items-center gap-3 font-montserrat">
              <Info size={24} />
              Evaluation Status
            </h3>
            
            {!answered ? (
              <p className="text-lg text-illini-storm leading-relaxed">
                Please review the message carefully. Check the sender details, the tone of the message, and any links or attachments provided.
              </p>
            ) : (
              <div className={`space-y-6 animate-fade-in-up flex-1 flex flex-col`}>
                <div className={`p-6 rounded-xl border-2 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center gap-3 font-bold mb-2 text-xl">
                    {isCorrect ? <CheckCircle className="text-illini-prairie" size={28} /> : <XCircle className="text-illini-altgeld" size={28} />}
                    <span className={isCorrect ? 'text-illini-prairie' : 'text-illini-altgeld'}>
                      {isCorrect ? 'Correct Decision!' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-base text-slate-700 mt-2 font-medium">
                    {currentSample.isPhishing 
                      ? "This IS a phishing attempt." 
                      : "This is a GENUINE message."}
                  </p>
                </div>

                <div className="space-y-4 flex-1">
                  <h4 className="font-bold text-lg text-illini-blue uppercase tracking-wide font-montserrat">
                    {currentSample.isPhishing ? 'Red Flags:' : 'Safety Indicators:'}
                  </h4>
                  <ul className="space-y-3">
                    {currentSample.clues.map((clue, idx) => (
                      <li key={idx} className={`text-base p-3 rounded-lg border flex gap-3 items-start ${currentSample.isPhishing ? 'bg-orange-50 border-orange-100 text-slate-800' : 'bg-green-50 border-green-100 text-slate-800'}`}>
                        {currentSample.isPhishing ? (
                           <AlertTriangle size={18} className="text-illini-orange flex-shrink-0 mt-1" />
                        ) : (
                           <CheckCircle size={18} className="text-illini-prairie flex-shrink-0 mt-1" />
                        )}
                        {clue}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={nextSample}
                  className="w-full flex items-center justify-center gap-3 py-4 mt-6 bg-illini-blue text-white font-bold text-lg rounded-xl hover:bg-illini-industrial transition-colors shadow-md"
                >
                  {currentIndex < samples.length - 1 ? "Next Scenario" : "Finish & Collect XP"} <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPhishing;