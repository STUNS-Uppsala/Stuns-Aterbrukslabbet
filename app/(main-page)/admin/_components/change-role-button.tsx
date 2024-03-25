"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
import { Roles } from "@/types/globals";

import changeRole from "../utils/change-role";

interface ChangeRoleButtonProps {
  id: string;
  email: string;
  newRole: Roles;
}

export default function ChangeRoleButton({
  id,
  email,
  newRole,
}: ChangeRoleButtonProps) {
  const router = useRouter();

  const onChangeRole = async () => {
    const result = await changeRole({ id, newRole });
    if (result && result.error) {
      toast.error(result.error);
    } else if (result && result.data) {
      router.refresh();
      toast.success("Roll ändrad för " + result.data);
    } else {
      toast.error("Något gick fel");
    }
  };

  if (newRole === "medlem") {
    return (
      <AlertDialog>
        <AlertDialogTrigger className="font-medium hover:line-through hover:opacity-80">
          Moderator
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Är du säker?</AlertDialogTitle>
            <AlertDialogDescription>
              Detta kommer ta bort moderator rollen från
              <span className="font-semibold text-black break-all">
                {" "}
                {email}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Avbryt</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={onChangeRole}>
              Ta bort moderator
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else if (newRole === "moderator") {
    return (
      <AlertDialog>
        <AlertDialogTrigger className="font-medium hover:opacity-80">
          Gör moderator
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Är du säker?</AlertDialogTitle>
            <AlertDialogDescription>
              Detta kommer att göra{" "}
              <span className="font-semibold break-all">{email}</span> till
              moderator. <br /> Moderatorer har tillgång till fler funktioner så
              som att ta bort inlägg och användare.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Avbryt</AlertDialogCancel>
            <AlertDialogAction onClick={onChangeRole}>
              Gör moderator
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else {
    return <p>Kunde inte rendera knappen</p>;
  }
}
