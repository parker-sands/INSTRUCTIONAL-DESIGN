import React, { useState, useEffect } from 'react';
import { Lock, RefreshCw, Check, X, Shield, Trophy } from 'lucide-react';
import { useGame, ACTIVITIES } from '../context/GameContext';

const words = [
  "ocean", "lantern", "cactus", "bicycle", "comet", 
  "harbor", "forest", "galaxy", "notebook", "signal", 
  "marble", "rocket", "puzzle", "sunrise", "river", 
  "orbit", "pepper", "anchor", "asteroid", "canvas", 
  "library", "ember", "mirror", "bridge", "compass", 
  "peppermint", "shadow", "orchard", "foggy", "neon"
];

const symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "?"];
const suffixes = ["Tree", "Sky", "Moon", "Run", "Walk", "Jump", "Code", "Safe"];

const ActivityPassword: React.FC = () => {
  const [baseWord, setBaseWord] = useState<string>("ocean");
  const [password, setPassword] = useState<string>("");
  const [strength, setStrength] = useState<number>(0);
  const [examplePassword, setExamplePassword] = useState<string>("");
  const [completed, setCompleted] = useState(false);

  const { completeActivity, isActivityCompleted } = useGame();
  const activityId = 'connect_password';
  const isPreviouslyCompleted = isActivityCompleted(activityId);
  
  const [checks, setChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    symbol: false,
    noPatterns: true
  });

  const generateWord = () => {
    const random = words[Math.floor(Math.random() * words.length)];
    setBaseWord(random);
    setPassword("");
  };

  // Generate a random example password whenever baseWord changes
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 99) + 10;
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    // Capialize first letter of baseWord
    const capBase = baseWord.charAt(0).toUpperCase() + baseWord.slice(1);
    
    setExamplePassword(`${capBase}${randomSymbol}${randomSuffix}${randomNum}`);
  }, [baseWord]);

  useEffect(() => {
    // 1. Minimum length: 16 characters
    const hasLength = password.length >= 16;
    
    // 2. Character mix
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // 3. No banned patterns
    const lowerPw = password.toLowerCase();
    const banned = ["password", "1234", "abcd", "qwerty", "iti"];
    const hasBannedPattern = banned.some(pattern => lowerPw.includes(pattern));
    const isClean = !hasBannedPattern;

    setChecks({
      length: hasLength,
      uppercase: hasUppercase,
      lowercase: hasLowercase,
      digit: hasDigit,
      symbol: hasSymbol,
      noPatterns: isClean
    });

    // Calculate strength score
    let s = 0;
    if (hasLength) s += 40;
    if (hasUppercase) s += 10;
    if (hasLowercase) s += 10;
    if (hasDigit) s += 10;
    if (hasSymbol) s += 10;
    if (isClean && password.length > 0) s += 20;
    
    // Cap at 100
    if (s > 100) s = 100;
    
    // If it fails a critical check (like banned pattern), reduce score significantly
    if (!isClean) s = Math.min(s, 20);

    setStrength(s);

    if (s === 100 && !completed && !isPreviouslyCompleted) {
       // Auto complete after 1.5s delay of hitting 100%
       const timer = setTimeout(() => {
         setCompleted(true);
         completeActivity(activityId, 100, ACTIVITIES[activityId as keyof typeof ACTIVITIES].maxXp);
       }, 1500);
       return () => clearTimeout(timer);
    }

  }, [password, completed, isPreviouslyCompleted, completeActivity, activityId]);

  if (completed || isPreviouslyCompleted) {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up py-12">
        <div className="bg-white p-16 rounded-3xl shadow-lg border-t-8 border-illini-industrial">
           <Trophy className="w-24 h-24 text-illini-harvest mx-auto mb-8" />
           <h2 className="text-4xl font-bold text-illini-blue mb-6 font-montserrat">Module Complete!</h2>
           <p className="text-xl text-illini-storm-dark mb-10">
             You successfully created a high-strength password.
           </p>
           <div className="inline-block bg-illini-cloud px-8 py-4 rounded-xl text-2xl font-bold text-illini-industrial mb-10 border border-slate-200">
             XP Earned: +{ACTIVITIES.connect_password.maxXp}
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
    <div className="space-y-8 max-w-7xl mx-auto text-lg">
      <div className="border-b border-illini-storm-light pb-4">
        <h1 className="text-4xl font-bold text-illini-blue font-montserrat">Activity 2: Password Transformation</h1>
        <p className="text-xl text-illini-storm">Adapt a random base word into a secure passphrase that meets ITI standards.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative">
            <div className="absolute -left-3 -top-3 w-10 h-10 bg-illini-orange text-white rounded-full flex items-center justify-center font-bold text-xl shadow-sm">1</div>
            <h3 className="text-2xl font-bold text-illini-blue mb-6 font-montserrat">Get Your Base Word</h3>
            <div className="flex items-center gap-6">
              <div className="bg-slate-100 px-8 py-4 rounded-xl text-3xl font-mono font-bold text-slate-800 border border-slate-300">
                {baseWord}
              </div>
              <button 
                onClick={generateWord}
                className="p-4 text-illini-industrial hover:bg-blue-50 rounded-full transition-colors"
                title="Generate new word"
              >
                <RefreshCw size={28} />
              </button>
            </div>
            <p className="text-base text-illini-storm mt-6">
              Use this word as the core of your passphrase. Combine it with other words, numbers, and symbols.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative">
            <div className="absolute -left-3 -top-3 w-10 h-10 bg-illini-blue text-white rounded-full flex items-center justify-center font-bold text-xl shadow-sm">2</div>
            <h3 className="text-2xl font-bold text-illini-blue mb-6 font-montserrat">Transform It</h3>
            
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type your transformed password..."
                  className="w-full p-6 pl-14 rounded-xl border border-slate-300 focus:border-illini-orange focus:ring-4 focus:ring-orange-100 outline-none transition-all font-mono text-xl"
                />
                <Lock className="absolute left-5 top-7 text-slate-400" size={24} />
              </div>

              {/* Strength Meter */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold uppercase tracking-wider text-slate-500">
                  <span>Strength</span>
                  <span>{strength}%</span>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ease-out ${
                      strength < 50 ? 'bg-illini-altgeld' : strength < 100 ? 'bg-illini-harvest' : 'bg-illini-prairie'
                    }`}
                    style={{ width: `${strength}%` }}
                  ></div>
                </div>
                {strength === 100 && (
                   <div className="text-center text-lg font-bold text-illini-prairie animate-pulse mt-4">
                     Excellent! Secure Password Created.
                   </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Requirements Checklist */}
        <div className="bg-illini-blue text-white p-10 rounded-3xl shadow-lg">
          <div className="flex items-center gap-4 mb-8 border-b border-white/20 pb-6">
            <Shield size={32} className="text-illini-orange" />
            <h3 className="text-2xl font-bold font-montserrat">ITI Password Standards</h3>
          </div>

          <ul className="space-y-5 text-lg">
            <li className={`flex items-center gap-4 transition-colors ${checks.length ? 'text-green-300' : 'text-slate-300'}`}>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${checks.length ? 'bg-green-500/20 border-green-500' : 'border-slate-500'}`}>
                {checks.length && <Check size={14} />}
              </div>
              <span>At least 16 characters long</span>
            </li>
             <li className={`flex items-center gap-4 transition-colors ${checks.uppercase && checks.lowercase ? 'text-green-300' : 'text-slate-300'}`}>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${checks.uppercase && checks.lowercase ? 'bg-green-500/20 border-green-500' : 'border-slate-500'}`}>
                {(checks.uppercase && checks.lowercase) && <Check size={14} />}
              </div>
              <span>Uppercase & Lowercase letters</span>
            </li>
            <li className={`flex items-center gap-4 transition-colors ${checks.digit ? 'text-green-300' : 'text-slate-300'}`}>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${checks.digit ? 'bg-green-500/20 border-green-500' : 'border-slate-500'}`}>
                {checks.digit && <Check size={14} />}
              </div>
              <span>Includes at least 1 number</span>
            </li>
            <li className={`flex items-center gap-4 transition-colors ${checks.symbol ? 'text-green-300' : 'text-slate-300'}`}>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${checks.symbol ? 'bg-green-500/20 border-green-500' : 'border-slate-500'}`}>
                {checks.symbol && <Check size={14} />}
              </div>
              <span>Includes at least 1 symbol</span>
            </li>
             <li className={`flex items-center gap-4 transition-colors ${checks.noPatterns ? 'text-green-300' : 'text-illini-orange'}`}>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${checks.noPatterns ? 'bg-green-500/20 border-green-500' : 'bg-illini-orange border-illini-orange'}`}>
                {checks.noPatterns ? <Check size={14} /> : <X size={14} className="text-white" />}
              </div>
              <span>No patterns ("password", "1234", "iti")</span>
            </li>
          </ul>

          <div className="mt-10 bg-white/10 p-6 rounded-xl text-base text-blue-100 italic border border-white/20">
            Example: <strong>{baseWord}</strong> could become <strong className="text-white font-mono bg-black/20 px-2 py-1 rounded ml-1">{examplePassword}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPassword;