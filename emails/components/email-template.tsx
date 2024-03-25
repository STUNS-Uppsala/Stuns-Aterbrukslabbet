import React from "react";

import {
  Html,
  Preview,
  Tailwind,
  Body,
  Container,
  Section,
} from "@react-email/components";

import EmailFooter from "./email-footer";
import EmailHeader from "./email-header";

interface EmailTemplateProps {
  preview: string;
  header: string;
  main: React.ReactNode;
}

export default function EmailTemplate({
  preview,
  header,
  main,
}: EmailTemplateProps) {
  return (
    <Html>
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="flex bg-white">
          <Container>
            <EmailHeader header={header} />
            <Section>{main}</Section>
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
