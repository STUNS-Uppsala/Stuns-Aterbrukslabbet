import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.webp";
import { prompt } from "@/app/fonts";

export default function Logo() {
  return (
    <Link href="/" className="flex gap-x-2 items-center">
      <Image
        src={logo}
        alt="Website logo"
        width={50}
        height={50}
      />
      <div className={cn("text-2xl", prompt.className)}>Återbrukslabbet</div>
    </Link>
  );
}
