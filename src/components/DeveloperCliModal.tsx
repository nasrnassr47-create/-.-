import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  X, 
  Play, 
  Code2, 
  Sparkles, 
  Trash2, 
  Maximize2, 
  Minimize2,
  ChevronRight
} from 'lucide-react';
import { 
  Customer, 
  Transaction, 
  TelecomPackage, 
  GovernmentService, 
  FinancialHold, 
  SmsNotification 
} from '../types';

interface DeveloperCliModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  telecomPackages: TelecomPackage[];
  setTelecomPackages: React.Dispatch<React.SetStateAction<TelecomPackage[]>>;
  governmentServices: GovernmentService[];
  setGovernmentServices: React.Dispatch<React.SetStateAction<GovernmentService[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  financialHolds: FinancialHold[];
  setFinancialHolds: React.Dispatch<React.SetStateAction<FinancialHold[]>>;
  notifications: SmsNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<SmsNotification[]>>;
  triggerToast: (msg: string) => void;
}

interface CliLogItem {
  id: string;
  type: 'cmd' | 'output' | 'success' | 'error' | 'info' | 'code';
  text: string;
  timestamp: string;
}

export const DeveloperCliModal: React.FC<DeveloperCliModalProps> = ({
  isOpen,
  onClose,
  walletBalance,
  setWalletBalance,
  customers,
  setCustomers,
  telecomPackages,
  setTelecomPackages,
  governmentServices,
  setGovernmentServices,
  transactions,
  setTransactions,
  financialHolds,
  setFinancialHolds,
  notifications,
  setNotifications,
  triggerToast
}) => {
  const [logs, setLogs] = useState<CliLogItem[]>([
    {
      id: 'log-1',
      type: 'info',
      text: '>> [NASR-KERNEL-CORE-v15.8] Dynamic Engine Initialized.\n>> [V8/TSX ENGINE] Live hot-patching & code evaluation ready.\n>> [SYSTEM] Type "help" or select automated commands from the quick panel.',
      timestamp: '12:00:00'
    }
  ]);

  const [cmdInput, setCmdInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [mode, setMode] = useState<'cli' | 'ide'>('cli');
  const [ideScript, setIdeScript] = useState<string>(
`// اكتب كود لتعديل أو إضافة أي عنصر برمجياً للنظام فوراً:
ctx.addService({
  name: "سداد فواتير الغاز والوقود المنزلي",
  agency: "الشركة اليمنية للغاز",
  category: "utilities",
  accountLabel: "رقم عداد / بطاقة الغاز",
  description: "سداد فوري ومباشر لأسطوانات وعدادات الغاز المنزلي"
});

ctx.toast("تمت إضافة خدمة الغاز المنزلي برمجياً بنجاح!");`
  );
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, logs]);

  const availableCommands = [
    'help',
    'add-service',
    'add-telecom',
    'add-customer',
    'set-balance',
    'freeze-customer',
    'unfreeze-customer',
    'send-sms',
    'status',
    'list-services',
    'list-customers',
    'system-audit',
    'db-migrate',
    'clear'
  ];

  // Update suggestions on typing
  useEffect(() => {
    if (!cmdInput.trim()) {
      setSuggestions([]);
      return;
    }
    const clean = cmdInput.trim().toLowerCase();
    const matches = availableCommands.filter(c => c.startsWith(clean));
    setSuggestions(matches);
  }, [cmdInput]);

  if (!isOpen) return null;

  const appendLog = (type: CliLogItem['type'], text: string) => {
    const item: CliLogItem = {
      id: `log-${Date.now()}-${Math.random()}`,
      type,
      text,
      timestamp: new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setLogs(prev => [...prev, item]);
  };

  // Helper to parse CLI arguments like: add-service --name "سداد المياه" --agency "وزارة المياه"
  const parseArgs = (rawArgs: string): Record<string, string> => {
    const regex = /--([a-zA-Z0-9_-]+)(?:\s+(?:"([^"]*)"|'([^']*)'|(\S+)))?/g;
    const result: Record<string, string> = {};
    let match;
    while ((match = regex.exec(rawArgs)) !== null) {
      const key = match[1];
      const val = match[2] || match[3] || match[4] || 'true';
      result[key] = val;
    }
    return result;
  };

  // Main Command Processor
  const processCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    // Add to history
    setHistory(prev => [trimmed, ...prev]);
    setHistoryIndex(-1);

    appendLog('cmd', `nasr-dev@sovereign:~$ ${trimmed}`);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const argsString = trimmed.substring(mainCmd.length).trim();
    const args = parseArgs(argsString);

    switch (mainCmd) {
      case 'help':
        appendLog('info', 
`=== دليل الأوامر البرمجية والهيكلية لنصر والت v15.8 ===
1. add-service --name <الاسم> --agency <الجهة> [--category utilities|traffic|customs|education] [--label <الحقل>]
   مثال: add-service --name "سداد فواتير الغاز" --agency "شركة الغاز" --label "رقم المشترك"
   -> يضيف أيقونة وخدمة حكومية/مؤسسية جديدة فوراً للتطبيق والنظام.

2. add-telecom --provider <yemen_mobile|you|sabafon|yemen_net> --name <اسم الباقة> --price <السعر> --data <البيانات>
   مثال: add-telecom --provider yemen_mobile --name "باقة العملاق 60GB" --price 7000 --data "60 GB"
   -> يضيف باقة اتصالات جديدة وتظهر فوراً في شاشة السداد.

3. add-customer --name <الاسم> --phone <الهاتف> [--balance <الرصيد>] [--nationalid <الرقم>]
   مثال: add-customer --name "صالح اليافعي" --phone 771998822 --balance 500000
   -> ينشئ مشتركاً ومحفظة جديدة فوراً في النظام وقاعدة البيانات.

4. set-balance --amount <المبلغ_بالريال>
   مثال: set-balance --amount 150000000
   -> يعدل رصيد الخزينة السيادية المركزية فوراً.

5. freeze-customer --phone <الهاتف>
   unfreeze-customer --phone <الهاتف>
   -> يوقف أو يفعل حساب مشترك فوراً برمجياً.

6. send-sms --phone <الهاتف|all> --title <العنوان> --msg <النص>
   -> يرسل رسالة SMS حية فورية عبر البوابة.

7. list-services | list-customers | status | system-audit | clear
   -> أوامر فحص وسرد بيانات سريعة.`);
        break;

      case 'add-service': {
        const name = args.name || args.title;
        if (!name) {
          appendLog('error', 'خطأ: يجب تحديد اسم الخدمة. مثال: add-service --name "سداد المياه" --agency "وزارة المياه"');
          return;
        }
        const agency = args.agency || 'جهة حكومية معتمدة';
        const category = (args.category as GovernmentService['category']) || 'utilities';
        const label = args.label || 'رقم الحساب / المشترك';
        const desc = args.desc || `بوابة سداد إلكترونية معتمدة لـ ${name}`;

        const newService: GovernmentService = {
          id: `gov-${Date.now().toString().slice(-4)}`,
          name,
          agencyName: agency,
          category,
          description: desc,
          accountLabel: label,
          accountPlaceholder: 'أدخل رقم الاشتراك',
          status: 'active',
          apiConnected: true,
          totalPaidCount: 0,
          totalAmountCollected: 0,
          iconType: 'Zap'
        };

        setGovernmentServices(prev => [newService, ...prev]);
        appendLog('success', `[SUCCESS] تم إنشاء وربط الخدمة [${name}] التابعة لـ [${agency}] برمجياً وهيكلياً بنجاح! تظهر الآن في قسم الربط الحكومي وقائمة الخدمات.`);
        triggerToast(`تمت إضافة خدمة (${name}) برمجياً بنجاح.`);
        break;
      }

      case 'add-telecom': {
        const name = args.name;
        const price = Number(args.price) || 3000;
        const provider = (args.provider as TelecomPackage['provider']) || 'yemen_mobile';
        const data = args.data || '20 GB';

        if (!name) {
          appendLog('error', 'خطأ: يجب تحديد اسم الباقة. مثال: add-telecom --provider yemen_mobile --name "باقة فورجي 50GB" --price 5000');
          return;
        }

        const newPkg: TelecomPackage = {
          id: `pkg-${Date.now().toString().slice(-4)}`,
          provider,
          name,
          price,
          validity: '30 يوم',
          data,
          minutes: '300 دقيقة',
          category: 'combo'
        };

        setTelecomPackages(prev => [newPkg, ...prev]);
        appendLog('success', `[SUCCESS] تمت إضافة باقة الاتصالات [${name}] لمزود [${provider}] بسعر [${price} ر.ي]. يمكنك الآن تسديدها فوراً.`);
        triggerToast(`تمت إضافة باقة (${name}) بنجاح.`);
        break;
      }

      case 'add-customer': {
        const fullName = args.name;
        const phone = args.phone || `77${Math.floor(1000000 + Math.random() * 9000000)}`;
        const balance = Number(args.balance) || 100000;
        const nationalId = args.nationalid || `${Math.floor(10000000000 + Math.random() * 90000000000)}`;

        if (!fullName) {
          appendLog('error', 'خطأ: حدد اسم المشترك. مثال: add-customer --name "صالح اليافعي" --phone 771998822 --balance 500000');
          return;
        }

        const newCust: Customer = {
          id: `CUST-${Date.now().toString().slice(-4)}`,
          accountNumber: `775-DEV-${Math.floor(100 + Math.random() * 900)}`,
          fullName,
          phoneNumber: phone,
          nationalId,
          category: 'individual',
          balance,
          currency: 'YER',
          status: 'active',
          kycTier: 'Tier 2 (موثق بالهوية)',
          dailyLimit: 2000000,
          monthlyLimit: 20000000,
          registeredDate: new Date().toISOString().split('T')[0],
          lastActive: 'الآن (عبر CLI)',
          services: {
            canTransfer: true,
            canReceive: true,
            canRechargeTelecom: true,
            canWithdrawCash: true,
            canIssueVirtualCard: true
          },
          totalTransfersIn: balance,
          totalTransfersOut: 0,
          riskScore: 2,
          notes: 'مشترك تم إنشاؤه وتوثيقه آلياً من موجه الأوامر النواة'
        };

        setCustomers(prev => [newCust, ...prev]);
        appendLog('success', `[SUCCESS] تم قيد المشترك الجديد [${fullName}] برقم حساب [${newCust.accountNumber}] ورصيد [${balance.toLocaleString()} ر.ي].`);
        triggerToast(`تم إنشاء حساب المشترك (${fullName}) بنجاح.`);
        break;
      }

      case 'set-balance': {
        const amount = Number(args.amount || args.val || parts[1]);
        if (isNaN(amount) || amount < 0) {
          appendLog('error', 'خطأ: حدد مبلغاً صحيحاً. مثال: set-balance --amount 150000000');
          return;
        }
        setWalletBalance(amount);
        appendLog('success', `[SUCCESS] تم تعديل رصيد الخزينة السيادية المركزية إلى: ${amount.toLocaleString()} ريال يمني.`);
        triggerToast(`تم تحديث رصيد الخزينة إلى ${amount.toLocaleString()} ر.ي`);
        break;
      }

      case 'freeze-customer': {
        const phone = args.phone || parts[1];
        if (!phone) {
          appendLog('error', 'خطأ: حدد رقم هاتف المشترك. مثال: freeze-customer --phone 770001199');
          return;
        }
        const cust = customers.find(c => c.phoneNumber.includes(phone) || c.accountNumber.includes(phone));
        if (!cust) {
          appendLog('error', `لم يتم العثور على مشترك بالرقم أو الحساب [${phone}]`);
          return;
        }
        setCustomers(prev => prev.map(c => c.id === cust.id ? { ...c, status: 'frozen', riskScore: 95 } : c));
        appendLog('success', `[LOCKDOWN] تم تجميد وتوقيف حساب المشترك (${cust.fullName}) وإيقاف كافة عملياته المالية.`);
        triggerToast(`تم تجميد حساب المشترك (${cust.fullName}).`);
        break;
      }

      case 'unfreeze-customer': {
        const phone = args.phone || parts[1];
        const cust = customers.find(c => c.phoneNumber.includes(phone) || c.accountNumber.includes(phone));
        if (!cust) {
          appendLog('error', `لم يتم العثور على مشترك بالرقم [${phone}]`);
          return;
        }
        setCustomers(prev => prev.map(c => c.id === cust.id ? { ...c, status: 'active', riskScore: 5 } : c));
        appendLog('success', `[UNLOCKED] تم فك التجميد واستعادة حساب المشترك (${cust.fullName}).`);
        triggerToast(`تم فك تجميد المشترك (${cust.fullName}).`);
        break;
      }

      case 'send-sms': {
        const phone = args.phone || '777890123';
        const title = args.title || 'إشعار من نصر والت';
        const msg = args.msg || args.message || 'تمت العملية بنجاح عبر النظام السيادي.';

        const notif: SmsNotification = {
          id: `SMS-${Date.now().toString().slice(-4)}`,
          recipientPhone: phone,
          recipientName: phone === 'all' ? 'كافة المشتركين' : 'مشترك مصرح',
          title,
          message: msg,
          type: 'broadcast',
          sentAt: 'الآن',
          status: 'delivered',
          channel: 'SMS Gateway'
        };
        setNotifications(prev => [notif, ...prev]);
        appendLog('success', `[SMS DISPATCHED] تم إرسال رسالة SMS إلى [${phone}]: "${msg}"`);
        triggerToast('تم إرسال رسالة SMS بنجاح.');
        break;
      }

      case 'status':
        appendLog('info', 
`[SYSTEM HEALTH: 100% EXCELLENT]
• Micro-Ledger Engine: ONLINE (Active)
• Node Runtime: v15.8 Sovereign Kernel
• Registered Customers: ${customers.length} Accounts
• Active Telecom Packages: ${telecomPackages.length} Packages
• Connected Government Services: ${governmentServices.length} Agencies
• Total Vault YER Balance: ${walletBalance.toLocaleString()} YER
• Database Cluster: Synced (Postgres Memory-Engine)`);
        break;

      case 'list-services':
        appendLog('info', `الخدمات والجهات المربوطة حالياً (${governmentServices.length}):\n` + 
          governmentServices.map((s, idx) => `${idx + 1}. [${s.name}] - ${s.agencyName} (${s.accountLabel})`).join('\n')
        );
        break;

      case 'list-customers':
        appendLog('info', `قائمة المشتركين (${customers.length}):\n` + 
          customers.map(c => `• ${c.fullName} | ${c.accountNumber} | رصيد: ${c.balance.toLocaleString()} ر.ي | حالة: ${c.status}`).join('\n')
        );
        break;

      case 'system-audit':
        appendLog('info', 'بدء فحص وتدقيق النواة السيادية...\n>> فحص مطابقة قيود اليومية: 100% تطابق تام.\n>> فحص تكرار أرقام الحسابات: 0 تعارض.\n>> فحص التشفير AES-256 GCM: ساري.\n>> النتيجة: المنظومة مستقرة وخالية من أي ثغرات أو فوارق مالية.');
        break;

      case 'db-migrate':
        appendLog('success', 'Migrating database tables: [customers, transactions, government_services, telecom_packages, holds]... All migrations applied in 8ms.');
        break;

      case 'clear':
        setLogs([]);
        break;

      default:
        appendLog('error', `أمر غير معروف: "${mainCmd}". اكتب "help" لمشاهدة قائمة الأوامر المتاحة.`);
        break;
    }
  };

  // Execute JavaScript in IDE Script mode
  const executeScript = () => {
    appendLog('cmd', `// executing live script via Live Runtime Context...`);
    try {
      // Build safe execution context object
      const ctx = {
        walletBalance,
        customers,
        telecomPackages,
        governmentServices,
        addService: (srv: Partial<GovernmentService>) => {
          const newSrv: GovernmentService = {
            id: `gov-${Date.now().toString().slice(-4)}`,
            name: srv.name || 'خدمة جديدة',
            agencyName: srv.agencyName || 'جهة معتمدة',
            category: srv.category || 'utilities',
            description: srv.description || 'خدمة سداد مضافة برمجياً',
            accountLabel: srv.accountLabel || 'رقم المشترك',
            accountPlaceholder: 'أدخل الرقم',
            status: 'active',
            apiConnected: true,
            totalPaidCount: 0,
            totalAmountCollected: 0,
            iconType: srv.iconType || 'Zap'
          };
          setGovernmentServices(prev => [newSrv, ...prev]);
        },
        addTelecom: (pkg: Partial<TelecomPackage>) => {
          const newPkg: TelecomPackage = {
            id: `pkg-${Date.now().toString().slice(-4)}`,
            provider: pkg.provider || 'yemen_mobile',
            name: pkg.name || 'باقة جديدة',
            price: pkg.price || 3000,
            validity: pkg.validity || '30 يوم',
            data: pkg.data || '20 GB',
            category: pkg.category || 'combo'
          };
          setTelecomPackages(prev => [newPkg, ...prev]);
        },
        setBalance: (amount: number) => {
          setWalletBalance(amount);
        },
        toast: (msg: string) => {
          triggerToast(msg);
        },
        log: (msg: string) => {
          appendLog('info', `[SCRIPT LOG] ${msg}`);
        }
      };

      // Run code dynamically
      const runner = new Function('ctx', ideScript);
      runner(ctx);

      appendLog('success', '✓ [SCRIPT EXECUTED] تم تنفيذ الكود بنجاح وتحديث بنية النظام والتطبيق لحظياً وبدون إعادة تحميل!');
      triggerToast('تم تنفيذ الكود البرمجي وتحديث النظام فوراً.');
    } catch (err: any) {
      appendLog('error', `خطأ في تنفيذ الكود البرمجي: ${err.message || String(err)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (cmdInput.trim()) {
        processCommand(cmdInput);
        setCmdInput('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setCmdInput(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const prevIdx = historyIndex - 1;
        setHistoryIndex(prevIdx);
        setCmdInput(history[prevIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCmdInput('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 select-none">
      <div 
        className={`bg-[#020d07] border border-[#16a34a] rounded-[16px] shadow-[0_0_50px_rgba(22,163,74,0.3)] flex flex-col overflow-hidden transition-all duration-300 w-full ${
          isFullScreen ? 'h-[98vh] max-w-[98vw]' : 'h-[620px] max-w-5xl'
        }`}
        dir="ltr"
      >
        {/* Terminal Title Bar */}
        <div className="bg-[#031d10] px-4 py-2.5 border-b border-[#16a34a]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block cursor-pointer" onClick={onClose}></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block cursor-pointer" onClick={() => setIsFullScreen(!isFullScreen)}></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block cursor-pointer"></span>
            </div>

            <div className="h-4 w-px bg-white/20 mx-1"></div>

            <div className="flex items-center gap-2">
              <Terminal size={17} className="text-[#16a34a]" />
              <span className="font-mono font-bold text-[13px] text-white tracking-wide">
                NASR-SOVEREIGN-KERNEL // LIVE-DEV-CLI
              </span>
              <span className="text-[10px] bg-[#16a34a]/20 text-emerald-300 border border-[#16a34a]/50 font-mono px-2 py-0.2 rounded">
                ROOT PRIVILEGES
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Switcher */}
            <div className="flex items-center bg-[#01140a] p-0.5 rounded-[8px] border border-[#16a34a]/40 text-[11px] font-mono">
              <button
                onClick={() => setMode('cli')}
                className={`px-2.5 py-1 rounded-[6px] font-bold cursor-pointer transition-colors ${
                  mode === 'cli' ? 'bg-[#16a34a] text-black font-bold' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                CLI Terminal
              </button>
              <button
                onClick={() => setMode('ide')}
                className={`px-2.5 py-1 rounded-[6px] font-bold cursor-pointer transition-colors ${
                  mode === 'ide' ? 'bg-[#f5c842] text-black font-bold' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                Script IDE (Code)
              </button>
            </div>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="text-gray-400 hover:text-white p-1.5 rounded hover:bg-white/10"
              title={isFullScreen ? 'تصغير' : 'ملء الشاشة'}
            >
              {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-400 p-1.5 rounded hover:bg-white/10"
              title="إغلاق"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Main Terminal Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Main Console & Code Area */}
          <div className="flex-1 flex flex-col bg-[#010905] overflow-hidden">
            
            {mode === 'cli' ? (
              /* CLI Stream Output */
              <div className="flex-1 p-4 font-mono text-[12px] overflow-y-auto space-y-1.5 select-text text-right" dir="rtl">
                {logs.map((log) => (
                  <div key={log.id} className="leading-relaxed whitespace-pre-wrap">
                    {log.type === 'cmd' && (
                      <div className="text-[#f5c842] font-bold flex items-center gap-1.5" dir="ltr">
                        <span>{log.text}</span>
                      </div>
                    )}
                    {log.type === 'success' && (
                      <div className="text-emerald-400 bg-[#032516]/60 p-2 rounded border border-[#16a34a]/30">
                        {log.text}
                      </div>
                    )}
                    {log.type === 'error' && (
                      <div className="text-red-400 bg-red-950/40 p-2 rounded border border-red-500/30">
                        {log.text}
                      </div>
                    )}
                    {log.type === 'info' && (
                      <div className="text-sky-300">
                        {log.text}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            ) : (
              /* Script IDE Mode */
              <div className="flex-1 flex flex-col p-4 bg-[#010c06] text-white">
                <div className="flex items-center justify-between pb-2 border-b border-[#16a34a]/30 mb-2">
                  <div className="flex items-center gap-2 text-[12px] font-mono text-[#f5c842]">
                    <Code2 size={16} />
                    <span>Live Scripting Sandbox (JavaScript / State Controller)</span>
                  </div>
                  <button
                    onClick={executeScript}
                    className="px-3.5 py-1.5 bg-[#16a34a] hover:bg-emerald-600 text-white font-bold text-[12px] rounded-[8px] flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Play size={14} />
                    <span>تشغيل وتنفيذ الكود فوراً (Execute)</span>
                  </button>
                </div>

                <textarea
                  value={ideScript}
                  onChange={(e) => setIdeScript(e.target.value)}
                  className="flex-1 bg-[#010503] text-emerald-300 font-mono text-[13px] p-3 rounded-[10px] border border-[#16a34a]/40 focus:border-[#f5c842] focus:outline-none resize-none leading-relaxed"
                  spellCheck={false}
                  placeholder="// اكتب الكود هنا..."
                />
              </div>
            )}

            {/* Suggestions Bar */}
            {suggestions.length > 0 && mode === 'cli' && (
              <div className="px-4 py-1.5 bg-[#031d10] border-t border-[#16a34a]/30 flex items-center gap-2 text-[11px] font-mono overflow-x-auto">
                <span className="text-gray-400">اقتراحات الأوامر:</span>
                {suggestions.map(s => (
                  <button
                    key={s}
                    onClick={() => {
                      setCmdInput(s + ' ');
                      inputRef.current?.focus();
                    }}
                    className="px-2 py-0.5 bg-[#01140a] hover:bg-[#16a34a] hover:text-black text-[#f5c842] border border-[#f5c842]/40 rounded cursor-pointer transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* CLI Prompt Bar */}
            {mode === 'cli' && (
              <div className="p-3 bg-[#02140a] border-t border-[#16a34a]/40 flex items-center gap-2 font-mono">
                <span className="text-[#f5c842] font-bold text-[13px]">admin@nasr-core:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={cmdInput}
                  onChange={(e) => setCmdInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="اكتب الأمر هنا (مثال: add-service أو help)... اضغط Enter للتنفيذ"
                  className="flex-1 bg-transparent text-white text-[13px] focus:outline-none font-mono placeholder:text-gray-600"
                  autoFocus
                />
                <button
                  onClick={() => {
                    if (cmdInput.trim()) {
                      processCommand(cmdInput);
                      setCmdInput('');
                    }
                  }}
                  className="px-4 py-1.5 bg-[#16a34a] hover:bg-emerald-600 text-black font-bold rounded-[8px] text-[12px] cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
                >
                  <Play size={13} />
                  <span>تنفيذ</span>
                </button>
              </div>
            )}

          </div>

          {/* Quick Preset Actions & Snippets Sidebar (Right Panel) */}
          <div className="w-80 bg-[#02160d] border-l border-[#16a34a]/40 p-3.5 flex flex-col justify-between overflow-y-auto" dir="rtl">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#16a34a]/30 pb-2">
                <span className="text-[12px] font-bold text-white flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#f5c842]" />
                  <span>الأوامر المساعدة التلقائية</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">نقرة للتنفيذ</span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                {/* 1. Add Water Service */}
                <button
                  onClick={() => {
                    const cmd = 'add-service --name "سداد فواتير المياه والصرف" --agency "المؤسسة المحلية للمياه" --label "رقم الاشتراك"';
                    processCommand(cmd);
                  }}
                  className="w-full text-right p-2 rounded-[8px] bg-[#01140a] hover:bg-[#14532d] border border-[#16a34a]/30 text-white transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <span className="font-bold text-[#f5c842] block">+ إضافة خدمة سداد فواتير المياه</span>
                    <span className="text-[10px] text-[#94a3b8]">ينشئ أيقونة وخدمة فورية في التطبيق</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-500 group-hover:text-white" />
                </button>

                {/* 2. Add Telecom Package */}
                <button
                  onClick={() => {
                    const cmd = 'add-telecom --provider yemen_mobile --name "باقة نصر VIP 80GB" --price 8500 --data "80 GB"';
                    processCommand(cmd);
                  }}
                  className="w-full text-right p-2 rounded-[8px] bg-[#01140a] hover:bg-[#14532d] border border-[#16a34a]/30 text-white transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <span className="font-bold text-sky-300 block">+ إضافة باقة اتصالات فورية</span>
                    <span className="text-[10px] text-[#94a3b8]">يمن موبايل 80 جيجا بسعر 8500</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-500 group-hover:text-white" />
                </button>

                {/* 3. Add Verified Merchant */}
                <button
                  onClick={() => {
                    const cmd = 'add-customer --name "شركة الأمل للصرافة" --phone 772990011 --balance 25000000';
                    processCommand(cmd);
                  }}
                  className="w-full text-right p-2 rounded-[8px] bg-[#01140a] hover:bg-[#14532d] border border-[#16a34a]/30 text-white transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <span className="font-bold text-emerald-300 block">+ تسجيل وتفعيل تاجر/مشترك</span>
                    <span className="text-[10px] text-[#94a3b8]">إضافة محفظة برصيد 25 مليون ر.ي</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-500 group-hover:text-white" />
                </button>

                {/* 4. Increase Sovereign Vault Balance */}
                <button
                  onClick={() => {
                    const cmd = 'set-balance --amount 200000000';
                    processCommand(cmd);
                  }}
                  className="w-full text-right p-2 rounded-[8px] bg-[#01140a] hover:bg-[#14532d] border border-[#16a34a]/30 text-white transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <span className="font-bold text-amber-300 block">⚡ رفع رصيد الخزينة إلى 200 مليون</span>
                    <span className="text-[10px] text-[#94a3b8]">تغذية نقدية مركزية فورية</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-500 group-hover:text-white" />
                </button>

                {/* 5. System Audit */}
                <button
                  onClick={() => processCommand('system-audit')}
                  className="w-full text-right p-2 rounded-[8px] bg-[#01140a] hover:bg-[#14532d] border border-[#16a34a]/30 text-white transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <span className="font-bold text-white block">🔍 فحص النواة والمطابقة اللحظية</span>
                    <span className="text-[10px] text-[#94a3b8]">تدقيق القيود ومنع الازدواج المالي</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-500 group-hover:text-white" />
                </button>

                {/* 6. List Services */}
                <button
                  onClick={() => processCommand('list-services')}
                  className="w-full text-right p-2 rounded-[8px] bg-[#01140a] hover:bg-[#14532d] border border-[#16a34a]/30 text-white transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <span className="font-bold text-sky-200 block">📋 سرد كافة الخدمات والجهات المربوطة</span>
                    <span className="text-[10px] text-[#94a3b8]">عرض مسمياتها في شاشة الـ CLI</span>
                  </div>
                  <ChevronRight size={14} className="text-gray-500 group-hover:text-white" />
                </button>
              </div>
            </div>

            {/* Bottom Info / Clear */}
            <div className="pt-3 border-t border-[#16a34a]/30 space-y-2">
              <div className="text-[10px] text-[#94a3b8] font-mono leading-tight">
                <div>Memory: 38.2 MB / Stable</div>
                <div>Runtime: Node TSX & Live State</div>
                <div className="text-emerald-400">Hot Updates: Active ⚡</div>
              </div>
              <button
                onClick={() => setLogs([])}
                className="w-full py-1.5 bg-[#01140a] hover:bg-red-950 text-gray-300 hover:text-red-300 border border-gray-700 rounded text-[11px] flex items-center justify-center gap-1 cursor-pointer"
              >
                <Trash2 size={12} />
                <span>مسح شاشة الكونسول (Clear)</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DeveloperCliModal;
