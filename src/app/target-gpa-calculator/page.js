import { ArrowLeft, Calculator, Info, LockKeyhole, Target } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import TargetGpaCalculator from "@/components/calculators/TargetGpaCalculator";
import AcademicCalculatorNav from "@/components/calculators/AcademicCalculatorNav";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import SiteFooter from "@/components/SiteFooter";
import { createMetadata, createWebApplicationData } from "@/lib/siteConfig";

const title="Target GPA Calculator — What GPA Do You Need? | StudyNova",description="Find the GPA you need across your remaining credits to reach your target final GPA.";
export const metadata=createMetadata({title,description,path:"/target-gpa-calculator"});

export default function TargetGpaPage(){return <div className="site-shell relative min-h-screen overflow-hidden bg-[#050711] text-slate-100"><JsonLd data={createWebApplicationData({name:"StudyNova Target GPA Calculator",description,path:"/target-gpa-calculator",category:"EducationalApplication"})}/>
  <div className="background-grid pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true"><div className="orb -left-40 top-24 size-[34rem] bg-violet-600/15"/><div className="orb -right-36 top-[44rem] size-[30rem] bg-cyan-500/10 [animation-delay:-3s]"/></div><Navbar/>
  <main className="relative px-5 pb-24 pt-28 sm:px-8 sm:pt-36"><div className="mx-auto max-w-6xl">
    <Link href="/#tools" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><ArrowLeft size={16}/>Back to tools</Link>
    <header className="hero-enter mb-12 max-w-3xl"><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-200"><Target size={15}/>Academic Calculator</div><h1 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">Reach Your <span className="gradient-text gradient-glow">Target GPA</span></h1><p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-slate-400">Find the average GPA you need across your remaining credits to reach your final goal.</p></header>
    <AcademicCalculatorNav active="/target-gpa-calculator"/>
    <TargetGpaCalculator/>
    <section className="glass-card mt-6 flex flex-col gap-4 rounded-[22px] p-6 sm:flex-row sm:items-center"><span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"><LockKeyhole size={20}/></span><div><h2 className="font-semibold text-white">Private by Design</h2><p className="mt-1.5 text-sm leading-6 text-slate-400">Your GPA information is calculated directly in your browser and does not need to be uploaded to StudyNova.</p></div></section>
    <div className="mt-20 grid gap-5 md:grid-cols-2"><section className="glass-card rounded-[22px] p-7"><span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300"><Target size={19}/></span><h2 className="text-2xl font-semibold tracking-tight text-white">What is a Target GPA Calculator?</h2><p className="mt-4 text-sm leading-7 text-slate-400">A Target GPA Calculator estimates the average GPA you need across your remaining credits to finish with a chosen cumulative GPA. It considers both how much study you have completed and how many credits remain.</p></section><section className="glass-card rounded-[22px] p-7"><span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300"><Calculator size={19}/></span><h2 className="text-2xl font-semibold tracking-tight text-white">Formula</h2><div className="mt-5 overflow-x-auto rounded-2xl border border-white/[0.08] bg-black/20 px-4 py-4 text-center font-mono text-xs leading-6 text-cyan-200">Required GPA = ((Target GPA × Total Credits) − (Current GPA × Completed Credits)) ÷ Remaining Credits</div><p className="mt-4 text-sm leading-7 text-slate-400">Total credits combine completed and remaining credits. The formula balances points already earned against the points needed to reach your target.</p></section></div>
    <aside className="mt-5 flex gap-3 rounded-[20px] border border-amber-300/15 bg-amber-300/[0.045] p-5 text-sm leading-6 text-slate-400"><Info size={19} className="mt-0.5 shrink-0 text-amber-300"/><p><strong className="text-slate-200">Important note:</strong> StudyNova provides mathematical estimates only. Degree classifications and GPA rules vary between universities.</p></aside>
    <FaqSection items={[{question:"Can I still reach my target GPA?",answer:"Enter your completed and remaining credits to see the average required. A result from 0.00 to 4.00 is mathematically achievable on this scale."},{question:"Why is my target mathematically impossible?",answer:"The target requires an average above 4.00 in the remaining credits, so even the maximum available grade points would not be enough."}]}/>
  </div></main><SiteFooter/>
</div>}
