"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const selectors=[["main header","fade-up"],["main section:not(#home)","blur-in"],[".tool-card","scale-up"],[".day-card","fade-up"],[".result-card","fade-right"],["footer","fade-up"]];

export default function MotionEffects(){
  const pathname=usePathname(),[progress,setProgress]=useState(0),frame=useRef(0);
  useEffect(()=>{
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches,targets=[];
    selectors.forEach(([selector,animation])=>document.querySelectorAll(selector).forEach((node,index)=>{if(node.closest("[role='dialog']")||node.dataset.reveal)return;node.dataset.reveal=animation;node.dataset.visible=reduced?"true":"false";node.style.setProperty("--reveal-delay",`${Math.min(index%7,5)*70}ms`);targets.push(node)}));
    document.documentElement.classList.add("motion-ready");
    let observer;
    if(!reduced&&"IntersectionObserver" in window){observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.dataset.visible="true";observer.unobserve(entry.target)}}),{rootMargin:"0px 0px -8%",threshold:.1});targets.forEach(node=>observer.observe(node))}else targets.forEach(node=>node.dataset.visible="true");
    const update=()=>{frame.current=0;const available=document.documentElement.scrollHeight-window.innerHeight;setProgress(available>0?Math.min(1,window.scrollY/available):0);if(!reduced&&window.innerWidth>=768)document.documentElement.style.setProperty("--scroll-shift",`${Math.min(24,window.scrollY*.018)}px`)};
    const onScroll=()=>{if(!frame.current)frame.current=requestAnimationFrame(update)};update();window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onScroll,{passive:true});
    return()=>{observer?.disconnect();window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onScroll);if(frame.current)cancelAnimationFrame(frame.current);document.documentElement.classList.remove("motion-ready")};
  },[pathname]);
  return <div className="scroll-progress" aria-hidden="true"><span style={{transform:`scaleX(${progress})`}}/></div>;
}
