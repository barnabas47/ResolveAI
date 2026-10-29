import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, Zap, ShieldCheck, Activity, DollarSign } from 'lucide-react';

interface BentoMetricsProps {
  scenarioId: string;
}

export const BentoMetrics: React.FC<BentoMetricsProps> = ({ scenarioId }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Resolution Rate */}
      <div className="rounded-xl bg-[#13141a] border border-white/[0.08] p-5 hover:border-[#00dce6]/40 transition-colors">
        <div className="flex items-center justify-between text-neutral-400 pb-1">
          <span className="text-xs text-neutral-300 font-medium">
            Resolution Rate
          </span>
          <span className="px-2 py-0.5 rounded bg-[#00dce6]/10 border border-[#00dce6]/20 text-[#00dce6] text-xs font-medium">
            Autonomous
          </span>
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <div className="font-display text-3xl font-bold text-white tracking-tight">
            {scenarioId === 'damaged_claim' ? '96.8%' : '94.2%'}
          </div>
          <div className="flex items-center gap-1 text-[#10b981] text-xs font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+4.8% vs BPO</span>
          </div>
        </div>

        {/* Micro Sparkline */}
        <div className="mt-3 pt-1 flex items-center justify-between">
          <svg className="w-full h-7 text-[#00dce6]" fill="none" viewBox="0 0 160 28">
            <path
              d="M0 24 L22 20 L44 22 L66 14 L88 18 L110 9 L132 12 L160 3"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="w-full h-0.5 bg-[#00dce6]/30 rounded-full mt-2" />
      </div>

      {/* Card 2: Response Latency */}
      <div className="rounded-xl bg-[#13141a] border border-white/[0.08] p-5 hover:border-cyan-400/40 transition-colors">
        <div className="flex items-center justify-between text-neutral-400 pb-1">
          <span className="text-xs text-neutral-300 font-medium">
            Agent Latency
          </span>
          <span className="flex items-center gap-1.5 text-xs text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00dce6]" />
            Amazon Nova Lite
          </span>
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <div className="font-display text-3xl font-bold text-white tracking-tight">
            180
            <span className="text-sm font-normal text-neutral-400 ml-1">ms</span>
          </div>
          <div className="text-neutral-400 text-xs">Jitter: ±8ms</div>
        </div>

        {/* Latency breakdown */}
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-xs text-neutral-400">
            <span>Vision: 95ms</span>
            <span>CDS API: 45ms</span>
          </div>
          <div className="w-full bg-white/[0.08] rounded-full h-1.5 overflow-hidden flex">
            <div className="bg-[#00dce6] h-full" style={{ width: '53%' }} />
            <div className="bg-cyan-600 h-full" style={{ width: '25%' }} />
            <div className="bg-neutral-600 h-full" style={{ width: '22%' }} />
          </div>
        </div>
        <div className="w-full h-0.5 bg-cyan-600/30 rounded-full mt-2" />
      </div>

      {/* Card 3: Channel Handoff Success */}
      <div className="rounded-xl bg-[#13141a] border border-white/[0.08] p-5 hover:border-emerald-500/40 transition-colors">
        <div className="flex items-center justify-between text-neutral-400 pb-1">
          <span className="text-xs text-neutral-300 font-medium">
            Omnichannel Handoff
          </span>
          <span className="text-xs text-[#00dce6] flex items-center gap-1">
            WhatsApp <ArrowRight className="w-3 h-3" /> RCS
          </span>
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <div className="font-display text-3xl font-bold text-white tracking-tight">99.8%</div>
          <div className="text-xs text-neutral-400">1,420 / 1,423 Evts</div>
        </div>

        {/* Channel Pathway */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-300">
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300">WA Bot</span>
          <ArrowRight className="w-3 h-3 text-neutral-500" />
          <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300">RCS Card</span>
          <ArrowRight className="w-3 h-3 text-neutral-500" />
          <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-neutral-300">SES Slip</span>
        </div>
        <div className="w-full h-0.5 bg-emerald-500/30 rounded-full mt-2" />
      </div>

      {/* Card 4: Cost per Ticket */}
      <div className="rounded-xl bg-[#13141a] border border-white/[0.08] p-5 hover:border-cyan-500/40 transition-colors">
        <div className="flex items-center justify-between text-neutral-400 pb-1">
          <span className="text-xs text-neutral-300 font-medium">
            Handling Cost
          </span>
          <span className="px-2 py-0.5 rounded bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] text-xs font-semibold">
            99.9% Savings
          </span>
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <div className="font-display text-3xl font-bold text-[#00dce6] tracking-tight">$0.0004</div>
          <div className="line-through text-neutral-500 text-xs">$5.80 BPO</div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
          <span>Tokens: ~412 in/out</span>
          <span className="text-[#00dce6]">Nova Lite Serverless</span>
        </div>
        <div className="w-full h-0.5 bg-[#00dce6]/40 rounded-full mt-2" />
      </div>
    </div>
  );
};
