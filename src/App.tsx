import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { Navbar } from './components/Navbar';
import { BentoMetrics } from './components/BentoMetrics';
import { ExecutionGraph } from './components/ExecutionGraph';
import { PhoneSimulator } from './components/PhoneSimulator';
import { DeepTraceView } from './components/DeepTraceView';
import { AGGridDisputeLedger } from './components/AGGridDisputeLedger';
import { RejectionLog } from './components/RejectionLog';
import { LiveAIInspector } from './components/vault/live-ai-inspector';
import { VoiceCommandPill } from './components/vault/voice-command-pill';
import { DirectorWalkthrough } from './components/DirectorWalkthrough';
import { SCENARIOS, MOCK_TRACE_EVENTS } from './data/mockData';
import { INITIAL_PAYPAL_DISPUTES, PayPalDisputeRecord } from './services/paypalService';
import { processCustomerMessage } from './services/agentEngine';
import { ScenarioId, ChannelId, ChatMessage, WebhookTraceEvent } from './types';
import { Sparkles, ArrowRight, ShieldCheck, RefreshCw, Zap, CheckCircle2 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'operations' | 'telemetry'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'telemetry') return 'telemetry';
    }
    return 'operations';
  });
  const [activeScenarioId, setActiveScenarioId] = useState<ScenarioId>('size_exchange');
  const [currentChannel, setCurrentChannel] = useState<ChannelId>('whatsapp');
  const [isProcessingDemo, setIsProcessingDemo] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isWalkthroughActive, setIsWalkthroughActive] = useState(false);
  const [externalInputText, setExternalInputText] = useState('');
  const [traceEvents, setTraceEvents] = useState<WebhookTraceEvent[]>(MOCK_TRACE_EVENTS);
  const [disputeRecords, setDisputeRecords] = useState<PayPalDisputeRecord[]>(INITIAL_PAYPAL_DISPUTES);

  const scenario = SCENARIOS[activeScenarioId] || SCENARIOS.size_exchange;

  // Sync initial channel when scenario changes
  useEffect(() => {
    setCurrentChannel(scenario.initialChannel);
  }, [activeScenarioId]);

  // 1-Click Automated Judge Demo Runner
  const runInstantDemo = () => {
    setIsProcessingDemo(true);
    setActiveScenarioId('instant_demo');
    setCurrentChannel('whatsapp');

    // Step 1: Inbound Webhook
    setTimeout(() => {
      // Step 2: Bedrock Vision validation
    }, 600);

    // Step 3: Transition to RCS
    setTimeout(() => {
      setCurrentChannel('rcs');
    }, 1800);

    // Step 4: Finalize
    setTimeout(() => {
      setIsProcessingDemo(false);
    }, 3200);
  };

  const handleSelectScenario = (id: ScenarioId) => {
    if (id === 'instant_demo') {
      toast.info('Starting 1-Click Instant Demo', {
        description: 'Automating full omnichannel return journey across Bedrock & AWS CDS...',
      });
      runInstantDemo();
    } else if (id === 'damaged_claim') {
      setActiveScenarioId(id);
      toast.success('Loaded Scenario 2: Damaged Jacket Claim', {
        description: 'Multimodal Vision defect analysis + zero-carbon keep item approval.',
      });
    } else {
      setActiveScenarioId(id);
      toast.success('Loaded Scenario 1: Shoe Size Exchange', {
        description: 'WhatsApp photo inquiry promoted to RCS interactive smart locker pass.',
      });
    }
  };

  const handleResetFlow = () => {
    setActiveScenarioId('size_exchange');
    setCurrentChannel('whatsapp');
    setIsProcessingDemo(false);
    toast('Demo Flow Reset', {
      description: 'Reset session to initial WhatsApp inbound state.',
    });
  };

  const handleActionClick = (actionType: string) => {
    if (actionType === 'confirm_exchange' || actionType === 'switch_rcs') {
      setCurrentChannel('rcs');
      toast.success('Promoted to RCS Business Messaging', {
        description: 'Interactive Whole Foods Smart Locker PIN #LK-8821 dispatched.',
      });
    } else if (actionType === 'view_locker') {
      setCurrentChannel('sms');
      toast.info('SMS E-Manifest Dispatched', {
        description: 'UPS Ground Tracking #1Z992A010928419201 generated via Amazon SES.',
      });
    }
  };

  const handleVoiceTranscript = (text: string) => {
    toast('Voice AI Recognized', {
      description: text,
    });
  };

  const handleNewTraceEvent = (newEvent: WebhookTraceEvent) => {
    setTraceEvents((prev) => [newEvent, ...prev]);
    toast.success(`Trace Logged: ${newEvent.event}`, {
      description: `Latency: ${newEvent.latencyMs}ms | Region: ${newEvent.region} | ID: #${newEvent.id}`,
    });
  };

  const handleNewDisputeRecord = (record: PayPalDisputeRecord) => {
    setDisputeRecords((prev) => [record, ...prev]);
    toast.success(`PayPal Dispute Settled: ${record.id}`, {
      description: `Action: ${record.paypalActionType} | Fee Saved: +$${record.paypalFeeSaved.toFixed(2)}`,
    });
  };

  return (
    <div className="min-h-[100dvh] bg-[#09090c] text-[#e5e1e7] relative overflow-x-hidden selection:bg-[#00dce6]/20 selection:text-[#00dce6]">
      {/* Background Subtle Dot-Matrix */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-cyan-950/20 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-dot-matrix opacity-30" />
      </div>

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeScenarioId={activeScenarioId}
        onSelectScenario={handleSelectScenario}
        onResetFlow={handleResetFlow}
        isProcessingDemo={isProcessingDemo}
        onOpenInspector={() => setIsInspectorOpen(true)}
        onStartWalkthrough={() => {
          setIsWalkthroughActive(true);
          toast.info('Starting One-Take Autonomous Cinema Walkthrough', {
            description: 'Live interactive cursor simulation across Bedrock, RCS, and PayPal APIs.',
          });
        }}
      />

      {/* Main Container */}
      <main className="relative z-10 w-full pt-32 pb-24 px-4 lg:px-8 max-w-[1720px] mx-auto space-y-6">
        {/* Top Hero Showcase Banner */}
        <section className="relative overflow-hidden rounded-xl bg-[#13141a] border border-white/[0.08] p-6 lg:p-8">
          <div className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-6">
            <div className="max-w-4xl space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[#00dce6] tracking-wide flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00dce6]" />
                  PayPal Agentic Commerce Protocol
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-400">Session <code className="font-mono text-neutral-300">#{scenario.sessionCode}</code></span>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-300">Pre-Dispute Mediation Engine</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                Autonomous Dispute &amp; Return Settlement Copilot
              </h1>

              <p className="text-neutral-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                Powered by <strong className="text-white font-semibold">PayPal Developer Platform</strong> (Captures Refund, Disputes, Orders Sandbox API) &amp; <strong className="text-white font-semibold">Amazon Bedrock (Nova Lite)</strong>. Eliminates non-refundable $20 merchant dispute fees through real-time multimodal verification and instant 180ms settlement.
              </p>
            </div>

            {/* Quick Switcher & Re-evaluate */}
            <div className="flex flex-wrap items-center gap-2 shrink-0 bg-neutral-900/90 p-2 rounded-lg">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/[0.04] text-xs text-neutral-300">
                <Sparkles className="w-3.5 h-3.5 text-[#00dce6]" />
                <span>Agent: PayPal ResolveAI</span>
              </div>
              <button
                onClick={handleResetFlow}
                className="min-h-[36px] flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.06] hover:bg-white/[0.1] text-neutral-200 border border-white/[0.08] text-xs transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isProcessingDemo ? 'animate-spin text-[#00dce6]' : ''}`} />
                <span>Re-evaluate Flow</span>
              </button>
            </div>
          </div>
        </section>

        {/* High-Level Executive KPI Bento Row (Full Width, Zero Collision) */}
        <BentoMetrics scenarioId={activeScenarioId} />

        {/* Tab Content with Smooth Spring Transition */}
        <AnimatePresence mode="wait">
          {activeTab === 'operations' ? (
            <motion.div
              key="operations"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start"
            >
              {/* LEFT 7 COLS: Enterprise Logistics Command Center */}
              <div className="xl:col-span-7 flex flex-col gap-6 min-w-0">
                {/* Bedrock AgentCore Execution Graph */}
                <ExecutionGraph
                  nodes={scenario.traceNodes}
                  rawPayload={scenario.rawBedrockPayload}
                />

                {/* Voice Command Bar Integration from Vault */}
                <div className="p-4 rounded-xl bg-[#13141a] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-xs text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#00dce6]" />
                      <span>Multimodal Voice & Command Input</span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Test live voice triage commands or simulate customer inquiry audio stream
                    </p>
                  </div>
                  <VoiceCommandPill
                    onTranscript={handleVoiceTranscript}
                    placeholder="Voice AI return inquiry..."
                  />
                </div>
              </div>

              {/* RIGHT 5 COLS: Floating Phone Simulator */}
              <div className="xl:col-span-5 flex flex-col items-center justify-center">
                <PhoneSimulator
                  messages={scenario.messages}
                  currentChannel={currentChannel}
                  onChannelChange={(ch) => setCurrentChannel(ch)}
                  onActionClick={handleActionClick}
                  productImage={scenario.productImage}
                  inspectionBadge={scenario.inspectionResult.grade}
                  scenarioId={activeScenarioId}
                  onNewTraceEvent={handleNewTraceEvent}
                  onNewDisputeRecord={handleNewDisputeRecord}
                  externalInputText={externalInputText}
                />
              </div>
            </motion.div>
          ) : (
            /* AG Grid & Telemetry Tab */
            <motion.div
              key="telemetry"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="space-y-6"
            >
              <AGGridDisputeLedger records={disputeRecords} />
              <RejectionLog />
              <DeepTraceView events={traceEvents} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Autonomous One-Take Cinema Director Engine */}
      <DirectorWalkthrough
        isActive={isWalkthroughActive}
        onClose={() => setIsWalkthroughActive(false)}
        onSelectTab={(tab) => setActiveTab(tab)}
        onSelectScenario={(id) => handleSelectScenario(id)}
        onChannelChange={(ch) => setCurrentChannel(ch)}
        onSendSimulationQuery={async (query) => {
          const res = await processCustomerMessage(query, currentChannel, 'Alex Mercer', activeScenarioId);
          handleNewTraceEvent(res.traceEvent);
          if (res.disputeRecord) {
            handleNewDisputeRecord(res.disputeRecord);
          }
        }}
        onActionClick={handleActionClick}
        onSetExternalInputText={(t) => setExternalInputText(t)}
      />

      {/* Sonner Dark Toast Notifications */}
      <Toaster position="top-right" theme="dark" richColors />

      {/* Live AI Telemetry Inspector Drawer */}
      <LiveAIInspector
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        modelName="Amazon Nova Lite (Bedrock) · Multimodal"
        latencyMs={180}
        tokensPerSec={185}
        steps={[
          { name: 'AWS CDS Inbound Webhook', durationMs: 14, status: 'done', detail: 'Received customer claim payload' },
          { name: 'Nova Lite Multimodal Inspection', durationMs: 95, status: 'done', detail: 'Condition Grade A+ verified' },
          { name: 'ERP Inventory Reserve Hold', durationMs: 45, status: 'done', detail: 'Reserved replacement SKU' },
          { name: 'PayPal Orders Pre-Authorization', durationMs: 26, status: 'done', detail: 'Executed POST /v2/checkout/orders' },
        ]}
      />
    </div>
  );
}

export default App;
