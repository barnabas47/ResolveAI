import React, { useState, useMemo, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  AllCommunityModule,
  ModuleRegistry,
  GridReadyEvent,
  ICellRendererParams,
} from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import {
  Search,
  Download,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  DollarSign,
  ArrowRight,
  Filter,
  Database,
} from 'lucide-react';
import { PayPalDisputeRecord } from '../services/paypalService';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface AGGridDisputeLedgerProps {
  records: PayPalDisputeRecord[];
  onSelectRecord?: (record: PayPalDisputeRecord) => void;
}

export const AGGridDisputeLedger: React.FC<AGGridDisputeLedgerProps> = ({
  records,
  onSelectRecord,
}) => {
  const gridRef = useRef<AgGridReact<PayPalDisputeRecord>>(null);
  const [quickFilterText, setQuickFilterText] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<PayPalDisputeRecord | null>(null);

  // Column Definitions for AG Grid
  const columnDefs = useMemo<ColDef<PayPalDisputeRecord>[]>(
    () => [
      {
        field: 'id',
        headerName: 'Dispute ID',
        width: 140,
        pinned: 'left',
        cellRenderer: (params: ICellRendererParams<PayPalDisputeRecord>) => (
          <div className="flex items-center gap-1.5 text-[#00dce6] font-medium">
            <code>{params.value}</code>
          </div>
        ),
      },
      {
        field: 'transactionId',
        headerName: 'PayPal TxID',
        width: 155,
        cellRenderer: (params: ICellRendererParams<PayPalDisputeRecord>) => (
          <div className="text-neutral-300">
            <code>{params.value}</code>
          </div>
        ),
      },
      {
        field: 'orderNumber',
        headerName: 'Order',
        width: 95,
        cellRenderer: (params: ICellRendererParams<PayPalDisputeRecord>) => (
          <span className="text-neutral-400">{params.value}</span>
        ),
      },
      {
        field: 'customerName',
        headerName: 'Customer',
        width: 130,
        cellRenderer: (params: ICellRendererParams<PayPalDisputeRecord>) => (
          <span className="text-white font-medium">{params.value}</span>
        ),
      },
      {
        field: 'amount',
        headerName: 'Amount',
        width: 95,
        valueFormatter: (params) => `$${params.value?.toFixed(2)}`,
        cellClass: 'text-white font-semibold',
      },
      {
        field: 'claimReason',
        headerName: 'Claim Reason',
        width: 140,
        cellRenderer: (params: ICellRendererParams<PayPalDisputeRecord>) => {
          const reason = params.value;
          const label =
            reason === 'INCORRECT_SIZE'
              ? 'Wrong Size'
              : reason === 'DAMAGED_TRANSIT'
              ? 'Damaged Transit'
              : reason === 'FRAUD_SUSPECTED'
              ? 'Suspected Fraud'
              : reason === 'PROMPT_INJECTION'
              ? 'Prompt Injection'
              : 'Not As Described';

          return (
            <span className="px-2 py-0.5 rounded bg-white/[0.04] text-neutral-300 text-xs">
              {label}
            </span>
          );
        },
      },
      {
        field: 'inspectionGrade',
        headerName: 'Vision Verdict',
        width: 180,
        cellRenderer: (params: ICellRendererParams<PayPalDisputeRecord>) => {
          const grade = params.value || '';
          const isPassed = grade.includes('Grade A+');
          const isDefect = grade.includes('Grade C');

          return (
            <span
              className={`px-2.5 py-0.5 rounded text-xs inline-flex items-center gap-1 font-medium ${
                isPassed
                  ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/30'
                  : isDefect
                  ? 'bg-amber-950/40 text-amber-300 border border-amber-500/30'
                  : 'bg-rose-950/40 text-rose-300 border border-rose-500/30'
              }`}
            >
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span>{grade}</span>
            </span>
          );
        },
      },
      {
        field: 'disputeStatus',
        headerName: 'Settlement Status',
        width: 185,
        cellRenderer: (params: ICellRendererParams<PayPalDisputeRecord>) => {
          const status = params.value;
          const isRefund = status === 'RESOLVED_REFUND';
          const isExchange = status === 'RESOLVED_EXCHANGE';

          return (
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${
                isRefund
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : isExchange
                  ? 'bg-[#00dce6]/15 text-[#00dce6] border border-[#00dce6]/30'
                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isRefund ? 'bg-emerald-400' : isExchange ? 'bg-[#00dce6]' : 'bg-amber-400'
                }`}
              />
              <span>
                {isRefund
                  ? 'Auto Refund Issued'
                  : isExchange
                  ? 'Free Exchange Locked'
                  : 'Escalated to Merchant'}
              </span>
            </span>
          );
        },
      },
      {
        field: 'paypalFeeSaved',
        headerName: 'Fee Saved',
        width: 120,
        cellRenderer: (params: ICellRendererParams<PayPalDisputeRecord>) => (
          <span className="text-emerald-400 font-medium">
            +${params.value?.toFixed(2)}
          </span>
        ),
      },
      {
        field: 'latencyMs',
        headerName: 'Latency',
        width: 105,
        cellRenderer: (params: ICellRendererParams<PayPalDisputeRecord>) => (
          <span className="text-cyan-300 text-xs">{params.value}ms</span>
        ),
      },
      {
        field: 'timestamp',
        headerName: 'Recorded',
        width: 130,
        cellClass: 'text-neutral-400 text-xs',
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      enableCellChangeFlash: true,
    }),
    []
  );

  const onGridReady = useCallback((params: GridReadyEvent) => {
    // Only fit columns if container is sufficiently wide
    if (window.innerWidth >= 1400) {
      params.api.sizeColumnsToFit();
    }
  }, []);

  const handleExportCsv = () => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: `paypal-dispute-ledger-${Date.now()}.csv`,
    });
  };

  const totalSaved = records.reduce((acc, curr) => acc + (curr.paypalFeeSaved || 0), 0);
  const resolvedCount = records.filter(
    (r) => r.disputeStatus === 'RESOLVED_REFUND' || r.disputeStatus === 'RESOLVED_EXCHANGE'
  ).length;

  return (
    <div className="space-y-4">
      {/* Grid Controls Bar */}
      <div className="rounded-xl bg-[#13141a] border border-white/[0.08] p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Database className="w-4 h-4 text-[#00dce6]" />
          <h2 className="font-display text-base font-semibold text-white tracking-tight">
            AG Grid Enterprise · PayPal Dispute &amp; Settlement Ledger
          </h2>
          <span className="px-2 py-0.5 rounded bg-white/[0.05] text-[11px] text-neutral-400">
            {records.length} Settled Records
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Filter */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 border border-white/[0.08] text-white">
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search disputes, TxID, customer..."
              value={quickFilterText}
              onChange={(e) => setQuickFilterText(e.target.value)}
              className="bg-transparent border-0 outline-none text-xs text-white placeholder-neutral-500 w-48 sm:w-60"
            />
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCsv}
            className="min-h-[36px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs transition-colors border border-white/[0.08]"
          >
            <Download className="w-3.5 h-3.5 text-[#00dce6]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* AG Grid Table Container */}
      <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#101015]">
        <div
          className="ag-theme-quartz-dark"
          style={{ height: '480px', width: '100%' }}
        >
          <AgGridReact<PayPalDisputeRecord>
            ref={gridRef}
            rowData={records}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            quickFilterText={quickFilterText}
            onGridReady={onGridReady}
            rowSelection="single"
            onRowClicked={(event) => {
              if (event.data) {
                setSelectedRecord(event.data);
                if (onSelectRecord) onSelectRecord(event.data);
              }
            }}
            animateRows={true}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50]}
          />
        </div>
      </div>

      {/* Selected Dispute Detail Drawer */}
      {selectedRecord && (
        <div className="p-4 rounded-xl bg-[#13141a] border border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between pb-2.5 mb-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-sm">
                Dispute Inspection Detail: {selectedRecord.id}
              </span>
              <span className="text-xs text-neutral-400">({selectedRecord.itemTitle})</span>
            </div>
            <button
              onClick={() => setSelectedRecord(null)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Close Drawer
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-neutral-400">PayPal Transaction Reference:</span>
              <div className="text-white font-medium">
                <code>{selectedRecord.transactionId}</code>
              </div>
              <div className="text-neutral-500 text-[11px]">
                Order #{selectedRecord.orderNumber} • ${selectedRecord.amount.toFixed(2)} USD
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-neutral-400">Autonomous Settlement Action:</span>
              <div className="text-[#00dce6] font-medium">
                {selectedRecord.paypalActionType}
              </div>
              <div className="text-emerald-400 text-[11px]">
                {selectedRecord.disputeStatus} • Dispute Fee Waived (+$20.00)
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-neutral-400">Multimodal Evidence:</span>
              {selectedRecord.evidenceImageUrl ? (
                <div className="flex items-center gap-2 mt-1">
                  <img
                    src={selectedRecord.evidenceImageUrl}
                    alt="Dispute subject"
                    className="w-12 h-12 object-cover rounded border border-white/[0.1]"
                  />
                  <div>
                    <span className="text-white font-medium block">
                      {selectedRecord.inspectionGrade}
                    </span>
                    <span className="text-neutral-500 text-[11px]">
                      Latency: {selectedRecord.latencyMs}ms
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-neutral-500">No physical evidence attached</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
