"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import DatePicker from "../_components/date-picker";
import { useForm } from "react-hook-form";
import MunicipalityPicker from "../_components/municipality-picker";
import CategoryPicker from "../_components/category-picker";
import municipalities from "@/data/municipalities.json";

interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  description: string;
}

export default function CreatePostForm() {
  const { register, handleSubmit } = useForm<FormInputs>();
  const [municipalityValue, setMunicipalityValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const categoryList = ["förbrukningsvara", "instrument/maskin", "inventarie"];

  const onSubmit = (data: any) => {};

  return (
    <div className="bg-secondary mx-auto px-8 w-3/5 mt-20">
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label>Förnamn</label>
            <input
              {...register("firstName")}
              className="bg-primary px-2 rounded-sm"
              defaultValue="Förnamn"
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label>Efternamn</label>
            <input
              {...register("lastName")}
              className="bg-primary px-2 rounded-sm"
              defaultValue="Efternamn"
              disabled
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
            disabled
          />
        </div>
        <div className="flex flex-col">
          <label>Titel</label>
          <input
            {...register("title")}
            className="bg-primary bg-opacity-40 px-2 rounded-sm"
            placeholder="Skriv titel här..."
          />
        </div>
        <div className="flex flex-col">
          <label>Beskrivning</label>
          <textarea
            {...register("description")}
            className="resize-none h-32 bg-primary bg-opacity-40 px-2 py-1 rounded-sm"
            placeholder="Skriv beskrivning här..."
          ></textarea>
        </div>
        <CategoryPicker
          value={categoryValue}
          setValue={setCategoryValue}
          list={categoryList}
        />
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label>Kommun</label>
            <MunicipalityPicker
              value={municipalityValue}
              setValue={setMunicipalityValue}
              list={municipalities}
            />
          </div>
          <div className="flex flex-col">
            <label>Slutdatum (frivilligt)</label>
            <DatePicker />
          </div>
        </div>

        <input type="submit" />
        {/* 
      <Input placeholder="Email" {...register("firstName")} />
      <FirstNameWatched control={control} /> */}
      </form>
    </div>
  );
}
