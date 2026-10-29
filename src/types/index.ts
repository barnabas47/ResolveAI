export type ScenarioId = 'size_exchange' | 'damaged_claim' | 'instant_demo';

export type ChannelId = 'whatsapp' | 'rcs' | 'sms';

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'agent' | 'system';
  channel: ChannelId;
  timestamp: string;
  text?: string;
  image?: string;
  imageBadge?: string;
  card?: {
    title: string;
    subtitle: string;
    specs: { label: string; value: string }[];
    primaryCta?: string;
    secondaryCta?: string;
    actionType?: 'confirm_exchange' | 'switch_rcs' | 'view_locker';
  };
  pillNotice?: {
    icon: string;
    title: string;
    description: string;
  };
}

export interface TraceNode {
  id: string;
  nodeNumber: string;
  title: string;
  offsetTime: string;
  description: string;
  tags: { label: string; color?: string }[];
  status: 'completed' | 'active' | 'pending';
  icon: string;
  accentColor: 'cyan' | 'purple' | 'amber' | 'emerald' | 'rose';
  rawPayload?: Record<string, any>;
}

export interface MetricCardData {
  title: string;
  badgeText: string;
  badgeVariant: 'primary' | 'secondary' | 'success';
  mainValue: string;
  unit?: string;
  deltaText: string;
  deltaPositive?: boolean;
  subDetail: string;
  sparkline?: number[];
  progressBreakdown?: { label: string; percent: number; color: string }[];
}

export interface ScenarioData {
  id: ScenarioId;
  name: string;
  badge: string;
  description: string;
  initialChannel: ChannelId;
  sessionCode: string;
  customerName: string;
  customerPhone: string;
  sku: string;
  productName: string;
  productImage: string;
  inspectionResult: {
    grade: string;
    confidence: string;
    notes: string;
  };
  messages: ChatMessage[];
  traceNodes: TraceNode[];
  rawBedrockPayload: Record<string, any>;
}

export interface WebhookTraceEvent {
  id: string;
  timestamp: string;
  latencyMs: number;
  channel: string;
  event: string;
  status: '200 OK' | '201 Created' | '202 Accepted' | '403 FORBIDDEN (Blocked by Code Gate)' | string;
  sourceIp?: string;
  region: string;
  payloadSnippet: string;
}
