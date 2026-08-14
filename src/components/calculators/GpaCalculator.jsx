"use client";

import { useMemo, useRef, useState } from "react";
import { Plus, RotateCcw, Sparkles } from "lucide-react";
import ModuleRow from "./ModuleRow";
import GpaResult from "./GpaResult";

export const GRADE_SCALE={"A+":4,"A":4,"A-":3.7,"B+":3.3,"B":3,"B-":2.7,"C+":2.3,"C":2,"C-":1.7,"D+":1.3,"D":1,"F":0};
const EXAMPLE=[{name:"Programming",credits:"3",grade:"A"},{name:"Database Systems",credits:"3",grade:"B+"},{name:"Computer Networks",credits:"3",grade:"A-"},{name:"Web Development",credits:"4",grade:"A"}];
const emptyModule=(id)=>({id,name:"",credits:"",grade:""});

export default function GpaCalculator(){
  const nextId=useRef(4);
  const [modules,setModules]=useState(()=>[emptyModule(1),emptyModule(2),emptyModule(3)]);
  const result=useMemo(()=>{
    const valid=modules.filter(item=>{const credits=Number(item.credits);return item.credits!==""&&Number.isFinite(credits)&&credits>0&&credits<=1000&&Object.hasOwn(GRADE_SCALE,item.grade)});
    if(!valid.length)return null;
    const totalCredits=valid.reduce((sum,item)=>sum+Number(item.credits),0);
    const weightedPoints=valid.reduce((sum,item)=>sum+Number(item.credits)*GRADE_SCALE[item.grade],0);
    return {gpa:weightedPoints/totalCredits,totalCredits,moduleCount:valid.length};
  },[modules]);
  const update=(id,field,value)=>setModules(current=>current.map(item=>item.id===id?{...item,[field]:value}:item));
  const remove=(id)=>setModules(current=>current.filter(item=>item.id!==id));
  const add=()=>setModules(current=>[...current,emptyModule(nextId.current++)]);
  const reset=()=>{nextId.current=4;setModules([emptyModule(1),emptyModule(2),emptyModule(3)])};
  const tryExample=()=>setModules(EXAMPLE.map(item=>({...item,id:nextId.current++})));

  return <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,.75fr)]">
    <section className="glass-card rounded-[24px] p-5 sm:p-7" aria-labelledby="modules-heading">
      <div className="mb-7 flex flex-col justify-between gap-4 border-b border-white/[0.07] pb-6 sm:flex-row sm:items-center"><div><h2 id="modules-heading" className="text-xl font-semibold text-white">Your Modules</h2><p className="mt-1.5 text-sm text-slate-500">Add the credits and grade for each module.</p></div><button type="button" onClick={tryExample} className="secondary-button !min-h-10 !px-4 !py-2"><Sparkles size={15}/>Try Example</button></div>
      <div className="max-h-[680px] space-y-3 overflow-y-auto pr-1">{modules.length?modules.map((module,index)=><ModuleRow key={module.id} module={module} index={index} gradeScale={GRADE_SCALE} onChange={update} onRemove={remove}/>):<div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center text-sm text-slate-500">No modules yet. Add one to get started.</div>}</div>
      <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:justify-between"><button type="button" onClick={add} className="primary-button"><Plus size={17}/>Add Module</button><button type="button" onClick={reset} className="secondary-button"><RotateCcw size={16}/>Reset</button></div>
    </section>
    <GpaResult result={result}/>
  </div>;
}
