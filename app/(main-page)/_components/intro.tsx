import { source_sans_3, prompt } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import IntroSectionDivider from "@/public/images/intro-section-divider.svg";

export default function Intro() {
  return (
    <div>
      <div className="md:pt-16 pt-4 bg-secondary w-full">
        <div className="flex flex-col max-w-screen-md mx-auto">
          <div
            className={cn(
              "flex mx-auto md:text-5xl text-2xl md:pb-4 pb-2 font-semibold justify-center text-center",
              source_sans_3.className
            )}
          >
            Välkommen till
          </div>
          <div
            className={cn(
              "flex md:px-12 px-6 md:py-8 py-4 text-3xl md:text-6xl font-medium mx-auto bg-primary bg-opacity-25 rounded-lg justify-center text-center",
              prompt.className
            )}
          >
            Återbrukslabbet
          </div>
          <div
            className={cn(
              "flex flex-col md:w-8/12 w-10/12 md:text-3xl md:pt-8 pt-4 text-sm font-light text-center items-center mx-auto text-balance",
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
      <Image src={IntroSectionDivider} className="select-none" alt="" style={{width:"100%", zIndex: "-1"}}/>
    </div>
  );
}
