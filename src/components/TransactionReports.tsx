import React from 'react';
import { TrendingUp, Download, Printer, Filter, Calendar } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionReportsProps {
  transactions: Transaction[];
}

export const TransactionReports: React.FC<TransactionReportsProps> = ({ transactions }) => {
  return (
    <div className="bg-[#032516] rounded-[16px] border border-[rgba(245,200,66,0.3)] p-4 space-y-4 text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[rgba(245,200,66,0.2)] pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[10px] bg-[#7f1d1d] border border-[#dc2626]/40 flex items-center justify-center">
            <TrendingUp size={20} className="text-red-300" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold">دفتر اليومية العامة والتقارير المالية المعتمدة</h3>
            <p className="text-[12px] text-[#94a3b8]">كشوفات الحسابات، قيود اليومية، وتصدير السجلات لـ Excel و PDF</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-[#f5c842] text-black font-bold text-[11px] rounded-[8px] flex items-center gap-1.5 cursor-pointer hover:bg-[#f5c842]/90"
          >
            <Printer size={14} />
            <span>طباعة الكشف</span>
          </button>
          <button 
            onClick={() => alert('تم تصدير كشف اليومية العامة بصيغة Excel بنجاح.')}
            className="px-3 py-1.5 bg-[#14532d] border border-[#16a34a]/40 text-emerald-200 font-bold text-[11px] rounded-[8px] flex items-center gap-1.5 cursor-pointer hover:bg-[#16a34a] hover:text-white"
          >
            <Download size={14} />
            <span>تصدير Excel</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right text-[12px]">
          <thead>
            <tr className="border-b border-[rgba(245,200,66,0.2)] text-[#94a3b8]">
              <th className="py-2.5 px-3">رقم القيد</th>
              <th className="py-2.5 px-3">التاريخ والوقت</th>
              <th className="py-2.5 px-3">البيان / الحساب</th>
              <th className="py-2.5 px-3">التصنيف</th>
              <th className="py-2.5 px-3">المبلغ</th>
              <th className="py-2.5 px-3">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(245,200,66,0.1)]">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-[#01140a]/40 transition-colors">
                <td className="py-2.5 px-3 font-mono text-[#f5c842]">{t.referenceNo}</td>
                <td className="py-2.5 px-3 text-[#94a3b8]">{t.date} {t.time}</td>
                <td className="py-2.5 px-3">
                  <span className="font-bold text-white block">{t.recipientName || t.recipient}</span>
                  <span className="text-[10px] text-[#94a3b8]">من: {t.sender}</span>
                </td>
                <td className="py-2.5 px-3 text-[#94a3b8]">{t.category}</td>
                <td className="py-2.5 px-3 font-mono font-bold">
                  {t.amount.toLocaleString()} {t.currency}
                </td>
                <td className="py-2.5 px-3">
                  <span className={`px-2 py-0.5 rounded-[6px] text-[10px] font-bold ${
                    t.status === 'completed'
                      ? 'bg-[#14532d] text-emerald-200'
                      : t.status === 'flagged'
                      ? 'bg-[#7f1d1d] text-red-200'
                      : 'bg-[#78350f] text-amber-200'
                  }`}>
                    {t.status === 'completed' ? 'منفذ ومقيد' : t.status === 'flagged' ? 'موقوف AML' : 'معلق'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionReports;
