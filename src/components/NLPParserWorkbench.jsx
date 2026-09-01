import React, { useState } from 'react';
import { 
  FileSearch, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Database, 
  Bot, 
  ArrowRight,
  RefreshCw,
  Tag
} from 'lucide-react';
import { extractSkillsFromRawJobText } from '../utils/gapEngine';

const SAMPLE_POSTINGS = [
  {
    title: "Pune Cloud & AI Engineer (Tech Mahindra)",
    company: "Tech Mahindra Pune",
    sectorId: "sec-it",
    text: "We are hiring a Junior Software Engineer in Pune. Candidate must have strong hands-on experience in Python & FastAPI microservices architecture, Docker containerization, and React frontend. Experience with Generative AI & LLM Prompting and Kubernetes deployment is highly desirable."
  },
  {
    title: "EV Powertrain & BMS Specialist (Tata Motors Chakan)",
    company: "Tata Motors EV Division",
    sectorId: "sec-auto",
    text: "Tata Motors Chakan Plant requires EV Technicians! Required skills: EV Battery BMS Diagnostics, CAN Bus Protocol Vehicle Testing, high-voltage safety procedures, and automated robotic arm maintenance."
  },
  {
    title: "Solar Substation Specialist (Waaree Solapur)",
    company: "Waaree Energies",
    sectorId: "sec-green",
    text: "Immediate vacancy for Solar Microgrid Technician in Solapur. Responsibilities: Solar PV Microgrid Telemetry monitoring, High Voltage Inverter Calibration, and Smart Metering sensor diagnostics."
  }
];

export default function NLPParserWorkbench({ onIngestNewPosting }) {
  const [selectedSample, setSelectedSample] = useState(0);
  const [jobText, setJobText] = useState(SAMPLE_POSTINGS[0].text);
  const [jobTitle, setJobTitle] = useState(SAMPLE_POSTINGS[0].title);
  const [company, setCompany] = useState(SAMPLE_POSTINGS[0].company);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedResults, setExtractedResults] = useState(null);
  const [ingestSuccess, setIngestSuccess] = useState(false);

  const handleSelectSample = (idx) => {
    setSelectedSample(idx);
    setJobText(SAMPLE_POSTINGS[idx].text);
    setJobTitle(SAMPLE_POSTINGS[idx].title);
    setCompany(SAMPLE_POSTINGS[idx].company);
    setExtractedResults(null);
    setIngestSuccess(false);
  };

  const handleRunNLP = () => {
    setIsProcessing(true);
    setIngestSuccess(false);
    
    setTimeout(() => {
      const skills = extractSkillsFromRawJobText(jobText);
      setExtractedResults(skills);
      setIsProcessing(false);
    }, 600);
  };

  const handleCommitIngestion = () => {
    if (!extractedResults || extractedResults.length === 0) return;
    
    const newJob = {
      id: "job-nlp-" + Date.now(),
      title: jobTitle || "Ingested Job Signal",
      company: company || "Direct Ingestion Signal",
      sectorId: SAMPLE_POSTINGS[selectedSample]?.sectorId || "sec-it",
      location: "Maharashtra Industrial Hub",
      postedDate: new Date().toISOString().split('T')[0],
      extractedSkills: extractedResults.map(r => r.skillName),
      rawText: jobText
    };

    onIngestNewPosting(newJob);
    setIngestSuccess(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400 mb-1">
          <Cpu className="w-3.5 h-3.5" />
          <span>NLP UNSTRUCTURED SIGNAL INGESTION & SKILL NER</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Job Signal Extraction Workbench (spaCy + ESCO Embeddings)
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Ingest raw, unformatted job postings from Naukri, LinkedIn, or National Career Service (NCS) and extract normalized skill entities via semantic embedding matching.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Side: Input Form & Sample Selector */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <FileSearch className="w-4 h-4 text-indigo-400" />
              <span>Raw Job Posting Input</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Live Parser v2.4</span>
          </div>

          {/* Preset selector */}
          <div>
            <label className="text-[11px] text-slate-400 font-medium mb-1.5 block">
              Load Preset Maharashtra Job Posting:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SAMPLE_POSTINGS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(idx)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    selectedSample === idx
                      ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold truncate">{sample.company}</div>
                  <div className="text-[10px] text-slate-500 truncate">{sample.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Title & Company */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 font-medium mb-1 block">Job Title</label>
              <input 
                type="text" 
                value={jobTitle} 
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 font-medium mb-1 block">Company / Recruiter</label>
              <input 
                type="text" 
                value={company} 
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Raw Textarea */}
          <div>
            <label className="text-[11px] text-slate-400 font-medium mb-1 block">
              Raw Description (Unstructured Text)
            </label>
            <textarea 
              rows={6}
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
            />
          </div>

          <button
            onClick={handleRunNLP}
            disabled={isProcessing}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running spaCy NER + Embedding Matcher...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Execute NLP Skill Extraction Pipeline</span>
              </>
            )}
          </button>
        </div>

        {/* Right Side: Extraction Results & Canonical ESCO Mapping */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>Extracted Skill Entities & ESCO Taxonomy</span>
              </h3>
              {extractedResults && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                  {extractedResults.length} Entities Identified
                </span>
              )}
            </div>

            {/* Results List */}
            {!extractedResults ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-800 rounded-xl">
                <FileSearch className="w-8 h-8 text-slate-600 mb-2" />
                <p className="text-xs text-slate-400">
                  Click "Execute NLP Pipeline" to extract skill entities from the job description.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {extractedResults.map((item, idx) => (
                  <div key={idx} className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white">{item.skillName}</span>
                        <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-mono">
                          {item.escoCode}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center space-x-2">
                        <span>Category: {item.category}</span>
                        <span>•</span>
                        <span>Matched Text: "{item.matchedEntity}"</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-extrabold text-emerald-400 font-mono">
                        {item.confidence}% Match
                      </span>
                      <div className="text-[9px] text-slate-500">Cosine Similarity</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Commit Ingestion Action */}
          {extractedResults && (
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
              {ingestSuccess ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Signal Ingested! State Sector Gap scores automatically recomputed.</span>
                </div>
              ) : (
                <button
                  onClick={handleCommitIngestion}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <Database className="w-4 h-4" />
                  <span>Ingest Job Signal & Recompute Gap Engine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
