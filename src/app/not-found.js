import { ArrowRight, House } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";

export const metadata={title:{absolute:"Page Not Found | StudyNova"}};

export default function NotFound(){return <div className="site-shell relative min-h-screen overflow-hidden bg-[#050711] text-slate-100"><div className="background-grid pointer-events-none absolute inset-0" aria-hidden="true"/><Navbar/><main className="relative flex min-h-screen items-center justify-center px-5 py-32"><section className="glass-card w-full max-w-xl rounded-[28px] p-8 text-center sm:p-12" aria-labelledby="not-found-title"><span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10"><Image src="/icon.png" width={263} height={268} sizes="40px" alt="" className="h-auto w-10"/></span><p className="gradient-text mt-7 text-7xl font-semibold tracking-[-0.07em]">404</p><h1 id="not-found-title" className="mt-4 text-2xl font-semibold text-white sm:text-3xl">Looks like this study session doesn&apos;t exist.</h1><p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400">The page may have moved, or the address might be incorrect. You can return home or choose another StudyNova tool.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/" className="primary-button"><House size={16}/>Back Home</Link><Link href="/#tools" className="secondary-button">Explore Tools<ArrowRight size={16}/></Link></div></section></main></div>}
