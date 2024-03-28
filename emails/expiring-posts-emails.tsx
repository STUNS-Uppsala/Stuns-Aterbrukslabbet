import React from "react";

import { Text, Button, Link, Section } from "@react-email/components";

import EmailTemplate from "./components/email-template";

interface ChangeRoleEmailProps {
  postTitle: string;
  postId?: number;
  postLink?: string;
}

export function PostExpiredCustomMail({ postTitle }: ChangeRoleEmailProps) {
  return (
    <EmailTemplate
      preview={`Ditt inlägg ${postTitle} har tagits bort`}
      header={`Ditt inlägg ${postTitle} har blivit bortaget`}
      main={
        <>
          <Text>
            Din valda tidsperiod har nu löpt ut. Och eftersom inlägget inte
            förlängdes har det nu blivit bortaget.
          </Text>
        </>
      }
    />
  );
}

export function PostExpiredMail({ postTitle }: ChangeRoleEmailProps) {
  return (
    <EmailTemplate
      preview={`Ditt inlägg ${postTitle} har tagits bort`}
      header={`Ditt inlägg ${postTitle} har blivit bortaget`}
      main={
        <>
          <Text>
            Det har nu gått 6 månader sen du la ut ditt inlägg. Eftersom
            inlägget inte förlängdes har det nu blivit bortaget.
          </Text>
        </>
      }
    />
  );
}

export function PostExpiresInAWeekCustomMail({
  postTitle,
  postLink,
  postId,
}: ChangeRoleEmailProps) {
  return (
    <EmailTemplate
      preview={`Ditt inlägg ${postTitle} kommer tas bort om en vecka`}
      header={`Ditt inlägg ${postTitle} tas snart bort`}
      main={
        <>
          <Text>
            Din valda tidsperiod för inlägget har snart gått ut. Om inlägget
            fortfarande är aktuellt, kan du förlänga det genom att uppdatera
            det. Annars kommer det att tas bort om en vecka.
          </Text>
          <Section>
            <Link
              className="pr-4"
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/extend/${postLink}.html`}
            >
              Förläng
            </Link>
            <Link
              className="pr-4"
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/delete/${postLink}.html`}
            >
              Ta bort
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/post/${postId}.html`}
            >
              Gå till inlägg
            </Link>
          </Section>
        </>
      }
    />
  );
}

export function PostExpiresInAWeekMail({
  postTitle,
  postLink,
  postId,
}: ChangeRoleEmailProps) {
  return (
    <EmailTemplate
      preview={`Ditt inlägg ${postTitle} kommer tas bort om en vecka`}
      header={`Ditt inlägg ${postTitle} tas snart bort`}
      main={
        <>
          <Text>
            Det har snart gått 6 månader sen du la upp ditt inlägg. Om inlägget
            fortfarande är aktuellt, kan du förlänga det genom att uppdatera
            det. Annars kommer det att tas bort om en vecka.
          </Text>
          <Section>
            <Link
              className="pr-4"
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/extend/${postLink}.html`}
            >
              Förläng
            </Link>
            <Link
              className="pr-4"
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/delete/${postLink}.html`}
            >
              Ta bort
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/post/${postId}.html`}
            >
              Gå till inlägg
            </Link>
          </Section>
        </>
      }
    />
  );
}

export function PostExpiresTommorowCustomMail({
  postTitle,
  postLink,
  postId,
}: ChangeRoleEmailProps) {
  return (
    <EmailTemplate
      preview={`Ditt inlägg ${postTitle} kommer tas bort imorgon`}
      header={`Ditt inlägg ${postTitle} tas bort imorgon`}
      main={
        <>
          <Text>
            Din valda tidsperiod för inlägget tar slut imorgon. Om inlägget
            fortfarande är aktuellt, kan du förlänga det genom att uppdatera
            det. Annars kommer det att tas bort imorgon.
          </Text>
          <Section>
            <Link
              className="pr-4"
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/extend/${postLink}.html`}
            >
              Förläng
            </Link>
            <Link
              className="pr-4"
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/delete/${postLink}.html`}
            >
              Ta bort
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/post/${postId}.html`}
            >
              Gå till inlägg
            </Link>
          </Section>
        </>
      }
    />
  );
}

export function PostExpiresTommorowMail({
  postTitle,
  postLink,
  postId,
}: ChangeRoleEmailProps) {
  return (
    <EmailTemplate
      preview={`Ditt inlägg ${postTitle} kommer tas bort imorgon`}
      header={`Ditt inlägg ${postTitle} tas bort imorgon`}
      main={
        <>
          <Text>
            Det har snart gått 6 månader sen du la upp ditt inlägg. Om inlägget
            fortfarande är aktuellt, kan du förlänga det genom att uppdatera
            det. Annars kommer det att tas bort imorgon.
          </Text>
          <Section>
            <Link
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/extend/${postLink}.html`}
            >
              Förläng
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/delete/${postLink}.html`}
            >
              Ta bort
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/post/${postId}.html`}
            >
              Gå till inlägg
            </Link>
          </Section>
        </>
      }
    />
  );
}
