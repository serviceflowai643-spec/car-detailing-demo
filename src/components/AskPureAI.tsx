import React, { useState, useRef, useEffect } from 'react';
import { BUSINESS_INFO, SERVICES } from '../data/businessData';
import { X, Send, Sparkles, Phone, Zap, RotateCcw, ArrowRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actions?: Array<{ label: string; href?: string; onClick?: () => void }>;
}

interface AskPureAIProps {
  onOpenBooking: (service?: string) => void;
}

export const AskPureAI: React.FC<AskPureAIProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi 👋 I'm Pure AI, concierge for Pure Detailing UK in Chelmsford. Looking for a detail, a quote, or guidance on our services?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: 'View Services' },
        { label: 'Process Times & Opening' },
        { label: 'Request a Quote' },
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi 👋 I'm Pure AI, concierge for Pure Detailing UK in Chelmsford. How can I help you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: 'View Services' },
          { label: 'Studio Location' },
          { label: 'Request a Quote' },
        ]
      }
    ]);
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isStreaming) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: query,
      timestamp: timeStr,
    };

    // Append user message immediately
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput('');
    setIsStreaming(true);

    const assistantMsgId = `ai-${Date.now()}`;
    const emptyAssistantMsg: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, emptyAssistantMsg]);

    try {
      abortControllerRef.current = new AbortController();

      // Convert history to payload
      const historyPayload = nextHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyPayload,
          model: 'gemini-3.1-flash-lite',
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error('Network response failed');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulatedText = '';
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (dataStr === '[DONE]') {
              break;
            }
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                accumulatedText += parsed.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsgId ? { ...m, content: accumulatedText } : m
                  )
                );
              }
            } catch {
              // Ignore non-json chunks
            }
          }
        }
      }

      // If response finished, attach quick actions based on context
      const lower = accumulatedText.toLowerCase();
      let contextualActions: ChatMessage['actions'] = [];

      if (lower.includes('quote') || lower.includes('book') || lower.includes('price')) {
        contextualActions = [
          { label: 'Request a Quote', onClick: () => { setIsOpen(false); onOpenBooking(); } },
          { label: `Call: ${BUSINESS_INFO.phoneDisplay}`, href: `tel:${BUSINESS_INFO.phoneRaw}` },
        ];
      } else if (lower.includes('location') || lower.includes('where') || lower.includes('address')) {
        contextualActions = [
          { label: 'Get Directions', href: BUSINESS_INFO.googleMapsUrl },
          { label: 'Call Studio', href: `tel:${BUSINESS_INFO.phoneRaw}` },
        ];
      } else if (lower.includes('service') || lower.includes('detail')) {
        contextualActions = [
          { label: 'Choose Full Detail', onClick: () => { setIsOpen(false); onOpenBooking('Full Detail'); } },
          { label: 'Choose Paint Enhancement', onClick: () => { setIsOpen(false); onOpenBooking('Paint Enhancement'); } },
        ];
      }

      if (contextualActions.length > 0) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId ? { ...m, actions: contextualActions } : m
          )
        );
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        // Fallback fast response
        const fallback = getFastFallback(query);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content: fallback.text,
                  actions: fallback.actions,
                }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const getFastFallback = (q: string): { text: string; actions?: ChatMessage['actions'] } => {
    const lower = q.toLowerCase();
    if (lower.includes('price') || lower.includes('cost') || lower.includes('quote')) {
      return {
        text: 'Every vehicle is assessed individually based on vehicle size and surface condition. Please request a quote via our on-page form or call Alex and Nathan directly on 07875 500935.',
        actions: [
          { label: 'Request a Quote', onClick: () => { setIsOpen(false); onOpenBooking(); } },
          { label: 'Call 07875 500935', href: `tel:${BUSINESS_INFO.phoneRaw}` }
        ]
      };
    }
    if (lower.includes('where') || lower.includes('location') || lower.includes('address')) {
      return {
        text: "Pure Detailing UK is located at Unit 16, Yard, 1 Pool's Ln, Chelmsford CM1 3QL, United Kingdom. We have private studio bay access for vehicle drop-offs.",
        actions: [
          { label: 'Get Directions', href: BUSINESS_INFO.googleMapsUrl }
        ]
      };
    }
    return {
      text: "Pure Detailing UK provides premium car detailing in Chelmsford. Our studio opens at 9:00 AM (Mon–Sat). Let us know how we can assist with your vehicle!",
      actions: [
        { label: 'Request a Quote', onClick: () => { setIsOpen(false); onOpenBooking(); } }
      ]
    };
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* Small Floating Circular AI Button when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0d1017] hover:bg-[#151922] border border-[#d4a359]/40 hover:border-[#d4a359]/80 flex items-center justify-center text-[#d4a359] shadow-xl shadow-black/80 hover:shadow-[#d4a359]/25 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Open AI Assistant"
        >
          {/* Subtle soft ambient glow ring on hover */}
          <span className="absolute -inset-0.5 rounded-full bg-[#d4a359] opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300 pointer-events-none" />
          
          {/* Clean AI Logo Icon */}
          <Sparkles className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#d4a359] group-hover:text-[#f3cf8c] transition-colors relative z-10" />
        </button>
      )}

      {/* Multi-turn Chat Window when open */}
      {isOpen && (
        <div className="w-[94vw] sm:w-[400px] h-[550px] max-h-[84vh] rounded-3xl bg-[#0c0f16] border border-[#d4a359]/30 shadow-2xl flex flex-col overflow-hidden animate-fadeIn backdrop-blur-2xl">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#121622] via-[#0f131d] to-[#121622] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#d4a359] text-black flex items-center justify-center font-bold shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  Pure AI
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    gemini-3.1-flash-lite
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">Ultra-Fast Receptionist · Chelmsford</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Context Strip */}
          <div className="bg-[#080b10] px-3.5 py-1.5 border-b border-white/5 text-[10px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-[#d4a359]" />
              <span>Streaming responses enabled</span>
            </span>
            <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-[#d4a359] hover:underline font-mono">
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>

          {/* Scrollable Message Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed whitespace-pre-line text-xs ${
                    m.role === 'user'
                      ? 'bg-[#d4a359] text-black font-medium rounded-br-none shadow-md'
                      : 'bg-[#141822] text-slate-200 border border-white/5 rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.content ? (
                    m.content
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4a359] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4a359] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4a359] animate-bounce [animation-delay:0.4s]" />
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="text-[9px] text-slate-500 font-mono">{m.timestamp}</span>
                </div>

                {/* Optional Action Chips */}
                {m.actions && m.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {m.actions.map((act, aIdx) => {
                      if (act.href) {
                        return (
                          <a
                            key={aIdx}
                            href={act.href}
                            target={act.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-[#d4a359]/20 text-slate-300 hover:text-[#f3cf8c] border border-white/10 hover:border-[#d4a359]/40 text-[11px] font-medium transition-all"
                          >
                            {act.label}
                          </a>
                        );
                      }
                      return (
                        <button
                          key={aIdx}
                          onClick={() => {
                            if (act.onClick) {
                              act.onClick();
                            } else {
                              handleSend(act.label);
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-[#d4a359]/20 text-slate-300 hover:text-[#f3cf8c] border border-white/10 hover:border-[#d4a359]/40 text-[11px] font-medium transition-all cursor-pointer"
                        >
                          {act.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick preset chips */}
          <div className="p-2 bg-[#090b10] border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {[
              'What detailing packages do you offer?',
              'How long does a Full Detail take?',
              'Where is the Chelmsford studio?',
              'How do I get a quote?',
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/5 text-[10px] transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#0c0f16] border-t border-white/10 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask about detailing, opening times, quotes..."
              disabled={isStreaming}
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a359] disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isStreaming}
              aria-label="Send message"
              className="p-2 rounded-xl bg-[#d4a359] text-black disabled:opacity-40 hover:bg-[#e2a856] transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
