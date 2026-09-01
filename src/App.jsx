import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SectorIntelligence from './components/SectorIntelligence';
import CourseHealthAnalyzer from './components/CourseHealthAnalyzer';
import NLPParserWorkbench from './components/NLPParserWorkbench';
import TraineePathways from './components/TraineePathways';
import IngestionModal from './components/IngestionModal';
import CurriculumProposalModal from './components/CurriculumProposalModal';
import LoginModal from './components/LoginModal';

import { SECTORS, SKILL_TAXONOMY, COURSES, MOCK_JOB_POSTINGS } from './data/mockData';
import { computeGapReport, evaluateCourseHealth } from './utils/gapEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSector, setSelectedSector] = useState(null);
  
  // Authentication State - Defaults to false on load to enforce login modal popup first
  const [isAuthOpen, setIsAuthOpen] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  // Dynamic state
  const [jobPostings, setJobPostings] = useState(MOCK_JOB_POSTINGS);
  const [courses, setCourses] = useState(COURSES);
  
  // Modals
  const [isIngestionOpen, setIsIngestionOpen] = useState(false);
  const [selectedCourseProposal, setSelectedCourseProposal] = useState(null);

  // Compute live state-wide gap report
  const gapReport = useMemo(() => {
    return computeGapReport(null, jobPostings, courses, SKILL_TAXONOMY);
  }, [jobPostings, courses]);

  // Compute live course health evaluations
  const evaluatedCourses = useMemo(() => {
    return courses.map(course => {
      const healthEval = evaluateCourseHealth(course, gapReport);
      return {
        ...course,
        ...healthEval
      };
    });
  }, [courses, gapReport]);

  const handleLoginSuccess = (profile) => {
    setUserProfile(profile);
    setIsAuthOpen(false);
  };

  // Handle new posting ingestion
  const handleIngestNewPosting = (newJob) => {
    setJobPostings(prev => [newJob, ...prev]);
  };

  // Handle live ingestion trigger completion
  const handleIngestionComplete = () => {
    const simulatedFreshJob = {
      id: "job-live-" + Date.now(),
      title: "Senior EV & Microgrid Telemetry Lead",
      company: "Mahagenco Green Energy Cell",
      sectorId: "sec-green",
      location: "Solapur Solar Park",
      postedDate: new Date().toISOString().split('T')[0],
      extractedSkills: ["Solar PV Microgrid Telemetry", "Smart Metering & Grid Monitoring", "High Voltage Inverter Calibration"],
      rawText: "Mahagenco requires Microgrid Telemetry specialists for Solapur solar installations."
    };
    handleIngestNewPosting(simulatedFreshJob);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Navigation Bar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onTriggerIngest={() => setIsIngestionOpen(true)}
        onOpenLogin={() => setIsAuthOpen(true)}
        userProfile={userProfile}
        stats={{
          jobsCount: jobPostings.length,
          coursesCount: courses.length
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'dashboard' && (
          <SectorIntelligence 
            sectors={SECTORS}
            gapReport={gapReport}
            selectedSector={selectedSector}
            setSelectedSector={setSelectedSector}
          />
        )}

        {activeTab === 'courses' && (
          <CourseHealthAnalyzer 
            courses={evaluatedCourses}
            gapReport={gapReport}
            onSelectCourseProposal={(crs) => setSelectedCourseProposal(crs)}
          />
        )}

        {activeTab === 'nlp' && (
          <NLPParserWorkbench 
            onIngestNewPosting={handleIngestNewPosting}
          />
        )}

        {activeTab === 'trainee' && (
          <TraineePathways 
            gapReport={gapReport}
            courses={evaluatedCourses}
          />
        )}

      </main>

      {/* Login Modal Popup - Always appears before main dashboard access */}
      <LoginModal 
        isOpen={isAuthOpen}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Ingestion & Proposal Modals */}
      <IngestionModal 
        isOpen={isIngestionOpen}
        onClose={() => setIsIngestionOpen(false)}
        onComplete={handleIngestionComplete}
      />

      <CurriculumProposalModal 
        course={selectedCourseProposal}
        isOpen={!!selectedCourseProposal}
        onClose={() => setSelectedCourseProposal(null)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>KaushalSetu</strong> — SIH26134 Maharashtra Labour Market Intelligence & Skill-Curriculum Alignment Engine
          </div>
          <div className="font-mono text-[11px] text-slate-600">
            Powered by spaCy NLP • ESCO Taxonomy • Recharts • React 19
          </div>
        </div>
      </footer>

    </div>
  );
}
