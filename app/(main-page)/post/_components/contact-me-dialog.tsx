"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ContactMeDialogProps {
  name: string;
  email: string;
  disclaimerText: string;
}

export default function ContactMeDialog({
  name,
  email,
  disclaimerText,
}: ContactMeDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex md:h-10 md:w-40 h-8 w-32 md:text-xl text-base rounded-lg bg-primary justify-center items-center">
          Kontakta mig
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p className="flex justify-center text-base">{name}</p>
          <a
            className="flex justify-center hover:underline text-blue-600"
            href={`mailto:${email}`}
          >
            {email}
          </a>
          <p className="pt-6 text-center font-semibold">{disclaimerText}</p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
