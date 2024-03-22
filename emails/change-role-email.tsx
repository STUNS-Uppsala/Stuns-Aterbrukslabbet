import React from "react";

import { Text } from "@react-email/components";
import { Roles } from "@/types/globals";

import EmailTemplate from "./components/email-template";

interface ChangeRoleEmailProps {
  role: Roles;
}

export default function ChangeRoleEmail({ role }: ChangeRoleEmailProps) {
  return (
    <EmailTemplate
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
