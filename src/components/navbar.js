"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";

const links = [{label:"Home",href:"/"},{label:"Tools",href:"/#tools"},{label:"Study",href:"/study-planner"},{label:"About",href:"/#about"}];

export default function Navbar() {
  const pathname=usePathname();
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const update=()=>setScrolled(window.scrollY>16);update();window.addEventListener("scroll",update,{passive:true});return()=>window.removeEventListener("scroll",update)},[]);
  useEffect(()=>{const close=event=>{if(event.key==="Escape")setOpen(false)};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close)},[]);
  return <><header className={`premium-nav fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled?"nav-scrolled":""}`}>
    <nav aria-label="Main navigation" className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8">
      <Link href="/" onClick={()=>setOpen(false)} aria-label="StudyNova home" className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><BrandLogo eager/></Link>
      <div className="hidden items-center gap-8 md:flex">{links.map(link=>{const active=!link.href.includes("#")&&pathname===link.href;return <Link key={link.label} href={link.href} aria-current={active?"page":undefined} className={`nav-link relative py-2 text-sm font-medium transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${active?"text-white":"text-slate-400"}`}>{link.label}</Link>})}</div>
      <Link href="/#tools" className="primary-button hidden !min-h-10 !px-4 !py-2 md:inline-flex">Explore Tools <ArrowRight size={15} aria-hidden="true" /></Link>
      <button type="button" onClick={()=>setOpen(value=>!value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open?"Close navigation menu":"Open navigation menu"} className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 md:hidden">{open?<X size={20}/>:<Menu size={20}/>}</button>
    </nav>
    {open&&<div id="mobile-menu" className="border-t border-white/[0.07] bg-[#070914]/95 px-5 py-5 backdrop-blur-xl md:hidden"><div className="mx-auto flex max-w-6xl flex-col gap-1">{links.map(link=><Link key={link.label} href={link.href} onClick={()=>setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">{link.label}</Link>)}<Link href="/#tools" onClick={()=>setOpen(false)} className="primary-button mt-3">Explore Tools <ArrowRight size={15}/></Link></div></div>}
  </header><span id="main-content" tabIndex="-1" className="sr-only">Main content</span></>;
}
