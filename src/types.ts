export interface Transaction {
  id: string;
  type: 'transfer' | 'deposit' | 'bill' | 'telecom' | 'card_load' | 'payout' | 'reconciliation';
  amount: number;
  currency: 'YER' | 'SAR' | 'USD';
  sender: string;
  recipient: string;
  recipientName?: string;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'flagged' | 'rejected';
  referenceNo: string;
  category: string;
  notes?: string;
  riskScore?: number;
}

export interface ApprovalRequest {
  id: string;
  title: string;
  type: 'transfer' | 'payout' | 'limit_increase' | 'reconciliation';
  amount: number;
  currency: string;
  initiator: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
  urgency: 'high' | 'normal' | 'critical';
  details: string;
}

export interface TelecomPackage {
  id: string;
  provider: 'yemen_mobile' | 'you' | 'sabafon' | 'yemen_net' | 'aden_net';
  name: string;
  price: number;
  validity: string;
  data: string;
  minutes?: string;
  category: 'internet' | 'combo' | 'credit' | 'fiber';
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  holderName: string;
  balance: number;
  currency: string;
  status: 'connected' | 'syncing' | 'offline';
  lastSync: string;
}

export interface VirtualCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  balance: number;
  currency: 'USD' | 'YER';
  status: 'active' | 'frozen' | 'cancelled';
  spendingLimit: number;
}

export interface SovereignMetric {
  title: string;
  value: string;
  change: string;
  status: 'positive' | 'warning' | 'neutral';
}

export interface CustomerServicePerms {
  canTransfer: boolean;
  canReceive: boolean;
  canRechargeTelecom: boolean;
  canWithdrawCash: boolean;
  canIssueVirtualCard: boolean;
}

export interface Customer {
  id: string;
  accountNumber: string;
  fullName: string;
  phoneNumber: string;
  nationalId: string;
  category: 'individual' | 'merchant' | 'agent' | 'enterprise';
  balance: number;
  currency: 'YER' | 'USD' | 'SAR';
  status: 'active' | 'frozen' | 'suspended' | 'pending_kyc';
  kycTier: 'Tier 1 (مبدئي)' | 'Tier 2 (موثق بالهوية)' | 'Tier 3 (تاجر معتمد)';
  dailyLimit: number;
  monthlyLimit: number;
  registeredDate: string;
  lastActive: string;
  services: CustomerServicePerms;
  totalTransfersIn: number;
  totalTransfersOut: number;
  riskScore: number;
  notes?: string;
  heldAmount?: number; // المبالغ المحجوزة
}

export interface RegistrationRequest {
  id: string;
  applicantName: string;
  phoneNumber: string;
  nationalId: string;
  accountType: 'individual' | 'merchant' | 'agent';
  city: string;
  idCardDoc: string;
  commercialRecord?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  assignedTier: 'Tier 1 (مبدئي)' | 'Tier 2 (موثق بالهوية)' | 'Tier 3 (تاجر معتمد)';
  initialDailyLimit: number;
}

export interface FinancialHold {
  id: string;
  customerId: string;
  customerName: string;
  accountNumber: string;
  amount: number;
  currency: string;
  reason: string;
  legalReference: string;
  createdAt: string;
  expiresAt: string;
  status: 'active' | 'released' | 'confiscated';
  authorizedBy: string;
}

export interface GovernmentService {
  id: string;
  name: string;
  agencyName: string;
  category: 'utilities' | 'traffic' | 'customs' | 'education' | 'civil' | 'commercial';
  description: string;
  accountLabel: string;
  accountPlaceholder: string;
  fixedFee?: number;
  status: 'active' | 'maintenance' | 'coming_soon';
  apiConnected: boolean;
  totalPaidCount: number;
  totalAmountCollected: number;
  iconType: string;
}

export interface SmsNotification {
  id: string;
  recipientPhone: string;
  recipientName: string;
  title: string;
  message: string;
  type: 'kyc' | 'transaction' | 'security' | 'hold' | 'broadcast';
  sentAt: string;
  status: 'delivered' | 'pending' | 'failed';
  channel: 'SMS Gateway' | 'Push In-App' | 'WhatsApp';
}


