import React, { useState } from 'react';
import { Bot, Cpu, Database, Activity, RefreshCw, Zap, ShieldCheck, Package, Play, ArrowRight, Settings } from 'lucide-react';
import { ScenarioId } from '../types';
import { PayPalConfigModal } from './PayPalConfigModal';

interface NavbarProps {
  activeTab: 'operations' | 'telemetry';
  setActiveTab: (tab: 'operations' | 'telemetry') => void;
  activeScenarioId: ScenarioId;
  onSelectScenario: (id: ScenarioId) => void;
  onResetFlow: () => void;
  isProcessingDemo: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeScenarioId,
  onSelectScenario,
  onResetFlow,
  isProcessingDemo,
}) => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-[#0c0d12]/95 backdrop-blur-md">
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
                <span className="w-2 h-2 rounded-full bg-[#00dce6]"></span>
                <span className="text-white">Nova Lite: ONLINE</span>
              </div>
              <button
                onClick={() => setIsConfigOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 transition-colors"
                title="Click to view or edit PayPal Sandbox API configuration"
              >
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                <span>PayPal Sandbox: CONNECTED</span>
                <Settings className="w-3 h-3 ml-1 text-emerald-400/80" />
              </button>
              <div className="flex items-center gap-1 px-2 py-1 text-neutral-400">
                <Database className="w-3 h-3 text-neutral-500" />
                <span>api-m.sandbox.paypal.com</span>
              </div>
            </div>
          </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center p-1 rounded-lg bg-black/40 border border-white/[0.08] text-xs font-medium shrink-0">
          <button
            onClick={() => setActiveTab('operations')}
            className={`min-h-[36px] px-3 sm:px-4 py-1.5 rounded transition-colors flex items-center gap-1.5 sm:gap-2 ${
              activeTab === 'operations'
                ? 'bg-[#00dce6]/15 text-[#00dce6] border border-[#00dce6]/30 font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AgentCore & Phone Simulator</span>
            <span className="sm:hidden text-xs">AgentCore</span>
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`min-h-[36px] px-3 sm:px-4 py-1.5 rounded transition-colors flex items-center gap-1.5 sm:gap-2 ${
              activeTab === 'telemetry'
                ? 'bg-[#00dce6]/15 text-[#00dce6] border border-[#00dce6]/30 font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AG Grid & PayPal Disputes</span>
            <span className="sm:hidden text-xs">AG Grid</span>
          </button>
        </nav>

        {/* Right Status */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-xs text-[#00dce6]">
            <Zap className="w-3.5 h-3.5 text-[#00dce6]" />
            <span>180ms avg</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] text-xs text-neutral-300">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Amazon Nova Lite</span>
          </div>
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
            className="2xl:hidden min-h-[36px] flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs transition-colors border border-emerald-500/20"
            title="Configure PayPal Sandbox Keys"
          >
            <Settings className="w-3.5 h-3.5" />
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
