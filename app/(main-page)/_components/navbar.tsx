import { source_sans_3 } from "@/app/fonts";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { checkRole } from "@/utils/roles";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex top-0 w-full h-20 px-4 bg-gradient-to-b from-navbarStart to-secondary items-center">
      <div className="flex max-w-[1920px] mx-auto items-center w-full justify-between">
        <Logo />
        <section className="flex space-x-4 items-center justify-between w-auto">
          <SignedOut>
            <Link
              className={cn("font-semibold text-xl", source_sans_3.className)}
              href={"/sign-in"}
            >
              Logga in
            </Link>
          </SignedOut>
          <SignedIn>
            {(checkRole("admin") || checkRole("moderator")) && (
              <Link href="/admin">
                <LockKeyhole className="md:hidden block" />
                <p
                  className={cn(
                    "text-xl font-medium pt-1 md:block hidden",
                    source_sans_3.className
                  )}
                >
                  Admin Panel
                </p>
              </Link>
            )}
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
