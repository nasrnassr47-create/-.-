import React, { useState } from 'react';
import { 
  Building2, 
  Store, 
  UserCheck, 
  Smartphone, 
  QrCode, 
  Nfc, 
  Layers, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  BookOpen, 
  ShieldCheck, 
  ShieldAlert, 
  Key, 
  FileText, 
  ArrowLeftRight, 
  TrendingUp, 
  Users, 
  LifeBuoy, 
  Lock, 
  Unlock, 
  DollarSign, 
  CreditCard, 
  Landmark, 
  RefreshCw, 
  Search, 
  Filter, 
  Server, 
  Cpu, 
  Radio, 
  Send,
  HelpCircle,
  FolderTree,
  Sliders,
  Scale
} from 'lucide-react';

export const SovereignV8ExecutiveHub: React.FC<{
  onOpenScreen?: (screenId: string) => void;
  triggerToast?: (msg: string) => void;
}> = ({ onOpenScreen, triggerToast }) => {
  // Navigation tabs across the 7 domains of V8.0
  const [activeTab, setActiveTab] = useState<
    'merchant' | 'agent' | 'approval_flow' | 'chart_accounts' | 'vaults' | 'aml_cft' | 'integrations' | 'support' | 'seed_db'
  >('merchant');

  // Approval Workflow State (6 Stages)
  const [approvalItems, setApprovalItems] = useState([
    {
      id: 'REQ-801',
      title: 'طلب تحويل سيادي بين الخزائن',
      amount: 45000000,
      currency: 'YER',
      stage: 'اعتماد (Approve)',
      initiator: 'مدير العمليات - صنعاء',
      date: '2026-10-09 16:30',
      reason: 'تعزيز سيولة فرع تعز والوكلاء المركزية'
    },
    {
      id: 'REQ-802',
      title: 'مسير رواتب وزارة الاتصالات وتقنية المعلومات',
      amount: 185000000,
      currency: 'YER',
      stage: 'حجز (Hold)',
      initiator: 'إدارة الرواتب المؤسسية',
      date: '2026-10-09 15:45',
      reason: 'مراجعة الكشوفات ومطابقة الرقم الوطني'
    },
    {
      id: 'REQ-803',
      title: 'تسوية أسبوعية لكبار تجار SoftPOS',
      amount: 125000,
      currency: 'USD',
      stage: 'قبول (Accept)',
      initiator: 'بوابة الدفع التاجر V8',
      date: '2026-10-09 14:10',
      reason: 'مطابقة قيود نقاط البيع والمحافظ الرقمية'
    }
  ]);

  // Chart of accounts sample data
  const chartOfAccounts = [
    { code: '1000', name: 'الأصول (Assets)', balance: '1,425,800,000 ر.ي', type: 'رئيسي', status: 'نشط' },
    { code: '1100', name: 'النقدية والمعادلات بالخزائن والبنوك', balance: '980,500,000 ر.ي', type: 'فرعي', status: 'نشط' },
    { code: '1200', name: 'أرصدة الوكلاء والمدينون التجاريون', balance: '445,300,000 ر.ي', type: 'فرعي', status: 'نشط' },
    { code: '2000', name: 'الخصوم والالتزامات (Liabilities)', balance: '1,120,000,000 ر.ي', type: 'رئيسي', status: 'نشط' },
    { code: '2100', name: 'أمانات العملاء والمحافظ الرقمية', balance: '870,000,000 ر.ي', type: 'أمانة', status: 'محمي' },
    { code: '2200', name: 'أمانات حكومية (ضرائب وجمارك)', balance: '145,000,000 ر.ي', type: 'أمانة', status: 'محمي' },
    { code: '2300', name: 'أمانات الشركات ومسيرات الرواتب', balance: '105,000,000 ر.ي', type: 'أمانة', status: 'محمي' },
    { code: '3000', name: 'الإيرادات والعمولات (Revenues)', balance: '42,650,000 ر.ي', type: 'رئيسي', status: 'نشط' },
    { code: '4000', name: 'المصروفات التشغيلية (Expenses)', balance: '18,400,000 ر.ي', type: 'رئيسي', status: 'نشط' }
  ];

  // AML / CFT Alerts
  const [amlAlerts, setAmlAlerts] = useState([
    {
      id: 'AML-01',
      subject: 'تحويل سريع مكرر لجهة واحدة خلال 10 دقائق',
      target: 'حساب تجاري: متجر الأندلس (77199283)',
      amount: '18,000,000 ر.ي',
      risk: 'عالي (89%)',
      status: 'تحت الفحص',
      time: 'قبل 15 دقيقة'
    },
    {
      id: 'AML-02',
      subject: 'مطابقة اسم مع قائمة PEP والشخصيات المكشوفة سياسياً',
      target: 'حوالة واردة من الخارج: قاسم ناصر',
      amount: '$14,500 USD',
      risk: 'متوسط (62%)',
      status: 'حجز احترازي',
      time: 'قبل ساعة'
    },
    {
      id: 'AML-03',
      subject: 'تقرير STR مشبوه بكسر سقف العمليات اليومية',
      target: 'وكيل فرعي: صرافة البرق',
      amount: '35,000,000 ر.ي',
      risk: 'عالي جداً (94%)',
      status: 'إشعار البنك المركزي',
      time: 'قبل ساعتين'
    }
  ]);

  // External Integrations Status
  const integrations = [
    { name: 'بنك الكريمي الإسلامي', type: 'ربط مصرفي مباشر (API)', status: 'متصل 🟢', latency: '42ms', volume: '14,200 حركات/اليوم' },
    { name: 'شبكة النجم للتحويلات', type: 'حوالات فورية وسحب نقدي', status: 'متصل 🟢', latency: '65ms', volume: '8,500 حركات/اليوم' },
    { name: 'بنك سبأ الإسلامي', type: 'تسويات المقاصة اليومية', status: 'متصل 🟢', latency: '58ms', volume: '3,200 حركات/اليوم' },
    { name: 'يمن موبايل (Yemen Mobile)', type: 'سداد فواتير وشحن رصيد USSD/API', status: 'متصل 🟢', latency: '28ms', volume: '45,000 حركات/اليوم' },
    { name: 'شركة سبأفون (Sabafon)', type: 'شحن رصيد وباقات فورية', status: 'متصل 🟢', latency: '35ms', volume: '22,000 حركات/اليوم' },
    { name: 'بوابة الضرائب والجمارك', type: 'أمانات حكومية وسداد إلكتروني', status: 'متصل 🟢', latency: '110ms', volume: '950 حركات/اليوم' },
    { name: 'بوابات SWIFT / Western Union', type: 'حوالات دولية عابرة للحدود', status: 'جاهزية كاملة 🟡', latency: '210ms', volume: '120 حركات/اليوم' }
  ];

  // Action for Approval Workflow (6 Steps)
  const handleWorkflowAction = (reqId: string, newStage: string) => {
    setApprovalItems(prev => prev.map(item => item.id === reqId ? { ...item, stage: newStage } : item));
    if (triggerToast) triggerToast(`تم تحديث الطلب ${reqId} إلى مرحلة: ${newStage}`);
  };

  return (
    <div className="bg-[#01140a] text-white min-h-[600px] rounded-[16px] border border-[rgba(245,200,66,0.3)] p-4 md:p-6 space-y-6 shadow-2xl select-none" dir="rtl">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[rgba(245,200,66,0.2)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[14px] bg-[#032516] border border-[#f5c842] flex items-center justify-center shrink-0 shadow-lg">
            <Layers className="text-[#f5c842]" size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[18px] md:text-[20px] font-black text-white">
                منظومة نصر والت السيادية V8.0 — SOVEREIGN
              </h1>
              <span className="bg-[#f5c842]/20 text-[#f5c842] border border-[#f5c842]/50 text-[11px] font-black px-2.5 py-0.5 rounded-[8px]">
                30 وحدة متطورة
              </span>
            </div>
            <p className="text-[12px] text-[#94a3b8] mt-1">
              التاجر SoftPOS • الوكلاء • سير الموافقات السداسي • دليل الحسابات وأمانات الخزائن • الرقابة AML • بوابات الدفع
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenScreen && onOpenScreen('master_tree')}
            className="px-3.5 py-2 bg-[#032516] hover:bg-[#063d25] border border-[rgba(245,200,66,0.3)] text-[#f5c842] text-[12px] font-bold rounded-[10px] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FolderTree size={16} />
            <span>عرض الشجرة الكاملة</span>
          </button>
        </div>
      </div>

      {/* Domain Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[rgba(245,200,66,0.15)] text-[12px] font-bold">
        <button
          onClick={() => setActiveTab('merchant')}
          className={`px-3 py-2 rounded-[10px] shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'merchant'
              ? 'bg-[#f5c842] text-black font-extrabold shadow-md'
              : 'bg-[#032516] text-[#94a3b8] hover:text-white border border-[rgba(245,200,66,0.2)]'
          }`}
        >
          <Store size={15} />
          <span>تطبيق التاجر (SoftPOS & QR)</span>
        </button>

        <button
          onClick={() => setActiveTab('agent')}
          className={`px-3 py-2 rounded-[10px] shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'agent'
              ? 'bg-[#f5c842] text-black font-extrabold shadow-md'
              : 'bg-[#032516] text-[#94a3b8] hover:text-white border border-[rgba(245,200,66,0.2)]'
          }`}
        >
          <UserCheck size={15} />
          <span>تطبيق الوكيل (Cash In/Out)</span>
        </button>

        <button
          onClick={() => setActiveTab('approval_flow')}
          className={`px-3 py-2 rounded-[10px] shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'approval_flow'
              ? 'bg-[#f5c842] text-black font-extrabold shadow-md'
              : 'bg-[#032516] text-[#94a3b8] hover:text-white border border-[rgba(245,200,66,0.2)]'
          }`}
        >
          <CheckCircle2 size={15} />
          <span>سير الموافقات الست (Workflow)</span>
        </button>

        <button
          onClick={() => setActiveTab('chart_accounts')}
          className={`px-3 py-2 rounded-[10px] shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'chart_accounts'
              ? 'bg-[#f5c842] text-black font-extrabold shadow-md'
              : 'bg-[#032516] text-[#94a3b8] hover:text-white border border-[rgba(245,200,66,0.2)]'
          }`}
        >
          <BookOpen size={15} />
          <span>دليل الحسابات (1000 - 4000)</span>
        </button>

        <button
          onClick={() => setActiveTab('vaults')}
          className={`px-3 py-2 rounded-[10px] shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'vaults'
              ? 'bg-[#f5c842] text-black font-extrabold shadow-md'
              : 'bg-[#032516] text-[#94a3b8] hover:text-white border border-[rgba(245,200,66,0.2)]'
          }`}
        >
          <Landmark size={15} />
          <span>الخزائن وحسابات الأمانة</span>
        </button>

        <button
          onClick={() => setActiveTab('aml_cft')}
          className={`px-3 py-2 rounded-[10px] shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'aml_cft'
              ? 'bg-[#dc2626] text-white font-extrabold shadow-md'
              : 'bg-[#032516] text-[#94a3b8] hover:text-white border border-[rgba(245,200,66,0.2)]'
          }`}
        >
          <Scale size={15} />
          <span>مكافحة غسل الأموال (AML/CFT)</span>
        </button>

        <button
          onClick={() => setActiveTab('integrations')}
          className={`px-3 py-2 rounded-[10px] shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'integrations'
              ? 'bg-[#f5c842] text-black font-extrabold shadow-md'
              : 'bg-[#032516] text-[#94a3b8] hover:text-white border border-[rgba(245,200,66,0.2)]'
          }`}
        >
          <Radio size={15} />
          <span>التكاملات وبوابات الدفع</span>
        </button>

        <button
          onClick={() => setActiveTab('seed_db')}
          className={`px-3 py-2 rounded-[10px] shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'seed_db'
              ? 'bg-[#0ea5e9] text-white font-extrabold shadow-md'
              : 'bg-[#032516] text-[#94a3b8] hover:text-white border border-[rgba(245,200,66,0.2)]'
          }`}
        >
          <Server size={15} />
          <span>قاعدة البيانات والأدوار الـ 13</span>
        </button>
      </div>

      {/* TAB 1: Merchant App (SoftPOS & Dynamic QR) */}
      {activeTab === 'merchant' && (
        <div className="space-y-4">
          <div className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-[16px] font-bold text-[#f5c842] flex items-center gap-2">
                <Store size={20} />
                <span>محطة التاجر الذكية — SoftPOS & Tap-to-Phone</span>
              </h3>
              <p className="text-[12px] text-[#94a3b8] mt-1">
                تحويل أي هاتف ذكي يعمل بنظام أندرويد إلى جهاز نقطة بيع POS يقبل الدفع بالبطاقات اللاتلامسية NFC أو QR كود ديناميكي لحظي.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-[#16a34a]/20 text-[#16a34a] border border-[#16a34a]/40 text-[11px] font-bold px-3 py-1 rounded-[8px]">
                NFC Ready • EMV Compliant
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Dynamic QR Generator Mockup */}
            <div className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)] flex flex-col items-center text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#f5c842]/20 flex items-center justify-center text-[#f5c842]">
                <QrCode size={22} />
              </div>
              <h4 className="text-[14px] font-bold text-white">توليد QR ديناميكي لحظي</h4>
              <p className="text-[11px] text-[#94a3b8]">محدد بالقيمة ورقم الفاتورة لمنع الأخطاء البشرية وسرعة الدفع</p>
              
              <div className="bg-white p-3 rounded-[12px] shadow-inner my-2">
                <div className="w-32 h-32 bg-slate-900 rounded-[8px] flex flex-col items-center justify-center p-2 text-center text-white">
                  <QrCode size={64} className="text-[#f5c842]" />
                  <span className="text-[8px] mt-1 font-mono">NASR-V8-QR-25K</span>
                </div>
              </div>
              <span className="text-[13px] font-mono font-bold text-[#f5c842]">25,000 ر.ي (شامل الضريبة)</span>
              <button 
                onClick={() => triggerToast && triggerToast('تم إنشاء رمز QR ديناميكي جديد للفاتورة.')}
                className="w-full py-2 bg-[#f5c842] hover:bg-amber-400 text-black font-bold text-[12px] rounded-[8px] cursor-pointer"
              >
                توليد فاتورة جديدة
              </button>
            </div>

            {/* SoftPOS Tap to Phone */}
            <div className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)] flex flex-col items-center text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Nfc size={22} />
              </div>
              <h4 className="text-[14px] font-bold text-white">Tap-to-Phone (الدفع اللاتلامسي)</h4>
              <p className="text-[11px] text-[#94a3b8]">تقريب بطاقة مدى، ماستركارد، أو فيزا من ظهر هاتف التاجر</p>

              <div className="w-full bg-[#01140a] p-4 rounded-[12px] border border-[rgba(245,200,66,0.15)] space-y-2 text-right">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#94a3b8]">حالة شريحة NFC:</span>
                  <span className="text-emerald-400 font-bold">جاهزة ونشطة</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#94a3b8]">التشفير:</span>
                  <span className="text-[#f5c842] font-mono">DUKPT / AES-256</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#94a3b8]">الحد المسموح بدون PIN:</span>
                  <span className="font-bold">50,000 ر.ي</span>
                </div>
              </div>

              <button 
                onClick={() => triggerToast && triggerToast('جهاز التاجر جاهز الآن لاستقبال لمسة البطاقة (Tap).')}
                className="w-full mt-auto py-2 bg-[#0ea5e9] hover:bg-sky-400 text-white font-bold text-[12px] rounded-[8px] cursor-pointer"
              >
                تفعيل وضع الاستقبال اللحظي
              </button>
            </div>

            {/* Merchant Settlement summary */}
            <div className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)] space-y-3">
              <h4 className="text-[14px] font-bold text-white flex items-center gap-2">
                <TrendingUp size={16} className="text-[#16a34a]" />
                <span>حركة المبيعات والتسوية اليومية</span>
              </h4>
              <div className="space-y-2">
                <div className="bg-[#01140a] p-3 rounded-[10px] flex justify-between items-center">
                  <span className="text-[12px] text-[#94a3b8]">مبيعات اليوم الإجمالية</span>
                  <span className="text-[14px] font-bold text-[#f5c842] font-mono">4,820,000 ر.ي</span>
                </div>
                <div className="bg-[#01140a] p-3 rounded-[10px] flex justify-between items-center">
                  <span className="text-[12px] text-[#94a3b8]">العمليات الناجحة</span>
                  <span className="text-[14px] font-bold text-[#16a34a] font-mono">142 عملية</span>
                </div>
                <div className="bg-[#01140a] p-3 rounded-[10px] flex justify-between items-center">
                  <span className="text-[12px] text-[#94a3b8]">رسوم ونسبة التاجر المقتطعة</span>
                  <span className="text-[14px] font-bold text-sky-400 font-mono">1.2% (57,840 ر.ي)</span>
                </div>
              </div>
              <button 
                onClick={() => triggerToast && triggerToast('تم إرسال طلب ترحيل الرصيد تلقائياً إلى الحساب البنكي الرئيسي.')}
                className="w-full py-2 bg-[#16a34a] hover:bg-emerald-500 text-white font-bold text-[12px] rounded-[8px] cursor-pointer"
              >
                طلب تسوية فورية إلى البنك
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Agent App (Cash In / Out) */}
      {activeTab === 'agent' && (
        <div className="space-y-4">
          <div className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)]">
            <h3 className="text-[16px] font-bold text-[#f5c842] flex items-center gap-2">
              <UserCheck size={20} />
              <span>تطبيق الوكلاء المعتمدين — شبكة السيولة النقدية (Cash In & Out)</span>
            </h3>
            <p className="text-[12px] text-[#94a3b8] mt-1">
              تمكين الوكلاء من استقبال الإيداعات النقدية وصرف الحوالات، مع التحقق الفوري من هوية العميل وطباعة السندات.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cash In Panel */}
            <div className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)] space-y-3">
              <div className="flex items-center gap-2 border-b border-[rgba(245,200,66,0.15)] pb-2">
                <ArrowLeftRight className="text-emerald-400" size={18} />
                <h4 className="text-[14px] font-bold text-white">إيداع نقدي للعميل (Cash In)</h4>
              </div>
              <div className="space-y-2.5 text-[12px]">
                <div>
                  <label className="text-[#94a3b8] block mb-1">رقم هاتف العميل أو رقم المحفظة:</label>
                  <input 
                    type="text" 
                    placeholder="77XXXXXXX" 
                    defaultValue="771992834"
                    className="w-full bg-[#01140a] border border-[rgba(245,200,66,0.2)] rounded-[8px] p-2 text-white font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#94a3b8] block mb-1">المبلغ المودع (ريال يمني):</label>
                  <input 
                    type="number" 
                    defaultValue="50000"
                    className="w-full bg-[#01140a] border border-[rgba(245,200,66,0.2)] rounded-[8px] p-2 text-[#f5c842] font-mono font-bold focus:outline-none"
                  />
                </div>
                <button 
                  onClick={() => triggerToast && triggerToast('تم تنفيذ الإيداع النقدي بنجاح وتحديث رصيد العميل.')}
                  className="w-full py-2.5 bg-[#16a34a] hover:bg-emerald-500 text-white font-bold rounded-[8px] cursor-pointer mt-2"
                >
                  تأكيد الإيداع وطباعة السند
                </button>
              </div>
            </div>

            {/* Cash Out Panel */}
            <div className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)] space-y-3">
              <div className="flex items-center gap-2 border-b border-[rgba(245,200,66,0.15)] pb-2">
                <DollarSign className="text-amber-400" size={18} />
                <h4 className="text-[14px] font-bold text-white">سحب نقدي للعميل (Cash Out)</h4>
              </div>
              <div className="space-y-2.5 text-[12px]">
                <div>
                  <label className="text-[#94a3b8] block mb-1">رمز التحقق لمرة واحدة (OTP المولد بتطبيق العميل):</label>
                  <input 
                    type="text" 
                    placeholder="6 أرقام" 
                    defaultValue="842109"
                    className="w-full bg-[#01140a] border border-[rgba(245,200,66,0.2)] rounded-[8px] p-2 text-center text-[#f5c842] font-mono font-bold tracking-widest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#94a3b8] block mb-1">المبلغ المطلوب سحبه:</label>
                  <input 
                    type="number" 
                    defaultValue="30000"
                    className="w-full bg-[#01140a] border border-[rgba(245,200,66,0.2)] rounded-[8px] p-2 text-white font-mono focus:outline-none"
                  />
                </div>
                <button 
                  onClick={() => triggerToast && triggerToast('تمت مطابقة الرمز، تسليم النقد للعميل، وتحديث الحساب.')}
                  className="w-full py-2.5 bg-[#f5c842] hover:bg-amber-400 text-black font-bold rounded-[8px] cursor-pointer mt-2"
                >
                  اعتماد صرف النقد للعميل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Approval Workflow (6 Steps) */}
      {activeTab === 'approval_flow' && (
        <div className="space-y-4">
          <div className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)]">
            <h3 className="text-[16px] font-bold text-[#f5c842] flex items-center gap-2">
              <CheckCircle2 size={20} />
              <span>دورة الموافقات والاعتمادات السيادية الست (Approval Workflow)</span>
            </h3>
            <p className="text-[12px] text-[#94a3b8] mt-1">
              تطبيق دورة الإجراءات الحتمية: 1. قبول (Accept) ➔ 2. اعتماد (Approve) ➔ 3. حجز (Hold) ➔ 4. إفراج (Release) ➔ 5. إيقاف (Stop) ➔ 6. رفض (Reject)
            </p>
          </div>

          <div className="space-y-3">
            {approvalItems.map((req) => (
              <div 
                key={req.id} 
                className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#f5c842] text-[13px]">{req.id}</span>
                    <span className="bg-[#01140a] px-2.5 py-0.5 rounded-[6px] text-[11px] font-bold text-sky-400 border border-[rgba(245,200,66,0.2)]">
                      الحالة: {req.stage}
                    </span>
                  </div>
                  <h4 className="text-[14px] font-bold text-white">{req.title}</h4>
                  <p className="text-[11px] text-[#94a3b8]">{req.reason} • مقدم الطلب: {req.initiator} • {req.date}</p>
                </div>

                <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
                  <span className="text-[16px] font-mono font-bold text-[#f5c842]">
                    {req.amount.toLocaleString()} {req.currency}
                  </span>
                  
                  {/* The 6 Action Buttons */}
                  <div className="flex flex-wrap gap-1.5">
                    <button 
                      onClick={() => handleWorkflowAction(req.id, 'قبول (Accept)')}
                      className="px-2.5 py-1 bg-[#14532d] hover:bg-[#166534] text-emerald-200 text-[11px] font-bold rounded-[6px] cursor-pointer"
                    >
                      1. قبول
                    </button>
                    <button 
                      onClick={() => handleWorkflowAction(req.id, 'اعتماد (Approve)')}
                      className="px-2.5 py-1 bg-[#16a34a] hover:bg-emerald-600 text-white text-[11px] font-bold rounded-[6px] cursor-pointer"
                    >
                      2. اعتماد
                    </button>
                    <button 
                      onClick={() => handleWorkflowAction(req.id, 'حجز (Hold)')}
                      className="px-2.5 py-1 bg-[#78350f] hover:bg-amber-800 text-amber-200 text-[11px] font-bold rounded-[6px] cursor-pointer"
                    >
                      3. حجز
                    </button>
                    <button 
                      onClick={() => handleWorkflowAction(req.id, 'إفراج (Release)')}
                      className="px-2.5 py-1 bg-[#0284c7] hover:bg-sky-600 text-white text-[11px] font-bold rounded-[6px] cursor-pointer"
                    >
                      4. إفراج
                    </button>
                    <button 
                      onClick={() => handleWorkflowAction(req.id, 'إيقاف (Stop)')}
                      className="px-2.5 py-1 bg-[#991b1b] hover:bg-red-800 text-red-200 text-[11px] font-bold rounded-[6px] cursor-pointer"
                    >
                      5. إيقاف
                    </button>
                    <button 
                      onClick={() => handleWorkflowAction(req.id, 'رفض (Reject)')}
                      className="px-2.5 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-[11px] font-bold rounded-[6px] cursor-pointer"
                    >
                      6. رفض
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Chart of Accounts (1000 - 4000) */}
      {activeTab === 'chart_accounts' && (
        <div className="space-y-4">
          <div className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)] flex justify-between items-center">
            <div>
              <h3 className="text-[16px] font-bold text-[#f5c842] flex items-center gap-2">
                <BookOpen size={20} />
                <span>دليل الحسابات المحاسبي الموحد (Chart of Accounts)</span>
              </h3>
              <p className="text-[12px] text-[#94a3b8] mt-1">
                النظام المحاسبي القياسي: 1000 الأصول • 2000 الخصوم • 3000 الإيرادات • 4000 المصروفات
              </p>
            </div>
          </div>

          <div className="bg-[#032516] rounded-[14px] border border-[rgba(245,200,66,0.2)] overflow-x-auto">
            <table className="w-full text-right text-[12px]">
              <thead className="bg-[#01140a] text-[#f5c842] border-b border-[rgba(245,200,66,0.2)]">
                <tr>
                  <th className="p-3">رمز الحساب</th>
                  <th className="p-3">اسم الحساب</th>
                  <th className="p-3">التصنيف</th>
                  <th className="p-3">الرصيد الدفتري الحالي</th>
                  <th className="p-3">الحالة الرقابية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(245,200,66,0.1)]">
                {chartOfAccounts.map(acc => (
                  <tr key={acc.code} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-mono font-bold text-sky-400">{acc.code}</td>
                    <td className="p-3 font-bold text-white">{acc.name}</td>
                    <td className="p-3">
                      <span className="bg-[#01140a] px-2 py-0.5 rounded text-[10px] text-[#94a3b8] border border-[rgba(245,200,66,0.2)]">
                        {acc.type}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-[#f5c842]">{acc.balance}</td>
                    <td className="p-3">
                      <span className="text-emerald-400 font-bold">{acc.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: Vaults & Trust Accounts */}
      {activeTab === 'vaults' && (
        <div className="space-y-4">
          <div className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)]">
            <h3 className="text-[16px] font-bold text-[#f5c842] flex items-center gap-2">
              <Landmark size={20} />
              <span>الخزائن وحسابات الأمانة السيادية (Trust & Vault Accounts)</span>
            </h3>
            <p className="text-[12px] text-[#94a3b8] mt-1">
              فصل أموال وأمانات العملاء والجهات الحكومية والشركات عن أموال المحفظة التشغيلية بنسبة 100%.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)] space-y-2">
              <span className="text-[11px] text-[#94a3b8]">الخزينة الرئيسية (صنعاء - المركز)</span>
              <div className="text-[20px] font-mono font-bold text-[#f5c842]">640,000,000 ر.ي</div>
              <p className="text-[10px] text-emerald-400">تأمين مالي كامل وتدقيق يومي</p>
            </div>
            <div className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)] space-y-2">
              <span className="text-[11px] text-[#94a3b8]">حسابات أمانات العملاء (محمية)</span>
              <div className="text-[20px] font-mono font-bold text-[#0ea5e9]">870,000,000 ر.ي</div>
              <p className="text-[10px] text-sky-400">غير قابلة للتصرف أو الرهن</p>
            </div>
            <div className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)] space-y-2">
              <span className="text-[11px] text-[#94a3b8]">أمانات الضرائب والجمارك الحكومية</span>
              <div className="text-[20px] font-mono font-bold text-amber-400">145,000,000 ر.ي</div>
              <p className="text-[10px] text-amber-300">مخصصة للتحويل الآلي لحساب البنك المركزي</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: AML / CFT Compliance */}
      {activeTab === 'aml_cft' && (
        <div className="space-y-4">
          <div className="bg-[#7f1d1d]/30 p-4 rounded-[14px] border border-red-500/40">
            <h3 className="text-[16px] font-bold text-red-400 flex items-center gap-2">
              <Scale size={20} />
              <span>وحدة مكافحة غسل الأموال وتمويل الإرهاب (AML / CFT)</span>
            </h3>
            <p className="text-[12px] text-red-200 mt-1">
              مراقبة قوائم الحظر، فحص الشخصيات المكشوفة سياسياً (PEP)، وإصدار تقارير STR/CTR التلقائية.
            </p>
          </div>

          <div className="space-y-3">
            {amlAlerts.map(alert => (
              <div key={alert.id} className="bg-[#032516] p-4 rounded-[14px] border border-red-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-red-400 font-bold text-[12px]">{alert.id}</span>
                    <span className="text-[11px] bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-800">
                      مستوى الخطر: {alert.risk}
                    </span>
                  </div>
                  <h4 className="text-[14px] font-bold text-white">{alert.subject}</h4>
                  <p className="text-[11px] text-[#94a3b8]">{alert.target} • {alert.time}</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  <span className="text-[15px] font-mono font-bold text-[#f5c842]">{alert.amount}</span>
                  <button 
                    onClick={() => triggerToast && triggerToast(`تم اتخاذ الإجراء الرقابي على التنبيه ${alert.id}`)}
                    className="px-3 py-1.5 bg-[#dc2626] hover:bg-red-700 text-white font-bold text-[11px] rounded-[8px] cursor-pointer"
                  >
                    تجميد وفحص STR
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: External Integrations */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <div className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)]">
            <h3 className="text-[16px] font-bold text-[#f5c842] flex items-center gap-2">
              <Radio size={20} />
              <span>منظومة الربط والتكاملات الخارجية وبوابات الدفع</span>
            </h3>
            <p className="text-[12px] text-[#94a3b8] mt-1">
              ربط مباشر مع شبكات البنوك المحلية، شركات الاتصالات الكبرى، والأنظمة الحكومية عبر بروتوكولات مؤمنة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {integrations.map((itg, idx) => (
              <div key={idx} className="bg-[#032516] p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] flex justify-between items-center">
                <div>
                  <h4 className="text-[13px] font-bold text-white">{itg.name}</h4>
                  <p className="text-[11px] text-[#94a3b8]">{itg.type}</p>
                  <span className="text-[10px] text-sky-400 mt-0.5 block">{itg.volume}</span>
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-bold">{itg.status}</span>
                  <span className="text-[10px] text-[#94a3b8] block font-mono">استجابة: {itg.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: Database & 13 Roles Seed */}
      {activeTab === 'seed_db' && (
        <div className="space-y-4">
          <div className="bg-[#032516] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)]">
            <h3 className="text-[16px] font-bold text-[#f5c842] flex items-center gap-2">
              <Server size={20} />
              <span>مصفوفة الأدوار الـ 13 وبنية البيانات الجاهزة (Seed Database)</span>
            </h3>
            <p className="text-[12px] text-[#94a3b8] mt-1">
              توثيق الأدوار الـ 13 الكاملة (من المالك الأعلى إلى العميل) وجداول قاعدة البيانات القياسية.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-[12px]">
            {[
              { role: 'owner', label: 'المالك الأعلى (Owner)', icon: '👑', access: 'كل الصلاحيات السيادية' },
              { role: 'system_admin', label: 'مدير النظام', icon: '⚙️', access: 'البنية والإعدادات' },
              { role: 'admin', label: 'المسؤول العام', icon: '👔', access: 'الإدارة والعمليات' },
              { role: 'finance_manager', label: 'المدير المالي', icon: '💰', access: 'الخزينة والمقاصة' },
              { role: 'compliance', label: 'مسؤول الامتثال', icon: '⚖️', access: 'AML / CFT و STR' },
              { role: 'auditor', label: 'المدقق المالي', icon: '🔍', access: 'سجلات التدقيق الكاملة' },
              { role: 'agent_manager', label: 'مدير شبكة الوكلاء', icon: '🤝', access: 'السيولة والعمولات' },
              { role: 'salary_manager', label: 'مدير صرف الرواتب', icon: '💵', access: 'المؤسسات والوزارات' },
              { role: 'support_agent', label: 'الدعم الفني', icon: '🎧', access: 'التذاكر والنزاعات' },
              { role: 'operations', label: 'مسؤول العمليات', icon: '🏢', access: 'متابعة المعاملات' },
              { role: 'finance', label: 'المحاسب', icon: '💼', access: 'القيود واليومية' },
              { role: 'agent', label: 'الوكيل الميداني', icon: '👤', access: 'Cash In / Out' },
              { role: 'customer', label: 'العميل النهائي', icon: '🧑', access: 'تطبيق المحفظة الشخصي' }
            ].map(r => (
              <div key={r.role} className="bg-[#032516] p-3 rounded-[12px] border border-[rgba(245,200,66,0.15)] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <span>{r.icon}</span>
                  <span>{r.label}</span>
                </div>
                <p className="text-[10px] text-sky-400 font-mono">{r.role}</p>
                <p className="text-[10px] text-[#94a3b8]">{r.access}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
