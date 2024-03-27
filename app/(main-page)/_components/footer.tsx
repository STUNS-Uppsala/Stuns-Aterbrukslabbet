import Logo from "@/components/logo";

export default function Footer() {
  return (
    <header className="flex w-full mt-6 bg-gradient-to-b from-secondary to-navbarStart">
      <div className="flex justify-around max-w-[1220px] md:pt-6 md:pb-3 pt-4 pb-2 mx-auto items-center w-full">
        <section className="flex flex-col md:w-64 w-36 justify-center text-center">
          <Logo />
          <p className="md:text-sm text-[9px]">
            Företag kan donera, lärare kan efterfråga. Välkommen till
            Återbrukslabbet!
          </p>
        </section>
      </div>
    </header>
  );
}
