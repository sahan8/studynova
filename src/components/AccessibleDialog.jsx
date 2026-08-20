"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

const focusable='button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function AccessibleDialog({title,onClose,children,maxWidth="max-w-lg"}){
  const titleId=useId(),panelRef=useRef(null),returnFocus=useRef(null),onCloseRef=useRef(onClose);
  useEffect(()=>{onCloseRef.current=onClose},[onClose]);
  useEffect(()=>{
    returnFocus.current=document.activeElement;
    const panel=panelRef.current;
    const first=panel?.querySelector(focusable);
    first?.focus();
    const handleKey=event=>{
      if(event.key==="Escape"){event.preventDefault();onCloseRef.current();return}
      if(event.key!=="Tab"||!panel)return;
      const items=[...panel.querySelectorAll(focusable)];
      if(!items.length)return;
      const start=items[0],end=items.at(-1);
      if(event.shiftKey&&document.activeElement===start){event.preventDefault();end.focus()}
      else if(!event.shiftKey&&document.activeElement===end){event.preventDefault();start.focus()}
    };
    document.addEventListener("keydown",handleKey);
    return()=>{document.removeEventListener("keydown",handleKey);returnFocus.current?.focus?.()};
  },[]);

  return <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-[#03050d]/80 p-5 backdrop-blur-md" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)onClose()}}><div ref={panelRef} className={`glass-card my-auto w-full ${maxWidth} rounded-[24px] p-6`} role="dialog" aria-modal="true" aria-labelledby={titleId}><div className="mb-6 flex items-center justify-between"><h2 id={titleId} className="text-xl font-semibold text-white">{title}</h2><button type="button" onClick={onClose} aria-label={`Close ${title}`} className="flex size-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><X aria-hidden="true" size={19}/></button></div>{children}</div></div>;
}
