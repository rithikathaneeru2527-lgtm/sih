import React from 'react';
import { Sparkles, FileText, Download, X, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export default function CurriculumProposalModal({ course, isOpen, onClose }) {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-base font-bold text-white">AI Curriculum Revision Proposal</h3>
              <p className="text-xs text-slate-400 font-mono">Document Ref: KAUSHAL-REV-2026-{course.code}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Course Target Info */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-400">Target Training Program:</span>
            <span className="font-bold text-white">{course.name} ({course.code})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Provider & State Scheme:</span>
            <span className="text-indigo-400">{course.provider}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Current Health Alignment:</span>
            <span className="font-bold text-rose-400">{course.healthScore}% (Flagged for Revision)</span>
          </div>
        </div>

        {/* Proposed Syllabus Additions */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wide">
            1. Recommended Syllabus Module Additions:
          </h4>
          
          <div className="space-y-2">
            {course.missingSkills && course.missingSkills.map((sk, idx) => (
              <div key={idx} className="bg-indigo-950/40 p-3 rounded-xl border border-indigo-500/30 text-xs flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-indigo-200">Module {idx + 1}: {sk}</div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Recommended Duration: 24 Hours (10h Theory + 14h Practical Lab). Increases industry skill alignment score by +18%.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Upgrade Recommendations */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wide">
            2. Infrastructure & Equipment Upgrade Requirement:
          </h4>
          <div className="bg-amber-950/30 p-3 rounded-xl border border-amber-500/30 text-xs text-amber-200 flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Lab Hardware Procurement Note: </span>
              <span>{course.equipmentLagNotes}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => alert(`Curriculum proposal for ${course.code} submitted to Maharashtra Skill Board!`)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-md"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Submit Proposal to State Skill Board</span>
          </button>

          <button
            onClick={() => alert(`Exporting ${course.code}_Revision_Proposal.json...`)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON / Brief</span>
          </button>
        </div>

      </div>
    </div>
  );
}
