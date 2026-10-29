import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitFork,
  Code2,
  ChevronDown,
  ChevronUp,
  Radio,
  Eye,
  Database,
  ArrowRightLeft,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import { TraceNode } from '../types';

interface ExecutionGraphProps {
  nodes: TraceNode[];
  rawPayload: Record<string, any>;
}

export const ExecutionGraph: React.FC<ExecutionGraphProps> = ({ nodes, rawPayload }) => {
  const [showJson, setShowJson] = useState(false);
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'call_received':
        return <Radio className="w-4 h-4 text-[#00dce6]" />;
      case 'visibility':
      case 'search_check':
        return <Eye className="w-4 h-4 text-[#00dce6]" />;
      case 'database':
      case 'eco':
        return <Database className="w-4 h-4 text-[#00dce6]" />;
      case 'swap_horiz':
      case 'send':
        return <ArrowRightLeft className="w-4 h-4 text-cyan-400" />;
      case 'local_shipping':
      case 'verified':
        return <Truck className="w-4 h-4 text-[#10b981]" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-[#00dce6]" />;
    }
  };

  return (
    <div className="rounded-xl bg-[#13141a] border border-white/[0.08] p-5 lg:p-6 space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00dce6]/10 border border-[#00dce6]/30 flex items-center justify-center text-[#00dce6]">
            <GitFork className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-base text-white tracking-tight">
              PayPal ResolveAI Autonomous Trace Graph
            </h2>
            <p className="text-xs text-neutral-400">
              Deterministic Graph with Bedrock ActionGroups &amp; PayPal Settlement Hooks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowJson(!showJson)}
            className="min-h-[36px] flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 text-xs transition-colors border border-white/[0.08]"
          >
            <Code2 className="w-3.5 h-3.5 text-[#00dce6]" />
            <span>{showJson ? 'Hide Payload JSON' : 'View Event JSON'}</span>
            {showJson ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          <div className="min-h-[36px] px-2.5 py-1 rounded bg-[#00dce6]/15 border border-[#00dce6]/30 text-[#00dce6] text-xs flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00dce6]" />
            <code>EXEC_OK</code>
          </div>
        </div>
      </div>

      {/* Raw Bedrock JSON Drawer */}
      <AnimatePresence>
        {showJson && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-lg bg-[#0c0d12] border border-white/[0.08] p-4 text-xs text-neutral-300"
          >
            <div className="flex items-center justify-between pb-2 mb-2 text-[#00dce6] text-xs">
              <span className="font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00dce6]" />
                PayPal Sandbox API Invocation &amp; Bedrock Settlement
              </span>
              <code className="text-neutral-500 text-[11px]">api-m.sandbox.paypal.com</code>
            </div>
            <pre className="font-mono overflow-x-auto text-neutral-300 max-h-56 leading-relaxed">
              {JSON.stringify(rawPayload, null, 2)}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Execution Nodes */}
      <div className="space-y-2.5">
        {nodes.map((node, index) => {
          const isExpanded = expandedNode === node.id;
          return (
            <div
              key={node.id}
              onClick={() => setExpandedNode(isExpanded ? null : node.id)}
              className="rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] p-4 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/[0.08] flex items-center justify-center shrink-0">
                  {getIcon(node.icon)}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#00dce6]">
                      <span>{node.nodeNumber}</span> // {node.title}
                    </span>
                    <span className="text-xs text-neutral-400">{node.offsetTime}</span>
                  </div>

                  <p className="text-sm text-neutral-300 leading-snug">{node.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {node.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-0.5 rounded border ${
                          t.color === 'cyan'
                            ? 'bg-[#00dce6]/10 border-[#00dce6]/30 text-[#00dce6]'
                            : t.color === 'purple'
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                            : t.color === 'rose'
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                            : 'bg-white/[0.04] border-white/[0.08] text-neutral-300'
                        }`}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
