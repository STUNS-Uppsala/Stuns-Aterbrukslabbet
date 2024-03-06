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

interface DeleteUserFormProps {
  id: string;
  email: string;
}

export default function DeleteUserButton({ id, email }: DeleteUserFormProps) {
  const router = useRouter();

  const onDelete = async () => {
    const result = await deleteUser({ id });
    if (result && result.error) {
      toast.error(result.error);
    } else if (result && result.data) {
      router.refresh();
      toast.success(result.data + " Borttagen");
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
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Avbryt</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onDelete}>
            <div>Ta bort</div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
