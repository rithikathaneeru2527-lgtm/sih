import React, { useState } from 'react';
import { 
  BookOpen, 
  AlertCircle, 
  CheckCircle2, 
  Wrench, 
  Layers, 
  FileText, 
  Sparkles, 
  Search,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function CourseHealthAnalyzer({ courses, gapReport, onSelectCourseProposal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNeedsRevision, setFilterNeedsRevision] = useState(false);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterNeedsRevision ? course.needsRevision : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400 mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>STATE CURRICULUM REPOSITORY & REVISION MONITOR</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Govt Training Course Health Catalog
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Automated alignment scoring of Maharashtra State Skill Development (MSSDS) and ITI courses against real-time industry skill gap signals.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search course code or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-900/90 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-56"
            />
          </div>

          <button
            onClick={() => setFilterNeedsRevision(!filterNeedsRevision)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center space-x-1.5 ${
              filterNeedsRevision
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Needs Revision Only</span>
          </button>
        </div>
      </div>

      {/* Course Catalog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map(course => {
          const healthColor = course.healthScore >= 75 ? 'emerald' : course.healthScore >= 60 ? 'amber' : 'rose';

          return (
            <div 
              key={course.id}
              className={`glass-panel rounded-2xl p-6 border transition-all duration-300 relative ${
                course.needsRevision 
                  ? 'border-rose-500/30 hover:border-rose-500/50 bg-slate-950/70' 
                  : 'border-slate-800/80 hover:border-indigo-500/40 bg-slate-950/40'
              }`}
            >
              {/* Header info */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-800 text-indigo-400 border border-slate-700">
                    {course.code}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5 leading-snug">
                    {course.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {course.provider}
                  </p>
                </div>

                {/* Health Score Badge */}
                <div className="flex flex-col items-end">
                  <div className={`text-2xl font-extrabold font-mono text-${healthColor}-400`}>
                    {course.healthScore}%
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Health Score</span>
                </div>
              </div>

              {/* Revision Tag */}
              <div className="mb-4">
                {course.needsRevision ? (
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>FLAGGED FOR CURRICULUM REVISION</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>ALIGNMENT SATISFACTORY</span>
                  </div>
                )}
              </div>

              {/* Skills Taught vs Missing Skills */}
              <div className="space-y-3 mb-5">
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold mb-1.5">Skills Currently Taught:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {course.skillsTaught.map((st, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[11px] bg-slate-900 border border-slate-800 text-slate-300">
                        {st.name} <span className="text-indigo-400 text-[9px] font-mono">({st.depthLevel}%)</span>
                      </span>
                    ))}
                  </div>
                </div>

                {course.missingSkills && course.missingSkills.length > 0 && (
                  <div>
                    <div className="text-[11px] text-rose-400 font-semibold mb-1.5 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" /> Missing In-Demand Industry Skills:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {course.missingSkills.map((ms, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded text-[11px] bg-rose-500/10 border border-rose-500/20 text-rose-300 font-medium">
                          + {ms}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Equipment Lag Notes */}
                {course.equipmentLagNotes && (
                  <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 text-xs flex items-start space-x-2">
                    <Wrench className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200">Equipment Lag Warning: </span>
                      <span className="text-slate-400 text-[11px]">{course.equipmentLagNotes}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer action */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  Enrolled Trainees: <strong className="text-slate-200">{course.enrolledTrainees}</strong> ({course.durationWeeks} weeks)
                </div>

                <button
                  onClick={() => onSelectCourseProposal(course)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Revision Proposal</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
