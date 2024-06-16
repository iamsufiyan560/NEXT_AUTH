"use client";

import useGetUserProfile from "@/hooks/useGetUserProfile";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Page = () => {
  const { data, loading } = useGetUserProfile();

  const isAdmin = data?.isAdmin;

  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [lang, setLang] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!image) {
        return;
      }
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("githubLink", githubLink);
      formData.append("liveLink", liveLink);
      formData.append("lang", lang);

      const response = await axios.post("/api/projects", formData);

      const data = await response.data;

      console.log({ data });
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  return (
    <>
      {isAdmin ? (
        <form onSubmit={onSubmitHandler} className="w-1/2 mx-auto py-10">
          <input
            onChange={onChangeHandler}
            type="file"
            name="image"
            id="image"
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4"
          ></textarea>
          <input
            type="url"
            placeholder="Github Link"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4"
          />
          <input
            type="url"
            placeholder="Live Link"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4"
          />
          <input
            type="text"
            placeholder="Language"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-4"
          />
          <button className="bg-black text-white px-4 py-2 mt-4">Upload</button>
        </form>
      ) : (
        <div className="flex mt-[10%] justify-center items-center text-red-600 text-3xl font-semibold">
          {" "}
          Unauthorized: You are not an admin.
        </div>
      )}
    </>
  );
};

export default Page;
