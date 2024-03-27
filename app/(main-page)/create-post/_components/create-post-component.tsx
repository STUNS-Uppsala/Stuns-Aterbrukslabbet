"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

import municipalities from "@/data/municipalities.json";

import CategoryPicker from "./category-picker";
import DatePicker from "./date-picker";
import MunicipalityPicker from "./municipality-picker";
import PostTypeRadioButton from "./post-type-radio-button";

interface FormInputs {
  postTypeRadioButton: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  description: string;
  categoryPicker: string;
  municipalityPicker: string;
  datePicker: string;
}

export default function CreatePostForm() {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();
  const categoryList = ["förbrukningsvara", "instrument/maskin", "inventarie"];

  const onSubmit = (data: any) => {
    console.log(data.categoryPicker);
  };

  return (
    <div className="bg-secondary mx-auto px-8 w-3/5 mt-20">
      <h1 className="text-center text-2xl">SKAPA ETT INLÄGG</h1>
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="postTypeRadioButton"
          control={control}
          rules={{ required: true }}
          defaultValue="erbjuds"
          render={({ field: { onChange, value } }) => (
            <PostTypeRadioButton postType={value} setPostType={onChange} />
          )}
        />

        <div className="flex justify-between">
          <div className="flex flex-col">
            <label>Förnamn</label>
            <input
              {...register("firstName")}
              className="bg-primary px-2 rounded-sm"
              defaultValue="Förnamn"
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label>Efternamn</label>
            <input
              {...register("lastName")}
              className="bg-primary px-2 rounded-sm"
              defaultValue="Efternamn"
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label>Mail-Adress</label>
          <input
            {...register("email")}
            type="email"
            className="bg-primary px-2 rounded-sm"
            defaultValue="hej@gmail.com"
            readOnly
          />
        </div>
        <div className="flex flex-col">
          <label>Titel</label>
          <input
            {...register("title", {
              required: "Titel krävs",
              maxLength: { value: 40, message: "Max 40 tecken" },
            })}
            className="bg-primary bg-opacity-40 px-2 rounded-sm"
            placeholder="Skriv titel här..."
          />
          {errors.title && (
            <p className="text-red-500" role="alert">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label>Beskrivning</label>
          <textarea
            {...register("description", {
              required: "Beskrivning krävs",
              maxLength: { value: 2000, message: "Max 2000 tecken" },
            })}
            className="resize-none h-32 bg-primary bg-opacity-40 px-2 py-1 rounded-sm"
            placeholder="Skriv beskrivning här..."
          ></textarea>
          {errors.description && (
            <p className="text-red-500" role="alert">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className=" flex flex-col">
          <label> Kategori </label>
          <Controller
            name="categoryPicker"
            control={control}
            rules={{ required: "Kategori krävs" }}
            render={({ field: { onChange, value } }) => (
              <CategoryPicker
                value={value}
                setValue={onChange}
                list={categoryList}
              />
            )}
          />
          {errors.categoryPicker && (
            <p className="text-red-500" role="alert">
              {errors.categoryPicker.message}
            </p>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label>Kommun</label>
            <Controller
              name="municipalityPicker"
              control={control}
              rules={{ required: "Kommun krävs" }}
              render={({ field: { onChange, value } }) => (
                <MunicipalityPicker
                  value={value}
                  setValue={onChange}
                  list={municipalities}
                />
              )}
            />
            {errors.municipalityPicker && (
              <p className="text-red-500" role="alert">
                {errors.municipalityPicker.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label>Slutdatum (frivilligt)</label>
            <Controller
              name="datePicker"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker date={value} setDate={onChange} />
              )}
            />
          </div>
        </div>
        <input className="cursor-pointer" type="submit" />
      </form>
    </div>
  );
}
