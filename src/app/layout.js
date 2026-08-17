import "./globals.css";
import { getSocialImage, siteConfig } from "@/lib/siteConfig";

const socialImage=getSocialImage();

export const metadata = {
  ...(siteConfig.url?{metadataBase:new URL(siteConfig.url)}:{}),
  title:{default:siteConfig.defaultTitle,template:"%s | StudyNova"},
  description:siteConfig.description,
  applicationName:siteConfig.name,
  creator:siteConfig.name,
  publisher:siteConfig.name,
  icons:{apple:[{url:"/apple-touch-icon.png",sizes:"266x273",type:"image/png"}]},
  robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},
  openGraph:{title:siteConfig.defaultTitle,description:siteConfig.description,siteName:siteConfig.name,locale:"en_US",type:"website",...(siteConfig.url?{url:siteConfig.url}:{}),...(socialImage?{images:[socialImage]}:{})},
  twitter:{card:"summary_large_image",title:siteConfig.defaultTitle,description:siteConfig.description,...(socialImage?{images:[{url:socialImage.url,alt:socialImage.alt}]}:{})},
};

export default function RootLayout({ children }) {
  return <html lang="en" className="h-full scroll-smooth antialiased"><body className="min-h-full font-sans">{children}</body></html>;
}
