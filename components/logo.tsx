import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.webp";
import { prompt } from "@/app/fonts";

export default function Logo() {
  return (
    <Link href="/" className="flex gap-x-2 items-center">
      <Image
        className="md:block hidden"
        src={logo}
        alt="Website logo"
        width={50}
        height={50}
      />
      <Image
        className="md:hidden block"
        src={logo}
        alt="Website logo"
        width={40}
        height={40}
      />
      <div className={cn("md:block hidden text-2xl", prompt.className)}>Återbrukslabbet</div>
    </Link>
  );
}
