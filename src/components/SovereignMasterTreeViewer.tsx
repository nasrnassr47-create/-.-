import React, { useState } from 'react';
import { 
  FolderTree, 
  ChevronRight, 
  ChevronDown, 
  Layers, 
  ShieldCheck, 
  Database, 
  Smartphone, 
  Cpu, 
  Server, 
  Search, 
  CheckCircle2, 
  FileText, 
  Download, 
  Code2, 
  Terminal, 
  Copy, 
  BookOpen, 
  Building2, 
  Zap, 
  Lock, 
  Sparkles,
  ExternalLink,
  Store,
  UserCheck,
  Scale,
  Landmark,
  Radio,
  Sliders,
  DollarSign,
  Award
} from 'lucide-react';

interface TreeNode {
  id: string;
  name: string;
  category?: string;
  description?: string;
  badge?: string;
  children?: TreeNode[];
  iconType?: 'layer' | 'shield' | 'db' | 'phone' | 'server' | 'api' | 'finance' | 'admin' | 'doc';
}

export const SovereignMasterTreeViewer: React.FC<{
  onOpenScreen?: (screenId: string) => void;
  triggerToast?: (msg: string) => void;
}> = ({ onOpenScreen, triggerToast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'section-1': true,
    'section-2': true,
    'section-3': true,
    'section-4': true,
    'section-5': true,
    'section-6': true,
    'section-7': true,
    'section-8': true,
    'section-9': true,
  });
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  // Complete V8.0 Sovereign Tree Structure
  const masterTree: TreeNode[] = [
    {
      id: 'section-1',
      name: '🔐 1. نظام الدخول (Login System)',
      badge: '13 دور',
      description: 'بوابة تسجيل الدخول الآمنة مع دعم 13 دوراً مستقلاً وكلمات مرور تجريبية وتطبيق عميل منفصل',
      children: [
        { id: 'sec1-1', name: '13 دور مستقل (من owner وصولاً إلى customer)' },
        { id: 'sec1-2', name: 'كلمات مرور تجريبية مخصصة لكل دور لاختبار الصلاحيات' },
        { id: 'sec1-3', name: 'تطبيق عميل منفصل مع واجهة دخول سريعة برقم الجوال و OTP' }
      ]
    },
    {
      id: 'section-2',
      name: '🏠 2. لوحة القيادة (Dashboard)',
      badge: '8 مؤشرات',
      description: 'لوحة التحكم والمتابعة الرئيسية مع المؤشرات الحيوية ومركز العمليات والتدفق اللحظي',
      children: [
        { id: 'sec2-1', name: '8 مؤشرات رئيسية (السيولة الكلية، الاحتياطي، العمليات، التدقيق، إلخ)' },
        { id: 'sec2-2', name: 'مركز العمليات المباشر والتحكم اللحظي' },
        { id: 'sec2-3', name: 'تدفق المعاملات المالية المباشرة والرسوم البيانية' }
      ]
    },
    {
      id: 'section-3',
      name: '👥 3. الإدارة الأساسية (25 وحدة)',
      badge: '25 وحدة',
      description: 'الوحدات الإدارية الأساسية للمنظومة المالية والتشغيلية',
      children: [
        { id: 'sec3-admin', name: '📊 لوحة التحكم السيادية (Admin)' },
        { id: 'sec3-users', name: '👤 المستخدمون والصلاحيات (Users - 13 دور + مصفوفة الصلاحيات)' },
        { id: 'sec3-cust', name: '🧑‍🤝‍🧑 العملاء والمشتركون (Customers - بحث ذكي + KYC وتوثيق)' },
        { id: 'sec3-emp', name: '♙ الموظفون (Employees)' },
        { id: 'sec3-branch', name: '🏢 الفروع (Branches)' },
        { id: 'sec3-agent', name: '🤝 الوكلاء (Agents)' },
        { id: 'sec3-serv', name: '🧩 الخدمات (Services)' },
        { id: 'sec3-req', name: '📑 الطلبات والموافقات (Requests)' },
        { id: 'sec3-tx', name: '💸 المعاملات (Transactions - Idempotency + سحب/إيداع/تحويل)' },
        { id: 'sec3-ledg', name: '📒 الدفتر المالي (Double-Entry Ledger)' },
        { id: 'sec3-fin', name: '💰 الخزينة والبنوك (Finance)' },
        { id: 'sec3-hr', name: '👔 الرواتب المؤسسية (HR Finance)' },
        { id: 'sec3-cost', name: '🧮 مراكز التكلفة (Cost Centers)' },
        { id: 'sec3-kyc', name: '🛡️ KYC / الامتثال (Compliance)' },
        { id: 'sec3-risk', name: '⚠️ إدارة المخاطر (Risk Management)' },
        { id: 'sec3-rec', name: '🔄 التسويات والمطابقة (Reconciliation)' },
        { id: 'sec3-rep', name: '📊 التقارير والإحصائيات (Reports)' },
        { id: 'sec3-alt', name: '🔔 التنبيهات والإشعارات (Alerts)' },
        { id: 'sec3-aud', name: '🔍 السجل والرقابة التدقيقية (Audit)' },
        { id: 'sec3-capp', name: '📱 تطبيق العميل (Customer App)' },
        { id: 'sec3-sys', name: '⚙️ مركز النظام (System)' },
        { id: 'sec3-dev', name: '🛠 مركز التطوير (Dev)' },
        { id: 'sec3-set', name: '☷ الإعدادات العامة (Settings)' }
      ]
    },
    {
      id: 'section-4',
      name: '🆕 4. الوحدات الجديدة V8.0 (30 وحدة متطورة)',
      badge: '30 وحدة V8',
      description: 'حزمة الوحدات التخصصية الجديدة V8.0 عبر الطبقات الست المتكاملة',
      children: [
        {
          id: 'v8-layer-client',
          name: '━━ طبقة العميل ━━',
          children: [
            { id: 'v8-merch', name: '🏪 تطبيق التاجر (Merchant App - SoftPOS / Tap-to-Phone / QR ديناميكي)' },
            { id: 'v8-agapp', name: '👤 تطبيق الوكيل (Agent App - Cash In/Out / بحث العملاء / التسوية اليومية)' },
            { id: 'v8-web', name: '🌐 البوابة الإلكترونية (Web Portal - شاشة كمبيوتر سطح المكتب)' },
            { id: 'v8-fam', name: '👨‍👩‍👧‍👦 حسابات الأسرة والنشء (Family - حدود موجهة / ادخار عائلي / حصالة ذكية)' }
          ]
        },
        {
          id: 'v8-layer-flow',
          name: '━━ التحكم والموافقات ━━',
          children: [
            { id: 'v8-wf', name: '📋 سير الموافقات الست (1. قبول ➔ 2. اعتماد ➔ 3. حجز ➔ 4. إفراج ➔ 5. إيقاف ➔ 6. رفض)' },
            { id: 'v8-frz', name: '❄️ التجميد والفتح والضبط الاحترازي (Freeze & Unfreeze)' },
            { id: 'v8-onb', name: '🚪 قنوات الاشتراك الـ 5 (تطبيق العميل، عبر الوكيل، USSD، الموقع، API شركاء)' }
          ]
        },
        {
          id: 'v8-layer-acc',
          name: '━━ المحاسبة المتقدمة ━━',
          children: [
            { id: 'v8-coa', name: '📒 دليل الحسابات القياسي (1000 الأصول، 2000 الخصوم، 3000 الإيرادات، 4000 المصروفات)' },
            { id: 'v8-tru', name: '🛡️ حسابات الأمانة السيادية (أمانات العملاء، أمانات حكومية، أمانات الشركات)' },
            { id: 'v8-vlt', name: '🏛️ الخزائن (الخزنة الرئيسية، خزائن الفروع، خزائن الوكلاء)' },
            { id: 'v8-csh', name: '💵 حركات النقد والسيولة الفورية (Cash Movements)' },
            { id: 'v8-stl', name: '🔀 التسويات المتقدمة (تسويات الوكلاء، تسويات التجار، تسويات البنوك)' }
          ]
        },
        {
          id: 'v8-layer-sec',
          name: '━━ الأمن والامتثال ━━',
          children: [
            { id: 'v8-aml', name: '⚖️ AML / CFT (قوائم الحظر، فحص PEP، وتقارير STR/CTR التلقائية)' },
            { id: 'v8-sec', name: '🔐 الطبقة الأمنية (AES-256، JWT 1 ساعة، WAF/DDoS، Brute Force، Device Fingerprint)' },
            { id: 'v8-emp-mon', name: '👁️ مراقبة الموظفين وتتبع الوصول (Employee Monitor)' },
            { id: 'v8-inv', name: '📦 الحصر والجرد والعهد (Inventory)' }
          ]
        },
        {
          id: 'v8-layer-itg',
          name: '━━ التكامل والدعم ━━',
          children: [
            { id: 'v8-itg-bank', name: '🔌 التكاملات الخارجية (الكريمي، النجم، سبأ، يمن موبايل، سبأفون، ضرائب، SWIFT)' },
            { id: 'v8-gw', name: '💳 بوابات الدفع (Visa/Mastercard، M-Pesa، محفظة يمن موبايل)' },
            { id: 'v8-dops', name: '🖥️ بنية تحتية DevOps (PostgreSQL، Redis، Docker/K8s، Prometheus/Grafana)' },
            { id: 'v8-sup', name: '🎧 مركز الدعم الفني ونظام التذاكر (Support & Tickets)' }
          ]
        },
        {
          id: 'v8-layer-gov',
          name: '━━ الحوكمة والقانون ━━',
          children: [
            { id: 'v8-leg', name: '⚖️ الإطار القانوني واللوائح المنظمة (Legal Framework)' },
            { id: 'v8-gov', name: '🏢 الإدارة والحوكمة والموارد (Governance)' },
            { id: 'v8-tst', name: '🧪 الاختبارات الشاملة (Unit & Integration Tests)' }
          ]
        }
      ]
    },
    {
      id: 'section-5',
      name: '🌳 5. الشجرة الكاملة (Blueprint Viewer)',
      badge: 'تصدير .txt',
      description: 'عرض تفاعلي شامل لكافة فروع النظام مع إمكانية تصدير المخطط كاملاً كملف نصي .txt أو PDF',
      children: [
        { id: 'sec5-1', name: 'عرض تفاعلي كامل للشجرة مع البحث الحي' },
        { id: 'sec5-2', name: 'تصدير الشجرة الكاملة كملف Blueprint .txt' },
        { id: 'sec5-3', name: 'تغطية الـ 12 قسماً رئيسياً في المعمارية' }
      ]
    },
    {
      id: 'section-6',
      name: '📅 6. خارطة الطريق السيادية (Roadmap 0-12)',
      badge: '13 مرحلة',
      description: 'مراحل التطوير والنشر من التأسيس إلى التطبيق الفائق Super-App',
      children: [
        { id: 'rd-0', name: 'المرحلة 0: التأسيس والبنية التحتية' },
        { id: 'rd-1', name: 'المرحلة 1: الإطار القانوني والتراخيص' },
        { id: 'rd-2', name: 'المرحلة 2: التصميم وواجهات المستخدم' },
        { id: 'rd-3', name: 'المرحلة 3: خوادم Backend ومحرك العمليات' },
        { id: 'rd-4', name: 'المرحلة 4: تطبيقات Frontend وبوابات الويب' },
        { id: 'rd-5', name: 'المرحلة 5: تطبيقات الهواتف Mobile (Flutter/APK)' },
        { id: 'rd-6', name: 'المرحلة 6: الدرع الأمني والامتثال AML' },
        { id: 'rd-7', name: 'المرحلة 7: الاختبارات والتدقيق الجنائي' },
        { id: 'rd-8', name: 'المرحلة 8: الإطلاق التجريبي (Sandbox/Beta)' },
        { id: 'rd-9', name: 'المرحلة 9: الإطلاق التجاري الرسمي' },
        { id: 'rd-10', name: 'المرحلة 10: التوسع والنمو في السوق المحلي' },
        { id: 'rd-11', name: 'المرحلة 11: التوسع الإقليمي والربط الدولي' },
        { id: 'rd-12', name: 'المرحلة 12: التحول للتطبيق الشامل (Super-App)' }
      ]
    },
    {
      id: 'section-7',
      name: '👥 7. الأدوار الـ 13 (Roles & Permissions)',
      badge: '13 دور معتمد',
      description: 'هيكل الصلاحيات الصارم RBAC لضمان الفصل التام بين المهام الرقابية والتشغيلية',
      children: [
        { id: 'rl-1', name: '👑 owner (المالك الأعلى - كل الصلاحيات السيادية)' },
        { id: 'rl-2', name: '⚙️ system_admin (مدير النظام والتقنية)' },
        { id: 'rl-3', name: '👔 admin (المسؤول الإداري)' },
        { id: 'rl-4', name: '💰 finance_manager (المدير المالي والخزائن)' },
        { id: 'rl-5', name: '🎧 support_agent (وكيل الدعم وخدمة العملاء)' },
        { id: 'rl-6', name: '🔍 auditor (المدقق الخارجي وسجلات التدقيق)' },
        { id: 'rl-7', name: '🤝 agent_manager (مدير شبكة الوكلاء المعتمدين)' },
        { id: 'rl-8', name: '💵 salary_manager (مدير الرواتب والمؤسسات)' },
        { id: 'rl-9', name: '⚖️ compliance (مسؤول الامتثال ومكافحة غسل الأموال)' },
        { id: 'rl-10', name: '🏢 operations (مسؤول العمليات اليومية)' },
        { id: 'rl-11', name: '💼 finance (المحاسب المالي)' },
        { id: 'rl-12', name: '👤 agent (الوكيل الميداني - نقاط السيولة)' },
        { id: 'rl-13', name: '🧑 customer (العميل - صاحب المحفظة)' }
      ]
    },
    {
      id: 'section-8',
      name: '🗄️ 8. قاعدة البيانات المهيأة (Seed Data)',
      badge: '32 جدول بذور',
      description: 'بيانات أولية نموذجية متكاملة لجميع وحدات ومرافق النظام لتشغيل واختبار فوري',
      children: [
        { id: 'sd-1', name: '13 مستخدم • 3 عملاء • 3 موظفين • 3 فروع • 2 وكلاء' },
        { id: 'sd-2', name: '4 خدمات • 3 طلبات • 3 معاملات • 3 قيود محاسبية • 3 بنوك' },
        { id: 'sd-3', name: '2 مسير رواتب • 3 مراكز تكلفة • 2 KYC • 2 حالات تجميد • 3 تنبيهات' },
        { id: 'sd-4', name: '2 سجل تدقيق • 3 تجار • 2 POS • 2 حسابات أسرة • 3 سير موافقات' },
        { id: 'sd-5', name: '4 مجموعات حسابات • 3 حسابات أمانة • 4 خزائن • 3 حركات نقدية' },
        { id: 'sd-6', name: '2 تسويات • 5 قنوات اشتراك • 7 تكاملات • 3 بوابات دفع' },
        { id: 'sd-7', name: '3 تنبيهات AML • 2 أحداث أمنية • 3 سجلات مراقبة • 4 مخزون • 3 تذاكر دعم' }
      ]
    },
    {
      id: 'section-9',
      name: '🔧 9. الإضافات المستقبلية (Future Roadmap Addons)',
      badge: '11 إضافة ذكية',
      description: 'الميزات المتقدمة للتحول نحو البنك الرقمي الذكي والتقنيات الفائقة',
      children: [
        { id: 'ft-1', name: '➕ Payment Links / Me-Link (روابط الدفع السريعة والمشاركة)' },
        { id: 'ft-2', name: '➕ Smart Piggy Bank (الحصالة الذكية للادخار التلقائي للأسرة)' },
        { id: 'ft-3', name: '➕ Offline / USSD & SMS (الدفع والتحويل بدون اتصال بالإنترنت)' },
        { id: 'ft-4', name: '➕ SoftPOS / Tap-to-Phone (تحويل الهاتف لماكينة دفع بالبطاقة)' },
        { id: 'ft-5', name: '➕ Micro-loans (التمويل الأصغر والقروض الصغيرة الميسرة)' },
        { id: 'ft-6', name: '➕ التأمين المصغّر (Micro-insurance ضد الحوادث والصحة)' },
        { id: 'ft-7', name: '➕ الاستثمار الذكي (صناديق الاستثمار والذهب الرقمي)' },
        { id: 'ft-8', name: '➕ Open Banking (المصرفية المفتوحة وربط الحسابات البنكية)' },
        { id: 'ft-9', name: '➕ Chatbot مساعد ذكي آلي للمحفظة' },
        { id: 'ft-10', name: '➕ الذكاء الاصطناعي لكشف الاحتيال وتوقع السيولة' }
      ]
    }
  ];

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const handleDownloadBlueprintTxt = () => {
    const blueprintText = `
═══════════════════════════════════════════════════════════════════
       🏛️ NASR WALLET Ω — V8.0 SOVEREIGN ARCHITECTURAL BLUEPRINT
═══════════════════════════════════════════════════════════════════
تاريخ التصدير: ${new Date().toLocaleString('ar-YE')}
الترخيص: نصر والت - سيادية كاملة 100%

` + JSON.stringify(masterTree, null, 2);

    const blob = new Blob([blueprintText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Nasr_Wallet_V8_Sovereign_Blueprint_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    if (triggerToast) triggerToast('تم تصدير وحفظ ملف الشجرة الكاملة (.txt) بنجاح.');
  };

  const handleCopyTreeAsText = () => {
    const textData = JSON.stringify(masterTree, null, 2);
    navigator.clipboard.writeText(textData);
    if (triggerToast) triggerToast('تم نسخ المخطط الشجري V8.0 الكامل إلى الحافظة.');
  };

  return (
    <div className="bg-[#032516] border border-[rgba(245,200,66,0.3)] rounded-[16px] p-4 text-white space-y-4 shadow-xl select-none" dir="rtl">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-[rgba(245,200,66,0.2)] pb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[12px] bg-[#01140a] border border-[#f5c842] flex items-center justify-center shrink-0">
            <FolderTree className="text-[#f5c842]" size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[17px] font-black text-white">
                المخطط الشجري السيادي الكامل (NASR WALLET Ω — V8.0 SOVEREIGN)
              </h2>
              <span className="bg-[#f5c842]/20 text-[#f5c842] border border-[#f5c842]/40 text-[10px] font-bold px-2 py-0.5 rounded-[8px]">
                شامل الأقسام الـ 9 بدقة
              </span>
            </div>
            <p className="text-[12px] text-[#94a3b8] mt-0.5">
              1. الدخول • 2. القيادة • 3. الأساسية (25 وحدة) • 4. الجديدة V8 (30 وحدة) • 5. الشجرة • 6. الخارطة • 7. الأدوار الـ13 • 8. البيانات • 9. الإضافات
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadBlueprintTxt}
            className="px-3 py-1.5 bg-[#01140a] hover:bg-[#032516] text-[#0ea5e9] border border-[#0ea5e9]/40 rounded-[8px] text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Download size={13} />
            <span>تصدير .txt</span>
          </button>

          <button
            onClick={handleCopyTreeAsText}
            className="px-3 py-1.5 bg-[#f5c842] hover:bg-amber-300 text-black rounded-[8px] text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Copy size={13} />
            <span>نسخ الشجرة JSON</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ابحث في أقسام V8.0 (مثل: SoftPOS، موافقات، أمانة، 1000 الأصول، AML، وكلاء، 13 دور)..."
          className="w-full bg-[#01140a] text-[13px] text-white border border-[rgba(245,200,66,0.3)] rounded-[10px] pr-10 pl-4 py-2.5 focus:border-[#f5c842] focus:outline-none"
        />
        <Search className="absolute right-3.5 top-3 text-[#94a3b8]" size={16} />
      </div>

      {/* Tree & Node Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* The Tree View on the Right */}
        <div className="lg:col-span-8 bg-[#01140a] border border-[rgba(245,200,66,0.2)] rounded-[12px] p-3 max-h-[640px] overflow-y-auto space-y-2">
          {masterTree
            .filter(node => 
              searchTerm === '' || 
              node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              node.children?.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .map((layer) => {
              const isLayerOpen = expandedNodes[layer.id] ?? false;
              return (
                <div key={layer.id} className="border border-[rgba(245,200,66,0.15)] rounded-[10px] overflow-hidden bg-[#021d10]">
                  {/* Layer Header */}
                  <div 
                    onClick={() => toggleNode(layer.id)}
                    className="p-3 bg-[#032516] hover:bg-[#063d25] flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {isLayerOpen ? <ChevronDown size={16} className="text-[#f5c842]" /> : <ChevronRight size={16} className="text-[#94a3b8]" />}
                      <span className="font-bold text-[14px] text-white">{layer.name}</span>
                    </div>
                    {layer.badge && (
                      <span className="bg-[#f5c842]/20 text-[#f5c842] text-[11px] font-bold px-2 py-0.5 rounded-[6px] border border-[#f5c842]/30">
                        {layer.badge}
                      </span>
                    )}
                  </div>

                  {/* Layer Sub-nodes */}
                  {isLayerOpen && layer.children && (
                    <div className="p-2 space-y-1 bg-[#01140a] divide-y divide-[rgba(245,200,66,0.08)]">
                      {layer.children.map((child) => (
                        <div key={child.id} className="pt-1.5 first:pt-0">
                          <div 
                            onClick={() => setSelectedNode(child)}
                            className="p-2 hover:bg-[#032516] rounded-[6px] cursor-pointer flex items-center justify-between text-[13px] text-zinc-200 transition-colors"
                          >
                            <span className="font-medium text-emerald-200">{child.name}</span>
                            {child.children && (
                              <span className="text-[10px] text-sky-400 bg-sky-950 px-1.5 py-0.5 rounded border border-sky-800">
                                {child.children.length} عناصر
                              </span>
                            )}
                          </div>

                          {/* Sub-children */}
                          {child.children && (
                            <div className="pr-4 pl-2 py-1 space-y-1">
                              {child.children.map((sub) => (
                                <div 
                                  key={sub.id} 
                                  onClick={() => setSelectedNode(sub)}
                                  className="text-[12px] text-[#94a3b8] hover:text-white p-1 hover:bg-white/5 rounded cursor-pointer transition-colors"
                                >
                                  • {sub.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Inspector Panel on the Left */}
        <div className="lg:col-span-4 bg-[#01140a] border border-[rgba(245,200,66,0.2)] rounded-[12px] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-[rgba(245,200,66,0.2)] pb-2 mb-3">
              <Zap className="text-[#f5c842]" size={18} />
              <h3 className="text-[14px] font-bold text-[#f5c842]">تفاصيل العنصر المختار</h3>
            </div>

            {selectedNode ? (
              <div className="space-y-3 text-[12px]">
                <div>
                  <span className="text-[#94a3b8] block">الاسم:</span>
                  <span className="text-[14px] font-bold text-white block mt-0.5">{selectedNode.name}</span>
                </div>
                {selectedNode.description && (
                  <div>
                    <span className="text-[#94a3b8] block">الوصف الهندسي والتشغيلي:</span>
                    <p className="text-zinc-300 mt-1 leading-relaxed bg-[#032516] p-2 rounded-[8px] border border-[rgba(245,200,66,0.15)]">
                      {selectedNode.description}
                    </p>
                  </div>
                )}
                <div className="space-y-1 bg-[#032516] p-2.5 rounded-[8px] border border-[rgba(245,200,66,0.15)]">
                  <div className="flex justify-between">
                    <span className="text-[#94a3b8]">الرمز المعماري:</span>
                    <span className="font-mono text-[#f5c842]">{selectedNode.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94a3b8]">الإصدار والسيادة:</span>
                    <span className="text-emerald-400 font-bold">V8.0 Sovereign</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-[#94a3b8] space-y-2">
                <Layers size={32} className="mx-auto text-[#f5c842]/40" />
                <p className="text-[12px]">اختر أي فرع أو طبقة من الشجرة لعرض تفاصيلها المعمارية والبرمجية هنا.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[rgba(245,200,66,0.15)] mt-4">
            <button
              onClick={() => onOpenScreen && onOpenScreen('v8_hub')}
              className="w-full py-2.5 bg-gradient-to-r from-[#f5c842] to-amber-400 hover:from-amber-400 hover:to-yellow-300 text-black rounded-[8px] text-[12px] font-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
            >
              <Store size={15} />
              <span>فتح وحدة القيادة التنفيذية V8.0</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SovereignMasterTreeViewer;
