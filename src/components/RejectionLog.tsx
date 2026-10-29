import React, { useState } from 'react';
import { ShieldCheck, Filter, Undo2, CheckCircle2, EyeOff } from 'lucide-react';

export interface RejectionItem {
  id: string;
  source: string;
  title: string;
  timestamp: string;
  rejectionReason: string;
  category: string;
  confidence: number;
}

const DEFAULT_REJECTIONS: RejectionItem[] = [
  {
    id: 'rej-1',
    source: 'Inbound WhatsApp Stream',
    title: 'Automated SEO marketing pitch from unverified number',
    timestamp: 'Today, 14:22',
    rejectionReason: 'Intent classified as non-transactional marketing spam. Trapped silently.',
    category: 'Spam Bot Filter',
    confidence: 0.99,
  },
  {
    id: 'rej-2',
    source: 'PayPal Webhook Stream',
    title: 'Duplicate Capture Webhook Event (#PAYID-M7K281900192)',
    timestamp: 'Today, 13:48',
    rejectionReason: 'Idempotency key already committed to AG Grid ledger. Dropped replay event.',
    category: 'Replay Protection',
    confidence: 1.0,
  },
  {
    id: 'rej-3',
    source: 'Customer Inbound RCS',
    title: 'Claim inquiry for third-party marketplace purchase (Etsy order)',
    timestamp: 'Today, 11:15',
    rejectionReason: 'Transaction ID not present in merchant PayPal ledger. Dispatched referral FAQ.',
    category: 'Merchant Mismatch',
    confidence: 0.98,
  },
  {
    id: 'rej-4',
    source: 'Carrier Telemetry (UPS Ground)',
    title: 'Routine depot sort scan #1Z992A010928419201',
    timestamp: 'Today, 09:30',
    rejectionReason: 'In-transit status normal; no buyer delivery delay detected.',
    category: 'Carrier Informational',
    confidence: 0.96,
  },
];

export const RejectionLog: React.FC = () => {
  const [items, setItems] = useState<RejectionItem[]>(DEFAULT_REJECTIONS);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(items.map((i) => i.category)))];
  const filteredItems = activeCategory === 'all' ? items : items.filter((i) => i.category === activeCategory);

  const handleOverturn = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#121319] p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-[#00dce6]" />
            <h3 className="text-base font-semibold text-white tracking-tight font-display">
              Silence is the Product · Rejection &amp; Noise Triage Log
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Background events filtered silently without human merchant interruption.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-md bg-white/[0.04] px-2.5 py-1 text-neutral-300 border border-white/[0.08]">
            {items.length} Silent Actions
          </span>
          <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-emerald-400 border border-emerald-500/20 font-medium">
            96.2% Noise Filtered
          </span>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`min-h-[32px] px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-white/[0.12] text-white border border-white/[0.2]'
                : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-transparent'
            }`}
          >
            {cat === 'all' ? 'All Filtered Events' : cat}
          </button>
        ))}
      </div>

      {/* Rejection List */}
      <div className="space-y-2.5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="rounded-lg bg-black/40 border border-white/[0.06] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/[0.12] transition-colors"
          >
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-white tracking-tight">
                  {item.title}
                </span>
                <span className="px-2 py-0.2 rounded bg-white/[0.04] text-[10px] text-neutral-400">
                  {item.source}
                </span>
                <span className="text-[10px] text-neutral-500">
                  {item.timestamp}
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {item.rejectionReason}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-medium">
                Confidence: {(item.confidence * 100).toFixed(0)}%
              </span>
              <button
                onClick={() => handleOverturn(item.id)}
                className="min-h-[32px] px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white text-xs transition-colors border border-white/[0.06] flex items-center gap-1"
                title="Overturn filter and escalate to manual review"
              >
                <Undo2 className="w-3 h-3" />
                <span>Overturn</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
