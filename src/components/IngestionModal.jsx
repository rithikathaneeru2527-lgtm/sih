import React, { useState, useEffect } from 'react';
import { RefreshCw, Terminal, CheckCircle2, X } from 'lucide-react';

export default function IngestionModal({ isOpen, onClose, onComplete }) {
  const [logs, setLogs] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setLogs([]);
      setIsFinished(false);
      return;
    }

    const logSequence = [
      "Initializing KaushalSetu Continuous Signal Pipeline...",
      "Connecting to National Career Service (NCS) API endpoint...",
      "Fetched 240 active postings from Pune, Chakan & Sambhajinagar industrial zones...",
      "Connecting to Naukri & Indeed public RSS job feeds...",
      "Running spaCy En-Core-Web-MD NER model on job descriptions...",
      "Mapping extracted entity candidates to ESCO Taxonomy v1.1...",
      "Calculated cosine similarity vectors for 48 new skill entities...",
      "Updating PostgreSQL database tables: jobs, job_skills, skill_gaps...",
      "Executing Gap Analysis Engine formula: GapScore = DemandScore - SupplyScore...",
      "Recomputed Sector Gap Metrics for IT, EV Auto, Solar Green, Digital Health, BFSI, Retail.",
      "Pipeline execution successful. 5 Sector dashboards refreshed!"
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < logSequence.length) {
        setLogs(prev => [...prev, logSequence[currentIdx]]);
        currentIdx++;
      } else {
        setIsFinished(true);
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Live Ingestion & ETL Log Terminal</h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Box */}
        <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-emerald-400 h-64 overflow-y-auto space-y-1.5 border border-slate-800">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <span className="text-slate-600 font-semibold select-none">&gt;</span>
              <span className={log.includes("successful") ? "text-amber-400 font-bold" : "text-emerald-300"}>
                {log}
              </span>
            </div>
          ))}
          {!isFinished && (
            <div className="flex items-center space-x-2 text-slate-500 animate-pulse pt-2">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Processing ETL step...</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          {isFinished ? (
            <button
              onClick={() => {
                onComplete();
                onClose();
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply Refreshed Gaps to Dashboard</span>
            </button>
          ) : (
            <span className="text-xs text-slate-400 font-mono">Ingestion running...</span>
          )}
        </div>

      </div>
    </div>
  );
}
