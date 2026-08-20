"use client";

import { useState } from "react";
import { ArrowRight, Calculator, CalendarClock, GraduationCap, ListChecks, Target, TimerReset } from "lucide-react";
import Link from "next/link";

const filters=["All","Academic","Planning","Productivity","Utilities"];
const icons={Calculator,CalendarClock,GraduationCap,ListChecks,Target,TimerReset};

export default function ToolExplorer({tools,colors}){
  const [active,setActive]=useState("All");
  const visible=active==="All"?tools:tools.filter(tool=>tool.category===active);

  return <>
    <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter tools by category">
      {filters.map(filter=><button key={filter} type="button" onClick={()=>setActive(filter)} aria-pressed={active===filter} className={`category-chip rounded-full border px-4 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${active===filter?"active":""}`}>{filter}</button>)}
    </div>
    <p className="sr-only" aria-live="polite">Showing {visible.length} {active.toLowerCase()} {visible.length===1?"tool":"tools"}.</p>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map(tool=><ToolCard key={tool.name} tool={tool} colors={colors}/>)}
    </div>
  </>;
}

function ToolCard({tool,colors}){
  const Icon=icons[tool.icon];
  const content=<div className="relative z-10 flex h-full flex-col"><div className="mb-7 flex items-start justify-between"><div className={`flex size-12 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 ${colors[tool.color]}`}><Icon aria-hidden="true" size={23} strokeWidth={1.8}/></div><span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{tool.label}</span></div><h3 className="text-xl font-semibold tracking-tight text-white">{tool.name}</h3><p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{tool.description}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition-colors group-hover:text-cyan-300">{tool.href?"Open tool":"Not yet available"}{tool.href&&<ArrowRight aria-hidden="true" size={15} className="transition-transform group-hover:translate-x-1"/>}</span></div>;
  const classes=`tool-card group glass-card flex min-h-64 flex-col rounded-[22px] p-6 ${tool.featured?"sm:col-span-2 lg:col-span-1":""}`;
  return tool.href?<Link href={tool.href} className={`${classes} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300`}>{content}</Link>:<article className={`${classes} opacity-80`}>{content}</article>;
}
