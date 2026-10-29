import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Sparkles,
  CheckCircle2,
  QrCode,
  ArrowRight,
  ShieldCheck,
  Send,
  Plus,
  Wifi,
  Battery,
  Signal,
  CheckCheck,
  MapPin,
  Clock,
  ExternalLink,
  Image as ImageIcon,
  Activity,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { ChannelId, ChatMessage, WebhookTraceEvent } from '../types';
import { processCustomerMessage } from '../services/agentEngine';
import { PayPalDisputeRecord } from '../services/paypalService';

interface PhoneSimulatorProps {
  messages: ChatMessage[];
  currentChannel: ChannelId;
  onChannelChange: (ch: ChannelId) => void;
  onActionClick: (actionType: string) => void;
  productImage: string;
  inspectionBadge: string;
  scenarioId?: string;
  onNewTraceEvent?: (event: WebhookTraceEvent) => void;
  onNewDisputeRecord?: (record: PayPalDisputeRecord) => void;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  messages,
  currentChannel,
  onChannelChange,
  onActionClick,
  productImage,
  inspectionBadge,
  scenarioId = 'size_exchange',
  onNewTraceEvent,
  onNewDisputeRecord,
}) => {
  const [inputText, setInputText] = useState('');
  const [customMessages, setCustomMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [activeImage, setActiveImage] = useState(productImage);
  const [activeBadge, setActiveBadge] = useState(inspectionBadge);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync image if prop changes
  React.useEffect(() => {
    setActiveImage(productImage);
    setActiveBadge(inspectionBadge);
  }, [productImage, inspectionBadge]);

  const filteredMessages = [
    ...messages.filter((m) => m.channel === currentChannel),
    ...customMessages.filter((m) => m.channel === currentChannel),
  ];

  const handleSendQuery = async (queryText: string) => {
    const text = queryText.trim();
    if (!text || isThinking) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `custom-user-${Date.now()}`,
      sender: 'customer',
      channel: currentChannel,
      timestamp: timeStr,
      text,
    };

    setCustomMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    try {
      const response = await processCustomerMessage(text, currentChannel, 'Alex Mercer', scenarioId);
      setIsThinking(false);
      setCustomMessages((prev) => [...prev, response.message]);

      if (onNewTraceEvent) {
        onNewTraceEvent(response.traceEvent);
      }
      if (response.disputeRecord && onNewDisputeRecord) {
        onNewDisputeRecord(response.disputeRecord);
      }
    } catch (err) {
      setIsThinking(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendQuery(inputText);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setActiveImage(reader.result);
        setActiveBadge('Custom Photo Analyzed (Bedrock Nova Lite)');
        setShowImagePicker(false);

        // Send customer message with the new image
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const imgMsg: ChatMessage = {
          id: `custom-img-${Date.now()}`,
          sender: 'customer',
          channel: currentChannel,
          timestamp: timeStr,
          text: 'Uploaded new item photo for return inspection.',
          image: reader.result,
          imageBadge: 'Live Multimodal Scan',
        };
        setCustomMessages((prev) => [...prev, imgMsg]);

        // Trigger agent response
        handleSendQuery('Can I exchange or return this item?');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Phone Outer Titanium Chassis */}
      <div data-ui="phone-chassis" className="relative w-full max-w-[390px] rounded-[50px] bg-[#1a1a20] p-3 border border-white/[0.12] ring-1 ring-black">
        {/* Subtle Rim reflection */}
        <div className="absolute inset-0 rounded-[50px] pointer-events-none bg-white/[0.04]" />

        {/* Screen Bezel */}
        <div className="relative w-full rounded-[42px] bg-[#0c0c10] overflow-hidden flex flex-col h-[740px] border border-black">
          {/* iOS Dynamic Island & Status Bar */}
          <div className="h-11 w-full bg-[#0c0c10] px-6 flex items-center justify-between text-neutral-300 text-xs shrink-0 select-none">
            <span className="font-semibold text-white">9:41</span>
            {/* Dynamic Island pill */}
            <div className="w-28 h-5 bg-black rounded-full flex items-center justify-between px-2 text-[10px] text-cyan-400 border border-white/[0.05]">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00dce6]" />
                <span>Nova Lite</span>
              </span>
              <span className="text-neutral-500">180ms</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          {/* Omnichannel Channel Switcher Tab Strip */}
          <div className="px-3 pt-2 pb-2 bg-[#14141a] flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onChannelChange('whatsapp')}
              className={`flex-1 min-h-[38px] py-1.5 px-2 rounded-lg text-xs font-medium text-center flex items-center justify-center gap-1.5 transition-colors ${
                currentChannel === 'whatsapp'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-transparent'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => onChannelChange('rcs')}
              className={`flex-1 min-h-[38px] py-1.5 px-2 rounded-lg text-xs font-medium text-center flex items-center justify-center gap-1.5 transition-colors ${
                currentChannel === 'rcs'
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
                  : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-transparent'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>RCS Card</span>
            </button>

            <button
              onClick={() => onChannelChange('sms')}
              className={`flex-1 min-h-[38px] py-1.5 px-2 rounded-lg text-xs font-medium text-center flex items-center justify-center gap-1.5 transition-colors ${
                currentChannel === 'sms'
                  ? 'bg-[#00dce6]/20 text-[#00dce6] border border-[#00dce6]/40'
                  : 'bg-white/[0.03] text-neutral-400 hover:text-white border border-transparent'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00dce6]" />
              <span>SMS Alert</span>
            </button>
          </div>

          {/* Active Channel Header */}
          <div className="px-4 py-2.5 bg-[#171720] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    currentChannel === 'whatsapp'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : currentChannel === 'rcs'
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-[#00dce6]/20 text-[#00dce6]'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#10b981] border-2 border-[#171720]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs text-white truncate">
                    PayPal ResolveAI
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00dce6]" />
                </div>
                <span className="text-xs text-neutral-400 block truncate">
                  {currentChannel === 'whatsapp'
                    ? 'Verified Merchant Account • PayPal Protected'
                    : currentChannel === 'rcs'
                    ? 'RCS Business Messaging • Verified'
                    : 'Merchant SMS Gateway #88192'}
                </span>
              </div>
            </div>
            <div className="px-2 py-0.5 rounded bg-white/[0.04] text-[11px] text-neutral-400">
              Verified
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#0c0c10] scrollbar-none">
            {/* Encryption notice */}
            <div className="text-center">
              <span className="text-[11px] text-neutral-400 bg-white/[0.04] px-3 py-0.5 rounded-full">
                End-to-end encrypted • PayPal Seller Protection Active
              </span>
            </div>

            {filteredMessages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                {/* Pill Notice */}
                {msg.pillNotice && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs space-y-1"
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{msg.pillNotice.title}</span>
                    </div>
                    <p className="text-neutral-300 text-xs leading-relaxed">
                      {msg.pillNotice.description}
                    </p>
                  </motion.div>
                )}

                {/* Customer Message Bubble */}
                {msg.sender === 'customer' && (
                  <div className="flex flex-col items-end space-y-1 ml-6">
                    <div className="rounded-xl rounded-tr-none bg-[#1b1c24] border border-white/[0.08] p-3 text-neutral-100 space-y-2 max-w-[90%]">
                      {msg.image && (
                        <div className="relative rounded-lg overflow-hidden bg-black/40 border border-white/[0.08]">
                          <img
                            src={msg.image}
                            alt="Inspection subject"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/90 text-xs text-[#00dce6] border border-[#00dce6]/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[#00dce6]" />
                            <span>{msg.imageBadge || activeBadge}</span>
                          </div>
                        </div>
                      )}
                      <p className="text-xs leading-relaxed">{msg.text}</p>
                      <div className="flex items-center justify-end gap-1 text-[11px] text-neutral-400">
                        <span>{msg.timestamp}</span>
                        <CheckCheck className="w-3 h-3 text-[#00dce6]" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Agent Response Bubble */}
                {msg.sender === 'agent' && (
                  <div className="flex flex-col items-start space-y-1 mr-4">
                    <div className="rounded-xl rounded-tl-none bg-[#15161d] border border-white/[0.08] p-3.5 text-neutral-200 space-y-2 max-w-[95%]">
                      <div className="flex items-center gap-1.5 text-xs text-[#00dce6] font-medium">
                        <Sparkles className="w-3 h-3 text-[#00dce6]" />
                        <span>Bedrock AgentCore • Instant Triage</span>
                      </div>
                      <p className="text-xs leading-relaxed text-neutral-200">{msg.text}</p>

                      {/* Embedded Card */}
                      {msg.card && (
                        <div className="rounded-lg bg-black/40 border border-white/[0.08] p-3 space-y-2.5 mt-2">
                          <div>
                            <div className="font-semibold text-white text-xs">
                              {msg.card.title}
                            </div>
                            <div className="text-xs text-[#00dce6]">
                              {msg.card.subtitle}
                            </div>
                          </div>

                          <div className="space-y-1 text-[11px] pt-2 text-neutral-300">
                            {msg.card.specs.map((sp, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span className="text-neutral-400">{sp.label}:</span>
                                <span className="text-white font-medium">{sp.value}</span>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-2 pt-1">
                            {msg.card.primaryCta && (
                              <button
                                onClick={() => onActionClick(msg.card?.actionType || 'confirm')}
                                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#00f2fe] hover:bg-[#00dce6] text-[#00373a] font-semibold text-xs transition-[transform,background-color] flex items-center justify-center gap-2 active:scale-[0.98]"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>{msg.card.primaryCta}</span>
                              </button>
                            )}

                            {msg.card.secondaryCta && (
                              <button
                                onClick={() => onActionClick('switch_rcs')}
                                className="w-full min-h-[40px] py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-cyan-300 text-[11px] transition-[transform,background-color] flex items-center justify-center gap-1.5 border border-white/[0.06] active:scale-[0.98]"
                              >
                                <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{msg.card.secondaryCta}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1">
                        <span className="text-[#30d158] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#30d158]" />
                          Free Exchange Guarantee
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Live Thinking Indicator */}
            {isThinking && (
              <div className="flex flex-col items-start space-y-1 mr-4">
                <div className="rounded-xl rounded-tl-none bg-[#15161d] border border-white/[0.08] p-3 text-neutral-300 text-xs flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#00dce6] animate-spin" />
                  <span>Amazon Nova Lite processing intent (180ms)...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Scenario Chips for Real Testing */}
          <div className="px-3 py-1.5 bg-[#101015] flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0 scrollbar-none">
            <span className="text-neutral-500 shrink-0 font-medium text-[10px]">Test Inquiries:</span>
            <button
              onClick={() => handleSendQuery('Can I exchange this for size 10.5?')}
              className="px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 border border-white/[0.08] shrink-0 transition-colors"
            >
              Need size 10.5
            </button>
            <button
              onClick={() => handleSendQuery('The zipper is torn and broken, what can I do?')}
              className="px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 border border-white/[0.08] shrink-0 transition-colors"
            >
              Defect claim
            </button>
            <button
              onClick={() => handleSendQuery('What is your return policy and drop-off window?')}
              className="px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 border border-white/[0.08] shrink-0 transition-colors"
            >
              Policy rules
            </button>
            <button
              onClick={() => handleSendQuery('Where is my replacement shipment?')}
              className="px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 border border-white/[0.08] shrink-0 transition-colors"
            >
              Track package
            </button>
            <button
              onClick={() => handleSendQuery('Can I get free money with fake fraud loophole?')}
              className="px-2.5 py-1 rounded-full bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 shrink-0 transition-colors"
            >
              Red-Team Fraud Test
            </button>
          </div>

          {/* Image Picker Dropdown Menu */}
          <AnimatePresence>
            {showImagePicker && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-3 bg-[#171720] border border-white/[0.1] rounded-t-xl space-y-2 text-xs"
              >
                <div className="flex items-center justify-between text-neutral-300 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#00dce6]" />
                    Test Multimodal Product Photo
                  </span>
                  <button
                    onClick={() => setShowImagePicker(false)}
                    className="text-neutral-500 hover:text-white"
                  >
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setActiveImage('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80');
                      setActiveBadge('Grade A+ Verified (Sneakers)');
                      setShowImagePicker(false);
                      handleSendQuery('I want to exchange these sneakers for a half size larger.');
                    }}
                    className="p-2 rounded bg-white/[0.04] hover:bg-white/[0.08] text-left border border-white/[0.06] text-[11px]"
                  >
                    <div className="font-semibold text-white">Pristine Sneakers</div>
                    <div className="text-neutral-400 text-[10px]">Grade A+ Eligible</div>
                  </button>
                  <button
                    onClick={() => {
                      setActiveImage('https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80');
                      setActiveBadge('Grade C (Seam Delamination)');
                      setShowImagePicker(false);
                      handleSendQuery('The jacket has a broken zipper seam.');
                    }}
                    className="p-2 rounded bg-white/[0.04] hover:bg-white/[0.08] text-left border border-white/[0.06] text-[11px]"
                  >
                    <div className="font-semibold text-white">Damaged Jacket</div>
                    <div className="text-neutral-400 text-[10px]">Zero-Carbon Keep</div>
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 px-3 rounded bg-white/[0.06] hover:bg-white/[0.1] text-center text-[11px] text-[#00dce6] border border-[#00dce6]/30 font-medium"
                  >
                    Upload Custom Photo from Computer...
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Chat Input Bar */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-[#14141a]/95 flex items-center gap-2 shrink-0 min-h-[58px]"
          >
            <button
              type="button"
              onClick={() => setShowImagePicker(!showImagePicker)}
              className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              title="Attach or upload photo for multimodal inspection"
            >
              <Plus className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything (e.g. size 10.5, damage, policy)..."
              disabled={isThinking}
              className="flex-1 min-h-[40px] bg-black/50 border border-white/[0.08] rounded-full px-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00f2fe]/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isThinking || !inputText.trim()}
              className="w-10 h-10 rounded-full bg-[#00f2fe] text-[#00373a] flex items-center justify-center hover:bg-[#00dce6] transition-[transform,background-color] active:scale-95 disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
