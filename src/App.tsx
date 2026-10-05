/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CelestialBackground } from './components/CelestialBackground';
import { ZainabHeader } from './components/ZainabHeader';
import { ChatInterface } from './components/ChatInterface';
import { ResearchWorkspace } from './components/ResearchWorkspace';
import { MemoryUpdateCard } from './components/MemoryUpdateCard';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'research' | 'memory'>('chat');
  const [prefilledChatPrompt, setPrefilledChatPrompt] = useState<string | null>(null);

  const handleSendResearchToChat = (text: string) => {
    setPrefilledChatPrompt(text);
    setActiveTab('chat');
  };

  return (
    <CelestialBackground>
      <ZainabHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col">
        {activeTab === 'chat' && (
          <ChatInterface onStartResearchTopic={(topic) => {
            setActiveTab('research');
          }} />
        )}

        {activeTab === 'research' && (
          <ResearchWorkspace onSendToChat={handleSendResearchToChat} />
        )}

        {activeTab === 'memory' && (
          <MemoryUpdateCard />
        )}
      </main>

      <footer className="border-t border-slate-800/60 bg-[#0a0d14]/70 backdrop-blur-md py-3 text-center text-xs text-slate-400">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[11px] text-slate-400">
            Zainab • AI • ML • Systems • BSCS @ UMT Lahore
          </p>
          <p className="text-[11px] text-indigo-300/80">
            &ldquo;I study how machines think, communicate, and learn.&rdquo;
          </p>
        </div>
      </footer>
    </CelestialBackground>
  );
}
