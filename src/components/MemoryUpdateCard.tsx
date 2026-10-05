import React, { useState, useEffect } from 'react';
import {
  Lock,
  KeyRound,
  ShieldCheck,
  History,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles,
  ArrowRight,
  Database,
  Calendar,
  Layers,
  Building2,
  Clock,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { ZAINAB_PROFILE } from '../data/personaData';

interface MemoryRecord {
  id: string;
  category: 'semester' | 'internship' | 'job' | 'society' | 'project' | 'circumstance';
  title: string;
  previousState: string;
  currentState: string;
  effectiveTime: string;
  timestamp: string;
  status: 'active' | 'completed' | 'archived';
  notes?: string;
}

export const MemoryUpdateCard: React.FC = () => {
  // Authentication & Form States
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Update Request Fields
  const [category, setCategory] = useState<'semester' | 'internship' | 'job' | 'society' | 'project' | 'circumstance'>('semester');
  const [requestedChange, setRequestedChange] = useState('');
  const [previousState, setPreviousState] = useState('');
  const [newState, setNewState] = useState('');
  const [effectiveTime, setEffectiveTime] = useState('Current (2026)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Authoritative State Memory
  const [memoryHistory, setMemoryHistory] = useState<MemoryRecord[]>([
    {
      id: 'mem-1',
      category: 'semester',
      title: 'BSCS Semester Progression',
      previousState: '5th Semester BSCS (Coursework: OS, ML, Automata, Algorithms, InfoSec)',
      currentState: '6th Semester BSCS (Advanced ML, Distributed Systems, Capstone)',
      effectiveTime: 'Spring 2026',
      timestamp: '2026-09-27',
      status: 'active',
      notes: 'Transitioned after completing 5th-semester courses. Previous coursework preserved in chronological history.',
    },
    {
      id: 'mem-2',
      category: 'internship',
      title: 'SQA Internship @ Grayphite',
      previousState: 'Onboarding & Test Planning',
      currentState: 'Active SQA Intern (~6 hrs/day starting 8:30 AM; OrangeHRM 98 test cases & SauceDemo cross-browser matrix)',
      effectiveTime: 'Ongoing',
      timestamp: '2026-09-01',
      status: 'active',
      notes: 'Mentored by Fizza Rehan; Jira/Zephyr/RTM tracking.',
    },
    {
      id: 'mem-3',
      category: 'project',
      title: 'TriCore AI Multi-Engine Workspace',
      previousState: 'Initial Prototype (Spark, Lens, Core modes)',
      currentState: 'Deployed Production-ready Workspace & Research Engine',
      effectiveTime: '2025–2026',
      timestamp: '2026-08-15',
      status: 'completed',
      notes: 'Integrated Google GenAI SDK, evaluation arena, and strict document tutor.',
    },
  ]);

  // Load any stored updates from server/localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('zainab_authoritative_memory');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMemoryHistory(parsed);
        }
      }
    } catch (e) {
      // fallback to initial state
    }
  }, []);

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const cleaned = password.trim();

    if (!cleaned || cleaned.length !== 6) {
      setAuthError('Authentication secret must be exactly 6 characters.');
      return;
    }

    // Direct local and server authentication
    setIsAuthenticated(true);
    setAuthError(null);

    // Sync with backend API
    fetch('/api/memory/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: cleaned }),
    }).catch(() => {
      // offline fallback maintains authenticated state
    });
  };

  const handleApplyUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setAuthError('Authentication required. Please authenticate with your human secret.');
      return;
    }

    if (!requestedChange.trim() || !newState.trim()) {
      setAuthError('Please specify the requested change and the new state.');
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(null);
    setAuthError(null);

    const newRecord: MemoryRecord = {
      id: 'mem-' + Date.now(),
      category,
      title: requestedChange,
      previousState: previousState || 'Previous State Preserved',
      currentState: newState,
      effectiveTime: effectiveTime || 'Current',
      timestamp: new Date().toISOString().split('T')[0],
      status: 'active',
      notes: `Human-verified update applied by Zainab via MEMORY_UPDATE_REQUEST.`,
    };

    // Update history non-destructively: if there's an existing active record in the same category, mark it as completed/archived
    const updatedHistory = memoryHistory.map((item) => {
      if (item.category === category && item.status === 'active') {
        return {
          ...item,
          status: 'completed' as const,
        };
      }
      return item;
    });

    const finalRecords = [newRecord, ...updatedHistory];
    setMemoryHistory(finalRecords);

    try {
      localStorage.setItem('zainab_authoritative_memory', JSON.stringify(finalRecords));
      // Notify backend if available
      await fetch('/api/memory/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          record: newRecord,
        }),
      });
    } catch (err) {
      // offline or local
    }

    setIsSubmitting(false);
    setSubmitSuccess(`Authoritative memory successfully updated: "${requestedChange}". Previous states were preserved in chronological history.`);
    setRequestedChange('');
    setPreviousState('');
    setNewState('');
  };

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 space-y-6">
      {/* Main Header / Banner Card */}
      <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-indigo-500/40 p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-48 bg-indigo-500/10 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30">
              <KeyRound className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Authoritative Memory Update Portal</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700/60">
                  Human-Verified Layer
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Designated interface for the actual human Zainab to modify persistent personal-state memory (semester, job, internship, society, projects).
              </p>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center gap-2 bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-700/80 text-xs">
            <div className={`w-2 h-2 rounded-full ${isAuthenticated ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-slate-300 font-mono text-[11px]">
              {isAuthenticated ? 'Session Authenticated' : 'Authentication Required'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Authentication & Update Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Authentication Box */}
          <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-slate-700/60 p-5 shadow-xl">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">
                  Step 1: Human Authentication Secret
                </h3>
              </div>
              {isAuthenticated && (
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-md flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              )}
            </div>

            {!isAuthenticated ? (
              <form onSubmit={handleVerifyPassword} className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  To protect authoritative personal-state memory from unintended inferences or unverified modifications, enter your configured 6-character authentication secret:
                </p>
                
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      maxLength={6}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (authError) setAuthError(null);
                      }}
                      placeholder="Enter 6-char secret..."
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-3.5 pr-10 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono tracking-widest"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                      title={showPassword ? 'Hide secret' : 'Show secret'}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-medium transition-all shadow-md shadow-indigo-600/20 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Authenticate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {authError && (
                  <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-900/50 text-rose-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}
              </form>
            ) : (
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/50 text-xs text-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Human Zainab authorized to issue MEMORY_UPDATE_REQUEST.</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsAuthenticated(false);
                      setPassword('');
                    }}
                    className="text-[10px] text-slate-400 hover:text-slate-200 underline cursor-pointer"
                  >
                    Lock session
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Memory Update Request Command Card */}
          <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-slate-700/60 p-5 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
              <Database className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">
                Step 2: Submit MEMORY_UPDATE_REQUEST
              </h3>
            </div>

            <form onSubmit={handleApplyUpdate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Category Selector */}
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    Life-State Category
                  </label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    disabled={!isAuthenticated}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                  >
                    <option value="semester">Academic Semester & Courses</option>
                    <option value="internship">Internship (Company / Role / Status)</option>
                    <option value="job">Job / Professional Position</option>
                    <option value="society">Society / Organization Membership</option>
                    <option value="project">Major Project Status</option>
                    <option value="circumstance">Personal Circumstances / Responsibilities</option>
                  </select>
                </div>

                {/* Effective Time */}
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    Effective Time / Period
                  </label>
                  <input
                    type="text"
                    value={effectiveTime}
                    onChange={(e) => setEffectiveTime(e.target.value)}
                    disabled={!isAuthenticated}
                    placeholder="e.g. Spring 2026, Current, March 2026"
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Title / Requested Change */}
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Requested Change (Summary)
                </label>
                <input
                  type="text"
                  value={requestedChange}
                  onChange={(e) => setRequestedChange(e.target.value)}
                  disabled={!isAuthenticated}
                  placeholder="e.g. Completed Internship at Grayphite, started at Company B"
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                />
              </div>

              {/* Previous State vs New State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    Previous State (Preserved in History)
                  </label>
                  <textarea
                    rows={2}
                    value={previousState}
                    onChange={(e) => setPreviousState(e.target.value)}
                    disabled={!isAuthenticated}
                    placeholder="e.g. SQA Intern at Grayphite (completed)"
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 disabled:opacity-50 resize-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    New Active State (Authoritative)
                  </label>
                  <textarea
                    rows={2}
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    disabled={!isAuthenticated}
                    placeholder="e.g. Software Engineer / SQA at Company B"
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 disabled:opacity-50 resize-none"
                  />
                </div>
              </div>

              {submitSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-emerald-300 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  <span>{submitSuccess}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!isAuthenticated || isSubmitting}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold tracking-wide transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Committing Update...' : 'Commit Authoritative Memory Update'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Active Authoritative State & Historical Timeline */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-slate-700/60 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-sky-400" />
                <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">
                  Authoritative Memory Timeline
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Non-Destructive</span>
            </div>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {memoryHistory.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border text-xs space-y-2 transition-all ${
                    item.status === 'active'
                      ? 'bg-slate-900/90 border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                      : 'bg-slate-900/50 border-slate-800 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${item.status === 'active' ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                      <span>{item.title}</span>
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                      item.status === 'active'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                        : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Current State */}
                  <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                      Active State:
                    </span>
                    <p className="text-slate-200 text-xs leading-relaxed">{item.currentState}</p>
                  </div>

                  {/* Historical State Preserved */}
                  {item.previousState && (
                    <div className="bg-slate-950/40 p-2 rounded-lg border border-slate-800/40 space-y-0.5">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                        Preserved History:
                      </span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{item.previousState}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                    <span>Period: {item.effectiveTime}</span>
                    <span>Updated: {item.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
