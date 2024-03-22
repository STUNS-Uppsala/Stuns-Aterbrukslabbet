import React from "react";

import {
  Html,
  Body,
  Container,
  Preview,
  Tailwind,
  Section,
} from "@react-email/components";

import EmailFooter from "./email-footer";
import EmailHeader from "./email-header";

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
