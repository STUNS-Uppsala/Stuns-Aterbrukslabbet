import Link from "next/link";
import { LockKeyhole, ScrollText } from "lucide-react";

import { checkRole } from "@/utils/check-role";
import { cn } from "@/lib/utils";
import { getUserId } from "@/utils/get-user-id";
import Logo from "@/components/logo";
import { source_sans_3 } from "@/app/fonts";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";


export default function Navbar() {
  const userId = getUserId();
  return (
    <header className="flex top-0 w-full h-20 px-4 bg-gradient-to-b from-navbarStart to-secondary">
      <div className="flex max-w-[1920px] mx-auto items-center w-full justify-between">
        <Logo />
        <section className="flex md:space-x-4 space-x-3 justify-between w-auto items-center">
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
                    "text-xl font-medium md:block hidden",
                    source_sans_3.className
                  )}
                >
                  Admin Panel
                </p>
              </Link>
            )}
            <Link href={`/profile/${userId}`}>
              <ScrollText className="md:hidden block" />
              <p
                className={cn(
                  "text-xl font-medium md:block hidden",
                  source_sans_3.className
                )}
              >
                Min sida
              </p>
            </Link>
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
