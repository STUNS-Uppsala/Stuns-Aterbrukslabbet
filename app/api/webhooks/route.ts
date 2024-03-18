import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { Webhook } from "svix";

import { WebhookEvent } from "@clerk/nextjs/server";

import changeRoleToMember from "../_utils/change-role-to-member";
import checkIfRoleIsCorrect from "../_utils/check-if-role-is-correct";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env.local"
    );
  }

  // Gets the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();

  // Creates a new Svix instance
  const webhook = new Webhook(WEBHOOK_SECRET);

  let event: WebhookEvent;

  // Verifies the payload with the headers
  try {
    const payloadString = JSON.stringify(payload);
    event = webhook.verify(payloadString, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new Response("Error occured", {
      status: 400,
    });
  }

  switch (event.type) {
    case "user.created":
      try {
        await changeRoleToMember({ id: payload.data.id });
      } catch (err) {
        return { error: err as string };
      }

    case "session.created":
      if (!(await checkIfRoleIsCorrect({ id: payload.data.user_id }))) {
        try {
          await changeRoleToMember({ id: payload.data.user_id });
        } catch (err) {
          return { error: err as string };
        }
      }
  }
  return new Response("Success");
}
