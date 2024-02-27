import { sourceSans3 } from "@/app/fonts";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex top-0 w-full h-20 px-4 bg-gradient-to-b from-navbarStart to-secondary items-center">
      <div className="flex max-w-[1920px] mx-auto items-center w-full justify-between">
        <Logo />
        <section className="flex space-x-4 items-center justify-between w-auto">
          <SignedOut>
            <Link
              className={cn("font-semibold text-xl", sourceSans3.className)}
              href={"/sign-in"}
            >
              Logga in
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: {
                    height: 35,
                    width: 35,
                  },
                },
              }}
            />
          </SignedIn>
        </section>
      </div>
    </header>
  );
}
