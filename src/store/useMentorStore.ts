import { create } from 'zustand';
import { MentorMessage, MentorContext } from '@/types';

interface MentorStoreState {
  isOpen: boolean;
  isLoading: boolean;
  messages: MentorMessage[];
  activeContext: MentorContext | null;

  // Actions
  setIsOpen: (isOpen: boolean) => void;
  toggleOpen: () => void;
  openWithContext: (context: MentorContext, autoAsk?: boolean) => void;
  clearContext: () => void;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}

const INITIAL_GREETING: MentorMessage = {
  id: 'mentor-welcome',
  role: 'assistant',
  content: `Chào bạn! Tôi là **Apple Deployment Mentor** — trợ lý AI đồng hành cùng bạn chinh phục chứng chỉ **Apple Certified IT Professional (DEP110)**.

Tôi có thể giúp bạn:
• Phân tích tại sao đáp án trắc nghiệm đúng hoặc sai.
• Làm rõ ranh giới kỹ thuật giữa **Configuration Profile** và **Jamf Policy**.
• Giải thích chuyên sâu về kiến trúc **APNs**, **ADE Supervision**, **Platform SSO** và **DDM**.
• Hướng dẫn chẩn đoán các lỗi trong macOS Terminal & Enterprise Labs.

Bạn đang có thắc mắc gì về kỳ thi hoặc quản trị Apple trong doanh nghiệp?`,
  timestamp: Date.now(),
};

export const useMentorStore = create<MentorStoreState>((set, get) => ({
  isOpen: false,
  isLoading: false,
  messages: [INITIAL_GREETING],
  activeContext: null,

  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  
  toggleOpen: () => set((s) => ({ isOpen: !s.isOpen })),

  openWithContext: (context: MentorContext, autoAsk = true) => {
    set({ isOpen: true, activeContext: context });
    if (autoAsk) {
      let promptText = `Xin chào Mentor! Nhờ Mentor phân tích giúp tôi câu hỏi này:`;
      if (context.question) promptText += `\n**Câu hỏi**: ${context.question}`;
      if (context.userSelected) promptText += `\n**Tôi đã chọn**: ${context.userSelected}`;
      if (context.correctAnswer) promptText += `\n**Đáp án đúng**: ${context.correctAnswer}`;
      if (context.context) promptText += `\n**Chủ đề**: ${context.context}`;
      promptText += `\n\nTại sao đáp án đúng lại là như vậy và tôi cần lưu ý gì cho kỳ thi DEP110?`;

      get().sendMessage(promptText);
    }
  },

  clearContext: () => set({ activeContext: null }),

  clearMessages: () => set({ messages: [INITIAL_GREETING] }),

  sendMessage: async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || get().isLoading) return;

    const userMsg: MentorMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    };

    const currentContext = get().activeContext;

    set((s) => ({
      messages: [...s.messages, userMsg],
      isLoading: true,
    }));

    try {
      const response = await fetch('/api/mentor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          context: currentContext,
          history: get().messages.slice(-8), // Send recent context
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMsg: MentorMessage = {
        id: `mentor-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Xin lỗi, tôi chưa thể xử lý yêu cầu lúc này. Vui lòng thử lại!',
        timestamp: Date.now(),
      };

      set((s) => ({
        messages: [...s.messages, botMsg],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to communicate with Apple Mentor:', error);
      const errorMsg: MentorMessage = {
        id: `mentor-err-${Date.now()}`,
        role: 'assistant',
        content: 'Đã có lỗi kết nối đến máy chủ AI Mentor. Xin hãy kiểm tra lại kết nối mạng hoặc thử lại sau giây lát!',
        timestamp: Date.now(),
      };
      set((s) => ({
        messages: [...s.messages, errorMsg],
        isLoading: false,
      }));
    }
  },
}));
