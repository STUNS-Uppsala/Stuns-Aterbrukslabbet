import React from "react";

import { Container, Text, Section } from "@react-email/components";

interface EmailHeaderProps {
  header: string;
}

export default function EmailHeader({ header }: EmailHeaderProps) {
  return (
    <Container>
      <Section>
        <Text className="text-2xl">Återbrukslabbet</Text>
      </Section>
      <Section>
        <Text className="text-3xl font-bold">{header}</Text>
      </Section>
    </Container>
  );
}
