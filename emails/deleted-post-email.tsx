import React from "react";

import { Section, Text } from "@react-email/components";

import EmailTemplate from "./components/email-template";

interface DeletedPostEmailProps {
  comment: string;
  title: string;
}

export default function DeletePostEmail({
  comment,
  title,
}: DeletedPostEmailProps) {
  return (
    <EmailTemplate
      preview="Ditt inlägg har blivit borttaget"
      header={`Ditt inlägg "${title}" har blivit bortaget`}
      main={
        <>
          <Text>
            Detta kan bero på att inlägget var olämpligt för sidan och/eller mot
            brutit våra regler. Om du tror att det har skett ett fel och inte
            känner igen detta kan du höra av dig till oss.
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
