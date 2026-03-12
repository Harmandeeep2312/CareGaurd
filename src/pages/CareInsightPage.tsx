import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, AlertTriangle, Droplets, Activity, Heart, Moon,
  Pill, Send, Brain, Thermometer, Shield, Phone, TrendingDown,
  TrendingUp, Minus, Clock, FileText, ChevronRight
} from "lucide-react";
import { Button } from "../components/ui/button";
import ThemeToggle from "../components/ThemeToggle";

const priorityActions = [
  {
    tag: "URGENT",
    tagColor: "bg-destructive text-destructive-foreground",
    title: "Hydration Warning",
    desc: "Daily intake is 35% below recommended levels. Robert has only logged 450ml today.",
    time: "Detected 2h ago",
    icon: Droplets,
    iconColor: "text-destructive",
    actions: ["Remind Now", "Log Manually"],
  },
  {
    tag: "SUGGESTION",
    tagColor: "bg-primary text-primary-foreground",
    title: "Activity Suggestion",
    desc: "Sedentary time has increased by 40% today. A 10-minute walk is recommended to maintain circulation.",
    time: "Activity Trend",
    icon: Activity,
    iconColor: "text-primary",
    actions: ["Notify Phone", "View Schedule"],
  },
];

const insights = [
  {
    icon: Moon,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "Sleep Quality Decline",
    change: "-15% from last week",
    changeColor: "text-destructive",
    desc: "Sleep quality has dipped by 15% this week. Data shows frequent micro-awakenings between 2:00 AM and 4:00 AM.",
    aiNote: "AI analysis suggests room temperature was 74°F during these events. Consider adjusting the thermostat to 68°F.",
  },
  {
    icon: Heart,
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    title: "Resting Heart Rate Improvement",
    change: "+4% stability",
    changeColor: "text-secondary",
    desc: "RHR has remained remarkably steady at 64bpm. This suggests high cardiovascular efficiency and low stress levels.",
    aiNote: null,
  },
  {
    icon: Pill,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    title: "Medication Correlation",
    change: "Observational",
    changeColor: "text-muted-foreground",
    desc: "Post-medication blood pressure spikes observed on Tuesday. This may be a temporary side effect of the new prescription.",
    aiNote: null,
    linkText: "Send Insight to Physician →",
  },
];

const vitals = [
  { label: "BP", value: "118/75", status: "Optimal", statusColor: "text-secondary" },
  { label: "OXYGEN", value: "98%", status: "Normal", statusColor: "text-secondary" },
  { label: "GLUCOSE", value: "92", status: "Fasting", statusColor: "text-care-amber" },
  { label: "STRESS", value: "Low", status: "HRV Stable", statusColor: "text-secondary" },
];

const chatMessages = [
  {
    role: "ai" as const,
    text: "Hello! I've analyzed Robert's vitals for the last 24 hours. Would you like a summary or do you have a specific concern?",
    time: "AI • 10:45 AM",
  },
  {
    role: "user" as const,
    text: "Why was the health score low on Saturday?",
    time: "You • 10:46 AM",
  },
  {
    role: "ai" as const,
    text: "Saturday's score (45) was impacted by poor sleep quality (3h REM) and elevated cortisol levels measured at noon.",
    time: "AI • 10:46 AM",
  },
];

const quickChips = ["Last checkup notes?", "Next dose time?"];

const CareInsightPage = () => {
  const [chatInput, setChatInput] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">Care Insights</h1>
              <p className="text-sm text-muted-foreground">AI Health Recommendations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="default" size="default" className="gap-2">
              <FileText className="h-4 w-4" /> Report
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6">
        {/* Subtitle */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Intelligent Monitoring</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">AI Health Recommendations</h2>
          <p className="text-muted-foreground mt-1">
            Personalized care insights for <span className="font-semibold text-foreground">Robert Smith</span> based on activity, vitals, and sleep patterns.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column — Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* High Priority Actions */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                <AlertTriangle className="h-5 w-5 text-destructive" /> High Priority Actions
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {priorityActions.map((a, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl border p-5 space-y-3 ${
                      a.tag === "URGENT" ? "border-destructive/30 bg-destructive/5" : "border-primary/20 bg-primary/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${a.tagColor}`}>{a.tag}</span>
                      <span className="text-xs text-muted-foreground">{a.time}</span>
                    </div>
                    <h4 className="text-lg font-bold text-foreground">{a.title}</h4>
                    <p className="text-sm text-muted-foreground">{a.desc}</p>
                    <div className="flex gap-2 pt-1">
                      {a.actions.map((act, j) => (
                        <Button
                          key={j}
                          variant={j === 0 ? "default" : "outline"}
                          size="sm"
                        >
                          {act}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Data Insights */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Detailed Data Insights</h3>
              <div className="space-y-4">
                {insights.map((ins, i) => (
                  <div key={i} className="bg-card rounded-2xl border p-5 space-y-3">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-3 flex-shrink-0 ${ins.iconBg}`}>
                        <ins.icon className={`h-5 w-5 ${ins.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <h4 className="font-bold text-foreground">{ins.title}</h4>
                          <span className={`text-sm font-semibold ${ins.changeColor}`}>{ins.change}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{ins.desc}</p>
                      </div>
                    </div>
                    {ins.aiNote && (
                      <div className="flex items-start gap-2 ml-14 text-sm text-muted-foreground bg-accent/50 rounded-xl p-3">
                        <Brain className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
                        <span>{ins.aiNote}</span>
                      </div>
                    )}
                    {ins.linkText && (
                      <p className="ml-14 text-sm text-primary font-semibold cursor-pointer hover:underline">{ins.linkText}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Health Score */}
            <div className="bg-card rounded-2xl border p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Weekly Health Score</h3>
                  <p className="text-sm text-muted-foreground">Composite score based on 12 bio-metrics</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary" /> Robert</span>
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-muted-foreground" /> Avg (Age 75+)</span>
                </div>
              </div>
              {/* Chart placeholder — bar chart visual */}
              <div className="flex items-end gap-3 h-40">
                {[
                  { day: "Mon", score: 72, avg: 60 },
                  { day: "Tue", score: 68, avg: 58 },
                  { day: "Wed", score: 80, avg: 62 },
                  { day: "Thu", score: 75, avg: 60 },
                  { day: "Fri", score: 65, avg: 59 },
                  { day: "Sat", score: 45, avg: 58 },
                  { day: "Sun", score: 78, avg: 61 },
                ].map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex items-end gap-1 justify-center" style={{ height: "120px" }}>
                      <div
                        className="w-3 md:w-4 rounded-t-md bg-primary transition-all"
                        style={{ height: `${(d.score / 100) * 120}px` }}
                        title={`${d.score}`}
                      />
                      <div
                        className="w-3 md:w-4 rounded-t-md bg-muted-foreground/30 transition-all"
                        style={{ height: `${(d.avg / 100) * 120}px` }}
                        title={`Avg ${d.avg}`}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Sidebar */}
          <div className="space-y-6">
            {/* AI Chat */}
            <div className="bg-card rounded-2xl border overflow-hidden">
              <div className="p-4 border-b flex items-center gap-3">
                <div className="bg-primary rounded-full p-2">
                  <Brain className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">Ask CareGuard AI</p>
                  <p className="text-xs text-secondary font-semibold">● ANALYSIS READY</p>
                </div>
              </div>
              <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
                {chatMessages.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`rounded-2xl px-4 py-2.5 max-w-[90%] text-sm ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-accent text-foreground rounded-bl-md"
                    }`}>
                      {m.text}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 px-1">{m.time}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Ask about health trends..."
                    className="flex-1 bg-accent rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button variant="default" size="icon" className="rounded-xl flex-shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  {quickChips.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setChatInput(c)}
                      className="text-xs bg-accent text-muted-foreground rounded-full px-3 py-1.5 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Vitals Snapshot */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Vitals Snapshot</h3>
              <div className="grid grid-cols-2 gap-3">
                {vitals.map((v, i) => (
                  <div key={i} className="bg-card rounded-2xl border p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">{v.label}</p>
                    <p className="text-2xl font-extrabold text-foreground">{v.value}</p>
                    <p className={`text-xs font-semibold mt-1 ${v.statusColor}`}>{v.status}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Access */}
            <div className="bg-destructive rounded-2xl p-5 text-destructive-foreground space-y-3">
              <h3 className="font-bold text-lg">Emergency Access</h3>
              <p className="text-sm opacity-90">
                Robert's local emergency contacts are up to date. You are 1st in the response chain.
              </p>
              <Button variant="outline" className="w-full border-destructive-foreground/30 text-foreground hover:bg-destructive-foreground hover:text-destructive gap-2">
                <Phone className="h-4 w-4" /> Contact Care Team
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CareInsightPage;
