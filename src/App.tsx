import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  Shield, 
  ArrowLeft,
  CheckCircle2,
  Coins,
  Send,
  PlusCircle,
  CreditCard,
  Menu,
  Download,
  Monitor
} from 'lucide-react';

import { Sidebar } from './components/Sidebar';
import { NasrWalletGridDashboard } from './components/NasrWalletGridDashboard';
import { SovereignControlRoom } from './components/SovereignControlRoom';
import { YemenTelecomServices } from './components/YemenTelecomServices';
import { StandaloneClientApp } from './components/StandaloneClientApp';
import { FamilyKidsSystem } from './components/FamilyKidsSystem';
import { EnterpriseArchive } from './components/EnterpriseArchive';
import { YemenWalletEncyclopedia } from './components/YemenWalletEncyclopedia';
import { TransactionReports } from './components/TransactionReports';
import { SmartChat } from './components/SmartChat';
import { DeveloperCliModal } from './components/DeveloperCliModal';
import { DocumentationCenterModal } from './components/DocumentationCenterModal';
import { CustomerManagementHub } from './components/CustomerManagementHub';
import { ApkDistributionModal } from './components/ApkDistributionModal';
import { SovereignSettlementVaultHub } from './components/SovereignSettlementVaultHub';
import { SovereignInstitutionalErpHub } from './components/SovereignInstitutionalErpHub';
import { SovereignMasterTreeViewer } from './components/SovereignMasterTreeViewer';
import { SovereignV8ExecutiveHub } from './components/SovereignV8ExecutiveHub';

import { 
  INITIAL_WALLET_BALANCE, 
  INITIAL_RESERVES_USD, 
  INITIAL_TRANSACTIONS, 
  INITIAL_APPROVALS, 
  INITIAL_BANKS, 
  INITIAL_CARDS,
  INITIAL_TELECOM_PACKAGES,
  INITIAL_CUSTOMERS,
  INITIAL_REGISTRATION_REQUESTS,
  INITIAL_FINANCIAL_HOLDS,
  INITIAL_GOVERNMENT_SERVICES,
  INITIAL_SMS_NOTIFICATIONS
} from './initialData';
import { 
  Transaction, 
  ApprovalRequest, 
  TelecomPackage, 
  BankAccount, 
  VirtualCard, 
  Customer,
  RegistrationRequest,
  FinancialHold,
  GovernmentService,
  SmsNotification
} from './types';

export const App: React.FC = () => {
  const [walletBalance, setWalletBalance] = useState<number>(INITIAL_WALLET_BALANCE);
  const [reservesUSD, setReservesUSD] = useState<number>(INITIAL_RESERVES_USD);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(INITIAL_APPROVALS);
  const [banks, setBanks] = useState<BankAccount[]>(INITIAL_BANKS);
  const [cards, setCards] = useState<VirtualCard[]>(INITIAL_CARDS);
  const [telecomPackages, setTelecomPackages] = useState<TelecomPackage[]>(INITIAL_TELECOM_PACKAGES);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [registrationRequests, setRegistrationRequests] = useState<RegistrationRequest[]>(INITIAL_REGISTRATION_REQUESTS);
  const [financialHolds, setFinancialHolds] = useState<FinancialHold[]>(INITIAL_FINANCIAL_HOLDS);
  const [governmentServices, setGovernmentServices] = useState<GovernmentService[]>(INITIAL_GOVERNMENT_SERVICES);
  const [notifications, setNotifications] = useState<SmsNotification[]>(INITIAL_SMS_NOTIFICATIONS);

  const [activeScreen, setActiveScreen] = useState<string>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
  const [isCliOpen, setIsCliOpen] = useState(false);
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [isDesktopMode, setIsDesktopMode] = useState<boolean>(false);
  const [reconciling, setReconciling] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [searchQuery, setSearchQuery] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApprove = (id: string) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'approved' } : a));
    triggerToast('تم اعتماد العملية بنجاح وإصدار القيد المصرفي.');
  };

  const handleReject = (id: string) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' } : a));
    triggerToast('تم رفض المعاملة وإعادتها للتدقيق.');
  };

  const handleFlagTransaction = (id: string) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'flagged' ? 'completed' : 'flagged';
        return { ...t, status: nextStatus, riskScore: nextStatus === 'flagged' ? 95 : 5 };
      }
      return t;
    }));
    triggerToast('تم تحديث حالة الرقابة السيادية للمعاملة.');
  };

  const handleRechargeTelecom = (pkg: TelecomPackage, phone: string) => {
    setWalletBalance(prev => prev - pkg.price);
    const newTx: Transaction = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      type: 'telecom',
      amount: pkg.price,
      currency: 'YER',
      sender: 'خزينة نصر والت',
      recipient: phone,
      recipientName: `${pkg.name} - ${phone}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' }),
      status: 'completed',
      referenceNo: `TEL-${Math.floor(100000 + Math.random() * 900000)}`,
      category: 'سداد اتصالات',
      riskScore: 1
    };
    setTransactions(prev => [newTx, ...prev]);
    triggerToast(`تم تسديد باقة ${pkg.name} بنجاح.`);
  };

  const handleReconcile = () => {
    setReconciling(true);
    setTimeout(() => {
      setReconciling(false);
      triggerToast('تمت مطابقة قيود اليومية مع الخزينة المركزية بنسبة تطابق 100%.');
    }, 1200);
  };

  return (
    <div className={`min-h-screen bg-[#01140a] text-white flex flex-col font-sans ${isDesktopMode ? 'min-w-[1340px] overflow-x-auto' : ''}`} dir="rtl">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#032516] border border-[#f5c842] text-white px-4 py-2.5 rounded-[12px] shadow-2xl flex items-center gap-2 text-[13px] animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={18} className="text-[#f5c842]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#032516] border-b border-[rgba(245,200,66,0.3)] px-4 py-2.5 shadow-md">
        <div className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 ${isDesktopMode ? 'w-[1300px] max-w-none' : ''}`}>
          
          {/* Mobile Menu Button & Logo */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsSidebarMobileOpen(!isSidebarMobileOpen)}
              className="md:hidden w-9 h-9 bg-[#01140a] hover:bg-[#032516] rounded-[10px] border border-[rgba(245,200,66,0.3)] flex items-center justify-center text-[#f5c842] transition-all cursor-pointer active:scale-95"
              title="فتح القائمة الجانبية"
            >
              <Menu size={18} />
            </button>

            <div className="flex items-center gap-2.5 shrink-0 cursor-pointer" onClick={() => setActiveScreen('dashboard')}>
              <div className="w-9 h-9 rounded-[10px] bg-[#01140a] border border-[#f5c842] flex items-center justify-center">
                <Shield size={20} className="text-[#f5c842]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[18px] font-bold text-[#f5c842] tracking-wide">نصر والت</span>
                <span className="text-[10px] bg-[#f5c842]/20 text-[#f5c842] border border-[#f5c842]/40 font-bold px-2 py-0.5 rounded-[10px]">
                  v7.0
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar - Height 44px, light gold border, search icon right */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث في السجلات، الباقات، أو رقم المشترك..."
              className="w-full h-[44px] bg-[#01140a] text-[13px] text-white placeholder:text-[#94a3b8] border border-[rgba(245,200,66,0.3)] rounded-[10px] pr-10 pl-4 py-2 focus:border-[#f5c842] focus:ring-1 focus:ring-[#f5c842] focus:outline-none transition-all"
            />
            <Search size={16} className="absolute right-3.5 top-3.5 text-[#f5c842]" />
          </div>

          {/* Actions - Height 36px equal sizing */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            {/* Profile badge */}
            <div className="h-9 flex items-center gap-2 bg-[#01140a] hover:bg-[#032516] border border-[rgba(245,200,66,0.3)] px-3 rounded-[10px] transition-all cursor-pointer">
              <div className="w-5 h-5 rounded-full bg-[#f5c842] text-black flex items-center justify-center text-[10px] font-bold">N</div>
              <div className="text-right">
                <div className="text-[11px] font-semibold text-white leading-tight">نصر والت</div>
                <div className="text-[9px] text-[#16a34a] font-medium leading-none">{walletBalance.toLocaleString()} ر.ي</div>
              </div>
            </div>

            {/* Language toggle */}
            <button
              onClick={() => {
                setLang(prev => prev === 'ar' ? 'en' : 'ar');
                triggerToast(lang === 'ar' ? 'Language switched to English' : 'تم تحويل اللغة إلى العربية');
              }}
              className="w-9 h-9 bg-[#01140a] hover:bg-[#032516] rounded-[10px] border border-[rgba(245,200,66,0.3)] flex items-center justify-center text-[11px] font-semibold text-[#f5c842] transition-all cursor-pointer active:scale-[0.98]"
              title="تغيير اللغة"
            >
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>

            {/* Notifications */}
            <button
              onClick={() => triggerToast('لا توجد إشعارات خطيرة. منظومة الرقابة تعمل باستقرار تام.')}
              className="w-9 h-9 bg-[#01140a] hover:bg-[#032516] rounded-[10px] border border-[rgba(245,200,66,0.3)] flex items-center justify-center text-[#f5c842] relative transition-all cursor-pointer active:scale-[0.98]"
              title="الإشعارات"
            >
              <Bell size={16} className="text-[#f5c842]" />
              <span className="absolute -top-1 -left-1 w-4 h-4 bg-[#dc2626] rounded-full text-white text-[8px] font-bold flex items-center justify-center">
                {approvals.filter(a => a.status === 'pending').length}
              </span>
            </button>

            {/* Download APK & Web Button */}
            <button
              onClick={() => setIsApkModalOpen(true)}
              className="h-9 px-3 bg-gradient-to-r from-[#b45309] to-[#78350f] hover:from-[#f5c842] hover:to-[#b45309] hover:text-black text-white rounded-[10px] text-[11px] font-bold border border-[#f5c842] shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-[0.98]"
              title="تنزيل APK النظام وتطبيق المشترك ونسخة الويب"
            >
              <Download size={14} className="text-[#f5c842]" />
              <span className="hidden sm:inline">تنزيل APK والويب</span>
              <span className="sm:hidden">APK</span>
            </button>

            {/* Desktop Mode Toggle Button */}
            <button
              onClick={() => {
                const nextMode = !isDesktopMode;
                setIsDesktopMode(nextMode);
                triggerToast(nextMode 
                  ? 'تم تفعيل وضع شاشة كمبيوتر سطح المكتب (1340px Desktop View)' 
                  : 'تمت العودة للوضع المتجاوب الافتراضي'
                );
              }}
              className={`h-9 px-3 rounded-[10px] text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1.5 active:scale-[0.98] ${
                isDesktopMode 
                  ? 'bg-[#14532d] text-emerald-200 border-[#16a34a] shadow-[0_0_15px_rgba(22,163,74,0.3)]' 
                  : 'bg-[#01140a] hover:bg-[#032516] text-[#94a3b8] hover:text-white border-[rgba(245,200,66,0.3)]'
              }`}
              title="عرض نسخة الويب كشاشة كمبيوتر كسطح المكتب"
            >
              <Monitor size={14} className={isDesktopMode ? 'text-emerald-300' : 'text-[#f5c842]'} />
              <span className="hidden sm:inline">{isDesktopMode ? 'شاشة كمبيوتر ✓' : 'وضع سطح المكتب'}</span>
              <span className="sm:hidden">كمبيوتر</span>
            </button>

            {/* AI Assistant button */}
            <button
              onClick={() => setIsChatOpen(true)}
              className="h-9 px-3 bg-[#f5c842] hover:bg-[#f5c842]/90 text-black rounded-[10px] text-[11px] font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-[0.98]"
            >
              <MessageSquare size={14} />
              <span>مساعد AI</span>
            </button>
          </div>

        </div>
      </header>

      {/* Desktop Mode Active Top Banner */}
      {isDesktopMode && (
        <div className="bg-[#02180d] border-b border-[#16a34a]/40 px-4 py-2 flex flex-wrap items-center justify-between text-[11px] text-gray-300 shadow-sm shrink-0" dir="rtl">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-white font-bold flex items-center gap-1.5">
              <Monitor size={15} className="text-[#f5c842]" />
              <span>وضع شاشة كمبيوتر سطح المكتب (Desktop Workstation View - 1340px)</span>
            </span>
            <span className="bg-[#01140a] text-emerald-300 px-2 py-0.5 rounded border border-[#16a34a]/30 font-mono text-[10px]">
              PC MONITOR MODE
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#94a3b8] text-[10px] hidden sm:inline">
              يتم الآن عرض النظام بكامل تفاصيل سطح المكتب والأعمدة والجداول كشاشة كمبيوتر واسعة
            </span>
            <button
              onClick={() => setIsDesktopMode(false)}
              className="text-[#f5c842] hover:underline font-bold text-[10px] cursor-pointer flex items-center gap-1 bg-[#01140a] px-2.5 py-1 rounded border border-[#f5c842]/30 active:scale-95"
            >
              <span>العودة لوضع الهاتف 📱</span>
            </button>
          </div>
        </div>
      )}

      {/* Layout Body with Sidebar and Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sovereign Sidebar (Placed first for RTL Right Alignment) */}
        <Sidebar
          activeScreen={activeScreen}
          onSelectScreen={(s) => setActiveScreen(s)}
          onOpenModal={(m) => {
            if (m === 'cli') setIsCliOpen(true);
            if (m === 'documentation') setIsDocOpen(true);
          }}
          onOpenChat={() => setIsChatOpen(true)}
          onLogout={() => triggerToast('تم تسجيل الخروج الآمن بنجاح.')}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
          isMobileOpen={isSidebarMobileOpen}
          onCloseMobile={() => setIsSidebarMobileOpen(false)}
          flaggedCount={transactions.filter(t => t.status === 'flagged').length}
          pendingApprovalsCount={approvals.filter(a => a.status === 'pending').length}
        />

        {/* Main Content Scrollable Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Breadcrumb / Screen Title if not on Dashboard */}
          {activeScreen !== 'dashboard' && (
            <div className="bg-[#032516] border-b border-[rgba(245,200,66,0.2)] px-4 py-2">
              <div className={`max-w-7xl mx-auto flex items-center justify-between ${isDesktopMode ? 'w-[1300px] max-w-none' : ''}`}>
                <button
                  onClick={() => setActiveScreen('dashboard')}
                  className="flex items-center gap-1.5 text-[12px] font-semibold text-[#f5c842] hover:underline cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>العودة للوحة التحكم الرئيسية</span>
                </button>
                <span className="text-[12px] text-[#94a3b8]">
                  {activeScreen === 'apk_hub' && 'مركز تنزيل حزم أندرويد APK وتطبيق المشترك ونسخ الويب'}
                  {activeScreen === 'customers' && 'إدارة العملاء والمشتركين والتحكم المالي (KYC & CRM)'}
                  {activeScreen === 'control_room' && 'غرفة الرقابة السيادية ومكافحة غسل الأموال'}
                  {activeScreen === 'telecom' && 'سداد الفواتير والاتصالات'}
                  {activeScreen === 'client_app' && 'تطبيق محفظة العميل الفردي'}
                  {activeScreen === 'family_app' && 'منظومة العائلة والنشء'}
                  {activeScreen === 'archive' && 'الخزنة الرقمية وأرشيف الوثائق'}
                  {activeScreen === 'encyclopedia' && 'الموسوعة وبنية النظام'}
                  {activeScreen === 'reports' && 'دفتر اليومية والتقارير المالية'}
                </span>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <main className={`flex-1 mx-auto w-full p-4 ${isDesktopMode ? 'w-[1300px] max-w-none' : 'max-w-7xl'}`}>
        {activeScreen === 'dashboard' && (
          <NasrWalletGridDashboard
            walletBalance={walletBalance}
            reservesUSD={reservesUSD}
            approvals={approvals}
            onOpenSubScreen={(s) => setActiveScreen(s)}
            onOpenModal={(m) => {
              if (m === 'cli') setIsCliOpen(true);
              if (m === 'documentation') setIsDocOpen(true);
            }}
            onReconcile={handleReconcile}
            reconciling={reconciling}
            onOpenChat={() => setIsChatOpen(true)}
            onLogout={() => triggerToast('تم تسجيل الخروج الآمن بنجاح.')}
            transactions={transactions}
            cards={cards}
          />
        )}

        {activeScreen === 'control_room' && (
          <SovereignControlRoom
            approvals={approvals}
            onApprove={handleApprove}
            onReject={handleReject}
            transactions={transactions}
            onFlagTransaction={handleFlagTransaction}
            banks={banks}
          />
        )}

        {activeScreen === 'master_tree' && (
          <SovereignMasterTreeViewer
            onOpenScreen={(scr) => setActiveScreen(scr)}
            triggerToast={triggerToast}
          />
        )}

        {activeScreen === 'v8_hub' && (
          <SovereignV8ExecutiveHub
            onOpenScreen={(scr) => setActiveScreen(scr)}
            triggerToast={triggerToast}
          />
        )}

        {activeScreen === 'settlements' && (
          <SovereignSettlementVaultHub
            triggerToast={triggerToast}
          />
        )}

        {activeScreen === 'institutional' && (
          <SovereignInstitutionalErpHub
            triggerToast={triggerToast}
          />
        )}

        {activeScreen === 'customers' && (
          <CustomerManagementHub
            customers={customers}
            onUpdateCustomer={(updated) => {
              setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
            }}
            transactions={transactions}
            onAddTransaction={(newTx) => {
              setTransactions(prev => [newTx, ...prev]);
            }}
            registrationRequests={registrationRequests}
            onUpdateRegistrationRequest={(updated) => {
              setRegistrationRequests(prev => prev.map(r => r.id === updated.id ? updated : r));
            }}
            onAddCustomer={(newCust) => {
              setCustomers(prev => [newCust, ...prev]);
            }}
            financialHolds={financialHolds}
            onAddHold={(hold) => {
              setFinancialHolds(prev => [hold, ...prev]);
            }}
            onUpdateHold={(updated) => {
              setFinancialHolds(prev => prev.map(h => h.id === updated.id ? updated : h));
            }}
            governmentServices={governmentServices}
            onAddGovernmentService={(srv) => {
              setGovernmentServices(prev => [srv, ...prev]);
            }}
            notifications={notifications}
            onSendNotification={(notif) => {
              setNotifications(prev => [notif, ...prev]);
            }}
          />
        )}

        {activeScreen === 'telecom' && (
          <YemenTelecomServices
            packages={telecomPackages}
            onRecharge={handleRechargeTelecom}
            walletBalance={walletBalance}
          />
        )}

        {activeScreen === 'client_app' && (
          <StandaloneClientApp 
            walletBalance={walletBalance} 
            onDeductBalance={(amt, reason) => {
              setWalletBalance(prev => Math.max(0, prev - amt));
              triggerToast(`تم اقتطاع ${amt.toLocaleString()} ر.ي من المحفظة (${reason})`);
            }}
            onOpenFullFamilyHub={() => setActiveScreen('family_app')}
          />
        )}

        {activeScreen === 'apk_hub' && (
          <div className="space-y-4">
            <ApkDistributionModal 
              isOpen={true} 
              onClose={() => setActiveScreen('dashboard')} 
              onOpenClientApp={() => setActiveScreen('client_app')}
              triggerToast={triggerToast}
              onToggleDesktopMode={() => setIsDesktopMode(!isDesktopMode)}
              isDesktopMode={isDesktopMode}
            />
          </div>
        )}

        {activeScreen === 'family_app' && (
          <FamilyKidsSystem />
        )}

        {activeScreen === 'archive' && (
          <EnterpriseArchive />
        )}

        {activeScreen === 'encyclopedia' && (
          <YemenWalletEncyclopedia />
        )}

        {activeScreen === 'reports' && (
          <TransactionReports transactions={transactions} />
        )}

        {activeScreen === 'transfer' && (
          <div className="bg-[#032516] p-6 rounded-[16px] border border-[rgba(245,200,66,0.3)] max-w-lg mx-auto space-y-4">
            <h3 className="text-[16px] font-bold text-white flex items-center gap-2">
              <Send size={18} className="text-[#f5c842]" />
              <span>إرسال حوالة مالية فورية</span>
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-[12px] text-[#94a3b8] block mb-1">اسم أو حساب المستفيد:</label>
                <input 
                  type="text" 
                  placeholder="مثال: شركة النصر للتجارة" 
                  className="w-full bg-[#01140a] text-white p-2.5 rounded-[10px] border border-[rgba(245,200,66,0.2)] text-[13px] focus:outline-none focus:border-[#f5c842]"
                />
              </div>
              <div>
                <label className="text-[12px] text-[#94a3b8] block mb-1">المبلغ (ريال يمني):</label>
                <input 
                  type="number" 
                  placeholder="مثال: 50000" 
                  className="w-full bg-[#01140a] text-white p-2.5 rounded-[10px] border border-[rgba(245,200,66,0.2)] text-[13px] focus:outline-none focus:border-[#f5c842]"
                />
              </div>
              <button
                onClick={() => {
                  triggerToast('تم إرسال الحوالة واعتمادها في المقاصة اللحظية.');
                  setActiveScreen('dashboard');
                }}
                className="w-full py-2.5 bg-[#f5c842] text-black font-bold text-[13px] rounded-[10px] cursor-pointer hover:bg-[#f5c842]/90 mt-2"
              >
                تأكيد الإرسال
              </button>
            </div>
          </div>
        )}

        {activeScreen === 'charge' && (
          <div className="bg-[#032516] p-6 rounded-[16px] border border-[rgba(245,200,66,0.3)] max-w-lg mx-auto space-y-4">
            <h3 className="text-[16px] font-bold text-white flex items-center gap-2">
              <PlusCircle size={18} className="text-[#0ea5e9]" />
              <span>شحن وتغذية العهد والخزينة</span>
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-[12px] text-[#94a3b8] block mb-1">اختر بنك الإيداع:</label>
                <select className="w-full bg-[#01140a] text-[#f5c842] p-2.5 rounded-[10px] border border-[rgba(245,200,66,0.2)] text-[13px] focus:outline-none">
                  <option>بنك التضامن الإسلامي</option>
                  <option>مصرف الكريمي</option>
                  <option>البنك المركزي اليمني</option>
                </select>
              </div>
              <div>
                <label className="text-[12px] text-[#94a3b8] block mb-1">المبلغ المراد إيداعه:</label>
                <input 
                  type="number" 
                  placeholder="المبلغ بالريال" 
                  className="w-full bg-[#01140a] text-white p-2.5 rounded-[10px] border border-[rgba(245,200,66,0.2)] text-[13px] focus:outline-none focus:border-[#0ea5e9]"
                />
              </div>
              <button
                onClick={() => {
                  setWalletBalance(prev => prev + 1000000);
                  triggerToast('تمت تغذية الخزينة بمبلغ 1,000,000 ر.ي بنجاح.');
                  setActiveScreen('dashboard');
                }}
                className="w-full py-2.5 bg-[#0ea5e9] text-black font-bold text-[13px] rounded-[10px] cursor-pointer hover:bg-[#0ea5e9]/90 mt-2"
              >
                تغذية فورية
              </button>
            </div>
          </div>
        )}

        {activeScreen === 'cards' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-white flex items-center gap-2">
                <CreditCard size={18} className="text-[#f5c842]" />
                <span>البطاقات الافتراضية ماستركارد</span>
              </h3>
              <button 
                onClick={() => triggerToast('تم إصدار بطاقة ماستركارد افتراضية جديدة برصيد $500.')}
                className="px-3 py-1.5 bg-[#f5c842] text-black font-bold text-[11px] rounded-[8px] cursor-pointer"
              >
                + إصدار بطاقة جديدة
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cards.map(c => (
                <div key={c.id} className="bg-gradient-to-br from-[#0c4a6e] to-[#01140a] p-5 rounded-[16px] border border-[#0ea5e9]/40 space-y-4 shadow-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-bold text-white">MASTERCARD VIRTUAL</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">ACTIVE</span>
                  </div>
                  <div className="font-mono text-[18px] tracking-widest text-[#f5c842]">{c.cardNumber}</div>
                  <div className="flex justify-between text-[11px] text-[#94a3b8]">
                    <span>{c.cardHolder}</span>
                    <span>EXP: {c.expiry}</span>
                    <span className="font-bold text-white">${c.balance.toLocaleString()} USD</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeScreen === 'withdraw' && (
          <div className="bg-[#032516] p-6 rounded-[16px] border border-[rgba(245,200,66,0.3)] max-w-lg mx-auto space-y-4">
            <h3 className="text-[16px] font-bold text-white flex items-center gap-2">
              <Coins size={18} className="text-[#16a34a]" />
              <span>صرف وسحب نقدي عبر الصرافين</span>
            </h3>
            <p className="text-[12px] text-[#94a3b8]">توليد رمز سحب OTP مؤقت للصرف عبر أي نقطة أو فرع كريمي/تضامن</p>
            <button
              onClick={() => triggerToast('رمز الصرف المؤقت: [ 891-204 ] صالح لمدة 15 دقيقة.')}
              className="w-full py-2.5 bg-[#16a34a] text-white font-bold text-[13px] rounded-[10px] cursor-pointer hover:bg-emerald-600"
            >
              توليد رمز السحب OTP
            </button>
          </div>
        )}
          </main>
        </div>
      </div>

      {/* Floating Chat Button: 48px size, bottom-left with 16px distance, opacity 0.9 */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-[#032516] hover:bg-[#063d25] text-[#f5c842] border border-[#f5c842] flex items-center justify-center shadow-lg opacity-90 hover:opacity-100 cursor-pointer active:scale-95 transition-all select-none"
        title="المساعد المالي الذكي نصر والت"
      >
        <div className="absolute inset-[-3px] rounded-full border border-transparent border-t-[#f5c842] border-b-[#f5c842] animate-spin [animation-duration:3s]"></div>
        <MessageSquare size={20} className="text-[#f5c842]" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 border border-white text-white text-[8px] font-bold rounded-full flex items-center justify-center">
          1
        </span>
      </button>

      {/* Modals and Overlays */}
      <SmartChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        walletBalance={walletBalance} 
      />

      <DeveloperCliModal 
        isOpen={isCliOpen} 
        onClose={() => setIsCliOpen(false)} 
        walletBalance={walletBalance}
        setWalletBalance={setWalletBalance}
        customers={customers}
        setCustomers={setCustomers}
        telecomPackages={telecomPackages}
        setTelecomPackages={setTelecomPackages}
        governmentServices={governmentServices}
        setGovernmentServices={setGovernmentServices}
        transactions={transactions}
        setTransactions={setTransactions}
        financialHolds={financialHolds}
        setFinancialHolds={setFinancialHolds}
        notifications={notifications}
        setNotifications={setNotifications}
        triggerToast={triggerToast}
      />

      <DocumentationCenterModal 
        isOpen={isDocOpen} 
        onClose={() => setIsDocOpen(false)} 
      />

      <ApkDistributionModal 
        isOpen={isApkModalOpen} 
        onClose={() => setIsApkModalOpen(false)} 
        onOpenClientApp={() => setActiveScreen('client_app')}
        triggerToast={triggerToast}
        onToggleDesktopMode={() => setIsDesktopMode(!isDesktopMode)}
        isDesktopMode={isDesktopMode}
      />

    </div>
  );
};

export default App;
