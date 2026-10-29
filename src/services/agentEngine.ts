import type { ChannelId, ChatMessage, WebhookTraceEvent } from '../types/index.ts';
import type { PayPalDisputeRecord } from './paypalService.ts';
import { executePayPalRefund, executePayPalReplacementOrder } from './paypalService.ts';

export interface AgentResponse {
  message: ChatMessage;
  traceEvent: WebhookTraceEvent;
  disputeRecord?: PayPalDisputeRecord;
  graphNodeUpdate?: {
    id: string;
    nodeNumber: string;
    title: string;
    offsetTime: string;
    description: string;
    tags: { label: string; color?: 'cyan' | 'emerald' | 'amber' }[];
    status: 'completed';
    icon: string;
  };
}

// In-memory inventory state for realistic ERP interaction
const INVENTORY_DB = {
  'NK-AM90-WHT-105': { name: 'Nike Air Max 90 (US 10.5)', stock: 14, hub: 'ATL-04 Express Hub' },
  'NK-AM90-WHT-110': { name: 'Nike Air Max 90 (US 11.0)', stock: 6, hub: 'ATL-04 Express Hub' },
  'NK-AM90-WHT-095': { name: 'Nike Air Max 90 (US 9.5)', stock: 0, hub: 'CLT-01 Regional' },
};

/**
 * Deterministic Code Gate Validator
 * "Prompt says Yes, Code says No"
 * Evaluates inbound claims against hard security, financial limits, and anti-injection rules
 * before any PayPal tool call can proceed.
 */
export function evaluateCodeGate(query: string, amount: number = 0): {
  passed: boolean;
  violationCode?: string;
  rationale?: string;
} {
  const q = query.toLowerCase();

  // Rule 1: Adversarial Prompt Injection & System Override Defense
  if (
    q.includes('ignore previous') ||
    q.includes('system prompt') ||
    q.includes('system override') ||
    q.includes('disregard') ||
    q.includes('bypass') ||
    q.includes('as an admin') ||
    q.includes('jailbreak') ||
    q.includes('sudo')
  ) {
    return {
      passed: false,
      violationCode: 'PROMPT_INJECTION_ATTEMPT',
      rationale: 'Unauthorized system prompt override syntax detected. Code Gate halted execution.',
    };
  }

  // Rule 2: Suspected Fraud / Exploitation Pattern
  if (
    q.includes('fraud') ||
    q.includes('fake') ||
    q.includes('stolen') ||
    q.includes('free money') ||
    q.includes('loophole') ||
    q.includes('csalás')
  ) {
    return {
      passed: false,
      violationCode: 'FRAUD_INDICATOR_TRIGGERED',
      rationale: 'Pattern matched known chargeback exploitation signature. Escrow locked.',
    };
  }

  // Rule 3: High-Value Autonomous Payout Cap ($250 threshold)
  if (amount > 250.0) {
    return {
      passed: false,
      violationCode: 'EXCEEDS_AUTONOMOUS_PAYOUT_CAP',
      rationale: `Claim amount ($${amount.toFixed(2)}) exceeds autonomous settlement limit ($250.00). Requires Tier-2 Merchant 2FA.`,
    };
  }

  return { passed: true };
}

/**
 * PayPal ResolveAI / Nova Lite Agentic Commerce Dispatcher
 * Evaluates inbound customer claims against return policy rules,
 * authenticates condition via multimodal vision, and executes
 * autonomous PayPal settlements (Disputes, Captures Refund, Replacement Orders).
 */
export async function processCustomerMessage(
  inputText: string,
  currentChannel: ChannelId,
  customerName: string = 'Alex Mercer',
  activeScenarioId: string = 'size_exchange'
): Promise<AgentResponse> {
  const query = inputText.toLowerCase().trim();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const latency = Math.floor(Math.random() * 50) + 150; // 150ms - 200ms realistic Nova Lite latency

  // 0. Pre-Flight Code Gate Check: Adversarial Injection or Fraud Filter
  const gateResult = evaluateCodeGate(query, activeScenarioId === 'damaged_claim' ? 149.0 : 0);
  if (!gateResult.passed) {
    const isInjection = gateResult.violationCode === 'PROMPT_INJECTION_ATTEMPT';
    const disputeRecord: PayPalDisputeRecord = {
      id: `PP-DISP-${Math.floor(Math.random() * 90000) + 10000}`,
      transactionId: `PAYID-M7K${Math.floor(Math.random() * 9000000) + 1000000}`,
      orderNumber: 'ORD-8721',
      customerName,
      customerEmail: 'security_audit@sentinel.io',
      amount: isInjection ? 5000.0 : 890.0,
      currency: 'USD',
      itemTitle: isInjection ? 'Adversarial Injection Attack Blocked' : 'Flagged High-Value Hardware Claim',
      claimReason: isInjection ? 'PROMPT_INJECTION' : 'FRAUD_SUSPECTED',
      inspectionGrade: 'Grade F (Security Threat / Rejected)',
      disputeStatus: 'ESCALATED_MANUAL_REVIEW',
      paypalActionType: 'MERCHANT_ESCROW_LOCK',
      paypalFeeSaved: 35.0,
      latencyMs: latency,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };

    const replyMsg: ChatMessage = {
      id: `agent-${Date.now()}`,
      sender: 'agent',
      channel: currentChannel,
      timestamp,
      text: isInjection
        ? `[Security Guard Active] Execution rejected by Code Gate: ${gateResult.rationale} Autonomous settlement disabled under PayPal Risk Control Directive #441.`
        : 'Our AI Governance Code Gate detected an anomaly in this claim. Under PayPal Seller Protection rules, automated payout is locked. This incident has been escalated to Tier-2 Merchant Review in the AG Grid dispute ledger.',
      card: {
        title: isInjection ? 'Adversarial Attack Blocked' : 'PayPal Dispute Escalated to Merchant',
        subtitle: 'Automated Payout Locked (Code Gate Active)',
        specs: [
          { label: 'Security Flag', value: gateResult.violationCode || 'Security Violation' },
          { label: 'Dispute Status', value: 'UNDER_MERCHANT_REVIEW' },
          { label: 'Merchant Protection', value: 'Active ($0.00 Liability)' },
        ],
        primaryCta: 'View AG Grid Ledger Audit',
        actionType: 'confirm_exchange',
      },
    };

    const traceEvent: WebhookTraceEvent = {
      id: `TR-${Math.floor(Math.random() * 90000) + 10000}`,
      timestamp: new Date().toISOString().substring(11, 23),
      channel: 'PayPal Disputes API',
      event: isInjection ? 'security.injection_defense_block' : 'dispute.fraud_guard_lock',
      latencyMs: latency,
      status: '403 FORBIDDEN (Blocked by Code Gate)',
      region: 'us-east-1',
      payloadSnippet: JSON.stringify({
        action: 'escrow_lock',
        reason: gateResult.violationCode,
        code_gate: 'ENFORCED',
        rationale: gateResult.rationale,
      }),
    };

    return { message: replyMsg, traceEvent, disputeRecord };
  }

  // 2. Intent: Size Exchange / Swap (PayPal $0.00 Replacement Order)
  if (
    query.includes('size') ||
    query.includes('méret') ||
    query.includes('exchange') ||
    query.includes('swap') ||
    query.includes('pinch') ||
    query.includes('tight') ||
    query.includes('szorít') ||
    query.includes('10.5') ||
    query.includes('11')
  ) {
    const requestedSize = query.includes('11') ? '11.0' : '10.5';
    const skuKey = requestedSize === '11.0' ? 'NK-AM90-WHT-110' : 'NK-AM90-WHT-105';
    const item = INVENTORY_DB[skuKey];

    // Execute PayPal replacement order simulation
    const ppOrder = await executePayPalReplacementOrder(skuKey, 'alex.m@example.com');

    const disputeRecord: PayPalDisputeRecord = {
      id: `PP-DISP-${Math.floor(Math.random() * 90000) + 10000}`,
      transactionId: `PAYID-M7K${Math.floor(Math.random() * 9000000) + 1000000}`,
      orderNumber: 'ORD-9942',
      customerName,
      customerEmail: 'alex.mercer@example.com',
      amount: 149.0,
      currency: 'USD',
      itemTitle: `Nike Air Max 90 Triple White (Size ${requestedSize})`,
      claimReason: 'INCORRECT_SIZE',
      inspectionGrade: 'Grade A+ (Pristine)',
      disputeStatus: 'RESOLVED_EXCHANGE',
      paypalActionType: 'REPLACEMENT_ORDER',
      paypalFeeSaved: 20.0,
      latencyMs: latency,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      paypalRefundId: ppOrder.orderId,
    };

    const replyMsg: ChatMessage = {
      id: `agent-${Date.now()}`,
      sender: 'agent',
      channel: currentChannel,
      timestamp,
      text: `Checked inventory for size ${requestedSize}. We have ${item.stock} units in stock at ${item.hub}. Through PayPal Agentic Commerce, I have pre-authorized a $0.00 replacement order (ID: #${ppOrder.orderId}). Would you like to lock this in with a drop-off locker pass?`,
      card: {
        title: `PayPal Replacement: Air Max 90 (Size ${requestedSize})`,
        subtitle: 'Pre-Authorized $0.00 Order Placed',
        specs: [
          { label: 'Reserved Item', value: item.name },
          { label: 'PayPal Order ID', value: ppOrder.orderId },
          { label: 'Return Fee', value: '$0.00 (Waived)' },
        ],
        primaryCta: `Confirm Size ${requestedSize} Swap`,
        secondaryCta: 'Switch to RCS for Locker Pass',
        actionType: 'confirm_exchange',
      },
    };

    const traceEvent: WebhookTraceEvent = {
      id: `TR-${Math.floor(Math.random() * 90000) + 10000}`,
      timestamp: new Date().toISOString().substring(11, 23),
      channel: currentChannel === 'whatsapp' ? 'WhatsApp EUM' : 'RCS Google Jibe',
      event: 'paypal.orders.create_replacement',
      latencyMs: latency,
      status: '200 OK',
      region: 'us-east-1',
      payloadSnippet: `{"action": "create_order", "sku": "${skuKey}", "paypalOrderId": "${ppOrder.orderId}"}`,
    };

    return { message: replyMsg, traceEvent, disputeRecord };
  }

  // 3. Intent: Damaged / Broken Defect (PayPal Instant Capture Refund)
  if (
    query.includes('damage') ||
    query.includes('sérült') ||
    query.includes('broken') ||
    query.includes('tear') ||
    query.includes('zipper') ||
    query.includes('szakadt') ||
    query.includes('faulty') ||
    query.includes('stain')
  ) {
    // Execute PayPal capture refund simulation
    const ppRefund = await executePayPalRefund('CAPTURE-99124-ATL', 149.0);

    const disputeRecord: PayPalDisputeRecord = {
      id: `PP-DISP-${Math.floor(Math.random() * 90000) + 10000}`,
      transactionId: `PAYID-M7K${Math.floor(Math.random() * 9000000) + 1000000}`,
      orderNumber: 'ORD-8814',
      customerName,
      customerEmail: 'elena.rostova@example.com',
      amount: 149.0,
      currency: 'USD',
      itemTitle: 'Patagonia Torrentshell 3L (Delamination Defect)',
      claimReason: 'DAMAGED_TRANSIT',
      inspectionGrade: 'Grade C (Defect Confirmed)',
      disputeStatus: 'RESOLVED_REFUND',
      paypalActionType: 'CAPTURE_REFUND',
      paypalFeeSaved: 20.0,
      latencyMs: latency,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      paypalRefundId: ppRefund.refundId,
    };

    const replyMsg: ChatMessage = {
      id: `agent-${Date.now()}`,
      sender: 'agent',
      channel: currentChannel,
      timestamp,
      text: `Defect verified against quality threshold. Under our Zero-Carbon Settlement Policy, return shipping exceeds salvage value. I have executed an instant PayPal Capture Refund (ID: #${ppRefund.refundId}) of $149.00 directly to your PayPal account. You may keep or donate the item.`,
      card: {
        title: 'PayPal Capture Refund Executed',
        subtitle: '100% Refund Dispatched to PayPal Wallet',
        specs: [
          { label: 'Refund Amount', value: '$149.00 USD' },
          { label: 'PayPal Refund ID', value: ppRefund.refundId },
          { label: 'Carbon Avoided', value: '3.8 kg CO2e' },
        ],
        primaryCta: 'View PayPal Transaction Receipt',
        secondaryCta: 'View Donation Guide',
        actionType: 'confirm_exchange',
      },
    };

    const traceEvent: WebhookTraceEvent = {
      id: `TR-${Math.floor(Math.random() * 90000) + 10000}`,
      timestamp: new Date().toISOString().substring(11, 23),
      channel: 'PayPal Payments API',
      event: 'paypal.payments.captures.refund',
      latencyMs: latency,
      status: '200 OK',
      region: 'us-east-1',
      payloadSnippet: `{"refundId": "${ppRefund.refundId}", "amount": 149.00, "status": "COMPLETED"}`,
    };

    return { message: replyMsg, traceEvent, disputeRecord };
  }

  // 4. Intent: Policy / Return Window / Drop-off FAQ
  if (
    query.includes('how') ||
    query.includes('hogyan') ||
    query.includes('policy') ||
    query.includes('szabály') ||
    query.includes('days') ||
    query.includes('nap') ||
    query.includes('drop') ||
    query.includes('where') ||
    query.includes('hol')
  ) {
    const replyMsg: ChatMessage = {
      id: `agent-${Date.now()}`,
      sender: 'agent',
      channel: currentChannel,
      timestamp,
      text: 'All orders processed through PayPal Checkout are protected by our 30-day Free Return & Instant Resolution guarantee. Drop-offs are touchless at 2,400+ Whole Foods Lockers and UPS Store locations with label-free QR codes.',
      card: {
        title: 'PayPal Buyer Protection Guarantee',
        subtitle: 'Label-Free & Touchless Drop-Off',
        specs: [
          { label: 'Eligible Window', value: '30 Days from Delivery' },
          { label: 'Settlement Option', value: 'Instant PayPal Refund / Swap' },
          { label: 'Fee', value: '$0.00 (Free)' },
        ],
        primaryCta: 'Locate Nearest Drop-Off',
        actionType: 'view_locker',
      },
    };

    const traceEvent: WebhookTraceEvent = {
      id: `TR-${Math.floor(Math.random() * 90000) + 10000}`,
      timestamp: new Date().toISOString().substring(11, 23),
      channel: currentChannel === 'whatsapp' ? 'WhatsApp EUM' : 'RCS Google Jibe',
      event: 'policy.faq_lookup',
      latencyMs: latency,
      status: '200 OK',
      region: 'us-east-1',
      payloadSnippet: '{"topic": "paypal_buyer_protection_return_policy"}',
    };

    return { message: replyMsg, traceEvent };
  }

  // 5. Intent: Tracking / Order Status
  if (
    query.includes('track') ||
    query.includes('status') ||
    query.includes('hol tart') ||
    query.includes('csomag') ||
    query.includes('when') ||
    query.includes('mikor')
  ) {
    const replyMsg: ChatMessage = {
      id: `agent-${Date.now()}`,
      sender: 'agent',
      channel: currentChannel,
      timestamp,
      text: 'Your exchange replacement shipment: UPS Ground #1Z992A010928419201. Your package departed ATL-04 hub and delivery is scheduled for tomorrow before 2:00 PM. Linked to PayPal Transaction #PAYID-M7K281900192.',
      card: {
        title: 'PayPal Order Shipment Tracking',
        subtitle: 'UPS Ground Express',
        specs: [
          { label: 'Tracking Number', value: '1Z992A010928419201' },
          { label: 'PayPal TxID', value: 'PAYID-M7K281900192' },
          { label: 'ETA', value: 'Tomorrow, by 2:00 PM' },
        ],
        primaryCta: 'View Live Carrier Map',
        actionType: 'view_locker',
      },
    };

    const traceEvent: WebhookTraceEvent = {
      id: `TR-${Math.floor(Math.random() * 90000) + 10000}`,
      timestamp: new Date().toISOString().substring(11, 23),
      channel: 'SMS AWS EUM',
      event: 'carrier.get_shipment_status',
      latencyMs: latency,
      status: '200 OK',
      region: 'us-east-1',
      payloadSnippet: '{"carrier": "UPS", "tracking": "1Z992A010928419201", "status": "IN_TRANSIT"}',
    };

    return { message: replyMsg, traceEvent };
  }

  // 6. General fallback
  const replyMsg: ChatMessage = {
    id: `agent-${Date.now()}`,
    sender: 'agent',
    channel: currentChannel,
    timestamp,
    text: `I've accessed your PayPal order #${activeScenarioId === 'damaged_claim' ? 'ORD-7712' : 'ORD-9942'}. I can execute an instant PayPal refund, arrange a size exchange with zero return shipping, or escalate a damaged item claim. How can I resolve this for you?`,
    card: {
      title: 'PayPal ResolveAI Assistant',
      subtitle: 'Order #ORD-9942 Verified via PayPal Sandbox',
      specs: [
        { label: 'Eligible Action', value: 'Instant PayPal Refund / Exchange' },
        { label: 'Protection', value: 'PayPal Buyer & Merchant Guarantee' },
        { label: 'Adjudicator', value: 'Amazon Nova Lite (Bedrock)' },
      ],
      primaryCta: 'Initiate Size Exchange',
      secondaryCta: 'Report a Damaged Item',
      actionType: 'confirm_exchange',
    },
  };

  const traceEvent: WebhookTraceEvent = {
    id: `TR-${Math.floor(Math.random() * 90000) + 10000}`,
    timestamp: new Date().toISOString().substring(11, 23),
    channel: currentChannel === 'whatsapp' ? 'WhatsApp EUM' : 'RCS Google Jibe',
    event: 'agentcore.general_triage',
    latencyMs: latency,
    status: '200 OK',
    region: 'us-east-1',
    payloadSnippet: `{"query": "${inputText.substring(0, 40)}", "model": "amazon.nova-lite-v1:0"}`,
  };

  return { message: replyMsg, traceEvent };
}
