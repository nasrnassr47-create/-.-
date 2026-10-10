import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  XCircle, 
  Sliders, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Smartphone, 
  CreditCard, 
  Coins, 
  Printer, 
  FileText, 
  AlertTriangle, 
  Eye, 
  X,
  Edit3,
  Save,
  Clock,
  UserCheck,
  UserPlus,
  Send,
  Building2,
  Zap,
  Droplet,
  GraduationCap,
  Bell,
  MessageSquare,
  Plus,
  PlusCircle,
  FileCheck,
  ExternalLink,
  Shield,
  Ban
} from 'lucide-react';
import { 
  Customer, 
  Transaction, 
  RegistrationRequest, 
  FinancialHold, 
  GovernmentService, 
  SmsNotification 
} from '../types';

interface CustomerManagementHubProps {
  customers: Customer[];
  onUpdateCustomer: (updated: Customer) => void;
  transactions: Transaction[];
  onAddTransaction: (txn: Transaction) => void;
  registrationRequests: RegistrationRequest[];
  onUpdateRegistrationRequest: (updated: RegistrationRequest) => void;
  onAddCustomer: (newCustomer: Customer) => void;
  financialHolds: FinancialHold[];
  onAddHold: (hold: FinancialHold) => void;
  onUpdateHold: (updated: FinancialHold) => void;
  governmentServices: GovernmentService[];
  onAddGovernmentService: (srv: GovernmentService) => void;
  notifications: SmsNotification[];
  onSendNotification: (notif: SmsNotification) => void;
}

export const CustomerManagementHub: React.FC<CustomerManagementHubProps> = ({
  customers,
  onUpdateCustomer,
  transactions,
  onAddTransaction,
  registrationRequests,
  onUpdateRegistrationRequest,
  onAddCustomer,
  financialHolds,
  onAddHold,
  onUpdateHold,
  governmentServices,
  onAddGovernmentService,
  notifications,
  onSendNotification
}) => {
  const [activeTab, setActiveTab] = useState<'directory' | 'registrations' | 'holds' | 'government' | 'sms' | 'reports'>('directory');
  
  // Search & Filters for Directory
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [editingLimits, setEditingLimits] = useState(false);
  const [newDailyLimit, setNewDailyLimit] = useState<number>(0);
  const [newMonthlyLimit, setNewMonthlyLimit] = useState<number>(0);
  const [adjustmentAmount, setAdjustmentAmount] = useState<string>('');
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // New Registration Simulation Modal
  const [showNewRegModal, setShowNewRegModal] = useState(false);
  const [newApplicantName, setNewApplicantName] = useState('');
  const [newApplicantPhone, setNewApplicantPhone] = useState('77');
  const [newApplicantId, setNewApplicantId] = useState('');
  const [newApplicantType, setNewApplicantType] = useState<'individual' | 'merchant' | 'agent'>('individual');
  const [newApplicantCity, setNewApplicantCity] = useState('صنعاء');

  // New Hold Modal
  const [showNewHoldModal, setShowNewHoldModal] = useState(false);
  const [holdTargetCustId, setHoldTargetCustId] = useState('');
  const [holdAmount, setHoldAmount] = useState('');
  const [holdReason, setHoldReason] = useState('');
  const [holdLegalRef, setHoldLegalRef] = useState('');

  // New Government Service Modal
  const [showNewGovModal, setShowNewGovModal] = useState(false);
  const [newGovName, setNewGovName] = useState('');
  const [newGovAgency, setNewGovAgency] = useState('');
  const [newGovCategory, setNewGovCategory] = useState<GovernmentService['category']>('utilities');
  const [newGovDesc, setNewGovDesc] = useState('');
  const [newGovAccountLabel, setNewGovAccountLabel] = useState('رقم المشترك / المعاملة');

  // New SMS Modal
  const [showNewSmsModal, setShowNewSmsModal] = useState(false);
  const [smsTargetPhone, setSmsTargetPhone] = useState('all');
  const [smsTitle, setSmsTitle] = useState('');
  const [smsMessage, setSmsMessage] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Filter customers based on search and category
  const filteredCustomers = customers.filter(c => {
    const matchesSearch = 
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phoneNumber.includes(searchQuery) ||
      c.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.nationalId.includes(searchQuery);

    if (!matchesSearch) return false;
    if (filterCategory === 'all') return true;
    if (filterCategory === 'frozen') return c.status === 'frozen';
    return c.category === filterCategory;
  });

  const handleOpenCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setNewDailyLimit(customer.dailyLimit);
    setNewMonthlyLimit(customer.monthlyLimit);
    setEditingLimits(false);
  };

  const handleToggleFreeze = (customer: Customer) => {
    const newStatus = customer.status === 'frozen' ? 'active' : 'frozen';
    const updated: Customer = {
      ...customer,
      status: newStatus,
      riskScore: newStatus === 'frozen' ? 90 : 5,
      notes: newStatus === 'frozen' 
        ? 'تم تجميد وتوقيف الحساب بقرار تحكمي وإيقاف كافة الخدمات المالية' 
        : 'تم رفع التجميد واستعادة الصلاحيات المالية'
    };
    onUpdateCustomer(updated);
    if (selectedCustomer?.id === customer.id) {
      setSelectedCustomer(updated);
    }

    // Send SMS alert
    onSendNotification({
      id: `SMS-${Date.now().toString().slice(-4)}`,
      recipientPhone: customer.phoneNumber,
      recipientName: customer.fullName,
      title: newStatus === 'frozen' ? 'إشعار توقيف أمني للمحفظة' : 'إشعار إعادة تفعيل المحفظة',
      message: newStatus === 'frozen' 
        ? `عزيزي المشترك، تم توقيف وتجميد حسابك مؤقتاً لمراجعة أمنية. يرجى التواصل مع الدعم السيادي.`
        : `عزيزي المشترك، تم إعادة تفعيل محفظتك بنجاح بعد اكتمال التدقيق. يمكنك استئناف عملياتك.`,
      type: 'security',
      sentAt: 'الآن',
      status: 'delivered',
      channel: 'SMS Gateway'
    });

    showToast(newStatus === 'frozen' ? `تم تجميد وتوقيف حساب (${customer.fullName}) وإرسال إشعار SMS` : `تم فك التجميد وتفعيل حساب (${customer.fullName})`);
  };

  const handleToggleService = (serviceKey: keyof Customer['services']) => {
    if (!selectedCustomer) return;
    const updated: Customer = {
      ...selectedCustomer,
      services: {
        ...selectedCustomer.services,
        [serviceKey]: !selectedCustomer.services[serviceKey]
      }
    };
    onUpdateCustomer(updated);
    setSelectedCustomer(updated);
    showToast('تم تحديث صلاحيات الخدمات للمشترك بنجاح.');
  };

  const handleSaveLimits = () => {
    if (!selectedCustomer) return;
    const updated: Customer = {
      ...selectedCustomer,
      dailyLimit: Number(newDailyLimit),
      monthlyLimit: Number(newMonthlyLimit)
    };
    onUpdateCustomer(updated);
    setSelectedCustomer(updated);
    setEditingLimits(false);
    showToast('تم تعديل السقوف المالية المعتمدة للعميل.');
  };

  const handleAdjustBalance = (type: 'deposit' | 'deduct') => {
    if (!selectedCustomer || !adjustmentAmount || Number(adjustmentAmount) <= 0) return;
    const amountNum = Number(adjustmentAmount);
    const newBal = type === 'deposit' 
      ? selectedCustomer.balance + amountNum 
      : selectedCustomer.balance - amountNum;

    if (type === 'deduct' && selectedCustomer.balance < amountNum) {
      alert('الرصيد غير كافٍ للخصم');
      return;
    }

    const updated: Customer = {
      ...selectedCustomer,
      balance: newBal
    };
    onUpdateCustomer(updated);
    setSelectedCustomer(updated);

    // Record transaction
    const newTx: Transaction = {
      id: `TXN-ADJ-${Date.now().toString().slice(-4)}`,
      type: type === 'deposit' ? 'deposit' : 'payout',
      amount: amountNum,
      currency: 'YER',
      sender: type === 'deposit' ? 'إدارة التسويات المركزية' : selectedCustomer.fullName,
      recipient: type === 'deposit' ? selectedCustomer.fullName : 'خزينة نصر والت',
      recipientName: type === 'deposit' ? `إيداع تسوية لحساب ${selectedCustomer.fullName}` : `خصم تسوية إداري`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' }),
      status: 'completed',
      referenceNo: `ADJ-${Math.floor(100000 + Math.random() * 900000)}`,
      category: 'تسوية إدارية',
      riskScore: 1
    };
    onAddTransaction(newTx);

    // Send SMS
    onSendNotification({
      id: `SMS-${Date.now().toString().slice(-4)}`,
      recipientPhone: selectedCustomer.phoneNumber,
      recipientName: selectedCustomer.fullName,
      title: type === 'deposit' ? 'إشعار إيداع تسوية' : 'إشعار خصم تسوية',
      message: `تم ${type === 'deposit' ? 'إيداع' : 'خصم'} مبلغ ${amountNum.toLocaleString()} ر.ي في محفظتك. رصيدك الحالي: ${newBal.toLocaleString()} ر.ي.`,
      type: 'transaction',
      sentAt: 'الآن',
      status: 'delivered',
      channel: 'SMS Gateway'
    });

    setShowAdjustModal(false);
    setAdjustmentAmount('');
    showToast(type === 'deposit' ? `تم إيداع ${amountNum.toLocaleString()} ر.ي وتحديث رصيد المشترك` : `تم خصم ${amountNum.toLocaleString()} ر.ي من حساب المشترك`);
  };

  // --- Registration Desk Actions ---
  const handleApproveRegistration = (req: RegistrationRequest) => {
    // Generate new unique account number
    const prefix = req.accountType === 'merchant' ? '771' : req.accountType === 'agent' ? '773' : '775';
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const generatedAccNo = `${prefix}-USR-${randomSuffix}`;

    const newCustomer: Customer = {
      id: `CUST-${Date.now().toString().slice(-4)}`,
      accountNumber: generatedAccNo,
      fullName: req.applicantName,
      phoneNumber: req.phoneNumber,
      nationalId: req.nationalId,
      category: req.accountType === 'merchant' ? 'merchant' : req.accountType === 'agent' ? 'agent' : 'individual',
      balance: 0,
      currency: 'YER',
      status: 'active',
      kycTier: req.assignedTier,
      dailyLimit: req.initialDailyLimit,
      monthlyLimit: req.initialDailyLimit * 10,
      registeredDate: new Date().toISOString().split('T')[0],
      lastActive: 'الآن (حساب جديد)',
      services: {
        canTransfer: true,
        canReceive: true,
        canRechargeTelecom: true,
        canWithdrawCash: true,
        canIssueVirtualCard: req.accountType !== 'agent'
      },
      totalTransfersIn: 0,
      totalTransfersOut: 0,
      riskScore: 3,
      notes: `تم اعتماد وقبول الحساب رسمياً بعد التحقق من الهوية (${req.idCardDoc})`
    };

    onAddCustomer(newCustomer);
    onUpdateRegistrationRequest({ ...req, status: 'approved' });

    // Send confirmation SMS to user's phone
    onSendNotification({
      id: `SMS-${Date.now().toString().slice(-4)}`,
      recipientPhone: req.phoneNumber,
      recipientName: req.applicantName,
      title: 'تهانينا! تم تفعيل حسابك في نصر والت',
      message: `عزيزي ${req.applicantName}، نبارك لك! تم اعتماد وتفعيل محفظتك بنجاح. رقم حسابك المالي هو: ${generatedAccNo}. يمكنك بدء التحويل واستلام الأموال فوراً.`,
      type: 'kyc',
      sentAt: 'الآن',
      status: 'delivered',
      channel: 'SMS Gateway'
    });

    showToast(`تم قبول واعتماد المشترك (${req.applicantName}) وتوليد رقم الحساب (${generatedAccNo}) وإرسال رسالة SMS ترحيبية.`);
  };

  const handleRejectRegistration = (req: RegistrationRequest) => {
    const reason = prompt('أدخل سبب الرفض أو النقص في وثائق الهوية:', 'عدم وضوح صورة الهوية الوطنية أو انتهاء سريانها');
    if (!reason) return;

    onUpdateRegistrationRequest({ ...req, status: 'rejected', rejectionReason: reason });
    onSendNotification({
      id: `SMS-${Date.now().toString().slice(-4)}`,
      recipientPhone: req.phoneNumber,
      recipientName: req.applicantName,
      title: 'إشعار بخصوص طلب فتح الحساب',
      message: `عزيزي ${req.applicantName}، تم مراجعة طلبك ونعتذر لتعذر القبول بسبب: (${reason}). يرجى إعادة رفع الوثائق المطلوبة.`,
      type: 'kyc',
      sentAt: 'الآن',
      status: 'delivered',
      channel: 'SMS Gateway'
    });
    showToast(`تم رفض الطلب وإرسال إشعار SMS للمتقدم.`);
  };

  const handleCreateSimulatedRegistration = () => {
    if (!newApplicantName || !newApplicantPhone || !newApplicantId) {
      alert('يرجى تعبئة كافة الحقول المطلوبة');
      return;
    }

    const newReq: RegistrationRequest = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      applicantName: newApplicantName,
      phoneNumber: newApplicantPhone,
      nationalId: newApplicantId,
      accountType: newApplicantType,
      city: newApplicantCity,
      idCardDoc: `بطاقة شخصية ذكية رقم ${newApplicantId}`,
      submittedAt: 'الآن',
      status: 'pending',
      assignedTier: newApplicantType === 'merchant' ? 'Tier 3 (تاجر معتمد)' : 'Tier 2 (موثق بالهوية)',
      initialDailyLimit: newApplicantType === 'merchant' ? 20000000 : 2000000
    };

    onUpdateRegistrationRequest(newReq);
    setShowNewRegModal(false);
    setNewApplicantName('');
    setNewApplicantPhone('77');
    setNewApplicantId('');
    showToast('تمت محاكاة تقديم طلب تسجيل جديد من تطبيق الموبايل بنجاح ويظهر الآن في قائمة القبول والموافقة.');
  };

  // --- Financial Hold Actions ---
  const handleCreateHold = () => {
    if (!holdTargetCustId || !holdAmount || !holdReason) {
      alert('يرجى اختيار المشترك وتحديد مبلغ الحجز والسبب');
      return;
    }
    const targetCust = customers.find(c => c.id === holdTargetCustId);
    if (!targetCust) return;

    const amountNum = Number(holdAmount);
    if (targetCust.balance < amountNum) {
      alert('رصيد المشترك أقل من مبلغ الحجز المطلوب');
      return;
    }

    // Place hold
    const newHold: FinancialHold = {
      id: `HLD-${Math.floor(100 + Math.random() * 900)}`,
      customerId: targetCust.id,
      customerName: targetCust.fullName,
      accountNumber: targetCust.accountNumber,
      amount: amountNum,
      currency: targetCust.currency,
      reason: holdReason,
      legalReference: holdLegalRef || `ORDER-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toLocaleString('ar-YE'),
      expiresAt: 'حتى إشعار قضائي / سيادي',
      status: 'active',
      authorizedBy: 'المالك نصر - الإدارة المركزية'
    };

    onAddHold(newHold);

    // Update customer held amount & available balance
    onUpdateCustomer({
      ...targetCust,
      balance: targetCust.balance - amountNum,
      heldAmount: (targetCust.heldAmount || 0) + amountNum,
      notes: `تم حجز مبلغ ${amountNum.toLocaleString()} ر.ي بموجب أمر (${holdLegalRef || 'سيادي'})`
    });

    // Send SMS alert
    onSendNotification({
      id: `SMS-${Date.now().toString().slice(-4)}`,
      recipientPhone: targetCust.phoneNumber,
      recipientName: targetCust.fullName,
      title: 'إشعار حجز وتجميد مالي',
      message: `عزيزي المشترك، تم وضع حجز مالي على مبلغ ${amountNum.toLocaleString()} ر.ي من رصيدك لسبب: (${holdReason}). المرجع: ${newHold.legalReference}.`,
      type: 'hold',
      sentAt: 'الآن',
      status: 'delivered',
      channel: 'SMS Gateway'
    });

    setShowNewHoldModal(false);
    setHoldTargetCustId('');
    setHoldAmount('');
    setHoldReason('');
    setHoldLegalRef('');
    showToast(`تم تنفيذ الحجز المالي بمبلغ ${amountNum.toLocaleString()} ر.ي وتجميده في حساب الضمان.`);
  };

  const handleReleaseHold = (hold: FinancialHold) => {
    const targetCust = customers.find(c => c.id === hold.customerId);
    if (targetCust) {
      onUpdateCustomer({
        ...targetCust,
        balance: targetCust.balance + hold.amount,
        heldAmount: Math.max(0, (targetCust.heldAmount || 0) - hold.amount),
        notes: `تم فك الحجز المالي بمبلغ ${hold.amount.toLocaleString()} ر.ي وإعادته للرصيد المتاح`
      });

      onSendNotification({
        id: `SMS-${Date.now().toString().slice(-4)}`,
        recipientPhone: targetCust.phoneNumber,
        recipientName: targetCust.fullName,
        title: 'إشعار فك الحجز المالي',
        message: `عزيزي المشترك، تم رفع الحجز المالي وإعادة مبلغ ${hold.amount.toLocaleString()} ر.ي بالكامل إلى رصيدك المتاح.`,
        type: 'hold',
        sentAt: 'الآن',
        status: 'delivered',
        channel: 'SMS Gateway'
      });
    }

    onUpdateHold({ ...hold, status: 'released' });
    showToast(`تم فك الحجز المالي وإعادة ${hold.amount.toLocaleString()} ر.ي لرصيد المشترك.`);
  };

  // --- Add Government Service Action ---
  const handleCreateGovService = () => {
    if (!newGovName || !newGovAgency) {
      alert('يرجى كتابة اسم الخدمة والجهة الحكومية');
      return;
    }

    const newSrv: GovernmentService = {
      id: `gov-${Date.now().toString().slice(-4)}`,
      name: newGovName,
      agencyName: newGovAgency,
      category: newGovCategory,
      description: newGovDesc || 'خدمة سداد حكومية معتمدة عبر نصر والت',
      accountLabel: newGovAccountLabel,
      accountPlaceholder: 'أدخل رقم الاشتراك أو المعاملة',
      status: 'active',
      apiConnected: true,
      totalPaidCount: 0,
      totalAmountCollected: 0,
      iconType: 'Building2'
    };

    onAddGovernmentService(newSrv);
    setShowNewGovModal(false);
    setNewGovName('');
    setNewGovAgency('');
    setNewGovDesc('');
    showToast(`تم ربط وإضافة (${newGovName}) كجهة وخدمة جديدة في التطبيق بنجاح!`);
  };

  // --- Send SMS Action ---
  const handleSendCustomSms = () => {
    if (!smsTitle || !smsMessage) {
      alert('يرجى كتابة عنوان ونص الرسالة');
      return;
    }

    if (smsTargetPhone === 'all') {
      customers.forEach(c => {
        onSendNotification({
          id: `SMS-${Math.floor(1000 + Math.random() * 9000)}`,
          recipientPhone: c.phoneNumber,
          recipientName: c.fullName,
          title: smsTitle,
          message: smsMessage,
          type: 'broadcast',
          sentAt: 'الآن',
          status: 'delivered',
          channel: 'SMS Gateway'
        });
      });
      showToast(`تم إرسال رسالة البث الجماعي (Broadcast SMS) إلى جميع المشتركين (${customers.length}) بنجاح!`);
    } else {
      const cust = customers.find(c => c.phoneNumber === smsTargetPhone);
      onSendNotification({
        id: `SMS-${Math.floor(1000 + Math.random() * 9000)}`,
        recipientPhone: smsTargetPhone,
        recipientName: cust?.fullName || 'مشترك',
        title: smsTitle,
        message: smsMessage,
        type: 'broadcast',
        sentAt: 'الآن',
        status: 'delivered',
        channel: 'SMS Gateway'
      });
      showToast(`تم إرسال رسالة SMS إلى المشترك (${cust?.fullName || smsTargetPhone}) بنجاح.`);
    }

    setShowNewSmsModal(false);
    setSmsTitle('');
    setSmsMessage('');
  };

  // Customer transactions filter
  const customerTransactions = transactions.filter(t => 
    t.recipient.includes(selectedCustomer?.phoneNumber || '___') || 
    t.sender.includes(selectedCustomer?.fullName || '___') ||
    t.recipientName?.includes(selectedCustomer?.fullName || '___')
  );

  const pendingRegCount = registrationRequests.filter(r => r.status === 'pending').length;
  const activeHoldsCount = financialHolds.filter(h => h.status === 'active').length;

  return (
    <div className="space-y-4" dir="rtl">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#032516] border border-[#f5c842] text-white px-4 py-2.5 rounded-[12px] shadow-2xl flex items-center gap-2 text-[13px] animate-in fade-in">
          <CheckCircle2 size={18} className="text-[#f5c842]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Sovereign Header Banner */}
      <div className="bg-gradient-to-l from-[#032516] to-[#0a4f31] border border-[rgba(245,200,66,0.3)] rounded-[16px] p-4 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[12px] bg-[#01140a] border border-[#f5c842] flex items-center justify-center shrink-0 shadow-md">
            <Users className="text-[#f5c842]" size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[17px] font-bold text-white">المنظومة السيادية للمشتركين والخدمات الحكومية (KYC & Hub)</h2>
              <span className="bg-[#f5c842]/20 text-[#f5c842] border border-[#f5c842]/40 text-[11px] font-bold px-2.5 py-0.5 rounded-[10px]">
                الرقابة والربط الشامل
              </span>
            </div>
            <p className="text-[13px] text-[#94a3b8] mt-0.5">
              قبول المشتركين الجدد، الحجز والتوقيف المالي، ربط الخدمات الحكومية، وإرسال تنبيهات SMS
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <button
            onClick={() => setShowNewRegModal(true)}
            className="px-3 py-1.5 bg-[#14532d] hover:bg-[#16a34a] text-white font-bold rounded-[8px] border border-[#16a34a]/40 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <UserPlus size={14} />
            <span>+ تجربة تسجيل مشترك جديد</span>
          </button>

          <button
            onClick={() => setShowNewHoldModal(true)}
            className="px-3 py-1.5 bg-[#7f1d1d] hover:bg-red-800 text-white font-bold rounded-[8px] border border-[#dc2626]/40 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <Ban size={14} />
            <span>+ حجز مالي سيادي</span>
          </button>

          <button
            onClick={() => setShowNewSmsModal(true)}
            className="px-3 py-1.5 bg-[#f5c842] hover:bg-[#f5c842]/90 text-black font-bold rounded-[8px] flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
          >
            <Send size={14} />
            <span>إرسال تنبيه SMS 📲</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-[#032516] p-1.5 rounded-[14px] border border-[rgba(245,200,66,0.3)]">
        <button
          onClick={() => setActiveTab('directory')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-[10px] text-[12px] font-bold transition-all cursor-pointer ${
            activeTab === 'directory'
              ? 'bg-[#14532d] text-white border border-[#16a34a]'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          <Users size={16} />
          <span>سجل المشتركين والتحكم المالي ({customers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('registrations')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-[10px] text-[12px] font-bold transition-all cursor-pointer ${
            activeTab === 'registrations'
              ? 'bg-[#78350f] text-[#f5c842] border border-[#f5c842]'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          <UserCheck size={16} />
          <span>طلبات التسجيل الجديدة والقبول</span>
          {pendingRegCount > 0 && (
            <span className="bg-[#dc2626] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
              {pendingRegCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('holds')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-[10px] text-[12px] font-bold transition-all cursor-pointer ${
            activeTab === 'holds'
              ? 'bg-[#7f1d1d] text-red-200 border border-[#dc2626]'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          <Lock size={16} />
          <span>الحجز والتوقيف المالي</span>
          {activeHoldsCount > 0 && (
            <span className="bg-[#dc2626] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {activeHoldsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('government')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-[10px] text-[12px] font-bold transition-all cursor-pointer ${
            activeTab === 'government'
              ? 'bg-[#0c4a6e] text-sky-200 border border-[#0ea5e9]'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          <Building2 size={16} />
          <span>الربط الحكومي والجهات ({governmentServices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sms')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-[10px] text-[12px] font-bold transition-all cursor-pointer ${
            activeTab === 'sms'
              ? 'bg-purple-950 text-purple-200 border border-purple-500'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          <Bell size={16} />
          <span>تنبيهات ورسائل SMS ({notifications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-[10px] text-[12px] font-bold transition-all cursor-pointer ${
            activeTab === 'reports'
              ? 'bg-[#01140a] text-[#f5c842] border border-[rgba(245,200,66,0.5)]'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          <FileCheck size={16} />
          <span>التقارير الشاملة والتدقيق</span>
        </button>
      </div>

      {/* --- TAB 1: سجل المشتركين والتحكم المالي --- */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="bg-[#032516] border border-[rgba(245,200,66,0.3)] rounded-[14px] p-3 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالاسم، رقم الهاتف (مثال: 777)، الحساب، أو الهوية..."
                className="w-full bg-[#01140a] text-white text-[13px] px-3.5 py-2 pr-10 rounded-[10px] border border-[rgba(245,200,66,0.3)] focus:border-[#f5c842] focus:outline-none"
              />
              <Search size={16} className="absolute right-3 top-3 text-[#f5c842]" />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {[
                { id: 'all', label: 'كافة المشتركين' },
                { id: 'individual', label: 'الأفراد' },
                { id: 'merchant', label: 'التجار المعتمدين' },
                { id: 'agent', label: 'وكلاء البريد' },
                { id: 'frozen', label: 'المجمدين والمحظورين' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterCategory(f.id)}
                  className={`px-3 py-1.5 rounded-[10px] text-[12px] font-semibold transition-all cursor-pointer ${
                    filterCategory === f.id
                      ? 'bg-[#f5c842] text-black font-bold'
                      : 'bg-[#01140a] text-[#94a3b8] hover:text-white border border-[rgba(245,200,66,0.2)]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-[#032516] border border-[rgba(245,200,66,0.3)] rounded-[16px] p-4 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-white flex items-center gap-2">
                <UserCheck size={18} className="text-[#16a34a]" />
                <span>سجل المشتركين وقاعدة بيانات العملاء ({filteredCustomers.length})</span>
              </h3>
              <span className="text-[11px] text-[#94a3b8]">اضغط على أي مشترك لعرض ملفه المالي والتحكم بخدماته</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-[12px]">
                <thead>
                  <tr className="border-b border-[rgba(245,200,66,0.2)] text-[#94a3b8]">
                    <th className="py-2.5 px-3">رقم الحساب</th>
                    <th className="py-2.5 px-3">اسم المشترك / الهاتف</th>
                    <th className="py-2.5 px-3">الفئة وتوثيق KYC</th>
                    <th className="py-2.5 px-3">الرصيد المتاح</th>
                    <th className="py-2.5 px-3">المحجوز</th>
                    <th className="py-2.5 px-3">الحالة والرقابة</th>
                    <th className="py-2.5 px-3">إجراءات التحكم</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(245,200,66,0.1)]">
                  {filteredCustomers.map(cust => (
                    <tr 
                      key={cust.id} 
                      className={`hover:bg-[#01140a]/60 transition-colors ${
                        selectedCustomer?.id === cust.id ? 'bg-[#01140a]/80 border-r-4 border-r-[#f5c842]' : ''
                      }`}
                    >
                      <td className="py-3 px-3 font-mono font-bold text-[#f5c842]">{cust.accountNumber}</td>
                      
                      <td className="py-3 px-3">
                        <div className="font-bold text-white text-[13px]">{cust.fullName}</div>
                        <div className="text-[11px] text-[#94a3b8] font-mono mt-0.5">📞 {cust.phoneNumber} | هوية: {cust.nationalId}</div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[8px] ${
                            cust.category === 'merchant' ? 'bg-[#78350f] text-[#f5c842]' :
                            cust.category === 'agent' ? 'bg-[#0c4a6e] text-sky-200' :
                            cust.category === 'enterprise' ? 'bg-purple-950 text-purple-200' :
                            'bg-[#14532d] text-emerald-200'
                          }`}>
                            {cust.category === 'merchant' ? 'تاجر جملة' :
                             cust.category === 'agent' ? 'وكيل بريدي' :
                             cust.category === 'enterprise' ? 'مؤسسة حكومية' : 'فرد'}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#94a3b8] block mt-0.5">{cust.kycTier}</span>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-mono font-bold text-[14px] text-white">
                          {cust.balance.toLocaleString()} <span className="text-[11px] text-[#94a3b8]">ر.ي</span>
                        </div>
                        <div className="text-[10px] text-[#94a3b8] mt-0.5">سقف: {cust.dailyLimit.toLocaleString()}</div>
                      </td>

                      <td className="py-3 px-3">
                        {cust.heldAmount && cust.heldAmount > 0 ? (
                          <span className="text-[#dc2626] font-mono font-bold text-[13px] bg-[#7f1d1d]/30 px-2 py-0.5 rounded border border-[#dc2626]/40">
                            {cust.heldAmount.toLocaleString()} ر.ي
                          </span>
                        ) : (
                          <span className="text-[#94a3b8] text-[11px]">0 ر.ي</span>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-[8px] text-[11px] font-bold inline-flex items-center gap-1 ${
                          cust.status === 'active' 
                            ? 'bg-[#14532d] text-emerald-200 border border-[#16a34a]/40' 
                            : 'bg-[#7f1d1d] text-red-200 border border-[#dc2626]/40'
                        }`}>
                          {cust.status === 'active' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                          <span>{cust.status === 'active' ? 'نشط ومصرح' : 'مجمّد وموقوف'}</span>
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenCustomer(cust)}
                            className="px-2.5 py-1.5 bg-[#032516] hover:bg-[#063d25] border border-[#f5c842]/40 text-[#f5c842] rounded-[8px] text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                          >
                            <Eye size={13} />
                            <span>الملف المالي</span>
                          </button>

                          <button
                            onClick={() => handleToggleFreeze(cust)}
                            className={`p-1.5 rounded-[8px] text-[11px] font-bold border cursor-pointer transition-all active:scale-95 ${
                              cust.status === 'active'
                                ? 'bg-[#7f1d1d]/30 hover:bg-[#7f1d1d] border-[#dc2626]/40 text-red-300'
                                : 'bg-[#14532d]/30 hover:bg-[#14532d] border-[#16a34a]/40 text-emerald-300'
                            }`}
                            title={cust.status === 'active' ? 'توقيف وتجميد الحساب' : 'إلغاء التوقيف'}
                          >
                            {cust.status === 'active' ? <Lock size={14} /> : <Unlock size={14} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: طلبات التسجيل الجديدة والقبول والموافقة --- */}
      {activeTab === 'registrations' && (
        <div className="space-y-4">
          <div className="bg-[#032516] border border-[#f5c842]/40 rounded-[14px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-bold text-white flex items-center gap-2">
                <UserCheck size={18} className="text-[#f5c842]" />
                <span>مكتب مراجعة وقبول طلبات التسجيل الجديدة (KYC Onboarding Desk)</span>
              </h3>
              <p className="text-[12px] text-[#94a3b8] mt-0.5">
                فحص الوثائق الشخصية والتجارية، تعيين السقف المالي، وتوليد رقم الحساب الآلي مع إشعار SMS للمشترك
              </p>
            </div>
            <button
              onClick={() => setShowNewRegModal(true)}
              className="px-3.5 py-2 bg-[#f5c842] text-black font-bold text-[12px] rounded-[10px] flex items-center gap-1.5 cursor-pointer hover:bg-[#f5c842]/90 shadow-md"
            >
              <UserPlus size={16} />
              <span>+ تجربة تسجيل مشترك جديد</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {registrationRequests.map((req) => (
              <div 
                key={req.id}
                className="bg-[#01140a] border border-[rgba(245,200,66,0.3)] rounded-[14px] p-4 space-y-3 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] text-[#f5c842] font-mono">{req.id}</span>
                      <h4 className="text-[14px] font-bold text-white mt-0.5">{req.applicantName}</h4>
                      <p className="text-[11px] text-[#94a3b8] mt-0.5">📞 {req.phoneNumber} | 📍 {req.city}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[8px] ${
                      req.status === 'pending' ? 'bg-[#78350f] text-[#f5c842]' :
                      req.status === 'approved' ? 'bg-[#14532d] text-emerald-200' : 'bg-[#7f1d1d] text-red-200'
                    }`}>
                      {req.status === 'pending' ? 'بانتظار المراجعة' :
                       req.status === 'approved' ? 'تم القبول' : 'مرفوض'}
                    </span>
                  </div>

                  <div className="bg-[#032516] p-2.5 rounded-[10px] border border-[rgba(245,200,66,0.15)] mt-3 space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#94a3b8]">نوع الحساب المطلوب:</span>
                      <span className="font-bold text-white">
                        {req.accountType === 'merchant' ? 'تاجر جملة' : req.accountType === 'agent' ? 'وكيل بريد' : 'فرد'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94a3b8]">الهوية الوطنية:</span>
                      <span className="font-mono text-white">{req.nationalId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94a3b8]">الوثائق المرفقة:</span>
                      <span className="text-[#f5c842] truncate max-w-[150px]">{req.idCardDoc}</span>
                    </div>
                    {req.commercialRecord && (
                      <div className="flex justify-between">
                        <span className="text-[#94a3b8]">الاسم التجاري:</span>
                        <span className="text-emerald-300">{req.commercialRecord}</span>
                      </div>
                    )}
                  </div>
                </div>

                {req.status === 'pending' ? (
                  <div className="flex items-center gap-2 pt-3 border-t border-[rgba(245,200,66,0.15)]">
                    <button
                      onClick={() => handleApproveRegistration(req)}
                      className="flex-1 py-2 bg-[#16a34a] hover:bg-emerald-600 text-white rounded-[10px] text-[12px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                    >
                      <CheckCircle2 size={15} />
                      <span>قبول وتوليد الحساب</span>
                    </button>
                    <button
                      onClick={() => handleRejectRegistration(req)}
                      className="py-2 px-3 bg-[#7f1d1d] hover:bg-red-800 text-white rounded-[10px] text-[12px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
                    >
                      <XCircle size={15} />
                      <span>رفض</span>
                    </button>
                  </div>
                ) : (
                  <div className={`p-2 rounded-[8px] text-center text-[11px] font-bold ${
                    req.status === 'approved' ? 'bg-[#14532d] text-emerald-200' : 'bg-[#7f1d1d] text-red-200'
                  }`}>
                    {req.status === 'approved' ? 'تم القبول وتوليد الحساب وإرسال إشعار SMS' : `مرفوض: ${req.rejectionReason || 'وثائق غير مكتملة'}`}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 3: الحجز والتوقيف المالي وتجميد الأرصدة --- */}
      {activeTab === 'holds' && (
        <div className="space-y-4">
          <div className="bg-[#032516] border border-[#dc2626]/40 rounded-[14px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-bold text-white flex items-center gap-2">
                <Lock size={18} className="text-red-400" />
                <span>إدارة الحجوزات المالية والتوقيف السيادي (Financial Escrow & Seizures)</span>
              </h3>
              <p className="text-[12px] text-[#94a3b8] mt-0.5">
                حجز مبالغ على ذمة قضايا، نزاعات تجارية، أو أوامر البنك المركزي، مع إشعار العميل وحفظ المبالغ في حساب الحجز
              </p>
            </div>
            <button
              onClick={() => setShowNewHoldModal(true)}
              className="px-3.5 py-2 bg-[#7f1d1d] hover:bg-red-800 text-white font-bold text-[12px] rounded-[10px] flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Ban size={15} />
              <span>+ حجز مالي سيادي جديد</span>
            </button>
          </div>

          <div className="bg-[#032516] border border-[rgba(245,200,66,0.3)] rounded-[16px] p-4 shadow-md">
            <h4 className="text-[14px] font-bold text-white mb-3">سجل المبالغ المحجوزة رسمياً ({financialHolds.length})</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-[12px]">
                <thead>
                  <tr className="border-b border-[rgba(245,200,66,0.2)] text-[#94a3b8]">
                    <th className="py-2.5 px-3">رقم الحجز</th>
                    <th className="py-2.5 px-3">المشترك المعني</th>
                    <th className="py-2.5 px-3">المبلغ المحجوز</th>
                    <th className="py-2.5 px-3">السبب والمرجع القانوني</th>
                    <th className="py-2.5 px-3">تاريخ الحجز</th>
                    <th className="py-2.5 px-3">الحالة</th>
                    <th className="py-2.5 px-3">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(245,200,66,0.1)]">
                  {financialHolds.map((h) => (
                    <tr key={h.id} className="hover:bg-[#01140a]/40">
                      <td className="py-3 px-3 font-mono text-[#f5c842]">{h.id}</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-white">{h.customerName}</div>
                        <div className="text-[11px] text-[#94a3b8] font-mono">{h.accountNumber}</div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-red-400 text-[14px]">
                        {h.amount.toLocaleString()} {h.currency}
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-white text-[12px]">{h.reason}</div>
                        <div className="text-[10px] text-[#f5c842] font-mono mt-0.5">مرجع: {h.legalReference}</div>
                      </td>
                      <td className="py-3 px-3 text-[#94a3b8]">{h.createdAt}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-[8px] text-[11px] font-bold ${
                          h.status === 'active' ? 'bg-[#7f1d1d] text-red-200 border border-[#dc2626]' :
                          h.status === 'released' ? 'bg-[#14532d] text-emerald-200' : 'bg-purple-950 text-purple-200'
                        }`}>
                          {h.status === 'active' ? 'حجز نشط' : h.status === 'released' ? 'تم فك الحجز' : 'تمت المصادرة'}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {h.status === 'active' ? (
                          <button
                            onClick={() => handleReleaseHold(h)}
                            className="px-3 py-1.5 bg-[#14532d] hover:bg-emerald-600 text-white rounded-[8px] text-[11px] font-bold cursor-pointer transition-all active:scale-95"
                          >
                            فك الحجز وإعادة المبلغ
                          </button>
                        ) : (
                          <span className="text-[#94a3b8] text-[11px]">مكتمل</span>
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

      {/* --- TAB 4: الربط بالخدمات الحكومية والجهات --- */}
      {activeTab === 'government' && (
        <div className="space-y-4">
          <div className="bg-[#032516] border border-[#0ea5e9]/40 rounded-[14px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-bold text-white flex items-center gap-2">
                <Building2 size={18} className="text-[#0ea5e9]" />
                <span>بوابة الربط بالخدمات الحكومية والمؤسسية وإضافة جهات جديدة</span>
              </h3>
              <p className="text-[12px] text-[#94a3b8] mt-0.5">
                الكهرباء، المياه، المرور، الجمارك، الجامعات، وإمكانية إضافة أي وزارة أو صندوق أو جهة خاصة فوراً
              </p>
            </div>
            <button
              onClick={() => setShowNewGovModal(true)}
              className="px-3.5 py-2 bg-[#0ea5e9] hover:bg-sky-600 text-black font-bold text-[12px] rounded-[10px] flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <PlusCircle size={15} />
              <span>+ إضافة جهة أو خدمة جديدة للتطبيق</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {governmentServices.map((srv) => (
              <div 
                key={srv.id}
                className="bg-[#01140a] border border-[rgba(245,200,66,0.2)] hover:border-[#0ea5e9] rounded-[14px] p-4 space-y-3 transition-colors shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-[10px] bg-[#0c4a6e] border border-[#0ea5e9]/40 flex items-center justify-center text-[#0ea5e9]">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-white">{srv.name}</h4>
                        <span className="text-[11px] text-[#94a3b8] block">{srv.agencyName}</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-[#14532d] text-emerald-200 border border-[#16a34a]/40 px-2 py-0.5 rounded font-mono">
                      API LIVE
                    </span>
                  </div>

                  <p className="text-[11px] text-[#94a3b8] mt-2.5 leading-snug">{srv.description}</p>

                  <div className="bg-[#032516] p-2.5 rounded-[10px] border border-[rgba(245,200,66,0.1)] mt-3 space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#94a3b8]">خانة الإدخال:</span>
                      <span className="font-bold text-[#f5c842]">{srv.accountLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94a3b8]">إجمالي المسدد:</span>
                      <span className="font-mono text-emerald-400 font-bold">{srv.totalPaidCount} معاملة</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#94a3b8]">المتحصلات:</span>
                      <span className="font-mono text-white font-bold">{srv.totalAmountCollected.toLocaleString()} ر.ي</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[rgba(245,200,66,0.15)] flex items-center justify-between">
                  <span className="text-[11px] text-emerald-300 font-semibold">بوابة دفع معتمدة</span>
                  <button
                    onClick={() => {
                      const num = prompt(`سداد تجريبي لـ (${srv.name}) - أدخل ${srv.accountLabel}:`, '1029485');
                      if (num) {
                        showToast(`تم التحقق من ربط API مع (${srv.name}) للحساب [${num}]. الخدمة تعمل بنجاح 100%.`);
                      }
                    }}
                    className="px-3 py-1 bg-[#032516] hover:bg-[#0c4a6e] text-[#0ea5e9] border border-[#0ea5e9]/40 rounded-[8px] text-[11px] font-bold cursor-pointer"
                  >
                    فحص الربط والسداد
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 5: مركز الرسائل والتنبيهات SMS --- */}
      {activeTab === 'sms' && (
        <div className="space-y-4">
          <div className="bg-[#032516] border border-purple-500/40 rounded-[14px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-bold text-white flex items-center gap-2">
                <Bell size={18} className="text-purple-300" />
                <span>مركز الإشعارات والتنبيهات الموجهة وبوابة SMS (SMS Gateway Simulator)</span>
              </h3>
              <p className="text-[12px] text-[#94a3b8] mt-0.5">
                إرسال رسائل توثيق الحساب، تنبيهات الإيداع، إشعارات الحجز المالي، وبث الرسائل الجماعية لكافة المشتركين
              </p>
            </div>
            <button
              onClick={() => setShowNewSmsModal(true)}
              className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[12px] rounded-[10px] flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Send size={15} />
              <span>+ إرسال رسالة SMS جديدة</span>
            </button>
          </div>

          <div className="bg-[#032516] border border-[rgba(245,200,66,0.3)] rounded-[16px] p-4 space-y-3">
            <h4 className="text-[14px] font-bold text-white">سجل الرسائل والتنبيهات المرسلة ({notifications.length})</h4>
            <div className="space-y-2.5">
              {notifications.map((n) => (
                <div 
                  key={n.id} 
                  className="bg-[#01140a] border border-[rgba(245,200,66,0.2)] rounded-[12px] p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-purple-950 border border-purple-500/40 flex items-center justify-center shrink-0 text-purple-300">
                      <MessageSquare size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-[13px] font-bold text-white">{n.title}</h5>
                        <span className="text-[10px] font-mono bg-[#032516] text-[#f5c842] px-2 py-0.2 rounded">
                          إلى: {n.recipientName} ({n.recipientPhone})
                        </span>
                      </div>
                      <p className="text-[11px] text-[#94a3b8] mt-1">{n.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <span className="text-[10px] text-[#94a3b8]">{n.sentAt}</span>
                    <span className="text-[10px] bg-[#14532d] text-emerald-200 border border-[#16a34a]/40 px-2 py-0.5 rounded font-mono">
                      {n.channel} • تم التسليم ✓
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 6: التقارير الشاملة والتدقيق المالي --- */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="bg-[#032516] border border-[rgba(245,200,66,0.3)] rounded-[16px] p-4 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-[rgba(245,200,66,0.2)] pb-3">
              <div>
                <h3 className="text-[16px] font-bold text-white">التقرير المالي السيادي الشامل للمشتركين والخدمات</h3>
                <p className="text-[12px] text-[#94a3b8]">موقف الودائع، الحجوزات القانونية، متحصلات الجهات الحكومية، وإجمالي السيولة</p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-[#f5c842] text-black font-bold text-[12px] rounded-[10px] flex items-center gap-1.5 cursor-pointer hover:bg-[#f5c842]/90"
              >
                <Printer size={15} />
                <span>طباعة التقرير الشامل PDF</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)]">
                <span className="text-[11px] text-[#94a3b8]">إجمالي المشتركين المسجلين:</span>
                <div className="text-[20px] font-bold text-white font-mono mt-1">{customers.length} مشترك</div>
                <span className="text-[10px] text-emerald-400">100% موثقين برقم وطني</span>
              </div>

              <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)]">
                <span className="text-[11px] text-[#94a3b8]">إجمالي أرصدة المشتركين المتاحة:</span>
                <div className="text-[20px] font-bold text-[#f5c842] font-mono mt-1">
                  {customers.reduce((acc, c) => acc + c.balance, 0).toLocaleString()} ر.ي
                </div>
                <span className="text-[10px] text-[#94a3b8]">ودائع نقدية مؤمنة</span>
              </div>

              <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[#dc2626]/40">
                <span className="text-[11px] text-[#94a3b8]">إجمالي المبالغ المحجوزة قانونياً:</span>
                <div className="text-[20px] font-bold text-red-400 font-mono mt-1">
                  {financialHolds.filter(h => h.status === 'active').reduce((acc, h) => acc + h.amount, 0).toLocaleString()} ر.ي
                </div>
                <span className="text-[10px] text-red-300">متحفظ عليها في حساب الضمان</span>
              </div>

              <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[#0ea5e9]/40">
                <span className="text-[11px] text-[#94a3b8]">متحصلات الخدمات الحكومية:</span>
                <div className="text-[20px] font-bold text-[#0ea5e9] font-mono mt-1">
                  {governmentServices.reduce((acc, s) => acc + s.totalAmountCollected, 0).toLocaleString()} ر.ي
                </div>
                <span className="text-[10px] text-sky-300">كهرباء، مياه، جمارك، مرور</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 1: محاكاة تقديم طلب تسجيل جديد --- */}
      {showNewRegModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#032516] border border-[#f5c842] rounded-[16px] w-full max-w-md p-5 space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-[rgba(245,200,66,0.2)] pb-2">
              <h3 className="text-[14px] font-bold text-white flex items-center gap-1.5">
                <UserPlus size={16} className="text-[#f5c842]" />
                <span>محاكاة تقديم طلب اشتراك جديد من الموبايل</span>
              </h3>
              <button onClick={() => setShowNewRegModal(false)} className="text-[#94a3b8] hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              <div>
                <label className="text-[#94a3b8] block mb-1">الاسم الرباعي للمتقدم:</label>
                <input
                  type="text"
                  placeholder="مثال: عبد الله أحمد الريمي"
                  value={newApplicantName}
                  onChange={(e) => setNewApplicantName(e.target.value)}
                  className="w-full bg-[#01140a] text-white px-3 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)] focus:border-[#f5c842] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#94a3b8] block mb-1">رقم الهاتف (يمن موبايل / يو / سبأفون):</label>
                <input
                  type="text"
                  placeholder="مثلاً: 771234567"
                  value={newApplicantPhone}
                  onChange={(e) => setNewApplicantPhone(e.target.value)}
                  className="w-full bg-[#01140a] text-white font-mono px-3 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)] focus:border-[#f5c842] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#94a3b8] block mb-1">الرقم الوطني للهوية الشخصية:</label>
                <input
                  type="text"
                  placeholder="11 رقم وطني"
                  value={newApplicantId}
                  onChange={(e) => setNewApplicantId(e.target.value)}
                  className="w-full bg-[#01140a] text-white font-mono px-3 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)] focus:border-[#f5c842] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[#94a3b8] block mb-1">فئة الحساب:</label>
                  <select
                    value={newApplicantType}
                    onChange={(e) => setNewApplicantType(e.target.value as any)}
                    className="w-full bg-[#01140a] text-[#f5c842] px-2 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)]"
                  >
                    <option value="individual">فردي عادي</option>
                    <option value="merchant">تاجر معتمد</option>
                    <option value="agent">وكيل بريدي</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#94a3b8] block mb-1">المحافظة / المدينة:</label>
                  <input
                    type="text"
                    value={newApplicantCity}
                    onChange={(e) => setNewApplicantCity(e.target.value)}
                    className="w-full bg-[#01140a] text-white px-2 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)]"
                  />
                </div>
              </div>

              <button
                onClick={handleCreateSimulatedRegistration}
                className="w-full py-2.5 bg-[#f5c842] text-black font-bold rounded-[8px] cursor-pointer hover:bg-[#f5c842]/90 mt-2"
              >
                إرسال طلب التسجيل إلى مكتب القبول
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: حجز مالي سيادي جديد --- */}
      {showNewHoldModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#032516] border border-[#dc2626] rounded-[16px] w-full max-w-md p-5 space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-[#dc2626]/30 pb-2">
              <h3 className="text-[14px] font-bold text-white flex items-center gap-1.5">
                <Ban size={16} className="text-red-400" />
                <span>إصدار أمر حجز مالي سيادي على مشترك</span>
              </h3>
              <button onClick={() => setShowNewHoldModal(false)} className="text-[#94a3b8] hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              <div>
                <label className="text-[#94a3b8] block mb-1">اختر المشترك المعني بالحجز:</label>
                <select
                  value={holdTargetCustId}
                  onChange={(e) => setHoldTargetCustId(e.target.value)}
                  className="w-full bg-[#01140a] text-[#f5c842] px-3 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)]"
                >
                  <option value="">-- حدد المشترك من القائمة --</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} ({c.accountNumber}) - رصيد: {c.balance.toLocaleString()} ر.ي
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[#94a3b8] block mb-1">المبلغ المراد حجزه (ريال يمني):</label>
                <input
                  type="number"
                  placeholder="مثال: 500000"
                  value={holdAmount}
                  onChange={(e) => setHoldAmount(e.target.value)}
                  className="w-full bg-[#01140a] text-white font-mono px-3 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)] focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-[#94a3b8] block mb-1">السبب أو نوع المخالفة:</label>
                <input
                  type="text"
                  placeholder="مثلاً: أمر حجز تحفظي على ذمة مطابقة حساب"
                  value={holdReason}
                  onChange={(e) => setHoldReason(e.target.value)}
                  className="w-full bg-[#01140a] text-white px-3 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)]"
                />
              </div>

              <div>
                <label className="text-[#94a3b8] block mb-1">رقم المرجع القانوني أو الأمر الإداري:</label>
                <input
                  type="text"
                  placeholder="مثلاً: CBY-ORDER-2026/104"
                  value={holdLegalRef}
                  onChange={(e) => setHoldLegalRef(e.target.value)}
                  className="w-full bg-[#01140a] text-white font-mono px-3 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)]"
                />
              </div>

              <button
                onClick={handleCreateHold}
                className="w-full py-2.5 bg-[#7f1d1d] hover:bg-red-800 text-white font-bold rounded-[8px] cursor-pointer transition-all mt-2"
              >
                تطبيق الحجز الفوري وإشعار المشترك
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: إضافة جهة أو خدمة حكومية جديدة للتطبيق --- */}
      {showNewGovModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#032516] border border-[#0ea5e9] rounded-[16px] w-full max-w-md p-5 space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-[#0ea5e9]/30 pb-2">
              <h3 className="text-[14px] font-bold text-white flex items-center gap-1.5">
                <Building2 size={16} className="text-[#0ea5e9]" />
                <span>إضافة جهة أو خدمة حكومية/مؤسسية جديدة</span>
              </h3>
              <button onClick={() => setShowNewGovModal(false)} className="text-[#94a3b8] hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              <div>
                <label className="text-[#94a3b8] block mb-1">اسم الخدمة أو المؤسسة:</label>
                <input
                  type="text"
                  placeholder="مثال: جامعة صنعاء - التعليم الإلكتروني"
                  value={newGovName}
                  onChange={(e) => setNewGovName(e.target.value)}
                  className="w-full bg-[#01140a] text-white px-3 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)] focus:border-[#0ea5e9]"
                />
              </div>

              <div>
                <label className="text-[#94a3b8] block mb-1">الجهة التابعة لها (الوزارة أو الهيئة):</label>
                <input
                  type="text"
                  placeholder="مثال: وزارة التعليم العالي والبحث العلمي"
                  value={newGovAgency}
                  onChange={(e) => setNewGovAgency(e.target.value)}
                  className="w-full bg-[#01140a] text-white px-3 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)]"
                />
              </div>

              <div>
                <label className="text-[#94a3b8] block mb-1">مسمى حقل الإدخال المطلوب من المشترك:</label>
                <input
                  type="text"
                  placeholder="مثلاً: رقم القيد الجامعي / رقم الاشتراك"
                  value={newGovAccountLabel}
                  onChange={(e) => setNewGovAccountLabel(e.target.value)}
                  className="w-full bg-[#01140a] text-white px-3 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)]"
                />
              </div>

              <div>
                <label className="text-[#94a3b8] block mb-1">وصف مختصر للخدمة:</label>
                <textarea
                  placeholder="شرح عن آلية السداد والرسوم المقررة"
                  value={newGovDesc}
                  onChange={(e) => setNewGovDesc(e.target.value)}
                  rows={2}
                  className="w-full bg-[#01140a] text-white px-3 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)]"
                />
              </div>

              <button
                onClick={handleCreateGovService}
                className="w-full py-2.5 bg-[#0ea5e9] hover:bg-sky-600 text-black font-bold rounded-[8px] cursor-pointer transition-all mt-2"
              >
                تفعيل الخدمة وإضافتها للتطبيق فوراً
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 4: إرسال تنبيه SMS جديد --- */}
      {showNewSmsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#032516] border border-purple-500 rounded-[16px] w-full max-w-md p-5 space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
              <h3 className="text-[14px] font-bold text-white flex items-center gap-1.5">
                <Bell size={16} className="text-purple-300" />
                <span>إرسال تنبيه أو رسالة SMS للمشتركين</span>
              </h3>
              <button onClick={() => setShowNewSmsModal(false)} className="text-[#94a3b8] hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              <div>
                <label className="text-[#94a3b8] block mb-1">المستلم:</label>
                <select
                  value={smsTargetPhone}
                  onChange={(e) => setSmsTargetPhone(e.target.value)}
                  className="w-full bg-[#01140a] text-[#f5c842] px-3 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)]"
                >
                  <option value="all">📢 بث جماعي لكافة المشتركين ({customers.length} مشترك)</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.phoneNumber}>
                      {c.fullName} ({c.phoneNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[#94a3b8] block mb-1">عنوان التنبيه:</label>
                <input
                  type="text"
                  placeholder="مثال: تنبيه أمني / تحديث بيانات / عرض خاص"
                  value={smsTitle}
                  onChange={(e) => setSmsTitle(e.target.value)}
                  className="w-full bg-[#01140a] text-white px-3 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)]"
                />
              </div>

              <div>
                <label className="text-[#94a3b8] block mb-1">نص الرسالة القصيرة (SMS):</label>
                <textarea
                  placeholder="اكتب نص الرسالة التي ستصل لهاتف المشترك عبر بوابة SMS..."
                  value={smsMessage}
                  onChange={(e) => setSmsMessage(e.target.value)}
                  rows={3}
                  className="w-full bg-[#01140a] text-white px-3 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)]"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSmsTitle('تحديث السقف المالي');
                    setSmsMessage('عزيزي المشترك، نود إعلامك بأنه تم ترقية سقفك المالي اليومي ليصبح 50,000,000 ريال يمني مع كامل الصلاحيات.');
                  }}
                  className="text-[10px] bg-[#01140a] text-[#f5c842] px-2 py-1 rounded border border-[rgba(245,200,66,0.2)] hover:border-[#f5c842]"
                >
                  قالب ترقية السقف
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSmsTitle('تنبيه أمني دوري');
                    setSmsMessage('نصر والت تنبهك: لا تشارك رمز التحقق OTP أو كلمة المرور مع أي شخص حفاظاً على أموالك.');
                  }}
                  className="text-[10px] bg-[#01140a] text-[#0ea5e9] px-2 py-1 rounded border border-[#0ea5e9]/30 hover:border-[#0ea5e9]"
                >
                  قالب أمني
                </button>
              </div>

              <button
                onClick={handleSendCustomSms}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-[8px] cursor-pointer transition-all mt-2"
              >
                إرسال الرسالة عبر بوابة SMS Gateway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 5: الملف المالي والتحكمي السيادي للمشترك المحدد --- */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="bg-[#032516] border border-[#f5c842] rounded-[18px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col text-white">
            
            {/* Modal Header */}
            <div className="bg-[#01140a] p-4 border-b border-[rgba(245,200,66,0.3)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-[#032516] border border-[#f5c842] flex items-center justify-center font-bold text-[#f5c842] text-[16px]">
                  {selectedCustomer.fullName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[16px] font-bold text-white">{selectedCustomer.fullName}</h3>
                    <span className="font-mono text-[12px] bg-[#f5c842]/20 text-[#f5c842] px-2 py-0.5 rounded-[8px]">
                      {selectedCustomer.accountNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[8px] ${
                      selectedCustomer.status === 'active' ? 'bg-[#14532d] text-emerald-200' : 'bg-[#7f1d1d] text-red-200'
                    }`}>
                      {selectedCustomer.status === 'active' ? 'حساب نشط' : 'حساب مجمّد'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#94a3b8] mt-0.5">
                    هاتف: {selectedCustomer.phoneNumber} | هوية: {selectedCustomer.nationalId} | انضم في: {selectedCustomer.registeredDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-[#01140a] border border-[rgba(245,200,66,0.3)] text-[#f5c842] rounded-[8px] text-[11px] font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#032516]"
                >
                  <Printer size={14} />
                  <span>طباعة كشف الحساب</span>
                </button>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-[#94a3b8] hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Financial Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#01140a] border border-[rgba(245,200,66,0.3)] p-3.5 rounded-[12px]">
                  <span className="text-[11px] text-[#94a3b8] block">الرصيد المالي المتاح:</span>
                  <div className="text-[22px] font-bold text-[#f5c842] font-mono mt-1">
                    {selectedCustomer.balance.toLocaleString()} <span className="text-[13px] font-sans text-white/80">ر.ي</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => setShowAdjustModal(true)}
                      className="text-[11px] bg-[#14532d] hover:bg-[#16a34a] text-emerald-200 px-2 py-1 rounded-[6px] font-bold cursor-pointer"
                    >
                      + تعديل / إيداع رصيد
                    </button>
                  </div>
                </div>

                <div className="bg-[#01140a] border border-[#16a34a]/30 p-3.5 rounded-[12px]">
                  <span className="text-[11px] text-[#94a3b8] block">إجمالي المقبوضات والتغذية (+):</span>
                  <div className="text-[18px] font-bold text-[#16a34a] font-mono mt-1 flex items-center gap-1">
                    <ArrowDownLeft size={16} />
                    <span>+{selectedCustomer.totalTransfersIn.toLocaleString()} ر.ي</span>
                  </div>
                  <span className="text-[10px] text-[#94a3b8] block mt-1">حوالات واردة وإيداعات بنكية</span>
                </div>

                <div className="bg-[#01140a] border border-[#dc2626]/30 p-3.5 rounded-[12px]">
                  <span className="text-[11px] text-[#94a3b8] block">إجمالي التحويل والمدفوعات (-):</span>
                  <div className="text-[18px] font-bold text-red-300 font-mono mt-1 flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    <span>-{selectedCustomer.totalTransfersOut.toLocaleString()} ر.ي</span>
                  </div>
                  <span className="text-[10px] text-[#94a3b8] block mt-1">حوالات وسداد فواتير</span>
                </div>
              </div>

              {/* Service Switches & Limits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Services Switches */}
                <div className="bg-[#01140a] border border-[rgba(245,200,66,0.2)] p-4 rounded-[14px] space-y-3">
                  <div className="flex items-center justify-between border-b border-[rgba(245,200,66,0.15)] pb-2">
                    <h4 className="text-[13px] font-bold text-[#f5c842] flex items-center gap-1.5">
                      <Sliders size={16} />
                      <span>التحكم في الخدمات المتاحة للمشترك</span>
                    </h4>
                    <span className="text-[10px] text-[#94a3b8]">تأثير فوري</span>
                  </div>

                  <div className="space-y-2 text-[12px]">
                    <div className="flex items-center justify-between p-2 rounded-[8px] bg-[#032516]">
                      <div className="flex items-center gap-2">
                        <ArrowUpRight size={15} className="text-[#f5c842]" />
                        <span>إرسال الحوالات المالية</span>
                      </div>
                      <button
                        onClick={() => handleToggleService('canTransfer')}
                        className={`px-2.5 py-1 rounded-[6px] text-[11px] font-bold cursor-pointer transition-all ${
                          selectedCustomer.services.canTransfer ? 'bg-[#16a34a] text-white' : 'bg-[#7f1d1d] text-red-200'
                        }`}
                      >
                        {selectedCustomer.services.canTransfer ? 'مفعّل' : 'معطل'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-[8px] bg-[#032516]">
                      <div className="flex items-center gap-2">
                        <ArrowDownLeft size={15} className="text-[#16a34a]" />
                        <span>استقبال الحوالات والإيداع</span>
                      </div>
                      <button
                        onClick={() => handleToggleService('canReceive')}
                        className={`px-2.5 py-1 rounded-[6px] text-[11px] font-bold cursor-pointer transition-all ${
                          selectedCustomer.services.canReceive ? 'bg-[#16a34a] text-white' : 'bg-[#7f1d1d] text-red-200'
                        }`}
                      >
                        {selectedCustomer.services.canReceive ? 'مفعّل' : 'معطل'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-[8px] bg-[#032516]">
                      <div className="flex items-center gap-2">
                        <Smartphone size={15} className="text-[#0ea5e9]" />
                        <span>سداد باقات الاتصالات والنت</span>
                      </div>
                      <button
                        onClick={() => handleToggleService('canRechargeTelecom')}
                        className={`px-2.5 py-1 rounded-[6px] text-[11px] font-bold cursor-pointer transition-all ${
                          selectedCustomer.services.canRechargeTelecom ? 'bg-[#16a34a] text-white' : 'bg-[#7f1d1d] text-red-200'
                        }`}
                      >
                        {selectedCustomer.services.canRechargeTelecom ? 'مفعّل' : 'معطل'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-[8px] bg-[#032516]">
                      <div className="flex items-center gap-2">
                        <Coins size={15} className="text-teal-300" />
                        <span>صرف وسحب نقدي OTP</span>
                      </div>
                      <button
                        onClick={() => handleToggleService('canWithdrawCash')}
                        className={`px-2.5 py-1 rounded-[6px] text-[11px] font-bold cursor-pointer transition-all ${
                          selectedCustomer.services.canWithdrawCash ? 'bg-[#16a34a] text-white' : 'bg-[#7f1d1d] text-red-200'
                        }`}
                      >
                        {selectedCustomer.services.canWithdrawCash ? 'مفعّل' : 'معطل'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Limits & Immediate Freeze */}
                <div className="bg-[#01140a] border border-[rgba(245,200,66,0.2)] p-4 rounded-[14px] space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-[rgba(245,200,66,0.15)] pb-2 mb-3">
                      <h4 className="text-[13px] font-bold text-[#f5c842] flex items-center gap-1.5">
                        <ShieldCheck size={16} />
                        <span>السقوف المالية والتحكم السيادي</span>
                      </h4>
                      <button
                        onClick={() => setEditingLimits(!editingLimits)}
                        className="text-[11px] text-[#f5c842] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 size={12} />
                        <span>{editingLimits ? 'إلغاء' : 'تعديل السقوف'}</span>
                      </button>
                    </div>

                    <div className="space-y-3 text-[12px]">
                      <div>
                        <span className="text-[#94a3b8] block mb-1">سقف التحويل اليومي المسموح:</span>
                        {editingLimits ? (
                          <input
                            type="number"
                            value={newDailyLimit}
                            onChange={(e) => setNewDailyLimit(Number(e.target.value))}
                            className="w-full bg-[#032516] text-white font-mono px-3 py-1.5 rounded-[8px] border border-[#f5c842]"
                          />
                        ) : (
                          <div className="font-mono font-bold text-[14px] text-white bg-[#032516] p-2 rounded-[8px]">
                            {selectedCustomer.dailyLimit.toLocaleString()} ر.ي
                          </div>
                        )}
                      </div>

                      <div>
                        <span className="text-[#94a3b8] block mb-1">سقف التحويل الشهري:</span>
                        {editingLimits ? (
                          <input
                            type="number"
                            value={newMonthlyLimit}
                            onChange={(e) => setNewMonthlyLimit(Number(e.target.value))}
                            className="w-full bg-[#032516] text-white font-mono px-3 py-1.5 rounded-[8px] border border-[#f5c842]"
                          />
                        ) : (
                          <div className="font-mono font-bold text-[14px] text-white bg-[#032516] p-2 rounded-[8px]">
                            {selectedCustomer.monthlyLimit.toLocaleString()} ر.ي
                          </div>
                        )}
                      </div>

                      {editingLimits && (
                        <button
                          onClick={handleSaveLimits}
                          className="w-full py-2 bg-[#f5c842] text-black font-bold rounded-[8px] text-[12px] flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Save size={14} />
                          <span>حفظ السقوف الجديدة</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[rgba(245,200,66,0.15)]">
                    <button
                      onClick={() => handleToggleFreeze(selectedCustomer)}
                      className={`w-full py-2.5 rounded-[10px] text-[12px] font-bold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
                        selectedCustomer.status === 'active'
                          ? 'bg-[#7f1d1d] hover:bg-red-800 text-white'
                          : 'bg-[#14532d] hover:bg-emerald-700 text-white'
                      }`}
                    >
                      {selectedCustomer.status === 'active' ? (
                        <>
                          <Lock size={16} />
                          <span>تجميد وتوقيف حساب المشترك فوراً</span>
                        </>
                      ) : (
                        <>
                          <Unlock size={16} />
                          <span>إلغاء التوقيف واستعادة الحساب</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>

              {/* Transactions History */}
              <div className="bg-[#01140a] border border-[rgba(245,200,66,0.2)] p-4 rounded-[14px] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-[13px] font-bold text-white flex items-center gap-2">
                    <FileText size={16} className="text-[#f5c842]" />
                    <span>سجل الحركات المالية المباشرة للمشترك ({customerTransactions.length} حركة)</span>
                  </h4>
                  <span className="text-[10px] text-[#94a3b8]">مطابق لدفتر اليومية العامة</span>
                </div>

                {customerTransactions.length === 0 ? (
                  <div className="text-center py-6 text-[#94a3b8] text-[12px]">
                    لا توجد حركات تحويل مسجلة لهذا المشترك حتى اللحظة.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-[11px]">
                      <thead>
                        <tr className="border-b border-[rgba(245,200,66,0.2)] text-[#94a3b8]">
                          <th className="py-2 px-2.5">رقم المرجع</th>
                          <th className="py-2 px-2.5">التاريخ والوقت</th>
                          <th className="py-2 px-2.5">البيان</th>
                          <th className="py-2 px-2.5">المبلغ</th>
                          <th className="py-2 px-2.5">الحالة</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[rgba(245,200,66,0.1)]">
                        {customerTransactions.map(tx => (
                          <tr key={tx.id} className="hover:bg-[#032516]/60">
                            <td className="py-2 px-2.5 font-mono text-[#f5c842]">{tx.referenceNo}</td>
                            <td className="py-2 px-2.5 text-[#94a3b8]">{tx.date} {tx.time}</td>
                            <td className="py-2 px-2.5 text-white">{tx.recipientName || tx.recipient}</td>
                            <td className="py-2 px-2.5 font-mono font-bold">
                              {tx.amount.toLocaleString()} {tx.currency}
                            </td>
                            <td className="py-2 px-2.5">
                              <span className="text-emerald-400 font-semibold">{tx.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Adjust Balance Modal */}
      {showAdjustModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#032516] border border-[#f5c842] rounded-[16px] w-full max-w-md p-5 space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-[rgba(245,200,66,0.2)] pb-2">
              <h3 className="text-[14px] font-bold text-white">تسوية / تغذية رصيد المشترك</h3>
              <button onClick={() => setShowAdjustModal(false)} className="text-[#94a3b8] hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div>
              <span className="text-[11px] text-[#94a3b8] block">المشترك:</span>
              <div className="font-bold text-[13px] text-white">{selectedCustomer.fullName} ({selectedCustomer.accountNumber})</div>
              <div className="text-[11px] text-[#f5c842] font-mono mt-0.5">الرصيد الحالي: {selectedCustomer.balance.toLocaleString()} ر.ي</div>
            </div>

            <div>
              <label className="text-[11px] text-[#94a3b8] block mb-1">المبلغ المطلوب (ريال يمني):</label>
              <input
                type="number"
                placeholder="أدخل المبلغ مثلاً: 50000"
                value={adjustmentAmount}
                onChange={(e) => setAdjustmentAmount(e.target.value)}
                className="w-full bg-[#01140a] text-white font-mono px-3 py-2 rounded-[8px] border border-[rgba(245,200,66,0.3)] focus:border-[#f5c842] text-[13px]"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => handleAdjustBalance('deposit')}
                className="flex-1 py-2 bg-[#16a34a] hover:bg-emerald-600 text-white rounded-[8px] text-[12px] font-bold cursor-pointer"
              >
                + إيداع وتغذية
              </button>
              <button
                onClick={() => handleAdjustBalance('deduct')}
                className="flex-1 py-2 bg-[#7f1d1d] hover:bg-red-800 text-white rounded-[8px] text-[12px] font-bold cursor-pointer"
              >
                - خصم إداري
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagementHub;
