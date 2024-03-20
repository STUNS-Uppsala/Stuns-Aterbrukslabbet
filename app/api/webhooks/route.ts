import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

import { WebhookEvent } from "@clerk/nextjs/server";

import changeRoleToMember from "../_utils/change-role-to-member";
import checkIfRoleIsCorrect from "../_utils/check-if-role-is-correct";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return new NextResponse(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env",
      {
        status: 400,
      }
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const webhook = new Webhook(WEBHOOK_SECRET);
  let event: WebhookEvent;

  try {
    const payloadString = JSON.stringify(payload);
    event = webhook.verify(payloadString, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new NextResponse("Error occured", {
      status: 400,
    });
  }

  switch (event.type) {
    case "user.created":
      try {
        await changeRoleToMember({ id: payload.data.id });
      } catch (error) {
        return new NextResponse("Failed to change role: " + error, {
          status: 400,
        });
      }

    case "session.created":
      if (!(await checkIfRoleIsCorrect({ id: payload.data.user_id }))) {
        try {
          await changeRoleToMember({ id: payload.data.user_id });
        } catch (error) {
          return new NextResponse("Failed to change role: " + error, {
            status: 400,
          });
        }
      }
  }
  return new NextResponse("Success", { status: 200 });
}
