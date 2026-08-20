"use client";
import { useEffect, useRef } from "react";

export default function ScrollReveal({children,animation="fade-up",delay=0,duration=700,threshold=.14,className="",as:Tag="div"}){
  const ref=useRef(null);
  useEffect(()=>{const node=ref.current;if(!node)return;if(!("IntersectionObserver" in window)){node.dataset.visible="true";return}const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){node.dataset.visible="true";observer.disconnect()}},{threshold});observer.observe(node);return()=>observer.disconnect()},[threshold]);
  return <Tag ref={ref} data-reveal={animation} data-visible="false" className={className} style={{"--reveal-delay":`${delay}ms`,"--reveal-duration":`${duration}ms`}}>{children}</Tag>;
}
