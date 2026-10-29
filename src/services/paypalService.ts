export interface PayPalDisputeRecord {
  id: string;
  transactionId: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  itemTitle: string;
  claimReason: 'INCORRECT_SIZE' | 'DAMAGED_TRANSIT' | 'NOT_AS_DESCRIBED' | 'FRAUD_SUSPECTED' | 'PROMPT_INJECTION';
  inspectionGrade: 'Grade A+ (Pristine)' | 'Grade C (Defect Confirmed)' | 'Grade F (Suspicious / Failed)' | 'Grade F (Security Threat / Rejected)';
  disputeStatus: 'RESOLVED_REFUND' | 'RESOLVED_EXCHANGE' | 'ESCALATED_MANUAL_REVIEW' | 'PENDING_EVALUATION';
  paypalActionType: 'CAPTURE_REFUND' | 'REPLACEMENT_ORDER' | 'MERCHANT_ESCROW_LOCK';
  paypalFeeSaved: number;
  latencyMs: number;
  timestamp: string;
  evidenceImageUrl?: string;
  paypalRefundId?: string;
}

export const INITIAL_PAYPAL_DISPUTES: PayPalDisputeRecord[] = [
  {
    id: 'PP-DISP-98421',
    transactionId: 'PAYID-M7K281900192',
    orderNumber: 'ORD-9942',
    customerName: 'Alex Mercer',
    customerEmail: 'alex.mercer@example.com',
    amount: 149.00,
    currency: 'USD',
    itemTitle: 'Nike Air Max 90 Triple White (Size 10.0)',
    claimReason: 'INCORRECT_SIZE',
    inspectionGrade: 'Grade A+ (Pristine)',
    disputeStatus: 'RESOLVED_EXCHANGE',
    paypalActionType: 'REPLACEMENT_ORDER',
    paypalFeeSaved: 20.00,
    latencyMs: 180,
    timestamp: '2026-10-29 18:41:20',
    evidenceImageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    paypalRefundId: 'ORD-EXCH-105-ATL',
  },
  {
    id: 'PP-DISP-98420',
    transactionId: 'PAYID-M7K281900188',
    orderNumber: 'ORD-8814',
    customerName: 'Elena Rostova',
    customerEmail: 'e.rostova@example.com',
    amount: 149.00,
    currency: 'USD',
    itemTitle: 'Patagonia Torrentshell 3L Rain Jacket (M)',
    claimReason: 'DAMAGED_TRANSIT',
    inspectionGrade: 'Grade C (Defect Confirmed)',
    disputeStatus: 'RESOLVED_REFUND',
    paypalActionType: 'CAPTURE_REFUND',
    paypalFeeSaved: 20.00,
    latencyMs: 165,
    timestamp: '2026-10-29 17:15:02',
    evidenceImageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=400&q=80',
    paypalRefundId: 'RFND-9821-4819-2041',
  },
  {
    id: 'PP-DISP-98419',
    transactionId: 'PAYID-M7K281900174',
    orderNumber: 'ORD-8790',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.v@example.com',
    amount: 219.50,
    currency: 'USD',
    itemTitle: 'Sony WH-1000XM5 Wireless Headphones',
    claimReason: 'NOT_AS_DESCRIBED',
    inspectionGrade: 'Grade A+ (Pristine)',
    disputeStatus: 'RESOLVED_REFUND',
    paypalActionType: 'CAPTURE_REFUND',
    paypalFeeSaved: 20.00,
    latencyMs: 194,
    timestamp: '2026-10-29 16:50:11',
    evidenceImageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    paypalRefundId: 'RFND-7714-9901-8842',
  },
  {
    id: 'PP-DISP-98418',
    transactionId: 'PAYID-M7K281900155',
    orderNumber: 'ORD-8721',
    customerName: 'David K. Hoffman',
    customerEmail: 'dhoffman_security@corp.io',
    amount: 890.00,
    currency: 'USD',
    itemTitle: 'iPhone 15 Pro Max 256GB - Titanium',
    claimReason: 'FRAUD_SUSPECTED',
    inspectionGrade: 'Grade F (Suspicious / Failed)',
    disputeStatus: 'ESCALATED_MANUAL_REVIEW',
    paypalActionType: 'MERCHANT_ESCROW_LOCK',
    paypalFeeSaved: 25.00,
    latencyMs: 240,
    timestamp: '2026-10-29 15:32:44',
    evidenceImageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'PP-DISP-98417',
    transactionId: 'PAYID-M7K281900142',
    orderNumber: 'ORD-8650',
    customerName: 'Samantha Lee',
    customerEmail: 'sam.lee@designhub.net',
    amount: 78.00,
    currency: 'USD',
    itemTitle: 'Allbirds Wool Runners - Natural Grey',
    claimReason: 'INCORRECT_SIZE',
    inspectionGrade: 'Grade A+ (Pristine)',
    disputeStatus: 'RESOLVED_EXCHANGE',
    paypalActionType: 'REPLACEMENT_ORDER',
    paypalFeeSaved: 20.00,
    latencyMs: 172,
    timestamp: '2026-10-29 14:10:09',
    evidenceImageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=400&q=80',
    paypalRefundId: 'ORD-EXCH-ALLB-085',
  },
];

/**
 * Execute or simulate a PayPal Sandbox capture refund
 * Endpoint: POST /v2/payments/captures/{capture_id}/refund
 */
export async function executePayPalRefund(
  captureId: string,
  amount: number,
  currency: string = 'USD',
  reason: string = 'Zero-Carbon Return Auto-Settlement'
): Promise<{ success: boolean; refundId: string; status: string; timestamp: string }> {
  // Simulates realistic network round-trip to api-m.sandbox.paypal.com
  await new Promise((resolve) => setTimeout(resolve, 160));

  const refundId = `RFND-${Math.floor(Math.random() * 9000 + 1000)}-${Math.floor(Math.random() * 9000 + 1000)}`;
  return {
    success: true,
    refundId,
    status: 'COMPLETED',
    timestamp: new Date().toISOString(),
  };
}

/**
 * Execute or simulate PayPal $0.00 Instant Replacement Order
 * Endpoint: POST /v2/checkout/orders
 */
export async function executePayPalReplacementOrder(
  sku: string,
  customerEmail: string
): Promise<{ success: boolean; orderId: string; status: string }> {
  await new Promise((resolve) => setTimeout(resolve, 140));

  return {
    success: true,
    orderId: `PAYPAL-ORD-${Math.floor(Math.random() * 900000 + 100000)}`,
    status: 'APPROVED_PREAUTH_HOLD',
  };
}
