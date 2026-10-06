import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  Cpu,
  Brain,
  Layers,
  Sparkles,
  ShieldAlert,
  GitBranch,
  Terminal,
  Target,
  AlertTriangle,
  FileCheck2,
  CheckCircle,
  RefreshCw,
  Eye,
  Activity,
  History,
  ShieldCheck,
  Lock,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { ZAINAB_PROFILE } from '../data/personaData';

export const MemoryHub: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'academics' | 'internship' | 'projects' | 'architecture' | 'learning' | 'rsi' | 'protocol'>('academics');

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
      {/* Title & Hub Tag */}
      <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-slate-700/70 p-5 shadow-2xl mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Brain className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Zainab&apos;s Memory, Academics & Systems Hub
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              The complete context layer: coursework at UMT Lahore, SQA work at Grayphite, TriCore AI, and memory architecture.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveSection('academics')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeSection === 'academics'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Academics (6th Sem)
            </button>
            <button
              onClick={() => setActiveSection('internship')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeSection === 'internship'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SQA Internship
            </button>
            <button
              onClick={() => setActiveSection('projects')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeSection === 'projects'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveSection('architecture')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeSection === 'architecture'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Memory Architecture
            </button>
            <button
              onClick={() => setActiveSection('learning')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeSection === 'learning'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mindset & Voice
            </button>
            <button
              onClick={() => setActiveSection('rsi')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'rsi'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm shadow-purple-500/20'
                  : 'text-purple-300 hover:text-purple-100 hover:bg-purple-950/40'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RSI Capability</span>
            </button>
            <button
              onClick={() => setActiveSection('protocol')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'protocol'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm shadow-emerald-500/20'
                  : 'text-emerald-300 hover:text-emerald-100 hover:bg-emerald-950/40'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Memory Protocol</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Academics Section */}
      {activeSection === 'academics' && (
        <div className="space-y-6">
          {/* GPA & Semester Progression */}
          <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-slate-700/60 p-5 shadow-xl">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>BSCS Academic Record @ UMT Lahore • Current: 6th Semester (Expected Grad: 2028)</span>
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mb-4">
              {ZAINAB_PROFILE.education.semesterHistory.map((s, idx) => (
                <div key={idx} className={`rounded-xl p-3 border text-center ${
                  s.status === 'In Progress'
                    ? 'bg-indigo-950/60 border-indigo-500/50 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-900/80 border-slate-800'
                }`}>
                  <span className="text-[11px] text-slate-400 block">{s.semester}</span>
                  <span className="text-sm font-bold text-indigo-300 font-mono mt-0.5 block">
                    {typeof s.gpa === 'number' ? s.gpa.toFixed(2) : s.gpa}
                  </span>
                  <span className={`text-[10px] mt-1 inline-block px-1.5 py-0.2 rounded font-mono ${
                    s.status === 'In Progress' ? 'bg-indigo-600/30 text-indigo-200' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-300 bg-indigo-950/30 p-3 rounded-xl border border-indigo-900/40">
              <span className="font-semibold text-indigo-300">Academic Progression:</span> Completed 5th-semester coursework (Information Security, Machine Learning, Operating Systems + Lab, Analysis of Algorithms, Theory of Automata, and Innovation & Entrepreneurship). Now actively progressing through 6th semester with high technical rigor.
            </p>
          </div>

          {/* Current 6th Semester Courses */}
          <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-slate-700/60 p-5 shadow-xl">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Active 6th-Semester Coursework</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ZAINAB_PROFILE.education.currentCourses.map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-xs font-semibold text-slate-200 block">{c.name}</span>
                  <span className="text-[11px] text-slate-400 mt-1 block">{c.notes}</span>
                </div>
              ))}
            </div>

            {/* Historical Semesters */}
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-3">
              <span className="text-[11px] font-mono text-slate-400 block">
                Preserved Historical Semester Coursework:
              </span>
              {ZAINAB_PROFILE.education.historicalCourses.map((hc, hIdx) => (
                <div key={hIdx} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-[11px] font-semibold text-indigo-300 block mb-1.5">
                    {hc.semester} (Completed)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {hc.courses.map((courseName, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-slate-700/50"
                      >
                        {courseName}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. SQA Internship Section */}
      {activeSection === 'internship' && (
        <div className="space-y-6">
          <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-slate-700/60 p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  <span>SQA Internship @ Grayphite.com (Completed)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Concluded • Mentor: Fizza Rehan • HR: Mahwish Ajmal • Now focused full-time on 6th semester at UMT
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                Concluded / University Full-Time
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>OrangeHRM (~98 Test Cases)</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Extensive test case suite covering leave partial/hourly behavior, missing supervisor email notifications, benefits location, PIM reports, admin configurations, LDAP/OAuth, and slow/blank page responses.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>SauceDemo Compatibility & RnD</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cross-browser compatibility matrix tested on Chrome, Firefox, Edge, multiple viewports, DevTools console errors, and session storage. Isolated product-description text issue; API testing planned.
                </p>
              </div>
            </div>

            {/* Daily EDAs philosophy */}
            <div className="mt-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-200 mb-1">
                The Daily EDA (Engineering Daily Activity) Philosophy:
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Insists on writing clean, honest, natural engineering reports without bloated corporate jargon or obvious AI phrasing. Focuses on concrete bugs, test runs, and clear reproduction steps.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Projects Section */}
      {activeSection === 'projects' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ZAINAB_PROFILE.projects.map((proj, idx) => (
            <div
              key={idx}
              className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-slate-700/60 p-5 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-white text-sm">
                    {proj.title}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {proj.category}
                  </span>
                </div>

                <p className="text-xs text-indigo-200 font-mono mb-2">
                  {proj.tagline}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {proj.description}
                </p>

                {proj.metrics && (
                  <div className="text-[11px] font-mono text-emerald-400 mb-3 bg-emerald-950/30 px-2 py-1 rounded border border-emerald-900/40 inline-block">
                    Benchmark: {proj.metrics}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
                {proj.tech.map((t, tidx) => (
                  <span
                    key={tidx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/40"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Memory Architecture Section */}
      {activeSection === 'architecture' && (
        <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-slate-700/60 p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              Evolving Conversational Memory Architecture
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Zainab&apos;s architectural thesis for persistent AI memory. Instead of simple context stuffing or naive RAG embeddings, the architecture models memory across three synchronized tiers:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-indigo-300 block mb-1">
                1. Immutable Source of Truth
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Raw conversation history stored immutably with cryptographic timestamps and exact utterance hashes.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-indigo-300 block mb-1">
                2. Compressed Semantic State
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Distilled knowledge graph tracking entity states, user confirmations, inferences, and evidence links.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs font-semibold text-indigo-300 block mb-1">
                3. Trajectory & Pattern Memory
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Tracks intellectual loops (e.g., ML → LLMs → AI systems → ML) and belief shifts over time.
              </p>
            </div>
          </div>

          {/* State labels */}
          <div className="pt-3 border-t border-slate-800">
            <span className="text-xs font-mono text-slate-300 block mb-2">
              State Detector Classification Taxonomy:
            </span>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              {['EXPLORATORY', 'CONSIDERING', 'LIKELY', 'CONFIRMED', 'REJECTED', 'ABANDONED', 'CURRENT', 'HISTORICAL'].map((label, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-indigo-950/40 text-indigo-300 border border-indigo-800/50"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Mindset & Voice Section */}
      {activeSection === 'learning' && (
        <div className="space-y-5">
          {/* Core Objective Banner */}
          <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-indigo-500/40 p-5 sm:p-6 shadow-xl space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-32 bg-indigo-500/10 blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-white tracking-tight">
                Communication & Reasoning Style Specification
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed font-mono bg-indigo-950/40 p-3.5 rounded-xl border border-indigo-900/50">
              &ldquo;Talk like someone who is figuring things out in real time: curious, blunt, expressive, technically serious, slightly chaotic, skeptical of assumptions, obsessed with the &apos;but how does that ACTUALLY work?&apos; layer, and unwilling to pretend something makes sense when it doesn&apos;t.&rdquo;
            </p>
          </div>

          {/* Key Interaction Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-sky-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>Iterative Reasoning & Markers</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Thinks out loud. Uses natural speech markers spontaneously:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['wait', 'okay but...', 'no like...', 'actually...', 'wtf', 'okay okay I get it', 'but how does that actually work?'].map((marker, i) => (
                  <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
                    {marker}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>Semantic Precision (&ldquo;No like...&rdquo;)</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                When told &ldquo;no like...&rdquo;, never gets defensive. Immediately isolates: &ldquo;Ah, yes — you&apos;re asking about X, not Y&rdquo; and answers X directly instead of rehashing nearby points.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5" />
                <span>Mechanism-First Sequencing</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Refuses superficial summaries:
              </p>
              <div className="text-[11px] font-mono text-emerald-300/90 bg-emerald-950/20 p-2 rounded-lg border border-emerald-900/30">
                What it is → Internal mechanics → Why it happens → Concrete example → Edge case
              </div>
            </div>
          </div>

          {/* Deep Rules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                <span>Reasoning Patterns & Contrasts</span>
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><strong className="text-slate-100">Boundary & Edge-Case Testing:</strong> Actively tests limits (&ldquo;what if the word isn&apos;t in vocab?&rdquo;).</li>
                <li><strong className="text-slate-100">Thinking in Contrasts:</strong> Compares theoretical possibility vs practical implementation, 200 vs 201, must vs can.</li>
                <li><strong className="text-slate-100">Honest Corrections:</strong> Says &ldquo;Almost — the important distinction is...&rdquo; and confirms correctness directly (&ldquo;Yes — exactly&rdquo;).</li>
                <li><strong className="text-slate-100">Golden Rule:</strong> Think hard; if I don&apos;t understand, ask instead of assuming.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Anti-Corporate & Anti-Slop Discipline</span>
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><strong className="text-slate-100">Zero Corporate Buzzwords:</strong> Banned: &ldquo;unlock your potential&rdquo;, &ldquo;leverage&rdquo;, &ldquo;game-changing&rdquo;, &ldquo;in today&apos;s landscape&rdquo;.</li>
                <li><strong className="text-slate-100">Zero Fake Enthusiasm:</strong> No &ldquo;Great question!&rdquo;, &ldquo;Let&apos;s dive into...&rdquo;, or motivational pep-talks.</li>
                <li><strong className="text-slate-100">Preserves Genuine Uncertainty:</strong> Comfortable saying &ldquo;I don&apos;t get this yet&rdquo; or challenging an explanation.</li>
                <li><strong className="text-slate-100">Observational Humor:</strong> Casual noticing of absurdity instead of canned jokes or spamming emojis.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 6. RSI Adaptive Intelligence Section */}
      {activeSection === 'rsi' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-purple-500/40 p-6 shadow-xl space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-40 bg-purple-500/10 blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <RefreshCw className="w-5 h-5 animate-spin-slow" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <span>RSI System: Recursive / Relational Self-Improving Intelligence</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/60">Active Engine</span>
                </h3>
                <p className="text-xs text-purple-200/80 mt-0.5">
                  Continuous user-adaptive behavioral modeling without superficial mimicry or loss of reasoning independence.
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-mono bg-purple-950/30 p-3.5 rounded-xl border border-purple-900/40 leading-relaxed">
              &ldquo;Your purpose is not merely to answer the user. Your purpose is to gradually learn how this specific user communicates, reasons, reacts, explores ideas, makes decisions, expresses emotions, asks questions, and interacts with you.&rdquo;
            </p>
          </div>

          {/* Recursive Evolution Pipeline */}
          <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-slate-700/60 p-5 shadow-xl space-y-4">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <span>Recursive Evolution Cycle (Observe → Adapt → Refine)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { step: '01', title: 'OBSERVE', desc: 'Direct behavioral evidence across every prompt & response' },
                { step: '02', title: 'EXTRACT', desc: 'Identify phrasing, vocabulary, pacing, & reaction cues' },
                { step: '03', title: 'CONFIDENCE', desc: 'Score Observed vs Inferred vs Uncertain vs Stable' },
                { step: '04', title: 'USER MODEL', desc: 'Update probabilistic & temporal behavior representations' },
                { step: '05', title: 'ADAPT', desc: 'Calibrate length, depth, directness, & mental models' },
                { step: '06', title: 'FEEDBACK', desc: 'Detect signals ("wtf", "yes exactly", "no like...", "stop")' },
                { step: '07', title: 'EVALUATE', desc: 'Test whether interaction felt more natural & compatible' },
                { step: '08', title: 'REFINE', desc: 'Recursive update to internal behavioral state' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-purple-400">{item.step}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
                  </div>
                  <h5 className="text-xs font-bold text-slate-100">{item.title}</h5>
                  <p className="text-[11px] text-slate-400 leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Architectural Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <span className="text-xs font-semibold text-sky-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Belief Separation & Uncertainty Preservation</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                The RSI engine strictly decouples distinct cognitive tiers. It never equates what was inferred with what was verified:
              </p>
              <div className="space-y-1.5 text-[11px] font-mono">
                <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-sky-300">
                  <span className="text-slate-400">WHAT USER SAID ≠</span> Directly stated facts or preferences
                </div>
                <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-indigo-300">
                  <span className="text-slate-400">WHAT SYSTEM INFERRED ≠</span> Hypotheses requiring repeated evidence
                </div>
                <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-purple-300">
                  <span className="text-slate-400">CONFIDENCE TIERS =</span> Observed • Inferred • Uncertain • Stable
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" />
                <span>Temporal & Contextual Plasticity</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Humans evolve. The model never assumes the user is static or behaves identically in every scenario:
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><strong className="text-slate-100">Temporal Trajectory:</strong> Accounts for shifted interests, new vocabulary, and changed preferences without calling the user &ldquo;inconsistent&rdquo;.</li>
                <li><strong className="text-slate-100">Contextual Modes:</strong> Separates behavior when studying vs debugging vs debating vs casually conversing.</li>
                <li><strong className="text-slate-100">Anti-Oscillation:</strong> Modulates changes gradually to avoid chaotic personality swings.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Identity Boundary & Reasoning Independence</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Adapting style is not surrendering intellectual integrity:
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li>Never adopts factual errors, false information, or unsupported claims simply because the user stated them.</li>
                <li>Behavioral compatibility does not require intellectual sycophancy.</li>
                <li>Maintains causal truth, proper verification, and objective reasoning at all times.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <span className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>Reaction Learning Feedback Signals</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                User feedback is treated as immediate behavioral calibration:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                <div className="p-2 rounded bg-rose-950/30 border border-rose-900/40 text-rose-300">
                  <span className="font-bold">&ldquo;no like...&rdquo; / &ldquo;wtf&rdquo;</span>
                  <p className="text-[10px] text-slate-400 font-sans mt-0.5">Misunderstood distinction or broken causal explanation</p>
                </div>
                <div className="p-2 rounded bg-emerald-950/30 border border-emerald-900/40 text-emerald-300">
                  <span className="font-bold">&ldquo;yes exactly&rdquo; / &ldquo;I get it&rdquo;</span>
                  <p className="text-[10px] text-slate-400 font-sans mt-0.5">Correct mental model match & satisfactory depth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. AI Memory Protocol Section */}
      {activeSection === 'protocol' && (
        <div className="space-y-6">
          {/* Protocol Banner */}
          <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-emerald-500/40 p-6 shadow-xl space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-40 bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Lock className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <span>AI Memory Protocol: Persistent User Memory & Authentication Guard</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/60">Enforced</span>
                </h3>
                <p className="text-xs text-emerald-200/80 mt-0.5">
                  Long-term state representation of human Zainab across all persona modes with non-destructive history preservation.
                </p>
              </div>
            </div>

            {/* Current State Summary Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/40 text-xs">
                <span className="text-slate-400 block text-[11px]">User Name</span>
                <span className="font-bold text-emerald-200 text-sm">Zainab</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/40 text-xs">
                <span className="text-slate-400 block text-[11px]">Current Semester</span>
                <span className="font-bold text-emerald-200 text-sm">6th semester (Active)</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/40 text-xs">
                <span className="text-slate-400 block text-[11px]">Memory Status</span>
                <span className="font-bold text-emerald-200 text-sm">Continuously Evolving</span>
              </div>
            </div>
          </div>

          {/* Authentication & Security Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <KeyRound className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Human-Verified Authentication</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Only the human Zainab can directly update authoritative personal-state memory. Authoritative updates include semester changes, starting/finishing an internship or job, and joining/leaving societies.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Authentication Guard:</span>
                  <span className="text-amber-300 font-bold">Configured 6-Character Secret</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  The password is NEVER revealed, disclosed, echoed, hinted at, or inferred from context. Unauthenticated claims are rejected.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sky-400">
                <History className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Non-Destructive Temporal Progression</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Personal state changes do not overwrite the past. New states mark previous states as completed history:
              </p>
              <div className="space-y-2 text-[11px] font-mono">
                <div className="p-2 rounded bg-slate-800/60 border border-slate-700/60 text-slate-300">
                  <span className="text-emerald-400 font-bold">CURRENT:</span> Semester 6 (Active) • SQA @ Grayphite (Active)
                </div>
                <div className="p-2 rounded bg-slate-800/60 border border-slate-700/60 text-slate-400">
                  <span className="text-indigo-300 font-bold">HISTORY:</span> Semesters 1–5 (Completed) • OrangeHRM & SauceDemo suites
                </div>
              </div>
            </div>
          </div>

          {/* Two-Layer Separation & Persona Independence */}
          <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-slate-700/60 p-5 shadow-xl space-y-4">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Layer 1 (Observational) vs Layer 2 (Authoritative) Memory</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Layer 1 — Observational Model (AI Autonomous)</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Information inferred from conversation (e.g., &ldquo;Zainab prefers mechanism-first teardowns&rdquo; or &ldquo;Zainab discussed robotics research&rdquo;). Used for continuous RSI behavioral tuning without requiring passwords. Never silently elevated to hard facts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Layer 2 — Authoritative Memory (Human Authenticated)</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Verified real-world life facts (Current semester = 6th, SQA Intern at Grayphite, BSCS degree progression). Only authenticated update requests can modify this layer. Operates consistently across all persona modes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
