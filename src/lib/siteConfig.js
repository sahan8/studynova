const rawSiteUrl=process.env.NEXT_PUBLIC_SITE_URL?.trim();

function getProductionUrl(value){
  if(!value)return null;
  try{
    const url=new URL(value);
    const localHosts=new Set(["localhost","127.0.0.1","0.0.0.0","::1"]);
    if(!["http:","https:"].includes(url.protocol)||localHosts.has(url.hostname.toLowerCase()))return null;
    return url.origin;
  }catch{return null}
}

export const siteConfig={
  name:"StudyNova",
  defaultTitle:"StudyNova — Smart Tools for Students",
  description:"Free academic calculators, study planners, focus tools and student utilities designed to help students study smarter.",
  url:getProductionUrl(rawSiteUrl),
};

export const socialImage={
  url:"/opengraph-image.png",
  width:1131,
  height:525,
  alt:"StudyNova — Smart Tools for Students",
};

export function absoluteUrl(path="/"){
  return siteConfig.url?new URL(path,`${siteConfig.url}/`).toString():null;
}

export function getSitemapBaseUrl(){
  if(siteConfig.url)return siteConfig.url;
  return process.env.NODE_ENV==="development"?"http://localhost:3000":null;
}

export function sitemapUrl(path="/"){
  const baseUrl=getSitemapBaseUrl();
  return baseUrl?new URL(path,`${baseUrl}/`).toString():null;
}

export function getSocialImage(){
  const baseUrl=siteConfig.url||(process.env.NODE_ENV==="development"?"http://localhost:3000":null);
  return baseUrl?{...socialImage,url:new URL(socialImage.url,`${baseUrl}/`).toString()}:null;
}

export function createMetadata({title,description,path="/",type="website"}){
  const canonical=absoluteUrl(path);
  const image=getSocialImage();
  return {
    title:{absolute:title},
    description,
    ...(canonical?{alternates:{canonical}}:{}),
    openGraph:{title,description,siteName:siteConfig.name,locale:"en_US",type,...(canonical?{url:canonical}:{}),...(image?{images:[image]}:{})},
    twitter:{card:"summary_large_image",title,description,...(image?{images:[{url:image.url,alt:image.alt}]}:{})},
  };
}

export function createWebApplicationData({name,description,path,category}){
  const url=absoluteUrl(path);
  return {"@context":"https://schema.org","@type":"WebApplication",name,description,applicationCategory:category,operatingSystem:"Any",isAccessibleForFree:true,...(url?{url}:{})};
}
