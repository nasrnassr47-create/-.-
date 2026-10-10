import React from 'react';
import { BookOpen, X, Printer, Download, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

interface DocumentationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationCenterModal: React.FC<DocumentationCenterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#032516] border border-[#f5c842] rounded-[16px] w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#01140a] p-4 border-b border-[rgba(245,200,66,0.3)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-[#78350f] border border-[#f5c842]/40 flex items-center justify-center">
              <BookOpen size={20} className="text-[#f5c842]" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-white">مركز التوثيق الشامل ومجلد الأكواد السيادية PDF</h3>
              <p className="text-[12px] text-[#94a3b8]">المعمارية التقنية، دليل الربط البنكي، والشهادات المحاسبية المعتمدة</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-[#f5c842] text-black font-bold text-[12px] rounded-[8px] flex items-center gap-1.5 cursor-pointer hover:bg-[#f5c842]/90"
            >
              <Printer size={15} />
              <span>طباعة / تصدير PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-[#94a3b8] hover:text-white p-1 rounded hover:bg-white/10 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-white text-[13px] leading-relaxed">
          <div className="bg-[#01140a] border border-[rgba(245,200,66,0.2)] rounded-[12px] p-4 space-y-2">
            <div className="flex items-center gap-2 text-[#f5c842] font-bold text-[14px]">
              <ShieldCheck size={18} />
              <span>شهادة التوثيق السيادي لمنظومة نصر والت (Nasr Sovereign Enterprise)</span>
            </div>
            <p className="text-[#94a3b8]">
              تم تصميم هذه المنظومة بأعلى معايير الأمان المصرفي وفق توجيهات البريد اليمني والبنك المركزي اليمني،
              مع دعم كامل لتقنيات التشفير التناظري AES-256 GCM ونظام المحاسبة المزدوجة اللحظي (Dual Entry Accounting).
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-[15px] font-bold text-[#f5c842] border-b border-[rgba(245,200,66,0.2)] pb-1.5">
              1. البنية المعمارية ونظام العهد اللحظي
            </h4>
            <p className="text-[#94a3b8]">
              تعتمد المنظومة على نواة مستقلة تعمل في حالة عدم الاتصال (Offline First) مع مزامنة لحظية فور توفر الشبكة،
              وتشمل محفظة العميل الفردي، محفظة المؤسسات والتجار، وبوابة المقاصة المركزية مع بنك التضامن وبنك الكريمي.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-[15px] font-bold text-[#f5c842] border-b border-[rgba(245,200,66,0.2)] pb-1.5">
              2. غرفة الرقابة السيادية ومكافحة غسل الأموال (AML Engine)
            </h4>
            <p className="text-[#94a3b8]">
              يتم إخضاع كافة الحركات المالية لخوارزمية قياس الخطورة اللحظية (Risk Scoring)، ويتم حظر وتجميد أي حساب
              أو حركة تتجاوز الحدود المسموحة أو تظهر نمطاً مشبوهاً حتى يتم فحصها من المالك نصر عبر نظام Maker-Checker.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-[15px] font-bold text-[#f5c842] border-b border-[rgba(245,200,66,0.2)] pb-1.5">
              3. تكامل الاتصالات وخدمات السداد الحكومي
            </h4>
            <p className="text-[#94a3b8]">
              بوابات الربط مع شركات الاتصالات اليمنية (يمن موبايل، يو، سبأفون، يمن نت، فايبر) تعمل بواجهات برمجية مباشرة
              تضمن وصول الرصيد خلال 3 ثوانٍ فقط وبدون أي هوامش رسوم خفية.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-[15px] font-bold text-[#f5c842] border-b border-[rgba(245,200,66,0.2)] pb-1.5">
              4. المخطط المعماري الموحد NASR WALLET Ω (الطبقات الخمس)
            </h4>
            <div className="bg-[#01140a] p-3 rounded-[10px] border border-[rgba(245,200,66,0.2)] text-[12px] font-mono text-emerald-300 space-y-1">
              <div>├── 📂 1- Client Layer (Customer App, Merchant App, Agent App, Web Portal, Family Portal)</div>
              <div>├── 📂 2- Central Control System (Wallet Core, Transaction Engine, RBAC, Audit Log, Emergency Kill Switch)</div>
              <div>├── 📂 3- Service & Business Logic (SMS/OTP, KYC, Bank Integrations, Bill Payments, Fee Engine, Salary Batch)</div>
              <div>├── 📂 4- Risk, Fraud & Compliance (Real-time Fraud Detection, AML/CFT, Daily Clearing & Settlements)</div>
              <div>└── 📂 5- Data & Infrastructure (PostgreSQL 20+ Tables, Redis Cache, Double-Entry Ledger, AWS S3 Backup)</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[15px] font-bold text-[#f5c842] border-b border-[rgba(245,200,66,0.2)] pb-1.5">
              5. دورة الموافقات السيادية ومصفوفة الصلاحيات (6 أدوار)
            </h4>
            <p className="text-[#94a3b8]">
              سير العمليات يخضع لـ 6 مراحل صارمة: (استلام الطلب Accept ➔ اعتماد Approve ➔ حجز مؤقت Hold ➔ إفراج Release ➔ إيقاف Stop ➔ رفض مع سبب Reject).
              الأدوار الإدارية مقسمة لـ: System Admin (وصول كامل)، Finance Manager (اعتماد وإعدادات)، Support Agent (تجميد واسترجاع)، Auditor (قراءة وتدقيق فقط للبنك المركزي)، Agent Manager (إدارة الوكلاء والسيولة)، Salary Manager (مسيرات الرواتب).
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-[15px] font-bold text-[#f5c842] border-b border-[rgba(245,200,66,0.2)] pb-1.5">
              6. تسويات الوكلاء والخزائن ودوران النقد اليومي
            </h4>
            <p className="text-[#94a3b8]">
              كل حركة سحب (Cash Out) أو إيداع (Cash In) تُقيد في دفتر الأستاذ العام وتُطابق يومياً الساعة 11:59 م مع خزينة صنعاء الرئيسية وخزائن الوكلاء وحسابات البنوك التجارية (الكريمي، النجم، سبأ) والبنك المركزي عبر نظام التسوية الإجمالي RTGS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationCenterModal;
