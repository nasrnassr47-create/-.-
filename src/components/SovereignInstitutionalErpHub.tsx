import React, { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  GraduationCap, 
  Users, 
  FileText, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Download, 
  PlusCircle, 
  ChevronRight, 
  ShieldCheck, 
  Printer, 
  Receipt,
  UserPlus
} from 'lucide-react';

export interface UniversityStudentFee {
  id: string;
  studentName: string;
  studentId: string;
  university: string;
  college: string;
  major: string;
  semester: string;
  requiredAmount: number;
  paidAmount: number;
  balanceDue: number;
  status: 'fully_paid' | 'partial' | 'pending';
  receiptNo: string;
  paymentDate: string;
}

export interface InternalEmployee {
  id: string;
  name: string;
  role: string;
  department: string;
  branch: string;
  salary: number;
  allowance: number;
  deductions: number;
  netSalary: number;
  bankAccount: string;
  status: 'active' | 'on_leave';
  attendanceRate: string;
}

export const SovereignInstitutionalErpHub: React.FC<{
  triggerToast?: (msg: string) => void;
}> = ({ triggerToast }) => {
  const [activeSection, setActiveSection] = useState<'universities' | 'payroll' | 'procurement' | 'audit'>('universities');
  const [searchQuery, setSearchQuery] = useState('');

  // University Student Fees Database
  const [universityFees, setUniversityFees] = useState<UniversityStudentFee[]>([
    {
      id: 'STU-01',
      studentName: 'محمد ناصر صالح فضل',
      studentId: 'UNI-2026-4412',
      university: 'جامعة صنعاء',
      college: 'كلية الحاسوب وتكنولوجيا المعلومات',
      major: 'هندسة برمجيات وذكاء اصطناعي',
      semester: 'الفصل الأول 2026/2027',
      requiredAmount: 120000,
      paidAmount: 120000,
      balanceDue: 0,
      status: 'fully_paid',
      receiptNo: 'REC-UNI-99120',
      paymentDate: '2026-10-05'
    },
    {
      id: 'STU-02',
      studentName: 'ريمان أحمد باذيب',
      studentId: 'UNI-2026-8819',
      university: 'جامعة عدن',
      college: 'كلية الطب والعلوم الصحية',
      major: 'طب بشري وجراحة',
      semester: 'الفصل الأول 2026/2027',
      requiredAmount: 250000,
      paidAmount: 150000,
      balanceDue: 100000,
      status: 'partial',
      receiptNo: 'REC-UNI-99121',
      paymentDate: '2026-10-06'
    },
    {
      id: 'STU-03',
      studentName: 'سامي عبدالملك الحبيشي',
      studentId: 'UNI-2026-3104',
      university: 'جامعة تعز',
      college: 'كلية العلوم الإدارية',
      major: 'محاسبة وعلوم مالية ومصرفية',
      semester: 'الفصل الأول 2026/2027',
      requiredAmount: 85000,
      paidAmount: 85000,
      balanceDue: 0,
      status: 'fully_paid',
      receiptNo: 'REC-UNI-99122',
      paymentDate: '2026-10-07'
    },
    {
      id: 'STU-04',
      studentName: 'هدى عصام الورد',
      studentId: 'UNI-2026-6211',
      university: 'جامعة العلوم والتكنولوجيا',
      college: 'كلية الهندسة',
      major: 'هندسة معمارية وتصميم',
      semester: 'الفصل الأول 2026/2027',
      requiredAmount: 320000,
      paidAmount: 0,
      balanceDue: 320000,
      status: 'pending',
      receiptNo: 'REC-UNI-99123',
      paymentDate: 'معلق'
    }
  ]);

  // Internal Company Payroll
  const [internalEmployees, setInternalEmployees] = useState<InternalEmployee[]>([
    {
      id: 'EMP-001',
      name: 'م/ ناصر فضل',
      role: 'كبير مهندسي النظم والسيادة الرقمية',
      department: 'إدارة التقنية والابتكار',
      branch: 'المركز الرئيسي - صنعاء',
      salary: 1200000,
      allowance: 300000,
      deductions: 0,
      netSalary: 1500000,
      bankAccount: '300-881920-01 (الكريمي)',
      status: 'active',
      attendanceRate: '100%'
    },
    {
      id: 'EMP-002',
      name: 'أحمد الإرياني',
      role: 'مدير العمليات ومطابقة دفتر الأستاذ',
      department: 'الإدارة المالية والمحاسبية',
      branch: 'المركز الرئيسي - صنعاء',
      salary: 650000,
      allowance: 120000,
      deductions: 15000,
      netSalary: 755000,
      bankAccount: 'NJM-771920-YE (النجم)',
      status: 'active',
      attendanceRate: '98.5%'
    },
    {
      id: 'EMP-003',
      name: 'سارة عبدالكريم العدني',
      role: 'مشرفة تدقيق الامتثال والـ KYC',
      department: 'إدارة الامتثال ومكافحة غسل الأموال',
      branch: 'فرع خور مكسر - عدن',
      salary: 580000,
      allowance: 90000,
      deductions: 10000,
      netSalary: 660000,
      bankAccount: '010-449102-09 (بنك سبأ)',
      status: 'active',
      attendanceRate: '99.0%'
    },
    {
      id: 'EMP-004',
      name: 'ياسين محمد الحاشدي',
      role: 'مسؤول دعم الوكلاء ومراقبة السيولة',
      department: 'إدارة شبكة الوكلاء والتوزيع',
      branch: 'فرع الحصبة - صنعاء',
      salary: 420000,
      allowance: 60000,
      deductions: 5000,
      netSalary: 475000,
      bankAccount: '300-992140-02 (الكريمي)',
      status: 'active',
      attendanceRate: '97.2%'
    }
  ]);

  const handlePayTuition = (id: string) => {
    setUniversityFees(prev => prev.map(f => {
      if (f.id === id) {
        return {
          ...f,
          paidAmount: f.requiredAmount,
          balanceDue: 0,
          status: 'fully_paid',
          paymentDate: new Date().toISOString().split('T')[0]
        };
      }
      return f;
    }));
    if (triggerToast) triggerToast('تم تسديد الرسوم الجامعية وإصدار سند رسمي معتمد للجامعة.');
  };

  const handleDisburseStaffPayroll = () => {
    if (triggerToast) triggerToast('تم صرف مسير رواتب موظفي نصر والت بنجاح إلى حساباتهم المصرفية المعتمدة.');
  };

  return (
    <div className="bg-[#032516] border border-[rgba(245,200,66,0.3)] rounded-[16px] p-4 text-white space-y-4 shadow-xl select-none" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-[rgba(245,200,66,0.2)] pb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[12px] bg-purple-950 border border-purple-500/40 flex items-center justify-center shrink-0">
            <Briefcase className="text-purple-300" size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[17px] font-bold text-white">منظومة المؤسسات والجامعات وإدارة الموارد (ERP & Institutional)</h2>
              <span className="bg-purple-950 text-purple-200 border border-purple-500/40 text-[10px] font-bold px-2 py-0.5 rounded-[8px]">
                ERP Core v7.0
              </span>
            </div>
            <p className="text-[12px] text-[#94a3b8] mt-0.5">
              ربط الجامعات الحكومية والخاصة، تحصيل الرسوم والتنسيق، وإدارة موظفي ورواتب المنظومة
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-[#01140a] p-1 rounded-[12px] border border-[rgba(245,200,66,0.25)] flex-wrap">
          <button
            onClick={() => setActiveSection('universities')}
            className={`px-3 py-1.5 rounded-[8px] text-[11px] font-bold transition-all cursor-pointer ${
              activeSection === 'universities'
                ? 'bg-purple-950 text-purple-200 border border-purple-500'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            أنظمة الجامعات والرسوم ({universityFees.length})
          </button>
          <button
            onClick={() => setActiveSection('payroll')}
            className={`px-3 py-1.5 rounded-[8px] text-[11px] font-bold transition-all cursor-pointer ${
              activeSection === 'payroll'
                ? 'bg-[#14532d] text-emerald-200 border border-[#16a34a]'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            الموظفين ورواتب المنظومة ({internalEmployees.length})
          </button>
          <button
            onClick={() => setActiveSection('procurement')}
            className={`px-3 py-1.5 rounded-[8px] text-[11px] font-bold transition-all cursor-pointer ${
              activeSection === 'procurement'
                ? 'bg-[#78350f] text-amber-200 border border-[#f5c842]'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            التوريدات وأجهزة POS
          </button>
          <button
            onClick={() => setActiveSection('audit')}
            className={`px-3 py-1.5 rounded-[8px] text-[11px] font-bold transition-all cursor-pointer ${
              activeSection === 'audit'
                ? 'bg-[#0c4a6e] text-sky-200 border border-[#0ea5e9]'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            المراجعة والتدقيق الإداري
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. أنظمة الجامعات والرسوم الدراسية */}
      {/* ============================================================== */}
      {activeSection === 'universities' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="bg-[#01140a] p-3 rounded-[12px] border border-[rgba(245,200,66,0.2)]">
              <span className="text-[11px] text-[#94a3b8]">إجمالي الرسوم المطلوبة</span>
              <div className="text-[18px] font-bold text-white font-mono mt-1">
                {universityFees.reduce((a, b) => a + b.requiredAmount, 0).toLocaleString()} <span className="text-[11px]">ر.ي</span>
              </div>
            </div>
            <div className="bg-[#01140a] p-3 rounded-[12px] border border-[rgba(245,200,66,0.2)]">
              <span className="text-[11px] text-[#94a3b8]">الرسوم المحصلة في الخزينة</span>
              <div className="text-[18px] font-bold text-emerald-400 font-mono mt-1">
                {universityFees.reduce((a, b) => a + b.paidAmount, 0).toLocaleString()} <span className="text-[11px]">ر.ي</span>
              </div>
            </div>
            <div className="bg-[#01140a] p-3 rounded-[12px] border border-[rgba(245,200,66,0.2)]">
              <span className="text-[11px] text-[#94a3b8]">المتبقي للتحصيل</span>
              <div className="text-[18px] font-bold text-amber-400 font-mono mt-1">
                {universityFees.reduce((a, b) => a + b.balanceDue, 0).toLocaleString()} <span className="text-[11px]">ر.ي</span>
              </div>
            </div>
          </div>

          <div className="bg-[#01140a] border border-[rgba(245,200,66,0.2)] rounded-[14px] overflow-hidden">
            <div className="p-3 border-b border-[rgba(245,200,66,0.2)] flex items-center justify-between">
              <span className="text-[13px] font-bold text-white flex items-center gap-2">
                <GraduationCap size={16} className="text-[#f5c842]" />
                بوابة التنسيق وتحصيل الرسوم الجامعية الإلكترونية
              </span>
              <span className="text-[11px] text-[#94a3b8]">تكامل مباشر مع قواعد بيانات شؤون الطلاب</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-[12px]">
                <thead>
                  <tr className="border-b border-[rgba(245,200,66,0.15)] bg-[#032516]/60 text-[#94a3b8]">
                    <th className="py-2.5 px-3">رقم القيد</th>
                    <th className="py-2.5 px-3">اسم الطالب</th>
                    <th className="py-2.5 px-3">الجامعة والكلية</th>
                    <th className="py-2.5 px-3">التخصص</th>
                    <th className="py-2.5 px-3">المبلغ المطلوب</th>
                    <th className="py-2.5 px-3">المسدد</th>
                    <th className="py-2.5 px-3">المتبقي</th>
                    <th className="py-2.5 px-3">الحالة</th>
                    <th className="py-2.5 px-3 text-center">إجراء التسديد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(245,200,66,0.1)]">
                  {universityFees.map((fee) => (
                    <tr key={fee.id} className="hover:bg-[#032516]/40 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-[#f5c842]">{fee.studentId}</td>
                      <td className="py-2.5 px-3 font-bold text-white">{fee.studentName}</td>
                      <td className="py-2.5 px-3">
                        <div className="text-white font-medium">{fee.university}</div>
                        <div className="text-[10px] text-[#94a3b8]">{fee.college}</div>
                      </td>
                      <td className="py-2.5 px-3 text-[#94a3b8]">{fee.major}</td>
                      <td className="py-2.5 px-3 font-mono">{fee.requiredAmount.toLocaleString()} ر.ي</td>
                      <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">{fee.paidAmount.toLocaleString()} ر.ي</td>
                      <td className="py-2.5 px-3 font-mono text-amber-300">
                        {fee.balanceDue === 0 ? 'لا يوجد' : `${fee.balanceDue.toLocaleString()} ر.ي`}
                      </td>
                      <td className="py-2.5 px-3">
                        {fee.status === 'fully_paid' && (
                          <span className="px-2 py-0.5 rounded-[6px] text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-600/40 font-bold">
                            مسدد كلياً ✓
                          </span>
                        )}
                        {fee.status === 'partial' && (
                          <span className="px-2 py-0.5 rounded-[6px] text-[10px] bg-amber-950 text-amber-300 border border-amber-600/40 font-bold">
                            سداد جزئي
                          </span>
                        )}
                        {fee.status === 'pending' && (
                          <span className="px-2 py-0.5 rounded-[6px] text-[10px] bg-red-950 text-red-300 border border-red-600/40 font-bold">
                            غير مسدد
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {fee.status !== 'fully_paid' ? (
                          <button
                            onClick={() => handlePayTuition(fee.id)}
                            className="px-2.5 py-1 bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white rounded-[8px] text-[10px] font-bold transition-all cursor-pointer"
                          >
                            تسديد الآن
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (triggerToast) triggerToast(`تمت طباعة إيصال السداد رقم ${fee.receiptNo} بنجاح.`);
                            }}
                            className="px-2 py-1 bg-[#01140a] hover:bg-[#032516] text-[#f5c842] border border-[rgba(245,200,66,0.3)] rounded-[6px] text-[10px] font-semibold cursor-pointer"
                          >
                            طباعة سند 🖨️
                          </button>
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
      {/* 2. الموظفين ورواتب المنظومة الداخلية */}
      {/* ============================================================== */}
      {activeSection === 'payroll' && (
        <div className="space-y-3">
          <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[#16a34a]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-[13px] font-bold text-white">مسيرات رواتب الكادر الوظيفي والتقني لنصر والت</h4>
              <p className="text-[11px] text-[#94a3b8]">إجمالي المسير الشهري: {internalEmployees.reduce((a, b) => a + b.netSalary, 0).toLocaleString()} ر.ي (منفصلة عن حسابات العملاء)</p>
            </div>
            <button
              onClick={handleDisburseStaffPayroll}
              className="px-3.5 py-2 bg-gradient-to-r from-[#14532d] to-[#16a34a] hover:from-[#16a34a] hover:to-emerald-400 hover:text-black text-white rounded-[8px] text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <CheckCircle2 size={15} />
              <span>اعتماد وصرف المسير لجميع الموظفين</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {internalEmployees.map((emp) => (
              <div key={emp.id} className="bg-[#01140a] border border-[rgba(245,200,66,0.2)] rounded-[14px] p-3.5 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-[14px] font-bold text-white">{emp.name}</h5>
                    <div className="text-[11px] text-[#f5c842] font-semibold">{emp.role}</div>
                    <div className="text-[10px] text-[#94a3b8]">{emp.department} • {emp.branch}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-[6px] text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-600/40 font-bold">
                    انضباط: {emp.attendanceRate}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-[#032516] p-2 rounded-[8px] text-center text-[11px]">
                  <div>
                    <span className="text-[#94a3b8] block text-[10px]">الأساسي</span>
                    <span className="font-bold font-mono">{emp.salary.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[#94a3b8] block text-[10px]">البدلات</span>
                    <span className="font-bold font-mono text-emerald-400">+{emp.allowance.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[#94a3b8] block text-[10px]">صافي الراتب</span>
                    <span className="font-bold font-mono text-[#f5c842]">{emp.netSalary.toLocaleString()} ر.ي</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#94a3b8] pt-1">
                  <span>الحساب المحول إليه: {emp.bankAccount}</span>
                  <span className="text-emerald-400 font-bold">نشط بالخدمة ✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. التوريدات وأجهزة نقاط البيع POS */}
      {/* ============================================================== */}
      {activeSection === 'procurement' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)]">
              <span className="text-[11px] text-[#94a3b8]">أجهزة POS الذكية الموزعة</span>
              <div className="text-[20px] font-bold text-white font-mono mt-1">1,420 جهاز</div>
              <p className="text-[10px] text-emerald-300 mt-0.5">تدعم SoftPOS والـ NFC والباركود</p>
            </div>
            <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)]">
              <span className="text-[11px] text-[#94a3b8]">مخزون الشرائح والمطبوعات</span>
              <div className="text-[20px] font-bold text-[#f5c842] font-mono mt-1">15,800 وحدة</div>
              <p className="text-[10px] text-[#94a3b8] mt-0.5">جاهزة للتوزيع لفروع المحافظات</p>
            </div>
            <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)]">
              <span className="text-[11px] text-[#94a3b8]">عقود التوريد والصيانة المعتمدة</span>
              <div className="text-[20px] font-bold text-sky-400 font-mono mt-1">12 عقداً</div>
              <p className="text-[10px] text-sky-300 mt-0.5">ضمان استبدال فوري 24 ساعة</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. المراجعة والتدقيق الإداري */}
      {/* ============================================================== */}
      {activeSection === 'audit' && (
        <div className="space-y-3 bg-[#01140a] p-4 rounded-[14px] border border-[rgba(245,200,66,0.2)]">
          <div className="flex items-center gap-3 border-b border-[rgba(245,200,66,0.2)] pb-3">
            <ShieldCheck size={20} className="text-[#f5c842]" />
            <div>
              <h4 className="text-[14px] font-bold text-white">إدارة التدقيق الداخلي والرقابة الإدارية</h4>
              <p className="text-[11px] text-[#94a3b8]">توثيق الإجراءات الإدارية، طلبات الإجازات، ومحاضر الاجتماعات الرسمية</p>
            </div>
          </div>
          <p className="text-[12px] text-[#94a3b8] leading-relaxed">
            تخضع كافة القرارات الإدارية لنظام التوقيع الثنائي (Maker-Checker). كل مستند إداري يتم تشفيره وتخزينه في الخزنة الرقمية السحابية مع تاريخ ووقت البصمة الرقمية لمنع التلاعب.
          </p>
        </div>
      )}

    </div>
  );
};

export default SovereignInstitutionalErpHub;
