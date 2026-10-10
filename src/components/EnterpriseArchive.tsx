import React from 'react';
import { FolderArchive, FileText, Download, ShieldCheck, Lock } from 'lucide-react';

export const EnterpriseArchive: React.FC = () => {
  const documents = [
    { id: 'DOC-01', title: 'عقد التأسيس والترخيص السيادي للبريد اليمني', size: '2.4 MB', date: '2026-01-10', type: 'PDF' },
    { id: 'DOC-02', title: 'بروتوكول الربط التقني المشترك مع البنك المركزي (API)', size: '1.8 MB', date: '2026-03-15', type: 'PDF' },
    { id: 'DOC-03', title: 'تقرير التدقيق المالي ومطابقة الأرصدة الربع سنوي', size: '4.1 MB', date: '2026-08-30', type: 'XLSX' },
    { id: 'DOC-04', title: 'شهادة الامتثال الدولي لمعايير مكافحة غسل الأموال AML', size: '950 KB', date: '2026-09-01', type: 'PDF' }
  ];

  return (
    <div className="bg-[#032516] rounded-[16px] border border-[rgba(245,200,66,0.3)] p-4 space-y-4 text-white">
      <div className="flex items-center justify-between border-b border-[rgba(245,200,66,0.2)] pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[10px] bg-[#78350f] border border-[#f5c842]/40 flex items-center justify-center">
            <FolderArchive size={20} className="text-[#f5c842]" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold">الخزنة الرقمية وأرشيف المستندات المحمية</h3>
            <p className="text-[12px] text-[#94a3b8]">أرشفة العقود الرسمية، تراخيص البنك المركزي، ومحاضر التسوية المشفرة</p>
          </div>
        </div>
        <span className="text-[11px] bg-[#14532d] text-emerald-200 border border-[#16a34a]/40 px-2.5 py-1 rounded-[10px] font-semibold flex items-center gap-1">
          <Lock size={12} />
          <span>تشفير 256-Bit</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-[#01140a] border border-[rgba(245,200,66,0.2)] rounded-[12px] p-3.5 flex items-start justify-between hover:border-[#f5c842] transition-colors">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#78350f] flex items-center justify-center shrink-0">
                <FileText size={16} className="text-[#f5c842]" />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-white">{doc.title}</h4>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-[#94a3b8]">
                  <span>{doc.date}</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span className="text-[#f5c842] font-mono">{doc.type}</span>
                </div>
              </div>
            </div>
            <button className="p-2 bg-[#032516] hover:bg-[#78350f] text-[#f5c842] rounded-[8px] border border-[rgba(245,200,66,0.3)] cursor-pointer transition-colors">
              <Download size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnterpriseArchive;
