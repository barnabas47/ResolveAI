import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Search,
  Download,
  Clock,
  Layers,
  Cpu,
  CheckCircle2,
  Radio,
  ArrowRight,
} from 'lucide-react';
import { MOCK_TRACE_EVENTS } from '../data/mockData';
import { WebhookTraceEvent } from '../types';

interface DeepTraceViewProps {
  events?: WebhookTraceEvent[];
}

export const DeepTraceView: React.FC<DeepTraceViewProps> = ({ events = MOCK_TRACE_EVENTS }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedTrace, setSelectedTrace] = useState<string | null>(null);

  const filteredEvents = events.filter(
    (ev) =>
      ev.event.toLowerCase().includes(filterQuery.toLowerCase()) ||
      ev.channel.toLowerCase().includes(filterQuery.toLowerCase()) ||
      ev.id.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleExportHar = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `aws-cds-trace-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Filter Controls */}
      <div className="rounded-xl bg-[#13141a] border border-white/[0.08] p-5 overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#00dce6]" />
              <span className="text-xs text-[#00dce6] font-medium">
                OpenTelemetry · EUM CDS v2.4 Spec
              </span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white tracking-tight">
              Deep Trace & Omnichannel Webhook Telemetry
            </h1>
            <p className="text-neutral-400 text-sm mt-0.5">
              End-to-end auditability across AWS CDS & Amazon Bedrock Nova Lite Action Groups
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-white">
              <Search className="w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Filter by Session / Event..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="bg-transparent border-0 outline-none text-xs text-white placeholder-neutral-500 w-44"
              />
            </div>

            <button
              onClick={handleExportHar}
              className="min-h-[44px] flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs transition-colors border border-white/[0.08]"
            >
              <Download className="w-4 h-4 text-[#00dce6]" />
              <span>Export Trace HAR</span>
            </button>

            <div className="min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#00dce6]/10 border border-[#00dce6]/20 text-[#00dce6] text-xs">
              <span className="w-2 h-2 rounded-full bg-[#00dce6]" />
              <span>Live Socket: 18ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Trace Logs Stream */}
      <div className="rounded-xl bg-[#13141a] border border-white/[0.08] p-5">
        <div className="flex items-center justify-between pb-3 mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#00dce6]" />
            <h3 className="font-display font-semibold text-white text-sm">
              Real-Time OpenTelemetry Event Trace
            </h3>
          </div>
          <span className="text-xs text-neutral-400">
            Showing {filteredEvents.length} transactions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-neutral-400 text-xs bg-black/40">
                <th className="py-2.5 px-3">Trace ID</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Channel / Service</th>
                <th className="py-2.5 px-3">Event Type</th>
                <th className="py-2.5 px-3">Latency</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Region</th>
                <th className="py-2.5 px-3">Payload Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((ev, i) => (
                <tr
                  key={ev.id}
                  onClick={() => setSelectedTrace(selectedTrace === ev.id ? null : ev.id)}
                  className={`hover:bg-white/[0.04] transition-colors cursor-pointer ${
                    i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'
                  }`}
                >
                  <td className="py-2.5 px-3 text-[#00dce6] font-medium"><code>{ev.id}</code></td>
                  <td className="py-2.5 px-3 text-neutral-300">{ev.timestamp}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-white/[0.05] text-neutral-200">
                      {ev.channel}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-white"><code>{ev.event}</code></td>
                  <td className="py-2.5 px-3 text-cyan-300 font-semibold">{ev.latencyMs}ms</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 text-xs">
                      {ev.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-neutral-400">{ev.region}</td>
                  <td className="py-2.5 px-3 text-neutral-400 max-w-xs truncate">
                    <code>{ev.payloadSnippet}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected trace JSON breakdown */}
        {selectedTrace && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-lg bg-black/60 border border-white/[0.08] text-xs"
          >
            <div className="flex items-center justify-between pb-2 mb-2 text-[#00dce6]">
              <span>Event Payload Detail: <code>{selectedTrace}</code></span>
              <span className="text-neutral-500 text-xs">AWS CDS Hook Event</span>
            </div>
            <pre className="font-mono text-neutral-300 leading-relaxed overflow-x-auto">
              {JSON.stringify(
                filteredEvents.find((e) => e.id === selectedTrace),
                null,
                2
              )}
            </pre>
          </motion.div>
        )}
      </div>
    </div>
  );
};
