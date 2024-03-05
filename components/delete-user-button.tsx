"use client";

import { useAction } from "@/hooks/use-action";

import { toast } from "sonner";
import { deleteUser } from "@/actions/delete-user";
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
import { useRouter } from "next/navigation";

interface DeleteUserFormProps {
  id: string;
  email: string;
}

export default function DeleteUserButton({ id, email }: DeleteUserFormProps) {
  const router = useRouter();

  const { execute } = useAction(deleteUser, {
    onSuccess(data) {
      router.refresh();
      toast.success(data + " Borttagen");
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id, email });
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
          <AlertDialogAction variant="destructive">
            <button onClick={onDelete}>Ta bort</button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
