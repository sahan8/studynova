import Image from "next/image";

export default function BrandLogo({className="h-auto w-[132px]",displayWidth=132,eager=false}){
  return <Image src="/logo.png" width={1070} height={316} sizes={`${displayWidth}px`} loading={eager?"eager":"lazy"} alt="StudyNova" className={className}/>;
}
