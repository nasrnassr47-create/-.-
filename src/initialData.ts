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

export const INITIAL_WALLET_BALANCE = 128450600; // YER
export const INITIAL_RESERVES_USD = 480900; // USD
export const INITIAL_RESERVES_SAR = 1750200; // SAR

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-9021',
    type: 'telecom',
    amount: 3500,
    currency: 'YER',
    sender: 'خزينة نصر والت المركزية',
    recipient: '777890123',
    recipientName: 'باقة مزايا نت 15GB - يمن موبايل',
    date: '2026-09-27',
    time: '11:42',
    status: 'completed',
    referenceNo: 'YM-99812450',
    category: 'اتصالات وانترنت',
    riskScore: 2
  },
  {
    id: 'TXN-9020',
    type: 'transfer',
    amount: 150000,
    currency: 'YER',
    sender: 'مؤسسة النصر للتجارة العامة',
    recipient: 'مجموعة هائل سعيد التجارية',
    recipientName: 'سداد دفعة توريد مستلزمات',
    date: '2026-09-27',
    time: '11:15',
    status: 'completed',
    referenceNo: 'TR-102948',
    category: 'حوالات تجارية',
    riskScore: 5
  },
  {
    id: 'TXN-9019',
    type: 'deposit',
    amount: 5000000,
    currency: 'YER',
    sender: 'بنك التضامن الإسلامي - صنعاء',
    recipient: 'حساب التسوية المركزي - نصر والت',
    recipientName: 'تغذية مقاصة مصرفية فورية',
    date: '2026-09-27',
    time: '10:30',
    status: 'completed',
    referenceNo: 'TADB-771890',
    category: 'مقاصة بنكية',
    riskScore: 1
  },
  {
    id: 'TXN-9018',
    type: 'bill',
    amount: 18400,
    currency: 'YER',
    sender: 'حساب نصر الشخصي',
    recipient: 'المؤسسة العامة للكهرباء - أمانة العاصمة',
    recipientName: 'فاتورة كهرباء شهر سبتمبر',
    date: '2026-09-26',
    time: '18:20',
    status: 'completed',
    referenceNo: 'ELEC-60192',
    category: 'فواتير خدمية',
    riskScore: 1
  },
  {
    id: 'TXN-9017',
    type: 'transfer',
    amount: 45000000,
    currency: 'YER',
    sender: 'شركة الصرافة الدولية',
    recipient: 'حساب مجهول الهوية - صعدة',
    recipientName: 'حوالة ضخمة معلقة للفحص',
    date: '2026-09-26',
    time: '14:05',
    status: 'flagged',
    referenceNo: 'AML-WARN-402',
    category: 'رقابة وغسل أموال',
    riskScore: 89,
    notes: 'اشتباه نمط تحويل غير اعتيادي يتجاوز السقف اليومي'
  }
];

export const INITIAL_APPROVALS: ApprovalRequest[] = [
  {
    id: 'APP-101',
    title: 'طلب صرف مقاصة بنكية كبرى',
    type: 'payout',
    amount: 25000000,
    currency: 'YER',
    initiator: 'صرافة الكريمي - فرع التحرير',
    timestamp: 'منذ 18 دقيقة',
    status: 'pending',
    urgency: 'critical',
    details: 'مطابقة تسوية نقدية يومية وسند صرف بريدي موثق'
  },
  {
    id: 'APP-102',
    title: 'تغذية محفظة فرع عدن الكبرى',
    type: 'transfer',
    amount: 10000000,
    currency: 'YER',
    initiator: 'مدير العمليات المالية - نصر والت',
    timestamp: 'منذ 45 دقيقة',
    status: 'pending',
    urgency: 'high',
    details: 'تغذية نقدية عاجلة لتغطية طلبات الرواتب'
  },
  {
    id: 'APP-103',
    title: 'رفع سقف التحويل اليومي للتاجر',
    type: 'limit_increase',
    amount: 50000000,
    currency: 'YER',
    initiator: 'شركة سبأ فارما للمستلزمات الطبية',
    timestamp: 'منذ ساعتين',
    status: 'pending',
    urgency: 'normal',
    details: 'طلب اعتماد سقف استثنائي لاستيراد شحنة دوائية'
  }
];

export const INITIAL_TELECOM_PACKAGES: TelecomPackage[] = [
  {
    id: 'ym-1',
    provider: 'yemen_mobile',
    name: 'باقة مزايا نت الشهرية 25GB',
    price: 4500,
    validity: '30 يوم',
    data: '25 GB + 400 دقيقة',
    category: 'combo'
  },
  {
    id: 'ym-2',
    provider: 'yemen_mobile',
    name: 'سوبر نت فورجي 4G - 60GB',
    price: 9000,
    validity: '30 يوم',
    data: '60 GB سرعة عالية',
    category: 'internet'
  },
  {
    id: 'you-1',
    provider: 'you',
    name: 'سمارت فورجي YOU الشهرية 30GB',
    price: 5200,
    validity: '30 يوم',
    data: '30 GB + 500 دقيقة',
    category: 'combo'
  },
  {
    id: 'saba-1',
    provider: 'sabafon',
    name: 'سوبر باقة سبأفون 4G - 20GB',
    price: 3800,
    validity: '30 يوم',
    data: '20 GB نت فائق السرعة',
    category: 'internet'
  },
  {
    id: 'ynet-1',
    provider: 'yemen_net',
    name: 'تجديد سوبر يمن نت ADSL منزلي',
    price: 6500,
    validity: '30 يوم',
    data: 'باقة 80 GB غير محدودة',
    category: 'fiber'
  }
];

export const INITIAL_BANKS: BankAccount[] = [
  {
    id: 'b-1',
    bankName: 'البنك المركزي اليمني',
    accountNumber: 'CBY-990-2026-YER',
    holderName: 'حساب المقاصة والتسوية السيادية',
    balance: 850000000,
    currency: 'YER',
    status: 'connected',
    lastSync: 'قبل 2 دقيقة'
  },
  {
    id: 'b-2',
    bankName: 'بنك التضامن الإسلامي',
    accountNumber: 'TAD-441-002-USD',
    holderName: 'محفظة نصر والت للعملات الصعبة',
    balance: 480900,
    currency: 'USD',
    status: 'connected',
    lastSync: 'قبل 5 دقائق'
  },
  {
    id: 'b-3',
    bankName: 'مصرف الكريمي للتمويل الأصغر',
    accountNumber: 'KUR-119-983-YER',
    holderName: 'حساب السيولة النقدية والصرف السريع',
    balance: 145000000,
    currency: 'YER',
    status: 'connected',
    lastSync: 'قبل 1 دقيقة'
  }
];

export const INITIAL_CARDS: VirtualCard[] = [
  {
    id: 'card-1',
    cardNumber: '5399 •••• •••• 8812',
    cardHolder: 'NASR AL-MASNAAI',
    expiry: '09/29',
    cvv: '912',
    balance: 1540,
    currency: 'USD',
    status: 'active',
    spendingLimit: 5000
  },
  {
    id: 'card-2',
    cardNumber: '5420 •••• •••• 4409',
    cardHolder: 'NASR ENTERPRISE VIP',
    expiry: '12/30',
    cvv: '304',
    balance: 3850,
    currency: 'USD',
    status: 'active',
    spendingLimit: 10000
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-001',
    accountNumber: '777-NASR-001',
    fullName: 'نصر محمد المصنعي',
    phoneNumber: '777890123',
    nationalId: '01010049281',
    category: 'enterprise',
    balance: 128450600,
    currency: 'YER',
    status: 'active',
    kycTier: 'Tier 3 (تاجر معتمد)',
    dailyLimit: 50000000,
    monthlyLimit: 500000000,
    registeredDate: '2024-01-15',
    lastActive: 'الآن (متصل)',
    services: {
      canTransfer: true,
      canReceive: true,
      canRechargeTelecom: true,
      canWithdrawCash: true,
      canIssueVirtualCard: true
    },
    totalTransfersIn: 850000000,
    totalTransfersOut: 721549400,
    riskScore: 2,
    notes: 'حساب الخزينة والإدارة السيادية العامة'
  },
  {
    id: 'CUST-002',
    accountNumber: '771-HSA-882',
    fullName: 'مجموعة هائل سعيد التجارية - فرع صنعاء',
    phoneNumber: '771234567',
    nationalId: '10928374650',
    category: 'merchant',
    balance: 42300000,
    currency: 'YER',
    status: 'active',
    kycTier: 'Tier 3 (تاجر معتمد)',
    dailyLimit: 30000000,
    monthlyLimit: 300000000,
    registeredDate: '2024-03-10',
    lastActive: 'منذ 10 دقائق',
    services: {
      canTransfer: true,
      canReceive: true,
      canRechargeTelecom: true,
      canWithdrawCash: true,
      canIssueVirtualCard: true
    },
    totalTransfersIn: 210000000,
    totalTransfersOut: 167700000,
    riskScore: 5,
    notes: 'تاجر جملة معتمد بسقف استثنائي'
  },
  {
    id: 'CUST-003',
    accountNumber: '773-KUR-409',
    fullName: 'صرافة وموزع البريد المعتمد - التحرير',
    phoneNumber: '773998811',
    nationalId: '02049182736',
    category: 'agent',
    balance: 14500000,
    currency: 'YER',
    status: 'active',
    kycTier: 'Tier 3 (تاجر معتمد)',
    dailyLimit: 20000000,
    monthlyLimit: 200000000,
    registeredDate: '2024-05-20',
    lastActive: 'منذ 3 دقائق',
    services: {
      canTransfer: true,
      canReceive: true,
      canRechargeTelecom: true,
      canWithdrawCash: true,
      canIssueVirtualCard: false
    },
    totalTransfersIn: 89000000,
    totalTransfersOut: 74500000,
    riskScore: 4,
    notes: 'وكيل سداد معتمد وشحن فوري'
  },
  {
    id: 'CUST-004',
    accountNumber: '775-IND-902',
    fullName: 'أحمد علي السعدي',
    phoneNumber: '775112233',
    nationalId: '01039485712',
    category: 'individual',
    balance: 345000,
    currency: 'YER',
    status: 'active',
    kycTier: 'Tier 2 (موثق بالهوية)',
    dailyLimit: 1000000,
    monthlyLimit: 10000000,
    registeredDate: '2025-02-14',
    lastActive: 'اليوم 09:30',
    services: {
      canTransfer: true,
      canReceive: true,
      canRechargeTelecom: true,
      canWithdrawCash: true,
      canIssueVirtualCard: true
    },
    totalTransfersIn: 1200000,
    totalTransfersOut: 855000,
    riskScore: 8,
    notes: 'مستخدم محفظة نشط موثق بالبطاقة الشخصية'
  },
  {
    id: 'CUST-005',
    accountNumber: '770-AML-105',
    fullName: 'سعيد عبد الله المجهول (حساب تحت الفحص)',
    phoneNumber: '770001199',
    nationalId: '00000000000',
    category: 'individual',
    balance: 45000000,
    currency: 'YER',
    status: 'frozen',
    kycTier: 'Tier 1 (مبدئي)',
    dailyLimit: 500000,
    monthlyLimit: 2000000,
    registeredDate: '2026-09-20',
    lastActive: 'أمس 14:05',
    services: {
      canTransfer: false,
      canReceive: false,
      canRechargeTelecom: false,
      canWithdrawCash: false,
      canIssueVirtualCard: false
    },
    totalTransfersIn: 45000000,
    totalTransfersOut: 0,
    riskScore: 92,
    notes: 'مجمّد وموقوف بأمر الرقابة السيادية لاشتباه غسل أموال ومصدر مجهول',
    heldAmount: 45000000
  }
];

export const INITIAL_REGISTRATION_REQUESTS: RegistrationRequest[] = [
  {
    id: 'REQ-101',
    applicantName: 'محمد عبد الرحمن باعباد',
    phoneNumber: '774567890',
    nationalId: '01049281735',
    accountType: 'merchant',
    city: 'المكلا - حضرموت',
    idCardDoc: 'بطاقة شخصية ذكية سارية + سجل تجاري رقم 8892',
    commercialRecord: 'مؤسسة باعباد للتجارة والاستيراد',
    submittedAt: 'منذ 15 دقيقة',
    status: 'pending',
    assignedTier: 'Tier 3 (تاجر معتمد)',
    initialDailyLimit: 25000000
  },
  {
    id: 'REQ-102',
    applicantName: 'فاطمة ناصر الحميري',
    phoneNumber: '772334455',
    nationalId: '02058371920',
    accountType: 'individual',
    city: 'صنعاء - حدة',
    idCardDoc: 'بطاقة شخصية إلكترونية رقم 02058371920',
    submittedAt: 'منذ 35 دقيقة',
    status: 'pending',
    assignedTier: 'Tier 2 (موثق بالهوية)',
    initialDailyLimit: 2000000
  },
  {
    id: 'REQ-103',
    applicantName: 'سالم مبخوت العولقي',
    phoneNumber: '778901234',
    nationalId: '03091827465',
    accountType: 'agent',
    city: 'عتق - شبوة',
    idCardDoc: 'ترخيص صرافة بريدي + عقد إيجار المحل',
    commercialRecord: 'نقطة صرافة العولقي البريدية المعتمدة',
    submittedAt: 'منذ ساعتين',
    status: 'pending',
    assignedTier: 'Tier 3 (تاجر معتمد)',
    initialDailyLimit: 15000000
  }
];

export const INITIAL_FINANCIAL_HOLDS: FinancialHold[] = [
  {
    id: 'HLD-901',
    customerId: 'CUST-005',
    customerName: 'سعيد عبد الله المجهول (حساب تحت الفحص)',
    accountNumber: '770-AML-105',
    amount: 45000000,
    currency: 'YER',
    reason: 'أمر حجز سيادي من وحدة الرقابة المالية لمصدر أموال غير مبرر',
    legalReference: 'AML-ORDER-2026/892',
    createdAt: '2026-09-26 14:10',
    expiresAt: '2026-10-26 (قابل للتجديد)',
    status: 'active',
    authorizedBy: 'المالك نصر - الإدارة المركزية'
  }
];

export const INITIAL_GOVERNMENT_SERVICES: GovernmentService[] = [
  {
    id: 'gov-elec',
    name: 'المؤسسة العامة للكهرباء',
    agencyName: 'وزارة الكهرباء والطاقة',
    category: 'utilities',
    description: 'سداد فواتير الكهرباء الحكومية، العدادات الذكية، ورسوم الإدخال',
    accountLabel: 'رقم المشترك / العداد',
    accountPlaceholder: 'مثلاً: 1049281',
    status: 'active',
    apiConnected: true,
    totalPaidCount: 1420,
    totalAmountCollected: 38400000,
    iconType: 'Zap'
  },
  {
    id: 'gov-water',
    name: 'المؤسسة المحلية للمياه والصرف الصحي',
    agencyName: 'وزارة المياه والبيئة',
    category: 'utilities',
    description: 'تسديد فواتير استهلاك المياه الشهرية لجميع المحافظات',
    accountLabel: 'رقم اشتراك المياه',
    accountPlaceholder: 'مثلاً: 882019',
    status: 'active',
    apiConnected: true,
    totalPaidCount: 890,
    totalAmountCollected: 14200000,
    iconType: 'Droplet'
  },
  {
    id: 'gov-traffic',
    name: 'الإدارة العامة للمرور',
    agencyName: 'وزارة الداخلية',
    category: 'traffic',
    description: 'سداد المخالفات المرورية، تجديد رخص القيادة وملكيات المركبات',
    accountLabel: 'رقم لوحة المركبة أو المخالفة',
    accountPlaceholder: 'مثلاً: 4-12903 أو رقم المخالفة',
    status: 'active',
    apiConnected: true,
    totalPaidCount: 650,
    totalAmountCollected: 8950000,
    iconType: 'Shield'
  },
  {
    id: 'gov-customs',
    name: 'مصلحة الجمارك والضرائب',
    agencyName: 'وزارة المالية',
    category: 'customs',
    description: 'سداد الرسوم الجمركية للبيانات الجمركية والإقرارات الضريبية',
    accountLabel: 'رقم البيان الجمركي / الرقم الضريبي',
    accountPlaceholder: 'مثلاً: CUS-991204',
    status: 'active',
    apiConnected: true,
    totalPaidCount: 310,
    totalAmountCollected: 125000000,
    iconType: 'Building2'
  },
  {
    id: 'gov-uni',
    name: 'بوابة التنسيق والرسوم الجامعية (صنعاء، عدن، إب)',
    agencyName: 'وزارة التعليم العالي',
    category: 'education',
    description: 'سداد رسوم التنسيق الموحد، الرسوم السنوية، والشهادات التخرج',
    accountLabel: 'رقم القيد الجامعي / حافظة التنسيق',
    accountPlaceholder: 'مثلاً: UNI-2026-4401',
    status: 'active',
    apiConnected: true,
    totalPaidCount: 1940,
    totalAmountCollected: 45600000,
    iconType: 'GraduationCap'
  }
];

export const INITIAL_SMS_NOTIFICATIONS: SmsNotification[] = [
  {
    id: 'SMS-101',
    recipientPhone: '774567890',
    recipientName: 'محمد عبد الرحمن باعباد',
    title: 'طلب فتح حساب تاجر قيد المراجعة',
    message: 'عزيزي المشترك، تم استلام وثائق فتح حساب التاجر الخاص بك في نصر والت وسيتم الرد خلال 30 دقيقة.',
    type: 'kyc',
    sentAt: 'منذ 10 دقائق',
    status: 'delivered',
    channel: 'SMS Gateway'
  },
  {
    id: 'SMS-102',
    recipientPhone: '777890123',
    recipientName: 'نصر محمد المصنعي',
    title: 'إشعار تسجيل دخول أمني',
    message: 'تم تسجيل الدخول إلى لوحة القيادة السيادية بنجاح من جهاز مصرح (IP: 185.22.x.x).',
    type: 'security',
    sentAt: 'اليوم 11:00',
    status: 'delivered',
    channel: 'SMS Gateway'
  },
  {
    id: 'SMS-103',
    recipientPhone: '775112233',
    recipientName: 'أحمد علي السعدي',
    title: 'إشعار حوالة مالية واردة',
    message: 'تم إضافة مبلغ 50,000 ر.ي إلى محفظتك من حساب مصرف الكريمي. رصيدك الحالي: 345,000 ر.ي.',
    type: 'transaction',
    sentAt: 'اليوم 09:30',
    status: 'delivered',
    channel: 'SMS Gateway'
  }
];


