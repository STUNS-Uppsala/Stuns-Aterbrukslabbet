import React from "react";

import { Section, Text } from "@react-email/components";

import EmailTemplate from "./components/email-template";

interface DeletedUserEmailProps {
  comment: string;
}

export default function DeleteUserEmail({ comment }: DeletedUserEmailProps) {
  return (
    <EmailTemplate
      preview="Ditt Återbrukslabbet konto har blivit borttaget"
      header="Ditt konto har blivit borttaget"
      main={
        <>
          <Text>
            Detta kan bero på att du har uppfört dig olämpligt på sidan
            och/eller brutit våra regler. Om du tror att det har skett ett
            fel och inte känner igen detta kan du höra av dig till oss.
          </Text>
          {comment && comment.length > 0 && (
            <Section>
              <Text className="font-semibold">Kommentar från moderator</Text>
              <Text>{comment}</Text>
            </Section>
          )}
        </>
      }
    />
  );
}
