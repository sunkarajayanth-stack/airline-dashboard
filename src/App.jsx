import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Command,
  Download,
  Filter,
  Gauge,
  LayoutDashboard,
  Menu,
  Moon,
  Plane,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react";
import "./App.css";

const airports = ["JFK", "LHR", "DXB", "SIN", "HKG", "CDG", "NRT", "LAX"];
const first = ["Amelia", "Noah", "Maya", "Liam", "Sophia", "Ethan", "Ava", "Daniel", "Layla", "Kenji", "Aisha", "Omar", "Elena", "Lucas", "Mina", "Hugo", "Nadia", "Arjun", "Clara", "Zane"];
const last = ["Carter", "Morgan", "Singh", "Khan", "Tanaka", "Laurent", "Nguyen", "Reed", "Al-Fayed", "Hughes", "Kim", "Patel", "Rossi", "Muller", "Chen", "Ibrahim", "Bennett", "Silva", "Yamamoto", "Dubois"];

const crew = Array.from({ length: 56 }, (_, i) => ({
  id: `CRW-${1000 + i}`,
  name: `${first[i % first.length]} ${last[(i * 3) % last.length]}`,
  role: i % 5 === 0 ? "Captain" : i % 5 === 1 ? "First Officer" : i % 5 === 2 ? "Purser" : "Cabin Crew",
  airport: airports[i % airports.length],
  status: i % 11 === 0 ? "On Leave" : i % 13 === 0 ? "Training" : i % 17 === 0 ? "Standby" : "Available",
  duty: 42 + (i * 7) % 38,
  compliance: 84 + (i * 5) % 16,
  next: ["EK201 DXB-JFK", "LH400 FRA-JFK", "SQ318 SIN-LHR", "JL62 NRT-LAX", "CX880 HKG-LAX"][i % 5],
}));

const kpis = [
  ["Total Crew", "1,284", "+8.6%", Users],
  ["Active Flights", "248", "+12", Plane],
  ["Available Crew", "846", "66%", CheckCircle2],
  ["On Leave", "119", "-4%", CalendarDays],
  ["Compliance Rate", "98.7%", "+1.2%", ShieldCheck],
  ["Duty Hours", "42.6k", "+6.1%", Clock3],
  ["Pending Approvals", "37", "14 urgent", Gauge],
  ["Critical Alerts", "9", "-3 today", AlertTriangle],
];

const pages = [
  "Executive Dashboard",
  "Crew Management",
  "Weekly Roster Planning",
  "Monthly Calendar View",
  "Duty Hour Analytics",
  "Leave Management",
  "Conflict Detection Center",
  "Crew Assignment Board",
  "Regulatory Compliance",
  "Notification Center",
  "Crew Profiles",
  "Shift Export Center",
  "Admin Control Panel",
];

const dutyTrend = [
  { day: "Mon", hours: 620, flights: 118 },
  { day: "Tue", hours: 710, flights: 132 },
  { day: "Wed", hours: 680, flights: 127 },
  { day: "Thu", hours: 760, flights: 146 },
  { day: "Fri", hours: 830, flights: 161 },
  { day: "Sat", hours: 790, flights: 154 },
  { day: "Sun", hours: 735, flights: 139 },
];

const leaveStats = [
  { name: "Annual", value: 44 },
  { name: "Medical", value: 22 },
  { name: "Training", value: 18 },
  { name: "Reserve", value: 16 },
];

const rosterDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const shifts = ["DXB-JFK", "LHR-SIN", "HKG-LAX", "CDG-NRT", "Standby", "Rest", "Training"];

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function App() {
  const [page, setPage] = useState("Executive Dashboard");
  const [sidebar, setSidebar] = useState(true);
  const [palette, setPalette] = useState(false);
  const [light, setLight] = useState(false);
  const [toast, setToast] = useState(true);
  const clock = useClock();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filteredCrew = useMemo(() => crew.slice(0, 12), []);

  return (
    <main className={light ? "app light" : "app"}>
      <div className="aurora one" />
      <div className="aurora two" />

      <aside className={sidebar ? "sidebar" : "sidebar collapsed"}>
        <div className="brand">
          <div className="brandMark"><Plane size={22} /></div>
          {sidebar && <div><b>SkyRoster AI</b><span>Enterprise Crew Ops</span></div>}
        </div>

        <nav>
          {pages.map((item, index) => (
            <button key={item} className={page === item ? "active" : ""} onClick={() => setPage(item)}>
              {index === 0 ? <LayoutDashboard /> : index === 1 ? <Users /> : index === 8 ? <ShieldCheck /> : <CalendarDays />}
              {sidebar && <span>{item}</span>}
            </button>
          ))}
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button className="iconBtn" onClick={() => setSidebar(!sidebar)}><Menu /></button>

          <div className="search" onClick={() => setPalette(true)}>
            <Search size={18} />
            <span>Search crew, flights, rosters...</span>
            <kbd>Ctrl K</kbd>
          </div>

          <div className="topActions">
            <div className="clock">{clock} IST</div>
            <button className="iconBtn" onClick={() => setLight(!light)}>{light ? <Moon /> : <Sun />}</button>
            <button className="iconBtn"><Bell /></button>
            <div className="profile">
              <div>AR</div>
              <span>Aviation Admin</span>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="content"
          >
            <section className="hero">
              <div>
                <p className="eyebrow"><Sparkles size={16} /> Emirates-grade crew intelligence</p>
                <h1>{page}</h1>
                <p>Real-time airline crew planning, compliance monitoring, fatigue visibility, leave control, and operational recovery in one premium command center.</p>
              </div>
              <button className="primary"><Plus size={18} /> New Assignment</button>
            </section>

            {page === "Executive Dashboard" ? (
              <Dashboard filteredCrew={filteredCrew} />
            ) : page.includes("Roster") || page.includes("Calendar") ? (
              <Roster />
            ) : page.includes("Assignment") ? (
              <AssignmentBoard />
            ) : page.includes("Analytics") || page.includes("Compliance") ? (
              <Analytics />
            ) : (
              <OperationsPage title={page} />
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <button className="fab" onClick={() => setToast(true)}><Plus /></button>

      <AnimatePresence>
        {palette && (
          <motion.div className="modalBackdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="commandBox" initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}>
              <div className="commandSearch">
                <Command />
                <input autoFocus placeholder="Jump to page, crew, airport, flight..." />
                <button onClick={() => setPalette(false)}><X /></button>
              </div>
              {pages.slice(0, 8).map((item) => (
                <button key={item} onClick={() => { setPage(item); setPalette(false); }}>
                  <Plane size={16} /> {item}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div className="toast" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <CheckCircle2 /> Crew legality scan completed. 9 conflicts require review.
            <button onClick={() => setToast(false)}><X size={15} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Dashboard({ filteredCrew }) {
  return (
    <>
      <div className="kpiGrid">
        {kpis.map(([label, value, delta, Icon], i) => (
          <motion.article className="kpi" key={label} whileHover={{ y: -6, scale: 1.01 }}>
            <div className="kpiIcon"><Icon /></div>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{delta}</small>
            <div className="skeleton" style={{ width: `${58 + i * 4}%` }} />
          </motion.article>
        ))}
      </div>

      <div className="grid two">
        <Panel title="Flight Assignments" action="Live">
          <ResponsiveContainer height={290}>
            <AreaChart data={dutyTrend}>
              <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#ffffff12" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#09111f", border: "1px solid #243244", color: "white" }} />
              <Area type="monotone" dataKey="flights" stroke="#22d3ee" fill="url(#sky)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Compliance Gauge" action="98.7%">
          <ResponsiveContainer height={290}>
            <RadialBarChart innerRadius="65%" outerRadius="95%" data={[{ name: "Compliance", value: 98.7, fill: "#2dd4bf" }]} startAngle={90} endAngle={-270}>
              <RadialBar dataKey="value" cornerRadius={20} />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="gaugeText">98.7%</text>
            </RadialBarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="grid three">
        <Panel title="Crew Utilization Heatmap">
          <div className="heatmap">
            {Array.from({ length: 64 }, (_, i) => <span key={i} style={{ opacity: 0.25 + ((i * 17) % 70) / 100 }} />)}
          </div>
        </Panel>

        <Panel title="Leave Statistics">
          <ResponsiveContainer height={230}>
            <PieChart>
              <Pie data={leaveStats} innerRadius={52} outerRadius={86} dataKey="value">
                {["#38bdf8", "#a78bfa", "#2dd4bf", "#f59e0b"].map((c) => <Cell key={c} fill={c} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Activity Timeline">
          <div className="timeline">
            {["DXB reserve crew assigned", "LHR fatigue rule warning", "JFK leave swap approved", "SIN roster export ready"].map((x) => (
              <div key={x}><i /> <span>{x}</span></div>
            ))}
          </div>
        </Panel>
      </div>

      <CrewTable rows={filteredCrew} />
    </>
  );
}

function Roster() {
  return (
    <Panel title="Weekly Airline Scheduling Table" action="Editable">
      <div className="filters">
        <button><Filter size={16} /> Airport</button>
        <button><Users size={16} /> Crew Type</button>
        <button><CalendarDays size={16} /> Week 22</button>
      </div>

      <div className="roster">
        <div className="rosterHead">Crew</div>
        {rosterDays.map((d) => <div className="rosterHead" key={d}>{d}</div>)}
        {crew.slice(0, 10).map((c, r) => (
          <>
            <div className="crewCell" key={c.id}>{c.name}<small>{c.role} - {c.airport}</small></div>
            {rosterDays.map((d, i) => {
              const shift = shifts[(r + i) % shifts.length];
              return <button className={`shift ${shift === "Rest" ? "rest" : shift === "Standby" ? "standby" : ""}`} key={d + c.id}>{shift}</button>;
            })}
          </>
        ))}
      </div>

      <div className="legend">
        <span><i /> Flight Duty</span><span><i /> Standby</span><span><i /> Rest</span><span><i /> Training</span>
      </div>
    </Panel>
  );
}

function AssignmentBoard() {
  const lanes = ["Available", "Assigned", "Standby", "Conflict"];
  return (
    <div className="board">
      {lanes.map((lane, i) => (
        <Panel title={lane} key={lane}>
          {crew.slice(i * 5, i * 5 + 5).map((c) => (
            <motion.div className="crewCard" key={c.id} whileHover={{ scale: 1.025 }}>
              <div><b>{c.name}</b><span>{c.role} - {c.airport}</span></div>
              <small>{c.next}</small>
            </motion.div>
          ))}
        </Panel>
      ))}
    </div>
  );
}

function Analytics() {
  return (
    <div className="grid two">
      <Panel title="Duty Hours Trend">
        <ResponsiveContainer height={320}>
          <BarChart data={dutyTrend}>
            <CartesianGrid stroke="#ffffff12" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: "#09111f", border: "1px solid #243244", color: "white" }} />
            <Bar dataKey="hours" fill="#38bdf8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Regulatory Risk Matrix">
        <div className="riskList">
          {["EASA FTL", "FAA Part 117", "GCAA CAR-OPS", "Rest Minimums", "Night Duty Caps"].map((x, i) => (
            <div key={x}><span>{x}</span><progress value={96 - i * 4} max="100" /></div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function OperationsPage({ title }) {
  return (
    <div className="grid two">
      <Panel title={`${title} Control Surface`} action="Operational">
        <CrewTable rows={crew.slice(12, 22)} compact />
      </Panel>

      <Panel title="Approvals and Alerts">
        <div className="timeline">
          {["Crew swap requires manager approval", "Passport validation expiring in 14 days", "Medical certificate uploaded", "Long-haul rest protection applied", "Monthly export queued"].map((x) => (
            <div key={x}><i /> <span>{x}</span></div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function CrewTable({ rows }) {
  return (
    <Panel title="Crew Operations Table" action="50+ crew">
      <div className="table">
        <div className="tr th"><span>Name</span><span>Role</span><span>Base</span><span>Status</span><span>Duty</span><span>Compliance</span></div>
        {rows.map((c) => (
          <div className="tr" key={c.id}>
            <span>{c.name}</span>
            <span>{c.role}</span>
            <span>{c.airport}</span>
            <span className={`badge ${c.status.replace(" ", "").toLowerCase()}`}>{c.status}</span>
            <span>{c.duty}h</span>
            <span>{c.compliance}%</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Panel({ title, action, children }) {
  return (
    <motion.section className="panel" whileHover={{ borderColor: "rgba(56,189,248,.42)" }}>
      <div className="panelHead">
        <h2>{title}</h2>
        {action && <span>{action}</span>}
      </div>
      {children}
    </motion.section>
  );
}

export default App;