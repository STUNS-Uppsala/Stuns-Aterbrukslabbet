"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import deleteUser from "@/utils/delete-user";

interface DeleteUserButtonProps {
  id: string;
  email: string;
  redirectPath?: string;
}

export default function DeleteUserButton({
  id,
  email,
  redirectPath,
}: DeleteUserButtonProps) {
  const router = useRouter();

  const onDelete = async () => {
    const result = await deleteUser({ id });
    if (result && result.error) {
      toast.error(result.error);
    } else if (result && result.data) {
      router.refresh();
      toast.success(result.data + " Borttagen");
      if (result.deletedPostCount && result.deletedPostCount > 0) {
        toast.success(result.deletedPostCount + " inlägg borttagna");
      }
      redirectPath && router.push(redirectPath);
    } else {
      toast.error("Något gick fel");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-destructive font-semibold hover:opacity-80">
        Ta bort konto
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Är du säker?</AlertDialogTitle>
          <AlertDialogDescription>
            Detta kommer
            <span className="font-bold"> permanent</span> ta bort användaren 
            <p className="font-semibold break-all">{email}</p>
            och 
            <span className="font-bold"> alla</span> deras inlägg.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Avbryt</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onDelete}>
            Ta bort
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
