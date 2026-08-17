"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CircleCheck, Gauge, RotateCcw, Sparkles, Target, TriangleAlert } from "lucide-react";

const INITIAL={current:"",completed:"",remaining:"",target:""};
const PRESETS=[3,3.3,3.5,3.7,4];

function parse(values){
  const current=Number(values.current),completed=Number(values.completed),remaining=Number(values.remaining),target=Number(values.target);
  const errors={};
  if(values.current===""||!Number.isFinite(current)||current<0||current>4)errors.current="Enter a GPA from 0.00 to 4.00.";
  if(values.completed===""||!Number.isFinite(completed)||completed<0||completed>10000)errors.completed="Enter completed credits from 0 to 10,000.";
  if(values.remaining===""||!Number.isFinite(remaining)||remaining<=0||remaining>10000)errors.remaining="Remaining credits must be between 0.01 and 10,000.";
  if(values.target===""||!Number.isFinite(target)||target<0||target>4)errors.target="Enter a target from 0.00 to 4.00.";
  if(Object.keys(errors).length)return {errors,result:null};
  const total=completed+remaining;
  const required=((target*total)-(current*completed))/remaining;
  const maximum=((current*completed)+(4*remaining))/total;
  const minimum=(current*completed)/total;
  const state=required<=0||current>=target?"secured":required>4?"impossible":"achievable";
  return {errors,result:{current,completed,remaining,target,total,required,maximum,minimum,state}};
}

function Field({id,label,value,onChange,error,step="0.01"}){return <label className="block"><span className="field-label">{label}</span><input id={id} className={`calculator-input ${error?"input-error":""}`} type="number" min="0" max={id.includes("gpa")?"4":"10000"} step={step} inputMode="decimal" value={value} onChange={event=>onChange(event.target.value)} placeholder={id.includes("gpa")?"0.00":"0"} aria-invalid={Boolean(error)} aria-describedby={error?`${id}-error`:undefined}/>{error&&<span id={`${id}-error`} className="mt-1.5 block text-xs leading-4 text-rose-300">{error}</span>}</label>}

function Result({result}){
  if(!result)return <aside className="result-card glass-card flex min-h-[470px] flex-col items-center justify-center rounded-[24px] p-8 text-center lg:sticky lg:top-28"><div className="flex size-16 items-center justify-center rounded-[22px] border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"><Target size={29}/></div><h2 className="mt-6 text-xl font-semibold text-white">Your target plan will appear here</h2><p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">Complete all four fields to calculate the GPA needed across your remaining credits.</p></aside>;
  const impossible=result.state==="impossible",secured=result.state==="secured";
  return <aside key={`${result.required}-${result.target}`} className="result-card result-enter glass-card rounded-[24px] p-7 lg:sticky lg:top-28" aria-live="polite" aria-atomic="true">
    <div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{impossible?"Target analysis":"Required GPA"}</p><span className={`flex size-10 items-center justify-center rounded-xl ${impossible?"bg-rose-400/10 text-rose-300":"bg-cyan-400/10 text-cyan-300"}`}>{impossible?<TriangleAlert size={20}/>:<CircleCheck size={20}/>}</span></div>
    {secured?<><p className="mt-6 text-3xl font-semibold tracking-tight text-white">Target already reached</p><p className="mt-3 text-sm leading-6 text-emerald-300">{result.required<=0?"Your target is mathematically secured even with a 0.00 average in your remaining credits.":`Your current GPA is already above this target. Average at least ${result.required.toFixed(2)} in the remaining credits to finish at the target.`}</p></>:impossible?<><p className="mt-6 text-2xl font-semibold text-white">Target Not Mathematically Possible</p><p className="mt-4 text-sm text-slate-400">Required GPA: <span className="font-semibold text-rose-300">{result.required.toFixed(2)}</span></p><p className="mt-3 text-sm leading-6 text-slate-400">Even a 4.00 GPA across all remaining credits would not be enough to reach your selected target.</p></>:<><p className="gradient-text mt-5 text-7xl font-semibold tracking-[-0.07em]">{result.required.toFixed(2)}</p><p className="mt-3 text-base font-semibold text-emerald-300">Your target is achievable.</p><p className="mt-2 text-sm leading-6 text-slate-400">You need to average approximately {result.required.toFixed(2)} across your remaining credits.</p></>}
    <div className="mt-7 grid grid-cols-2 gap-3"><Stat label="Total Credits" value={result.total}/><Stat label="Current GPA" value={result.current.toFixed(2)}/><Stat label="Target GPA" value={result.target.toFixed(2)}/><Stat label="Required Remaining" value={Math.max(0,result.required).toFixed(2)}/><div className="col-span-2"><Stat label="Maximum Possible Final GPA" value={result.maximum.toFixed(2)}/></div></div>
    <div className="mt-7 border-t border-white/[0.07] pt-6"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Your GPA path</p><div className="flex items-center gap-2 text-center"><PathPoint label="Current" value={result.current}/><ArrowRight size={15} className="shrink-0 text-violet-400"/><PathPoint label="Required" value={Math.max(0,result.required)} warning={impossible}/><ArrowRight size={15} className="shrink-0 text-cyan-400"/><PathPoint label="Target" value={result.target}/></div></div>
  </aside>;
}
function Stat({label,value}){return <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5"><p className="text-[11px] leading-4 text-slate-500">{label}</p><p className="mt-1.5 text-lg font-semibold text-white">{value}</p></div>}
function PathPoint({label,value,warning}){return <div className="min-w-0 flex-1"><div className={`mx-auto flex size-11 items-center justify-center rounded-full border text-xs font-bold ${warning?"border-rose-400/30 bg-rose-400/10 text-rose-300":"border-violet-400/25 bg-gradient-to-br from-violet-500/15 to-cyan-400/10 text-white"}`}>{value.toFixed(2)}</div><p className="mt-2 truncate text-[10px] uppercase tracking-wide text-slate-500">{label}</p></div>}

export default function TargetGpaCalculator(){
  const [values,setValues]=useState(INITIAL);
  const [touched,setTouched]=useState(false);
  const {errors,result}=useMemo(()=>parse(values),[values]);
  const update=(field,value)=>{setTouched(true);setValues(current=>({...current,[field]:value}))};
  const reset=()=>{setTouched(false);setValues(INITIAL)};
  const example=()=>{setTouched(true);setValues({current:"3.20",completed:"60",remaining:"60",target:"3.50"})};
  return <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,.85fr)]">
    <section className="glass-card rounded-[24px] p-5 sm:p-7" aria-labelledby="target-inputs-heading"><div className="mb-7 flex flex-col justify-between gap-4 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-center"><div><h2 id="target-inputs-heading" className="text-xl font-semibold text-white">Plan Your Target</h2><p className="mt-1.5 text-sm text-slate-500">Enter your academic progress and final goal.</p></div><button type="button" onClick={example} className="secondary-button !min-h-10 !px-4 !py-2"><Sparkles size={15}/>Try Example</button></div>
      <div className="grid gap-5 sm:grid-cols-2"><Field id="current-gpa" label="Current GPA" value={values.current} onChange={value=>update("current",value)} error={touched?errors.current:null}/><Field id="completed-credits" label="Credits Completed" value={values.completed} onChange={value=>update("completed",value)} error={touched?errors.completed:null} step="0.5"/><Field id="remaining-credits" label="Remaining Credits" value={values.remaining} onChange={value=>update("remaining",value)} error={touched?errors.remaining:null} step="0.5"/><Field id="target-gpa" label="Target Final GPA" value={values.target} onChange={value=>update("target",value)} error={touched?errors.target:null}/></div>
      <div className="mt-7"><p className="field-label">Quick targets</p><div className="flex flex-wrap gap-2">{PRESETS.map(preset=><button key={preset} type="button" onClick={()=>update("target",preset.toFixed(2))} className={`category-chip rounded-full border px-4 py-2 text-xs font-semibold ${values.target===preset.toFixed(2)?"active":""}`}>{preset.toFixed(2)}</button>)}</div></div>
      <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><div className="flex gap-3"><Gauge size={18} className="mt-0.5 shrink-0 text-violet-300"/><p className="text-sm leading-6 text-slate-400">Results update instantly as you adjust your GPA and credit values.</p></div></div>
      <div className="mt-6 flex justify-end border-t border-white/[0.07] pt-6"><button type="button" onClick={reset} className="secondary-button"><RotateCcw size={16}/>Reset</button></div>
    </section><Result result={result}/>
  </div>;
}
