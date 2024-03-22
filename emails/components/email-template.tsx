import React from "react";

import {
  Html,
  Body,
  Container,
  Preview,
  Tailwind,
  Section,
} from "@react-email/components";

import EmailHeader from "./email-header";
import EmailFooter from "./email-footer";

interface EmailTemplateProps {
  header: string;
  main: React.ReactNode;
}

export default function EmailTemplate({ header, main }: EmailTemplateProps) {
  return (
    <Html>
      <Preview>{header}</Preview>
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
