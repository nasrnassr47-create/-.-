import React, { useState, useRef } from 'react';

interface StandaloneClientAppProps {
  onClose?: () => void;
  walletBalance: number;
  onDeductBalance?: (amount: number, reason: string) => void;
  onOpenFullFamilyHub?: () => void;
}

export const StandaloneClientApp: React.FC<StandaloneClientAppProps> = ({ 
  walletBalance, 
  onDeductBalance,
  onOpenFullFamilyHub 
}) => {
  // App views: 'dad' | 'kids'
  const [currentApp, setCurrentApp] = useState<'dad' | 'kids'>('dad');
  
  // Dad screens: 'dad-home' | 'dad-report'
  const [dadScreen, setDadScreen] = useState<'dad-home' | 'dad-report'>('dad-home');
  
  // Kids screens: 'k-home' | 'k-buy' | 'k-buyForm' | 'k-savings' | 'k-request' | 'k-transfer' | 'k-history'
  const [kidScreen, setKidScreen] = useState<'k-home' | 'k-buy' | 'k-buyForm' | 'k-savings' | 'k-request' | 'k-transfer' | 'k-history'>('k-home');
  
  // Transactions toggle
  const [isTxOpen, setIsTxOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Kids State
  const [kidBalance, setKidBalance] = useState(120);
  const [kidSavings, setKidSavings] = useState(85);
  const [selectedKidCategory, setSelectedKidCategory] = useState({ name: 'بقالة', emoji: '🛒' });
  const [kidBuyAmount, setKidBuyAmount] = useState('');
  const [kidBuyNote, setKidBuyNote] = useState('');
  const [kidBuyPayer, setKidBuyPayer] = useState<'بابا' | 'ماما' | 'رصيدي'>('بابا');
  const [kidReqAmount, setKidReqAmount] = useState('');
  const [kidReqReason, setKidReqReason] = useState('');
  const [kidTrAmount, setKidTrAmount] = useState('');
  const [kidTrTo, setKidTrTo] = useState<'ماما' | 'أخي' | 'بابا'>('ماما');
  const [kidTrType, setKidTrType] = useState('تحويل مبلغ');
  const [kidSavInput, setKidSavInput] = useState('');

  // Dad's Pending Requests
  const [familyRequests, setFamilyRequests] = useState([
    { id: 1, kid: 'أحمد', category: 'مصروف', amount: 50, note: 'دفتر وقلم' },
    { id: 2, kid: 'سارة', category: 'بقالة', amount: 120, note: 'حليب وخبز' },
    { id: 3, kid: 'أحمد', category: 'بلاستيشن', amount: 150, note: 'لعبة جديدة' }
  ]);

  // Registered Family Members (Kids & Dependents)
  const [familyKids, setFamilyKids] = useState([
    {
      id: 'k-1',
      name: 'أحمد نصر',
      relation: 'ابن',
      age: 10,
      balance: 120,
      heldAmount: 0,
      isFrozen: false,
      avatarColor: '#FDE68A'
    },
    {
      id: 'k-2',
      name: 'سارة نصر',
      relation: 'ابنة',
      age: 8,
      balance: 85,
      heldAmount: 0,
      isFrozen: false,
      avatarColor: '#FBCFE8'
    }
  ]);

  // Subscription requests pending central approval
  const [pendingSubscriptions, setPendingSubscriptions] = useState([
    {
      id: 'sub-201',
      name: 'عمر نصر فضل',
      relation: 'ابن',
      age: 6,
      nationalId: '010992381',
      allowance: 50,
      date: 'اليوم · 10:15 ص',
      status: 'pending' as const
    }
  ]);

  // Modal Controls
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);
  const [newChildForm, setNewChildForm] = useState({
    name: '',
    relation: 'ابن',
    age: '12',
    nationalId: '',
    allowance: '50'
  });

  const [transferModal, setTransferModal] = useState<{ open: boolean; kidId: string; kidName: string; amount: string }>({
    open: false,
    kidId: '',
    kidName: '',
    amount: ''
  });

  const [holdModal, setHoldModal] = useState<{ open: boolean; kidId: string; kidName: string; amount: string }>({
    open: false,
    kidId: '',
    kidName: '',
    amount: ''
  });

  // Assist Bot Panel State
  const [isAssistOpen, setIsAssistOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    { sender: 'bot', text: 'مرحباً! أنا مساعدك الذكي في نصر والت 🤖\nكيف أقدر أساعدك اليوم؟\n\n💡 تلميح: اسحبني لأي مكان بالشاشة!' }
  ]);

  // Draggable Assist Ball Coordinates & Color
  const [fabPos, setFabPos] = useState({ left: 320, top: 180 });
  const [fabColor, setFabColor] = useState({
    bg: 'radial-gradient(circle at 30% 30%, #3B82F6, #0B5FA5 70%)',
    boxShadow: '0 0 0 3px rgba(59,130,246,.55), 0 0 0 7px rgba(59,130,246,.18), 0 8px 24px rgba(11,95,165,.5)',
    color: '#3B82F6'
  });
  const dragRef = useRef<{ isDragging: boolean; startX: number; startY: number; startL: number; startT: number; hasMoved: boolean }>({
    isDragging: false, startX: 0, startY: 0, startL: 0, startT: 0, hasMoved: false
  });

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Draggable ball setup & color calculation
  const updateFabStyle = (l: number, t: number) => {
    const hue = Math.round((l * 0.6 + t * 0.9) % 360);
    const c1 = `hsl(${hue}, 85%, 62%)`;
    const c2 = `hsl(${(hue + 40) % 360}, 85%, 42%)`;
    const ring = `hsl(${hue}, 85%, 55%)`;
    setFabColor({
      bg: `radial-gradient(circle at 30% 30%, ${c1}, ${c2} 75%)`,
      boxShadow: `0 0 0 3px ${ring}cc, 0 0 0 7px ${ring}33, 0 8px 24px ${c2}aa, inset 0 -6px 12px rgba(0,0,0,.2), inset 0 6px 12px rgba(255,255,255,.35)`,
      color: ring
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startL: fabPos.left,
      startT: fabPos.top,
      hasMoved: false
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragRef.current.hasMoved = true;
    }
    const maxL = (window.innerWidth || 430) - 64;
    const maxT = (window.innerHeight || 800) - 64;
    const newL = Math.max(4, Math.min(maxL, dragRef.current.startL + dx));
    const newT = Math.max(4, Math.min(maxT, dragRef.current.startT + dy));
    setFabPos({ left: newL, top: newT });
    updateFabStyle(newL, newT);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;
    if (!dragRef.current.hasMoved) {
      setIsAssistOpen(prev => !prev);
    }
  };

  // Assist Q&A responses
  const assistAnswers: Record<string, string> = {
    subscribe: `للاشتراك في نصر والت 📱:\n\n1️⃣ حمّل التطبيق من متجر التطبيقات\n2️⃣ اضغط "تسجيل جديد"\n3️⃣ أدخل رقم جوالك ورمز التحقق\n4️⃣ اختر الفرع الأقرب لك\n5️⃣ فعّل المحفظة بزيارة أي فرع\n\n✅ جاهز للاستخدام فوراً!`,
    register: `لتسجيل حساب جديد ✍️:\n\n• افتح التطبيق\n• اختر "حساب جديد"\n• اكتب اسمك ورقم جوالك\n• استلم رمز OTP وأدخله\n• حدد كلمة مرور قوية\n• أكمل بياناتك الأساسية\n\n🎉 حسابك جاهز في دقيقة!`,
    family: `لتفعيل حساب العائلة 👨‍👩‍👧:\n\n1️⃣ افتح "تقرير العائلة" من الرئيسية\n2️⃣ اضغط "إضافة طفل"\n3️⃣ أدخل اسم الطفل وعمره\n4️⃣ اختر حد المصروف اليومي\n5️⃣ سيستلم الطفل رمز دخول خاص\n\n💜 بعدها اضغط "تجربة العائلة" لتشوف تجربة الطفل!`,
    support: `📞 للتواصل مع الدعم الفني:\n\n• الهاتف: 8000-1234\n• الواتساب: +9677XXXXXXX\n• البريد: support@nasrwallet.ye\n• ساعات العمل: 8ص - 8م يومياً\n\nأو زر أقرب فرع لخدمتك مباشرة.`,
    security: `🔐 نصائح لحماية حسابك:\n\n• لا تشارك رمز OTP مع أحد أبداً\n• استخدم كلمة مرور قوية وفريدة\n• فعّل البصمة للدخول\n• راجع عملياتك بانتظام\n• سجّل خروج من الأجهزة غير المعروفة`
  };

  const handleAskAssist = (key: string) => {
    const questions: Record<string, string> = {
      subscribe: 'كيف أشترك في نصر والت؟',
      register: 'كيف أسجل حساب جديد؟',
      family: 'كيف أفتح حساب للعائلة؟',
      support: 'تواصل مع الدعم الفني',
      security: 'كيف أحمي حسابي؟'
    };
    const userQ = questions[key] || 'استفسار';
    const answer = assistAnswers[key] || 'أهلاً بك! اختر أحد الأسئلة السريعة وسأجيبك فوراً.';
    
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: userQ },
      { sender: 'bot', text: answer }
    ]);
  };

  // Dad approves/rejects request
  const handleApproveFamilyRequest = (req: { id: number; kid: string; amount: number; note: string }) => {
    if (onDeductBalance) {
      onDeductBalance(req.amount, `موافقة على طلب ${req.kid} (${req.note})`);
    }
    setFamilyRequests(prev => prev.filter(r => r.id !== req.id));
    if (req.kid === 'أحمد') {
      setKidBalance(prev => prev + req.amount);
    }
    triggerToast(`تم قبول طلب ${req.kid} وتحويل ${req.amount} ر.ي ✅`);
  };

  const handleRejectFamilyRequest = (id: number) => {
    setFamilyRequests(prev => prev.filter(r => r.id !== id));
    triggerToast('تم رفض الطلب');
  };

  // Toggle freeze/unfreeze child account
  const handleToggleFreezeKid = (kidId: string) => {
    setFamilyKids(prev => prev.map(k => {
      if (k.id === kidId) {
        const nextState = !k.isFrozen;
        triggerToast(nextState ? `تم توقيف وتجميد حساب الابن ${k.name} ⏸️` : `تم فك التوقيف وتفعيل حساب الابن ${k.name} بنجاح ▶️`);
        return { ...k, isFrozen: nextState };
      }
      return k;
    }));
  };

  // Confirm transfer to child
  const handleTransferToKidConfirm = () => {
    const amt = parseFloat(transferModal.amount);
    if (!amt || amt <= 0) {
      triggerToast('يرجى إدخال مبلغ صحيح للتحويل');
      return;
    }
    if (walletBalance < amt) {
      triggerToast('رصيد المحفظة الحالي غير كافٍ');
      return;
    }

    if (onDeductBalance) {
      onDeductBalance(amt, `تحويل مصروف للابن ${transferModal.kidName}`);
    }

    setFamilyKids(prev => prev.map(k => {
      if (k.id === transferModal.kidId) {
        return { ...k, balance: k.balance + amt };
      }
      return k;
    }));

    if (transferModal.kidName.includes('أحمد')) {
      setKidBalance(prev => prev + amt);
    }

    triggerToast(`تم تحويل ${amt} ر.ي للابن ${transferModal.kidName} فوراً 💸`);
    setTransferModal({ open: false, kidId: '', kidName: '', amount: '' });
  };

  // Confirm holding amount from child
  const handleHoldKidAmountConfirm = () => {
    const amt = parseFloat(holdModal.amount);
    if (!amt || amt <= 0) {
      triggerToast('يرجى تحديد مبلغ الحجز');
      return;
    }

    setFamilyKids(prev => prev.map(k => {
      if (k.id === holdModal.kidId) {
        if (k.balance < amt) {
          triggerToast('المبلغ المراد حجزه أكبر من رصيد الابن المتاح');
          return k;
        }
        triggerToast(`تم حجز ${amt} ر.ي من رصيد ${k.name} بنجاح 🔒`);
        return { ...k, balance: k.balance - amt, heldAmount: k.heldAmount + amt };
      }
      return k;
    }));

    setHoldModal({ open: false, kidId: '', kidName: '', amount: '' });
  };

  // Release held amount back to child
  const handleReleaseKidHold = (kidId: string) => {
    setFamilyKids(prev => prev.map(k => {
      if (k.id === kidId && k.heldAmount > 0) {
        triggerToast(`تم فك الحجز وإعادة ${k.heldAmount} ر.ي لرصيد ${k.name} 🔓`);
        return { ...k, balance: k.balance + k.heldAmount, heldAmount: 0 };
      }
      return k;
    }));
  };

  // Submit new child subscription request (goes to central approval)
  const handleSubmitNewChildRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildForm.name.trim()) {
      triggerToast('يرجى كتابة اسم الابن الرباعي');
      return;
    }

    const newReq = {
      id: `sub-${Date.now().toString().slice(-4)}`,
      name: newChildForm.name.trim(),
      relation: newChildForm.relation,
      age: parseInt(newChildForm.age) || 10,
      nationalId: newChildForm.nationalId || '010' + Math.floor(100000 + Math.random() * 900000),
      allowance: parseFloat(newChildForm.allowance) || 50,
      date: 'الآن',
      status: 'pending' as const
    };

    setPendingSubscriptions(prev => [newReq, ...prev]);
    setIsAddChildModalOpen(false);
    setNewChildForm({ name: '', relation: 'ابن', age: '12', nationalId: '', allowance: '50' });
    triggerToast('تم إرسال طلب اشتراك الابن للاعتماد والموافقة المركزية ⏳');
  };

  // Simulate central approval for testing
  const handleSimulateCentralApproval = (reqId: string) => {
    const req = pendingSubscriptions.find(r => r.id === reqId);
    if (!req) return;

    setPendingSubscriptions(prev => prev.filter(r => r.id !== reqId));
    setFamilyKids(prev => [
      ...prev,
      {
        id: `k-${Date.now()}`,
        name: req.name,
        relation: req.relation,
        age: req.age,
        balance: req.allowance,
        heldAmount: 0,
        isFrozen: false,
        avatarColor: '#BAE6FD'
      }
    ]);
    triggerToast(`تمت الموافقة المركزية! تم اعتماد ${req.name} وفتح حسابه العائلي 🎉`);
  };

  return (
    <div className="flex justify-center min-h-[90vh] bg-[#E9EBEE] py-3 text-[#1F2937] font-sans select-none" dir="rtl">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-[#1F2937] text-white px-5 py-2.5 rounded-full text-[13px] font-bold shadow-2xl z-[300] animate-in fade-in">
          {toastMessage}
        </div>
      )}

      {/* Main Shell (Max 430px Mobile Display) */}
      <div className="w-full max-w-[430px] bg-[#F4F5F7] min-h-[85vh] relative overflow-hidden pb-32 rounded-[24px] shadow-2xl border border-gray-200">
        
        {/* ======================================================== */}
        {/* ==================== 1. تطبيق الأب ==================== */}
        {/* ======================================================== */}
        {currentApp === 'dad' && (
          <div>
            {/* Top Logo Bar */}
            <div className="bg-white px-3.5 py-2.5 flex justify-between items-center border-b border-[#EEF0F3] sticky top-0 z-20">
              <div className="flex gap-1.5">
                <button onClick={() => triggerToast('الإشعارات')} className="w-9 h-9 bg-white border border-[#EEF0F3] rounded-[10px] grid place-items-center cursor-pointer relative hover:bg-gray-50">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7CB342" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.7 21a2 2 0 0 1-3.4 0"/>
                  </svg>
                  <span className="absolute top-1.5 left-1.5 w-2 h-2 bg-[#F9A825] rounded-full border-2 border-white"></span>
                </button>
                <button onClick={() => triggerToast('القائمة')} className="w-9 h-9 bg-white border border-[#EEF0F3] rounded-[10px] grid place-items-center cursor-pointer hover:bg-gray-50">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7CB342" strokeWidth="2" strokeLinecap="round">
                    <line x1="4" y1="7" x2="20" y2="7"/>
                    <line x1="4" y1="12" x2="20" y2="12"/>
                    <line x1="4" y1="17" x2="20" y2="17"/>
                  </svg>
                </button>
              </div>

              {/* Brand Logo & Name */}
              <div className="flex items-center gap-2">
                <div className="text-left">
                  <b className="block text-[15px] font-black text-[#1F2937] leading-tight">نصر والت</b>
                  <small className="text-[10px] text-[#6B7280] font-bold">محفظتك أنت..</small>
                </div>
                <svg className="w-[58px] h-[34px] shrink-0" viewBox="0 0 100 60">
                  <defs>
                    <linearGradient id="gA" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#4CAF50"/>
                      <stop offset="1" stopColor="#2E7D32"/>
                    </linearGradient>
                    <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#FFD54F"/>
                      <stop offset="1" stopColor="#F9A825"/>
                    </linearGradient>
                  </defs>
                  <path d="M6 48 Q6 12 22 12 Q38 12 38 26 L38 48" stroke="url(#gA)" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="22" cy="40" r="5.5" fill="url(#gA)"/>
                  <path d="M44 14 L50 42 L56 22 L62 42 L68 14" stroke="url(#gA)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="68" y="20" width="28" height="22" rx="4" fill="url(#gB)" stroke="#8B5A00" strokeWidth="1.6"/>
                  <rect x="72" y="16" width="24" height="10" rx="3" fill="#FFD54F" stroke="#8B5A00" strokeWidth="1.4"/>
                  <circle cx="92" cy="31" r="2.2" fill="#8B5A00"/>
                </svg>
              </div>
            </div>

            {/* DAD SCREEN 1: الرئيسية */}
            {dadScreen === 'dad-home' && (
              <div>
                {/* Welcome */}
                <div className="px-4 py-2 flex justify-between items-center">
                  <div className="text-right">
                    <p className="text-[11px] text-[#6B7280] font-semibold m-0">اهلا وسهلا بك ...</p>
                    <p className="text-[16px] font-extrabold text-[#1F2937] m-0">نصر فضل</p>
                  </div>
                </div>

                {/* Currency Banner */}
                <div className="mx-3.5 my-2 bg-gradient-to-br from-[#7CB342] via-[#8BC34A] to-[#9CCC65] rounded-[16px] p-3 text-white flex justify-between items-center relative overflow-hidden shadow-md">
                  <div className="text-[14px] font-extrabold">ريال يمني</div>
                  <div className="flex gap-3 opacity-95">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 12s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7z"/>
                      <line x1="3" y1="3" x2="21" y2="21"/>
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
                      <circle cx="6" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18" cy="12" r="1"/>
                    </svg>
                  </div>
                </div>

                {/* Promo Banner */}
                <div className="mx-3.5 mb-3.5 bg-gradient-to-r from-[#B5C435] via-[#D4C52A] to-[#F0B429] rounded-[16px] p-3.5 text-white flex justify-between items-center relative overflow-hidden shadow-md min-h-[80px]">
                  <div className="text-[13px] font-extrabold leading-snug max-w-[65%] drop-shadow-sm">
                    لا تشيل هم المشتريات<br/>وسدد عبر نصر والت
                  </div>
                  <div className="opacity-95">
                    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#FFF8E1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1.6" fill="#FFF8E1"/>
                      <circle cx="19" cy="21" r="1.6" fill="#FFF8E1"/>
                      <path d="M2 3h3l2.4 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L22 6H6"/>
                    </svg>
                  </div>
                </div>

                {/* Services Grid (3 columns) */}
                <div className="grid grid-cols-3 gap-2 px-3.5 mb-4">
                  <button onClick={() => triggerToast('منصة التحصيلات')} className="bg-white rounded-[14px] p-3 flex flex-col items-center gap-1.5 shadow-xs hover:scale-[0.98] transition-all cursor-pointer">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7CB342" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-3-6.7"/><polyline points="21 3 21 9 15 9"/>
                    </svg>
                    <span className="text-[11px] font-bold text-center text-[#374151]">منصة<br/>التحصيلات</span>
                  </button>

                  <button onClick={() => triggerToast('دفع المشتريات')} className="bg-white rounded-[14px] p-3 flex flex-col items-center gap-1.5 shadow-xs hover:scale-[0.98] transition-all cursor-pointer">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7CB342" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 7h14l-1.2 11a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7z"/>
                      <path d="M9 7V5a3 3 0 0 1 6 0v2"/>
                      <circle cx="12" cy="13" r="2.2" fill="#F9A825" stroke="none"/>
                    </svg>
                    <span className="text-[11px] font-bold text-center text-[#374151]">دفع المشتريات</span>
                  </button>

                  <button onClick={() => triggerToast('حوالة لمشترك')} className="bg-white rounded-[14px] p-3 flex flex-col items-center gap-1.5 shadow-xs hover:scale-[0.98] transition-all cursor-pointer">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7CB342" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="14" cy="10" r="3.2"/>
                      <path d="M7.5 20c0-3.5 3-6 6.5-6"/>
                      <path d="M3 12h5M5 9l-2 3 2 3"/>
                    </svg>
                    <span className="text-[11px] font-bold text-center text-[#374151]">حوالة لمشترك</span>
                  </button>

                  <button onClick={() => triggerToast('حسابات البريد')} className="bg-white rounded-[14px] p-3 flex flex-col items-center gap-1.5 shadow-xs hover:scale-[0.98] transition-all cursor-pointer">
                    <svg width="36" height="36" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="14" fill="#2E7DB8"/>
                      <circle cx="20" cy="20" r="10" fill="#1D5E8E"/>
                      <text x="20" y="25" fontSize="12" fontWeight="900" fill="#FDD835" textAnchor="middle" fontFamily="Arial">ب</text>
                      <path d="M6 20 Q3 12 10 6" stroke="#FDD835" strokeWidth="2" fill="none" strokeLinecap="round"/>
                      <path d="M34 20 Q37 12 30 6" stroke="#FDD835" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>
                    <span className="text-[11px] font-bold text-center text-[#374151]">حسابات البريد</span>
                  </button>

                  <button onClick={() => triggerToast('سحب من محفظتي')} className="bg-white rounded-[14px] p-3 flex flex-col items-center gap-1.5 shadow-xs hover:scale-[0.98] transition-all cursor-pointer">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7CB342" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="9" r="3.2"/>
                      <path d="M6.5 19c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5"/>
                      <path d="M19 12l2 2-2 2" stroke="#F9A825"/>
                      <path d="M21 14h-3"/>
                    </svg>
                    <span className="text-[11px] font-bold text-center text-[#374151]">سحب من<br/>محفظتي</span>
                  </button>

                  <button onClick={() => triggerToast('سداد الفواتير')} className="bg-white rounded-[14px] p-3 flex flex-col items-center gap-1.5 shadow-xs hover:scale-[0.98] transition-all cursor-pointer">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0288D1" strokeWidth="1.5" strokeLinecap="round">
                      <circle cx="12" cy="12" r="8"/>
                      <circle cx="12" cy="12" r="3.5"/>
                      <line x1="12" y1="4" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="20"/>
                      <line x1="4" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="20" y2="12"/>
                    </svg>
                    <span className="text-[11px] font-bold text-center text-[#374151]">سداد الفواتير</span>
                  </button>

                  <button onClick={() => triggerToast('خدمات اخرى')} className="bg-white rounded-[14px] p-3 flex flex-col items-center gap-1.5 shadow-xs hover:scale-[0.98] transition-all cursor-pointer">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F9A825" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="3" width="8" height="8" rx="1.6"/>
                      <rect x="13" y="3" width="8" height="8" rx="1.6"/>
                      <rect x="3" y="13" width="8" height="8" rx="1.6"/>
                      <rect x="13" y="13" width="8" height="8" rx="1.6" stroke="#7CB342"/>
                    </svg>
                    <span className="text-[11px] font-bold text-center text-[#374151]">خدمات اخرى</span>
                  </button>

                  <button onClick={() => triggerToast('كشف الحساب')} className="bg-white rounded-[14px] p-3 flex flex-col items-center gap-1.5 shadow-xs hover:scale-[0.98] transition-all cursor-pointer">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#7CB342" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="3" width="14" height="18" rx="2"/>
                      <path d="M9 8h6M9 12h4"/>
                      <circle cx="15" cy="15" r="3" fill="#AED581" stroke="#7CB342"/>
                    </svg>
                    <span className="text-[11px] font-bold text-center text-[#374151]">كشف الحساب</span>
                  </button>

                  {/* Highlights: تقرير العائلة & تجربة العائلة */}
                  <button onClick={() => setDadScreen('dad-report')} className="bg-gradient-to-br from-[#FFF7E0] to-[#FFEFC2] border-[1.5px] border-[#F5B301] rounded-[14px] p-3 flex flex-col items-center gap-1.5 shadow-xs hover:scale-[0.98] transition-all cursor-pointer">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="8" r="3"/>
                      <circle cx="17" cy="9" r="2.4"/>
                      <path d="M3 19c0-3 2.8-5 6-5s6 2 6 5"/>
                      <path d="M15.5 19c0-2.2 1.8-4 4-4s2.5 1 2.5 1"/>
                    </svg>
                    <span className="text-[11px] font-bold text-center text-[#92400E]">تقرير<br/>العائلة</span>
                  </button>
                </div>

                {/* زر تجربة العائلة الأرجواني المباشر */}
                <div className="px-3.5 mb-3">
                  <button 
                    onClick={() => {
                      setCurrentApp('kids');
                      setKidScreen('k-home');
                      triggerToast('🎈 دخلت وضع تجربة تطبيق العائلة');
                    }}
                    className="w-full bg-gradient-to-r from-[#F3E5F5] to-[#EDE7F6] border-[1.5px] border-[#9575CD] rounded-[14px] p-3 flex items-center justify-between shadow-xs hover:scale-[0.99] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-[10px] bg-[#9575CD]/20 text-[#5E35B1] grid place-items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <circle cx="9" cy="8" r="3"/>
                          <circle cx="17" cy="9" r="2.5"/>
                          <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5"/>
                          <path d="M15 20c0-2 1.5-4 4-4"/>
                        </svg>
                      </div>
                      <div className="text-right">
                        <span className="text-[13px] font-bold text-[#5E35B1] block">تجربة تطبيق العائلة (كيدز)</span>
                        <small className="text-[10px] text-gray-500">شاهد تجربة الأطفال والحصالة والطلبات</small>
                      </div>
                    </div>
                    <span className="text-[12px] text-[#5E35B1] font-bold">دخول ⬅</span>
                  </button>
                </div>

                {/* Collapsible Transactions Button */}
                <button 
                  onClick={() => setIsTxOpen(!isTxOpen)}
                  className="flex items-center justify-center gap-2 mx-3.5 mb-3 p-3 bg-white border-[1.5px] border-dashed border-[#D1D5DB] rounded-[14px] font-bold text-[13px] text-[#558B2F] cursor-pointer w-[calc(100%-28px)] transition-all hover:bg-[#F0FDF4]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className={`transition-transform duration-300 ${isTxOpen ? 'rotate-180' : ''}`}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                  <span>{isTxOpen ? 'إخفاء آخر العمليات' : 'عرض آخر العمليات'}</span>
                </button>

                {/* Transactions Card */}
                {isTxOpen && (
                  <div className="bg-white rounded-[16px] mx-3.5 mb-4 px-4 py-2 shadow-xs border border-gray-100 animate-in fade-in duration-200">
                    <div className="flex items-center gap-3 py-3 border-b border-[#EEF0F3]">
                      <div className="w-10 h-10 rounded-[12px] bg-[#E8F5E9] grid place-items-center shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7CB342" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12a9 9 0 1 1-3-6.7"/><polyline points="21 3 21 9 15 9"/>
                        </svg>
                      </div>
                      <div className="flex-1 text-right">
                        <b className="block text-[12.5px] font-bold">سحب الأموال من الفرع</b>
                        <small className="text-[10.5px] text-[#6B7280]">اليوم · 11:45 ص</small>
                      </div>
                      <div className="text-[13.5px] font-black text-[#E53935]">-12950.0</div>
                    </div>

                    <div className="flex items-center gap-3 py-3 border-b border-[#EEF0F3]">
                      <div className="w-10 h-10 rounded-[12px] bg-[#FFF8E1] grid place-items-center shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F9A825" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 7h14l-1.2 11a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7z"/>
                          <path d="M9 7V5a3 3 0 0 1 6 0v2"/>
                        </svg>
                      </div>
                      <div className="flex-1 text-right">
                        <b className="block text-[12.5px] font-bold">دفع مشتريات — سوبر ماركت</b>
                        <small className="text-[10.5px] text-[#6B7280]">أمس · 8:30 م</small>
                      </div>
                      <div className="text-[13.5px] font-black text-[#E53935]">-350.0</div>
                    </div>

                    <div className="flex items-center gap-3 py-3">
                      <div className="w-10 h-10 rounded-[12px] bg-[#E8F5E9] grid place-items-center shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#558B2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 19V5M5 12l7-7 7 7"/>
                        </svg>
                      </div>
                      <div className="flex-1 text-right">
                        <b className="block text-[12.5px] font-bold">إيداع راتب</b>
                        <small className="text-[10.5px] text-[#6B7280]">قبل يومين</small>
                      </div>
                      <div className="text-[13.5px] font-black text-[#558B2F]">+25000.0</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* DAD SCREEN 2: تقرير العائلة */}
            {dadScreen === 'dad-report' && (
              <div className="animate-in fade-in">
                {/* Page Head */}
                <div className="bg-gradient-to-r from-[#7CB342] to-[#8BC34A] text-white p-4 pb-5 flex items-center gap-3">
                  <button onClick={() => setDadScreen('dad-home')} className="w-9 h-9 rounded-[11px] bg-white/20 text-white grid place-items-center cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M9 6l6 6-6 6"/>
                    </svg>
                  </button>
                  <div className="text-right">
                    <h2 className="text-[16px] font-extrabold m-0">📊 تقرير العائلة</h2>
                    <p className="text-[11px] m-0 opacity-90">كل بيانات أطفالك في مكان واحد</p>
                  </div>
                </div>

                <div className="p-3.5 space-y-3">
                  {/* Stat Row */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white rounded-[16px] p-2.5 shadow-xs border border-[#EEF0F3] text-right">
                      <small className="text-[10px] text-[#6B7280] font-bold">الأبناء المعتمدين</small>
                      <b className="block text-[17px] font-black text-[#558B2F] mt-0.5">{familyKids.length}</b>
                    </div>
                    <div className="bg-white rounded-[16px] p-2.5 shadow-xs border border-[#EEF0F3] text-right">
                      <small className="text-[10px] text-[#6B7280] font-bold">إجمالي أرصدتهم</small>
                      <b className="block text-[15px] font-black text-[#0B5FA5] mt-0.5">
                        {familyKids.reduce((s, k) => s + k.balance, 0)} <span className="text-[10px]">ر.ي</span>
                      </b>
                    </div>
                    <div className="bg-white rounded-[16px] p-2.5 shadow-xs border border-[#EEF0F3] text-right">
                      <small className="text-[10px] text-[#6B7280] font-bold">قيد الاعتماد</small>
                      <b className="block text-[17px] font-black text-[#B45309] mt-0.5">{pendingSubscriptions.length}</b>
                    </div>
                  </div>

                  {/* Add Child CTA Button */}
                  <button 
                    onClick={() => setIsAddChildModalOpen(true)}
                    className="w-full bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white p-3 rounded-[15px] flex items-center justify-between shadow-md cursor-pointer hover:opacity-95 transition-all active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 grid place-items-center text-white text-lg font-bold">
                        +
                      </div>
                      <div className="text-right">
                        <span className="text-[13px] font-black block">طلب إضافة ابن / اشتراك عائلي</span>
                        <small className="text-[10px] opacity-90">يتم إرساله للاعتماد والموافقة المركزية</small>
                      </div>
                    </div>
                    <span className="text-[11px] bg-white/25 px-2.5 py-1 rounded-full font-extrabold">طلب جديد ↵</span>
                  </button>

                  {/* Kids List Section */}
                  <div className="text-right flex items-center justify-between pt-1">
                    <h3 className="text-[14px] font-extrabold text-[#1F2937] m-0">الأبناء المعتمدين والمربوطين 👦👧</h3>
                    <span className="text-[10.5px] text-[#6B7280] font-bold">بيانات خاصة بالأب فقط</span>
                  </div>

                  {/* Family Members Cards */}
                  <div className="space-y-2.5">
                    {familyKids.map(kid => (
                      <div key={kid.id} className={`bg-white rounded-[16px] p-3 shadow-xs border transition-all ${kid.isFrozen ? 'border-red-300 bg-red-50/30' : 'border-[#EEF0F3]'}`}>
                        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-full grid place-items-center shrink-0 border-2 border-white shadow-xs" style={{ backgroundColor: kid.avatarColor }}>
                              <span className="text-[14px] font-black text-gray-700">{kid.name[0]}</span>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1.5">
                                <b className="text-[13.5px] font-black text-gray-800">{kid.name}</b>
                                <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full font-bold">{kid.relation}</span>
                              </div>
                              <small className="text-[#6B7280] text-[10.5px]">{kid.age} سنوات · {kid.isFrozen ? 'حساب موقوف ⛔' : 'حساب نشط ومفعّل ✓'}</small>
                            </div>
                          </div>
                          
                          <div className="text-left">
                            <div className={`text-[15px] font-black ${kid.isFrozen ? 'text-gray-400 line-through' : 'text-[#2E7D32]'}`}>
                              {kid.balance} <span className="text-[10px]">ر.ي</span>
                            </div>
                            {kid.heldAmount > 0 && (
                              <div className="text-[10px] font-extrabold text-amber-600">
                                🔒 محجوز: {kid.heldAmount} ر.ي
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Direct Controls for Dad: تحويل، توقيف، حجز */}
                        <div className="flex items-center gap-1.5 pt-2.5">
                          {/* 1. Transfer Button */}
                          <button
                            disabled={kid.isFrozen}
                            onClick={() => setTransferModal({ open: true, kidId: kid.id, kidName: kid.name, amount: '' })}
                            className={`flex-1 py-1.5 px-2 rounded-[10px] text-[11px] font-black flex items-center justify-center gap-1 transition-all ${
                              kid.isFrozen 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#C8E6C9] cursor-pointer'
                            }`}
                          >
                            <span>💸</span>
                            <span>تحويل</span>
                          </button>

                          {/* 2. Freeze / Unfreeze Button */}
                          <button
                            onClick={() => handleToggleFreezeKid(kid.id)}
                            className={`flex-1 py-1.5 px-2 rounded-[10px] text-[11px] font-black flex items-center justify-center gap-1 transition-all cursor-pointer ${
                              kid.isFrozen
                                ? 'bg-[#DCFCE7] text-[#16A34A] hover:bg-[#BBF7D0]'
                                : 'bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FECACA]'
                            }`}
                          >
                            <span>{kid.isFrozen ? '▶️' : '⏸️'}</span>
                            <span>{kid.isFrozen ? 'إلغاء التوقيف' : 'توقيف الحساب'}</span>
                          </button>

                          {/* 3. Hold / Release Button */}
                          {kid.heldAmount > 0 ? (
                            <button
                              onClick={() => handleReleaseKidHold(kid.id)}
                              className="flex-1 py-1.5 px-2 rounded-[10px] text-[11px] font-black bg-[#FEF3C7] text-[#B45309] hover:bg-[#FDE68A] flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>🔓</span>
                              <span>فك الحجز</span>
                            </button>
                          ) : (
                            <button
                              disabled={kid.isFrozen || kid.balance <= 0}
                              onClick={() => setHoldModal({ open: true, kidId: kid.id, kidName: kid.name, amount: '' })}
                              className={`flex-1 py-1.5 px-2 rounded-[10px] text-[11px] font-black flex items-center justify-center gap-1 transition-all ${
                                kid.isFrozen || kid.balance <= 0
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-[#FFFBEB] text-[#D97706] hover:bg-[#FEF3C7] cursor-pointer'
                              }`}
                            >
                              <span>🔒</span>
                              <span>حجز مبلغ</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Section: Subscription Requests Pending Central Approval */}
                  <div className="pt-2">
                    <div className="text-right flex items-center justify-between mb-1.5">
                      <h3 className="text-[13.5px] font-extrabold text-[#1F2937] m-0">طلبات اشتراك قيد الاعتماد المركزي ⏳</h3>
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                        {pendingSubscriptions.length} طلب
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 m-0 mb-2 leading-tight">
                      * بقية البيانات الإدارية والرقابية محفوظة في النظام المركزي فقط، ويظهر الحساب والرصيد للأب بمجرد القبول والاعتماد.
                    </p>

                    {pendingSubscriptions.length === 0 ? (
                      <div className="bg-white p-3 rounded-[14px] text-center text-[#6B7280] text-[11.5px] border border-gray-100">
                        لا توجد طلبات اشتراك معلقة حالياً ✓
                      </div>
                    ) : (
                      pendingSubscriptions.map(sub => (
                        <div key={sub.id} className="bg-amber-50/70 border border-amber-200 rounded-[14px] p-2.5 mb-2 flex items-center justify-between">
                          <div className="text-right">
                            <b className="text-[12.5px] font-extrabold text-amber-900 block">{sub.name} ({sub.relation})</b>
                            <small className="text-[10px] text-amber-700 block">
                              مصروف مقترح: {sub.allowance} ر.ي · {sub.date}
                            </small>
                            <span className="inline-block mt-1 text-[9.5px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                              ⏳ بانتظار موافقة النظام المركزي
                            </span>
                          </div>

                          {/* Quick Demo Simulator for central approval */}
                          <button
                            onClick={() => handleSimulateCentralApproval(sub.id)}
                            className="bg-[#2E7D32] text-white px-2.5 py-1.5 rounded-[9px] text-[10px] font-extrabold shadow-xs hover:bg-[#1B5E20] cursor-pointer"
                            title="محاكاة موافقة النظام المركزي فوراً"
                          >
                            اعتماد تجريبي ✓
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Pending Purchase/Allowance Requests from Kids */}
                  <div className="text-right pt-2">
                    <h3 className="text-[14px] font-extrabold text-[#1F2937] m-0 mb-1.5">طلبات شراء ومصروف من الأبناء 📝</h3>
                  </div>

                  {familyRequests.length === 0 ? (
                    <div className="bg-white p-3 rounded-[14px] text-center text-[#6B7280] text-[11.5px] border border-gray-100">
                      لا توجد طلبات شراء معلقة حالياً ✓
                    </div>
                  ) : (
                    familyRequests.map(req => (
                      <div key={req.id} className="bg-white rounded-[14px] p-3 shadow-xs border border-[#EEF0F3] flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-[11px] bg-[#E8F5E9] grid place-items-center shrink-0 text-[#558B2F]">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>
                          </svg>
                        </div>
                        <div className="flex-1 text-right">
                          <b className="block text-[12.5px] font-extrabold">{req.kid} — {req.category}</b>
                          <small className="text-[10.5px] text-[#6B7280]">{req.amount} ر.ي · {req.note}</small>
                        </div>
                        <div className="flex gap-1.5">
                          <button onClick={() => handleApproveFamilyRequest(req)} className="bg-[#7CB342] text-white px-2.5 py-1.5 rounded-[9px] font-extrabold text-[10.5px] cursor-pointer">قبول</button>
                          <button onClick={() => handleRejectFamilyRequest(req.id)} className="bg-[#FEE2E2] text-[#E53935] px-2.5 py-1.5 rounded-[9px] font-extrabold text-[10.5px] cursor-pointer">رفض</button>
                        </div>
                      </div>
                    ))
                  )}

                  {/* Demo Button to enter Kids app */}
                  <button 
                    onClick={() => {
                      setCurrentApp('kids');
                      setKidScreen('k-home');
                      triggerToast('🎈 دخلت وضع تجربة تطبيق العائلة (كيدز)');
                    }}
                    className="w-full bg-gradient-to-r from-[#F9A825] to-[#FBC02D] text-[#1F2937] rounded-[16px] p-3 flex items-center justify-center gap-2 font-black text-[13.5px] shadow-md cursor-pointer mt-2 active:scale-98"
                  >
                    <span>🎈 فتح واجهة تطبيق العائلة والطفل</span>
                  </button>
                </div>
              </div>
            )}

            {/* Dad's Bottom Bar */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-10">
              <div className="bg-white rounded-t-[20px] px-4 py-2.5 flex items-center justify-between relative shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
                <div className="text-right max-w-[100px] leading-tight">
                  <span className="text-[10.5px] font-bold text-[#1F2937]">سحب الأموال من المحفظة في الفرع</span>
                </div>

                {/* Central Floating Gold Button */}
                <button 
                  onClick={() => triggerToast('إضافة عملية جديدة')} 
                  className="absolute -top-6 left-1/2 -translate-x-1/2 w-[54px] h-[54px] rounded-full bg-gradient-to-br from-[#F9A825] to-[#FBC02D] border-4 border-white grid place-items-center shadow-lg cursor-pointer active:scale-95"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </button>

                <div className="text-left max-w-[100px]">
                  <span className="text-[12.5px] font-black text-[#E53935] block leading-tight">12950.0-</span>
                  <small className="text-[9px] text-[#6B7280] font-semibold">ر.ي</small>
                </div>
              </div>

              {/* Bottom Nav */}
              <nav className="bg-white flex justify-around py-1.5 border-t border-[#EEF0F3]">
                <button onClick={() => triggerToast('حسابي')} className="text-[#9CA3AF] flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer py-1">
                  <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/>
                  </svg>
                  <span>حسابي</span>
                </button>
                <button onClick={() => triggerToast('المفضلة')} className="text-[#9CA3AF] flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer py-1">
                  <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20s-7-4.5-7-10a4.5 4.5 0 0 1 7-3.5A4.5 4.5 0 0 1 19 10c0 5.5-7 10-7 10z"/>
                  </svg>
                  <span>المفضلة</span>
                </button>
                <button onClick={() => triggerToast('الفروع')} className="text-[#9CA3AF] flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer py-1">
                  <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>
                  </svg>
                  <span>الفروع</span>
                </button>
                <button onClick={() => setDadScreen('dad-home')} className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer py-1 ${dadScreen === 'dad-home' ? 'text-[#558B2F]' : 'text-[#9CA3AF]'}`}>
                  <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/>
                  </svg>
                  <span>الرئيسية</span>
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* ==================== 2. تطبيق العائلة =================== */}
        {/* ======================================================== */}
        {currentApp === 'kids' && (
          <div className="animate-in fade-in">
            {/* Demo Mode Top Badge */}
            <div className="bg-gradient-to-r from-[#F9A825] to-[#FBC02D] text-[#1F2937] px-3.5 py-1.5 text-[11px] font-extrabold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                </svg>
                وضع تجربة تطبيق العائلة (كيدز)
              </span>
              <button 
                onClick={() => {
                  setCurrentApp('dad');
                  setDadScreen('dad-report');
                  triggerToast('👨 رجعت لتطبيق الأب');
                }}
                className="bg-black/15 text-[#1F2937] px-2.5 py-0.5 rounded-full text-[11px] font-bold cursor-pointer"
              >
                رجوع للأب ↩
              </button>
            </div>

            {/* KIDS SCREEN 1: الرئيسية */}
            {kidScreen === 'k-home' && (
              <div>
                <header className="bg-gradient-to-br from-[#0B5FA5] to-[#083E6E] text-white px-4 pt-4 pb-16 rounded-b-[26px] relative overflow-hidden">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 bg-[#F9A825] rounded-[12px] grid place-items-center shadow-md">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="6" width="18" height="13" rx="3" fill="#0B5FA5"/>
                          <circle cx="16" cy="12.5" r="2" fill="#F5B301"/>
                        </svg>
                      </div>
                      <div className="text-right">
                        <b className="text-[14px] block leading-tight">نصر والت كيدز</b>
                        <span className="text-[10.5px] opacity-85">Nasr Wallet Kids</span>
                      </div>
                    </div>
                    <button onClick={() => triggerToast('🧒 الإشعارات')} className="w-9 h-9 rounded-[11px] bg-white/15 text-white grid place-items-center cursor-pointer">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
                      </svg>
                    </button>
                  </div>
                  <div className="relative z-10 mt-4 text-right">
                    <h2 className="text-[19px] font-extrabold m-0">هلا يا بطل 👋</h2>
                    <p className="text-[12.5px] opacity-90 m-0 mt-1">إيش تحب تسوي اليوم؟</p>
                  </div>
                </header>

                {/* Kid Balance Card */}
                <div className="-mt-12 px-4 relative z-20">
                  <div className="bg-white rounded-[20px] p-4 shadow-md border border-[#E5E9F0] flex justify-between items-center">
                    <div className="text-right">
                      <small className="text-[#64748B] text-[11.5px]">رصيدي الحالي</small>
                      <div className="text-[24px] font-black text-[#0B5FA5] mt-1 flex items-baseline gap-1.5">
                        {kidBalance} <span className="text-[13px] font-bold text-[#64748B]">ريال</span>
                      </div>
                    </div>
                    <div className="w-14 h-14 bg-[#E6F0FA] rounded-[17px] grid place-items-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="6" width="18" height="13" rx="3" stroke="#0B5FA5" strokeWidth="1.8"/>
                        <circle cx="16" cy="12.5" r="2" fill="#F5B301"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Quick Kids Services */}
                <div className="p-4 space-y-4">
                  <div className="text-right">
                    <h3 className="text-[14.5px] font-extrabold m-0">خدماتي</h3>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <button onClick={() => setKidScreen('k-request')} className="bg-white border border-[#E5E9F0] rounded-[17px] p-2.5 flex flex-col items-center gap-1.5 cursor-pointer hover:scale-95 transition-all">
                      <div className="w-11 h-11 rounded-[13px] bg-[#E6F0FA] grid place-items-center">
                        <svg width="24" height="24" viewBox="0 0 100 100">
                          <rect x="18" y="28" width="64" height="46" rx="8" fill="#FFD166" stroke="#0B5FA5" strokeWidth="4"/>
                          <path d="M18 40 L50 62 L82 40" fill="none" stroke="#0B5FA5" strokeWidth="4" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <span className="text-[10.5px] font-bold text-center leading-tight">طلب مصروف</span>
                    </button>

                    <button onClick={() => setKidScreen('k-buy')} className="bg-white border border-[#E5E9F0] rounded-[17px] p-2.5 flex flex-col items-center gap-1.5 cursor-pointer hover:scale-95 transition-all">
                      <div className="w-11 h-11 rounded-[13px] bg-[#DCFCE7] grid place-items-center">
                        <svg width="24" height="24" viewBox="0 0 100 100">
                          <path d="M20 30 L30 30 L40 65 L78 65 L85 35 L35 35" fill="#FFD166" stroke="#0B5FA5" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
                          <circle cx="44" cy="78" r="6" fill="#0B5FA5"/><circle cx="72" cy="78" r="6" fill="#0B5FA5"/>
                        </svg>
                      </div>
                      <span className="text-[10.5px] font-bold text-center leading-tight">شراء</span>
                    </button>

                    <button onClick={() => setKidScreen('k-transfer')} className="bg-white border border-[#E5E9F0] rounded-[17px] p-2.5 flex flex-col items-center gap-1.5 cursor-pointer hover:scale-95 transition-all">
                      <div className="w-11 h-11 rounded-[13px] bg-[#FFF4D6] grid place-items-center">
                        <svg width="24" height="24" viewBox="0 0 100 100">
                          <circle cx="35" cy="42" r="14" fill="#FDE68A" stroke="#0B5FA5" strokeWidth="4"/>
                          <circle cx="65" cy="42" r="14" fill="#BFDBFE" stroke="#0B5FA5" strokeWidth="4"/>
                          <path d="M18 82 Q35 60 50 82" fill="none" stroke="#0B5FA5" strokeWidth="4" strokeLinecap="round"/>
                          <path d="M50 82 Q65 60 82 82" fill="none" stroke="#0B5FA5" strokeWidth="4" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <span className="text-[10.5px] font-bold text-center leading-tight">تحويل</span>
                    </button>

                    <button onClick={() => setKidScreen('k-savings')} className="bg-white border border-[#E5E9F0] rounded-[17px] p-2.5 flex flex-col items-center gap-1.5 cursor-pointer hover:scale-95 transition-all">
                      <div className="w-11 h-11 rounded-[13px] bg-[#FCE7F3] grid place-items-center">
                        <svg width="24" height="24" viewBox="0 0 100 100">
                          <ellipse cx="50" cy="55" rx="32" ry="24" fill="#F9A8D4" stroke="#0B5FA5" strokeWidth="4"/>
                          <circle cx="42" cy="50" r="4" fill="#0B5FA5"/>
                          <ellipse cx="62" cy="55" rx="5" ry="4" fill="#0B5FA5"/>
                          <path d="M50 32 L55 40 L45 40 Z" fill="#F5B301" stroke="#0B5FA5" strokeWidth="3" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-[10.5px] font-bold text-center leading-tight">حصالة</span>
                    </button>
                  </div>

                  {/* Family Members Row */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-[14.5px] font-extrabold m-0">عائلتي</h3>
                    <a onClick={() => setKidScreen('k-transfer')} className="text-[12px] text-[#0B5FA5] font-bold cursor-pointer">عرض الكل</a>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setKidScreen('k-transfer')} className="bg-white border border-[#E5E9F0] rounded-[20px] p-3.5 text-center shadow-xs cursor-pointer hover:scale-98 transition-all">
                      <div className="w-16 h-16 rounded-full mx-auto mb-2 bg-[#FDE68A] grid place-items-center border-2 border-white shadow-xs">
                        <svg width="54" height="54" viewBox="0 0 100 100">
                          <circle cx="50" cy="42" r="18" fill="#FFF" stroke="#0B5FA5" strokeWidth="4"/>
                          <path d="M22 90 Q50 60 78 90" fill="none" stroke="#0B5FA5" strokeWidth="4" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <b className="block text-[13.5px]">ماما</b>
                      <small className="text-[#64748B] text-[10.5px]">متاحة الآن</small>
                      <div className="inline-block mt-2 bg-[#E6F0FA] text-[#0B5FA5] text-[10px] font-extrabold px-2.5 py-1 rounded-full">حوّل لها</div>
                    </button>

                    <button onClick={() => setKidScreen('k-transfer')} className="bg-white border border-[#E5E9F0] rounded-[20px] p-3.5 text-center shadow-xs cursor-pointer hover:scale-98 transition-all">
                      <div className="w-16 h-16 rounded-full mx-auto mb-2 bg-[#BFDBFE] grid place-items-center border-2 border-white shadow-xs">
                        <svg width="54" height="54" viewBox="0 0 100 100">
                          <circle cx="50" cy="42" r="18" fill="#FFF" stroke="#0B5FA5" strokeWidth="4"/>
                          <path d="M22 90 Q50 60 78 90" fill="none" stroke="#0B5FA5" strokeWidth="4" strokeLinecap="round"/>
                          <circle cx="50" cy="20" r="6" fill="#F5B301"/>
                        </svg>
                      </div>
                      <b className="block text-[13.5px]">أخي</b>
                      <small className="text-[#64748B] text-[10.5px]">متاح الآن</small>
                      <div className="inline-block mt-2 bg-[#E6F0FA] text-[#0B5FA5] text-[10px] font-extrabold px-2.5 py-1 rounded-full">حوّل له</div>
                    </button>
                  </div>

                  {/* Recent Kid Transactions */}
                  <div className="flex justify-between items-center pt-2">
                    <h3 className="text-[14.5px] font-extrabold m-0">آخر العمليات</h3>
                    <a onClick={() => setKidScreen('k-history')} className="text-[12px] text-[#0B5FA5] font-bold cursor-pointer">الكل</a>
                  </div>

                  <div className="bg-white rounded-[20px] p-3 border border-[#E5E9F0] shadow-xs divide-y divide-[#E5E9F0]">
                    <div className="flex justify-between items-center py-2.5">
                      <div className="flex items-center gap-2.5 text-right">
                        <div className="w-10 h-10 rounded-[11px] bg-[#E6F0FA] text-[#0B5FA5] grid place-items-center">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                        </div>
                        <div>
                          <b className="text-[12.5px] block">مصروف من بابا</b>
                          <small className="text-[#64748B] text-[10.5px]">اليوم</small>
                        </div>
                      </div>
                      <div className="font-black text-[13.5px] text-[#16A34A]">+50</div>
                    </div>

                    <div className="flex justify-between items-center py-2.5">
                      <div className="flex items-center gap-2.5 text-right">
                        <div className="w-10 h-10 rounded-[11px] bg-[#DCFCE7] text-[#16A34A] grid place-items-center">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6h15l-2 9H8z"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>
                        </div>
                        <div>
                          <b className="text-[12.5px] block">شراء بقالة</b>
                          <small className="text-[#64748B] text-[10.5px]">اليوم</small>
                        </div>
                      </div>
                      <div className="font-black text-[13.5px] text-[#DC2626]">-35</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* KIDS SCREEN 2: شراء */}
            {kidScreen === 'k-buy' && (
              <div>
                <div className="bg-gradient-to-r from-[#0B5FA5] to-[#083E6E] text-white p-4 flex items-center gap-3">
                  <button onClick={() => setKidScreen('k-home')} className="w-9 h-9 rounded-[11px] bg-white/15 grid place-items-center cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M9 6l6 6-6 6"/></svg>
                  </button>
                  <div className="text-right">
                    <h2 className="text-[16px] font-extrabold m-0">🛒 شراء</h2>
                    <p className="text-[11px] opacity-90 m-0">اختار إيش تبي تشتري</p>
                  </div>
                </div>

                <div className="p-3.5 grid grid-cols-2 gap-2.5">
                  {[
                    { name: 'بقالة', emoji: '🛒', desc: 'خضار · أكل · مشروبات', bg: '#DCFCE7' },
                    { name: 'ملابس', emoji: '👕', desc: 'قمصان · بناطيل', bg: '#FCE7F3' },
                    { name: 'ألعاب', emoji: '🧸', desc: 'دباديب · سيارات', bg: '#FFF4D6' },
                    { name: 'مسلسل أطفال', emoji: '📺', desc: 'كرتون · أناشيد', bg: '#E6F0FA' },
                    { name: 'قنوات أطفال', emoji: '📡', desc: 'اشتراك شهري', bg: '#EDE9FE' },
                    { name: 'بلاستيشن', emoji: '🎮', desc: 'ألعاب · اشتراك', bg: '#DBEAFE' },
                    { name: 'كتب ومدرسة', emoji: '📚', desc: 'دفاتر · أقلام', bg: '#FFEDD5' },
                    { name: 'حلوى', emoji: '🍭', desc: 'شوكولا · بسكوت', bg: '#FEE2E2' }
                  ].map(item => (
                    <button 
                      key={item.name}
                      onClick={() => {
                        setSelectedKidCategory({ name: item.name, emoji: item.emoji });
                        setKidScreen('k-buyForm');
                      }}
                      className="bg-white border border-[#E5E9F0] rounded-[19px] p-3 text-center cursor-pointer hover:scale-95 transition-all shadow-xs flex flex-col items-center gap-1.5"
                    >
                      <div className="w-14 h-14 rounded-[17px] grid place-items-center text-2xl" style={{ backgroundColor: item.bg }}>
                        {item.emoji}
                      </div>
                      <b className="text-[12.5px] font-extrabold">{item.name}</b>
                      <small className="text-[10px] text-[#64748B]">{item.desc}</small>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* KIDS SCREEN 3: نموذج الشراء */}
            {kidScreen === 'k-buyForm' && (
              <div>
                <div className="bg-gradient-to-r from-[#0B5FA5] to-[#083E6E] text-white p-4 flex items-center gap-3">
                  <button onClick={() => setKidScreen('k-buy')} className="w-9 h-9 rounded-[11px] bg-white/15 grid place-items-center cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M9 6l6 6-6 6"/></svg>
                  </button>
                  <div className="text-right">
                    <h2 className="text-[16px] font-extrabold m-0">{selectedKidCategory.emoji} {selectedKidCategory.name}</h2>
                    <p className="text-[11px] opacity-90 m-0">املأ التفاصيل وأرسل الطلب</p>
                  </div>
                </div>

                <div className="p-3.5">
                  <div className="bg-white rounded-[20px] p-4 border border-[#E5E9F0] shadow-xs space-y-3.5 text-right">
                    <div>
                      <label className="text-[12.5px] font-bold block mb-1">القسم</label>
                      <div className="p-3 bg-[#E6F0FA] text-[#0B5FA5] rounded-[13px] font-extrabold text-center text-[13px]">
                        {selectedKidCategory.emoji} {selectedKidCategory.name}
                      </div>
                    </div>

                    <div>
                      <label className="text-[12.5px] font-bold block mb-1">المبلغ</label>
                      <div className="flex items-center gap-2 bg-white border border-[#E5E9F0] rounded-[13px] px-3 py-1">
                        <input 
                          type="number" 
                          value={kidBuyAmount} 
                          onChange={(e) => setKidBuyAmount(e.target.value)} 
                          placeholder="0" 
                          className="w-full text-[21px] font-black text-[#0B5FA5] outline-none"
                        />
                        <span className="text-[#64748B] font-bold text-[13px]">ريال</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[12.5px] font-bold block mb-1">تفاصيل الطلب ✍️</label>
                      <textarea 
                        rows={3} 
                        value={kidBuyNote} 
                        onChange={(e) => setKidBuyNote(e.target.value)} 
                        placeholder="مثال: أبي حليب وخبز وفواكه..."
                        className="w-full p-3 rounded-[13px] border border-[#E5E9F0] text-[13px] outline-none focus:border-[#0B5FA5]"
                      />
                    </div>

                    <div>
                      <label className="text-[12.5px] font-bold block mb-1">مين يدفع؟</label>
                      <div className="flex gap-2">
                        {(['بابا', 'ماما', 'رصيدي'] as const).map(p => (
                          <button
                            key={p}
                            onClick={() => setKidBuyPayer(p)}
                            className={`flex-1 py-2 rounded-full border text-[12px] font-bold cursor-pointer transition-all ${
                              kidBuyPayer === p ? 'border-[#0B5FA5] bg-[#E6F0FA] text-[#0B5FA5]' : 'border-[#E5E9F0] text-[#64748B]'
                            }`}
                          >
                            {p === 'بابا' ? 'بابا 👨' : p === 'ماما' ? 'ماما 👩' : 'من رصيدي 💰'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        if (!kidBuyAmount || Number(kidBuyAmount) <= 0) return triggerToast('اكتب المبلغ 😊');
                        if (!kidBuyNote.trim()) return triggerToast('اكتب تفاصيل الطلب ✍️');
                        
                        // Add to family requests
                        setFamilyRequests(prev => [
                          ...prev,
                          {
                            id: Date.now(),
                            kid: 'أحمد',
                            category: selectedKidCategory.name,
                            amount: Number(kidBuyAmount),
                            note: kidBuyNote
                          }
                        ]);

                        triggerToast(`تم إرسال طلب ${selectedKidCategory.name} إلى ${kidBuyPayer} ✅`);
                        setKidBuyAmount('');
                        setKidBuyNote('');
                        setKidScreen('k-home');
                      }}
                      className="w-full py-3.5 bg-[#0B5FA5] text-white rounded-[15px] font-extrabold text-[14.5px] shadow-md cursor-pointer hover:bg-[#084E8A]"
                    >
                      إرسال طلب الشراء
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* KIDS SCREEN 4: الحصالة */}
            {kidScreen === 'k-savings' && (
              <div>
                <div className="bg-gradient-to-r from-[#0B5FA5] to-[#083E6E] text-white p-4 flex items-center gap-3">
                  <button onClick={() => setKidScreen('k-home')} className="w-9 h-9 rounded-[11px] bg-white/15 grid place-items-center cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M9 6l6 6-6 6"/></svg>
                  </button>
                  <div className="text-right">
                    <h2 className="text-[16px] font-extrabold m-0">🐷 حصالة التوفير</h2>
                    <p className="text-[11px] opacity-90 m-0">وفّر عشان تشتري اللي تحلم به</p>
                  </div>
                </div>

                <div className="p-3.5 space-y-3.5 text-right">
                  <div className="bg-gradient-to-br from-[#FCE7F3] to-[#FFF0F6] rounded-[22px] p-4 border-2 border-[#FBCFE8] text-center">
                    <svg className="mx-auto" width="100" height="82" viewBox="0 0 110 90">
                      <ellipse cx="55" cy="55" rx="38" ry="26" fill="#F9A8D4" stroke="#0B5FA5" strokeWidth="4"/>
                      <circle cx="45" cy="50" r="5" fill="#0B5FA5"/>
                      <ellipse cx="72" cy="55" rx="6" ry="5" fill="#0B5FA5"/>
                      <path d="M55 27 L62 38 L48 38 Z" fill="#F5B301" stroke="#0B5FA5" strokeWidth="3" strokeLinejoin="round"/>
                    </svg>
                    <div className="text-[28px] font-black text-[#EC4899] my-1">{kidSavings} ريال</div>
                    <div className="text-[11.5px] text-[#64748B] font-bold">الهدف: 200 ريال 🎮</div>
                    <div className="h-3 bg-white rounded-full overflow-hidden my-3 border border-[#FBCFE8]">
                      <div className="h-full bg-gradient-to-r from-[#EC4899] to-[#F472B6] rounded-full" style={{ width: `${Math.min(100, (kidSavings / 200) * 100)}%` }}></div>
                    </div>
                    <small className="text-[#EC4899] font-bold text-[11px]">{Math.round((kidSavings / 200) * 100)}% من هدفك</small>
                  </div>

                  <div className="bg-white rounded-[20px] p-4 border border-[#E5E9F0] shadow-xs">
                    <h3 className="text-[14.5px] font-extrabold m-0 mb-3">أضف مبلغ للحصالة</h3>
                    <div className="flex items-center gap-2 bg-white border border-[#E5E9F0] rounded-[13px] px-3 py-1 mb-3">
                      <input 
                        type="number" 
                        value={kidSavInput} 
                        onChange={(e) => setKidSavInput(e.target.value)} 
                        placeholder="0" 
                        className="w-full text-[21px] font-black text-[#0B5FA5] outline-none"
                      />
                      <span className="text-[#64748B] font-bold text-[13px]">ريال</span>
                    </div>
                    <button 
                      onClick={() => {
                        const amt = Number(kidSavInput);
                        if (!amt || amt <= 0) return triggerToast('اكتب المبلغ 😊');
                        if (kidBalance < amt) return triggerToast('رصيدك غير كافٍ للادخار');
                        setKidBalance(prev => prev - amt);
                        setKidSavings(prev => prev + amt);
                        setKidSavInput('');
                        triggerToast(`تم إضافة ${amt} ريال للحصالة 🐷`);
                      }}
                      className="w-full py-3.5 bg-[#F9A825] text-[#1F2937] rounded-[15px] font-extrabold text-[14px] shadow-md cursor-pointer hover:bg-[#FBC02D]"
                    >
                      💰 ضع في الحصالة
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* KIDS SCREEN 5: طلب مصروف */}
            {kidScreen === 'k-request' && (
              <div>
                <div className="bg-gradient-to-r from-[#0B5FA5] to-[#083E6E] text-white p-4 flex items-center gap-3">
                  <button onClick={() => setKidScreen('k-home')} className="w-9 h-9 rounded-[11px] bg-white/15 grid place-items-center cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M9 6l6 6-6 6"/></svg>
                  </button>
                  <div className="text-right">
                    <h2 className="text-[16px] font-extrabold m-0">اطلب مصروف من بابا</h2>
                    <p className="text-[11px] opacity-90 m-0">بابا راح يستلم طلبك فوراً</p>
                  </div>
                </div>

                <div className="p-3.5">
                  <div className="bg-white rounded-[20px] p-4 border border-[#E5E9F0] shadow-xs space-y-3.5 text-right">
                    <div>
                      <label className="text-[12.5px] font-bold block mb-1">المبلغ المطلوب</label>
                      <div className="flex items-center gap-2 bg-white border border-[#E5E9F0] rounded-[13px] px-3 py-1">
                        <input 
                          type="number" 
                          value={kidReqAmount} 
                          onChange={(e) => setKidReqAmount(e.target.value)} 
                          placeholder="0" 
                          className="w-full text-[21px] font-black text-[#0B5FA5] outline-none"
                        />
                        <span className="text-[#64748B] font-bold text-[13px]">ريال</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[12.5px] font-bold block mb-1">مبالغ سريعة</label>
                      <div className="flex gap-2">
                        {[10, 20, 50, 100].map(v => (
                          <button 
                            key={v} 
                            onClick={() => setKidReqAmount(String(v))}
                            className="flex-1 py-2 bg-white border border-[#E5E9F0] rounded-full text-[12.5px] font-bold text-[#64748B] cursor-pointer hover:border-[#0B5FA5] hover:text-[#0B5FA5]"
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[12.5px] font-bold block mb-1">السبب ✍️</label>
                      <textarea 
                        rows={3} 
                        value={kidReqReason} 
                        onChange={(e) => setKidReqReason(e.target.value)} 
                        placeholder="مثال: أبي أشتري دفتر وقلم..."
                        className="w-full p-3 rounded-[13px] border border-[#E5E9F0] text-[13px] outline-none focus:border-[#0B5FA5]"
                      />
                    </div>

                    <div>
                      <label className="text-[12.5px] font-bold block mb-1">أسباب سريعة</label>
                      <div className="flex gap-2 flex-wrap">
                        {['مصروف المدرسة', 'دفتر وقلم', 'لعبة تعليمية', 'هدية لماما'].map(r => (
                          <button 
                            key={r}
                            onClick={() => setKidReqReason(prev => prev ? `${prev} - ${r}` : r)}
                            className="px-3 py-1.5 bg-white border border-[#E5E9F0] rounded-full text-[12px] font-bold text-[#64748B] cursor-pointer hover:border-[#0B5FA5] hover:text-[#0B5FA5]"
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        if (!kidReqAmount || Number(kidReqAmount) <= 0) return triggerToast('اكتب المبلغ أولاً 😊');
                        if (!kidReqReason.trim()) return triggerToast('اكتب سبب الطلب ✍️');

                        setFamilyRequests(prev => [
                          ...prev,
                          {
                            id: Date.now(),
                            kid: 'أحمد',
                            category: 'مصروف',
                            amount: Number(kidReqAmount),
                            note: kidReqReason
                          }
                        ]);

                        triggerToast('تم إرسال الطلب لبابا ✅');
                        setKidReqAmount('');
                        setKidReqReason('');
                        setKidScreen('k-home');
                      }}
                      className="w-full py-3.5 bg-[#0B5FA5] text-white rounded-[15px] font-extrabold text-[14.5px] shadow-md cursor-pointer hover:bg-[#084E8A]"
                    >
                      إرسال الطلب لبابا
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* KIDS SCREEN 6: تحويل وتفويض */}
            {kidScreen === 'k-transfer' && (
              <div>
                <div className="bg-gradient-to-r from-[#0B5FA5] to-[#083E6E] text-white p-4 flex items-center gap-3">
                  <button onClick={() => setKidScreen('k-home')} className="w-9 h-9 rounded-[11px] bg-white/15 grid place-items-center cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M9 6l6 6-6 6"/></svg>
                  </button>
                  <div className="text-right">
                    <h2 className="text-[16px] font-extrabold m-0">تحويل / تفويض</h2>
                    <p className="text-[11px] opacity-90 m-0">حوّل مبلغ لماما أو أخوك</p>
                  </div>
                </div>

                <div className="p-3.5">
                  <div className="bg-white rounded-[20px] p-4 border border-[#E5E9F0] shadow-xs space-y-3.5 text-right">
                    <div>
                      <label className="text-[12.5px] font-bold block mb-1">إلى مَن؟</label>
                      <div className="flex gap-2">
                        {(['ماما', 'أخي', 'بابا'] as const).map(w => (
                          <button
                            key={w}
                            onClick={() => setKidTrTo(w)}
                            className={`flex-1 py-2 rounded-full border text-[12.5px] font-bold cursor-pointer transition-all ${
                              kidTrTo === w ? 'border-[#0B5FA5] bg-[#E6F0FA] text-[#0B5FA5]' : 'border-[#E5E9F0] text-[#64748B]'
                            }`}
                          >
                            {w === 'ماما' ? 'ماما 👩' : w === 'أخي' ? 'أخي 👦' : 'بابا 👨'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[12.5px] font-bold block mb-1">المبلغ</label>
                      <div className="flex items-center gap-2 bg-white border border-[#E5E9F0] rounded-[13px] px-3 py-1">
                        <input 
                          type="number" 
                          value={kidTrAmount} 
                          onChange={(e) => setKidTrAmount(e.target.value)} 
                          placeholder="0" 
                          className="w-full text-[21px] font-black text-[#0B5FA5] outline-none"
                        />
                        <span className="text-[#64748B] font-bold text-[13px]">ريال</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[12.5px] font-bold block mb-1">نوع العملية</label>
                      <select 
                        value={kidTrType} 
                        onChange={(e) => setKidTrType(e.target.value)}
                        className="w-full p-3 rounded-[13px] border border-[#E5E9F0] text-[13.5px] outline-none"
                      >
                        <option>تحويل مبلغ</option>
                        <option>تفويض شراء</option>
                        <option>هدية</option>
                      </select>
                    </div>

                    <button 
                      onClick={() => {
                        const amt = Number(kidTrAmount);
                        if (!amt || amt <= 0) return triggerToast('اكتب المبلغ أولاً 😊');
                        if (kidBalance < amt) return triggerToast('رصيدك الحالي غير كافٍ');
                        setKidBalance(prev => prev - amt);
                        triggerToast(`تم التحويل إلى ${kidTrTo} بنجاح ✅`);
                        setKidTrAmount('');
                        setKidScreen('k-home');
                      }}
                      className="w-full py-3.5 bg-[#0B5FA5] text-white rounded-[15px] font-extrabold text-[14.5px] shadow-md cursor-pointer hover:bg-[#084E8A]"
                    >
                      تأكيد العملية
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* KIDS SCREEN 7: سجل العمليات */}
            {kidScreen === 'k-history' && (
              <div>
                <div className="bg-gradient-to-r from-[#0B5FA5] to-[#083E6E] text-white p-4 flex items-center gap-3">
                  <button onClick={() => setKidScreen('k-home')} className="w-9 h-9 rounded-[11px] bg-white/15 grid place-items-center cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M9 6l6 6-6 6"/></svg>
                  </button>
                  <div className="text-right">
                    <h2 className="text-[16px] font-extrabold m-0">سجل العمليات</h2>
                    <p className="text-[11px] opacity-90 m-0">كل حركاتك في مكان واحد</p>
                  </div>
                </div>

                <div className="p-3.5">
                  <div className="bg-white rounded-[20px] p-3 border border-[#E5E9F0] shadow-xs divide-y divide-[#E5E9F0]">
                    <div className="flex justify-between items-center py-3">
                      <div className="flex items-center gap-2.5 text-right">
                        <div className="w-10 h-10 rounded-[11px] bg-[#E6F0FA] text-[#0B5FA5] grid place-items-center">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                        </div>
                        <div>
                          <b className="text-[12.5px] block">مصروف من بابا</b>
                          <small className="text-[#64748B] text-[10.5px]">اليوم</small>
                        </div>
                      </div>
                      <div className="font-black text-[13.5px] text-[#16A34A]">+50</div>
                    </div>

                    <div className="flex justify-between items-center py-3">
                      <div className="flex items-center gap-2.5 text-right">
                        <div className="w-10 h-10 rounded-[11px] bg-[#DCFCE7] text-[#16A34A] grid place-items-center">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6h15l-2 9H8z"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>
                        </div>
                        <div>
                          <b className="text-[12.5px] block">شراء بقالة</b>
                          <small className="text-[#64748B] text-[10.5px]">اليوم · بابا</small>
                        </div>
                      </div>
                      <div className="font-black text-[13.5px] text-[#DC2626]">-35</div>
                    </div>

                    <div className="flex justify-between items-center py-3">
                      <div className="flex items-center gap-2.5 text-right">
                        <div className="w-10 h-10 rounded-[11px] bg-[#FCE7F3] text-[#EC4899] grid place-items-center">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                        </div>
                        <div>
                          <b className="text-[12.5px] block">إيداع في الحصالة</b>
                          <small className="text-[#64748B] text-[10.5px]">أمس</small>
                        </div>
                      </div>
                      <div className="font-black text-[13.5px] text-[#DC2626]">-20</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Kids Bottom Nav */}
            <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-[#E5E9F0] flex justify-around py-2 shadow-md z-10">
              <button onClick={() => setKidScreen('k-home')} className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer ${kidScreen === 'k-home' ? 'text-[#0B5FA5]' : 'text-[#64748B]'}`}>
                <svg className="w-[21px] h-[21px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>
                <span>الرئيسية</span>
              </button>
              <button onClick={() => setKidScreen('k-request')} className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer ${kidScreen === 'k-request' ? 'text-[#0B5FA5]' : 'text-[#64748B]'}`}>
                <svg className="w-[21px] h-[21px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                <span>مصروف</span>
              </button>
              <button onClick={() => setKidScreen('k-buy')} className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer ${kidScreen === 'k-buy' ? 'text-[#0B5FA5]' : 'text-[#64748B]'}`}>
                <svg className="w-[21px] h-[21px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6h15l-2 9H8z"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M6 6 5 3H3"/></svg>
                <span>شراء</span>
              </button>
              <button onClick={() => setKidScreen('k-transfer')} className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer ${kidScreen === 'k-transfer' ? 'text-[#0B5FA5]' : 'text-[#64748B]'}`}>
                <svg className="w-[21px] h-[21px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 7h10l-3-3"/><path d="M17 17H7l3 3"/></svg>
                <span>تحويل</span>
              </button>
              <button onClick={() => setKidScreen('k-savings')} className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer ${kidScreen === 'k-savings' ? 'text-[#0B5FA5]' : 'text-[#64748B]'}`}>
                <svg className="w-[21px] h-[21px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12a7 7 0 0 1 14 0v5a2 2 0 0 1-2 2h-2"/><path d="M5 12v5a2 2 0 0 0 2 2h2"/></svg>
                <span>حصالة</span>
              </button>
            </nav>
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* ===== 3. زر المساعد الذكي المتحرك بالسحب (الكرة المتلونة) ===== */}
      {/* ======================================================== */}
      <button 
        style={{
          position: 'fixed',
          left: `${fabPos.left}px`,
          top: `${fabPos.top}px`,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: fabColor.bg,
          boxShadow: fabColor.boxShadow,
          color: '#fff',
          border: 'none',
          cursor: 'grab',
          zIndex: 150,
          touchAction: 'none',
          userSelect: 'none',
          display: 'grid',
          placeItems: 'center',
          transition: 'transform .15s'
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { dragRef.current.isDragging = false; }}
        title="اسحبني لأي مكان • اضغطني للمساعدة"
      >
        {/* Glow & Pulse Ring */}
        <span 
          style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: '50%',
            border: `2.5px solid ${fabColor.color}`,
            opacity: 0.7,
            animation: 'pulse 2.2s infinite',
            pointerEvents: 'none'
          }}
        />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'none' }}>
          <path d="M12 2a7 7 0 0 0-7 7v3a3 3 0 0 0 3 3h1v-6H8a4 4 0 0 1 8 0h-1v6h1a3 3 0 0 0 3-3V9a7 7 0 0 0-7-7z"/>
          <circle cx="9" cy="9" r="1" fill="#fff"/>
          <circle cx="15" cy="9" r="1" fill="#fff"/>
          <path d="M8 20c1 1 2.5 1.5 4 1.5s3-.5 4-1.5"/>
        </svg>
      </button>

      {/* ======================================================== */}
      {/* =================== 4. لوحة المساعد الذكي ================ */}
      {/* ======================================================== */}
      {isAssistOpen && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-[78vh] bg-white rounded-t-[22px] shadow-[0_-10px_40px_rgba(0,0,0,0.18)] z-[200] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0B5FA5] to-[#083E6E] text-white p-4 flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-full bg-white/15 grid place-items-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 0 0-7 7v3a3 3 0 0 0 3 3h1v-6H8a4 4 0 0 1 8 0h-1v6h1a3 3 0 0 0 3-3V9a7 7 0 0 0-7-7z"/>
                <circle cx="9" cy="9" r="1" fill="#fff"/><circle cx="15" cy="9" r="1" fill="#fff"/>
                <path d="M8 20c1 1 2.5 1.5 4 1.5s3-.5 4-1.5"/>
              </svg>
            </div>
            <div className="text-right flex-1">
              <b className="block text-[15px] font-extrabold">مساعد نصر الذكي</b>
              <small className="text-[11px] opacity-90">🟢 متصل — جاهز لمساعدتك</small>
            </div>
            <button onClick={() => setIsAssistOpen(false)} className="w-8 h-8 rounded-full bg-white/15 text-white grid place-items-center cursor-pointer text-[18px]">
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] space-y-3 text-right">
            {chatMessages.map((msg, i) => (
              <div 
                key={i} 
                className={`p-3 rounded-[16px] text-[13px] leading-relaxed shadow-xs max-w-[88%] whitespace-pre-line ${
                  msg.sender === 'user' 
                    ? 'mr-auto bg-[#0B5FA5] text-white rounded-br-[4px]' 
                    : 'bg-white text-[#1F2937] rounded-bl-[4px]'
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Quick Questions */}
            <div className="flex flex-col gap-2 pt-2">
              {[
                { key: 'subscribe', label: 'كيف أشترك في نصر والت؟' },
                { key: 'register', label: 'كيف أسجل حساب جديد؟' },
                { key: 'family', label: 'كيف أفتح حساب للعائلة؟' },
                { key: 'support', label: 'تواصل مع الدعم الفني' },
                { key: 'security', label: 'كيف أحمي حسابي؟' }
              ].map(q => (
                <button
                  key={q.key}
                  onClick={() => handleAskAssist(q.key)}
                  className="bg-white border-[1.5px] border-[#E5E9F0] rounded-[14px] p-3 text-[13px] font-bold text-right cursor-pointer flex items-center gap-2.5 transition-all hover:bg-[#F0F7FF] hover:border-[#0B5FA5] active:scale-98"
                >
                  <div className="w-8 h-8 rounded-[10px] bg-[#E6F0FA] grid place-items-center text-[#0B5FA5] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>
                    </svg>
                  </div>
                  <span>{q.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 bg-white border-t border-[#E5E9F0] flex gap-2 shrink-0">
            <button 
              onClick={() => {
                setChatMessages([
                  { sender: 'bot', text: 'مرحباً! أنا مساعدك الذكي في نصر والت 🤖\nكيف أقدر أساعدك اليوم؟\n\n💡 تلميح: اسحبني لأي مكان بالشاشة!' }
                ]);
              }}
              className="flex-1 py-2.5 rounded-[12px] bg-[#F1F5F9] text-[#0B5FA5] font-extrabold text-[12.5px] cursor-pointer"
            >
              🔄 ابدأ من جديد
            </button>
            <button 
              onClick={() => handleAskAssist('support')}
              className="flex-1 py-2.5 rounded-[12px] bg-[#0B5FA5] text-white font-extrabold text-[12.5px] cursor-pointer"
            >
              📞 دعم فني
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ========== 5. نافذة طلب إضافة ابن / اشتراك عائلي ======== */}
      {/* ======================================================== */}
      {isAddChildModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[250] flex items-center justify-center p-3 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[390px] rounded-[22px] overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200 text-right">
            <div className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">👦</span>
                <b className="text-[14px]">طلب تسجيل واشتراك ابن جديد</b>
              </div>
              <button 
                onClick={() => setIsAddChildModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/20 grid place-items-center text-white font-bold cursor-pointer hover:bg-white/30"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitNewChildRequest} className="p-4 space-y-3">
              <div className="p-2.5 bg-emerald-50 rounded-[12px] border border-emerald-200 text-[11px] text-emerald-900 leading-relaxed">
                ℹ️ <b>تنبيه سيادي:</b> يتم إرسال طلب الاشتراك والمستندات للنظام المركزي للتحقق والاعتماد. بمجرد الموافقة، يظهر رصيد الابن فقط عند الأب مع أزرار التحويل والحجز والتوقيف، مع إخفاء باقي البيانات للنظام المركزي.
              </div>

              <div>
                <label className="text-[11.5px] font-bold text-gray-700 block mb-1">الاسم الرباعي للابن / التابع *</label>
                <input 
                  type="text"
                  required
                  placeholder="مثال: يوسف نصر فضل"
                  value={newChildForm.name}
                  onChange={e => setNewChildForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full p-2.5 rounded-[12px] border border-gray-300 text-[13px] outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11.5px] font-bold text-gray-700 block mb-1">صلة القرابة</label>
                  <select
                    value={newChildForm.relation}
                    onChange={e => setNewChildForm(f => ({ ...f, relation: e.target.value }))}
                    className="w-full p-2 rounded-[12px] border border-gray-300 text-[12.5px] outline-none"
                  >
                    <option>ابن</option>
                    <option>ابنة</option>
                    <option>زوجة</option>
                    <option>أخ</option>
                    <option>تابع</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11.5px] font-bold text-gray-700 block mb-1">العمر (سنوات)</label>
                  <input 
                    type="number"
                    min="3"
                    max="21"
                    value={newChildForm.age}
                    onChange={e => setNewChildForm(f => ({ ...f, age: e.target.value }))}
                    className="w-full p-2 rounded-[12px] border border-gray-300 text-[12.5px] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11.5px] font-bold text-gray-700 block mb-1">رقم شهادة الميلاد أو الهوية الوطنية</label>
                <input 
                  type="text"
                  placeholder="مثال: 0109928371"
                  value={newChildForm.nationalId}
                  onChange={e => setNewChildForm(f => ({ ...f, nationalId: e.target.value }))}
                  className="w-full p-2 rounded-[12px] border border-gray-300 text-[12.5px] outline-none"
                />
              </div>

              <div>
                <label className="text-[11.5px] font-bold text-gray-700 block mb-1">المصروف الأولي المقترح (ر.ي)</label>
                <input 
                  type="number"
                  placeholder="50"
                  value={newChildForm.allowance}
                  onChange={e => setNewChildForm(f => ({ ...f, allowance: e.target.value }))}
                  className="w-full p-2 rounded-[12px] border border-gray-300 text-[12.5px] outline-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#2E7D32] text-white rounded-[12px] font-extrabold text-[13px] shadow-sm hover:bg-[#1B5E20] cursor-pointer"
                >
                  إرسال الطلب للاعتماد المركزي 📤
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddChildModalOpen(false)}
                  className="px-3 py-2.5 bg-gray-100 text-gray-700 rounded-[12px] font-bold text-[12px] cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ============ 6. نافذة تحويل فوري لمصروف الابن =========== */}
      {/* ======================================================== */}
      {transferModal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[250] flex items-center justify-center p-3 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[360px] rounded-[22px] overflow-hidden shadow-2xl border border-gray-100 text-right">
            <div className="bg-gradient-to-r from-[#2E7D32] to-[#388E3C] text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">💸</span>
                <b className="text-[13.5px]">تحويل فوري إلى {transferModal.kidName}</b>
              </div>
              <button 
                onClick={() => setTransferModal({ open: false, kidId: '', kidName: '', amount: '' })}
                className="w-7 h-7 rounded-full bg-white/20 grid place-items-center text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="text-[12px] text-gray-600">
                رصيدك المتاح في المحفظة: <b className="text-[#2E7D32]">{walletBalance} ر.ي</b>
              </div>

              <div>
                <label className="text-[11.5px] font-bold text-gray-700 block mb-1">المبلغ المراد تحويله (ر.ي)</label>
                <input 
                  type="number"
                  autoFocus
                  placeholder="0"
                  value={transferModal.amount}
                  onChange={e => setTransferModal(m => ({ ...m, amount: e.target.value }))}
                  className="w-full text-[22px] font-black p-2.5 rounded-[12px] border border-gray-300 text-[#2E7D32] outline-none text-center"
                />
              </div>

              <div className="flex gap-1.5">
                {[50, 100, 200, 500].map(v => (
                  <button 
                    key={v}
                    type="button"
                    onClick={() => setTransferModal(m => ({ ...m, amount: String(v) }))}
                    className="flex-1 py-1.5 bg-gray-50 border border-gray-200 rounded-[10px] text-[11px] font-bold text-gray-700 hover:border-[#2E7D32]"
                  >
                    +{v}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleTransferToKidConfirm}
                  className="flex-1 py-2.5 bg-[#2E7D32] text-white rounded-[12px] font-extrabold text-[13px] shadow-sm cursor-pointer hover:bg-[#1B5E20]"
                >
                  تأكيد التحويل الفوري ✓
                </button>
                <button
                  type="button"
                  onClick={() => setTransferModal({ open: false, kidId: '', kidName: '', amount: '' })}
                  className="px-3 py-2.5 bg-gray-100 text-gray-700 rounded-[12px] font-bold text-[12px] cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ============== 7. نافذة حجز مبلغ من رصيد الابن =========== */}
      {/* ======================================================== */}
      {holdModal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[250] flex items-center justify-center p-3 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-[360px] rounded-[22px] overflow-hidden shadow-2xl border border-gray-100 text-right">
            <div className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔒</span>
                <b className="text-[13.5px]">حجز مبلغ من رصيد {holdModal.kidName}</b>
              </div>
              <button 
                onClick={() => setHoldModal({ open: false, kidId: '', kidName: '', amount: '' })}
                className="w-7 h-7 rounded-full bg-white/20 grid place-items-center text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-[11.5px] text-gray-600 m-0 leading-relaxed">
                سيتم تجميد هذا المبلغ في محفظة الابن لمنعه من الصرف حتى تقوم بفك الحجز لاحقاً.
              </p>

              <div>
                <label className="text-[11.5px] font-bold text-gray-700 block mb-1">المبلغ المراد حجزه (ر.ي)</label>
                <input 
                  type="number"
                  autoFocus
                  placeholder="0"
                  value={holdModal.amount}
                  onChange={e => setHoldModal(m => ({ ...m, amount: e.target.value }))}
                  className="w-full text-[22px] font-black p-2.5 rounded-[12px] border border-gray-300 text-amber-600 outline-none text-center"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleHoldKidAmountConfirm}
                  className="flex-1 py-2.5 bg-[#D97706] text-white rounded-[12px] font-extrabold text-[13px] shadow-sm cursor-pointer hover:bg-[#B45309]"
                >
                  تأكيد الحجز 🔒
                </button>
                <button
                  type="button"
                  onClick={() => setHoldModal({ open: false, kidId: '', kidName: '', amount: '' })}
                  className="px-3 py-2.5 bg-gray-100 text-gray-700 rounded-[12px] font-bold text-[12px] cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default StandaloneClientApp;
