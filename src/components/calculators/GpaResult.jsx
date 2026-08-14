import { ChartNoAxesCombined, GraduationCap } from "lucide-react";
import { getPerformanceLabel } from "@/lib/academic-calculators";

export default function GpaResult({ result }) {
  if (!result) return <aside className="result-card glass-card flex min-h-[390px] flex-col items-center justify-center rounded-[24px] p-8 text-center lg:sticky lg:top-28"><div className="flex size-16 items-center justify-center rounded-[22px] border border-violet-400/20 bg-violet-400/10 text-violet-300"><GraduationCap size={29}/></div><h2 className="mt-6 text-xl font-semibold text-white">Your GPA will appear here</h2><p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">Add credits and select a grade for at least one module to see your result.</p></aside>;

  const percent=Math.min(100,Math.max(0,(result.gpa/4)*100));
  return <aside className="result-card glass-card rounded-[24px] p-7 lg:sticky lg:top-28" aria-live="polite" aria-atomic="true">
    <div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Your GPA</p><span className="flex size-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300"><ChartNoAxesCombined size={20}/></span></div>
    <p className="gradient-text mt-5 text-7xl font-semibold tracking-[-0.07em]">{result.gpa.toFixed(2)}</p>
    <p className="mt-3 text-base font-semibold text-cyan-200">{getPerformanceLabel(result.gpa)}</p>
    <div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><p className="text-xs text-slate-500">Total Credits</p><p className="mt-2 text-2xl font-semibold text-white">{Number(result.totalCredits.toFixed(2))}</p></div><div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><p className="text-xs text-slate-500">Modules</p><p className="mt-2 text-2xl font-semibold text-white">{result.moduleCount}</p></div></div>
    <div className="mt-7 flex justify-between text-xs"><span className="text-slate-400">Progress on 4.0 scale</span><span className="font-semibold text-white">{Math.round(percent)}%</span></div>
    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/[0.06]"><div className="gpa-progress h-full rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400" style={{width:`${percent}%`}}/></div>
    <p className="mt-7 border-t border-white/[0.07] pt-5 text-xs leading-5 text-slate-500">Classification standards may vary between universities.</p>
  </aside>;
}
