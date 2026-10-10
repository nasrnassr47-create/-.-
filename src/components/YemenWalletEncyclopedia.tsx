import React from 'react';
import { BookOpen, Layers, ShieldCheck, Cpu, Database } from 'lucide-react';

export const YemenWalletEncyclopedia: React.FC = () => {
  return (
    <div className="bg-[#032516] rounded-[16px] border border-[rgba(245,200,66,0.3)] p-4 space-y-4 text-white">
      <div className="flex items-center justify-between border-b border-[rgba(245,200,66,0.2)] pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[10px] bg-[#0c4a6e] border border-[#0ea5e9]/40 flex items-center justify-center">
            <BookOpen size={20} className="text-[#0ea5e9]" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold">الموسوعة المرجعية وبنية منظومة نصر والت</h3>
            <p className="text-[12px] text-[#94a3b8]">الدليل المعماري الشامل، شجرة الحسابات، وقواعد الامتثال المالي</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px]">
        <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] space-y-2">
          <div className="flex items-center gap-2 text-[#f5c842] font-bold">
            <Layers size={16} />
            <span>1. طبقة البنية النقدية المزدوجة</span>
          </div>
          <p className="text-[#94a3b8] leading-relaxed">
            تتكون من حسابات الخزينة المركزية، حسابات العهد المؤقتة، وحسابات المقاصة الوسيطة مع البنك المركزي اليمني وبنك التضامن.
          </p>
        </div>

        <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] space-y-2">
          <div className="flex items-center gap-2 text-[#0ea5e9] font-bold">
            <Cpu size={16} />
            <span>2. محرك المقاصة والاتصالات اللحظي</span>
          </div>
          <p className="text-[#94a3b8] leading-relaxed">
            يرتبط مباشرة مع مزودي الاتصالات عبر بروتوكولات REST/JSON المشفرة وموجه فوري ينفذ القيود في غضون 3 ثوانٍ.
          </p>
        </div>

        <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] space-y-2">
          <div className="flex items-center gap-2 text-[#16a34a] font-bold">
            <ShieldCheck size={16} />
            <span>3. خوارزمية الرقابة ومكافحة غسل الأموال</span>
          </div>
          <p className="text-[#94a3b8] leading-relaxed">
            نموذج تقييم المخاطر السيادي يقوم بمسح الحركات وتطبيق حدود السحب اليومية وقوائم الحظر وتجميد العمليات المشتبه بها تلقائياً.
          </p>
        </div>
      </div>
    </div>
  );
};

export default YemenWalletEncyclopedia;
