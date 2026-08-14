import Link from "next/link";
import { Calculator, GraduationCap, Target } from "lucide-react";

const calculators=[
  {href:"/gpa-calculator",label:"GPA Calculator",detail:"Modules & grades",icon:Calculator},
  {href:"/target-gpa-calculator",label:"Target GPA",detail:"Plan your goal",icon:Target},
  {href:"/cgpa-calculator",label:"CGPA Calculator",detail:"Multiple semesters",icon:GraduationCap},
];

export default function AcademicCalculatorNav({active}){return <nav aria-label="Academic calculators" className="mb-10 grid gap-3 sm:grid-cols-3">{calculators.map(({href,label,detail,icon:Icon})=>{const current=active===href;return <Link key={href} href={href} aria-current={current?"page":undefined} className={`academic-tool-link group flex items-center gap-3 rounded-2xl border p-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${current?"active":""}`}><span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-400 transition group-hover:text-cyan-300"><Icon size={18}/></span><span className="min-w-0"><span className="block truncate text-sm font-semibold text-slate-200">{label}</span><span className="mt-0.5 block truncate text-[11px] text-slate-500">{detail}</span></span></Link>})}</nav>}
