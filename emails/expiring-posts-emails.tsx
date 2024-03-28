import React from "react";

import { Text } from "@react-email/components";

import EmailTemplate from "./components/email-template";

interface ChangeRoleEmailProps {
  postId: number;
  postTitle: string;
}

export function PostExpiredCustomMail({
  postId,
  postTitle,
}: ChangeRoleEmailProps) {
  return (
    <EmailTemplate
      preview={`Ditt inlägg ${postTitle} har tagits bort`}
      header={`Ditt inlägg ${postTitle} har blivit bortaget`}
      main={
        <>
          <Text>
            Din valda tidsperiod har nu löpt ut. Och eftersom inlägget inte
            förlängdes har det nu blivit bortaget. Inläggets ID är:
            <span className="font-semibold"> {postId}</span>
          </Text>
        </>
      }
    />
  );
}

export function PostExpiredMail({ postId, postTitle }: ChangeRoleEmailProps) {
  return (
    <EmailTemplate
      preview={`Ditt inlägg ${postTitle} har tagits bort`}
      header={`Ditt inlägg ${postTitle} har blivit bortaget`}
      main={
        <>
          <Text>
            Det har nu gått 6 månader sen du la ut ditt inlägg. Eftersom
            inlägget inte förlängdes har det nu blivit bortaget. Inläggets ID
            är:
            <span className="font-semibold"> {postId}</span>
          </Text>
        </>
      }
    />
  );
}

export function PostExpiresInAWeekCustomMail({
  postId,
  postTitle,
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
            det. Annars kommer det att tas bort om en vecka. Inläggets ID är:
            <span className="font-semibold"> {postId}</span>
          </Text>
        </>
      }
    />
  );
}

export function PostExpiresInAWeekMail({
  postId,
  postTitle,
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
            det. Annars kommer det att tas bort om en vecka. Inläggets ID är:
            <span className="font-semibold"> {postId}</span>
          </Text>
        </>
      }
    />
  );
}

export function PostExpiresTommorowCustomMail({
  postId,
  postTitle,
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
            det. Annars kommer det att tas bort imorgon. Inläggets ID är:
            <span className="font-semibold"> {postId}</span>
          </Text>
        </>
      }
    />
  );
}

export function PostExpiresTommorowMail({
  postId,
  postTitle,
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
            det. Annars kommer det att tas bort imorgon. Inläggets ID är:
            <span className="font-semibold"> {postId}</span>
          </Text>
        </>
      }
    />
  );
}
