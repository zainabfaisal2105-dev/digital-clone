import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Cpu,
  RefreshCw,
  Search,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import { SAMPLE_QUERIES } from '../data/personaData';
import zainabPortrait from '../assets/images/zainab_study_portrait_1790568278004.jpg';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  citations?: Array<{ title: string; uri: string }>;
  searchQueries?: string[];
  mode?: 'casual' | 'research' | 'study' | 'mechanism' | 'rsi';
  timestamp: string;
}

interface ChatInterfaceProps {
  onStartResearchTopic?: (topic: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onStartResearchTopic }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'model',
      text: `heyy! what are you up to today lol, tell me what you're working on`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'casual' | 'research' | 'study' | 'mechanism' | 'rsi'>('casual');
  const [enableSearch, setEnableSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Adjust textarea height automatically
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend || isLoading) return;

    const userMsgId = 'usr-' + Date.now();
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    if (!customPrompt) setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setIsLoading(true);

    try {
      // Build conversation history for API
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          mode: mode,
          enableSearch: enableSearch || mode === 'research',
        }),
      });

      let data: any = {};
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        if (!response.ok) {
          throw new Error(text || `Server responded with status ${response.status}`);
        }
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(text || 'Received non-JSON response from server.');
        }
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to communicate with Zainab.');
      }

      const botMsgId = 'bot-' + Date.now();
      const newBotMsg: ChatMessage = {
        id: botMsgId,
        role: 'model',
        text: data.text,
        citations: data.citations || [],
        searchQueries: data.searchQueries || [],
        mode: mode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, newBotMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        role: 'model',
        text: `wait, something broke on the connection: ${err.message || 'Error reaching server.'}\n\nCheck if your GEMINI_API_KEY is configured in the environment settings!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col flex-1 max-w-5xl w-full mx-auto px-4 py-4 h-[calc(100vh-80px)]">
      {/* Mode & Configuration Selector */}
      <div className="bg-[#101522]/90 backdrop-blur-md rounded-2xl border border-slate-700/60 p-3 shadow-xl mb-3 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Modes */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Persona Mode:</span>
            </span>

            <button
              onClick={() => { setMode('casual'); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                mode === 'casual'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
              }`}
            >
              🌌 Casual & Unfiltered
            </button>

            <button
              onClick={() => { setMode('research'); setEnableSearch(true); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                mode === 'research'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
              }`}
            >
              🔬 Deep Research (Citations)
            </button>

            <button
              onClick={() => { setMode('study'); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                mode === 'study'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
              }`}
            >
              📚 Study & Viva Drill
            </button>

            <button
              onClick={() => { setMode('mechanism'); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                mode === 'mechanism'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
              }`}
            >
              ⚙️ Mechanism Teardown
            </button>

            <button
              onClick={() => { setMode('rsi'); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1 ${
                mode === 'rsi'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm shadow-purple-600/30'
                  : 'bg-purple-950/40 text-purple-300 border border-purple-900/50 hover:bg-purple-900/50'
              }`}
            >
              <RefreshCw className="w-3 h-3" />
              <span>RSI Adaptive</span>
            </button>
          </div>

          {/* Search Grounding toggle */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer bg-slate-800/40 px-2.5 py-1.5 rounded-lg border border-slate-700/40 hover:border-slate-600">
              <input
                type="checkbox"
                checked={enableSearch || mode === 'research'}
                onChange={(e) => setEnableSearch(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
              />
              <Search className="w-3.5 h-3.5 text-indigo-400" />
              <span>Search Grounding (Verified Citations)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-3 scroll-smooth">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-indigo-500/40 bg-indigo-950/50 shadow-md shadow-indigo-500/10">
                  <img
                    src={zainabPortrait}
                    alt="Zainab"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('zainab_study_portrait')) {
                        target.src = '/zainab_study_portrait_1790568278004.jpg';
                      }
                    }}
                  />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-lg transition-all ${
                  isUser
                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-xs'
                    : 'bg-[#121826]/90 border border-slate-700/70 text-slate-100 rounded-tl-xs backdrop-blur-md'
                }`}
              >
                {/* Header bar on bot message */}
                {!isUser && (
                  <div className="flex items-center justify-between gap-2 border-b border-slate-700/50 pb-2 mb-2.5 text-xs text-slate-400">
                    <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                      <span>Zainab</span>
                      {msg.mode === 'research' && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-sky-950 text-sky-300 border border-sky-800">
                          Research Mode
                        </span>
                      )}
                      {msg.mode === 'study' && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-purple-950 text-purple-300 border border-purple-800">
                          Study & Viva
                        </span>
                      )}
                      {msg.mode === 'mechanism' && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800">
                          Mechanism First
                        </span>
                      )}
                      {msg.mode === 'rsi' && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-purple-950 text-purple-300 border border-purple-800 flex items-center gap-1">
                          <RefreshCw className="w-2.5 h-2.5" />
                          <span>RSI Adaptive</span>
                        </span>
                      )}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-500">
                        {msg.timestamp}
                      </span>
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-slate-200 transition-colors p-1"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Message Content */}
                <div className="text-sm leading-relaxed whitespace-pre-wrap font-normal space-y-2">
                  {msg.text}
                </div>

                {/* Google Search Queries Grounding Trail */}
                {msg.searchQueries && msg.searchQueries.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                    <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mb-1">
                      <Search className="w-3 h-3 text-indigo-400" />
                      <span>Investigated Web Queries:</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.searchQueries.map((q, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-slate-800/80 text-indigo-200 px-2 py-0.5 rounded-md border border-slate-700/60"
                        >
                          &ldquo;{q}&rdquo;
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verified Citations & References Card */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3.5 p-3 rounded-xl bg-[#0b0f17]/90 border border-indigo-500/30 shadow-inner">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Proper Verified Citations & Sources ({msg.citations.length})</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Google Grounded
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {msg.citations.map((cite, cIdx) => {
                        let hostname = '';
                        try {
                          hostname = new URL(cite.uri).hostname.replace('www.', '');
                        } catch (e) {
                          hostname = 'Source';
                        }
                        return (
                          <a
                            key={cIdx}
                            href={cite.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start justify-between gap-2 p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/40 transition-colors text-xs group"
                          >
                            <div className="flex flex-col overflow-hidden">
                              <span className="font-medium text-slate-200 group-hover:text-indigo-200 truncate">
                                {cite.title || cite.uri}
                              </span>
                              <span className="text-[10px] text-indigo-400 font-mono">
                                {hostname}
                              </span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-300 shrink-0 mt-0.5" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Follow-up Quick Action Suggestions for bot replies */}
                {!isUser && (
                  <div className="mt-3 pt-2 flex flex-wrap gap-1.5 text-[11px]">
                    <button
                      onClick={() => handleSend("Wait—can you break down the exact physical mechanism underneath this? What causes it?")}
                      className="px-2 py-1 rounded bg-slate-800/70 hover:bg-slate-700/80 text-slate-300 transition-colors cursor-pointer border border-slate-700/50"
                    >
                      ⚙️ Why underneath?
                    </button>
                    <button
                      onClick={() => handleSend("Test me on this with a viva question or MCQ, then evaluate my answer.")}
                      className="px-2 py-1 rounded bg-slate-800/70 hover:bg-slate-700/80 text-slate-300 transition-colors cursor-pointer border border-slate-700/50"
                    >
                      📚 Viva: Test me
                    </button>
                    <button
                      onClick={() => handleSend("What happens in the weird edge case or boundary condition here?")}
                      className="px-2 py-1 rounded bg-slate-800/70 hover:bg-slate-700/80 text-slate-300 transition-colors cursor-pointer border border-slate-700/50"
                    >
                      🔍 Test edge case
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-indigo-500/40 bg-indigo-950/50 flex items-center justify-center">
              <img
                src={zainabPortrait}
                alt="Zainab"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('zainab_study_portrait')) {
                    target.src = '/zainab_study_portrait_1790568278004.jpg';
                  }
                }}
              />
            </div>
            <div className="p-3.5 rounded-2xl rounded-tl-xs bg-[#121826]/90 border border-slate-700/70 text-slate-300 text-xs flex items-center gap-3 shadow-lg">
              <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />
              <div className="flex flex-col">
                <span className="font-medium text-slate-200">
                  {mode === 'research' || enableSearch
                    ? 'Zainab is investigating sources & grounding citations...'
                    : 'Zainab is thinking through the causal mechanism...'}
                </span>
                <span className="text-[10px] text-slate-400 italic">
                  &ldquo;Checking causal chains and verifying exact facts...&rdquo;
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Chips */}
      {messages.length <= 2 && (
        <div className="mb-2 shrink-0">
          <p className="text-[11px] text-slate-400 mb-1.5 flex items-center gap-1 font-mono">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Try asking Zainab about her core areas or research:</span>
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {SAMPLE_QUERIES.map((sq, i) => (
              <button
                key={i}
                onClick={() => {
                  if (sq.mode === 'research') {
                    setMode('research');
                    setEnableSearch(true);
                  } else if (sq.mode === 'study') {
                    setMode('study');
                  } else if (sq.mode === 'mechanism') {
                    setMode('mechanism');
                  }
                  handleSend(sq.text);
                }}
                className="shrink-0 text-left px-3 py-1.5 rounded-xl bg-[#141b2b]/90 hover:bg-[#1a2338] border border-slate-700/60 hover:border-indigo-500/50 text-xs text-slate-200 transition-all cursor-pointer"
              >
                <span className="font-semibold text-indigo-300 block text-[11px]">
                  {sq.label}
                </span>
                <span className="text-slate-400 line-clamp-1 max-w-[240px] text-[10px]">
                  {sq.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box Area */}
      <div className="shrink-0 bg-[#101522]/95 backdrop-blur-md rounded-2xl border border-slate-700/70 p-2 shadow-2xl">
        {/* Anti-Assumption banner */}
        <div className="px-3 py-1 mb-1.5 flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80">
          <span className="flex items-center gap-1.5 text-indigo-300/90 font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Rule: &ldquo;Think hard; if I don&apos;t understand, I&apos;ll ask instead of assuming.&rdquo;</span>
          </span>
          <span className="text-[10px] text-slate-500 hidden sm:inline">
            Shift + Enter for new line • Enter to send
          </span>
        </div>

        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={
              mode === 'research'
                ? 'Ask a research question—I will gather sources and provide citations...'
                : mode === 'study'
                ? 'Tell me what you are studying or ask for a viva drill...'
                : 'Talk with Zainab, ask for a mechanism breakdown, or explore a problem...'
            }
            className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none max-h-44"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className={`p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
              input.trim() && !isLoading
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:brightness-110 shadow-md shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
