import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Cpu, Database, Activity, RefreshCw, Zap, ShieldCheck, Package, Play, ArrowRight, Settings, Clapperboard } from 'lucide-react';
import { ScenarioId } from '../types';
import { PayPalConfigModal } from './PayPalConfigModal';

interface NavbarProps {
  activeTab: 'operations' | 'telemetry';
  setActiveTab: (tab: 'operations' | 'telemetry') => void;
  activeScenarioId: ScenarioId;
  onSelectScenario: (id: ScenarioId) => void;
  onResetFlow: () => void;
  isProcessingDemo: boolean;
  onOpenInspector?: () => void;
  onStartWalkthrough?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeScenarioId,
  onSelectScenario,
  onResetFlow,
  isProcessingDemo,
  onOpenInspector,
  onStartWalkthrough,
}) => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-[#0c0d12]/95 backdrop-blur-md border-b border-white/[0.06]">
        {/* Primary Top Bar */}
        <div className="h-16 w-full px-4 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00dce6]/10 border border-[#00dce6]/30 flex items-center justify-center text-[#00dce6]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-semibold text-base sm:text-lg text-white tracking-tight flex items-center gap-1.5">
                  PayPal <span className="text-[#00dce6] hidden xs:inline sm:inline">ResolveAI</span>
                </span>
              </div>
            </div>

            <div className="hidden xl:flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-neutral-300">
                PayPal AI Hackathon 2026
              </span>
            </div>

            {/* System Status Indicators */}
            <div className="hidden 2xl:flex items-center gap-2 text-xs text-neutral-300">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00dce6]"></span>
                <span className="text-neutral-300 font-medium">Nova Lite 1.0</span>
              </div>
              <button
                onClick={() => setIsConfigOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-200 transition-colors"
                title="Inspect PayPal Sandbox API configuration & cURL snippets"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                <span className="text-white font-medium">PayPal Sandbox</span>
                <span className="text-[10px] text-neutral-400">api-m.sandbox</span>
                <Settings className="w-3 h-3 ml-0.5 text-neutral-400" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs with Framer Motion Spring Pill */}
          <nav className="flex items-center p-1 rounded-xl bg-black/50 border border-white/[0.08] text-xs font-medium shrink-0">
            <button
              id="nav-btn-operations"
              onClick={() => setActiveTab('operations')}
              className={`relative min-h-[36px] px-3 sm:px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 sm:gap-2 ${
                activeTab === 'operations'
                  ? 'text-[#00dce6] font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {activeTab === 'operations' && (
                <motion.div
                  layoutId="navTabIndicator"
                  className="absolute inset-0 rounded-lg bg-[#00dce6]/15 border border-[#00dce6]/35 shadow-[0_0_12px_rgba(0,220,230,0.2)] -z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}
              <Cpu className="w-3.5 h-3.5 relative z-10" />
              <span className="hidden sm:inline relative z-10">AgentCore & Phone Simulator</span>
              <span className="sm:hidden text-xs relative z-10">AgentCore</span>
            </button>
            <button
              id="nav-btn-telemetry"
              onClick={() => setActiveTab('telemetry')}
              className={`relative min-h-[36px] px-3 sm:px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 sm:gap-2 ${
                activeTab === 'telemetry'
                  ? 'text-[#00dce6] font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {activeTab === 'telemetry' && (
                <motion.div
                  layoutId="navTabIndicator"
                  className="absolute inset-0 rounded-lg bg-[#00dce6]/15 border border-[#00dce6]/35 shadow-[0_0_12px_rgba(0,220,230,0.2)] -z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}
              <Activity className="w-3.5 h-3.5 relative z-10" />
              <span className="hidden sm:inline relative z-10">AG Grid & PayPal Disputes</span>
              <span className="sm:hidden text-xs relative z-10">AG Grid</span>
            </button>
          </nav>

          {/* Right Action & Status */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Primary One-Take Walkthrough Trigger */}
            <button
              id="btn-start-walkthrough"
              onClick={onStartWalkthrough}
              className="relative group min-h-[38px] px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00dce6]/20 via-cyan-500/25 to-emerald-500/20 hover:from-[#00dce6]/30 hover:to-emerald-500/30 border border-[#00dce6]/45 text-[#00dce6] hover:text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(0,220,230,0.25)] transition-all duration-300 active:scale-95"
              title="Launch autonomous one-take cinema walkthrough"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00dce6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00dce6]"></span>
              </span>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="hidden xs:inline">One-Take Cinema Demo</span>
              <span className="xs:hidden">Demo</span>
              <span className="hidden md:inline px-1.5 py-0.5 text-[9px] uppercase tracking-wider rounded bg-white/10 font-mono text-cyan-200">Live</span>
            </button>

            <button
              onClick={onOpenInspector}
              className="min-h-[36px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-neutral-300 transition-colors"
              title="Inspect AI telemetry & execution steps"
            >
              <Cpu className="w-3.5 h-3.5 text-[#00dce6]" />
              <span className="hidden sm:inline font-medium">Nova Lite</span>
              <span className="text-[#00dce6]">180ms</span>
            </button>
          </div>
        </div>

      {/* Sub-Header: Judge Quick Scenarios */}
      <div className="h-12 w-full px-4 lg:px-8 bg-black/60 flex items-center justify-between gap-3 overflow-x-auto text-xs">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-neutral-400 flex items-center gap-1 pr-1 font-medium">
            <Zap className="w-3.5 h-3.5 text-[#00dce6]" />
            Judge Scenarios:
          </span>

          <button
            onClick={() => onSelectScenario('size_exchange')}
            className={`min-h-[36px] px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeScenarioId === 'size_exchange'
                ? 'bg-[#00dce6]/20 text-[#00dce6] border border-[#00dce6]/40 font-semibold'
                : 'bg-white/[0.04] text-neutral-300 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]'
            }`}
          >
            <Zap className="w-3 h-3 text-[#00dce6]" />
            <span>Scenario 1: PayPal Size Swap</span>
            <span className="text-neutral-400 text-[10px] hidden md:inline">(Free Replacement Order)</span>
          </button>

          <button
            onClick={() => onSelectScenario('damaged_claim')}
            className={`min-h-[36px] px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeScenarioId === 'damaged_claim'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                : 'bg-white/[0.04] text-neutral-300 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]'
            }`}
          >
            <Package className="w-3 h-3 text-amber-400" />
            <span>Scenario 2: PayPal Defect Refund</span>
            <span className="text-neutral-400 text-[10px] hidden md:inline">(Direct Wallet Credit)</span>
          </button>

          <button
            onClick={() => onSelectScenario('instant_demo')}
            disabled={isProcessingDemo}
            className={`min-h-[36px] px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeScenarioId === 'instant_demo'
                ? 'bg-[#00dce6]/25 text-[#00dce6] border border-[#00dce6]/50 font-semibold'
                : 'bg-white/[0.05] text-[#00dce6] hover:bg-white/[0.1] border border-white/[0.08]'
            }`}
          >
            <Play className="w-3 h-3 text-[#00dce6]" />
            <span>Scenario 3: 1-Click Instant Demo</span>
          </button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsConfigOpen(true)}
            className="2xl:hidden min-h-[36px] flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 text-xs transition-colors border border-white/[0.08]"
            title="Configure PayPal Sandbox Keys"
          >
            <Settings className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">PayPal Sandbox</span>
          </button>
          <button
            onClick={onResetFlow}
            className="min-h-[36px] flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white text-xs transition-colors border border-white/[0.08]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isProcessingDemo ? 'animate-spin text-[#00dce6]' : ''}`} />
            <span>Reset Demo Flow</span>
          </button>
        </div>
      </div>
    </header>
    <PayPalConfigModal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} />
  </>
  );
};
