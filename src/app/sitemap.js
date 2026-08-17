import { getSitemapBaseUrl, sitemapUrl } from "@/lib/siteConfig";

const pages=[
  {path:"/",priority:1},
  {path:"/academic-calculators",priority:.9},
  {path:"/gpa-calculator",priority:.9},
  {path:"/target-gpa-calculator",priority:.8},
  {path:"/cgpa-calculator",priority:.8},
  {path:"/focus-timer",priority:.8},
  {path:"/study-planner",priority:.8},
];

export default function sitemap(){
  if(!getSitemapBaseUrl())return [];
  return pages.map(({path,priority})=>({url:sitemapUrl(path),changeFrequency:"monthly",priority}));
}
