import React, { useState } from 'react';
import { 
  UserCheck, 
  Sparkles, 
  MapPin, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  TrendingUp,
  Target,
  ExternalLink
} from 'lucide-react';
import { TRAINEES } from '../data/mockData';

export default function TraineePathways({ gapReport, courses }) {
  const [selectedTraineeId, setSelectedTraineeId] = useState(TRAINEES[0].id);
  const trainee = TRAINEES.find(t => t.id === selectedTraineeId) || TRAINEES[0];

  // Find course trainee is enrolled in
  const enrolledCourse = courses.find(c => c.id === trainee.enrolledCourseId);
  const sectorGaps = gapReport.filter(g => enrolledCourse && g.sectorId === enrolledCourse.sectorId);

  // Recommendations: top gap skills not yet possessed by trainee
  const recommendedSkills = sectorGaps.filter(g => 
    !trainee.completedSkills.includes(g.skillName)
  ).slice(0, 3);

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Trainee Selector */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400 mb-1">
            <UserCheck className="w-3.5 h-3.5" />
            <span>TRAINEE CAREER PATHWAY & MICRO-SKILL ADVISOR</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Personalized Skill Gap & Placement Pathway
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Empowering students in ITIs and state skill centers with real-time industry alignment, supplementary micro-credentials, and career roadmaps.
          </p>
        </div>

        {/* Selector */}
        <div className="flex items-center space-x-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          {TRAINEES.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTraineeId(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-2 ${
                selectedTraineeId === t.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Candidate Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Profile Card */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
          <div className="flex items-center space-x-4">
            <img 
              src={trainee.avatar} 
              alt={trainee.name} 
              className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-lg"
            />
            <div>
              <h3 className="text-base font-bold text-white">{trainee.name}</h3>
              <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-500" />
                <span>{trainee.city}, Maharashtra</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{trainee.education}</div>
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
            <div className="text-[11px] text-slate-400 font-semibold">Currently Enrolled Govt Program:</div>
            <div className="font-bold text-white flex items-center space-x-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>{trainee.enrolledCourseName}</span>
            </div>
          </div>

          {/* Industry Readiness Gauge */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-center relative overflow-hidden">
            <span className="text-xs text-slate-400 font-semibold">Target Industry Role Readiness</span>
            <div className="text-3xl font-extrabold text-indigo-400 font-mono my-1">
              {trainee.matchPercentage}%
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden my-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${trainee.matchPercentage}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Complete recommended micro-skills below to boost readiness to <strong className="text-emerald-400">92%</strong>
            </p>
          </div>
        </div>

        {/* Center: Recommended Supplementary Micro-Skills */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI Recommended Supplementary Micro-Skills</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">High Employability Impact</span>
          </div>

          <div className="space-y-3">
            {recommendedSkills.map((sk, idx) => (
              <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-500/40 transition-all">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono text-[10px] border border-indigo-500/20">
                      ESCO: {sk.escoCode}
                    </span>
                    <span className="text-xs font-bold text-white">{sk.skillName}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Required by <strong className="text-indigo-300">{sk.demandScore}% of active job postings</strong> in your region.
                  </p>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-bold text-emerald-400 block">+25% Match Boost</span>
                    <span className="text-[10px] text-slate-500">2-week micro module</span>
                  </div>

                  <button 
                    onClick={() => alert(`Enrolling ${trainee.name} in micro-module: ${sk.skillName}`)}
                    className="py-1.5 px-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1"
                  >
                    <span>Enroll Micro-Skill</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Career Pathway Progression Timeline */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 mb-3 flex items-center space-x-1.5">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Career Pathway Timeline to Target Role: {trainee.targetRole}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative">
              {/* Step 1 */}
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs">
                <span className="text-[9px] font-mono text-indigo-400 uppercase font-semibold">Step 1 (Current)</span>
                <div className="font-bold text-white mt-0.5 truncate">{trainee.enrolledCourseName}</div>
                <div className="text-[10px] text-slate-400 mt-1">Core Govt Training</div>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-900/90 p-3 rounded-xl border border-indigo-500/40 text-xs">
                <span className="text-[9px] font-mono text-amber-400 uppercase font-semibold">Step 2 (In Progress)</span>
                <div className="font-bold text-white mt-0.5 truncate">Supplementary Micro-Skills</div>
                <div className="text-[10px] text-slate-400 mt-1">2-3 Weeks Online & Lab</div>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-900/90 p-3 rounded-xl border border-emerald-500/40 text-xs">
                <span className="text-[9px] font-mono text-emerald-400 uppercase font-semibold">Step 3 (Placement)</span>
                <div className="font-bold text-emerald-300 mt-0.5 truncate">{trainee.targetRole}</div>
                <div className="text-[10px] text-slate-400 mt-1">Est Salary: ₹4.2L - ₹6.8L/yr</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
