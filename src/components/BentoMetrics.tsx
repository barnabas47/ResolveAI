import React from 'react';
import { TrendingUp, ShieldCheck, Zap, DollarSign } from 'lucide-react';

interface BentoMetricsProps {
  scenarioId: string;
}

export const BentoMetrics: React.FC<BentoMetricsProps> = ({ scenarioId }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Card 1: Autonomous Dispute Resolution */}
      <div className="rounded-xl bg-[#121319] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/[0.16] transition-colors">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-neutral-300">
            Resolution Rate
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#00dce6]/10 text-[#00dce6] border border-[#00dce6]/20">
            Autonomous
          </span>
        </div>

        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white font-display">
              {scenarioId === 'damaged_claim' ? '96.8%' : '94.2%'}
            </span>
            <span className="text-xs text-emerald-400 font-medium inline-flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              +4.8%
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Settled before formal PayPal dispute
          </p>
        </div>

        {/* Crisp Line Bar */}
        <div className="w-full bg-white/[0.06] rounded-full h-1 overflow-hidden">
          <div className="bg-[#00dce6] h-full rounded-full" style={{ width: '94%' }} />
        </div>
      </div>

      {/* Card 2: PayPal Dispute Fees Saved */}
      <div className="rounded-xl bg-[#121319] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/[0.16] transition-colors">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-neutral-300">
            Dispute Fees Saved
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Pre-Chargeback
          </span>
        </div>

        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white font-display">
              $105.00
            </span>
            <span className="text-xs text-neutral-400">
              (5 claims waived)
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Avoided $20.00 standard merchant fee
          </p>
        </div>

        {/* Crisp Line Bar */}
        <div className="w-full bg-white/[0.06] rounded-full h-1 overflow-hidden">
          <div className="bg-emerald-400 h-full rounded-full" style={{ width: '82%' }} />
        </div>
      </div>

      {/* Card 3: Adjudication Latency */}
      <div className="rounded-xl bg-[#121319] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/[0.16] transition-colors">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-neutral-300">
            Inference Latency
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-white/[0.04] text-neutral-300 border border-white/[0.08] flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#00dce6]" />
            Nova Lite
          </span>
        </div>

        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white font-display">
              180
            </span>
            <span className="text-sm font-normal text-neutral-400">ms</span>
            <span className="text-xs text-neutral-500">±8ms jitter</span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Multimodal condition &amp; OCR verification
          </p>
        </div>

        {/* Crisp Line Bar */}
        <div className="w-full bg-white/[0.06] rounded-full h-1 overflow-hidden">
          <div className="bg-cyan-400 h-full rounded-full" style={{ width: '68%' }} />
        </div>
      </div>

      {/* Card 4: Handling Cost per Resolution */}
      <div className="rounded-xl bg-[#121319] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/[0.16] transition-colors">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-neutral-300">
            Unit Resolution Cost
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            99.9% Savings
          </span>
        </div>

        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-[#00dce6] font-display">
              $0.0004
            </span>
            <span className="text-xs line-through text-neutral-500">
              $5.80 BPO
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Serverless compute vs manual human tier
          </p>
        </div>

        {/* Crisp Line Bar */}
        <div className="w-full bg-white/[0.06] rounded-full h-1 overflow-hidden">
          <div className="bg-[#00dce6] h-full rounded-full" style={{ width: '99%' }} />
        </div>
      </div>
    </div>
  );
};
