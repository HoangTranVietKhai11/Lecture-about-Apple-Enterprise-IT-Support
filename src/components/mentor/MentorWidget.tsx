'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useMentorStore } from '@/store/useMentorStore';
import { useAppStore } from '@/store/useAppStore';
import {
  MessageSquare,
  X,
  Send,
  Trash2,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  Terminal,
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  'Phân biệt Configuration Profile vs Jamf Policy',
  'Tại sao APNs chặn cổng 5223 thì lệnh bị pending?',
  'Vai trò của Shared Device Keys trong Platform SSO?',
  'DDM khác gì MDM truyền thống?',
  'Kiểm tra trạng thái ADE bằng lệnh Terminal nào?',
];

export const MentorWidget: React.FC = () => {
  const {
    isOpen,
    isLoading,
    messages,
    activeContext,
    toggleOpen,
    setIsOpen,
    sendMessage,
    clearMessages,
    clearContext,
  } = useMentorStore();

  const { language } = useAppStore();
  const isVi = language === 'vi';

  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt);
  };

  // Render formatted markdown-like text
  const renderMessageContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="flex flex-col gap-1.5 text-xs leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Bullet points
          if (line.trim().startsWith('•') || line.trim().startsWith('*') || line.trim().startsWith('-')) {
            const cleanText = line.replace(/^[\s•*-]+/, '').trim();
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-secondary select-none font-bold text-[10px] pt-0.5">•</span>
                <span className="flex-1">{formatInline(cleanText)}</span>
              </div>
            );
          }

          return <p key={idx}>{formatInline(line)}</p>;
        })}
      </div>
    );
  };

  // Format bold and backticks
  const formatInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={index}
            className="px-1.5 py-0.5 rounded bg-surface-high font-mono text-[11px] text-foreground border border-border"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={toggleOpen}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-3.5 py-2.5 bg-primary text-white rounded-full shadow-md hover:bg-primary/95 transition-all group"
          title={isVi ? 'Mở Apple Deployment Mentor AI' : 'Open Apple Deployment Mentor AI'}
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-positive rounded-full ring-2 ring-background" />
          </div>
          <span className="text-xs font-medium tracking-tight">Apple Mentor</span>
        </button>
      )}

      {/* Slide-over Drawer / Panel */}
      {isOpen && (
        <aside
          className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[440px] h-[85vh] sm:h-[620px] max-h-screen bg-card border border-border sm:rounded-xl shadow-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
          aria-label="Apple Deployment Mentor Drawer"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-sidebar/50 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-semibold text-foreground leading-tight">
                    Apple Deployment Mentor
                  </h3>
                  <span className="px-1.5 py-0.2 bg-positive/10 text-positive text-[9px] font-mono rounded font-medium">
                    AI Online
                  </span>
                </div>
                <span className="text-[10px] text-secondary">
                  DEP110 Enterprise Certified Tutor
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearMessages}
                className="p-1.5 rounded-md text-secondary hover:text-foreground hover:bg-surface-high transition-colors"
                title={isVi ? 'Xóa hội thoại' : 'Clear Chat'}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={toggleOpen}
                className="p-1.5 rounded-md text-secondary hover:text-foreground hover:bg-surface-high transition-colors"
                title={isVi ? 'Đóng' : 'Close'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Context Banner if loaded from Quiz / Exam */}
          {activeContext && (
            <div className="px-3.5 py-2 bg-sidebar border-b border-border flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-secondary truncate pr-2">
                <HelpCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="truncate">
                  {isVi ? 'Đang phân tích câu hỏi:' : 'Analyzing question:'}{' '}
                  <strong className="text-foreground">{activeContext.context || 'Exam Question'}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={clearContext}
                className="text-[10px] text-secondary hover:text-foreground font-mono"
              >
                {isVi ? 'Gỡ ngữ cảnh' : 'Clear context'}
              </button>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 bg-background/50">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3 rounded-lg border ${
                      isUser
                        ? 'bg-primary text-white border-primary rounded-tr-none'
                        : 'bg-card text-foreground border-border rounded-tl-none'
                    }`}
                  >
                    {isUser ? (
                      <p className="text-xs whitespace-pre-wrap leading-relaxed">{m.content}</p>
                    ) : (
                      renderMessageContent(m.content)
                    )}
                  </div>
                  <span className="text-[9px] text-secondary/70 mt-1 font-mono px-1">
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-secondary p-3 rounded-lg bg-card border border-border w-fit">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="text-[11px] font-medium">Mentor đang suy luận DEP110...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts (Chips) */}
          {messages.length <= 2 && (
            <div className="px-3 pt-2 pb-1 border-t border-border bg-card">
              <span className="text-[10px] font-semibold text-secondary uppercase tracking-wider block mb-1.5">
                {isVi ? 'Gợi ý câu hỏi trọng tâm DEP110:' : 'Suggested DEP110 Topics:'}
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePromptClick(prompt)}
                    className="text-[11px] px-2.5 py-1 rounded bg-sidebar hover:bg-surface-high border border-border text-secondary hover:text-foreground transition-colors text-left truncate max-w-full"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 border-t border-border bg-card">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isVi
                    ? 'Hỏi Apple Mentor về APNs, Jamf, DDM, DEP110...'
                    : 'Ask Apple Mentor about APNs, Jamf, DDM, DEP110...'
                }
                className="flex-1 bg-sidebar border border-border rounded-md px-3 py-2 text-xs text-foreground placeholder:text-secondary/60 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-md bg-primary text-white hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title={isVi ? 'Gửi câu hỏi' : 'Send'}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex justify-between items-center mt-1.5 px-0.5">
              <span className="text-[10px] text-secondary flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-positive" />
                Apple Enterprise Guardrails Active
              </span>
              <span className="text-[10px] text-secondary font-mono">
                Press Enter to send
              </span>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
