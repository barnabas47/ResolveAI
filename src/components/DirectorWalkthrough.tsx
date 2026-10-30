import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
  ArrowRight,
  Maximize2,
} from 'lucide-react';
import { ScenarioId, ChannelId } from '../types';

export interface DirectorWalkthroughProps {
  isActive: boolean;
  onClose: () => void;
  onSelectTab: (tab: 'operations' | 'telemetry') => void;
  onSelectScenario: (scenarioId: ScenarioId) => void;
  onChannelChange: (channel: ChannelId) => void;
  onSendSimulationQuery: (query: string) => Promise<void> | void;
  onActionClick: (actionType: string) => void;
  onSetExternalInputText?: (text: string) => void;
}

interface WalkthroughStep {
  id: number;
  title: string;
  shortLabel: string;
  channel?: ChannelId;
  tab: 'operations' | 'telemetry';
  targetSelector: string;
  durationMs: number;
  subtitle: string;
  tag: string;
  apiEndpoint?: string;
  codeSnippet?: string;
  action?: () => void;
  typeSimulationText?: string;
}

export const DirectorWalkthrough: React.FC<DirectorWalkthroughProps> = ({
  isActive,
  onClose,
  onSelectTab,
  onSelectScenario,
  onChannelChange,
  onSendSimulationQuery,
  onActionClick,
  onSetExternalInputText,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [spotlightRect, setSpotlightRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [typedChars, setTypedChars] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const stepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Define the 6 high-density video-like simulation steps
  const steps: WalkthroughStep[] = [
    {
      id: 1,
      title: 'Inbound Customer Claim on WhatsApp',
      shortLabel: 'WhatsApp Claim',
      channel: 'whatsapp',
      tab: 'operations',
      targetSelector: '#phone-chat-input',
      durationMs: 7000,
      typeSimulationText: 'I need to exchange these sneakers for size 10.5, unworn in original box.',
      subtitle: 'Customer initiates post-purchase exchange on WhatsApp. Inbound AWS CDS webhook captures image and intent in 14ms.',
      tag: 'WEBHOOK_INGEST',
      apiEndpoint: 'POST /v1/webhooks/whatsapp/inbound',
      codeSnippet: 'agentEngine.evaluateCodeGate(query) -> VALIDATED',
    },
    {
      id: 2,
      title: 'Amazon Bedrock Nova Lite Multimodal Inspection',
      shortLabel: 'Vision Triage',
      channel: 'whatsapp',
      tab: 'operations',
      targetSelector: '[data-ui="inspection-badge"]',
      durationMs: 5500,
      subtitle: 'Bedrock Nova Lite performs zero-shot condition scoring (Grade A+, 99.4% confidence). Verified unworn outsoles & intact tags.',
      tag: 'BEDROCK_NOVA_LITE',
      apiEndpoint: 'POST /model/amazon.nova-lite-v1:0/invoke',
      codeSnippet: 'inspectionResult: { grade: "Grade A+", confidence: 0.994 }',
    },
    {
      id: 3,
      title: 'ERP Allocation & RCS Smart Locker Pass Dispatched',
      shortLabel: 'RCS Locker Pass',
      channel: 'rcs',
      tab: 'operations',
      targetSelector: '[data-ui="phone-cta-btn"]',
      durationMs: 6500,
      subtitle: 'ERP reserves replacement SKU at ATL-04 Hub. Promoted session to RCS Business Messaging with Whole Foods Smart Locker PIN #LK-8821.',
      tag: 'RCS_PROMOTION',
      apiEndpoint: 'POST /v1/rcs/messages/rich-card',
      codeSnippet: 'lockerPass: { pin: "LK-8821", expiresHours: 48, feeDue: 0.00 }',
    },
    {
      id: 4,
      title: 'Deterministic Code Gate & Trace Graph Audit',
      shortLabel: 'Trace Graph',
      tab: 'operations',
      targetSelector: '#btn-view-event-json',
      durationMs: 6000,
      subtitle: 'Deterministic Python Code Gate enforces pre-dispute policy ("Prompt says Yes, Code says No"). Dispatches PayPal Orders replacement.',
      tag: 'CODE_GATE_OK',
      apiEndpoint: 'POST /v2/checkout/orders (Sandbox)',
      codeSnippet: 'curl -X POST https://api-m.sandbox.paypal.com/v2/checkout/orders',
    },
    {
      id: 5,
      title: 'PayPal Dispute Ledger & AG Grid Immutability',
      shortLabel: 'AG Grid Ledger',
      tab: 'telemetry',
      targetSelector: '#ag-grid-dispute-section',
      durationMs: 6500,
      subtitle: 'Dispute averted before formal PayPal chargeback. Ledgered in AG Grid with tamper-evident Merkle hash. $20.00 merchant fee saved.',
      tag: 'PAYPAL_DISPUTES',
      apiEndpoint: 'GET /v1/customer/disputes (Settled Pre-Dispute)',
      codeSnippet: 'disputeRecord: { status: "SETTLED_AUTONOMOUS", feeSaved: 20.00 }',
    },
    {
      id: 6,
      title: 'Executive Financial Realization & Latency Telemetry',
      shortLabel: 'Bento Metrics',
      tab: 'operations',
      targetSelector: '#bento-metrics-section',
      durationMs: 6000,
      subtitle: '94.2% Autonomous Resolution achieved with 180ms inference latency. Standard $20.00 merchant penalties permanently neutralized.',
      tag: 'EXECUTIVE_KPI',
      apiEndpoint: 'METRICS_AGGREGATOR',
      codeSnippet: 'totalFeesSaved: 105.00 USD | adjudicationLatency: 180ms',
    },
  ];

  const currentStep = steps[currentStepIndex] || steps[0];

  // Helper to smooth scroll to target
  const scrollToTarget = useCallback((selector: string) => {
    try {
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Move virtual cursor to element center
  const moveCursorTo = useCallback((selector: string, andClick = false, clickDelay = 800) => {
    try {
      const el = document.querySelector(selector);
      if (el) {
        const rect = el.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

        setCursorPos({ x: targetX, y: targetY });
        setCursorVisible(true);
        setSpotlightRect({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        });

        if (andClick) {
          setTimeout(() => {
            setIsClicking(true);
            setTimeout(() => setIsClicking(false), 240);
          }, clickDelay);
        }
      } else {
        // Fallback smooth cursor positioning in visible viewport
        setCursorPos({ x: window.innerWidth * 0.45, y: window.innerHeight * 0.45 });
        setCursorVisible(true);
        setSpotlightRect(null);
      }
    } catch {
      setCursorVisible(false);
    }
  }, []);

  // Clean timers
  const clearAllTimers = useCallback(() => {
    if (stepTimerRef.current) {
      clearTimeout(stepTimerRef.current);
      stepTimerRef.current = null;
    }
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
  }, []);

  // Execute Step Routine
  const executeStep = useCallback((stepIdx: number) => {
    clearAllTimers();
    const step = steps[stepIdx];
    if (!step) {
      setIsCompleted(true);
      setIsPlaying(false);
      return;
    }

    // 1. Switch Tab if needed
    onSelectTab(step.tab);

    // 2. Switch Channel if specified
    if (step.channel) {
      onChannelChange(step.channel);
    }

    // 3. Scroll & Position Cursor after tab render tick
    setTimeout(() => {
      scrollToTarget(step.targetSelector);

      setTimeout(() => {
        // Step specific interactive behaviors
        if (step.id === 1) {
          // Simulate typing into phone input
          moveCursorTo('#phone-chat-input', true, 400);

          if (step.typeSimulationText) {
            const fullText = step.typeSimulationText;
            let currentLen = 0;
            setTypedChars('');

            const typeNextChar = () => {
              if (currentLen <= fullText.length) {
                const slice = fullText.slice(0, currentLen);
                setTypedChars(slice);
                if (onSetExternalInputText) {
                  onSetExternalInputText(slice);
                }
                currentLen++;
                const delay = Math.max(25, 45 / speedMultiplier);
                typingTimerRef.current = setTimeout(typeNextChar, delay);
              } else {
                // Done typing -> move cursor to send button and click
                setTimeout(() => {
                  moveCursorTo('#phone-send-btn', true, 200);
                  setTimeout(() => {
                    onSendSimulationQuery(fullText);
                    if (onSetExternalInputText) {
                      onSetExternalInputText('');
                    }
                  }, 500);
                }, 400);
              }
            };

            setTimeout(typeNextChar, 700);
          }
        } else if (step.id === 2) {
          // Vision badge spotlight
          moveCursorTo('[data-ui="phone-chassis"]', false);
        } else if (step.id === 3) {
          // Move cursor to phone action button and click
          moveCursorTo('[data-ui="phone-cta-btn"]', true, 600);
          setTimeout(() => {
            onActionClick('confirm_exchange');
          }, 1100);
        } else if (step.id === 4) {
          // View Event JSON on ExecutionGraph
          moveCursorTo('#btn-view-event-json', true, 700);
          setTimeout(() => {
            const btn = document.querySelector('#btn-view-event-json') as HTMLElement;
            btn?.click();
          }, 1000);
        } else if (step.id === 5) {
          // AG Grid row focus
          moveCursorTo('#ag-grid-dispute-section', false);
        } else if (step.id === 6) {
          // Bento Metrics focus
          moveCursorTo('#bento-metrics-section', false);
        }

        // Auto schedule next step if playing
        if (isPlaying) {
          const adjustedDuration = Math.round(step.durationMs / speedMultiplier);
          stepTimerRef.current = setTimeout(() => {
            if (stepIdx < steps.length - 1) {
              setCurrentStepIndex(stepIdx + 1);
            } else {
              setIsCompleted(true);
              setIsPlaying(false);
            }
          }, adjustedDuration);
        }
      }, 500);
    }, 250);
  }, [clearAllTimers, onActionClick, onChannelChange, onSelectTab, onSendSimulationQuery, onSetExternalInputText, isPlaying, moveCursorTo, scrollToTarget, speedMultiplier, steps]);

  // Trigger step when step index changes or play starts
  useEffect(() => {
    if (isActive) {
      executeStep(currentStepIndex);
    } else {
      clearAllTimers();
      setCursorVisible(false);
      setSpotlightRect(null);
    }
    return () => clearAllTimers();
  }, [isActive, currentStepIndex, isPlaying, speedMultiplier]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        }
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (currentStepIndex > 0) {
          setCurrentStepIndex((prev) => prev - 1);
        }
      } else if (e.code === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, currentStepIndex, steps.length, onClose]);

  // Jump to specific step
  const handleJumpToStep = (index: number) => {
    setIsCompleted(false);
    setCurrentStepIndex(index);
  };

  // Restart walkthrough
  const handleRestart = () => {
    setIsCompleted(false);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  if (!isActive) return null;

  return (
    <>
      {/* Target Element Ambient Spotlight Halo */}
      {spotlightRect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed z-40 transition-all duration-500 ease-out border border-[#00dce6]/40 rounded-xl shadow-[0_0_40px_rgba(0,220,230,0.25)]"
          style={{
            top: spotlightRect.top - window.scrollY - 6,
            left: spotlightRect.left - window.scrollX - 6,
            width: spotlightRect.width + 12,
            height: spotlightRect.height + 12,
          }}
        />
      )}

      {/* Virtual Cinema Cursor with Spring Dynamics */}
      <AnimatePresence>
        {cursorVisible && (
          <motion.div
            className="fixed pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            animate={{
              x: cursorPos.x,
              y: cursorPos.y,
              scale: isClicking ? 0.8 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 26,
              mass: 0.8,
            }}
          >
            {/* Outer Cyan Radar Ring */}
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#00dce6] opacity-30" />
              <div className="w-6 h-6 rounded-full bg-[#00dce6]/20 border border-[#00dce6] backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(0,220,230,0.6)]">
                <div className="w-2 h-2 rounded-full bg-[#00dce6]" />
              </div>

              {/* Click Ripple Wave */}
              {isClicking && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ scale: 2.8, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border-2 border-[#00dce6]"
                />
              )}
            </div>

            {/* Trailing Cursor Label */}
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 12 }}
              className="ml-2 px-2 py-0.5 rounded bg-black/90 border border-[#00dce6]/40 text-[10px] font-mono text-[#00dce6] whitespace-nowrap shadow-lg select-none"
            >
              Director Focus: {currentStep.shortLabel}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Obsidian Cinema HUD */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 360, damping: 28 }}
          className="rounded-2xl bg-[#0c0d12]/95 backdrop-blur-xl border border-white/[0.12] p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] ring-1 ring-white/5 space-y-3.5"
        >
          {/* Top Row: Director Badge, Title & Dismiss */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#00dce6]/15 text-[#00dce6] border border-[#00dce6]/30 text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00dce6] animate-pulse" />
                ONE-TAKE CINEMA
              </span>
              <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
                Step {currentStep.id} of {steps.length}
              </span>
              <span className="text-neutral-600 hidden sm:inline">•</span>
              <h3 className="text-white font-semibold text-xs sm:text-sm truncate">
                {currentStep.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Speed Multiplier Pill */}
              <div className="flex items-center rounded-lg bg-white/[0.05] border border-white/[0.08] p-0.5 text-[11px] font-mono">
                {[1, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeedMultiplier(s)}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      speedMultiplier === s
                        ? 'bg-[#00dce6]/20 text-[#00dce6] font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-neutral-400 hover:text-white flex items-center justify-center transition-colors border border-white/[0.08]"
                title="Exit Cinema Mode (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Middle Row: Subtitle & Real-time Architecture Narration */}
          <div className="p-3 rounded-xl bg-black/60 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#00dce6]">
                <Terminal className="w-3.5 h-3.5 text-[#00dce6]" />
                <span>{currentStep.apiEndpoint || currentStep.tag}</span>
              </div>
              <p className="text-neutral-200 leading-relaxed font-sans text-xs sm:text-[13px]">
                {currentStep.subtitle}
              </p>
            </div>

            {currentStep.codeSnippet && (
              <div className="shrink-0 max-w-xs overflow-hidden rounded bg-white/[0.03] border border-white/[0.06] px-2.5 py-1.5 font-mono text-[10px] text-neutral-400">
                <code>{currentStep.codeSnippet}</code>
              </div>
            )}
          </div>

          {/* Bottom Row: Controls & Scrubber Timeline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            {/* Playback Button Group */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleJumpToStep(Math.max(0, currentStepIndex - 1))}
                disabled={currentStepIndex === 0}
                className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] disabled:opacity-30 text-white flex items-center justify-center transition-colors border border-white/[0.08]"
                title="Previous Step"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="min-h-[36px] px-3.5 rounded-lg bg-[#00dce6] hover:bg-[#00f2fe] text-[#00373a] font-semibold text-xs flex items-center gap-1.5 transition-[transform,background-color] active:scale-95 shadow-[0_0_20px_rgba(0,220,230,0.3)]"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Resume'}</span>
              </button>

              <button
                onClick={() => {
                  if (currentStepIndex < steps.length - 1) {
                    handleJumpToStep(currentStepIndex + 1);
                  } else {
                    handleRestart();
                  }
                }}
                className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white flex items-center justify-center transition-colors border border-white/[0.08]"
                title={currentStepIndex === steps.length - 1 ? 'Replay Walkthrough' : 'Next Step'}
              >
                {currentStepIndex === steps.length - 1 ? <RotateCcw className="w-3.5 h-3.5" /> : <SkipForward className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Interactive Timeline Checkpoints */}
            <div className="flex-1 flex items-center gap-1.5 min-w-0">
              {steps.map((st, idx) => {
                const isPassed = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <button
                    key={st.id}
                    onClick={() => handleJumpToStep(idx)}
                    className="group relative flex-1 flex flex-col items-start gap-1 py-1 focus:outline-none"
                    title={`Jump to Step ${st.id}: ${st.title}`}
                  >
                    {/* Track Line */}
                    <div
                      className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                        isCurrent
                          ? 'bg-[#00dce6] shadow-[0_0_10px_rgba(0,220,230,0.8)]'
                          : isPassed
                          ? 'bg-[#00dce6]/50'
                          : 'bg-white/[0.1] group-hover:bg-white/[0.2]'
                      }`}
                    />
                    <span
                      className={`text-[10px] font-mono truncate hidden md:inline transition-colors ${
                        isCurrent
                          ? 'text-[#00dce6] font-semibold'
                          : isPassed
                          ? 'text-neutral-400'
                          : 'text-neutral-500'
                      }`}
                    >
                      {st.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
