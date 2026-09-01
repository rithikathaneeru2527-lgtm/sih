import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  AlertTriangle, 
  Layers, 
  Code2, 
  Car, 
  Sun, 
  HeartPulse, 
  Landmark, 
  ShoppingBag,
  ArrowUpRight,
  Sparkles,
  Zap,
  Filter
} from 'lucide-react';

const iconMap = {
  Code2: Code2,
  Car: Car,
  Sun: Sun,
  HeartPulse: HeartPulse,
  Landmark: Landmark,
  ShoppingBag: ShoppingBag
};

export default function SectorIntelligence({ sectors, gapReport, selectedSector, setSelectedSector }) {
  const currentSectorObj = sectors.find(s => s.id === selectedSector) || sectors[0];
  
  // Filter gap data for selected sector or show top gaps overall
  const displayGaps = selectedSector 
    ? gapReport.filter(g => g.sectorId === selectedSector)
    : gapReport.slice(0, 8);

  // Data formatted for Recharts Dual Bar Chart
  const chartData = displayGaps.map(item => ({
    name: item.skillName.length > 20 ? item.skillName.substring(0, 18) + '...' : item.skillName,
    fullName: item.skillName,
    "Demand Score (Industry)": item.demandScore,
    "Supply Score (Curriculum)": item.supplyScore,
    gap: item.gapScore
  }));

  const IconComponent = iconMap[currentSectorObj.icon] || Code2;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Sector Selector Pills */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MACRO LABOUR MARKET INTELLIGENCE</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Maharashtra Sector-wise Skill Gap Engine
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Real-time synchronization between industry job postings (NCS/Naukri) and government skill training programs (MSSDS/DVET).
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setSelectedSector(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedSector === null
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Sectors
            </button>
            {sectors.map(sec => (
              <button
                key={sec.id}
                onClick={() => setSelectedSector(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  selectedSector === sec.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{sec.code}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sector Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/60">
            <span className="text-[11px] text-slate-400 font-medium">Sector Employment Growth</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xl font-extrabold text-emerald-400">+{currentSectorObj.growthRate}%</span>
              <span className="flex items-center text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">
                <TrendingUp className="w-3 h-3 mr-0.5" /> PLFS 2026
              </span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/60">
            <span className="text-[11px] text-slate-400 font-medium">Active Ingested Job Signals</span>
            <div className="text-xl font-extrabold text-white mt-1">
              {currentSectorObj.jobsCount} <span className="text-xs font-normal text-slate-400">postings</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/60">
            <span className="text-[11px] text-slate-400 font-medium">Mapped Govt Skill Courses</span>
            <div className="text-xl font-extrabold text-indigo-400 mt-1">
              {currentSectorObj.coursesMapped} <span className="text-xs font-normal text-slate-400">catalog items</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/60">
            <span className="text-[11px] text-slate-400 font-medium">Top Critical Deficit Skill</span>
            <div className="text-xs font-bold text-amber-400 truncate mt-1.5" title={currentSectorObj.topGapSkill}>
              {currentSectorObj.topGapSkill}
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual-Bar Chart & Key Insight Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dual Bar Chart (Demand vs Supply) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span>Demand vs Supply Alignment Score</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparison of Normalized Industry Skill Demand against State Training Delivery (0-100 Scale)
              </p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-indigo-500"></span>
                <span className="text-slate-300">Industry Demand</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-slate-600"></span>
                <span className="text-slate-300">Govt Curriculum Supply</span>
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  tick={{ fill: '#94a3b8', fontSize: 11 }} 
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                />
                <Bar dataKey="Demand Score (Industry)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Supply Score (Curriculum)" fill="#475569" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Executive Action Policy Insights */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>AUTOMATED POLICY RECOMMENDATION</span>
            </div>
            
            <h3 className="text-base font-bold text-white mb-2">
              High Skill Lag in {currentSectorObj.name}
            </h3>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Our continuous ingestion engine detected a <strong className="text-amber-400">+{currentSectorObj.growthRate}% spike</strong> in job listings requiring advanced competency in <span className="text-indigo-400 font-semibold">{currentSectorObj.topGapSkill}</span>.
            </p>

            <div className="space-y-3">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 text-xs">
                <div className="font-semibold text-slate-200 mb-1">Industrial Cluster Impact:</div>
                <div className="text-slate-400 font-mono text-[11px]">{currentSectorObj.region}</div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 text-xs">
                <div className="font-semibold text-slate-200 mb-1">Curriculum Revision Order:</div>
                <div className="text-emerald-400 text-[11px] font-medium flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                  Mandate 30h supplementary module in catalog
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <button 
              onClick={() => alert(`Generating Policy Action Memo for ${currentSectorObj.name} Skill Alignment...`)}
              className="w-full py-2.5 px-4 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Export Policy Action Brief (PDF)</span>
            </button>
          </div>
        </div>

      </div>

      {/* Detailed Skill Gap Matrix Table */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white">
              Ranked Skill Deficit Matrix (ESCO Taxonomy Mapped)
            </h3>
            <p className="text-xs text-slate-400">
              Sorted by computed Gap Score (Demand Score - Supply Score)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4 rounded-l-lg">Skill Name</th>
                <th className="py-3 px-4">ESCO Code</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Demand Score</th>
                <th className="py-3 px-4 text-center">Supply Score</th>
                <th className="py-3 px-4 text-center">Gap Score</th>
                <th className="py-3 px-4 text-right rounded-r-lg">Priority Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {displayGaps.map((item, idx) => (
                <tr key={item.skillId || idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">
                    {item.skillName}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                    {item.escoCode}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-indigo-400">
                    {item.demandScore}/100
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-slate-400">
                    {item.supplyScore}/100
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-extrabold text-amber-400 text-sm">
                      +{item.gapScore}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold font-mono ${
                      item.priority === 'Urgent'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        : item.priority === 'High'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
