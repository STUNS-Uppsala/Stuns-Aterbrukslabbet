import { source_sans_3, prompt } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import IntroSectionDivider from "@/public/images/intro-section-divider.svg";

export default function Intro() {
  return (
    <div>
      <div className="md:pt-16 pt-4 bg-secondary w-full">
        <div className="flex flex-col md:max-w-screen-sm max-w-80 mx-auto items-center">
          <div
            className={cn(
              "md:text-5xl text-2xl font-semibold md:pb-4 pb-2",
              source_sans_3.className
            )}
          >
            Välkommen till
          </div>
          <div
            className={cn(
              "md:px-12 px-6 md:py-8 py-4 md:text-6xl text-3xl font-medium bg-primary bg-opacity-25 rounded-lg",
              prompt.className
            )}
          >
            Återbrukslabbet
          </div>
          <div
            className={cn(
              "md:px-16 px-4 md:pt-8 pt-4 md:text-3xl text-sm font-light text-center text-balance",
              source_sans_3.className
            )}
          >
            <p>
              Återbrukslabbet ger avställd labbutrustning nytt liv i skolan.
              Modern utrustning ökar undervisningens relevans, avlastar
              skolbudgetar, sparar planetens resurser och gör lärandet roligare.
            </p>
            <p>
              Företag kan donera, lärare kan efterfråga. Välkommen till
              Återbrukslabbet!
            </p>
          </div>
        </div>
      </div>
      <Image
        src={IntroSectionDivider}
        className="select-none"
        alt=""
        style={{ width: "100%", zIndex: "-1" }}
      />
    </div>
  );
}
