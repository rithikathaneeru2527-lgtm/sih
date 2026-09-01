import React from 'react';
import { 
  Building2, 
  Cpu, 
  UserCheck, 
  RefreshCw, 
  Sparkles, 
  BarChart3, 
  BookOpen, 
  FileSearch,
  CheckCircle2
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onTriggerIngest, onOpenLogin, userProfile, stats }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-amber-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
                  KaushalSetu
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                  SIH26134
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Maharashtra Skill-Curriculum Labour Market Alignment Engine
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Policy Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'courses'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Course Health</span>
            </button>

            <button
              onClick={() => setActiveTab('nlp')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'nlp'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FileSearch className="w-3.5 h-3.5" />
              <span>Job Signal NLP</span>
            </button>

            <button
              onClick={() => setActiveTab('trainee')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'trainee'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Trainee Guidance</span>
            </button>
          </nav>

          {/* Controls & Ingestion Trigger */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-3 text-xs text-slate-400 border-r border-slate-800 pr-3">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{stats.jobsCount} Signals Ingested</span>
              </span>
              <span className="text-slate-600">•</span>
              <span>{stats.coursesCount} Courses Evaluated</span>
            </div>

            <button
              onClick={onTriggerIngest}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all active:scale-95 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Run Live Ingestion</span>
            </button>

            <button
              onClick={onOpenLogin}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-all"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                {userProfile ? `+91 ${userProfile.phone.slice(0, 5)}...` : 'Portal Login'}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
