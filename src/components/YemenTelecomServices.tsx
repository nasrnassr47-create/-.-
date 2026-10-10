import React, { useState } from 'react';
import { Smartphone, Wifi, Check, Zap, Phone, AlertCircle, ArrowLeftRight } from 'lucide-react';
import { TelecomPackage } from '../types';

interface YemenTelecomServicesProps {
  packages: TelecomPackage[];
  onRecharge: (pkg: TelecomPackage, phone: string) => void;
  walletBalance: number;
}

export const YemenTelecomServices: React.FC<YemenTelecomServicesProps> = ({
  packages,
  onRecharge,
  walletBalance
}) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('yemen_mobile');
  const [phoneNumber, setPhoneNumber] = useState<string>('777');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const filteredPackages = packages.filter(p => p.provider === selectedProvider);

  const handlePay = (pkg: TelecomPackage) => {
    if (phoneNumber.length < 9) {
      alert('يرجى إدخال رقم هاتف صحيح مكون من 9 أرقام');
      return;
    }
    if (walletBalance < pkg.price) {
      alert('عذراً، الرصيد المتاح في المحفظة لا يكفي لشراء هذه الباقة');
      return;
    }

    onRecharge(pkg, phoneNumber);
    setSuccessMsg(`تم تسديد باقة (${pkg.name}) للرقم ${phoneNumber} بنجاح فوراً!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="bg-[#032516] rounded-[16px] border border-[rgba(245,200,66,0.3)] p-4 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[rgba(245,200,66,0.2)] pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[10px] bg-[#78350f] border border-[#f5c842]/40 flex items-center justify-center">
            <Smartphone className="text-[#f5c842]" size={22} />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-white">بوابة الاتصالات والإنترنت اليمني الموحدة</h3>
            <p className="text-[12px] text-[#94a3b8]">تسديد فوري لـ يمن موبايل، يو، سبأفون، يمن نت، وفايبر المنزلي</p>
          </div>
        </div>
        <span className="text-[11px] bg-[#14532d] text-emerald-200 border border-[#16a34a]/40 px-2.5 py-1 rounded-[10px] font-semibold">
          تنفيذ فوري في 3 ثوانٍ
        </span>
      </div>

      {successMsg && (
        <div className="bg-[#14532d] border border-[#16a34a] text-white p-3 rounded-[12px] text-[13px] font-semibold flex items-center gap-2">
          <Check size={18} className="text-[#f5c842]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Provider Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => setSelectedProvider('yemen_mobile')}
          className={`p-3 rounded-[12px] border text-center transition-all cursor-pointer font-bold text-[13px] ${
            selectedProvider === 'yemen_mobile'
              ? 'bg-[#78350f] text-[#f5c842] border-[#f5c842]'
              : 'bg-[#01140a] text-white border-[rgba(245,200,66,0.2)] hover:border-[#f5c842]/50'
          }`}
        >
          📱 يمن موبايل 4G/CDMA
        </button>

        <button
          onClick={() => setSelectedProvider('you')}
          className={`p-3 rounded-[12px] border text-center transition-all cursor-pointer font-bold text-[13px] ${
            selectedProvider === 'you'
              ? 'bg-[#0c4a6e] text-sky-200 border-[#0ea5e9]'
              : 'bg-[#01140a] text-white border-[rgba(245,200,66,0.2)] hover:border-[#0ea5e9]/50'
          }`}
        >
          📶 شركة يو (YOU)
        </button>

        <button
          onClick={() => setSelectedProvider('sabafon')}
          className={`p-3 rounded-[12px] border text-center transition-all cursor-pointer font-bold text-[13px] ${
            selectedProvider === 'sabafon'
              ? 'bg-[#14532d] text-emerald-200 border-[#16a34a]'
              : 'bg-[#01140a] text-white border-[rgba(245,200,66,0.2)] hover:border-[#16a34a]/50'
          }`}
        >
          📡 سبأفون (Sabafon)
        </button>

        <button
          onClick={() => setSelectedProvider('yemen_net')}
          className={`p-3 rounded-[12px] border text-center transition-all cursor-pointer font-bold text-[13px] ${
            selectedProvider === 'yemen_net'
              ? 'bg-[#7f1d1d] text-red-200 border-[#dc2626]'
              : 'bg-[#01140a] text-white border-[rgba(245,200,66,0.2)] hover:border-[#dc2626]/50'
          }`}
        >
          🌐 يمن نت ADSL / فايبر
        </button>
      </div>

      {/* Phone input */}
      <div className="bg-[#01140a] p-3.5 rounded-[12px] border border-[rgba(245,200,66,0.2)] flex flex-col sm:flex-row items-center gap-3">
        <label className="text-[13px] font-semibold text-white whitespace-nowrap">
          رقم الهاتف / الحساب:
        </label>
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="أدخل رقم المشترك مثلاً: 777123456"
            className="w-full bg-[#032516] text-white px-3.5 py-2 rounded-[10px] border border-[rgba(245,200,66,0.3)] focus:outline-none focus:border-[#f5c842] text-[13px] font-mono"
          />
        </div>
      </div>

      {/* Packages Grid */}
      <div className="space-y-2">
        <h4 className="text-[13px] font-bold text-[#f5c842]">الباقات والعروض المتاحة فورياً:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[#01140a] border border-[rgba(245,200,66,0.2)] rounded-[12px] p-3.5 flex flex-col justify-between hover:border-[#f5c842] transition-colors"
            >
              <div>
                <h5 className="text-[13px] font-bold text-white">{pkg.name}</h5>
                <p className="text-[11px] text-[#94a3b8] mt-1">{pkg.data}</p>
                <span className="text-[10px] text-emerald-400 block mt-0.5">الصلاحية: {pkg.validity}</span>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[rgba(245,200,66,0.15)] flex items-center justify-between">
                <span className="text-[15px] font-bold text-[#f5c842] font-mono">
                  {pkg.price.toLocaleString()} ر.ي
                </span>
                <button
                  onClick={() => handlePay(pkg)}
                  className="px-3 py-1.5 bg-[#f5c842] hover:bg-[#f5c842]/90 text-black text-[11px] font-bold rounded-[8px] cursor-pointer transition-transform active:scale-95"
                >
                  تسديد فوري
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YemenTelecomServices;
