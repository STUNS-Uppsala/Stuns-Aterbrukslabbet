import Logo from "@/components/logo";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full h-20 px-4 bg-gradient-to-b from-navbarStart to-secondary flex items-center">
      <div className="max-w-[1920px] mx-auto flex items-center w-full justify-between">
        <Logo />
        <section className="space-x-4 md:block md:w-auto flex items-center justify-between w-full"></section>
      </div>
    </header>
  );
}
