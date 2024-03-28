import { Toaster } from "sonner";

import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Navbar />
        <div>{children}</div>
        <Toaster richColors />
      </div>
      <Footer />
    </div>
  );
}
