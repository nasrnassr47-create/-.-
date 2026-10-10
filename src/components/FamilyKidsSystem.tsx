import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  Shield, 
  Plus, 
  HeartHandshake, 
  CheckCircle2, 
  Link as LinkIcon, 
  QrCode, 
  CreditCard, 
  Lock, 
  Unlock, 
  Clock, 
  Calendar, 
  Star, 
  Sparkles, 
  Sliders, 
  Smartphone, 
  AlertCircle,
  X
} from 'lucide-react';

interface KidProfile {
  id: string;
  name: string;
  age: number;
  relation: string;
  balance: number;
  stars: number;
  goal: string;
  goalTarget: number;
  allowanceAmount: number;
  allowanceSchedule: 'daily' | 'weekly' | 'monthly';
  pairingCode: string;
  isCardEnabled: boolean;
  spendingLimitDaily: number;
  tasks: { id: string; title: string; reward: number; done: boolean }[];
  parentalApprovalRequired: boolean;
}

export const FamilyKidsSystem: React.FC = () => {
  const [kids, setKids] = useState<KidProfile[]>([
    {
      id: 'k-1',
      name: 'أحمد نصر',
      age: 14,
      relation: 'الابن الأكبر',
      balance: 14500,
      stars: 18,
      goal: 'دورة برمجة روبوتات وذكاء اصطناعي',
      goalTarget: 35000,
      allowanceAmount: 2000,
      allowanceSchedule: 'weekly',
      pairingCode: 'FAM-771-801',
      isCardEnabled: true,
      spendingLimitDaily: 1000,
      parentalApprovalRequired: true,
      tasks: [
        { id: 't-1', title: 'حفظ سورة الكهف كاملة', reward: 2000, done: true },
        { id: 't-2', title: 'الحصول على الترتيب الأول في المدرسة', reward: 5000, done: false },
        { id: 't-3', title: 'قراءة كتاب علمي وتلخيصه', reward: 1500, done: false }
      ]
    },
    {
      id: 'k-2',
      name: 'سارة نصر',
      age: 11,
      relation: 'الابنة',
      balance: 9200,
      stars: 14,
      goal: 'مجهر وموسوعة علمية مصورة',
      goalTarget: 22000,
      allowanceAmount: 1500,
      allowanceSchedule: 'weekly',
      pairingCode: 'FAM-771-802',
      isCardEnabled: true,
      spendingLimitDaily: 750,
      parentalApprovalRequired: true,
      tasks: [
        { id: 't-4', title: 'المواظبة على صلاة الفجر في وقتها', reward: 1500, done: true },
        { id: 't-5', title: 'إتقان محادثة اللغة الإنجليزية', reward: 2500, done: false }
      ]
    },
    {
      id: 'k-3',
      name: 'عمر نصر',
      age: 7,
      relation: 'الابن الأصغر',
      balance: 4500,
      stars: 9,
      goal: 'حقيبة مدرسية متطورة وألعاب ذكاء',
      goalTarget: 12000,
      allowanceAmount: 500,
      allowanceSchedule: 'daily',
      pairingCode: 'FAM-771-803',
      isCardEnabled: false,
      spendingLimitDaily: 500,
      parentalApprovalRequired: true,
      tasks: [
        { id: 't-6', title: 'ترتيب الغرفة ومساعدة الوالدة', reward: 500, done: true },
        { id: 't-7', title: 'حفظ قصار السور من جزء عم', reward: 1000, done: false }
      ]
    }
  ]);

  const [activeTab, setActiveTab] = useState<'kids' | 'linking' | 'tasks' | 'cards'>('kids');
  const [selectedKid, setSelectedKid] = useState<KidProfile | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCompleteTask = (kidId: string, taskId: string, reward: number) => {
    setKids(prev => prev.map(k => {
      if (k.id === kidId) {
        return {
          ...k,
          balance: k.balance + reward,
          stars: k.stars + 1,
          tasks: k.tasks.map(t => t.id === taskId ? { ...t, done: true } : t)
        };
      }
      return k;
    }));
    showToast(`مبارك! تم اعتماد إنجاز المهمة وإيداع مكافأة ${reward.toLocaleString()} ر.ي في حصالة الابن.`);
  };

  const handleToggleCard = (kidId: string) => {
    setKids(prev => prev.map(k => k.id === kidId ? { ...k, isCardEnabled: !k.isCardEnabled } : k));
    showToast('تم تحديث حالة بطاقة المصروف الذكية للابن.');
  };

  return (
    <div className="bg-[#032516] rounded-[18px] border border-[rgba(245,200,66,0.3)] p-4 sm:p-6 space-y-4 text-white shadow-2xl" dir="rtl">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#01140a] border border-[#f5c842] text-white px-4 py-2 rounded-[12px] shadow-2xl text-[12px] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={16} className="text-[#f5c842]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[rgba(245,200,66,0.2)] pb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[12px] bg-[#78350f] border border-[#f5c842]/40 flex items-center justify-center shadow-md">
            <Users size={22} className="text-[#f5c842]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[17px] font-bold text-white">منظومة العائلة والنشء ومحافظ الأبناء الذكية</h3>
              <span className="text-[10px] bg-[#f5c842]/20 text-[#f5c842] border border-[#f5c842]/40 font-bold px-2 py-0.5 rounded-[8px]">
                ربط أسري لحظي
              </span>
            </div>
            <p className="text-[12px] text-[#94a3b8] mt-0.5">
              إدارة المصروف التلقائي، الحصالة الرقمية، المهام التربوية والتحفيز، والرقابة الأبوية الذكية
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] bg-[#14532d] text-emerald-200 border border-[#16a34a]/40 px-3 py-1 rounded-[10px] font-semibold">
            {kids.length} محافظ أبناء نشطة
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-[#01140a] p-1.5 rounded-[12px] border border-[rgba(245,200,66,0.2)]">
        <button
          onClick={() => setActiveTab('kids')}
          className={`px-3.5 py-1.5 rounded-[8px] text-[12px] font-bold transition-all cursor-pointer ${
            activeTab === 'kids' ? 'bg-[#78350f] text-[#f5c842] border border-[#f5c842]' : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          محافظ الأبناء والحصالة ({kids.length})
        </button>
        <button
          onClick={() => setActiveTab('linking')}
          className={`px-3.5 py-1.5 rounded-[8px] text-[12px] font-bold transition-all cursor-pointer ${
            activeTab === 'linking' ? 'bg-[#14532d] text-white border border-[#16a34a]' : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          طرق الربط بحساب العميل (3 طرق)
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-3.5 py-1.5 rounded-[8px] text-[12px] font-bold transition-all cursor-pointer ${
            activeTab === 'tasks' ? 'bg-[#0c4a6e] text-sky-200 border border-[#0ea5e9]' : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          المهام التربوية والمكافآت
        </button>
        <button
          onClick={() => setActiveTab('cards')}
          className={`px-3.5 py-1.5 rounded-[8px] text-[12px] font-bold transition-all cursor-pointer ${
            activeTab === 'cards' ? 'bg-purple-950 text-purple-200 border border-purple-500' : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          بطاقات المصروف المدرسية
        </button>
      </div>

      {/* --- TAB 1: محافظ الأبناء والحصالة --- */}
      {activeTab === 'kids' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {kids.map((kid) => {
            const percent = Math.min(100, Math.round((kid.balance / kid.goalTarget) * 100));
            return (
              <div 
                key={kid.id}
                className="bg-[#01140a] border border-[rgba(245,200,66,0.25)] hover:border-[#f5c842] rounded-[14px] p-4 space-y-3 transition-colors shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-[15px] font-bold text-white">{kid.name}</h4>
                        <span className="text-[10px] text-[#94a3b8]">({kid.relation} - {kid.age} سنة)</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#0ea5e9] block mt-0.5">
                        كود الاقتران: {kid.pairingCode}
                      </span>
                    </div>
                    <span className="text-[11px] bg-[#f5c842]/20 text-[#f5c842] px-2 py-0.5 rounded-[8px] font-bold flex items-center gap-1">
                      <Star size={12} className="fill-[#f5c842]" />
                      <span>{kid.stars} نجمة</span>
                    </span>
                  </div>

                  <div className="bg-[#032516] p-3 rounded-[10px] border border-[rgba(245,200,66,0.15)] mt-3">
                    <span className="text-[10px] text-[#94a3b8] block">الرصيد المدخر في الحصالة:</span>
                    <div className="text-[20px] font-bold text-[#f5c842] font-mono mt-0.5">
                      {kid.balance.toLocaleString()} <span className="text-[12px] font-sans text-white/80">ر.ي</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mt-3 text-[11px]">
                    <div className="flex justify-between text-[#94a3b8]">
                      <span>الهدف: {kid.goal}</span>
                      <span className="text-emerald-400 font-bold">{percent}%</span>
                    </div>
                    <div className="w-full bg-[#032516] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#16a34a] h-full rounded-full transition-all" style={{ width: `${percent}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#94a3b8] pt-1">
                      <span>المصروف التلقائي: {kid.allowanceAmount.toLocaleString()} ر.ي / {kid.allowanceSchedule === 'weekly' ? 'أسبوعياً' : 'يومياً'}</span>
                      <span className="text-sky-300">سقف: {kid.spendingLimitDaily} ر.ي</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[rgba(245,200,66,0.15)] flex items-center gap-2">
                  <button
                    onClick={() => {
                      setKids(prev => prev.map(k => k.id === kid.id ? { ...k, balance: k.balance + 1000, stars: k.stars + 1 } : k));
                      showToast(`تم تحويل مكافأة 1,000 ريال إلى حصالة (${kid.name}).`);
                    }}
                    className="flex-1 py-2 bg-[#14532d] hover:bg-[#16a34a] text-white rounded-[8px] text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
                  >
                    <Plus size={14} />
                    <span>تحويل مكافأة فورية (1,000 ر.ي)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- TAB 2: طرق الربط بحساب العميل الأساسي --- */}
      {activeTab === 'linking' && (
        <div className="space-y-4">
          <div className="bg-[#01140a] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)] space-y-4">
            <h4 className="text-[14px] font-bold text-[#f5c842] flex items-center gap-2">
              <LinkIcon size={18} />
              <span>كيف ترتبط محفظة العائلة بالحساب المالي الأساسي للعميل؟</span>
            </h4>
            <p className="text-[12px] text-[#94a3b8] leading-relaxed">
              يوفر نظام نصر والت ثلاث تقنيات ربط بنكية متقدمة لربط الأبناء والزوجة بحساب ولي الأمر، مع الحفاظ على الأمان والتحكم الكامل في حدود الإنفاق:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px]">
              {/* Method 1 */}
              <div className="bg-[#032516] p-3.5 rounded-[12px] border border-[#16a34a]/40 space-y-2">
                <div className="w-8 h-8 rounded-[8px] bg-[#14532d] flex items-center justify-center text-[#16a34a]">
                  <LinkIcon size={16} />
                </div>
                <h5 className="font-bold text-white text-[13px]">1. الربط كحساب فرعي مباشر (Sub-Account)</h5>
                <p className="text-[11px] text-[#94a3b8] leading-normal">
                  يتم إنشاء محفظة فرعية تابعة لحساب العميل الرئيسي (مثال: `777-NASR-001/01`). يحدد ولي الأمر مبلغ المصروف الدوري ويتم اقتطاعه آلياً كل جمعة أو أول كل شهر من رصيده الأساسي.
                </p>
                <div className="text-[10px] text-emerald-300 font-bold bg-[#01140a] p-1.5 rounded">
                  ✓ لا يحتاج لتدخل يدوي متكرر
                </div>
              </div>

              {/* Method 2 */}
              <div className="bg-[#032516] p-3.5 rounded-[12px] border border-[#0ea5e9]/40 space-y-2">
                <div className="w-8 h-8 rounded-[8px] bg-[#0c4a6e] flex items-center justify-center text-[#0ea5e9]">
                  <QrCode size={16} />
                </div>
                <h5 className="font-bold text-white text-[13px]">2. رمز الاقتران والتفويض (Pairing Code & QR)</h5>
                <p className="text-[11px] text-[#94a3b8] leading-normal">
                  يقوم ولي الأمر بتوليد رمز اقتران مشفر (مثلاً: `FAM-771-801`) أو رمز QR، وعند تنزيل الابن لتطبيق نصر والت على هاتفه يُدخل الرمز فيتم الربط فوراً وتفعيل الرقابة الأبوية.
                </p>
                <div className="text-[10px] text-sky-300 font-bold bg-[#01140a] p-1.5 rounded">
                  ✓ تطبيق مستقل بهاتف الابن
                </div>
              </div>

              {/* Method 3 */}
              <div className="bg-[#032516] p-3.5 rounded-[12px] border border-purple-500/40 space-y-2">
                <div className="w-8 h-8 rounded-[8px] bg-purple-950 flex items-center justify-center text-purple-300">
                  <CreditCard size={16} />
                </div>
                <h5 className="font-bold text-white text-[13px]">3. بطاقة المصروف المسبقة الدفع (Prepaid Child Card)</h5>
                <p className="text-[11px] text-[#94a3b8] leading-normal">
                  إصدار بطاقة دفع إلكترونية ذكية مقيدة (NFC أو افتراضية) مخصصة فقط للمكتبات والمدارس، مع منع السحب النقدي وتحديد سقف يومي لا يمكن تجاوزه.
                </p>
                <div className="text-[10px] text-purple-300 font-bold bg-[#01140a] p-1.5 rounded">
                  ✓ تقييد لنقاط البيع المعتمدة
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: المهام التربوية والتحفيز --- */}
      {activeTab === 'tasks' && (
        <div className="space-y-3">
          <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)]">
            <h4 className="text-[13px] font-bold text-white mb-2">قائمة المهام السلوكية والتعليمية قيد المتابعة</h4>
            <div className="space-y-2">
              {kids.flatMap(k => k.tasks.map(t => ({ ...t, kidName: k.name, kidId: k.id }))).map(task => (
                <div key={task.id} className="bg-[#032516] p-3 rounded-[10px] border border-[rgba(245,200,66,0.1)] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      task.done ? 'bg-[#16a34a] text-white' : 'bg-[#01140a] border border-[#f5c842] text-[#f5c842]'
                    }`}>
                      {task.done ? '✓' : '•'}
                    </span>
                    <div>
                      <span className="text-[13px] font-bold text-white block">{task.title}</span>
                      <span className="text-[10px] text-[#94a3b8]">الابن: {task.kidName} • المكافأة: {task.reward.toLocaleString()} ر.ي</span>
                    </div>
                  </div>

                  {!task.done ? (
                    <button
                      onClick={() => handleCompleteTask(task.kidId, task.id, task.reward)}
                      className="px-3 py-1 bg-[#14532d] hover:bg-[#16a34a] text-white rounded-[6px] text-[11px] font-bold cursor-pointer transition-all active:scale-95"
                    >
                      اعتماد الإنجاز وصرف المكافأة
                    </button>
                  ) : (
                    <span className="text-[11px] text-emerald-400 font-bold bg-[#14532d]/40 px-2 py-0.5 rounded">
                      تم الإنجاز والمكافأة ✓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: بطاقات المصروف المدرسية --- */}
      {activeTab === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {kids.map((kid) => (
            <div key={kid.id} className="bg-gradient-to-br from-[#0c4a6e] to-[#01140a] border border-[#0ea5e9]/40 rounded-[14px] p-4 text-white space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-sky-200">بطاقة مصروف الأبناء الذكية</span>
                <CreditCard size={18} className="text-[#0ea5e9]" />
              </div>

              <div className="py-2">
                <div className="text-[15px] font-bold tracking-wide font-mono">
                  •••• •••• •••• {kid.pairingCode.slice(-4)}
                </div>
                <div className="flex justify-between items-center mt-2 text-[11px]">
                  <span className="text-white font-bold">{kid.name}</span>
                  <span className="font-mono text-gray-300">EXP: 12/29</span>
                </div>
              </div>

              <div className="bg-[#01140a]/60 p-2 rounded-[8px] text-[10px] space-y-1 text-[#94a3b8]">
                <div className="flex justify-between">
                  <span>سقف الصرف اليومي:</span>
                  <span className="font-mono text-white font-bold">{kid.spendingLimitDaily.toLocaleString()} ر.ي</span>
                </div>
                <div className="flex justify-between">
                  <span>المتاجر المسموحة:</span>
                  <span className="text-emerald-300">مكتبات، مدارس فقط</span>
                </div>
              </div>

              <button
                onClick={() => handleToggleCard(kid.id)}
                className={`w-full py-1.5 rounded-[8px] text-[11px] font-bold cursor-pointer transition-all ${
                  kid.isCardEnabled ? 'bg-[#7f1d1d] hover:bg-red-800 text-white' : 'bg-[#14532d] hover:bg-emerald-700 text-white'
                }`}
              >
                {kid.isCardEnabled ? 'إيقاف البطاقة مؤقتاً' : 'تفعيل البطاقة الآن'}
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default FamilyKidsSystem;
