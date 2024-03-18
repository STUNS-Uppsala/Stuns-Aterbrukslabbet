import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
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

  if (event.type === "user.created") {
    try {
      payload.user.publicMetadata.role = "member";
      console.log("worked");
    } catch (err) {
      console.error(err);
    }
  }
  return new Response("", { status: 200 });
}
