import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Layers, 
  ArrowLeftRight, 
  PlusCircle, 
  Smartphone, 
  CreditCard, 
  Coins, 
  Users, 
  FolderArchive, 
  BookOpen, 
  TrendingUp, 
  Terminal, 
  Printer, 
  MessageSquare, 
  ChevronRight, 
  ChevronLeft, 
  Power, 
  Lock, 
  Activity, 
  X, 
  UserCheck, 
  Download,
  Landmark,
  FolderTree,
  Briefcase,
  Store
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  badge?: string | null;
  badgeColor?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  activeScreen: string;
  onSelectScreen: (screen: string) => void;
  onOpenModal: (modal: 'cli' | 'documentation') => void;
  onOpenChat: () => void;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  flaggedCount: number;
  pendingApprovalsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeScreen,
  onSelectScreen,
  onOpenModal,
  onOpenChat,
  onLogout,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  flaggedCount,
  pendingApprovalsCount
}) => {
  const navSections: NavSection[] = [
    {
      title: 'القيادة السيادية',
      items: [
        {
          id: 'dashboard',
          label: 'لوحة القيادة والتحكم',
          icon: Layers,
          badge: null
        },
        {
          id: 'control_room',
          label: 'غرفة الرقابة و AML',
          icon: ShieldAlert,
          badge: flaggedCount > 0 ? `${flaggedCount} اشتباه` : null,
          badgeColor: 'bg-[#dc2626] text-white'
        }
      ]
    },
    {
      title: 'العمليات اللحظية',
      items: [
        {
          id: 'transfer',
          label: 'التحويل السريع والحوالات',
          icon: ArrowLeftRight,
          badge: null
        },
        {
          id: 'charge',
          label: 'شحن وتغذية العهد',
          icon: PlusCircle,
          badge: null
        },
        {
          id: 'telecom',
          label: 'سداد باقات الاتصالات',
          icon: Smartphone,
          badge: 'فوري'
        },
        {
          id: 'cards',
          label: 'البطاقات الافتراضية',
          icon: CreditCard,
          badge: null
        },
        {
          id: 'withdraw',
          label: 'صرف وسحب نقدي OTP',
          icon: Coins,
          badge: null
        }
      ]
    },
    {
      title: 'المنظومات والخدمات',
      items: [
        {
          id: 'v8_hub',
          label: 'وحدات V8.0 السيادية',
          icon: Store,
          badge: 'V8.0'
        },
        {
          id: 'master_tree',
          label: 'المخطط الشجري Ω',
          icon: FolderTree,
          badge: 'شامل'
        },
        {
          id: 'settlements',
          label: 'التسويات وصرف الرواتب',
          icon: Landmark,
          badge: 'مقاصة'
        },
        {
          id: 'institutional',
          label: 'المؤسسات والجامعات ERP',
          icon: Briefcase,
          badge: null
        },
        {
          id: 'customers',
          label: 'إدارة العملاء والمشتركين',
          icon: UserCheck,
          badge: 'KYC'
        },
        {
          id: 'client_app',
          label: 'تطبيق محفظة العميل',
          icon: Smartphone,
          badge: null
        },
        {
          id: 'apk_hub',
          label: 'تنزيل APK ونسخ الويب',
          icon: Download,
          badge: 'APK'
        },
        {
          id: 'family_app',
          label: 'منظومة العائلة والنشء',
          icon: Users,
          badge: 'ذكية'
        },
        {
          id: 'archive',
          label: 'الخزنة الرقمية والأرشيف',
          icon: FolderArchive,
          badge: null
        },
        {
          id: 'encyclopedia',
          label: 'الموسوعة وبنية النظام',
          icon: BookOpen,
          badge: null
        },
        {
          id: 'reports',
          label: 'دفتر اليومية والتقارير',
          icon: TrendingUp,
          badge: null
        }
      ]
    }
  ];

  const handleItemClick = (screenId: string) => {
    onSelectScreen(screenId);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 right-0 h-screen z-50 md:z-30 bg-[#032516] border-l border-[rgba(245,200,66,0.3)] flex flex-col transition-all duration-300 shadow-2xl select-none ${
          isMobileOpen ? 'translate-x-0 w-72' : 'translate-x-full md:translate-x-0'
        } ${isCollapsed ? 'md:w-20' : 'md:w-68'}`}
        dir="rtl"
      >
        {/* Sidebar Header */}
        <div className="p-3.5 border-b border-[rgba(245,200,66,0.2)] bg-[#01140a] flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-10 h-10 rounded-[12px] bg-[#032516] border border-[#f5c842] flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="text-[#f5c842]" size={22} />
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-[15px] font-bold text-white tracking-wide truncate">نصر والت</h1>
                  <span className="text-[10px] bg-[#f5c842]/20 text-[#f5c842] border border-[#f5c842]/40 font-bold px-1.5 py-0.2 rounded-[6px]">
                    v7.0
                  </span>
                </div>
                <p className="text-[11px] text-[#94a3b8] font-normal truncate">المنظومة المالية والسيادية</p>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="md:hidden text-[#94a3b8] hover:text-white p-1 rounded-lg hover:bg-[#032516]"
          >
            <X size={20} />
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-[8px] bg-[#032516] hover:bg-[#063d25] border border-[rgba(245,200,66,0.3)] text-[#f5c842] transition-colors cursor-pointer"
            title={isCollapsed ? 'توسيع الشريط الجانبي' : 'طي الشريط الجانبي'}
          >
            {isCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        {/* Scrollable Navigation Menu */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-[13px] custom-scrollbar">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {(!isCollapsed || isMobileOpen) && (
                <div className="text-[10px] font-bold text-[#94a3b8] px-2.5 py-1 uppercase tracking-wider">
                  {section.title}
                </div>
              )}
              {isCollapsed && !isMobileOpen && (
                <div className="w-6 h-0.5 bg-[rgba(245,200,66,0.2)] mx-auto my-2 rounded-full" />
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeScreen === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] font-semibold transition-all cursor-pointer group text-right ${
                        isActive
                          ? 'bg-[#14532d] text-white border border-[#16a34a] shadow-sm'
                          : 'text-[#94a3b8] hover:text-white hover:bg-[#01140a] border border-transparent'
                      }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon 
                        size={19} 
                        className={`shrink-0 transition-colors ${
                          isActive ? 'text-[#f5c842]' : 'text-[#94a3b8] group-hover:text-[#f5c842]'
                        }`} 
                      />
                      {(!isCollapsed || isMobileOpen) && (
                        <div className="flex-1 flex items-center justify-between min-w-0">
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[8px] shrink-0 ${
                              item.badgeColor || 'bg-[#78350f] text-[#f5c842] border border-[#f5c842]/30'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quick Tools Section */}
          <div className="space-y-1 pt-2 border-t border-[rgba(245,200,66,0.2)]">
            {(!isCollapsed || isMobileOpen) && (
              <div className="text-[10px] font-bold text-[#94a3b8] px-2.5 py-1 uppercase tracking-wider">
                الأدوات والنواة
              </div>
            )}

            <button
              onClick={() => {
                onOpenModal('cli');
                onCloseMobile();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] font-semibold text-[#94a3b8] hover:text-white hover:bg-[#01140a] transition-all cursor-pointer group text-right"
              title={isCollapsed ? 'موجه الأوامر والنواة CLI' : undefined}
            >
              <Terminal size={18} className="text-[#16a34a] shrink-0 group-hover:scale-105 transition-transform" />
              {(!isCollapsed || isMobileOpen) && (
                <div className="flex-1 flex items-center justify-between">
                  <span>موجه الأوامر CLI</span>
                  <span className="text-[10px] bg-[#14532d] text-[#16a34a] px-1.5 py-0.5 rounded font-mono">
                    Terminal
                  </span>
                </div>
              )}
            </button>

            <button
              onClick={() => {
                onOpenModal('documentation');
                onCloseMobile();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] font-semibold text-[#94a3b8] hover:text-white hover:bg-[#01140a] transition-all cursor-pointer group text-right"
              title={isCollapsed ? 'مركز التوثيق وطباعة PDF' : undefined}
            >
              <Printer size={18} className="text-[#f5c842] shrink-0 group-hover:scale-105 transition-transform" />
              {(!isCollapsed || isMobileOpen) && (
                <div className="flex-1 flex items-center justify-between">
                  <span>مركز التوثيق PDF</span>
                  <span className="text-[10px] bg-[#78350f] text-[#f5c842] px-1.5 py-0.5 rounded">
                    PDF 🖨️
                  </span>
                </div>
              )}
            </button>

            <button
              onClick={() => {
                onOpenChat();
                onCloseMobile();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] font-semibold text-[#94a3b8] hover:text-white hover:bg-[#01140a] transition-all cursor-pointer group text-right"
              title={isCollapsed ? 'استشارة نصر AI الذكي' : undefined}
            >
              <MessageSquare size={18} className="text-[#0ea5e9] shrink-0 group-hover:scale-105 transition-transform" />
              {(!isCollapsed || isMobileOpen) && (
                <div className="flex-1 flex items-center justify-between">
                  <span>مساعد نصر AI</span>
                  <span className="text-[10px] bg-[#0c4a6e] text-sky-200 px-1.5 py-0.5 rounded">
                    ذكي
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar Footer Status & Logout */}
        <div className="p-3 border-t border-[rgba(245,200,66,0.2)] bg-[#01140a] space-y-2">
          {(!isCollapsed || isMobileOpen) && (
            <div className="p-2.5 rounded-[10px] bg-[#032516] border border-[rgba(245,200,66,0.15)] flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
                <span className="text-[#94a3b8]">التشفير السيادي:</span>
              </div>
              <span className="text-[#f5c842] font-mono font-bold">AES-256</span>
            </div>
          )}

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#7f1d1d]/40 hover:bg-[#7f1d1d] text-red-200 hover:text-white rounded-[10px] text-[11px] font-bold border border-[#dc2626]/40 transition-all cursor-pointer active:scale-95"
            title={isCollapsed ? 'تسجيل الخروج الآمن' : undefined}
          >
            <Power size={15} />
            {(!isCollapsed || isMobileOpen) && <span>تسجيل الخروج الآمن</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
