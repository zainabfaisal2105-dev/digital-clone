import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  GraduationCap,
  Briefcase,
  MapPin,
  Clock,
  BookOpen,
  Search,
  Cpu,
  ShieldCheck,
  BrainCircuit,
  KeyRound,
} from 'lucide-react';
import { ZAINAB_PROFILE } from '../data/personaData';
import zainabPortrait from '../assets/images/zainab_study_portrait_1790568278004.jpg';

interface ZainabHeaderProps {
  activeTab: 'chat' | 'research' | 'memory';
  setActiveTab: (tab: 'chat' | 'research' | 'memory') => void;
}

export const ZainabHeader: React.FC<ZainabHeaderProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [lahoreTime, setLahoreTime] = useState('');

  // Update live Lahore (UTC+5) clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setLahoreTime(formatter.format(now));
      } catch (e) {
        setLahoreTime('UTC+5');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-slate-800/80 bg-[#0d121c]/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Persona ID & Status */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="relative shrink-0">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl p-0.5 bg-gradient-to-tr from-indigo-600 via-indigo-400 to-purple-400 shadow-lg shadow-indigo-500/20">
                <img
                  src={zainabPortrait}
                  alt="Zainab"
                  className="w-full h-full object-cover object-top rounded-[14px]"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('zainab_study_portrait')) {
                      target.src = '/zainab_study_portrait_1790568278004.jpg';
                    }
                  }}
                />
              </div>
              <div 
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0d121c]" 
                title="Online & Ready to Study / Research"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span className="bg-gradient-to-r from-slate-100 via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                    Zainab Faisal
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono font-medium">
                    Identic AI
                  </span>
                </h1>
                
                {/* Live Lahore Time badge */}
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700/50">
                  <Clock className="w-3 h-3 text-indigo-400" />
                  <span>Lahore PKT: {lahoreTime || 'UTC+5'}</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 italic font-serif mt-0.5 text-indigo-200/90">
                &ldquo;{ZAINAB_PROFILE.tagline}&rdquo;
              </p>

              {/* Status and Identity Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1 text-slate-300">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                  <span>BSCS @ UMT (6th Sem)</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="inline-flex items-center gap-1 text-slate-300">
                  <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                  <span>SQA @ Grayphite</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="inline-flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Lahore, PK</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="inline-flex items-center gap-1 text-indigo-300 font-mono font-medium">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  <span>AI • ML • Systems</span>
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <div className="flex items-center bg-[#151c28]/90 p-1 rounded-xl border border-slate-700/60 self-start md:self-center">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Dialogue & Viva</span>
            </button>

            <button
              onClick={() => setActiveTab('research')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'research'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Research & Citations</span>
            </button>

            <button
              onClick={() => setActiveTab('memory')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'memory'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <span>Memory Update</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
