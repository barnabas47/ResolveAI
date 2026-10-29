'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Terminal, Cpu, CheckCircle2, X, Zap, ShieldCheck } from 'lucide-react';

export interface TraceStep {
  name: string;
  durationMs: number;
  status: 'done' | 'running' | 'idle';
  detail?: string;
}

interface LiveAIInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  modelName?: string;
  latencyMs?: number;
  tokensPerSec?: number;
  steps?: TraceStep[];
}

export const LiveAIInspector: React.FC<LiveAIInspectorProps> = ({
  isOpen,
  onClose,
  modelName = 'Amazon Nova Lite (Bedrock) · Multimodal',
  latencyMs = 180,
  tokensPerSec = 185,
  steps = [
    { name: 'AWS CDS Inbound Webhook', durationMs: 14, status: 'done', detail: 'Received customer claim payload' },
    { name: 'Nova Lite Multimodal Inspection', durationMs: 95, status: 'done', detail: 'Condition Grade A+ verified' },
    { name: 'ERP Inventory Reserve Hold', durationMs: 45, status: 'done', detail: 'Reserved replacement SKU' },
    { name: 'PayPal Orders Pre-Authorization', durationMs: 26, status: 'done', detail: 'Executed POST /v2/checkout/orders' },
  ],
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        data-ui="live-ai-inspector-drawer"
        className="relative h-full w-full max-w-md bg-[#0e0f14] flex flex-col p-6 space-y-5 overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00dce6]/10 border border-[#00dce6]/25 flex items-center justify-center text-[#00dce6]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight">
                Live AI Inference Inspector
              </h3>
              <p className="text-[11px] text-neutral-400">
                Synchronous multi-agent execution telemetry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Specs Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1">
            <span className="text-[11px] text-neutral-400">Foundation Model</span>
            <div className="text-xs font-semibold text-white">Nova Lite 1.0</div>
            <div className="text-[10px] text-neutral-500">amazon.nova-lite-v1:0</div>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1">
            <span className="text-[11px] text-neutral-400">Inference Latency</span>
            <div className="text-xs font-semibold text-[#00dce6] flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>{latencyMs}ms end-to-end</span>
            </div>
            <div className="text-[10px] text-neutral-500">{tokensPerSec} tokens / sec</div>
          </div>
        </div>

        {/* Pipeline Step Traces */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-neutral-300 font-medium">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#00dce6]" />
              Execution Pipeline Trace
            </span>
            <span className="text-[11px] text-neutral-500">{steps.length} Steps Completed</span>
          </div>

          <div className="space-y-2">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-black/40 border border-white/[0.06] p-3 space-y-1 hover:border-white/[0.12] transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-neutral-200 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{step.name}</span>
                  </span>
                  <span className="text-[11px] text-[#00dce6]">{step.durationMs}ms</span>
                </div>
                {step.detail && (
                  <p className="text-[11px] text-neutral-400 pl-5 leading-relaxed">
                    {step.detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-auto pt-4 flex items-center justify-between text-[11px] text-neutral-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            Deterministic Code Gate Active
          </span>
          <button
            onClick={onClose}
            className="min-h-[32px] px-3 py-1 rounded bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </motion.div>
    </div>
  );
};
