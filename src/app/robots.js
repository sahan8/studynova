import { getSitemapBaseUrl, sitemapUrl } from "@/lib/siteConfig";

export default function robots(){
  const sitemapBaseUrl=getSitemapBaseUrl();
  return {
    rules:{userAgent:"*",allow:"/"},
    ...(sitemapBaseUrl?{sitemap:sitemapUrl("/sitemap.xml")}:{})
  };
}
