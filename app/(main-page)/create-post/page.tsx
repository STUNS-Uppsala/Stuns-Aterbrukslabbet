"use client";

import React from "react";
import { Control, useForm, useWatch } from "react-hook-form";

import Lost from "../post/_components/post";

import { Post } from "@prisma/client";

interface FormInputs {
  title: string;
  description: string;
  form: string;
}

function FirstNameWatched({ control }: { control: Control<FormInputs> }) {
  const form = useWatch({
    control,
  });
  let post: Post = {
    id: 0,
    userId: "",
    title: form.title ? form.title : "Titel",
    description: form.description ? form.description : "Beskrivning",
    postType: "Post type",
    category: "Kateogir",
    location: form.form ? form.form : "",
    imageThumbUrl: "a",
    imageFullUrl: "a",
    createdAt: new Date(),
    expiresAt: new Date(),
    hasCustomExpirationDate: false,
  };

  return <Lost post={post} email="a" name="a" />;
}

export default function App() {
  const { register, control, handleSubmit } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label>Titel</label>
          <input {...register("title")} />
          <label>Beskrivning</label>
          <input {...register("description")} />
          <label> hej</label>
          <select {...register("form")}>
            <option>1</option>
            <option>2</option>
          </select>
          <input type="submit" />
        </div>
        <FirstNameWatched control={control} />
      </form>
    </>
  );
}
