import React, { useState } from 'react';
import { 
  Building2, 
  ArrowLeftRight, 
  PlusCircle, 
  MinusCircle, 
  CheckCircle2, 
  Clock, 
  FileSpreadsheet, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  ShieldCheck, 
  Landmark, 
  Receipt, 
  Download, 
  RefreshCw, 
  Check, 
  X, 
  Search, 
  Filter, 
  FileText,
  Lock,
  Unlock,
  ChevronRight
} from 'lucide-react';

export interface SettlementRecord {
  id: string;
  agentOrMerchantId: string;
  name: string;
  type: 'agent' | 'merchant' | 'bank';
  city: string;
  totalCashIn: number;
  totalCashOut: number;
  netDue: number; // موجب = له، سالب = عليه
  commissionEarned: number;
  status: 'settled' | 'pending' | 'review' | 'held';
  lastReconciliation: string;
  glCode: string;
}

export interface BankConnector {
  id: string;
  name: string;
  type: 'commercial_bank' | 'exchange_network' | 'central_bank';
  accountNo: string;
  glAccount: string;
  balanceSystem: number;
  balanceBank: number;
  difference: number;
  status: 'matched' | 'discrepancy' | 'syncing';
  lastSync: string;
  apiConnected: boolean;
}

export interface SalaryBatch {
  id: string;
  entityName: string;
  entityType: 'government' | 'private_enterprise';
  department: string;
  totalEmployees: number;
  totalAmount: number;
  currency: 'YER' | 'SAR' | 'USD';
  status: 'uploaded' | 'verified' | 'disbursed' | 'rejected';
  uploadedAt: string;
  uploadedBy: string;
  verifiedBy?: string;
  fileReference: string;
}

export const SovereignSettlementVaultHub: React.FC<{
  triggerToast?: (msg: string) => void;
}> = ({ triggerToast }) => {
  const [activeSubTab, setActiveSubTab] = useState<'settlements' | 'banks' | 'salaries' | 'vaults'>('settlements');
  
  // Settlements Data
  const [settlements, setSettlements] = useState<SettlementRecord[]>([
    {
      id: 'SET-901',
      agentOrMerchantId: 'AGT-SAN-01',
      name: 'صرافة الأمل - فرع حدة',
      type: 'agent',
      city: 'صنعاء',
      totalCashIn: 8450000,
      totalCashOut: 7120000,
      netDue: 1330000,
      commissionEarned: 42250,
      status: 'pending',
      lastReconciliation: 'اليوم 09:30 ص',
      glCode: 'GL-1003'
    },
    {
      id: 'SET-902',
      agentOrMerchantId: 'AGT-ADN-04',
      name: 'شبكة القطيبي للصرافة - المنصورة',
      type: 'agent',
      city: 'عدن',
      totalCashIn: 12500000,
      totalCashOut: 13900000,
      netDue: -1400000,
      commissionEarned: 65400,
      status: 'review',
      lastReconciliation: 'اليوم 10:15 ص',
      glCode: 'GL-1003'
    },
    {
      id: 'SET-903',
      agentOrMerchantId: 'MER-SAN-88',
      name: 'هايبر شاهر للمواد الغذائية',
      type: 'merchant',
      city: 'صنعاء',
      totalCashIn: 4180000,
      totalCashOut: 0,
      netDue: 4180000,
      commissionEarned: 20900,
      status: 'settled',
      lastReconciliation: 'أمس 08:00 م',
      glCode: 'GL-2002'
    },
    {
      id: 'SET-904',
      agentOrMerchantId: 'AGT-TAZ-02',
      name: 'صرافة الياباني - شارع جمال',
      type: 'agent',
      city: 'تعز',
      totalCashIn: 5900000,
      totalCashOut: 5350000,
      netDue: 550000,
      commissionEarned: 29500,
      status: 'pending',
      lastReconciliation: 'اليوم 11:00 ص',
      glCode: 'GL-1003'
    }
  ]);

  // Banks Reconciliation Data
  const [banks, setBanks] = useState<BankConnector[]>([
    {
      id: 'BNK-01',
      name: 'بنك الكريمي للتمويل الأصغر الإسلامي',
      type: 'commercial_bank',
      accountNo: '300-881920-01',
      glAccount: 'GL-1002 (أصول بنكية)',
      balanceSystem: 145820000,
      balanceBank: 145820000,
      difference: 0,
      status: 'matched',
      lastSync: 'قبل دقيقة',
      apiConnected: true
    },
    {
      id: 'BNK-02',
      name: 'شبكة النجم للحوالات والصرافة',
      type: 'exchange_network',
      accountNo: 'NJM-771920-YE',
      glAccount: 'GL-1004 (شبكات صرافة)',
      balanceSystem: 68450000,
      balanceBank: 68450000,
      difference: 0,
      status: 'matched',
      lastSync: 'قبل 3 دقائق',
      apiConnected: true
    },
    {
      id: 'BNK-03',
      name: 'بنك سبأ الإسلامي',
      type: 'commercial_bank',
      accountNo: '010-449102-09',
      glAccount: 'GL-1002 (أصول بنكية)',
      balanceSystem: 32100000,
      balanceBank: 32095000,
      difference: 5000,
      status: 'discrepancy',
      lastSync: 'قبل 10 دقائق',
      apiConnected: true
    },
    {
      id: 'BNK-04',
      name: 'البنك المركزي اليمني - حساب التسوية RTGS',
      type: 'central_bank',
      accountNo: 'CBY-RTGS-NASR-001',
      glAccount: 'GL-1001 (احتياطي قانوني)',
      balanceSystem: 250000000,
      balanceBank: 250000000,
      difference: 0,
      status: 'matched',
      lastSync: 'قبل دقيقتين',
      apiConnected: true
    }
  ]);

  // Salary Disbursement Batches
  const [salaryBatches, setSalaryBatches] = useState<SalaryBatch[]>([
    {
      id: 'SAL-2026-10-A',
      entityName: 'وزارة الاتصالات وتقنية المعلومات',
      entityType: 'government',
      department: 'الإدارة العامة والمهندسين',
      totalEmployees: 480,
      totalAmount: 38400000,
      currency: 'YER',
      status: 'verified',
      uploadedAt: '2026-10-09 08:30 ص',
      uploadedBy: 'أحمد الإرياني (مدير الرواتب)',
      verifiedBy: 'ناصر فضل (المدير المالي)',
      fileReference: 'SALARY_MOIT_OCT_2026.xlsx'
    },
    {
      id: 'SAL-2026-10-B',
      entityName: 'المؤسسة العامة للكهرباء - أمانة العاصمة',
      entityType: 'government',
      department: 'فرق الصيانة والمحطات',
      totalEmployees: 320,
      totalAmount: 28800000,
      currency: 'YER',
      status: 'uploaded',
      uploadedAt: '2026-10-09 09:45 ص',
      uploadedBy: 'صالح الصبري (محاسب الرواتب)',
      fileReference: 'ELEC_SANAA_OCT26.csv'
    },
    {
      id: 'SAL-2026-10-C',
      entityName: 'شركة يمن سبأ للتجارة والاستيراد',
      entityType: 'private_enterprise',
      department: 'الفروع والمبيعات (صنعاء، عدن، تعز)',
      totalEmployees: 145,
      totalAmount: 18125000,
      currency: 'YER',
      status: 'disbursed',
      uploadedAt: '2026-10-08 04:00 م',
      uploadedBy: 'منى الحكيمي (موارد بشرية)',
      verifiedBy: 'ناصر فضل (اعتماد نهائي)',
      fileReference: 'YEMEN_SABA_SALARY.xlsx'
    }
  ]);

  // Vault Balances
  const vaults = [
    { id: 'VLT-01', name: 'الخزينة النقدية الرئيسية (صنعاء - الإدارة)', balance: 74500000, currency: 'YER', safeType: 'خزنة مصفحة بيومترية', turnoverDaily: '3.4 دورة/يوم' },
    { id: 'VLT-02', name: 'خزينة السيولة الاحتياطية (عدن)', balance: 41200000, currency: 'YER', safeType: 'فرع معتمد', turnoverDaily: '2.8 دورة/يوم' },
    { id: 'VLT-03', name: 'خزينة العملات الأجنبية (دولار USD)', balance: 185000, currency: 'USD', safeType: 'أصول نقدية دولية', turnoverDaily: '1.2 دورة/يوم' },
    { id: 'VLT-04', name: 'خزينة الريال السعودي (SAR)', balance: 820000, currency: 'SAR', safeType: 'حوالات مغتربين', turnoverDaily: '2.1 دورة/يوم' }
  ];

  const handleExecuteSettlement = (id: string) => {
    setSettlements(prev => prev.map(s => s.id === id ? { ...s, status: 'settled' } : s));
    if (triggerToast) triggerToast('تمت التسوية المالية وإصدار القيد المحاسبي المزدوج (Debit/Credit) في دفتر الأستاذ.');
  };

  const handleDisburseSalaries = (batchId: string) => {
    setSalaryBatches(prev => prev.map(b => b.id === batchId ? { ...b, status: 'disbursed' } : b));
    if (triggerToast) triggerToast('تم اعتماد وصرف ملف الرواتب جماعياً بنجاح! تم تحويل المبالغ لمحافظ الموظفين فوراً.');
  };

  const handleReconcileBank = (bankId: string) => {
    setBanks(prev => prev.map(b => b.id === bankId ? { ...b, status: 'matched', difference: 0, lastSync: 'الآن' } : b));
    if (triggerToast) triggerToast('تمت مطابقة قيود البنك مع دفتر الأستاذ العام بنسبة تطابق 100%.');
  };

  return (
    <div className="bg-[#032516] border border-[rgba(245,200,66,0.3)] rounded-[16px] p-4 text-white space-y-4 shadow-xl select-none" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-[rgba(245,200,66,0.2)] pb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[12px] bg-[#01140a] border border-[#f5c842] flex items-center justify-center shrink-0">
            <Landmark className="text-[#f5c842]" size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[17px] font-bold text-white">مركز التسويات والمقاصة اليومية وصرف الرواتب</h2>
              <span className="bg-[#f5c842]/20 text-[#f5c842] border border-[#f5c842]/40 text-[10px] font-bold px-2 py-0.5 rounded-[8px]">
                Clearing & Ledger
              </span>
            </div>
            <p className="text-[12px] text-[#94a3b8] mt-0.5">
              إدارة حركة النقد، تسويات الوكلاء والتجار، مطابقة البنوك (RTGS)، وصرف رواتب المؤسسات والوزارات
            </p>
          </div>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex items-center gap-1 bg-[#01140a] p-1 rounded-[12px] border border-[rgba(245,200,66,0.25)] flex-wrap">
          <button
            onClick={() => setActiveSubTab('settlements')}
            className={`px-3 py-1.5 rounded-[8px] text-[11px] font-bold transition-all cursor-pointer ${
              activeSubTab === 'settlements' 
                ? 'bg-[#14532d] text-emerald-200 border border-[#16a34a]' 
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            تسويات الوكلاء والتجار ({settlements.filter(s => s.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveSubTab('banks')}
            className={`px-3 py-1.5 rounded-[8px] text-[11px] font-bold transition-all cursor-pointer ${
              activeSubTab === 'banks' 
                ? 'bg-[#0c4a6e] text-sky-200 border border-[#0ea5e9]' 
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            مطابقة البنوك والمقاصة ({banks.length})
          </button>
          <button
            onClick={() => setActiveSubTab('salaries')}
            className={`px-3 py-1.5 rounded-[8px] text-[11px] font-bold transition-all cursor-pointer ${
              activeSubTab === 'salaries' 
                ? 'bg-[#78350f] text-amber-200 border border-[#f5c842]' 
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            صرف الرواتب الجماعي ({salaryBatches.length})
          </button>
          <button
            onClick={() => setActiveSubTab('vaults')}
            className={`px-3 py-1.5 rounded-[8px] text-[11px] font-bold transition-all cursor-pointer ${
              activeSubTab === 'vaults' 
                ? 'bg-purple-950 text-purple-200 border border-purple-500' 
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            الخزائن ودوران النقد ({vaults.length})
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. تبويب تسويات الوكلاء والتجار */}
      {/* ============================================================== */}
      {activeSubTab === 'settlements' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <div className="bg-[#01140a] p-3 rounded-[12px] border border-[rgba(245,200,66,0.2)]">
              <span className="text-[11px] text-[#94a3b8]">إجمالي الكاش الوارد (Cash In)</span>
              <div className="text-[18px] font-bold text-emerald-400 font-mono mt-1">
                {settlements.reduce((a, b) => a + b.totalCashIn, 0).toLocaleString()} <span className="text-[11px]">ر.ي</span>
              </div>
            </div>
            <div className="bg-[#01140a] p-3 rounded-[12px] border border-[rgba(245,200,66,0.2)]">
              <span className="text-[11px] text-[#94a3b8]">إجمالي الكاش المنصرف (Cash Out)</span>
              <div className="text-[18px] font-bold text-sky-400 font-mono mt-1">
                {settlements.reduce((a, b) => a + b.totalCashOut, 0).toLocaleString()} <span className="text-[11px]">ر.ي</span>
              </div>
            </div>
            <div className="bg-[#01140a] p-3 rounded-[12px] border border-[rgba(245,200,66,0.2)]">
              <span className="text-[11px] text-[#94a3b8]">عمولات الوكلاء المستحقة</span>
              <div className="text-[18px] font-bold text-[#f5c842] font-mono mt-1">
                {settlements.reduce((a, b) => a + b.commissionEarned, 0).toLocaleString()} <span className="text-[11px]">ر.ي</span>
              </div>
            </div>
            <div className="bg-[#01140a] p-3 rounded-[12px] border border-[rgba(245,200,66,0.2)]">
              <span className="text-[11px] text-[#94a3b8]">تسويات تنتظر الاعتماد</span>
              <div className="text-[18px] font-bold text-amber-400 font-mono mt-1">
                {settlements.filter(s => s.status === 'pending').length} وكلاء
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#01140a] border border-[rgba(245,200,66,0.2)] rounded-[14px] overflow-hidden">
            <div className="p-3 border-b border-[rgba(245,200,66,0.2)] flex items-center justify-between">
              <span className="text-[13px] font-bold text-white flex items-center gap-2">
                <Users size={16} className="text-[#f5c842]" />
                سجل التسويات اليومية للوكلاء وشبكات التوزيع
              </span>
              <span className="text-[11px] text-[#94a3b8]">إغلاق الحساب يومياً 11:59 م</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-[12px]">
                <thead>
                  <tr className="border-b border-[rgba(245,200,66,0.15)] bg-[#032516]/60 text-[#94a3b8]">
                    <th className="py-2.5 px-3">معرف الوكيل</th>
                    <th className="py-2.5 px-3">الاسم والمدينة</th>
                    <th className="py-2.5 px-3">كاش وارد</th>
                    <th className="py-2.5 px-3">كاش صادر</th>
                    <th className="py-2.5 px-3">صافي المستحق</th>
                    <th className="py-2.5 px-3">العمولة</th>
                    <th className="py-2.5 px-3">دفتر الأستاذ</th>
                    <th className="py-2.5 px-3">الحالة</th>
                    <th className="py-2.5 px-3 text-center">إجراء التسوية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(245,200,66,0.1)]">
                  {settlements.map((item) => (
                    <tr key={item.id} className="hover:bg-[#032516]/40 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-[#f5c842] font-semibold">{item.agentOrMerchantId}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-white">{item.name}</div>
                        <div className="text-[10px] text-[#94a3b8]">{item.city} • {item.type === 'agent' ? 'وكيل صرافة' : 'تاجر معتمد'}</div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-emerald-400">{item.totalCashIn.toLocaleString()}</td>
                      <td className="py-2.5 px-3 font-mono text-sky-400">{item.totalCashOut.toLocaleString()}</td>
                      <td className="py-2.5 px-3 font-mono font-bold">
                        <span className={item.netDue >= 0 ? "text-emerald-300" : "text-red-400"}>
                          {item.netDue > 0 ? `+${item.netDue.toLocaleString()}` : item.netDue.toLocaleString()} ر.ي
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[#f5c842]">+{item.commissionEarned.toLocaleString()}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-[#94a3b8]">{item.glCode}</td>
                      <td className="py-2.5 px-3">
                        {item.status === 'settled' && (
                          <span className="px-2 py-0.5 rounded-[6px] text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-600/50 font-bold">
                            تمت التسوية ✓
                          </span>
                        )}
                        {item.status === 'pending' && (
                          <span className="px-2 py-0.5 rounded-[6px] text-[10px] bg-amber-950 text-amber-300 border border-amber-600/50 font-bold">
                            بانتظار الاعتماد
                          </span>
                        )}
                        {item.status === 'review' && (
                          <span className="px-2 py-0.5 rounded-[6px] text-[10px] bg-red-950 text-red-300 border border-red-600/50 font-bold">
                            مراجعة تدقيق
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {item.status !== 'settled' ? (
                          <button
                            onClick={() => handleExecuteSettlement(item.id)}
                            className="px-2.5 py-1 bg-gradient-to-r from-[#14532d] to-[#16a34a] hover:from-[#16a34a] hover:to-emerald-400 hover:text-black text-white text-[10px] font-bold rounded-[8px] transition-all cursor-pointer"
                          >
                            اعتماد وتصفية
                          </button>
                        ) : (
                          <span className="text-[10px] text-[#94a3b8]">مكتمل 100%</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. تبويب مطابقة البنوك والمقاصة RTGS */}
      {/* ============================================================== */}
      {activeSubTab === 'banks' && (
        <div className="space-y-3">
          <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[#0ea5e9]/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#0c4a6e] text-sky-300 flex items-center justify-center font-bold">
                <Landmark size={18} />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-white">نظام المقاصة والربط البنكي اللحظي المباشر (Bank Connectors)</h4>
                <p className="text-[11px] text-[#94a3b8]">مطابقة أرصدة حسابات المنصة في البنوك مع قيود دفتر الأستاذ (GL-1002)</p>
              </div>
            </div>
            <button
              onClick={() => {
                banks.forEach(b => handleReconcileBank(b.id));
              }}
              className="px-3 py-1.5 bg-[#0c4a6e] hover:bg-sky-600 text-white rounded-[8px] text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>مطابقة آلية لجميع البنوك</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {banks.map((bank) => (
              <div key={bank.id} className="bg-[#01140a] border border-[rgba(245,200,66,0.2)] rounded-[14px] p-3.5 space-y-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-[13px] font-bold text-white">{bank.name}</h5>
                    <div className="text-[10px] text-[#94a3b8] font-mono mt-0.5">
                      حساب: {bank.accountNo} • {bank.glAccount}
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-[6px] text-[10px] font-bold ${
                    bank.status === 'matched' 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40' 
                      : 'bg-amber-950 text-amber-300 border border-amber-600/40'
                  }`}>
                    {bank.status === 'matched' ? 'متطابق 100%' : `فارق: ${bank.difference.toLocaleString()} ر.ي`}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#032516] p-2.5 rounded-[10px] text-center">
                  <div>
                    <span className="text-[10px] text-[#94a3b8] block">الرصيد في النظام (Ledger)</span>
                    <span className="text-[14px] font-bold text-emerald-400 font-mono">
                      {bank.balanceSystem.toLocaleString()} ر.ي
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#94a3b8] block">الرصيد في البنك (API)</span>
                    <span className="text-[14px] font-bold text-sky-400 font-mono">
                      {bank.balanceBank.toLocaleString()} ر.ي
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-[#94a3b8]">آخر مزامنة: {bank.lastSync}</span>
                  {bank.status !== 'matched' && (
                    <button
                      onClick={() => handleReconcileBank(bank.id)}
                      className="px-2 py-1 bg-amber-600 hover:bg-amber-500 text-black font-bold text-[10px] rounded-[6px] cursor-pointer"
                    >
                      تسوية الفارق تلقائياً
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. تبويب صرف الرواتب الجماعي (Excel/CSV لـ 1000 موظف) */}
      {/* ============================================================== */}
      {activeSubTab === 'salaries' && (
        <div className="space-y-3">
          <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[#f5c842]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#78350f] text-[#f5c842] flex items-center justify-center font-bold">
                <FileSpreadsheet size={18} />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-white">منظومة صرف الرواتب الجماعية (Salary Batch Engine)</h4>
                <p className="text-[11px] text-[#94a3b8]">صرف فوري للوزارات، المستشفيات، والشركات الكبرى بضغطة زر واحدة</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (triggerToast) triggerToast('محاكاة: تم فتح نافذة رفع ملف رواتب Excel/CSV جديد (يدعم حتى 10,000 موظف).');
              }}
              className="px-3 py-1.5 bg-[#f5c842] hover:bg-amber-300 text-black rounded-[8px] text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <PlusCircle size={14} />
              <span>رفع ملف مسيرات جديد (CSV/Excel)</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {salaryBatches.map((batch) => (
              <div key={batch.id} className="bg-[#01140a] border border-[rgba(245,200,66,0.2)] rounded-[14px] p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="text-[13px] font-bold text-white">{batch.entityName}</h5>
                    <span className="text-[10px] bg-[#032516] text-[#94a3b8] px-2 py-0.5 rounded-[6px] border border-[rgba(245,200,66,0.2)]">
                      {batch.department}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#94a3b8] flex flex-wrap items-center gap-2">
                    <span>الملف: <span className="font-mono text-[#f5c842]">{batch.fileReference}</span></span>
                    <span>•</span>
                    <span>عدد الموظفين: <span className="font-bold text-white">{batch.totalEmployees} موظف</span></span>
                    <span>•</span>
                    <span>رفع بواسطة: {batch.uploadedBy}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <span className="text-[10px] text-[#94a3b8] block">إجمالي كشف الراتب</span>
                    <span className="text-[16px] font-bold text-emerald-400 font-mono">
                      {batch.totalAmount.toLocaleString()} {batch.currency}
                    </span>
                  </div>

                  <div>
                    {batch.status === 'disbursed' ? (
                      <span className="px-3 py-1.5 bg-emerald-950 text-emerald-300 border border-emerald-600/50 rounded-[8px] text-[11px] font-bold flex items-center gap-1">
                        <Check size={14} />
                        تم الصرف بنجاح
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDisburseSalaries(batch.id)}
                        className="px-3 py-1.5 bg-gradient-to-r from-[#b45309] to-[#f5c842] text-black font-bold text-[11px] rounded-[8px] hover:scale-105 transition-all cursor-pointer shadow-md"
                      >
                        اعتماد وصرف جماعي فوراً
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. تبويب الخزائن ودوران النقد (Vaults & Safes) */}
      {/* ============================================================== */}
      {activeSubTab === 'vaults' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {vaults.map((vlt) => (
              <div key={vlt.id} className="bg-[#01140a] border border-[rgba(245,200,66,0.25)] rounded-[14px] p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-[14px] font-bold text-white">{vlt.name}</h5>
                    <span className="text-[11px] text-[#94a3b8] font-mono">{vlt.id} • {vlt.safeType}</span>
                  </div>
                  <span className="text-[10px] bg-purple-950 text-purple-200 border border-purple-500/40 px-2 py-0.5 rounded-[6px] font-bold">
                    معدل الدوران: {vlt.turnoverDaily}
                  </span>
                </div>

                <div className="bg-[#032516] p-3 rounded-[10px] flex items-center justify-between">
                  <span className="text-[11px] text-[#94a3b8]">الرصيد النقدي الفعلي في الخزنة</span>
                  <span className="text-[20px] font-bold text-[#f5c842] font-mono">
                    {vlt.balance.toLocaleString()} {vlt.currency}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#94a3b8] pt-1">
                  <span>مطابقة الجرد اليومي: معتمدة ومقفلة</span>
                  <button 
                    onClick={() => {
                      if (triggerToast) triggerToast(`تم فتح سجل حركة الخزنة ${vlt.id} وإصدار سند الجرد.`);
                    }}
                    className="text-[#f5c842] hover:underline cursor-pointer"
                  >
                    عرض حركة النقد وتوريدات الوكلاء ←
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default SovereignSettlementVaultHub;
