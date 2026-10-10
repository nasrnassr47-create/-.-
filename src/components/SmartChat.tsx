import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface SmartChatProps {
  isOpen: boolean;
  onClose: () => void;
  walletBalance: number;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const SmartChat: React.FC<SmartChatProps> = ({ isOpen, onClose, walletBalance }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'مرحباً بك في منظومة نصر والت السيادية! أنا المساعد المالي الذكي. كيف يمكنني خدمتك اليوم بخصوص أرصدة الخزينة، المقاصة، أو سداد الباقات؟',
      time: 'الآن'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Automated smart assistant response
    setTimeout(() => {
      let reply = 'تم استلام استفسارك وسيتم تدقيقه في السجلات المحاسبية فوراً.';
      const query = userMsg.text.toLowerCase();

      if (query.includes('رصيد') || query.includes('فلوس') || query.includes('خزينة')) {
        reply = `الرصيد الكلي المتاح حالياً في خزينة نصر والت السيادية هو ${walletBalance.toLocaleString()} ريال يمني، بالإضافة إلى 480,900 دولار أمريكي في حسابات الاحتياطي المصرفي.`;
      } else if (query.includes('باقة') || query.includes('يمن موبايل') || query.includes('نت')) {
        reply = 'بوابات الاتصالات اليمنية (يمن موبايل، يو، سبأفون، يمن نت) متصلة بشكل مباشر ومستقر 100%، ويمكنك تنفيذ أي شحن فوري عبر مركز العمليات.';
      } else if (query.includes('غسل') || query.includes('تجميد') || query.includes('أمان')) {
        reply = 'رادار الرقابة السيادية ومكافحة غسل الأموال (AML) يعمل بأعلى مستوى حساسية عسكري AES-256، ولم يتم تسجيل أي اختراق أو شبهة غير معالجة.';
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-20 left-4 z-50 w-96 max-w-[calc(100vw-32px)] bg-[#032516] border border-[#f5c842] rounded-[16px] shadow-2xl overflow-hidden flex flex-col h-[480px] animate-in fade-in zoom-in-95">
      {/* Header */}
      <div className="bg-[#01140a] p-3.5 border-b border-[rgba(245,200,66,0.3)] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-[#f5c842]/20 border border-[#f5c842] flex items-center justify-center">
            <Sparkles size={16} className="text-[#f5c842]" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-white flex items-center gap-1.5">
              <span>مساعد نصر المالي الذكي</span>
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
            </h3>
            <p className="text-[10px] text-[#94a3b8]">نواة الاستشارات السيادية والتدقيق الفوري</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-[#94a3b8] hover:text-white p-1 rounded-[8px] hover:bg-[#032516] transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
              m.sender === 'user' ? 'bg-[#f5c842] text-black font-bold' : 'bg-[#01140a] text-[#f5c842] border border-[#f5c842]/40'
            }`}>
              {m.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={`p-2.5 rounded-[12px] max-w-[80%] text-[12px] leading-relaxed ${
              m.sender === 'user'
                ? 'bg-[#f5c842] text-black font-medium'
                : 'bg-[#01140a] text-white border border-[rgba(245,200,66,0.2)]'
            }`}>
              {m.text}
              <span className="block text-[9px] mt-1 opacity-70 text-left">{m.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-2.5 bg-[#01140a] border-t border-[rgba(245,200,66,0.3)] flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="اكتب استفسارك المالي أو الرقابي هنا..."
          className="flex-1 bg-[#032516] text-white text-[12px] px-3 py-2 rounded-[10px] border border-[rgba(245,200,66,0.3)] focus:outline-none focus:border-[#f5c842]"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-[#f5c842] hover:bg-[#f5c842]/90 text-black rounded-[10px] cursor-pointer transition-transform active:scale-95"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default SmartChat;
