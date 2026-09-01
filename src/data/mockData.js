// SIH26134 - KaushalSetu Dataset
// Maharashtra Labour Market Intelligence & Skill Taxonomy Seed Data

export const SECTORS = [
  {
    id: "sec-it",
    name: "IT & Cloud Services",
    code: "IT/ITES",
    growthRate: 14.2,
    jobsCount: 485,
    coursesMapped: 6,
    region: "Pune - Chhatrapati Sambhajinagar - Mumbai",
    icon: "Code2",
    description: "Cloud computing, AI microservices, cyber defense, and enterprise software engineering.",
    topGapSkill: "Generative AI & LLM Prompting",
    accentColor: "indigo"
  },
  {
    id: "sec-auto",
    name: "Automotive & Electric Vehicles",
    code: "AUTO-EV",
    growthRate: 18.5,
    jobsCount: 390,
    coursesMapped: 5,
    region: "Chakan (Pune) - Aurangabad Industrial City - Nashik",
    icon: "Car",
    description: "Electric vehicle powertrain assembly, battery management systems, and CNC robotics.",
    topGapSkill: "EV Battery BMS Diagnostics",
    accentColor: "amber"
  },
  {
    id: "sec-green",
    name: "Solar & Green Energy",
    code: "SOLAR-GREEN",
    growthRate: 24.8,
    jobsCount: 310,
    coursesMapped: 4,
    region: "Solapur - Vidarbha - North Maharashtra",
    icon: "Sun",
    description: "Solar PV microgrid installation, high-voltage substation maintenance, and smart meters.",
    topGapSkill: "Microgrid Telemetry & Smart Meters",
    accentColor: "emerald"
  },
  {
    id: "sec-health",
    name: "Digital Healthcare & Pharma",
    code: "HEALTH-TECH",
    growthRate: 15.1,
    jobsCount: 260,
    coursesMapped: 4,
    region: "Mumbai Metropolitan - Nagpur - Thane",
    icon: "HeartPulse",
    description: "Tele-ICU operations, diagnostic equipment calibration, and digital health records.",
    topGapSkill: "Tele-ICU Monitoring Protocols",
    accentColor: "rose"
  },
  {
    id: "sec-bfsi",
    name: "BFSI & FinTech",
    code: "BFSI-FINTECH",
    growthRate: 11.4,
    jobsCount: 340,
    coursesMapped: 5,
    region: "BKC Mumbai - Navi Mumbai - Pune",
    icon: "Landmark",
    description: "Digital payment gateways, fraud telemetry, GST micro-accounting, and POS systems.",
    topGapSkill: "UPI Merchant API & Anti-Fraud",
    accentColor: "cyan"
  },
  {
    id: "sec-retail",
    name: "Retail & E-Commerce Logistics",
    code: "RETAIL-LOG",
    growthRate: 9.8,
    jobsCount: 290,
    coursesMapped: 4,
    region: "Bhiwandi - Navi Mumbai - Pune Logistics Hub",
    icon: "ShoppingBag",
    description: "Automated warehouse RFID sorting, omnichannel inventory management, and last-mile dispatch.",
    topGapSkill: "RFID Warehouse Automation",
    accentColor: "purple"
  }
];

export const SKILL_TAXONOMY = [
  { id: "sk-01", name: "Python & FastAPI Microservices", category: "Software", sectorId: "sec-it", escoCode: "ESCO-2512.1" },
  { id: "sk-02", name: "Generative AI & LLM Prompting", category: "Emerging Tech", sectorId: "sec-it", escoCode: "ESCO-2519.4" },
  { id: "sk-03", name: "Docker Containerization & Kubernetes", category: "DevOps", sectorId: "sec-it", escoCode: "ESCO-2511.3" },
  { id: "sk-04", name: "React Frontend State Management", category: "Software", sectorId: "sec-it", escoCode: "ESCO-2512.8" },
  { id: "sk-05", name: "Cybersecurity Threat Telemetry", category: "Security", sectorId: "sec-it", escoCode: "ESCO-2529.1" },

  { id: "sk-06", name: "EV Battery BMS Diagnostics", category: "EV Engineering", sectorId: "sec-auto", escoCode: "ESCO-3115.2" },
  { id: "sk-07", name: "CAN Bus Protocol Vehicle Testing", category: "Diagnostics", sectorId: "sec-auto", escoCode: "ESCO-3115.7" },
  { id: "sk-08", name: "CNC Machining & G-Code Programming", category: "Manufacturing", sectorId: "sec-auto", escoCode: "ESCO-7223.1" },
  { id: "sk-09", name: "Automated Robotic Arm Maintenance", category: "Robotics", sectorId: "sec-auto", escoCode: "ESCO-3119.5" },

  { id: "sk-10", name: "Solar PV Microgrid Telemetry", category: "Renewable Energy", sectorId: "sec-green", escoCode: "ESCO-3131.4" },
  { id: "sk-11", name: "High Voltage Inverter Calibration", category: "Electrical", sectorId: "sec-green", escoCode: "ESCO-7412.3" },
  { id: "sk-12", name: "Smart Metering & Grid Monitoring", category: "IoT", sectorId: "sec-green", escoCode: "ESCO-3113.8" },

  { id: "sk-13", name: "Tele-ICU Monitoring & Patient Vital Telemetry", category: "Digital Health", sectorId: "sec-health", escoCode: "ESCO-3256.2" },
  { id: "sk-14", name: "Electronic Health Record (EHR) Security", category: "Health Informatics", sectorId: "sec-health", escoCode: "ESCO-3259.1" },
  { id: "sk-15", name: "Medical Ventilator Operation & Maintenance", category: "Biomedical Equipment", sectorId: "sec-health", escoCode: "ESCO-3211.5" },

  { id: "sk-16", name: "UPI Merchant API & Anti-Fraud Telemetry", category: "FinTech", sectorId: "sec-bfsi", escoCode: "ESCO-3312.4" },
  { id: "sk-17", name: "Tally Prime & GST E-Way Bill Reconciliation", category: "Accounting", sectorId: "sec-bfsi", escoCode: "ESCO-3313.1" },
  { id: "sk-18", name: "Digital KYC & AML Regulatory Compliance", category: "Compliance", sectorId: "sec-bfsi", escoCode: "ESCO-3312.9" },

  { id: "sk-19", name: "RFID Warehouse Automated Sorting", category: "Supply Chain", sectorId: "sec-retail", escoCode: "ESCO-4321.3" },
  { id: "sk-20", name: "Omnichannel POS Inventory Synchronization", category: "Retail Ops", sectorId: "sec-retail", escoCode: "ESCO-5223.2" }
];

export const COURSES = [
  {
    id: "crs-it-01",
    code: "MSSDS-IT-04",
    name: "Web & Microservices Software Assistant",
    provider: "Maharashtra State Skill Development Society (MSSDS)",
    sectorId: "sec-it",
    durationWeeks: 16,
    enrolledTrainees: 1240,
    healthScore: 62,
    needsRevision: true,
    skillsTaught: [
      { skillId: "sk-01", depthLevel: 80, name: "Python & FastAPI Microservices" },
      { skillId: "sk-04", depthLevel: 75, name: "React Frontend State Management" }
    ],
    missingSkills: ["Generative AI & LLM Prompting", "Docker Containerization & Kubernetes", "Cybersecurity Threat Telemetry"],
    equipmentLagNotes: "Training labs currently running Python 3.8 without Docker runtime or GPU sandbox environment."
  },
  {
    id: "crs-auto-01",
    code: "MSSDS-AUTO-12",
    name: "EV Assembly & Battery Technician",
    provider: "Directorate of Vocational Education & Training (DVET Maharashtra)",
    sectorId: "sec-auto",
    durationWeeks: 24,
    enrolledTrainees: 850,
    healthScore: 54,
    needsRevision: true,
    skillsTaught: [
      { skillId: "sk-08", depthLevel: 85, name: "CNC Machining & G-Code Programming" }
    ],
    missingSkills: ["EV Battery BMS Diagnostics", "CAN Bus Protocol Vehicle Testing", "Automated Robotic Arm Maintenance"],
    equipmentLagNotes: "Training workshop contains traditional IC engine rigs; lacks 400V HV safety gear and BMS test beds."
  },
  {
    id: "crs-green-01",
    code: "MSSDS-RE-02",
    name: "Solar Rooftop & Microgrid Installer",
    provider: "MSSDS in partnership with Mahagenco",
    sectorId: "sec-green",
    durationWeeks: 12,
    enrolledTrainees: 620,
    healthScore: 78,
    needsRevision: false,
    skillsTaught: [
      { skillId: "sk-11", depthLevel: 85, name: "High Voltage Inverter Calibration" }
    ],
    missingSkills: ["Solar PV Microgrid Telemetry", "Smart Metering & Grid Monitoring"],
    equipmentLagNotes: "Requires upgraded IoT solar telemetry kit for microgrid monitoring modules."
  },
  {
    id: "crs-health-01",
    code: "MSSDS-HC-08",
    name: "Digital Hospital Assistant & Tele-ICU Associate",
    provider: "Maharashtra University of Health Sciences (MUHS) Skill Cell",
    sectorId: "sec-health",
    durationWeeks: 20,
    enrolledTrainees: 490,
    healthScore: 58,
    needsRevision: true,
    skillsTaught: [
      { skillId: "sk-15", depthLevel: 80, name: "Medical Ventilator Operation & Maintenance" }
    ],
    missingSkills: ["Tele-ICU Monitoring & Patient Vital Telemetry", "Electronic Health Record (EHR) Security"],
    equipmentLagNotes: "Absence of real-time EHR simulation software in district ITI healthcare labs."
  },
  {
    id: "crs-bfsi-01",
    code: "MSSDS-BFSI-01",
    name: "FinTech KYC & Digital Payment Operator",
    provider: "NSDC Partner Institute - Pune",
    sectorId: "sec-bfsi",
    durationWeeks: 10,
    enrolledTrainees: 980,
    healthScore: 71,
    needsRevision: false,
    skillsTaught: [
      { skillId: "sk-17", depthLevel: 90, name: "Tally Prime & GST E-Way Bill Reconciliation" },
      { skillId: "sk-18", depthLevel: 85, name: "Digital KYC & AML Regulatory Compliance" }
    ],
    missingSkills: ["UPI Merchant API & Anti-Fraud Telemetry"],
    equipmentLagNotes: "Needs access to sandbox payment gateway logs for merchant fraud simulation."
  },
  {
    id: "crs-retail-01",
    code: "MSSDS-RET-09",
    name: "Omnichannel Retail & E-Commerce Associate",
    provider: "MSSDS Skill Hub - Thane",
    sectorId: "sec-retail",
    durationWeeks: 12,
    enrolledTrainees: 710,
    healthScore: 65,
    needsRevision: true,
    skillsTaught: [
      { skillId: "sk-20", depthLevel: 80, name: "Omnichannel POS Inventory Synchronization" }
    ],
    missingSkills: ["RFID Warehouse Automated Sorting"],
    equipmentLagNotes: "Warehouse lab relies on manual barcode scanners instead of high-frequency RFID gates."
  }
];

export const MOCK_JOB_POSTINGS = [
  {
    id: "job-101",
    title: "Junior Cloud & AI Developer",
    company: "Tech Mahindra",
    sectorId: "sec-it",
    location: "Pune (Hinjawadi Tech Park)",
    postedDate: "2026-08-28",
    extractedSkills: ["Python & FastAPI Microservices", "Generative AI & LLM Prompting", "Docker Containerization & Kubernetes"],
    rawText: "Looking for a Junior Cloud Engineer proficient in Python FastAPI microservices, familiar with Docker container deployment, and capable of integrating Generative AI LLM prompts for enterprise document parsing."
  },
  {
    id: "job-102",
    title: "EV Powertrain & BMS Diagnostics Engineer",
    company: "Tata Motors Passenger Electric Mobility",
    sectorId: "sec-auto",
    location: "Pune (Pimpri-Chinchwad)",
    postedDate: "2026-08-29",
    extractedSkills: ["EV Battery BMS Diagnostics", "CAN Bus Protocol Vehicle Testing", "Automated Robotic Arm Maintenance"],
    rawText: "Tata Motors EV Division is hiring EV Technicians! Must have hands-on experience in EV Battery BMS Diagnostics, CAN bus telemetry vehicle testing, and basic maintenance of automated robotic assembly arms."
  },
  {
    id: "job-103",
    title: "Solar Substation & Smart Grid Technician",
    company: "Waaree Energies Ltd",
    sectorId: "sec-green",
    location: "Solapur Solar Park",
    postedDate: "2026-08-27",
    extractedSkills: ["Solar PV Microgrid Telemetry", "High Voltage Inverter Calibration", "Smart Metering & Grid Monitoring"],
    rawText: "Immediate opening for Solar Technical Specialist. Key duties include inverter calibration, solar microgrid telemetry monitoring, and smart meter IoT sensor installation."
  },
  {
    id: "job-104",
    title: "Tele-ICU Clinical Telemetry Assistant",
    company: "Apollo TeleHealth Solutions",
    sectorId: "sec-health",
    location: "Nagpur Central",
    postedDate: "2026-08-30",
    extractedSkills: ["Tele-ICU Monitoring & Patient Vital Telemetry", "Electronic Health Record (EHR) Security"],
    rawText: "Hiring Tele-ICU Associates to assist remote critical care doctors. Requires monitoring patient telemetry signals in real-time and updating HIPAA/DISHA compliant Electronic Health Records."
  },
  {
    id: "job-105",
    title: "FinTech Merchant Operations & Fraud Specialist",
    company: "Pine Labs / Razorpay Partner Hub",
    sectorId: "sec-bfsi",
    location: "Mumbai (BKC)",
    postedDate: "2026-08-31",
    extractedSkills: ["UPI Merchant API & Anti-Fraud Telemetry", "Digital KYC & AML Regulatory Compliance"],
    rawText: "We are seeking Merchant Operations Officers to manage UPI Payment API integrations, verify merchant digital KYC compliance, and investigate transaction fraud alerts."
  }
];

export const TRAINEES = [
  {
    id: "trn-01",
    name: "Rahul Patil",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    city: "Pune",
    education: "Diploma in Electrical Engineering",
    enrolledCourseId: "crs-auto-01",
    enrolledCourseName: "EV Assembly & Battery Technician",
    completedSkills: ["CNC Machining & G-Code Programming"],
    targetRole: "Senior EV Battery Diagnostics Technician",
    matchPercentage: 48
  },
  {
    id: "trn-02",
    name: "Sneha Shinde",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    city: "Chhatrapati Sambhajinagar",
    education: "B.Sc Computer Science",
    enrolledCourseId: "crs-it-01",
    enrolledCourseName: "Web & Microservices Software Assistant",
    completedSkills: ["Python & FastAPI Microservices", "React Frontend State Management"],
    targetRole: "Full Stack AI Microservices Developer",
    matchPercentage: 65
  },
  {
    id: "trn-03",
    name: "Amit Deshmukh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    city: "Solapur",
    education: "ITI Electrician Certification",
    enrolledCourseId: "crs-green-01",
    enrolledCourseName: "Solar Rooftop & Microgrid Installer",
    completedSkills: ["High Voltage Inverter Calibration"],
    targetRole: "Smart Solar Grid Operations Engineer",
    matchPercentage: 72
  }
];
