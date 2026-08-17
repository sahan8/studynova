import { ArrowLeft, Calculator, LockKeyhole, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import GpaCalculator from "@/components/calculators/GpaCalculator";
import AcademicCalculatorNav from "@/components/calculators/AcademicCalculatorNav";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import SiteFooter from "@/components/SiteFooter";
import { createMetadata, createWebApplicationData } from "@/lib/siteConfig";

const title="Free GPA Calculator — Calculate Your GPA | StudyNova",description="Calculate your GPA instantly using module grades and credits with StudyNova's free weighted GPA calculator.";
export const metadata=createMetadata({title,description,path:"/gpa-calculator"});

export default function GpaCalculatorPage(){return <div className="site-shell relative min-h-screen overflow-hidden bg-[#050711] text-slate-100"><JsonLd data={createWebApplicationData({name:"StudyNova GPA Calculator",description,path:"/gpa-calculator",category:"EducationalApplication"})}/>
  <div className="background-grid pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true"><div className="orb -left-40 top-24 size-[34rem] bg-violet-600/15"/><div className="orb -right-36 top-[44rem] size-[30rem] bg-cyan-500/10 [animation-delay:-3s]"/></div>
  <Navbar/>
  <main className="relative px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
    <div className="mx-auto max-w-6xl">
      <Link href="/#tools" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><ArrowLeft size={16}/>Back to tools</Link>
      <header className="hero-enter mb-12 max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-semibold text-violet-200"><Calculator size={15}/>Academic Calculator</div>
        <h1 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">Calculate Your <span className="gradient-text gradient-glow">GPA</span></h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-slate-400">Add your modules, credits, and grades to instantly calculate your GPA.</p>
      </header>
      <AcademicCalculatorNav active="/gpa-calculator"/>
      <GpaCalculator/>

      <section className="glass-card mt-6 flex flex-col gap-4 rounded-[22px] p-6 sm:flex-row sm:items-center">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"><LockKeyhole size={20}/></span><div><h2 className="font-semibold text-white">Private by Design</h2><p className="mt-1.5 text-sm leading-6 text-slate-400">Your GPA calculation happens directly in your browser. StudyNova does not need to upload your grades to calculate your GPA.</p></div>
      </section>

      <div className="mt-20 grid gap-5 md:grid-cols-2">
        <section className="glass-card rounded-[22px] p-7"><p className="mb-4 flex size-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300"><Sparkles size={19}/></p><h2 className="text-2xl font-semibold tracking-tight text-white">How is GPA calculated?</h2><p className="mt-4 text-sm leading-7 text-slate-400">Your GPA is calculated by multiplying each module&apos;s grade point by its credit value, adding those results together, and dividing by the total number of credits.</p><div className="mt-6 overflow-x-auto rounded-2xl border border-white/[0.08] bg-black/20 px-5 py-4 text-center font-mono text-sm text-cyan-200">GPA = Σ (Credits × Grade Points) ÷ Σ Credits</div></section>
        <section className="glass-card rounded-[22px] p-7"><p className="mb-4 flex size-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300"><Calculator size={19}/></p><h2 className="text-2xl font-semibold tracking-tight text-white">How to use the StudyNova GPA Calculator</h2><ol className="mt-4 space-y-3 text-sm leading-6 text-slate-400"><li><span className="mr-2 font-semibold text-violet-300">1.</span>Enter a module name to keep your results easy to understand.</li><li><span className="mr-2 font-semibold text-violet-300">2.</span>Add its credit value and select the grade you earned.</li><li><span className="mr-2 font-semibold text-violet-300">3.</span>Add or remove modules as needed. Your weighted GPA updates instantly.</li></ol></section>
      </div>
      <FaqSection items={[{question:"What is GPA?",answer:"GPA is a numerical summary of academic performance, usually calculated from the grade points earned across a set of modules."},{question:"How do I calculate GPA?",answer:"Multiply each grade point by its module credits, add the weighted points, then divide by the total valid credits."},{question:"Does every university use the same GPA scale?",answer:"No. Grade points, weighting rules, repeated-module policies and classifications vary, so check your university’s official guidance."}]}/>
    </div>
  </main>
  <SiteFooter/>
</div>}
