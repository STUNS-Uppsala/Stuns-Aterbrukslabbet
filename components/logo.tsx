import Link from "next/link";
import { Prompt } from "next/font/google";

import { cn } from "@/lib/utils";

const prompt = Prompt({ subsets: ["latin"], weight: ["600"] });

export default function Logo() {
  return (
    <Link href="/">
      <div className={cn("text-2xl", prompt.className)}>Återbrukslabbet</div>
    </Link>
  );
}
