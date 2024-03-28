"use server";

import { getUserId } from "@/utils/get-user-id";
import { db } from "@/lib/db";

interface CreatePostProps {
  data: any;
}

export default async function createPost({ data }: CreatePostProps) {
  const userId = getUserId();

  if (!userId) {
    return { error: "Kunde inte hämta userId" };
  }

  console.log(data);

  try {
    await db.post.create({
      data: {
        userId: userId,
        title: data.title,
        description: data.description,
        postType: data.postTypeRadioButton,
        category: data.categoryPicker,
        location: data.municipalityPicker,
        expiresAt: data.datePicker,
        hasCustomExpirationDate: data.datePicker !== undefined,
      },
    });
    return { data: "Inlägg skapat" };
  } catch {
    return { error: "Kunde inte skapa inlägget" };
  }
}
