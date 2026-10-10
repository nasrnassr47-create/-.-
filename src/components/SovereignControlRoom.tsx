import React, { useState } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  AlertTriangle, 
  Building2, 
  Coins, 
  Users, 
  Key, 
  Server, 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  XCircle,
  TrendingDown
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Transaction, ApprovalRequest, BankAccount } from '../types';

interface SovereignControlRoomProps {
  onClose?: () => void;
  approvals: ApprovalRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  transactions: Transaction[];
  onFlagTransaction: (id: string) => void;
  banks: BankAccount[];
}

export const SovereignControlRoom: React.FC<SovereignControlRoomProps> = ({
  onClose,
  approvals,
  onApprove,
  onReject,
  transactions,
  onFlagTransaction,
  banks
}) => {
  const [activeTab, setActiveTab] = useState<'oversight' | 'approvals' | 'banks' | 'system'>('oversight');
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [amlSensitivity, setAmlSensitivity] = useState<'high' | 'ultra' | 'military'>('ultra');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  // Chart data for AML risk telemetry
  const riskTelemetryData = [
    { time: '08:00', safe: 120, flagged: 2 },
    { time: '09:00', safe: 240, flagged: 5 },
    { time: '10:00', safe: 310, flagged: 1 },
    { time: '11:00', safe: 480, flagged: 9 },
    { time: '12:00', safe: 390, flagged: 4 },
    { time: '13:00', safe: 520, flagged: 3 }
  ];

  return (
    <div className="bg-[#01140a] text-white min-h-[500px] rounded-[16px] border border-[rgba(245,200,66,0.3)] p-4 space-y-4 shadow-2xl">
      {/* Top Bar with Sovereign Identification */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-[rgba(245,200,66,0.2)] pb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[12px] bg-[#7f1d1d] border border-[#dc2626]/50 flex items-center justify-center shrink-0 shadow-lg">
            <ShieldAlert className="text-red-300" size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-bold text-white">غرفة الرقابة السيادية ومكافحة غسل الأموال (AML)</h2>
              <span className="bg-[#dc2626]/20 text-red-300 border border-[#dc2626]/40 text-[11px] font-semibold px-2 py-0.5 rounded-[10px]">
                نصر والت - سرية مطلقة
              </span>
            </div>
            <p className="text-[13px] text-[#94a3b8]">
              نظام الرصد المركزي، فحص الأنماط المالية المشبوهة، واعتماد أوامر المقاصة
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 bg-[#032516] p-1 rounded-[12px] border border-[rgba(245,200,66,0.2)]">
          <button
            onClick={() => setActiveTab('oversight')}
            className={`px-3 py-1.5 rounded-[10px] text-[12px] font-semibold transition-all ${
              activeTab === 'oversight' 
                ? 'bg-[#7f1d1d] text-white border border-[#dc2626]/50' 
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            الرقابة والرصد
          </button>
          <button
            onClick={() => setActiveTab('approvals')}
            className={`px-3 py-1.5 rounded-[10px] text-[12px] font-semibold transition-all ${
              activeTab === 'approvals' 
                ? 'bg-[#14532d] text-white border border-[#16a34a]/50' 
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            طلبات الاعتماد ({approvals.filter(a => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('banks')}
            className={`px-3 py-1.5 rounded-[10px] text-[12px] font-semibold transition-all ${
              activeTab === 'banks' 
                ? 'bg-[#0c4a6e] text-white border border-[#0ea5e9]/50' 
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            الربط المصرفي
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`px-3 py-1.5 rounded-[10px] text-[12px] font-semibold transition-all ${
              activeTab === 'system' 
                ? 'bg-[#78350f] text-[#f5c842] border border-[#f5c842]/50' 
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            التحكم المركزي
          </button>
        </div>
      </div>

      {/* Tab 1: Sovereign Oversight & AML */}
      {activeTab === 'oversight' && (
        <div className="space-y-4">
          {/* Top Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#032516] border border-[#dc2626]/40 p-3.5 rounded-[14px]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#94a3b8]">العمليات المرصودة تحت الفحص</span>
                <ShieldAlert size={18} className="text-[#dc2626]" />
              </div>
              <div className="text-[20px] font-bold text-red-400 mt-1">
                {transactions.filter(t => t.status === 'flagged').length} عمليات
              </div>
              <p className="text-[10px] text-red-300 mt-0.5">درجة خطورة فائقة &gt; 80%</p>
            </div>

            <div className="bg-[#032516] border border-[#16a34a]/40 p-3.5 rounded-[14px]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#94a3b8]">معدل السلامة ونقاء العمليات</span>
                <ShieldCheck size={18} className="text-[#16a34a]" />
              </div>
              <div className="text-[20px] font-bold text-[#16a34a] mt-1">99.84%</div>
              <p className="text-[10px] text-emerald-300 mt-0.5">خوارزمية التدقيق الحسابي نشطة</p>
            </div>

            <div className="bg-[#032516] border border-[#f5c842]/40 p-3.5 rounded-[14px]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#94a3b8]">مستوى حساسية الذكاء الاصطناعي</span>
                <Lock size={18} className="text-[#f5c842]" />
              </div>
              <div className="text-[16px] font-bold text-[#f5c842] mt-1">
                {amlSensitivity === 'military' ? 'درع عسكري متقدم' : 'رصد فائق (Ultra)'}
              </div>
              <p className="text-[10px] text-amber-200 mt-0.5">تتبع مسار الأصول اللحظي</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-[#032516] border border-[rgba(245,200,66,0.3)] rounded-[14px] p-4">
            <h3 className="text-[14px] font-bold text-white mb-2 flex items-center gap-2">
              <TrendingDown size={16} className="text-[#0ea5e9]" />
              <span>مخطط الرصد الزمني للعمليات المشبوهة والآمنة (اليوم)</span>
            </h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskTelemetryData}>
                  <defs>
                    <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFlagged" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,200,66,0.1)" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#01140a', borderColor: '#f5c842', borderRadius: '10px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="safe" stroke="#16a34a" fillOpacity={1} fill="url(#colorSafe)" name="عمليات سليمة" />
                  <Area type="monotone" dataKey="flagged" stroke="#dc2626" fillOpacity={1} fill="url(#colorFlagged)" name="اشتباه ومخالفات" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Flagged Transactions Table */}
          <div className="bg-[#032516] border border-[rgba(245,200,66,0.3)] rounded-[14px] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-white flex items-center gap-2">
                <AlertTriangle size={16} className="text-[#dc2626]" />
                <span>قائمة العمليات المرصودة للتحقيق والتجميد الفوري</span>
              </h3>
              <span className="text-[11px] text-[#94a3b8]">تحديث تلقائي كل 15 ثانية</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-[12px]">
                <thead>
                  <tr className="border-b border-[rgba(245,200,66,0.2)] text-[#94a3b8]">
                    <th className="py-2 px-3">رقم المرجع</th>
                    <th className="py-2 px-3">المرسل / المستفيد</th>
                    <th className="py-2 px-3">المبلغ</th>
                    <th className="py-2 px-3">درجة الخطر</th>
                    <th className="py-2 px-3">الحالة</th>
                    <th className="py-2 px-3">الإجراء السيادي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(245,200,66,0.1)]">
                  {transactions.map(txn => (
                    <tr key={txn.id} className="hover:bg-[#01140a]/40 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-[#f5c842]">{txn.referenceNo}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-white">{txn.sender}</div>
                        <div className="text-[11px] text-[#94a3b8]">{txn.recipient}</div>
                      </td>
                      <td className="py-2.5 px-3 font-bold font-mono">
                        {txn.amount.toLocaleString()} {txn.currency}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-[8px] text-[10px] font-bold ${
                          (txn.riskScore || 0) > 70 
                            ? 'bg-[#7f1d1d] text-red-200 border border-[#dc2626]' 
                            : 'bg-[#14532d] text-emerald-200'
                        }`}>
                          %{txn.riskScore || 0}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        {txn.status === 'flagged' ? (
                          <span className="text-[#dc2626] font-semibold">موقوف للتحقيق</span>
                        ) : (
                          <span className="text-[#16a34a] font-semibold">معتمد</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3">
                        <button
                          onClick={() => onFlagTransaction(txn.id)}
                          className="px-2.5 py-1 bg-[#7f1d1d] hover:bg-red-800 text-white rounded-[8px] text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-all"
                        >
                          <Lock size={12} />
                          <span>{txn.status === 'flagged' ? 'إلغاء التجميد' : 'تجميد وحظر'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Dual Approval & Maker-Checker Desk */}
      {activeTab === 'approvals' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-[#032516] p-3 rounded-[12px] border border-[rgba(245,200,66,0.3)]">
            <div>
              <h3 className="text-[14px] font-bold text-white">نظام الاعتماد المزدوج (Dual Approval - Maker Checker)</h3>
              <p className="text-[11px] text-[#94a3b8]">أي حوالة أو مقاصة تتجاوز 10,000,000 ر.ي تتطلب مصادقة نصر الشخصية</p>
            </div>
            <span className="bg-[#14532d] text-emerald-200 text-[11px] font-semibold px-2.5 py-1 rounded-[10px]">
              مفعل ومحمى بالبصمة
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {approvals.map(app => (
              <div 
                key={app.id}
                className="bg-[#032516] border border-[rgba(245,200,66,0.3)] rounded-[14px] p-4 space-y-3 shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-[#f5c842] font-mono">{app.id}</span>
                    <h4 className="text-[14px] font-bold text-white mt-0.5">{app.title}</h4>
                    <p className="text-[11px] text-[#94a3b8] mt-1">{app.details}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[8px] ${
                    app.urgency === 'critical' ? 'bg-[#7f1d1d] text-red-200' : 'bg-[#78350f] text-amber-200'
                  }`}>
                    {app.urgency === 'critical' ? 'عاجل جداً' : 'أولوية عالية'}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-[#01140a] p-2.5 rounded-[10px] border border-[rgba(245,200,66,0.15)]">
                  <div>
                    <span className="text-[10px] text-[#94a3b8] block">المبلغ المطلوب اعتماده:</span>
                    <span className="text-[16px] font-bold text-[#f5c842] font-mono">
                      {app.amount.toLocaleString()} {app.currency}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-[#94a3b8] block">مقدم الطلب:</span>
                    <span className="text-[11px] text-white font-semibold">{app.initiator}</span>
                  </div>
                </div>

                {app.status === 'pending' ? (
                  <div className="flex items-center gap-2 pt-2 border-t border-[rgba(245,200,66,0.15)]">
                    <button
                      onClick={() => onApprove(app.id)}
                      className="flex-1 py-2 bg-[#16a34a] hover:bg-emerald-600 text-white rounded-[10px] text-[12px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
                    >
                      <CheckCircle2 size={15} />
                      <span>اعتماد وتنفيذ فوري</span>
                    </button>
                    <button
                      onClick={() => onReject(app.id)}
                      className="py-2 px-3 bg-[#7f1d1d] hover:bg-red-800 text-white rounded-[10px] text-[12px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-[0.98]"
                    >
                      <XCircle size={15} />
                      <span>رفض</span>
                    </button>
                  </div>
                ) : (
                  <div className={`p-2 rounded-[10px] text-center text-[12px] font-bold ${
                    app.status === 'approved' ? 'bg-[#14532d] text-emerald-200' : 'bg-[#7f1d1d] text-red-200'
                  }`}>
                    {app.status === 'approved' ? 'تم الاعتماد بنجاح وتوليد قيد المقاصة' : 'تم الرفض وإعادة المبلغ إلى العهدة'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Banking Integration & Clearing House */}
      {activeTab === 'banks' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {banks.map(bank => (
              <div 
                key={bank.id}
                className="bg-[#032516] border border-[#0ea5e9]/40 rounded-[14px] p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-[10px] bg-[#0c4a6e] border border-[#0ea5e9]/40 flex items-center justify-center">
                    <Building2 className="text-[#0ea5e9]" size={18} />
                  </div>
                  <span className="text-[10px] bg-[#0c4a6e] text-sky-200 px-2 py-0.5 rounded-[8px] font-semibold">
                    {bank.status === 'connected' ? 'ربط مباشر نشط' : 'قيد المزامنة'}
                  </span>
                </div>

                <div>
                  <h4 className="text-[14px] font-bold text-white">{bank.bankName}</h4>
                  <p className="text-[11px] text-[#94a3b8] font-mono mt-0.5">{bank.accountNumber}</p>
                </div>

                <div className="bg-[#01140a] p-2.5 rounded-[10px] border border-[rgba(245,200,66,0.15)]">
                  <span className="text-[10px] text-[#94a3b8] block">الرصيد المتاح للمقاصة:</span>
                  <span className="text-[16px] font-bold text-[#0ea5e9] font-mono">
                    {bank.balance.toLocaleString()} {bank.currency}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#94a3b8]">
                  <span>آخر مزامنة: {bank.lastSync}</span>
                  <button className="text-[#0ea5e9] hover:underline cursor-pointer font-semibold">
                    تدقيق مطابقة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Central Command System Console */}
      {activeTab === 'system' && (
        <div className="bg-[#032516] border border-[#f5c842]/40 rounded-[14px] p-4 space-y-4">
          <div className="border-b border-[rgba(245,200,66,0.2)] pb-3">
            <h3 className="text-[15px] font-bold text-white flex items-center gap-2">
              <Key size={18} className="text-[#f5c842]" />
              <span>وحدة التحكم والضبط السيادي العام</span>
            </h3>
            <p className="text-[12px] text-[#94a3b8]">إعدادات الخادم المركزي، مفاتيح التشفير، وحالة الطوارئ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-white">وضع الصيانة السيادية (Lockdown)</span>
                <button
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`px-3 py-1 rounded-[10px] text-[11px] font-bold transition-all cursor-pointer ${
                    maintenanceMode ? 'bg-[#dc2626] text-white' : 'bg-[#032516] text-[#94a3b8] border border-[rgba(245,200,66,0.3)]'
                  }`}
                >
                  {maintenanceMode ? 'مفعل (النظام مغلق)' : 'معطل (النظام مفتوح)'}
                </button>
              </div>
              <p className="text-[11px] text-[#94a3b8]">
                عند التفعيل، يتم منع أي حوالة مالية تتجاوز 1,000 ريال خارج الشبكة الداخلية.
              </p>
            </div>

            <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-white">حساسية رادار غسل الأموال (AML)</span>
                <select
                  value={amlSensitivity}
                  onChange={(e) => setAmlSensitivity(e.target.value as any)}
                  className="bg-[#032516] text-[#f5c842] border border-[rgba(245,200,66,0.3)] text-[11px] font-bold px-2 py-1 rounded-[8px] focus:outline-none"
                >
                  <option value="high">مرتفع (قياسي)</option>
                  <option value="ultra">فائق (Ultra AML)</option>
                  <option value="military">درع عسكري (Military Grade)</option>
                </select>
              </div>
              <p className="text-[11px] text-[#94a3b8]">
                تطبيق تدقيق الذكاء الاصطناعي على كافة السجلات والتحويلات المالية اللحظية.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SovereignControlRoom;
