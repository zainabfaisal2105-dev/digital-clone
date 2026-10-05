import React, { useState } from 'react';
import {
  Search,
  ExternalLink,
  BookOpen,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  FileText,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Copy,
  Check,
} from 'lucide-react';

interface ResearchWorkspaceProps {
  onSendToChat: (prompt: string) => void;
}

export const ResearchWorkspace: React.FC<ResearchWorkspaceProps> = ({ onSendToChat }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [researchResult, setResearchResult] = useState<{
    text: string;
    citations: Array<{ title: string; uri: string }>;
    searchQueries: string[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const presets = [
    {
      title: "CAN Bus Sub-10ms Anomaly Detection",
      subtitle: "Rust, TensorRT, ROS2 & Autonomous Edge Security",
      query: "Investigate sub-10ms anomaly detection algorithms in autonomous vehicle CAN bus and ROS2 architectures using Rust and TensorRT. Provide verified citations, latency benchmarks, and architectural security standards.",
    },
    {
      title: "Neural Network Edge Quantization",
      subtitle: "PTQ vs QAT, INT8, FP8 & Hardware Acceleration",
      query: "Deep technical research on neural network quantization for Edge AI: Post-Training Quantization (PTQ) vs Quantization-Aware Training (QAT), INT8 matrix multiplication, calibration methods (KL divergence), and TensorRT deployment. Include exact citations.",
    },
    {
      title: "LLM Tokenization & Token IDs Mechanism",
      subtitle: "Byte-Pair Encoding, Vocab Lookup & Runtime Consistency",
      query: "Explain the exact causal mechanism of how LLM token IDs are generated: vocabulary pre-training vs runtime lookup, Byte-Pair Encoding (BPE), unknown byte fallback, and whether token IDs are immutable across conversations. Cite authoritative papers and specs.",
    },
    {
      title: "High-Frequency S-Parameters & RF Circuits",
      subtitle: "Scattering Matrix (S11, S21), Impedance & Wave Reflections",
      query: "Physical and mathematical breakdown of S-parameters in RF circuits: why voltage/current break down at high frequencies, what S11 (reflection) and S21 (transmission) physically measure, and Smith charts. Include citations.",
    },
  ];

  const handleResearch = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim() || isSearching) return;

    setIsSearching(true);
    setResearchResult(null);

    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete research.');
      }

      setResearchResult({
        text: data.text,
        citations: data.citations || [],
        searchQueries: data.searchQueries || [],
      });
    } catch (err: any) {
      console.error('Research error:', err);
      setResearchResult({
        text: `wait, research failed to complete: ${err.message}`,
        citations: [],
        searchQueries: [],
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleCopy = () => {
    if (!researchResult) return;
    navigator.clipboard.writeText(researchResult.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
      {/* Header Banner */}
      <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-slate-700/70 p-5 shadow-2xl mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Search className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Zainab&apos;s Technical Research Desk
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Gather deep, mechanism-first research with verified source citations, search grounding, and literature references.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-indigo-300 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Google Grounding Enabled</span>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleResearch()}
              placeholder="Enter a research topic, systems mechanism, or technical thesis..."
              className="w-full bg-[#0c101a] border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button
            onClick={() => handleResearch()}
            disabled={!query.trim() || isSearching}
            className={`px-5 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              query.trim() && !isSearching
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:brightness-110 shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isSearching ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Investigating...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Research & Cite</span>
              </>
            )}
          </button>
        </div>

        {/* Preset Cards */}
        <div className="mt-4">
          <p className="text-[11px] font-mono text-slate-400 mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Investigate Zainab&apos;s active research areas:</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(preset.query);
                  handleResearch(preset.query);
                }}
                className="text-left p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300">
                    {preset.title}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {preset.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="bg-[#101522]/90 rounded-2xl border border-slate-700/60 p-8 shadow-xl flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-3">
            <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin" />
          </div>
          <h3 className="text-base font-semibold text-white">
            Grounding Research & Verifying Citations
          </h3>
          <p className="text-xs text-slate-400 max-w-md mt-1">
            Zainab is querying verified technical documentation, IEEE/academic literature, and web standards...
          </p>
        </div>
      )}

      {/* Research Output Section */}
      {researchResult && !isSearching && (
        <div className="space-y-6">
          {/* Main Paper / Findings Card */}
          <div className="bg-[#101522]/95 backdrop-blur-md rounded-2xl border border-slate-700/70 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <h3 className="font-semibold text-slate-100 text-sm">
                  Research Dossier & Analysis
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Dossier</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    onSendToChat(
                      `Let's discuss this research finding:\n\n${researchResult.text.slice(0, 300)}...`
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-xs text-white transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Discuss in Chat</span>
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="text-sm leading-relaxed text-slate-200 whitespace-pre-wrap font-normal space-y-3">
              {researchResult.text}
            </div>

            {/* Verified Citations List */}
            {researchResult.citations.length > 0 && (
              <div className="mt-6 pt-5 border-t border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-300 font-mono flex items-center gap-1.5 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Research Citations ({researchResult.citations.length})</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {researchResult.citations.map((cite, i) => {
                    let domain = '';
                    try {
                      domain = new URL(cite.uri).hostname;
                    } catch (e) {
                      domain = 'Web Source';
                    }
                    return (
                      <a
                        key={i}
                        href={cite.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all flex items-start justify-between gap-2 group"
                      >
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-xs font-medium text-slate-200 group-hover:text-indigo-300 line-clamp-2">
                            {cite.title || cite.uri}
                          </span>
                          <span className="text-[10px] text-indigo-400 font-mono mt-1">
                            {domain}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 shrink-0 mt-0.5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Grounding Search Queries Trail */}
            {researchResult.searchQueries.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400">
                  Search Grounding Trail:
                </span>
                {researchResult.searchQueries.map((q, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono bg-slate-800/70 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50"
                  >
                    {q}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
