import { useState } from "react";
import {
  ArrowLeft, Shield, Eye, Megaphone, CheckCircle2,
  Circle, Clock3, ChevronRight, Phone, Smartphone,
  Building2, Hammer, Layers, Target, TrendingUp,
  Tag, AlertTriangle, Lightbulb, X,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type PhaseStatus = "completed" | "in-progress" | "upcoming";

interface Phase {
  number: number;
  title: string;
  description: string;
  status: PhaseStatus;
}

interface CostItem { label: string; amount: number; icon: React.ElementType }
interface StrategicValue { icon: React.ElementType; title: string; body: string }
interface Coordinator { name: string; phone: string }

interface Project {
  id: number;
  title: string;
  category: string;
  shortDescription: string;
  status: "In Progress" | "Completed" | "Upcoming";
  currentPhase: string;
  progressPercent: number;
  fundedPercent: number;
  background: string;
  problem: string;
  objective: string;
  scope: string[];
  costs: CostItem[];
  phases: Phase[];
  strategicValues: StrategicValue[];
  fundingParagraph: string;
  fundingBullets: string[];
  ctaQuote: string;
  paybill: string;
  accountNo: string;
  coordinators: Coordinator[];
}

// ─── Data ────────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Construction of a Perimeter Wall for Presbyterian University of East Africa",
    category: "Infrastructure",
    shortDescription:
      "Constructing a 900 ft perimeter wall to restore security, protect university property, and rebuild institutional pride after years of structural deterioration.",
    status: "In Progress",
    currentPhase: "Phase 1 of 3 — Priority Sections",
    progressPercent: 0,
    fundedPercent: 0,
    background:
      "The perimeter wall has deteriorated significantly, with sections already collapsed, leading to security risks, unauthorized access, and reputational damage to the institution.",
    problem:
      "Without a complete perimeter wall, the university faces theft, vandalism, uncontrolled access, and a visibly failing boundary that undermines its image.",
    objective:
      "Construct a strong, secure, and visually appealing perimeter wall to enhance security, restore institutional pride, and create a branding opportunity for the university.",
    scope: [
      "Total length: 900 ft",
      "Foundation and structural works",
      "Stone wall construction",
      "Reinforcement and finishing",
      "Coping and stabilization",
    ],
    costs: [
      { label: "Materials", amount: 2_754_200, icon: Layers },
      { label: "Labour", amount: 1_200_000, icon: Hammer },
      { label: "Miscellaneous", amount: 200_000, icon: Building2 },
    ],
    phases: [
      {
        number: 1,
        title: "Priority Sections",
        description: "Most damaged and open sections — highest security risk areas addressed first.",
        status: "in-progress",
      },
      {
        number: 2,
        title: "Remaining Structural Sections",
        description: "Continued construction covering all remaining boundary lengths.",
        status: "upcoming",
      },
      {
        number: 3,
        title: "Finishing, Reinforcement & Branding",
        description: "Coping, plastering, painting, and university branding applied to the wall.",
        status: "upcoming",
      },
    ],
    strategicValues: [
      {
        icon: Shield,
        title: "Security",
        body: "Protects students, staff, and property by eliminating unauthorized access and reducing the risk of theft and vandalism.",
      },
      {
        icon: Eye,
        title: "Image",
        body: "Enhances the university's physical outlook and presents a well-maintained, professional institution to visitors and the public.",
      },
      {
        icon: Megaphone,
        title: "Branding",
        body: "The wall displays the university name and identity, improving public visibility and reinforcing institutional recognition.",
      },
    ],
    fundingParagraph:
      "This project is funded through alumni contributions, well-wishers, donors, and institutional support. Every contribution — large or small — brings us closer to a secure and proud university boundary.",
    fundingBullets: [
      "Individual alumni giving",
      "Group or class contributions",
      "Sponsoring specific sections (e.g., meters of wall)",
      "Corporate and well-wisher donations",
    ],
    ctaQuote:
      "Let us come together to secure, restore, and proudly redefine our institution.",
    paybill: "247 247",
    accountNo: "0570285140313",
    coordinators: [
      { name: "Alban Ng'uono", phone: "0701 010 191" },
      { name: "Mike Njoroge", phone: "0719 372 034" },
      { name: "Daniel Muteti", phone: "0748 177 184" },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const NAVY = "#03045e";
const BLUE = "#0077b6";
const SKY = "#90e0ef";
const PALE = "#ade8f4";
const BG = "#f0f4f8";

function kes(n: number) {
  return `KES ${n.toLocaleString("en-KE")}`;
}

function PhaseIcon({ status }: { status: PhaseStatus }) {
  if (status === "completed") return <CheckCircle2 className="w-7 h-7" style={{ color: BLUE }} />;
  if (status === "in-progress") return (
    <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center" style={{ borderColor: BLUE }}>
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: BLUE }} />
    </div>
  );
  return <Circle className="w-7 h-7 text-gray-300" />;
}

function StatusBadge({ status }: { status: PhaseStatus }) {
  if (status === "completed") return <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: BLUE }}>Completed</span>;
  if (status === "in-progress") return <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: "#0096c7" }}>In Progress</span>;
  return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">Upcoming</span>;
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onView }: { project: Project; onView: () => void }) {
  const total = project.costs.reduce((s, c) => s + c.amount, 0);
  return (
    <div className="bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all group" style={{ borderColor: PALE }}>
      {/* Top accent bar */}
      <div className="h-1.5 w-full" style={{ backgroundColor: NAVY }} />

      {/* Card header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: BLUE }}
          >
            <Tag className="w-3 h-3" /> {project.category}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: "#0096c7" }}>
            {project.status}
          </span>
        </div>

        <h3 className="text-lg font-bold leading-snug mb-3" style={{ color: NAVY }}>
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">{project.shortDescription}</p>

        {/* Phase indicator */}
        <div className="flex items-center gap-2 mb-5">
          <Clock3 className="w-4 h-4 flex-shrink-0" style={{ color: BLUE }} />
          <span className="text-xs font-medium" style={{ color: BLUE }}>{project.currentPhase}</span>
        </div>

        {/* Progress bars */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500 font-medium">Construction Progress</span>
              <span className="font-bold" style={{ color: NAVY }}>{project.progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${project.progressPercent}%`, backgroundColor: NAVY }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500 font-medium">Funding Raised</span>
              <span className="font-bold" style={{ color: BLUE }}>{project.fundedPercent}% of {kes(project.costs.reduce((s, c) => s + c.amount, 0))}</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${project.fundedPercent}%`, backgroundColor: BLUE }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: BG, backgroundColor: BG }}>
        <p className="text-xs text-gray-500">Total Budget: <span className="font-bold" style={{ color: NAVY }}>{kes(total)}</span></p>
        <button
          onClick={onView}
          className="flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
          style={{ color: BLUE }}
        >
          View Details <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Project Detail Modal ─────────────────────────────────────────────────────
function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const total = project.costs.reduce((s, c) => s + c.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: BG }}>
      {/* Sticky top bar */}
      <div className="flex-shrink-0 sticky top-0 z-10 shadow-md" style={{ backgroundColor: NAVY }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold truncate text-sm hidden sm:block">{project.title}</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: SKY, color: NAVY }}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">

          {/* Hero card */}
          <div className="rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: NAVY }}>
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: SKY, color: NAVY }}>
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#0096c7" }}>
                  {project.currentPhase}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-4">{project.title}</h1>
              <p className="text-base leading-relaxed mb-8" style={{ color: SKY }}>{project.shortDescription}</p>

              {/* Dual progress */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70 font-medium">Construction Progress</span>
                    <span className="text-white font-bold">{project.progressPercent}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                    <div className="h-full rounded-full" style={{ width: `${project.progressPercent}%`, backgroundColor: SKY }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70 font-medium">Funding Raised</span>
                    <span className="text-white font-bold">{project.fundedPercent}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                    <div className="h-full rounded-full" style={{ width: `${project.fundedPercent}%`, backgroundColor: "#48cae4" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background · Problem · Objective */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: AlertTriangle, label: "Background", text: project.background, shade: "#fff3cd", iconColor: "#b45309" },
              { icon: X, label: "Problem", text: project.problem, shade: "#fee2e2", iconColor: "#dc2626" },
              { icon: Lightbulb, label: "Objective", text: project.objective, shade: "#dcfce7", iconColor: "#16a34a" },
            ].map(({ icon: Icon, label, text, shade, iconColor }) => (
              <div key={label} className="bg-white rounded-2xl border p-6" style={{ borderColor: PALE }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: shade }}>
                  <Icon className="w-5 h-5" style={{ color: iconColor }} />
                </div>
                <h3 className="font-bold mb-2 text-sm uppercase tracking-wide" style={{ color: NAVY }}>{label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Scope */}
          <div className="bg-white rounded-2xl border p-6 md:p-8" style={{ borderColor: PALE }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: SKY }}>
                <Target className="w-5 h-5" style={{ color: NAVY }} />
              </div>
              <h2 className="text-xl font-bold" style={{ color: NAVY }}>Project Scope</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">
              {project.scope.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: SKY }}>
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: NAVY }} />
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cost breakdown */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: SKY }}>
                <TrendingUp className="w-5 h-5" style={{ color: NAVY }} />
              </div>
              <h2 className="text-xl font-bold" style={{ color: NAVY }}>Cost Breakdown</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              {project.costs.map(({ label, amount, icon: Icon }) => (
                <div key={label} className="bg-white rounded-2xl border p-6 text-center" style={{ borderColor: PALE }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: SKY }}>
                    <Icon className="w-6 h-6" style={{ color: NAVY }} />
                  </div>
                  <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
                  <p className="text-lg font-bold" style={{ color: NAVY }}>{kes(amount)}</p>
                </div>
              ))}
            </div>
            {/* Total */}
            <div className="rounded-2xl p-5 flex items-center justify-between" style={{ backgroundColor: NAVY }}>
              <span className="text-white font-semibold text-lg">Project Total</span>
              <span className="text-2xl font-bold" style={{ color: SKY }}>{kes(total)}</span>
            </div>
          </div>

          {/* Phased implementation timeline */}
          <div className="bg-white rounded-2xl border p-6 md:p-8" style={{ borderColor: PALE }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: SKY }}>
                <Layers className="w-5 h-5" style={{ color: NAVY }} />
              </div>
              <h2 className="text-xl font-bold" style={{ color: NAVY }}>Phased Implementation</h2>
            </div>
            <div className="space-y-0">
              {project.phases.map((phase, idx) => (
                <div key={phase.number} className="flex gap-5">
                  {/* Timeline spine */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <PhaseIcon status={phase.status} />
                    {idx < project.phases.length - 1 && (
                      <div className="w-0.5 flex-1 my-1 min-h-[40px]" style={{ backgroundColor: phase.status === "upcoming" ? "#e5e7eb" : PALE }} />
                    )}
                  </div>
                  {/* Content */}
                  <div className={`pb-8 flex-1 ${idx === project.phases.length - 1 ? "pb-0" : ""}`}>
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <h3 className="font-bold" style={{ color: NAVY }}>Phase {phase.number}: {phase.title}</h3>
                      <StatusBadge status={phase.status} />
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic value */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: SKY }}>
                <Shield className="w-5 h-5" style={{ color: NAVY }} />
              </div>
              <h2 className="text-xl font-bold" style={{ color: NAVY }}>Strategic Value</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {project.strategicValues.map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-white rounded-2xl border p-6" style={{ borderColor: PALE }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: NAVY }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: NAVY }}>{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Funding strategy */}
          <div className="bg-white rounded-2xl border p-6 md:p-8" style={{ borderColor: PALE }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: SKY }}>
                <TrendingUp className="w-5 h-5" style={{ color: NAVY }} />
              </div>
              <h2 className="text-xl font-bold" style={{ color: NAVY }}>Funding Strategy</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{project.fundingParagraph}</p>
            <ul className="space-y-2">
              {project.fundingBullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: SKY }}>
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: NAVY }} />
                  </div>
                  <span className="text-sm text-gray-700">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA banner */}
          <div className="rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: NAVY }}>
            <div className="p-8 md:p-10 text-center">
              <p className="text-xl md:text-2xl font-bold text-white leading-snug mb-6 max-w-2xl mx-auto">
                "{project.ctaQuote}"
              </p>

              {/* Payment details */}
              <div className="inline-grid sm:grid-cols-2 gap-4 mb-8 text-left">
                <div className="rounded-xl px-6 py-4" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: SKY }}>M-PESA PAYBILL</p>
                  <p className="text-3xl font-black text-white tracking-wide">{project.paybill}</p>
                </div>
                <div className="rounded-xl px-6 py-4" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: SKY }}>ACCOUNT NUMBER</p>
                  <p className="text-3xl font-black text-white tracking-wide">{project.accountNo}</p>
                </div>
              </div>

              <a
                href="/donate"
                className="inline-block px-10 py-4 rounded-xl font-bold text-lg transition-opacity hover:opacity-90 shadow-lg"
                style={{ backgroundColor: SKY, color: NAVY }}
              >
                Contribute Now
              </a>
            </div>
          </div>

          {/* Project coordination */}
          <div className="bg-white rounded-2xl border p-6 md:p-8" style={{ borderColor: PALE }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: SKY }}>
                <Phone className="w-5 h-5" style={{ color: NAVY }} />
              </div>
              <h2 className="text-xl font-bold" style={{ color: NAVY }}>Project Coordination</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {project.coordinators.map(({ name, phone }) => (
                <a
                  key={name}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-md group"
                  style={{ borderColor: PALE }}
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: NAVY }}>
                    <span className="text-sm font-bold text-white">
                      {name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-tight group-hover:underline" style={{ color: NAVY }}>{name}</p>
                    <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: BLUE }}>
                      <Smartphone className="w-3 h-3" /> {phone}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Projects Page ────────────────────────────────────────────────────────────
export function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  if (activeProject) {
    return <ProjectDetail project={activeProject} onClose={() => setActiveProject(null)} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG }}>
      {/* Header */}
      <div className="py-14 px-4" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: SKY }}>
              <Building2 className="w-5 h-5" style={{ color: NAVY }} />
            </div>
            <span className="text-sm font-semibold" style={{ color: SKY }}>Community Projects</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Projects</h1>
          <p className="text-lg max-w-2xl" style={{ color: SKY }}>
            Alumni-driven initiatives that invest in our university, our community, and our shared future.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Summary strip */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Active Projects", value: PROJECTS.filter((p) => p.status === "In Progress").length },
            { label: "Total Budget", value: `KES ${(PROJECTS.reduce((s, p) => s + p.costs.reduce((a, c) => a + c.amount, 0), 0) / 1_000_000).toFixed(1)}M` },
            { label: "Contributors Needed", value: "You" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl border p-5 text-center" style={{ borderColor: PALE }}>
              <p className="text-2xl font-black mb-1" style={{ color: NAVY }}>{value}</p>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Project cards grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onView={() => setActiveProject(project)}
            />
          ))}
        </div>

        {/* Empty state placeholder — for when more projects are added via API */}
        {PROJECTS.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border" style={{ borderColor: PALE }}>
            <Building2 className="w-14 h-14 mx-auto mb-4" style={{ color: PALE }} />
            <p className="font-semibold" style={{ color: NAVY }}>No projects yet</p>
            <p className="text-sm text-gray-400 mt-1">Projects will appear here once published.</p>
          </div>
        )}
      </div>
    </div>
  );
}
