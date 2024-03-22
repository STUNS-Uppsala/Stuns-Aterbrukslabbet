import React from "react";

import { Link, Container, Section } from "@react-email/components";

export default function EmailFooter() {
  return (
    <Container className="mt-8">
      <hr />
      <Section>
        <Link className="pr-4" href={process.env.NEXT_PUBLIC_SITE_URL}>
          Återbrukslabbet
        </Link>
        <Link href="mailto:stunsaterbrukslabbet@gmail.com">Kontakta oss</Link>
      </Section>
    </Container>
  );
}
