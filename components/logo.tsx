import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.webp";
import { prompt } from "@/app/fonts";

export default function Logo() {
  return (
    <Link href="/" className="flex md:gap-x-2 gap-x-1 items-center">
      <Image
        className="md:block hidden"
        src={logo}
        alt="Website logo"
        width={40}
        height={40}
      />
      <Image
        className="md:hidden block"
        src={logo}
        alt="Website logo"
        width={20}
        height={20}
      />
      <div className={cn("md:text-2xl text-sm", prompt.className)}>Återbrukslabbet</div>
    </Link>
  );
}
