import React, { useState } from 'react';
import { Database, Key, Check, Copy, ExternalLink, X, ShieldAlert, Sparkles, Terminal } from 'lucide-react';

interface PayPalConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PayPalConfigModal: React.FC<PayPalConfigModalProps> = ({ isOpen, onClose }) => {
  const [clientId, setClientId] = useState(() => localStorage.getItem('paypal_sandbox_client_id') || 'AU_SANDBOX_RESOLVEAI_MERCHANT_V2');
  const [clientSecret, setClientSecret] = useState(() => localStorage.getItem('paypal_sandbox_secret') || 'EAA_SANDBOX_SECRET_KEY_LIVE_VERIFIED');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('paypal_sandbox_client_id', clientId);
    localStorage.setItem('paypal_sandbox_secret', clientSecret);
    setSaveStatus('Sandbox credentials saved to local session.');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const curlRefundSnippet = `curl -v -X POST https://api-m.sandbox.paypal.com/v2/payments/captures/CAPTURE-99124-ATL/refund \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <ACCESS_TOKEN>" \\
  -d '{
    "amount": { "value": "149.00", "currency_code": "USD" },
    "note_to_payer": "PayPal ResolveAI Autonomous Settlement: Item Damage Confirmed"
  }'`;

  const curlOrderSnippet = `curl -v -X POST https://api-m.sandbox.paypal.com/v2/checkout/orders \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <ACCESS_TOKEN>" \\
  -d '{
    "intent": "CAPTURE",
    "purchase_units": [{
      "reference_id": "REPLACEMENT-SIZE-10.5",
      "amount": { "currency_code": "USD", "value": "0.00" },
      "description": "Zero-Cost Size Exchange Pre-Authorized Order"
    }]
  }'`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div data-ui="paypal-modal" className="relative w-full max-w-2xl bg-[#0e0f14] border border-white/[0.1] rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-[#12131a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00dce6]/10 border border-[#00dce6]/30 flex items-center justify-center text-[#00dce6]">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wide">
                PayPal Developer Platform Sandbox Configuration
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Targeting official PayPal AI Hackathon Sandbox endpoints
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

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-neutral-300">
          {/* Active Status Pill */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <div>
                <span className="text-white font-medium">PayPal Developer Sandbox</span>
                <p className="text-[11px] text-neutral-400">Endpoint: https://api-m.sandbox.paypal.com</p>
              </div>
            </div>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/[0.04] text-neutral-300 border border-white/[0.08]">
              Sandbox Gateway Verified
            </span>
          </div>

          {/* Credentials Inputs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#00dce6]" />
                Sandbox Client ID
              </label>
              <a
                href="https://developer.paypal.com/dashboard/applications/sandbox"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#00dce6] hover:underline flex items-center gap-1"
              >
                <span>Get Keys from PayPal Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="e.g. AU_SANDBOX_CLIENT_ID..."
              className="w-full px-3.5 py-2.5 bg-black/40 border border-white/[0.08] rounded-lg text-white text-xs focus:outline-none focus:border-[#00dce6]/50"
            />

            <div>
              <label className="text-[11px] font-semibold text-neutral-200 uppercase tracking-wider block mb-1.5">
                Sandbox Secret
              </label>
              <input
                type="password"
                value={clientSecret}
                onChange={(e) => setClientSecret(e.target.value)}
                placeholder="Sandbox Secret Key"
                className="w-full px-3.5 py-2.5 bg-black/40 border border-white/[0.08] rounded-lg text-white text-xs focus:outline-none focus:border-[#00dce6]/50"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-neutral-400">
                {saveStatus || 'Keys persist locally in browser storage for session simulation.'}
              </span>
              <button
                onClick={handleSave}
                className="min-h-[36px] px-4 py-1.5 rounded-lg bg-[#00dce6] hover:bg-[#00dce6]/90 text-black font-semibold text-xs transition-colors"
              >
                Save Sandbox Config
              </button>
            </div>
          </div>

          {/* Live API Inspection Snippets */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                Live API Direct Inspection Snippets
              </span>
              <span className="text-[10px] text-neutral-500">v2 REST Endpoints</span>
            </div>

            {/* Snippet 1 */}
            <div className="p-3 bg-black/60 rounded-xl border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-cyan-400">POST /v2/payments/captures/&#123;id&#125;/refund</span>
                <button
                  onClick={() => copyToClipboard(curlRefundSnippet, 'refund')}
                  className="px-2 py-1 rounded bg-white/[0.06] hover:bg-white/[0.1] text-neutral-300 flex items-center gap-1 text-[10px]"
                >
                  {copiedSnippet === 'refund' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet === 'refund' ? 'Copied' : 'Copy cURL'}</span>
                </button>
              </div>
              <pre className="text-[10px] font-mono text-neutral-400 overflow-x-auto whitespace-pre leading-relaxed">
                {curlRefundSnippet}
              </pre>
            </div>

            {/* Snippet 2 */}
            <div className="p-3 bg-black/60 rounded-xl border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-emerald-400">POST /v2/checkout/orders ($0.00 Replacement)</span>
                <button
                  onClick={() => copyToClipboard(curlOrderSnippet, 'order')}
                  className="px-2 py-1 rounded bg-white/[0.06] hover:bg-white/[0.1] text-neutral-300 flex items-center gap-1 text-[10px]"
                >
                  {copiedSnippet === 'order' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet === 'order' ? 'Copied' : 'Copy cURL'}</span>
                </button>
              </div>
              <pre className="text-[10px] font-mono text-neutral-400 overflow-x-auto whitespace-pre leading-relaxed">
                {curlOrderSnippet}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#12131a] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-neutral-400">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Sandbox Mode: No real funds or credit cards are debited.</span>
          </div>
          <button
            onClick={onClose}
            className="min-h-[36px] px-4 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
