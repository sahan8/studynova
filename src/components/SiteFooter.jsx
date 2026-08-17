import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export default function SiteFooter(){return <footer className="relative border-t border-white/[0.07] px-5 py-8"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row"><Link href="/" aria-label="StudyNova home" className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><BrandLogo className="h-auto w-[116px]" displayWidth={116}/></Link><p className="text-center text-xs text-slate-600">© 2026 StudyNova. Built for students.</p></div></footer>}
