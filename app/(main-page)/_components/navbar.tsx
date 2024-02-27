import Logo from "@/components/logo";

export default function Navbar() {
  return (
    <header className="flex top-0 w-full h-20 px-4 bg-gradient-to-b from-navbarStart to-secondary items-center">
      <div className="flex max-w-[1920px] mx-auto items-center w-full justify-between">
        <Logo />
        <section className="flex space-x-4 md:block md:w-auto items-center justify-between w-full"></section>
      </div>
    </header>
  );
}
