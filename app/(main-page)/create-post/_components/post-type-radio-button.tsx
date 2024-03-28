import { cn } from "@/lib/utils";

interface PostTypeRadioButtonProps {
  postType: string;
  setPostType: (...event: any[]) => void;
}

export default function PostTypeRadioButton({
  postType,
  setPostType,
}: PostTypeRadioButtonProps) {
  return (
    <div className="grid grid-cols-2 w-60 mx-auto md:text-lg text-sm">
      <input
        type="button"
        value="Erbjuds"
        onClick={() => setPostType("erbjuds")}
        className={cn(
          "hover:bg-opacity-60 rounded-s-md cursor-pointer bg-primary",
          postType === "erbjuds" && "bg-offerColor bg-opacity-65"
        )}
      ></input>
      <input
        type="button"
        value="Efterfrågas"
        onClick={() => setPostType("efterfrågas")}
        className={cn(
          "hover:bg-opacity-60 rounded-e-md cursor-pointer bg-primary",
          postType === "efterfrågas" && "bg-requestColor bg-opacity-65"
        )}
      ></input>
    </div>
  );
}
