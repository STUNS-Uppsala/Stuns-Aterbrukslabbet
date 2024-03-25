import React from "react";

import { Container, Text, Section } from "@react-email/components";

interface emailHeaderProps {
  header: string;
}

export default function EmailHeader({ header }: emailHeaderProps) {
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
