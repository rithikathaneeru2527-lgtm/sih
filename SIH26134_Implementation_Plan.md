# SIH26134 - Skill-Curriculum Alignment Platform
### Implementation Plan for Prototype Build (Hand-off Spec)

---

## 1. Problem Restatement (for the agent's context)

Skill-development programmes in Maharashtra are built on broad/historical occupation categories that don't track fast-moving tech, local industry demand, or employer expectations. Curricula, equipment, and trainer skills lag. Result: employers can't find job-ready candidates, trainees finish courses with poor placement odds.

**What we're building:** A labour-market intelligence + curriculum-alignment platform that ingests job-posting signals, employer survey data, sector growth data, and placement outcomes, then surfaces skill gaps, recommends curriculum revisions, and guides trainee career pathways.

---

## 2. Prototype Scope (36-Hour Hackathon MVP)

Cut ruthlessly to what's demoable. Full scope is too big. Build these 5 pillars only:

| # | Module | What it proves |
|---|--------|-----------------|
| 1 | Job Signal Ingestion | Pulls/parses real or mocked job postings, extracts required skills via NLP |
| 2 | Curriculum Repository | Structured DB of existing govt training courses and skills they teach |
| 3 | Gap Analysis Engine | Diffs "skills industry wants" vs "skills curriculum teaches" into a ranked gap report |
| 4 | Dashboard (Admin/Policy view) | Visualizes gaps, trending skills, sector demand, course health scores |
| 5 | Trainee Guidance View | Given a trainee's completed/enrolled course, recommends supplementary skills and career pathway |

Skip for MVP (mention as roadmap): live employer survey portal, trainer capacity planning, real placement-outcome pipelines, multi-language support, mobile app.

---

## 3. System Architecture

```
                         +--------------------------+
                         |   Data Sources (mocked    |
                         |   or scraped for demo)    |
                         |  - Job portals (CSV/API)  |
                         |  - Course catalog (govt)  |
                         |  - Sector growth reports  |
                         +-------------+--------------+
                                       |
                         +-------------v--------------+
                         |   Ingestion & ETL Layer     |
                         |  (Python scripts / cron)    |
                         +-------------+--------------+
                                       |
                    +------------------v-----------------+
                    |   NLP Skill Extraction Service       |
                    |  (spaCy/NER + skill taxonomy         |
                    |   matching, embeddings for            |
                    |   fuzzy skill matching)                |
                    +------------------+-----------------+
                                       |
                         +-------------v--------------+
                         |      PostgreSQL DB          |
                         |  jobs, skills, courses,     |
                         |  gaps, trainees, sectors     |
                         +-------------+--------------+
                                       |
                         +-------------v--------------+
                         |     Gap Analysis Engine     |
                         |  (rule-based + weighted      |
                         |   scoring, trend detection)   |
                         +-------------+--------------+
                                       |
                    +------------------v-----------------+
                    |        REST API (FastAPI)            |
                    +---------+---------------------+-----+
                              |                       |
                  +-----------v------+     +----------v---------+
                  |  Admin Dashboard  |     |  Trainee Portal    |
                  |  (React + charts) |     |  (React)           |
                  +--------------------+     +----------------------+
```

---

## 4. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Backend API | FastAPI (Python) | Fast to scaffold, auto docs (Swagger), integrates well with ML code |
| Database | PostgreSQL (or SQLite for pure speed) | Relational data (jobs <-> skills <-> courses) fits well |
| NLP | spaCy + sentence-transformers (all-MiniLM-L6-v2) | Skill entity extraction + semantic matching between skill phrasings ("ML" vs "Machine Learning") |
| Data ingestion | Python requests/BeautifulSoup for demo data, or static CSV/JSON seed files | Avoids API rate-limit/auth headaches during a hackathon |
| Frontend | React + Vite + TailwindCSS, charts via Recharts | Fast to build, clean dashboards |
| Auth (optional) | Simple JWT, or skip entirely for MVP | Judges care about the core loop, not login flows |
| Deployment | Docker Compose (backend + db + frontend) for one-command local run | Reliable demo |

---

## 5. Data Strategy (decide this first)

You will not get live API access to Naukri/LinkedIn/NCS in 36 hours. Plan for this explicitly:

1. **Seed dataset**: Scrape roughly 200-500 public job postings (e.g. from the National Career Service portal, or Indeed public listings) once, save as JSON/CSV. Treat this as "Day 0 ingestion," not live scraping during the demo.
2. **Curriculum dataset**: Use Maharashtra's actual skill scheme catalogs if publicly available (NSDC / MSSDS course lists), or construct a realistic mock catalog of 30-50 courses across 5-6 sectors (IT/ITES, Retail, Healthcare, Manufacturing, BFSI, Construction).
3. **Skill taxonomy**: Use an open taxonomy like ESCO (EU skills/competences taxonomy, has an API and downloadable CSV) or O*NET skill lists as your canonical skill vocabulary, so you're not building one from scratch.
4. **Sector growth data**: Mock 5-6 sectors with growth percentages (can cite real reports like NASSCOM or the Periodic Labour Force Survey) as static reference data.

This "seed once, demo on static and refreshable data" approach is what makes the demo reliable.

---

## 6. Database Schema (core tables)

```sql
-- Canonical skill taxonomy
skills (id, name, category, taxonomy_source)

-- Job postings ingested
jobs (id, title, company, sector, location, raw_description, posted_date)
job_skills (job_id, skill_id, weight)  -- weight = frequency/importance

-- Training courses
courses (id, name, provider, sector, duration_weeks, equipment_notes)
course_skills (course_id, skill_id, depth_level)  -- e.g. intro/intermediate/advanced

-- Sector reference data
sectors (id, name, growth_rate, region)

-- Computed gap results (materialized, refreshed by the engine)
skill_gaps (id, sector_id, skill_id, demand_score, supply_score, gap_score, trend)

-- Trainee simulation
trainees (id, name, enrolled_course_id, completed_skills)
recommendations (trainee_id, recommended_skill_id, reason)
```

---

## 7. Gap Analysis Engine - Logic (keep it simple and explainable)

For the MVP, a transparent scoring formula beats a black-box model. Judges will ask "how did you compute this."

```
demand_score(skill, sector) = normalized frequency of skill across recent job postings in that sector
supply_score(skill, sector) = normalized frequency of skill taught across courses mapped to that sector
gap_score = demand_score - supply_score        (positive = undersupplied, negative = oversupplied)
trend = compare demand_score this "period" vs previous seed batch (even simulated) to flag emerging skills
```

Rank skills per sector by gap_score descending to get your headline output, e.g. "Top 10 skill gaps in Retail sector."

For matching skills across differently worded postings ("Excel", "MS Excel", "spreadsheet software"), use sentence-transformer embeddings plus cosine similarity (threshold around 0.75) to cluster into canonical taxonomy skills before scoring.

---

## 8. API Endpoints (FastAPI)

```
GET  /sectors                          -> list sectors + growth
GET  /sectors/{id}/skill-gaps          -> ranked gap report for a sector
GET  /skills/trending                  -> top emerging skills across all sectors
GET  /courses                          -> list courses, filter by sector
GET  /courses/{id}/gap-report          -> which in-demand skills this course is missing
POST /trainees                         -> create trainee profile
GET  /trainees/{id}/recommendations    -> career pathway + skill-gap-based suggestions
POST /ingest/jobs                      -> (demo) trigger re-run of ingestion on seed file
POST /ingest/recompute-gaps            -> re-run gap analysis engine
```

---

## 9. Frontend - Screens to Build

**Admin/Policy Dashboard**
1. Sector overview cards (growth %, top gap skill, number of courses mapped)
2. Skill-gap bar chart per sector (demand vs supply side by side)
3. Trending/emerging skills list (last 30/60/90 "days" simulated)
4. Course health table: course name, sector, gap-coverage %, "needs revision" flag

**Trainee View**
1. Enter/select current course
2. See "skills you have" vs "skills employers want" as a radar/gap chart
3. Get 2-3 recommended supplementary micro-skills plus a suggested next course/certification
4. Simple career-pathway timeline visual

---

## 10. 36-Hour Build Plan

| Hours | Task | Owner |
|---|---|---|
| 0-3 | Finalize data sources, collect seed job postings, build course catalog CSV | Data person |
| 0-3 | Scaffold FastAPI project, Postgres schema, Docker Compose | Backend |
| 0-3 | Scaffold React app, routing, Tailwind setup | Frontend |
| 3-8 | Build NLP skill-extraction pipeline (spaCy NER + embedding-based taxonomy matching) | Data/ML |
| 3-8 | Build ingestion scripts loading seed data into DB | Backend |
| 8-14 | Implement gap analysis engine + /skill-gaps endpoints | Backend/ML |
| 8-14 | Build Admin Dashboard UI against mock/early API data | Frontend |
| 14-20 | Wire dashboard to real endpoints, add charts (Recharts) | Frontend |
| 14-20 | Build trainee recommendation logic + endpoints | Backend |
| 20-26 | Build Trainee View UI | Frontend |
| 26-30 | End-to-end integration testing, fix data edge cases | Everyone |
| 30-33 | Polish UI (design pass), add seed "story" data that demos well | Everyone |
| 33-36 | Prep demo script, deploy locally/Docker, rehearse pitch | Everyone |

---

## 11. Demo Script (for judges)

1. Open on Admin Dashboard: "Here's the Retail sector - employers are demanding X, Y, Z skills at increasing rates."
2. Show the gap chart: "Our current curriculum only covers 40% of what's in demand - here's the ranked gap list."
3. Show trending skills: "These 3 skills emerged in the last quarter and no course currently teaches them."
4. Flip to the Course table: "This course needs revision - flagged automatically."
5. Switch to the Trainee view: "A trainee enrolled in this course sees exactly which extra skills to pick up, and a suggested next step."
6. Close on scalability: "This runs on a continuous ingestion loop - swap in live job-portal APIs and real NSDC placement data, and the gap engine updates automatically. No manual curriculum review committee needed to catch these signals."

---

## 12. What to Explicitly Tell the Coding Agent ("Antigravity")

When handing this off, give it as a structured brief with:
- The 5-pillar MVP scope (Section 2) - tell it explicitly not to build the skipped items
- The tech stack (Section 4) - pin versions if you want reproducibility
- The DB schema (Section 6) as a starting migration
- The gap-scoring formula (Section 7) verbatim - don't let it invent a different one
- The API contract (Section 8) so backend and frontend can be built in parallel
- Ask it to seed with realistic mock data first, and build ingestion as a swappable module, so live scraping can be dropped in later without a refactor

---

## 13. Stretch Goals (mention in pitch, don't build)

- Live integration with NCS (National Career Service) job API and MSSDS course data
- Employer survey micro-app for direct signal collection
- Trainer capacity/equipment gap planning module
- Placement outcome feedback loop (course -> placement rate -> re-score curriculum)
- Multilingual (Marathi/Hindi) trainee-facing UI
