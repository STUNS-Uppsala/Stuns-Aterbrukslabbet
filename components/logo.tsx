import Link from "next/link";

import { cn } from "@/lib/utils";
import { prompt } from "@/app/fonts";

export default function Logo() {
  return (
    <Link href="/">
      <div className={cn("text-2xl font-medium", prompt.className)}>Återbrukslabbet</div>
    </Link>
  );
}
