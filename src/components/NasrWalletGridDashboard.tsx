import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Coins, 
  Wallet, 
  UserCheck, 
  Lock, 
  Shield, 
  Building2, 
  Settings, 
  ArrowLeftRight, 
  Plus, 
  Smartphone, 
  CreditCard, 
  RefreshCw, 
  Users, 
  FolderArchive, 
  BookOpen, 
  Briefcase, 
  TrendingUp, 
  Code2, 
  Printer, 
  Terminal, 
  MessageSquare, 
  ChevronDown, 
  Power,
  Activity,
  Layers,
  FileCheck,
  Download,
  Landmark,
  FolderTree,
  Store
} from 'lucide-react';
import { Transaction, ApprovalRequest, TelecomPackage, BankAccount, VirtualCard } from '../types';

interface NasrWalletGridDashboardProps {
  walletBalance: number;
  reservesUSD: number;
  approvals: ApprovalRequest[];
  onOpenSubScreen: (screen: string) => void;
  onOpenModal: (modal: string) => void;
  onReconcile: () => void;
  reconciling: boolean;
  onOpenChat: () => void;
  onLogout: () => void;
  transactions: Transaction[];
  cards: VirtualCard[];
}

export const NasrWalletGridDashboard: React.FC<NasrWalletGridDashboardProps> = ({
  walletBalance,
  reservesUSD,
  approvals,
  onOpenSubScreen,
  onOpenModal,
  onReconcile,
  reconciling,
  onOpenChat,
  onLogout,
  transactions,
  cards
}) => {
  const [showAnalyticsSection, setShowAnalyticsSection] = useState(false);
  const pendingApprovalsCount = approvals.filter(a => a.status === 'pending').length;

  return (
    <div className="space-y-3 select-none p-4" dir="rtl" style={{ backgroundColor: 'var(--bg-primary, #01140a)' }}>
      
      {/* المستوى 1 — البطاقة السيادية الرئيسية */}
      <div className="bg-gradient-to-l from-[#032516] to-[#0a4f31] border border-[rgba(245,200,66,0.3)] rounded-[16px] p-4 text-white shadow-xl relative overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(#f5c842_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>

        {/* Header Branding */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-[rgba(245,200,66,0.2)] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[12px] bg-[#01140a] border border-[#f5c842] flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="text-[#f5c842]" size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[16px] font-bold tracking-wide text-white">لوحة النظام التحكمي والسيادي</h2>
                <span className="bg-[#f5c842]/20 text-[#f5c842] border border-[#f5c842]/40 text-[11px] font-semibold px-2.5 py-0.5 rounded-[10px]">
                  القيادة المركزية
                </span>
              </div>
              <p className="text-[13px] text-[#94a3b8] font-normal mt-0.5">
                نظام إدارة العهد، المقاصة اللحظية، والرقابة ومكافحة غسل الأموال (AML)
              </p>
            </div>
          </div>

          {/* Real-time System Indicators Badges: 3 in a single row */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#01140a] border border-[#16a34a]/40 px-2.5 py-1 rounded-[10px] text-[#16a34a] text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
              <span>الربط السيادي نشط</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#01140a] border border-[#0ea5e9]/40 px-2.5 py-1 rounded-[10px] text-[#0ea5e9] text-[11px] font-semibold">
              <Activity size={13} className="text-[#0ea5e9]" />
              <span>خادم مستقر 99.98%</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#01140a] border border-[#f5c842]/40 px-2.5 py-1 rounded-[10px] text-[#f5c842] text-[11px] font-semibold">
              <Lock size={13} className="text-[#f5c842]" />
              <span>AES-256 GCM</span>
            </div>
          </div>
        </div>
      </div>

      {/* المستوى 2 — الأرقام الكبرى (KPI Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Card 1: Main Sovereign Balance — Gold */}
        <div className="bg-[#032516] border border-[rgba(245,200,66,0.3)] rounded-[16px] p-4 flex items-center justify-between shadow-md transition-transform active:scale-[0.98]">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[#94a3b8] block">الرصيد الكلي (بالريال)</span>
            <div className="text-[24px] font-bold text-[#f5c842] font-mono leading-tight">
              {walletBalance.toLocaleString()} <span className="text-[13px] text-[#f5c842]/80 font-sans font-normal">ر.ي</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-[12px] bg-[#f5c842]/15 border border-[#f5c842]/30 flex items-center justify-center shrink-0">
            <Coins className="text-[#f5c842]" size={22} />
          </div>
        </div>

        {/* Card 2: Foreign Reserves — Light Blue */}
        <div className="bg-[#032516] border border-[rgba(245,200,66,0.3)] rounded-[16px] p-4 flex items-center justify-between shadow-md transition-transform active:scale-[0.98]">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[#94a3b8] block">احتياطي العملات الصعبة (بالدولار)</span>
            <div className="text-[20px] font-bold text-[#0ea5e9] font-mono leading-tight">
              ${reservesUSD.toLocaleString()} <span className="text-[13px] text-[#0ea5e9]/80 font-sans font-normal">USD</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-[12px] bg-[#0ea5e9]/15 border border-[#0ea5e9]/30 flex items-center justify-center shrink-0">
            <Wallet className="text-[#0ea5e9]" size={22} />
          </div>
        </div>

        {/* Card 3: Pending Approvals — Orange */}
        <div className="bg-[#032516] border border-[rgba(245,200,66,0.3)] rounded-[16px] p-4 flex items-center justify-between shadow-md transition-transform active:scale-[0.98]">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[#94a3b8] block">طلبات الاعتماد المعلقة</span>
            <div className="text-[20px] font-bold text-[#f59e0b] leading-tight flex items-center gap-2">
              <span>{pendingApprovalsCount} طلبات</span>
              {pendingApprovalsCount > 0 && (
                <span className="bg-[#dc2626] text-white text-[10px] font-semibold px-2 py-0.5 rounded-[10px] animate-pulse">
                  جديد
                </span>
              )}
            </div>
          </div>
          <div className="w-11 h-11 rounded-[12px] bg-[#f59e0b]/15 border border-[#f59e0b]/30 flex items-center justify-center shrink-0">
            <UserCheck className="text-[#f59e0b]" size={22} />
          </div>
        </div>
      </div>

      {/* المستوى 3 — قسم الرقابة (غرفة الرقابة السيادية ومكافحة غسل الأموال) */}
      <div className="bg-[#032516] rounded-[16px] border border-[rgba(245,200,66,0.3)] p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-[rgba(245,200,66,0.2)] pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-[#7f1d1d] border border-[#dc2626]/40 flex items-center justify-center">
              <Shield className="text-red-300" size={17} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-white">غرفة الرقابة السيادية ومكافحة غسل الأموال</h3>
              <p className="text-[11px] font-normal text-[#94a3b8]">أدوات الحظر، الاعتماد المزدوج، وصلاحيات المقاصة المصرفية</p>
            </div>
          </div>
          <span className="text-[11px] bg-[#7f1d1d] text-red-200 border border-[#dc2626]/50 font-semibold px-2.5 py-0.5 rounded-[10px]">
            صلاحيات المالك نصر
          </span>
        </div>

        {/* 4 Cards in 2x2 grid on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Tile 1: الرقابة السيادية — Red */}
          <button
            onClick={() => onOpenSubScreen('control_room')}
            className="p-4 rounded-[12px] border border-[#dc2626] bg-[#7f1d1d]/30 hover:bg-[#7f1d1d]/50 text-right transition-all cursor-pointer group flex flex-col justify-between shadow-sm active:scale-[0.98]"
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-9 h-9 rounded-[10px] bg-[#7f1d1d] text-red-200 border border-[#dc2626]/40 flex items-center justify-center shadow-md">
                <ShieldCheck size={18} />
              </div>
              <span className="text-[10px] bg-[#7f1d1d] text-red-200 border border-[#dc2626]/40 font-semibold px-2 py-0.5 rounded-[10px]">
                فوري
              </span>
            </div>
            <div className="mt-2.5">
              <h4 className="text-[13px] font-bold text-white group-hover:text-red-200 transition-colors">
                الرقابة السيادية والحظر
              </h4>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-1 leading-snug truncate">
                رصد المعاملات المشبوهة وتجميد الحسابات.
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-[#dc2626]/30 flex items-center justify-between text-[11px] font-semibold text-red-300">
              <span>فتح وحدة الرقابة</span>
              <ArrowLeftRight size={13} />
            </div>
          </button>

          {/* Tile 2: طلبات الاعتماد — Green */}
          <button
            onClick={() => onOpenSubScreen('control_room')}
            className="p-4 rounded-[12px] border border-[#16a34a] bg-[#14532d]/30 hover:bg-[#14532d]/50 text-right transition-all cursor-pointer group flex flex-col justify-between shadow-sm relative active:scale-[0.98]"
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-9 h-9 rounded-[10px] bg-[#14532d] text-emerald-200 border border-[#16a34a]/40 flex items-center justify-center shadow-md">
                <UserCheck size={18} />
              </div>
              <span className="text-[10px] bg-[#14532d] text-emerald-200 border border-[#16a34a]/40 font-semibold px-2 py-0.5 rounded-[10px]">
                اعتماد
              </span>
            </div>
            <div className="mt-2.5">
              <h4 className="text-[13px] font-bold text-white group-hover:text-emerald-200 transition-colors">
                طلبات الاعتماد والصرف
              </h4>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-1 leading-snug truncate">
                فحص واعتماد الحوالات الكبرى وسندات الصرف.
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-[#16a34a]/30 flex items-center justify-between text-[11px] font-semibold text-emerald-300">
              <span>{pendingApprovalsCount} طلبات تنتظر الموافقة</span>
              <span className="w-2 h-2 rounded-full bg-[#16a34a]"></span>
            </div>
          </button>

          {/* Tile 3: الربط البنكي — Blue */}
          <button
            onClick={() => onOpenSubScreen('control_room')}
            className="p-4 rounded-[12px] border border-[#0ea5e9] bg-[#0c4a6e]/30 hover:bg-[#0c4a6e]/50 text-right transition-all cursor-pointer group flex flex-col justify-between shadow-sm active:scale-[0.98]"
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-9 h-9 rounded-[10px] bg-[#0c4a6e] text-sky-200 border border-[#0ea5e9]/40 flex items-center justify-center shadow-md">
                <Building2 size={18} />
              </div>
              <span className="text-[10px] bg-[#0c4a6e] text-sky-200 border border-[#0ea5e9]/40 font-semibold px-2 py-0.5 rounded-[10px]">
                مركزي
              </span>
            </div>
            <div className="mt-2.5">
              <h4 className="text-[13px] font-bold text-white group-hover:text-sky-200 transition-colors">
                الربط البنكي والتفويض
              </h4>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-1 leading-snug truncate">
                مقاصة البنك المركزي وحسابات البنوك المعتمدة.
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-[#0ea5e9]/30 flex items-center justify-between text-[11px] font-semibold text-sky-300">
              <span>إدارة البنوك والمقاصة</span>
              <ArrowLeftRight size={13} />
            </div>
          </button>

          {/* Tile 4: التحكم المركزي — Gold */}
          <button
            onClick={() => onOpenSubScreen('control_room')}
            className="p-4 rounded-[12px] border border-[#f5c842] bg-[#78350f]/30 hover:bg-[#78350f]/50 text-right transition-all cursor-pointer group flex flex-col justify-between shadow-sm active:scale-[0.98]"
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-9 h-9 rounded-[10px] bg-[#78350f] text-amber-200 border border-[#f5c842]/40 flex items-center justify-center shadow-md">
                <Settings size={18} />
              </div>
              <span className="text-[10px] bg-[#78350f] text-amber-200 border border-[#f5c842]/40 font-semibold px-2 py-0.5 rounded-[10px]">
                إدارة عليا
              </span>
            </div>
            <div className="mt-2.5">
              <h4 className="text-[13px] font-bold text-white group-hover:text-amber-200 transition-colors">
                التحكم المركزي المطلق
              </h4>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-1 leading-snug truncate">
                سقوف السحب، أسعار فوارق الصرف، وحالة النظام.
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-[#f5c842]/30 flex items-center justify-between text-[11px] font-semibold text-amber-300">
              <span>دخول الكونسول المركزي</span>
              <Lock size={13} />
            </div>
          </button>
        </div>
      </div>

      {/* المستوى 4 — مركز العمليات والمدفوعات اللحظية */}
      <div className="bg-[#032516] rounded-[16px] border border-[rgba(245,200,66,0.3)] p-4 shadow-sm space-y-3">
        {/* Horizontal Card in Level 4 */}
        <div className="p-3.5 bg-[#01140a] rounded-[12px] border border-[rgba(245,200,66,0.2)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-[#14532d] border border-[#16a34a]/40 text-[#16a34a] flex items-center justify-center shrink-0">
              <ArrowLeftRight size={18} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-white">مركز العمليات والمدفوعات اللحظية</h3>
              <p className="text-[13px] font-normal text-[#94a3b8]">تنفيذ الحوالات، شحن العهد، وسداد الفواتير الحكومية والاتصالات</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-[#14532d] text-[#16a34a] border border-[#16a34a]/40 font-semibold px-2.5 py-0.5 rounded-[10px]">
              0 عمولة خفية
            </span>
          </div>
        </div>

        {/* 6 Essential Operation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Card 1: التحويل السريع */}
          <button
            onClick={() => onOpenSubScreen('transfer')}
            className="p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] hover:border-[#16a34a] bg-[#01140a] hover:bg-[#14532d]/20 text-right transition-all cursor-pointer group flex items-start gap-3 shadow-sm active:scale-[0.98]"
          >
            <div className="w-9 h-9 rounded-[10px] bg-[#14532d] text-[#16a34a] border border-[#16a34a]/30 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <ArrowLeftRight size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-bold text-white group-hover:text-emerald-300">
                تحويل سريع وحوالات
              </h4>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-0.5 leading-normal">
                إرسال واستقبال فوري بين المحافظ والبنوك بدون تأخير.
              </p>
            </div>
          </button>

          {/* Card 2: شحن وتغذية العهد */}
          <button
            onClick={() => onOpenSubScreen('charge')}
            className="p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] hover:border-[#0ea5e9] bg-[#01140a] hover:bg-[#0c4a6e]/20 text-right transition-all cursor-pointer group flex items-start gap-3 shadow-sm active:scale-[0.98]"
          >
            <div className="w-9 h-9 rounded-[10px] bg-[#0c4a6e] text-[#0ea5e9] border border-[#0ea5e9]/30 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Plus size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-bold text-white group-hover:text-sky-300">
                شحن وتغذية العهد
              </h4>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-0.5 leading-normal">
                إيداع نقدي وتغذية أرصدة الخزينة والوكلاء المعتمدين.
              </p>
            </div>
          </button>

          {/* Card 3: سداد الفواتير والاتصالات */}
          <button
            onClick={() => onOpenSubScreen('telecom')}
            className="p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] hover:border-[#f5c842] bg-[#01140a] hover:bg-[#78350f]/20 text-right transition-all cursor-pointer group flex items-start gap-3 shadow-sm active:scale-[0.98]"
          >
            <div className="w-9 h-9 rounded-[10px] bg-[#78350f] text-[#f5c842] border border-[#f5c842]/30 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Smartphone size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-bold text-white group-hover:text-amber-300">
                سداد الفواتير والاتصالات
              </h4>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-0.5 leading-normal">
                يمن موبايل، سبأفون، يو، يمن نت، فايبر، ماء وكهرباء.
              </p>
            </div>
          </button>

          {/* Card 4: بطاقات ماستركارد الافتراضية */}
          <button
            onClick={() => onOpenSubScreen('cards')}
            className="p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] hover:border-[#f5c842] bg-[#01140a] hover:bg-purple-950/20 text-right transition-all cursor-pointer group flex items-start gap-3 shadow-sm active:scale-[0.98]"
          >
            <div className="w-9 h-9 rounded-[10px] bg-purple-950 text-purple-300 border border-purple-500/30 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <CreditCard size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-bold text-white group-hover:text-purple-300">
                البطاقات الافتراضية
              </h4>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-0.5 leading-normal">
                إصدار ماستركارد رقمية للشراء الدولي وتحديد السقوف.
              </p>
            </div>
          </button>

          {/* Card 5: صرف وسحب نقدي */}
          <button
            onClick={() => onOpenSubScreen('withdraw')}
            className="p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] hover:border-[#16a34a] bg-[#01140a] hover:bg-teal-950/20 text-right transition-all cursor-pointer group flex items-start gap-3 shadow-sm active:scale-[0.98]"
          >
            <div className="w-9 h-9 rounded-[10px] bg-teal-950 text-teal-300 border border-teal-500/30 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Coins size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-bold text-white group-hover:text-teal-300">
                سحب وصرف نقدي
              </h4>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-0.5 leading-normal">
                صرف نقدي عبر شبكة الصرافين والوكلاء برمز OTP آمن.
              </p>
            </div>
          </button>

          {/* Card 6: إقفال وتسوية العهد */}
          <button
            onClick={onReconcile}
            disabled={reconciling}
            className="p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] hover:border-[#16a34a] bg-[#01140a] hover:bg-[#14532d]/20 text-right transition-all cursor-pointer group flex items-start gap-3 shadow-sm active:scale-[0.98]"
          >
            <div className="w-9 h-9 rounded-[10px] bg-[#032516] text-[#16a34a] border border-[#16a34a]/30 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <RefreshCw size={18} className={reconciling ? "animate-spin text-[#16a34a]" : ""} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-bold text-white group-hover:text-emerald-300">
                {reconciling ? "جارِ تدقيق العهد..." : "إقفال وتسوية العهد"}
              </h4>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-0.5 leading-normal">
                مطابقة رصيد اليومية، تدقيق الفوارق، وإصدار قيود المقاصة.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 5. بوابات المنظومة السيادية الموحدة */}
      <div className="bg-[#032516] rounded-[16px] border border-[rgba(245,200,66,0.3)] p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-[rgba(245,200,66,0.2)] pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-[#0c4a6e] border border-[#0ea5e9]/40 flex items-center justify-center">
              <Building2 className="text-sky-300" size={17} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-white">بوابات المنظومة السيادية الموحدة</h3>
              <p className="text-[11px] font-normal text-[#94a3b8]">التبديل الفوري بين منصات المحفظة والتوثيق المرجعي</p>
            </div>
          </div>
          <span className="text-[11px] bg-[#0c4a6e] text-sky-200 border border-[#0ea5e9]/40 font-semibold px-2.5 py-0.5 rounded-[10px]">
            ربط موحد
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Portal V8: وحدات V8.0 السيادية */}
          <button
            onClick={() => onOpenSubScreen('v8_hub')}
            className="p-4 rounded-[12px] border border-[rgba(245,200,66,0.35)] hover:border-[#f5c842] bg-[#021d10] hover:bg-[#78350f]/25 text-right transition-all cursor-pointer group flex flex-col justify-between shadow-md active:scale-[0.98]"
          >
            <div className="w-9 h-9 rounded-[10px] bg-[#78350f] border border-[#f5c842]/40 text-[#f5c842] flex items-center justify-center mb-2">
              <Store size={20} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-[13px] font-bold text-white group-hover:text-amber-300">
                  🏛️ وحدات V8.0 السيادية
                </h4>
                <span className="text-[9px] bg-[#f5c842]/20 text-[#f5c842] px-1.5 py-0.2 rounded font-bold border border-[#f5c842]/40">30 وحدة</span>
              </div>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-1 leading-snug">
                التاجر SoftPOS، الوكيل Cash In/Out، الموافقات الست، ودليل الحسابات.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-[#f5c842] flex items-center gap-1">
              <span>فتح وحدات V8.0</span>
              <ArrowLeftRight size={12} />
            </div>
          </button>

          {/* Portal 1: محفظة العميل */}
          <button
            onClick={() => onOpenSubScreen('client_app')}
            className="p-4 rounded-[12px] border border-[rgba(245,200,66,0.2)] hover:border-[#16a34a] bg-[#01140a] hover:bg-[#14532d]/20 text-right transition-all cursor-pointer group flex flex-col justify-between shadow-sm active:scale-[0.98]"
          >
            <div className="w-9 h-9 rounded-[10px] bg-[#14532d] border border-[#16a34a]/30 text-[#16a34a] flex items-center justify-center mb-2">
              <Smartphone size={20} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-white group-hover:text-emerald-300">
                📱 تطبيق محفظة العميل
              </h4>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-1 leading-snug">
                عرض تجربة الهاتف الذكي للعميل النهائي مع رصيد المحفظة.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-[#16a34a] flex items-center gap-1">
              <span>فتح التطبيق</span>
              <ArrowLeftRight size={12} />
            </div>
          </button>

          {/* Portal 2: منظومة العائلة */}
          <button
            onClick={() => onOpenSubScreen('family_app')}
            className="p-4 rounded-[12px] border border-[rgba(245,200,66,0.2)] hover:border-[#f5c842] bg-[#01140a] hover:bg-[#78350f]/20 text-right transition-all cursor-pointer group flex flex-col justify-between shadow-sm active:scale-[0.98]"
          >
            <div className="w-9 h-9 rounded-[10px] bg-[#78350f] border border-[#f5c842]/30 text-[#f5c842] flex items-center justify-center mb-2">
              <Users size={20} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-white group-hover:text-amber-300">
                👨‍👩‍👧‍👦 منظومة العائلة والنشء
              </h4>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-1 leading-snug">
                الحصالة الرقمية وتحديات الأبناء والرقابة المالية الأبوية.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-[#f5c842] flex items-center gap-1">
              <span>فتح منظومة العائلة</span>
              <ArrowLeftRight size={12} />
            </div>
          </button>

          {/* Portal 3: المخطط الشجري السيادي Ω */}
          <button
            onClick={() => onOpenSubScreen('master_tree')}
            className="p-4 rounded-[12px] border border-[rgba(245,200,66,0.3)] hover:border-[#f5c842] bg-[#01140a] hover:bg-[#78350f]/20 text-right transition-all cursor-pointer group flex flex-col justify-between shadow-sm active:scale-[0.98]"
          >
            <div className="w-9 h-9 rounded-[10px] bg-[#78350f] border border-[#f5c842]/40 text-[#f5c842] flex items-center justify-center mb-2">
              <FolderTree size={20} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-[13px] font-bold text-white group-hover:text-amber-300">
                  🌳 المخطط الشجري السيادي Ω
                </h4>
                <span className="text-[9px] bg-[#f5c842]/20 text-[#f5c842] px-1 py-0.2 rounded font-bold">جديد</span>
              </div>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-1 leading-snug">
                استعراض الطبقات الخمس الموحدة، الخدمات، والوثائق الفريدة.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-[#f5c842] flex items-center gap-1">
              <span>استعراض الشجرة</span>
              <ArrowLeftRight size={12} />
            </div>
          </button>

          {/* Portal 4: التسويات والمقاصة وصرف الرواتب */}
          <button
            onClick={() => onOpenSubScreen('settlements')}
            className="p-4 rounded-[12px] border border-[rgba(245,200,66,0.2)] hover:border-[#16a34a] bg-[#01140a] hover:bg-[#14532d]/20 text-right transition-all cursor-pointer group flex flex-col justify-between shadow-sm active:scale-[0.98]"
          >
            <div className="w-9 h-9 rounded-[10px] bg-[#14532d] border border-[#16a34a]/30 text-emerald-300 flex items-center justify-center mb-2">
              <Landmark size={20} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-white group-hover:text-emerald-300">
                🏛️ التسويات وصرف الرواتب
              </h4>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-1 leading-snug">
                تسويات الوكلاء، مطابقة البنوك RTGS، وصرف الرواتب الجماعي.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
              <span>فتح مركز التسويات</span>
              <ArrowLeftRight size={12} />
            </div>
          </button>

          {/* Portal 5: أرشيف الوثائق */}
          <button
            onClick={() => onOpenSubScreen('archive')}
            className="p-4 rounded-[12px] border border-[rgba(245,200,66,0.2)] hover:border-[#f5c842] bg-[#01140a] hover:bg-[#78350f]/20 text-right transition-all cursor-pointer group flex flex-col justify-between shadow-sm active:scale-[0.98]"
          >
            <div className="w-9 h-9 rounded-[10px] bg-[#78350f] border border-[#f5c842]/30 text-[#f5c842] flex items-center justify-center mb-2">
              <FolderArchive size={20} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-white group-hover:text-amber-300">
                📁 أرشيف الوثائق والخزنة
              </h4>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-1 leading-snug">
                المستندات المالية، العقود، والتراخيص المؤرشفة والمحمية.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-[#f5c842] flex items-center gap-1">
              <span>فتح الأرشيف</span>
              <ArrowLeftRight size={12} />
            </div>
          </button>

          {/* Portal 6: الموسوعة وبنية النظام */}
          <button
            onClick={() => onOpenSubScreen('encyclopedia')}
            className="p-4 rounded-[12px] border border-[rgba(245,200,66,0.2)] hover:border-[#0ea5e9] bg-[#01140a] hover:bg-[#0c4a6e]/20 text-right transition-all cursor-pointer group flex flex-col justify-between shadow-sm active:scale-[0.98]"
          >
            <div className="w-9 h-9 rounded-[10px] bg-[#0c4a6e] border border-[#0ea5e9]/30 text-[#0ea5e9] flex items-center justify-center mb-2">
              <BookOpen size={20} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-white group-hover:text-sky-300">
                📖 الموسوعة وبنية النظام
              </h4>
              <p className="text-[11px] font-normal text-[#94a3b8] mt-1 leading-snug">
                الدليل المعماري، بنية الحسابات، ودليل الاستخدام الشامل.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-semibold text-[#0ea5e9] flex items-center gap-1">
              <span>تصفح الموسوعة</span>
              <ArrowLeftRight size={12} />
            </div>
          </button>
        </div>
      </div>

      {/* 6. الشؤون الإدارية والمؤسسية (ERP) */}
      <div className="bg-[#032516] rounded-[16px] border border-[rgba(245,200,66,0.3)] p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-[rgba(245,200,66,0.2)] pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-purple-950 border border-purple-500/40 flex items-center justify-center">
              <Briefcase className="text-purple-300" size={17} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-white">الشؤون الإدارية والمؤسسية (ERP)</h3>
              <p className="text-[11px] font-normal text-[#94a3b8]">أنظمة الجامعات، مسيرات رواتب الموظفين، والتقارير المالية</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Item 1: أنظمة الجامعات */}
          <button
            onClick={() => onOpenSubScreen('institutional')}
            className="p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] hover:border-[#16a34a] bg-[#01140a] hover:bg-[#14532d]/20 text-right transition-all cursor-pointer group flex items-center gap-3 shadow-sm active:scale-[0.98]"
          >
            <div className="w-8 h-8 rounded-[10px] bg-[#14532d] text-[#16a34a] flex items-center justify-center shrink-0">
              <Building2 size={16} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-white group-hover:text-emerald-300">أنظمة الجامعات</h4>
              <p className="text-[11px] font-normal text-[#94a3b8]">رسوم الطلاب والتنسيق</p>
            </div>
          </button>

          {/* Item 2: الموظفين والرواتب */}
          <button
            onClick={() => onOpenSubScreen('institutional')}
            className="p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] hover:border-[#0ea5e9] bg-[#01140a] hover:bg-[#0c4a6e]/20 text-right transition-all cursor-pointer group flex items-center gap-3 shadow-sm active:scale-[0.98]"
          >
            <div className="w-8 h-8 rounded-[10px] bg-[#0c4a6e] text-[#0ea5e9] flex items-center justify-center shrink-0">
              <Users size={16} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-white group-hover:text-sky-300">الموظفين والرواتب</h4>
              <p className="text-[11px] font-normal text-[#94a3b8]">مسيرات الرواتب والبدلات</p>
            </div>
          </button>

          {/* Item 3: دفتر اليومية والتقارير */}
          <button
            onClick={() => onOpenSubScreen('reports')}
            className="p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] hover:border-[#dc2626] bg-[#01140a] hover:bg-[#7f1d1d]/20 text-right transition-all cursor-pointer group flex items-center gap-3 shadow-sm active:scale-[0.98]"
          >
            <div className="w-8 h-8 rounded-[10px] bg-[#7f1d1d] text-red-300 flex items-center justify-center shrink-0">
              <TrendingUp size={16} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-white group-hover:text-red-300">دفتر اليومية والتقارير</h4>
              <p className="text-[11px] font-normal text-[#94a3b8]">تصدير الكشوفات لـ Excel</p>
            </div>
          </button>

          {/* Item 4: إدارة العملاء KYC */}
          <button
            onClick={() => onOpenSubScreen('customers')}
            className="p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.3)] hover:border-[#f5c842] bg-[#01140a] hover:bg-[#78350f]/20 text-right transition-all cursor-pointer group flex items-center gap-3 shadow-sm active:scale-[0.98]"
          >
            <div className="w-8 h-8 rounded-[10px] bg-[#78350f] text-[#f5c842] flex items-center justify-center shrink-0">
              <UserCheck size={16} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-[13px] font-bold text-white group-hover:text-amber-300">إدارة العملاء KYC</h4>
                <span className="text-[9px] bg-[#f5c842]/20 text-[#f5c842] px-1.5 py-0.2 rounded font-bold">جديد</span>
              </div>
              <p className="text-[11px] font-normal text-[#94a3b8]">التحكم بالبيانات والحركة المالية</p>
            </div>
          </button>

          {/* Item 5: مجلد الكود الشامل وطباعة PDF */}
          <button
            onClick={() => onOpenModal('documentation')}
            className="p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.3)] hover:border-[#f5c842] bg-[#01140a] hover:bg-[#78350f]/20 text-right transition-all cursor-pointer group flex items-center gap-3 shadow-sm sm:col-span-2 lg:col-span-2 justify-between active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#78350f] text-[#f5c842] flex items-center justify-center font-bold shadow-md shrink-0">
                <Code2 size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-[13px] font-bold text-white group-hover:text-amber-300">
                    مجلد الكود الشامل وطباعة PDF
                  </h4>
                  <span className="text-[10px] bg-[#f5c842]/20 text-[#f5c842] border border-[#f5c842]/40 font-semibold px-2 py-0.5 rounded-[10px]">
                    PDF 🖨️
                  </span>
                </div>
                <p className="text-[11px] font-normal text-[#94a3b8] mt-0.5">
                  عرض وقراءة الأكواد والوثائق وحفظ PDF مباشر
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="p-1.5 rounded-[10px] bg-[#f5c842]/20 text-[#f5c842] group-hover:bg-[#f5c842] group-hover:text-black transition-colors">
                <Printer size={15} />
              </div>
            </div>
          </button>

          {/* Item 6: شاشة موجه الأوامر السوداء والنواة CLI */}
          <button
            onClick={() => onOpenModal('cli')}
            className="p-3.5 rounded-[12px] border border-[#16a34a]/60 hover:border-[#16a34a] bg-[#01140a] hover:bg-[#14532d]/20 text-right transition-all cursor-pointer group flex items-center gap-3 shadow-sm sm:col-span-2 lg:col-span-2 justify-between text-white active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#14532d] border border-[#16a34a]/40 text-[#16a34a] flex items-center justify-center font-bold shrink-0">
                <Terminal size={20} className="text-[#16a34a]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-[13px] font-bold text-emerald-300 group-hover:text-[#f5c842] font-mono">
                    شاشة موجه الأوامر السوداء والنواة (CLI)
                  </h4>
                  <span className="text-[10px] bg-[#14532d] text-[#16a34a] border border-[#16a34a]/40 font-semibold px-2 py-0.5 rounded-[10px] font-mono">
                    Terminal & DB
                  </span>
                </div>
                <p className="text-[11px] font-normal text-[#94a3b8] mt-0.5">
                  تطوير هيكلي وبرمجي، أزرار فحص وصيانة، وقواعد البيانات
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="p-1.5 rounded-[10px] bg-[#14532d] text-[#16a34a] group-hover:bg-[#16a34a] group-hover:text-white transition-colors">
                <Terminal size={15} />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* 7. الشريط السفلي وأزرار الإجراءات السريعة */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#032516] border border-[rgba(245,200,66,0.3)] rounded-[16px] p-4 text-white">
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => onOpenSubScreen('apk_hub')}
            className="px-3.5 py-2 bg-gradient-to-r from-[#b45309] to-[#78350f] hover:from-[#f5c842] hover:to-[#b45309] hover:text-black border border-[#f5c842] text-white rounded-[10px] text-[11px] font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <Download size={15} className="text-[#f5c842]" />
            <span>تنزيل APK والويب 📲</span>
          </button>

          <button
            onClick={() => onOpenModal('cli')}
            className="px-3 py-2 bg-[#14532d] hover:bg-[#14532d]/80 border border-[#16a34a]/40 text-white rounded-[10px] text-[11px] font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <Terminal size={15} className="text-[#f5c842]" />
            <span>موجه الأوامر والنواة CLI 💻</span>
          </button>

          <button
            onClick={onOpenChat}
            className="px-3 py-2 bg-[#78350f] hover:bg-[#78350f]/80 border border-[#f5c842]/40 text-[#f5c842] rounded-[10px] text-[11px] font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <MessageSquare size={15} />
            <span>استشارة نصر AI الذكي</span>
          </button>

          <button
            onClick={() => onOpenModal('documentation')}
            className="px-3 py-2 bg-[#f5c842] hover:bg-[#f5c842]/90 text-black font-bold rounded-[10px] text-[11px] transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <BookOpen size={15} />
            <span>مركز التوثيق والكود PDF 🖨️</span>
          </button>
        </div>

        <button
          onClick={onLogout}
          className="px-3 py-2 bg-[#7f1d1d] hover:bg-[#7f1d1d]/80 border border-[#dc2626]/40 text-red-200 rounded-[10px] text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center active:scale-[0.98]"
        >
          <Power size={14} />
          <span>تسجيل الخروج الآمن</span>
        </button>
      </div>

    </div>
  );
};

export default NasrWalletGridDashboard;
