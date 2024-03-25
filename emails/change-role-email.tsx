import React from "react";

import { Roles } from "@/types/globals";
import { Text } from "@react-email/components";

import EmailTemplate from "./components/email-template";

interface ChangeRoleEmailProps {
  role: Roles;
}

export default function ChangeRoleEmail({ role }: ChangeRoleEmailProps) {
  return (
    <EmailTemplate
      preview="Du har fått en ny roll på Återbrukslabbet"
      header="Din roll har uppdaterats"
      main={
        <>
          <Text>
            Din roll har uppdaterats av en moderator eller administratör. Din
            nya roll är <span className="font-semibold">{role}</span>
          </Text>
        </>
      }
    />
  );
}
