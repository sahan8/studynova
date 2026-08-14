import { Trash2 } from "lucide-react";

export default function ModuleRow({ module, index, gradeScale, onChange, onRemove }) {
  const creditNumber = Number(module.credits);
  const hasActivity = Boolean(module.name.trim() || module.credits || module.grade);
  const creditError = hasActivity && (!module.credits || !Number.isFinite(creditNumber) || creditNumber <= 0 || creditNumber > 1000);
  const gradeError = hasActivity && !module.grade;

  return (
    <fieldset className="module-row rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
      <legend className="sr-only">Module {index + 1}</legend>
      <div className="grid items-start gap-4 sm:grid-cols-[minmax(0,1fr)_110px_130px_44px]">
        <label className="block">
          <span className="field-label">Module Name</span>
          <input className="calculator-input" type="text" value={module.name} onChange={(event)=>onChange(module.id,"name",event.target.value)} placeholder="e.g. Programming" autoComplete="off" />
        </label>
        <label className="block">
          <span className="field-label">Credits</span>
          <input className={`calculator-input ${creditError?"input-error":""}`} type="number" min="0.01" max="1000" step="0.5" inputMode="decimal" value={module.credits} onChange={(event)=>onChange(module.id,"credits",event.target.value)} placeholder="3" aria-invalid={creditError} aria-describedby={creditError?`credit-error-${module.id}`:undefined}/>
          {creditError&&<span id={`credit-error-${module.id}`} className="mt-1.5 block text-xs leading-4 text-rose-300">Enter credits from 0.01 to 1000.</span>}
        </label>
        <label className="block">
          <span className="field-label">Grade</span>
          <select className={`calculator-input ${gradeError?"input-error":""}`} value={module.grade} onChange={(event)=>onChange(module.id,"grade",event.target.value)} aria-invalid={gradeError} aria-describedby={gradeError?`grade-error-${module.id}`:undefined}>
            <option value="">Select</option>
            {Object.entries(gradeScale).map(([grade,point])=><option key={grade} value={grade}>{grade} — {point.toFixed(2)}</option>)}
          </select>
          {gradeError&&<span id={`grade-error-${module.id}`} className="mt-1.5 block text-xs leading-4 text-rose-300">Choose a grade.</span>}
        </label>
        <button type="button" onClick={()=>onRemove(module.id)} aria-label={`Delete module ${index+1}${module.name?`: ${module.name}`:""}`} className="mt-6 flex size-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-500 transition hover:border-rose-400/25 hover:bg-rose-400/10 hover:text-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
          <Trash2 size={17}/>
        </button>
      </div>
    </fieldset>
  );
}
